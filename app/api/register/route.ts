import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
    const db = getDb();
    return NextResponse.json(db.registrations);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, occupation, collegeName, city } = body;

        if (!name || !email || !phone || !occupation || !city) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newReg = {
            name,
            email,
            phone,
            occupation,
            collegeName: occupation === 'Student' ? collegeName || '' : '',
            city,
            timestamp: new Date().toISOString()
        };

        // 1. Sync to Google Sheets if configured
        const googleSheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
        let syncedToSheet = false;
        
        if (googleSheetUrl) {
            try {
                const response = await fetch(googleSheetUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newReg),
                    signal: AbortSignal.timeout(6000)
                });
                if (response.ok) {
                    syncedToSheet = true;
                }
            } catch (e) {
                console.error("Google Sheets sync failed:", e);
            }
        }

        // 2. Save locally (to /tmp/db.json on Vercel)
        const db = getDb();
        db.registrations.unshift(newReg);
        saveDb(db);

        return NextResponse.json({ 
            success: true, 
            registration: newReg,
            synced: syncedToSheet
        });
    } catch (error) {
        return NextResponse.json({ error: 'Server error saving registration' }, { status: 500 });
    }
}

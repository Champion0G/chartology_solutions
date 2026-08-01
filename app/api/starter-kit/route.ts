import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
    const db = getDb();
    return NextResponse.json(db.starterKitLeads);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone } = body;

        if (!name || !email || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = getDb();
        const newLead = {
            name,
            email,
            phone,
            timestamp: new Date().toISOString()
        };

        db.starterKitLeads.unshift(newLead);
        saveDb(db);
        
        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        return NextResponse.json({ error: 'Server error saving starter kit lead' }, { status: 500 });
    }
}

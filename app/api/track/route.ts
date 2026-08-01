import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
    const db = getDb();
    return NextResponse.json(db.clickStream || []);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { event, path: routePath, sessionId, device, attribution, metadata } = body;

        if (!event || !sessionId) {
            return NextResponse.json({ error: 'Missing event name or session token' }, { status: 400 });
        }

        const db = getDb();
        if (!db.clickStream) db.clickStream = [];

        const newEvent = {
            event,
            path: routePath || '/',
            sessionId,
            timestamp: new Date().toISOString(),
            device: device || { type: 'Desktop', os: 'Unknown OS', browser: 'Unknown Browser' },
            attribution: attribution || { referrer: 'Direct', utm_source: 'organic', utm_medium: 'direct', utm_campaign: 'none' },
            metadata: metadata || {}
        };

        db.clickStream.unshift(newEvent);

        // Keep database size within check (max 5000 events to prevent JSON bloat)
        if (db.clickStream.length > 5000) {
            db.clickStream = db.clickStream.slice(0, 5000);
        }
        
        saveDb(db);
        return NextResponse.json({ success: true, tracking: newEvent });
    } catch (error) {
        return NextResponse.json({ error: 'Server error tracking event' }, { status: 500 });
    }
}

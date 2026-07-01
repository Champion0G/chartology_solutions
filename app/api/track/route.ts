import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

function getDb() {
    try {
        const fileContent = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return {
            schedule: { date: "Upcoming Sunday", time: "11:00 AM IST", seats: 100 },
            registrations: [],
            starterKitLeads: [],
            certificates: [],
            clickStream: []
        };
    }
}

export async function GET() {
    const db = getDb();
    // Return newest events first
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
        
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
        return NextResponse.json({ success: true, tracking: newEvent });
    } catch (error) {
        return NextResponse.json({ error: 'Server error tracking event' }, { status: 500 });
    }
}

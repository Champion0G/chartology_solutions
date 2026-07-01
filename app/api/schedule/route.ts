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
            certificates: []
        };
    }
}

export async function GET() {
    const db = getDb();
    return NextResponse.json(db.schedule);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { date, time, seats } = body;

        if (!date || !time || isNaN(Number(seats))) {
            return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
        }

        const db = getDb();
        db.schedule = { date, time, seats: Number(seats) };
        
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
        return NextResponse.json({ success: true, schedule: db.schedule });
    } catch (error) {
        return NextResponse.json({ error: 'Server error updating schedule' }, { status: 500 });
    }
}

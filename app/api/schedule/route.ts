import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

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
        saveDb(db);
        
        return NextResponse.json({ success: true, schedule: db.schedule });
    } catch (error) {
        return NextResponse.json({ error: 'Server error updating schedule' }, { status: 500 });
    }
}

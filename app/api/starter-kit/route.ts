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
        
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        return NextResponse.json({ error: 'Server error saving starter kit lead' }, { status: 500 });
    }
}

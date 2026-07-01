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
    return NextResponse.json(db.registrations);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, occupation, city } = body;

        if (!name || !email || !phone || !occupation || !city) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = getDb();
        const newReg = {
            name,
            email,
            phone,
            occupation,
            city,
            timestamp: new Date().toISOString()
        };

        db.registrations.unshift(newReg);
        
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
        return NextResponse.json({ success: true, registration: newReg });
    } catch (error) {
        return NextResponse.json({ error: 'Server error saving registration' }, { status: 500 });
    }
}

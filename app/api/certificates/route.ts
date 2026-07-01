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

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const db = getDb();

    if (id) {
        // Verification request
        const cert = db.certificates.find((c: any) => c.id.toLowerCase() === id.trim().toLowerCase());
        if (!cert) {
            return NextResponse.json({ verified: false, error: 'Certificate not found' }, { status: 404 });
        }
        return NextResponse.json({ verified: true, certificate: cert });
    }

    return NextResponse.json(db.certificates);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, certType, code, issueDate } = body;

        if (!name || !email || !certType || !code || !issueDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = getDb();
        
        // Check if certificate ID already exists or generate a random one
        const randomId = `CERT-${code.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const newCert = {
            id: randomId,
            name,
            email,
            certType,
            code,
            issueDate
        };

        db.certificates.unshift(newCert);
        
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
        return NextResponse.json({ success: true, certificate: newCert });
    } catch (error) {
        return NextResponse.json({ error: 'Server error issuing certificate' }, { status: 500 });
    }
}

import fs from 'fs';
import path from 'path';

const isVercel = process.env.VERCEL === '1';
const localDbPath = path.join(process.cwd(), 'data', 'db.json');
const dbPath = isVercel ? '/tmp/db.json' : localDbPath;

export function getDb() {
    try {
        if (isVercel && !fs.existsSync(dbPath)) {
            // Copy default db template from read-only workspace folder to writable /tmp
            const baseContent = fs.readFileSync(localDbPath, 'utf-8');
            fs.writeFileSync(dbPath, baseContent, 'utf-8');
        }
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

export function saveDb(db: any) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
        return true;
    } catch (e) {
        console.error("Database save failed:", e);
        return false;
    }
}

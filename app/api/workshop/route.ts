import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export function extractYouTubeVideoId(input: string): string | null {
    if (!input) return null;
    const trimmed = input.trim();

    // Direct 11-character video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
        return trimmed;
    }

    // Supported YouTube URL variations
    const patterns = [
        /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
        /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
        /[?&]v=([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
        const match = trimmed.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

function getKvConfig() {
    const url = process.env.STORAGE_KV_REST_API_URL 
        || process.env.STORAGE_UPSTASH_REDIS_REST_URL 
        || process.env.STORAGE_REST_API_URL
        || process.env.KV_REST_API_URL 
        || process.env.UPSTASH_REDIS_REST_URL
        || (process.env.STORAGE_URL?.startsWith('http') ? process.env.STORAGE_URL : undefined);

    const token = process.env.STORAGE_KV_REST_API_TOKEN 
        || process.env.STORAGE_UPSTASH_REDIS_REST_TOKEN 
        || process.env.STORAGE_REST_API_TOKEN
        || process.env.KV_REST_API_TOKEN 
        || process.env.UPSTASH_REDIS_REST_TOKEN
        || process.env.STORAGE_TOKEN;

    return { url, token };
}

async function getCloudWorkshopState() {
    const { url, token } = getKvConfig();
    if (url && token) {
        try {
            const res = await fetch(`${url}/get/liveWorkshop`, {
                headers: { Authorization: `Bearer ${token}` },
                cache: 'no-store'
            });
            if (res.ok) {
                const data = await res.json();
                if (data && data.result) {
                    return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
                }
            }
        } catch (e) {
            console.error("KV read error:", e);
        }
    }
    return null;
}

async function saveCloudWorkshopState(state: any) {
    const { url, token } = getKvConfig();
    if (url && token) {
        try {
            await fetch(`${url}/set/liveWorkshop`, {
                method: 'POST',
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });
        } catch (e) {
            console.error("KV save error:", e);
        }
    }
}

export async function GET() {
    // 1. Try KV cloud store first for cross-instance sync
    const cloudState = await getCloudWorkshopState();
    if (cloudState && typeof cloudState === 'object') {
        return NextResponse.json(cloudState, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    }

    // 2. Fallback to local db.json
    const db = getDb();
    const liveWorkshop = db.liveWorkshop || {
        isLive: false,
        title: "Financial Markets Masterclass — Live Session",
        description: "Welcome to today's live cohort session. Institutional charting and trade auditing in real-time.",
        videoId: "",
        updatedAt: new Date().toISOString()
    };

    return NextResponse.json(liveWorkshop, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, description, videoInput, isLive } = body;

        let videoId = '';
        if (videoInput && typeof videoInput === 'string' && videoInput.trim() !== '') {
            const extracted = extractYouTubeVideoId(videoInput);
            if (!extracted && isLive) {
                return NextResponse.json(
                    { error: 'Invalid YouTube Video ID or URL. Please provide a valid 11-character Video ID or YouTube link.' },
                    { status: 400 }
                );
            }
            videoId = extracted || '';
        }

        const willBeLive = Boolean(isLive);
        const db = getDb();
        const currentWorkshop = db.liveWorkshop || {};

        // If attempting to go live, must have either new extracted videoId or existing valid videoId
        const finalVideoId = videoId || currentWorkshop.videoId || '';

        if (willBeLive && !finalVideoId) {
            return NextResponse.json(
                { error: 'A valid YouTube Video ID or URL is required to set the workshop to Live.' },
                { status: 400 }
            );
        }

        const updatedState = {
            isLive: willBeLive,
            title: typeof title === 'string' && title.trim() ? title.trim() : (currentWorkshop.title || "Financial Markets Masterclass — Live Session"),
            description: typeof description === 'string' ? description.trim() : (currentWorkshop.description || ""),
            videoId: finalVideoId,
            updatedAt: new Date().toISOString()
        };

        // Save locally to /tmp/db.json
        db.liveWorkshop = updatedState;
        saveDb(db);

        // Save to cloud KV if connected
        await saveCloudWorkshopState(updatedState);

        return NextResponse.json({ success: true, liveWorkshop: updatedState });
    } catch (error) {
        console.error("Server error updating live workshop settings:", error);
        return NextResponse.json({ error: 'Server error updating workshop settings' }, { status: 500 });
    }
}

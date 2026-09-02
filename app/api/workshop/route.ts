import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import Redis from 'ioredis';

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

let redisClient: Redis | null = null;

function getRedis(): Redis | null {
    if (!redisClient && process.env.REDIS_URL) {
        try {
            redisClient = new Redis(process.env.REDIS_URL, {
                lazyConnect: true,
                connectTimeout: 5000,
                maxRetriesPerRequest: 1,
                enableReadyCheck: false
            });
            redisClient.on('error', (err) => {
                console.error('Redis connection error:', err.message);
            });
        } catch (e) {
            console.error('Failed to initialize Redis:', e);
        }
    }
    return redisClient;
}

async function getCloudWorkshopState() {
    const redis = getRedis();
    if (redis) {
        try {
            if (redis.status === 'wait') {
                await redis.connect();
            }
            const raw = await redis.get('liveWorkshop');
            if (raw) {
                return JSON.parse(raw);
            }
        } catch (e) {
            console.error("Redis read error:", e);
        }
    }
    return null;
}

async function saveCloudWorkshopState(state: any) {
    const redis = getRedis();
    if (redis) {
        try {
            if (redis.status === 'wait') {
                await redis.connect();
            }
            await redis.set('liveWorkshop', JSON.stringify(state));
            return true;
        } catch (e) {
            console.error("Redis write error:", e);
        }
    }
    return false;
}

export async function GET() {
    // 1. Try Redis cloud store first for cross-instance real-time sync
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

        // If videoInput was provided, use extracted videoId. If videoInput was explicitly empty string, clear it.
        const finalVideoId = videoId ? videoId : (videoInput === '' ? '' : (currentWorkshop.videoId || ''));

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

        // Save to Redis cloud database
        await saveCloudWorkshopState(updatedState);

        return NextResponse.json({ success: true, liveWorkshop: updatedState });
    } catch (error) {
        console.error("Server error updating live workshop settings:", error);
        return NextResponse.json({ error: 'Server error updating workshop settings' }, { status: 500 });
    }
}

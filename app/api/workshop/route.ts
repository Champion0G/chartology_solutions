import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

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

export async function GET() {
    const db = getDb();
    const liveWorkshop = db.liveWorkshop || {
        isLive: false,
        title: "Financial Markets Masterclass — Live Session",
        description: "Welcome to today's live cohort session.",
        videoId: "",
        updatedAt: new Date().toISOString()
    };

    return NextResponse.json(liveWorkshop, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
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

        db.liveWorkshop = {
            isLive: willBeLive,
            title: typeof title === 'string' && title.trim() ? title.trim() : (currentWorkshop.title || "Financial Markets Masterclass — Live Session"),
            description: typeof description === 'string' ? description.trim() : (currentWorkshop.description || ""),
            videoId: finalVideoId,
            updatedAt: new Date().toISOString()
        };

        saveDb(db);
        return NextResponse.json({ success: true, liveWorkshop: db.liveWorkshop });
    } catch (error) {
        console.error("Server error updating live workshop settings:", error);
        return NextResponse.json({ error: 'Server error updating workshop settings' }, { status: 500 });
    }
}

'use client';
import { useState, useEffect, useCallback } from 'react';

export interface LiveWorkshopState {
    isLive: boolean;
    title: string;
    description: string;
    videoId: string;
    loading: boolean;
    refresh: () => Promise<void>;
}

export default function useLiveWorkshop(): LiveWorkshopState {
    const [isLive, setIsLive] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoId, setVideoId] = useState('');
    const [loading, setLoading] = useState(true);

    const checkStatus = useCallback(async () => {
        try {
            // Timestamp parameter prevents any browser or CDN caching
            const res = await fetch(`/api/workshop?t=${Date.now()}`, {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });
            if (res.ok) {
                const data = await res.json();
                setIsLive(Boolean(data.isLive));
                if (data.title) setTitle(data.title);
                if (data.description) setDescription(data.description);
                if (data.videoId) setVideoId(data.videoId);
            }
        } catch {
            // Silently ignore network hiccup
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkStatus();

        // 5-second polling interval for responsive live updates
        const interval = setInterval(checkStatus, 5000);

        // Instantly refresh when user focuses or returns to tab
        const onFocus = () => checkStatus();
        const onVisibility = () => {
            if (document.visibilityState === 'visible') {
                checkStatus();
            }
        };

        window.addEventListener('focus', onFocus);
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            clearInterval(interval);
            window.removeEventListener('focus', onFocus);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [checkStatus]);

    return { isLive, title, description, videoId, loading, refresh: checkStatus };
}

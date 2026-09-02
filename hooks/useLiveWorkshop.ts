'use client';
import { useState, useEffect } from 'react';

export interface LiveWorkshopState {
    isLive: boolean;
    title: string;
    loading: boolean;
}

export default function useLiveWorkshop(): LiveWorkshopState {
    const [isLive, setIsLive] = useState(false);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        async function checkStatus() {
            try {
                const res = await fetch('/api/workshop', { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    if (active) {
                        setIsLive(Boolean(data.isLive));
                        if (data.title) setTitle(data.title);
                    }
                }
            } catch {
                // Silently fallback to offline
            } finally {
                if (active) setLoading(false);
            }
        }

        checkStatus();
        const interval = setInterval(checkStatus, 30000); // Check every 30s
        return () => {
            active = false;
            clearInterval(interval);
        };
    }, []);

    return { isLive, title, loading };
}

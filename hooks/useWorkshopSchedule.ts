'use client';
import { useState, useEffect } from 'react';

export interface WorkshopSchedule {
    date: string;
    time: string;
    seats: number;
}

const defaultSchedule: WorkshopSchedule = {
    date: 'Upcoming Sunday',
    time: '11:00 AM IST',
    seats: 100
};

export default function useWorkshopSchedule() {
    const [schedule, setSchedule] = useState<WorkshopSchedule>(defaultSchedule);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        
        async function fetchSchedule() {
            try {
                const res = await fetch('/api/schedule');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                if (active && data && data.date && data.time) {
                    setSchedule({
                        date: data.date,
                        time: data.time,
                        seats: Number(data.seats) || 100
                    });
                }
            } catch (err) {
                // Silently fallback to defaults
            } finally {
                if (active) setLoading(false);
            }
        }

        fetchSchedule();
        return () => {
            active = false;
        };
    }, []);

    return { schedule, loading };
}

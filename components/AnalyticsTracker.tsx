'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackFunnelEvent } from '@/lib/analytics';

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Track page views, excluding admin panels and API routes
        if (pathname && !pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
            trackFunnelEvent('page_view');

            let hasScrolled50 = false;
            let hasScrolled90 = false;

            const handleScroll = () => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                if (scrollHeight <= 0) return;
                
                const percent = (scrollTop / scrollHeight) * 100;
                
                if (percent >= 50 && !hasScrolled50) {
                    hasScrolled50 = true;
                    trackFunnelEvent('scroll_50');
                }
                if (percent >= 90 && !hasScrolled90) {
                    hasScrolled90 = true;
                    trackFunnelEvent('scroll_90');
                }
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [pathname]);

    return null;
}

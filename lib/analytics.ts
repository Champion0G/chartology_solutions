'use client';

export type FunnelEvent = 
    | 'page_view' 
    | 'modal_open' 
    | 'workshop_registration' 
    | 'exit_intent_trigger' 
    | 'starter_kit_download'
    | 'faq_expand'
    | 'scroll_50'
    | 'scroll_90'
    | 'whatsapp_click';

export interface EventMetadata {
    ctaId?: string;       // ID of button clicked (e.g. 'hero_primary', 'header_cta', 'sticky_bar')
    faqQuestion?: string; // Title of FAQ expanded
    [key: string]: any;
}

// Utility to parse client device info
function getClientInfo() {
    if (typeof window === 'undefined') return null;

    const ua = navigator.userAgent;
    let deviceType = 'Desktop';
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
        deviceType = /Tablet|iPad/i.test(ua) ? 'Tablet' : 'Mobile';
    }

    // Basic OS parsing
    let os = 'Unknown OS';
    if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/Linux/i.test(ua)) os = 'Linux';

    // Basic Browser parsing
    let browser = 'Unknown Browser';
    if (/Chrome/i.test(ua) && !/Edg|OPR/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Edg/i.test(ua)) browser = 'Edge';
    else if (/OPR|Opera/i.test(ua)) browser = 'Opera';

    // Parse UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || '';
    const utmMedium = urlParams.get('utm_medium') || '';
    const utmCampaign = urlParams.get('utm_campaign') || '';

    // Cache UTM parameters in sessionStorage to keep attribution consistent across page redirects
    if (utmSource) sessionStorage.setItem('funnel_utm_source', utmSource);
    if (utmMedium) sessionStorage.setItem('funnel_utm_medium', utmMedium);
    if (utmCampaign) sessionStorage.setItem('funnel_utm_campaign', utmCampaign);

    return {
        deviceType,
        os,
        browser,
        referrer: document.referrer || 'Direct',
        utm: {
            source: utmSource || sessionStorage.getItem('funnel_utm_source') || 'organic',
            medium: utmMedium || sessionStorage.getItem('funnel_utm_medium') || 'direct',
            campaign: utmCampaign || sessionStorage.getItem('funnel_utm_campaign') || 'none'
        }
    };
}

export function trackFunnelEvent(event: FunnelEvent, metadata?: EventMetadata) {
    if (typeof window === 'undefined') return;

    let sessionId = sessionStorage.getItem('funnel_session_id');
    if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
        sessionStorage.setItem('funnel_session_id', sessionId);
    }

    const client = getClientInfo();

    fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            event,
            path: window.location.pathname,
            sessionId,
            device: client ? {
                type: client.deviceType,
                os: client.os,
                browser: client.browser
            } : undefined,
            attribution: client ? {
                referrer: client.referrer,
                utm_source: client.utm.source,
                utm_medium: client.utm.medium,
                utm_campaign: client.utm.campaign
            } : undefined,
            metadata: metadata || {}
        })
    }).catch(err => {
        console.error('Analytics track error:', err);
    });
}

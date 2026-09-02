'use client';
import { useState } from 'react';
import { Radio, RefreshCw, MessageSquare, Headphones, BookOpen, AlertCircle } from 'lucide-react';
import styles from './workshop.module.css';
import useLiveWorkshop from '@/hooks/useLiveWorkshop';

export default function WorkshopPage() {
    const { isLive, title, description, videoId, loading, refresh } = useLiveWorkshop();
    const [refreshing, setRefreshing] = useState(false);

    const handleManualRefresh = async () => {
        setRefreshing(true);
        await refresh();
        setRefreshing(false);
    };

    const isValidVideoId = videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId);

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                {/* Header Area */}
                <div className={styles.header}>
                    <div className={styles.badgeRow}>
                        <span className={styles.cohortBadge}>Chartology Cohort</span>
                        {loading ? (
                            <span className={styles.inactiveBadge}>
                                <RefreshCw size={12} style={{ animation: 'spin 1.2s linear infinite' }} /> Checking Status...
                            </span>
                        ) : isLive ? (
                            <span className={styles.liveBadge}>
                                <span className={styles.liveDot} /> LIVE NOW
                            </span>
                        ) : (
                            <span className={styles.inactiveBadge}>
                                <Radio size={12} /> SESSION INACTIVE
                            </span>
                        )}
                    </div>

                    <h1 className={styles.title}>
                        {title || 'Financial Markets Masterclass — Live Session'}
                    </h1>
                    {description && (
                        <p className={styles.subtitle}>{description}</p>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className={styles.placeholderCard}>
                        <div className={styles.placeholderIconWrap}>
                            <RefreshCw size={26} style={{ animation: 'spin 1.5s linear infinite' }} />
                        </div>
                        <h2 className={styles.placeholderHeading}>Connecting to Workshop Stream...</h2>
                        <p className={styles.placeholderText}>Please wait while we check for active cohort broadcasts.</p>
                    </div>
                )}

                {/* Active Live Stream Player */}
                {!loading && isLive && (
                    <>
                        {isValidVideoId ? (
                            <div className={styles.playerCard}>
                                <div className={styles.videoWrapper}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                                        title={title || "Live Workshop"}
                                        className={styles.iframe}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.errorCard}>
                                <AlertCircle size={32} style={{ marginBottom: '12px' }} />
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Unable to load the workshop video</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                    The stream is marked live, but the video link could not be loaded. Please check your admin configuration.
                                </p>
                                <button 
                                    onClick={handleManualRefresh} 
                                    disabled={refreshing}
                                    className={styles.refreshBtn}
                                    style={{ marginTop: '16px' }}
                                >
                                    <RefreshCw size={14} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
                                    {refreshing ? 'Refreshing...' : 'Retry Connection'}
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Inactive State Placeholder */}
                {!loading && !isLive && (
                    <div className={styles.placeholderCard}>
                        <div className={styles.placeholderIconWrap}>
                            <Radio size={28} />
                        </div>
                        <h2 className={styles.placeholderHeading}>Workshop isn't live yet</h2>
                        <p className={styles.placeholderText}>
                            The live cohort session will appear here when the workshop begins. Make sure you have your trading journal and charting software ready.
                        </p>

                        {(title || description) && (
                            <div className={styles.agendaBox}>
                                <span className={styles.agendaLabel}>Upcoming Topic</span>
                                <h3 className={styles.agendaTitle}>{title || "Financial Markets Masterclass — Live Session"}</h3>
                                {description && <p className={styles.agendaDesc}>{description}</p>}
                            </div>
                        )}

                        <button 
                            onClick={handleManualRefresh} 
                            disabled={refreshing}
                            className={styles.refreshBtn}
                        >
                            <RefreshCw size={14} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
                            {refreshing ? 'Checking Broadcast Status...' : 'Check If Live Now'}
                        </button>
                    </div>
                )}

                {/* Session Guidelines */}
                <div className={styles.infoGrid}>
                    <div className={styles.infoCard}>
                        <Headphones size={22} className={styles.infoIcon} />
                        <h3 className={styles.infoTitle}>HD Stream & Audio</h3>
                        <p className={styles.infoDesc}>
                            Use headphones for clear audio commentary on real-time price action and market structure analysis.
                        </p>
                    </div>
                    <div className={styles.infoCard}>
                        <MessageSquare size={22} className={styles.infoIcon} />
                        <h3 className={styles.infoTitle}>Live Interaction & Doubts</h3>
                        <p className={styles.infoDesc}>
                            Ask your trading questions during live Q&A breaks. Mentors review submissions directly during the broadcast.
                        </p>
                    </div>
                    <div className={styles.infoCard}>
                        <BookOpen size={22} className={styles.infoIcon} />
                        <h3 className={styles.infoTitle}>Trade Log Auditing</h3>
                        <p className={styles.infoDesc}>
                            Keep your position-sizing spreadsheet and charting notebook accessible throughout the masterclass.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

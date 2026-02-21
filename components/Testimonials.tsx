'use client';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import styles from './Testimonials.module.css';

type MediaType = 'photo' | 'video' | 'none';

interface Testimonial {
    name: string;
    role: string;
    quote: string;
    stars: number;
    avatar: string;
    avatarColor: string;
    media?: { type: MediaType; src: string; thumb?: string };
    profit?: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Priya Sharma',
        role: 'Equity Trader, Mumbai',
        quote: 'Chartology completely transformed how I approach the markets. Within 3 months I went from basic candles to running my own options strategies profitably.',
        stars: 5,
        avatar: 'PS',
        avatarColor: '#c0392b',
        profit: '+₹43,200 this month',
        media: {
            type: 'photo',
            src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=480&q=80&auto=format',
        },
    },
    {
        name: 'Rahul Mehta',
        role: 'Crypto & Forex Trader, Delhi',
        quote: 'The live sessions are incredible. The instructors break down complex concepts in a way that clicks instantly. Best investment I have made in myself.',
        stars: 5,
        avatar: 'RM',
        avatarColor: '#1a6b3c',
        profit: '+₹28,500 this month',
        media: {
            type: 'video',
            src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumb: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=480&q=80&auto=format',
        },
    },
    {
        name: 'Ananya Patel',
        role: 'Part-time Trader, Bangalore',
        quote: 'I never imagined I could understand derivatives this clearly. The trading challenge helped me build confidence with real market conditions.',
        stars: 5,
        avatar: 'AP',
        avatarColor: '#8e44ad',
        profit: '+₹19,000 this month',
        media: {
            type: 'photo',
            src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=480&q=80&auto=format',
        },
    },
    {
        name: 'Vikram Singh',
        role: 'Full-time Trader, Pune',
        quote: 'Quit my 9-to-5 six months after joining Chartology. The risk management module alone was worth every rupee. Now I trade futures full time.',
        stars: 5,
        avatar: 'VS',
        avatarColor: '#d35400',
        profit: '+₹72,000 this month',
        media: {
            type: 'video',
            src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumb: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=480&q=80&auto=format',
        },
    },
    {
        name: 'Neha Kapoor',
        role: 'Swing Trader, Hyderabad',
        quote: 'The curriculum is structured brilliantly. I especially loved the technical analysis deep-dives. My win rate has gone from 38% to over 65%.',
        stars: 5,
        avatar: 'NK',
        avatarColor: '#16a085',
        profit: '+₹34,800 this month',
        media: {
            type: 'photo',
            src: 'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=480&q=80&auto=format',
        },
    },
    {
        name: 'Arjun Nair',
        role: 'Intraday Trader, Chennai',
        quote: 'Enrolled skeptically, graduated a believer. The mentors are accessible, the community is supportive, and the results speak for themselves.',
        stars: 5,
        avatar: 'AN',
        avatarColor: '#2471a3',
        profit: '+₹51,100 this month',
        media: {
            type: 'video',
            src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumb: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=480&q=80&auto=format',
        },
    },
    {
        name: 'Sneha Joshi',
        role: 'Options Trader, Ahmedabad',
        quote: 'Learning options here was eye-opening. The strategies taught are practical, not theoretical fluff. My portfolio is up over 40% since I started.',
        stars: 5,
        avatar: 'SJ',
        avatarColor: '#b7950b',
        profit: '+₹61,500 this month',
        media: {
            type: 'photo',
            src: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=480&q=80&auto=format',
        },
    },
    {
        name: 'Karan Malhotra',
        role: 'Positional Trader, Kolkata',
        quote: 'I was a complete beginner. Now I manage my own portfolio of ₹8 Lakh with confidence. Chartology gave me both the knowledge and the mindset.',
        stars: 5,
        avatar: 'KM',
        avatarColor: '#922b21',
        profit: '+₹38,900 this month',
        media: {
            type: 'video',
            src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumb: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=480&q=80&auto=format',
        },
    },
];

export default function Testimonials() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);

    const scroll = (dir: 'left' | 'right') => {
        if (!trackRef.current) return;
        const card = trackRef.current.querySelector('[data-card]') as HTMLElement;
        const cardW = card ? card.offsetWidth + 20 : 360;
        trackRef.current.scrollBy({ left: dir === 'right' ? cardW : -cardW, behavior: 'smooth' });
    };

    return (
        <section id="testimonials" className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <p className="section-label">Student Stories</p>
                        <h2 className="section-heading" style={{ color: '#fff' }}>What Our Students Say</h2>
                        <p className="section-sub">Real results from real traders who started exactly where you are.</p>
                    </div>
                    <div className={styles.arrows}>
                        <button className={styles.arrow} onClick={() => scroll('left')} aria-label="Scroll left">
                            <ChevronLeft size={20} />
                        </button>
                        <button className={styles.arrow} onClick={() => scroll('right')} aria-label="Scroll right">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Full-width scroll track (no container constraint) */}
            <div className={styles.trackWrap}>
                <div className={styles.track} ref={trackRef}>
                    {testimonials.map((t, i) => (
                        <div key={t.name} className={styles.card} data-card>

                            {/* Media area */}
                            {t.media && t.media.type === 'photo' && (
                                <div className={styles.mediaBox}>
                                    <img src={t.media.src} alt={`${t.name} result`} className={styles.mediaImg} />
                                    <div className={styles.profitBadge}>{t.profit}</div>
                                </div>
                            )}
                            {t.media && t.media.type === 'video' && (
                                <div className={styles.mediaBox}>
                                    {playingIndex === i ? (
                                        <iframe
                                            src={`${t.media.src}?autoplay=1`}
                                            className={styles.videoFrame}
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                            title={`${t.name} video`}
                                        />
                                    ) : (
                                        <div className={styles.thumbWrap} onClick={() => setPlayingIndex(i)}>
                                            <img src={t.media.thumb} alt="Video thumbnail" className={styles.mediaImg} />
                                            <button className={styles.playBtn} aria-label="Play video">
                                                <Play size={22} fill="#fff" />
                                            </button>
                                        </div>
                                    )}
                                    {playingIndex !== i && t.profit && (
                                        <div className={styles.profitBadge}>{t.profit}</div>
                                    )}
                                </div>
                            )}

                            {/* Text content */}
                            <div className={styles.cardBody}>
                                <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
                                <div className={styles.quoteIcon}>"</div>
                                <p className={styles.text}>{t.quote}</p>
                                <div className={styles.author}>
                                    <div className={styles.avatar} style={{ background: t.avatarColor }}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className={styles.name}>{t.name}</div>
                                        <div className={styles.role}>{t.role}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

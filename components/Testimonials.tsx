'use client';
import { useState, useRef } from 'react';
import { Play, Linkedin, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import styles from './Testimonials.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Testimonials() {
    const { ref, visible } = useScrollReveal();
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);

    const videoTestimonials = [
        {
            name: 'Priyanka Gupta',
            role: 'B.Com Student, Delhi University',
            skills: 'Cleared CM-PAS Exam',
            thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=480&q=80&auto=format',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '1m 45s'
        },
        {
            name: 'Suresh Nair',
            role: 'Software Architect, Bangalore',
            skills: 'CM-RMA Risk Certified',
            thumb: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=480&q=80&auto=format',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '2m 10s'
        },
        {
            name: 'Amit Patel',
            role: 'Business Consultant, Mumbai',
            skills: 'Portfolio Allocation Builder',
            thumb: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=480&q=80&auto=format',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '3m 05s'
        }
    ];

    const linkedinRecs = [
        {
            name: 'Ankit Verma',
            title: 'Systems Analyst at TCS',
            quote: 'Chartologic replaced my speculative trading habits with a scientific, backtested execution strategy. The risk modules are absolute gold for corporate professionals planning long-term capital stability.',
            avatar: 'AV',
            avatarBg: '#0e76a8'
        },
        {
            name: 'Sneha Rao',
            title: 'MBA Student, IIM Bangalore',
            quote: 'The structured 8-module timeline is incredibly thorough. I cleared my institutional NISM certification assessments easily after completing their price action and risk modules. Highly structured!',
            avatar: 'SR',
            avatarBg: '#0072b1'
        }
    ];

    const studentTestimonials = [
        { name: 'Rahul Mehta', role: 'Delhi', quote: 'The interactive sessions are outstanding. The mentors break down order flow concepts logically. Best investment in financial education.' },
        { name: 'Ananya Patel', role: 'Bangalore', quote: 'I was skeptical, but the curriculum builds real confidence. Excellent support channels and assignments.' },
        { name: 'Vikram Singh', role: 'Pune', quote: 'Discipline models in Module 4 completely transformed my execution. The position sizing templates are highly practical.' },
        { name: 'Neha Kapoor', role: 'Hyderabad', quote: 'Reading raw market structure instead of lagging indicators has given me massive clarity. The curriculum is extremely detailed.' }
    ];

    return (
        <section id="testimonials" className={styles.section}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Trust & Feedback</p>
                    <h2 className="section-heading">Trusted By Learners Across India</h2>
                    <p className="section-sub">
                        Discover how students and professionals leverage our structured education to build verifiable financial market competencies.
                    </p>
                </div>

                {/* 1. Video Testimonials */}
                <div className={styles.subSection}>
                    <h3 className={styles.subHeading}>Video Case Studies</h3>
                    <div className={styles.videoGrid}>
                        {videoTestimonials.map((v) => (
                            <div key={v.name} className={styles.videoCard}>
                                <div className={styles.videoThumbWrap}>
                                    {playingVideo === v.name ? (
                                        <iframe
                                            src={`${v.videoUrl}?autoplay=1`}
                                            className={styles.videoFrame}
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                            title={v.name}
                                        />
                                    ) : (
                                        <div className={styles.thumbOverlay} onClick={() => setPlayingVideo(v.name)}>
                                            <img src={v.thumb} alt={v.name} className={styles.thumbImg} />
                                            <div className={styles.playBtn}>
                                                <Play size={20} fill="var(--white)" />
                                            </div>
                                            <span className={styles.duration}>{v.duration}</span>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.videoCardBody}>
                                    <h4>{v.name}</h4>
                                    <span className={styles.videoRole}>{v.role}</span>
                                    <div className={styles.badge}>{v.skills}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. LinkedIn Recommendations */}
                <div className={styles.subSection}>
                    <h3 className={styles.subHeading}>LinkedIn Recommendations</h3>
                    <div className={styles.linkedinGrid}>
                        {linkedinRecs.map((l) => (
                            <div key={l.name} className={styles.linkedinCard}>
                                <div className={styles.linkedinHeader}>
                                    <div className={styles.avatar} style={{ background: l.avatarBg }}>
                                        {l.avatar}
                                    </div>
                                    <div>
                                        <h4>{l.name}</h4>
                                        <span className={styles.linkedinTitle}>{l.title}</span>
                                    </div>
                                    <Linkedin className={styles.linkedinIcon} size={18} />
                                </div>
                                <p className={styles.linkedinText}>"{l.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Written Reviews */}
                <div className={styles.subSection}>
                    <h3 className={styles.subHeading}>Student Feedback</h3>
                    <div className={styles.writtenGrid}>
                        {studentTestimonials.map((s, idx) => (
                            <div key={idx} className={styles.writtenCard}>
                                <div className={styles.stars}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={styles.starIcon} fill="var(--red)" />
                                    ))}
                                </div>
                                <p className={styles.writtenQuote}>"{s.quote}"</p>
                                <div className={styles.writtenAuthor}>
                                    <div className={styles.userIconWrap}>
                                        <User size={14} />
                                    </div>
                                    <div>
                                        <span className={styles.writtenName}>{s.name}</span>
                                        <span className={styles.writtenRole}>{s.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

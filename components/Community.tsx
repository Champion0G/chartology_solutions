'use client';
import { BookOpen, Video, Trophy, Users, MessageSquare } from 'lucide-react';
import styles from './Community.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Community() {
    const { ref, visible } = useScrollReveal();

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-register-modal', { detail: { ctaId: 'community_section' } }));
    };

    const features = [
        {
            icon: BookOpen,
            title: 'Learning Management System (LMS)',
            desc: 'Access 100+ hours of structured video lessons, research templates, and documentation 24/7.'
        },
        {
            icon: Video,
            title: 'Doubt-Clearing Sessions',
            desc: 'Join weekly live Q&A sessions to clarify doubts, audit trade logs, and review charting setups.'
        },
        {
            icon: Trophy,
            title: 'Weekly Competitions',
            desc: 'Apply your strategies in simulated live-market challenges to build consistency and confidence.'
        },
        {
            icon: Users,
            title: 'Peer Groups',
            desc: 'Collaborate with a highly motivated network of fellow learners, sharing research and backtest logs.'
        },
        {
            icon: MessageSquare,
            title: 'Daily Discussions',
            desc: 'Discuss market opening indicators, macroeconomic events, and post-session audits every day.'
        }
    ];

    return (
        <section id="community" className={styles.section}>
            <div className={`container ${styles.inner}`} ref={ref as any}>
                {/* Left Side: Copy features */}
                <div className={`${styles.content} ${visible ? styles.visible : ''}`}>
                    <p className="section-label">The Learning Ecosystem</p>
                    <h2 className="section-heading">Everything You Need to Build Market Competency</h2>
                    <p className="section-sub">
                        Skip the isolation. Our structured curriculum is supported by a comprehensive system of materials, tools, mentors, and accountability groups.
                    </p>

                    <div className={styles.benefits}>
                        {features.map((f, idx) => {
                            const Icon = f.icon;
                            return (
                                <div key={f.title} className={styles.benefit}>
                                    <div className={styles.iconWrap}>
                                        <Icon className={styles.icon} size={20} />
                                    </div>
                                    <div>
                                        <h4 className={styles.benefitTitle}>{f.title}</h4>
                                        <p className={styles.benefitDesc}>{f.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <a href="#register" onClick={handleRegisterClick} className="btn-primary" style={{ marginTop: '36px' }}>
                        Reserve Seat & Access Portal
                    </a>
                </div>

                {/* Right Side: High-res phone screenshot */}
                <div className={`${styles.visual} ${visible ? styles.visible : ''}`} style={{ transitionDelay: '150ms' }}>
                    <div className={styles.phoneImageContainer}>
                        <img 
                            src="/phone-mockup-screenshot-v2.png" 
                            alt="Watchlist interface on iPhone"
                            className={styles.phoneImage}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

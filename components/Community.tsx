'use client';
import { BookOpen, Video, Trophy, Users, MessageSquare, ChevronRight } from 'lucide-react';
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

                {/* Right Side: Animated LMS dashboard iPhone mockup */}
                <div className={`${styles.visual} ${visible ? styles.visible : ''}`} style={{ transitionDelay: '150ms' }}>
                    <div className={styles.phoneMockup}>
                        <div className={styles.phoneNotch} />
                        
                        <div className={styles.phoneScreen}>
                            {/* App Header */}
                            <div className={styles.phoneHeader}>
                                <div className={styles.portalLogo}>
                                    Charto<span>logic</span>
                                </div>
                                <div className={styles.portalUser}>AS</div>
                            </div>

                            {/* Course Progress Card */}
                            <div className={styles.courseCard}>
                                <h5>Technical Trader Practitioner</h5>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--muted)' }}>
                                    <span>Course Progress</span>
                                    <span>68% Done</span>
                                </div>
                                <div className={styles.courseProgress}>
                                    <div className={styles.progressBar} />
                                </div>
                            </div>

                            {/* Modules List */}
                            <div className={styles.moduleList}>
                                <div className={styles.moduleItem}>
                                    <span className={styles.moduleCheck}>✓</span>
                                    <div className={styles.moduleInfo}>
                                        <h6 className={styles.moduleTitle}>1. Structural Mechanics</h6>
                                        <span className={styles.moduleStatus}>Completed</span>
                                    </div>
                                </div>
                                <div className={styles.moduleItem}>
                                    <span className={styles.moduleCheck}>✓</span>
                                    <div className={styles.moduleInfo}>
                                        <h6 className={styles.moduleTitle}>2. Risk Calculator & Logs</h6>
                                        <span className={styles.moduleStatus}>Completed</span>
                                    </div>
                                </div>
                                <div className={styles.moduleItem}>
                                    <div className={styles.moduleDot} />
                                    <div className={styles.moduleInfo}>
                                        <h6 className={styles.moduleTitle}>3. Sizing Challenge</h6>
                                        <span className={styles.moduleStatus} style={{ color: 'var(--red)' }}>Active Practice</span>
                                    </div>
                                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.2)' }} />
                                </div>
                                <div className={styles.moduleItem} style={{ opacity: 0.6 }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)', flexShrink: 0 }}>🔒</span>
                                    <div className={styles.moduleInfo}>
                                        <h6 className={styles.moduleTitle}>4. Algorithmic Automation</h6>
                                        <span className={styles.moduleStatus}>Locked</span>
                                    </div>
                                </div>
                            </div>

                            {/* Live Session Widget */}
                            <div className={styles.liveWidget}>
                                <div className={styles.liveIndicator} />
                                <div className={styles.liveText}>
                                    <h6>Live Q&A Session</h6>
                                    <p>Starts in 2 hours • Join with Mentor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

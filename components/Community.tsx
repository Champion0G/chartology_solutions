'use client';
import { Users, MessageSquare, ShieldCheck, Share2 } from 'lucide-react';
import styles from './Community.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Community() {
    const { ref, visible } = useScrollReveal();

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-register-modal', { detail: { ctaId: 'community_section' } }));
    };

    return (
        <section id="community" className={styles.section}>
            <div className={`container ${styles.inner}`} ref={ref as any}>
                <div className={`${styles.content} ${visible ? styles.visible : ''}`}>
                    <p className="section-label">The Network Effect</p>
                    <h2 className="section-heading">You're Not Learning Alone</h2>
                    <p className="section-sub">
                        Trading and investing can be lonely and emotionally challenging in isolation. At Chartologic, you join an active, moderated ecosystem of like-minded learners and expert mentors across WhatsApp, Discord, and Telegram.
                    </p>

                    <div className={styles.benefits}>
                        <div className={styles.benefit}>
                            <Users className={styles.icon} size={20} />
                            <div>
                                <h4 className={styles.benefitTitle}>Peer Accountability Groups</h4>
                                <p className={styles.benefitDesc}>Get paired with study buddies to review trades, track homework, and keep each other disciplined.</p>
                            </div>
                        </div>

                        <div className={styles.benefit}>
                            <MessageSquare className={styles.icon} size={20} />
                            <div>
                                <h4 className={styles.benefitTitle}>Daily Market Discussions</h4>
                                <p className={styles.benefitDesc}>Discuss pre-market watchlists, active setups, and share charts in real time during trading hours.</p>
                            </div>
                        </div>

                        <div className={styles.benefit}>
                            <Share2 className={styles.icon} size={20} />
                            <div>
                                <h4 className={styles.benefitTitle}>Lifetime Network Access</h4>
                                <p className={styles.benefitDesc}>Connect with alumni, form regional meetups, and leverage institutional level resources.</p>
                            </div>
                        </div>
                    </div>

                    <a href="#register" onClick={handleRegisterClick} className="btn-primary" style={{ marginTop: '36px' }}>
                        Join Our Community
                    </a>
                </div>

                <div className={`${styles.visual} ${visible ? styles.visible : ''}`} style={{ transitionDelay: '150ms' }}>
                    <div className={styles.meshBg}>
                        <div className={styles.chatPreview}>
                            <div className={styles.chatMessage}>
                                <span className={styles.avatar}>👤</span>
                                <div>
                                    <div className={styles.sender}>Aman K. <span className={styles.time}>10:14 AM</span></div>
                                    <p className={styles.msgText}>Spotting a beautiful double bottom pattern on Tata Motors 15m chart. Volume is validating. What do you think?</p>
                                </div>
                            </div>
                            <div className={styles.chatMessage}>
                                <span className={styles.avatar} style={{ background: 'var(--red)' }}>🎙</span>
                                <div>
                                    <div className={styles.sender}>Mentor <span className={styles.time}>10:16 AM</span></div>
                                    <p className={styles.msgText}>Looks clean, Aman. Ensure your stop-loss sits right below the swing low. Keep position sizing to 0.5% risk for this market environment.</p>
                                </div>
                            </div>
                            <div className={styles.chatMessage}>
                                <span className={styles.avatar}>👤</span>
                                <div>
                                    <div className={styles.sender}>Rohan S. <span className={styles.time}>10:18 AM</span></div>
                                    <p className={styles.msgText}>Thanks for the review, entering with 1% total risk. System rules aligned.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.indicatorCard}>
                            <div className={styles.indHeader}>
                                <Users size={16} className={styles.indIcon} />
                                <span className={styles.indTitle}>Active Members</span>
                            </div>
                            <div className={styles.indVal}>5,240+</div>
                            <div className={styles.indSub}>Sharing charts daily</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


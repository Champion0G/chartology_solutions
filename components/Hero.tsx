'use client';
import { useEffect, useRef } from 'react';
import { ArrowRight, User } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        requestAnimationFrame(() => { el.classList.add(styles.visible); });
    }, []);

    return (
        <section id="hero" className={styles.hero} ref={heroRef}>

            {/* Full-bleed trainer photo — right side */}
            <div className={styles.photoBg} aria-hidden="true">
                <img
                    src="/trainer.jpg"
                    alt="Lead trading instructor"
                    className={styles.trainerImg}
                    loading="eager"
                />
                {/* Dot-grid overlay (matches reference) */}
                <div className={styles.dotGrid} aria-hidden="true" />
                {/* Left-to-right fade so text stays readable */}
                <div className={styles.fadeOverlay} aria-hidden="true" />
            </div>

            {/* Text content — overlaid on left */}
            <div className={styles.inner}>
                <div className={styles.content}>
                    <p className={styles.eyebrow}>🔴 PREMIUM TRADING EDUCATION</p>

                    <h1 className={styles.headline}>
                        Master Trading With<br />
                        <span className={styles.redText}>Proven Systems &</span><br />
                        Expert Guidance!
                    </h1>

                    <p className={styles.sub}>
                        Transform your trading journey with structured live cohorts, personalized mentorship, risk management frameworks, practical market sessions, and an active peer learning community.
                    </p>

                    <div className={styles.ctas}>
                        <a href="#register" className={styles.btnPrimary}>
                            <User size={17} /> Register for Free Workshop
                        </a>
                        <a href="#programs" className={styles.btnOutline}>
                            Explore Programs <ArrowRight size={17} />
                        </a>
                    </div>

                    <div className={styles.stats}>
                        {[
                            ['10,000+', 'Students Trained'],
                            ['5,000+', 'Community Members'],
                            ['500+', 'Live Sessions'],
                            ['24/7', 'Mentor Support']
                        ].map(([val, label]) => (
                            <div key={label} className={styles.stat}>
                                <span className={styles.statVal}>{val}</span>
                                <span className={styles.statLabel}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom tagline (matches reference) */}
            <div className={styles.tagline} aria-hidden="true">
                STOCK MARKET FOR EVERYONE
            </div>

        </section>
    );
}


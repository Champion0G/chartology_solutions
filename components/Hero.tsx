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
                    <p className={styles.eyebrow}>🔴 Stock Market For Everyone</p>

                    <h1 className={styles.headline}>
                        Invest in yourself,<br />
                        <span className={styles.redText}>Before investing</span><br />
                        in the markets!
                    </h1>

                    <p className={styles.sub}>
                        Flexible, easy-to-access learning opportunities can bring significant
                        change in how you prefer to learn. The eCademy can offer you the
                        beauty of eLearning!
                    </p>

                    <div className={styles.ctas}>
                        <a href="#inquiry" className={styles.btnPrimary}>
                            <User size={17} /> Join For Free
                        </a>
                        <a href="#learning" className={styles.btnOutline}>
                            View Curriculum <ArrowRight size={17} />
                        </a>
                    </div>

                    <div className={styles.stats}>
                        {[['10,000+', 'Students Enrolled'], ['100+', 'Live Hours'], ['95%', 'Success Rate']].map(([val, label]) => (
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

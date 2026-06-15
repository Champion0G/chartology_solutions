'use client';
import { useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        requestAnimationFrame(() => { el.classList.add(styles.visible); });
    }, []);

    const trustItems = [
        'Students & Professionals',
        'Live Workshops',
        'Expert Mentorship',
        'Certifications',
        'Community Support'
    ];

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-register-modal'));
    };

    return (
        <section id="hero" className={styles.hero} ref={heroRef}>
            {/* Background Image / Gradient */}
            <div className={styles.photoBg} aria-hidden="true">
                <img
                    src="/trainer.jpg"
                    alt="Financial markets charting"
                    className={styles.trainerImg}
                    loading="eager"
                />
                <div className={styles.dotGrid} aria-hidden="true" />
                <div className={styles.fadeOverlay} aria-hidden="true" />
            </div>

            {/* Inner Content overlay */}
            <div className={styles.inner}>
                <div className={styles.content}>
                    <p className={styles.eyebrow}>
                        Premium Market Education
                    </p>

                    <h1 className={styles.headline}>
                        Master Stocks, Forex & Crypto<br />
                        Markets Through<br />
                        <span className={styles.redText}>Structured Learning</span>
                    </h1>

                    <p className={styles.sub}>
                        Designed for students and working professionals who want to develop financial market knowledge, analytical skills, risk management expertise, and practical market understanding.
                    </p>

                    <div className={styles.ctas}>
                        <a href="#register" onClick={handleRegisterClick} className={styles.btnPrimary}>
                            Reserve My Workshop Seat
                        </a>
                        <a href="#register" onClick={handleRegisterClick} className={styles.btnOutline}>
                            📘 Download Program Brochure <ArrowRight size={17} />
                        </a>
                    </div>

                    {/* Section 1 Trust Bar Below CTA */}
                    <div className={styles.trustBar}>
                        {trustItems.map((item) => (
                            <div key={item} className={styles.trustItem}>
                                <Check size={14} className={styles.checkIcon} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

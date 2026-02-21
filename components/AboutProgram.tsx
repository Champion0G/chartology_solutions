'use client';
import { CheckCircle2 } from 'lucide-react';
import styles from './AboutProgram.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

const bullets = [
    'Expert trainers with 10+ years of live trading experience',
    'Lifetime LMS access — revisit material anytime',
    '100% remote — learn from any device, any time zone',
    'Personal development & trading psychology modules',
    'Small batch sizes for personalized mentorship',
];

export default function AboutProgram() {
    const { ref, visible } = useScrollReveal();

    return (
        <section id="about" className={styles.section}>
            <div className={`container ${styles.inner}`} ref={ref as any}>
                {/* Left: Image */}
                <div className={`${styles.imgCol} ${visible ? styles.visible : ''}`}>
                    <div className={styles.imgWrap}>
                        <img
                            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=580&q=80&auto=format"
                            alt="Trading setup with multiple monitors"
                            className={styles.img}
                            loading="lazy"
                        />
                        <div className={styles.glowRed} aria-hidden="true" />
                    </div>
                </div>

                {/* Right: Content */}
                <div className={`${styles.content} ${visible ? styles.visible : ''}`} style={{ transitionDelay: '120ms' }}>
                    <p className="section-label">About the Program</p>
                    <h2 className="section-heading">
                        Master Trading &<br /><span style={{ color: 'var(--red)' }}>Financial Intelligence</span>
                    </h2>
                    <p className="section-sub">
                        Our curriculum is built for real-world applicability — from reading charts to managing capital at scale.
                    </p>
                    <ul className={styles.list}>
                        {bullets.map((b) => (
                            <li key={b} className={styles.listItem}>
                                <CheckCircle2 size={18} className={styles.check} />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                    <a href="#learning" className="btn-outline" style={{ marginTop: '32px', alignSelf: 'flex-start' }}>
                        View Curriculum
                    </a>
                </div>
            </div>
        </section>
    );
}

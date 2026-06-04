'use client';
import { CheckCircle2 } from 'lucide-react';
import styles from './AboutProgram.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

const bullets = [
    'Structured education focusing on long-term wealth building, not quick wins.',
    'Emphasis on financial literacy as a core life skill for capital growth.',
    'Small batch cohorts ensuring interactive live Q&As and personal reviews.',
    'Strict risk management frameworks designed to preserve and protect capital.',
    'Lifetime access to a supportive network of alumni and ongoing education.'
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
                    <p className="section-label">Our Mission</p>
                    <h2 className="section-heading">
                        Why Chartologic<br /><span style={{ color: 'var(--red)' }}>Exists</span>
                    </h2>
                    <p className="section-sub">
                        We believe that financial literacy is the key to personal independence. Our platform focuses entirely on helping you master the mechanics of trading, manage risk scientifically, and build long-term wealth.
                    </p>
                    <ul className={styles.list}>
                        {bullets.map((b) => (
                            <li key={b} className={styles.listItem}>
                                <CheckCircle2 size={18} className={styles.check} />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                    <a href="#curriculum" className="btn-outline" style={{ marginTop: '32px', alignSelf: 'flex-start' }}>
                        Explore Curriculum
                    </a>
                </div>
            </div>
        </section>
    );
}


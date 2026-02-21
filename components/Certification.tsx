'use client';
import { CheckCircle2 } from 'lucide-react';
import styles from './Certification.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

const bullets = [
    'Verified digital certification on course completion',
    'Shareable digital badge for LinkedIn & socials',
    'Industry-recognized by leading trading institutions',
    'Credentialing backed by exam-based assessment',
    'Separate certificates for each asset class',
];

export default function Certification() {
    const { ref, visible } = useScrollReveal();

    return (
        <section id="certification" className={styles.section}>
            <div className={`container ${styles.inner}`} ref={ref as any}>
                {/* Left: Certification image */}
                <div className={`${styles.imgCol} ${visible ? styles.visible : ''}`}>
                    <div className={styles.imgWrap}>
                        <img
                            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=580&q=80&auto=format"
                            alt="Digital certification badge on laptop"
                            className={styles.img}
                            loading="lazy"
                        />
                        <div className={styles.certBadge}>
                            <span style={{ fontSize: '2rem' }}>🏆</span>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Certified Trader</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Chartology Academy</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className={`${styles.content} ${visible ? styles.visible : ''}`} style={{ transitionDelay: '120ms' }}>
                    <p className="section-label">Certification</p>
                    <h2 className="section-heading">
                        Get Your Quality Skills Certificate<br />Through Online Exam
                    </h2>
                    <p className="section-sub">Prove your trading expertise with our globally recognized certifications.</p>
                    <ul className={styles.list}>
                        {bullets.map((b) => (
                            <li key={b} className={styles.listItem}>
                                <CheckCircle2 size={18} className={styles.check} />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                    <a href="#inquiry" className="btn-primary" style={{ marginTop: '32px', alignSelf: 'flex-start' }}>
                        Apply Now
                    </a>
                </div>
            </div>
        </section>
    );
}

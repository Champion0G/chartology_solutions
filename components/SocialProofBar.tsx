'use client';
import styles from './SocialProofBar.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function SocialProofBar() {
    const { ref, visible } = useScrollReveal();

    const stats = [
        { val: '7,483+', label: 'Learners Reached' },
        { val: '70+', label: 'Workshops Conducted' },
        { val: '4k+', label: 'Community Members' },
        { val: '8', label: 'Certification Tracks' }
    ];

    return (
        <section className={styles.section} ref={ref as any}>
            <div className={`container ${styles.inner}`}>
                <p className={styles.title}>Trusted By Learners Across India</p>
                <div className={styles.grid}>
                    {stats.map((s, i) => (
                        <div
                            key={s.label}
                            className={`${styles.stat} ${visible ? styles.visible : ''}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <span className={styles.val}>{s.val}</span>
                            <span className={styles.label}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

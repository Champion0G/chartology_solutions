'use client';
import { ArrowRight } from 'lucide-react';
import styles from './AboutTrainer.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function AboutTrainer() {
    const { ref, visible } = useScrollReveal();

    return (
        <section id="trainer" className={styles.section}>
            <div className={`container ${styles.inner}`} ref={ref as any}>

                {/* Left: Text */}
                <div className={`${styles.content} ${visible ? styles.visible : ''}`}>
                    <p className={styles.label}>Get to Know</p>
                    <h2 className={styles.heading}>
                        Meet Your Expert<br />
                        <span className={styles.red}>Trading Mentor</span>
                    </h2>
                    <p className={styles.body}>
                        eCademy Self Development Course can assist you in bringing the significant changes
                        in personal understanding and reshaping the confidence to achieve the best from your
                        career! We trust that learning should be enjoyable, and only that can make substantial
                        changes to someone!
                    </p>
                    <p className={styles.body} style={{ marginTop: '16px' }}>
                        With over <strong>12 years of live trading experience</strong> across equities,
                        forex, and derivatives markets, our lead instructor has mentored more than
                        10,000 students to financial independence.
                    </p>

                    <div className={styles.stats}>
                        {[
                            ['12+', 'Years Trading'],
                            ['10K+', 'Students'],
                            ['₹5Cr+', 'Capital Managed'],
                        ].map(([val, label]) => (
                            <div key={label} className={styles.stat}>
                                <span className={styles.statVal}>{val}</span>
                                <span className={styles.statLabel}>{label}</span>
                            </div>
                        ))}
                    </div>

                    <a href="#inquiry" className={styles.cta}>
                        <span>🎓</span> Start For Free <ArrowRight size={16} />
                    </a>
                </div>

                {/* Right: Trainer image */}
                <div className={`${styles.imgCol} ${visible ? styles.visible : ''}`} style={{ transitionDelay: '130ms' }}>
                    <div className={styles.imgWrap}>
                        <img
                            src="/trainer-profile.png"
                            alt="Lead trading instructor"
                            className={styles.img}
                            loading="lazy"
                        />
                        <div className={styles.floatCard}>
                            <div className={styles.floatIcon}>🏆</div>
                            <div>
                                <div className={styles.floatTitle}>SEBI Certified</div>
                                <div className={styles.floatSub}>Research Analyst</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}


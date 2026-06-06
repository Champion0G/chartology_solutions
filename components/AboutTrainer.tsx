'use client';
import { ArrowRight, Award, Library, GraduationCap, Microscope } from 'lucide-react';
import styles from './AboutTrainer.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function AboutTrainer() {
    const { ref, visible } = useScrollReveal();

    const qualities = [
        { icon: Award, label: '12+ Years Experience', desc: 'Active market participation across multi-asset categories since 2014.' },
        { icon: Microscope, label: 'Research Backed', desc: 'Focus on mathematical position sizing models and structured trade logging.' },
        { icon: GraduationCap, label: '10K+ Students Mentored', desc: 'Delivering structured workshops and professional education frameworks.' },
        { icon: Library, label: 'SEBI Certified RA', desc: 'Qualified credentials ensuring strict, compliant educational standards.' }
    ];

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-register-modal'));
    };

    return (
        <section id="trainer" className={styles.section} ref={ref as any}>
            <div className={`container ${styles.inner}`}>
                {/* Left: Text Content */}
                <div className={`${styles.content} ${visible ? styles.visible : ''}`}>
                    <p className={styles.label}>Experienced Mentorship</p>
                    <h2 className={styles.heading}>
                        Learn From Experienced<br />
                        <span className={styles.red}>Market Professionals</span>
                    </h2>
                    <p className={styles.body}>
                        We do not sell lifestyle dreams, luxury cars, or quick financial shortcuts. Our education is led by market practitioners with a combined participation history spanning over a decade.
                    </p>
                    <p className={styles.body} style={{ marginTop: '16px' }}>
                        We teach structured market participation based on historical patterns, mathematical drawing indices, risk parameters, and continuous post-execution audits.
                    </p>
 
                    <div className={styles.statsGrid}>
                        {qualities.map((q) => {
                            const Icon = q.icon;
                            return (
                                <div key={q.label} className={styles.statCard}>
                                    <div className={styles.iconWrap}>
                                        <Icon size={18} className={styles.icon} />
                                    </div>
                                    <div>
                                        <h4 className={styles.statLabel}>{q.label}</h4>
                                        <p className={styles.statDesc}>{q.desc}</p>
                                    </div>
                                </div>
                             );
                        })}
                    </div>

                    <a href="#register" onClick={handleRegisterClick} className={styles.cta}>
                        <span>🎓</span> Reserve My Workshop Seat <ArrowRight size={16} />
                    </a>
                </div>

                {/* Right: Trainer profile photo */}
                <div className={`${styles.imgCol} ${visible ? styles.visible : ''}`} style={{ transitionDelay: '130ms' }}>
                    <div className={styles.imgWrap}>
                        <img
                            src="/trainer-profile.png"
                            alt="Lead market education instructor"
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

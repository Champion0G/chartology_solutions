'use client';
import { Brain, Compass, ShieldCheck, Landmark, BarChart3, GraduationCap } from 'lucide-react';
import styles from './WhyMarketEducation.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function WhyMarketEducation() {
    const { ref, visible } = useScrollReveal();

    const skills = [
        { icon: Brain, title: 'Analytical Thinking', desc: 'Synthesize complex chart dynamics and price behaviors systematically.' },
        { icon: Compass, title: 'Decision Making', desc: 'Make rational, rule-based choices in fast-moving and volatile conditions.' },
        { icon: ShieldCheck, title: 'Risk Assessment', desc: 'Quantify probabilities and protect resources through math-based limits.' },
        { icon: Landmark, title: 'Financial Literacy', desc: 'Build a solid baseline of wealth mechanics, inflation protection, and asset classes.' },
        { icon: BarChart3, title: 'Market Understanding', desc: 'Gain clarity on stock exchanges, central banks, and global currency dynamics.' }
    ];

    return (
        <section id="why-market-education" className={styles.section} ref={ref as any}>
            <div className={`container ${styles.inner}`}>
                {/* Left Side: Editorial Text */}
                <div className={`${styles.left} ${visible ? styles.visible : ''}`}>
                    <p className="section-label">A Core Life Skill</p>
                    <h2 className="section-heading">Financial Market Knowledge Is Becoming An Essential Skill</h2>
                    <p className={styles.intro}>
                        Whether you are a student preparing for your career or a working professional planning your financial future, traditional education rarely teaches the mechanics of financial markets.
                    </p>
                    <p className={styles.body}>
                        Developing market competency is not about chasing speculative gains. It is about understanding global economic cycles, learning to structure risk, and building critical thinking frameworks that apply to any business, career, or personal venture.
                    </p>
                </div>

                {/* Right Side: Essential Skills Grid */}
                <div className={`${styles.right} ${visible ? styles.visible : ''}`} style={{ transitionDelay: '150ms' }}>
                    <div className={styles.skillsGrid}>
                        {skills.map((s, idx) => {
                            const Icon = s.icon;
                            return (
                                <div key={s.title} className={styles.skillCard}>
                                    <div className={styles.iconWrap}>
                                        <Icon size={22} className={styles.icon} />
                                    </div>
                                    <div>
                                        <h4>{s.title}</h4>
                                        <p>{s.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

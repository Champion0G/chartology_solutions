'use client';
import { Brain, Compass, ShieldCheck, Landmark, BarChart3, GraduationCap } from 'lucide-react';
import styles from './WhyMarketEducation.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function WhyMarketEducation() {
    const { ref, visible } = useScrollReveal();

    const skills = [
        { icon: Landmark, title: 'Financial Literacy', desc: 'Master the absolute fundamentals of money, assets, and inflation.' },
        { icon: Compass, title: 'Global Market Understanding', desc: 'See the big picture of macroeconomics and global trade cycles.' },
        { icon: Brain, title: 'Analytical Thinking & Decision Making', desc: 'Turn complex market data into clear, rule-based actions.' },
        { icon: BarChart3, title: 'Financial Planning & Investments', desc: 'Structure your investments to align with long-term financial goals.' },
        { icon: ShieldCheck, title: 'Capital Allocation & Portfolio Management', desc: 'Balance risk and reward effectively across a diversified portfolio.' }
    ];

    return (
        <section id="why-market-education" className={styles.section} ref={ref as any}>
            <div className={`container ${styles.inner}`}>
                {/* Left Side: Editorial Text */}
                <div className={`${styles.left} ${visible ? styles.visible : ''}`}>
                    <div className={styles.headerBlock}>
                        <p className="section-label">A Core Life Skill</p>
                        <h2 className="section-heading">Financial Market Knowledge Is Becoming An Essential Skill</h2>
                    </div>
                    
                    <div className={styles.bodyText}>
                        <p className={styles.body} style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--muted)' }}>
                            Whether you are a student preparing for your career or a working professional planning your financial future, traditional education rarely teaches the mechanics of financial markets.
                        </p>
                        <p className={styles.body} style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--muted)', marginTop: '14px', fontWeight: 'bold' }}>
                            While industry trends like IT, AI, and emerging technologies will continuously evolve and disrupt, financial markets are a permanent fixture of our global economy that will endure for our lifetimes.
                        </p>
                        <p className={styles.body} style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--muted)', marginTop: '14px' }}>
                            Developing market competency is not about chasing speculative gains. It is about understanding global economic cycles, learning to structure risk, and building critical thinking frameworks that apply to any business, career, or personal venture.
                        </p>
                    </div>
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

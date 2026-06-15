'use client';
import { BookOpen, Shield, Users, BarChart2, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import styles from './Programs.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Programs() {
    const { ref, visible } = useScrollReveal();

    const pillars = [
        {
            icon: BarChart2,
            title: 'Multi-Asset Mastery',
            desc: 'A unified curriculum covering Indian Equities (Stocks), Forex, Cryptocurrencies, and Derivatives (Futures & Options).'
        },
        {
            icon: Briefcase,
            title: 'Funded Capital Allocation',
            desc: 'Top-performing graduates of the residency are allocated live prop trading capital with a profit share scheme to trade live markets.'
        },
        {
            icon: Shield,
            title: 'Institutional Risk Control',
            desc: 'Master the mathematical draw-down models and position sizing systems used by professional treasury desks.'
        },
        {
            icon: Users,
            title: 'Live Market Mentorship',
            desc: 'Attend scheduled live charting sessions, submit weekend trade logs, and review execution mistakes directly with active mentors.'
        }
    ];

    const curriculumHighlights = [
        'Complete Stock Market Mechanics & Execution',
        'Technical Analysis & Indicators (RSI, EMAs, MACD)',
        'Raw Price Action & Market Structure (BOS, Liquidity Sweeps)',
        'Derivatives Trading (Hedging, Spread Building, Options Chains)',
        'Forex & Crypto Execution Frameworks',
        'Live Capital Auditing & Prop Trading Standards',
        'Trading Psychology & Professional Trade Journaling'
    ];

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-register-modal'));
    };

    return (
        <section id="programs" className={styles.section}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Our Flagship Program</p>
                    <h2 className="section-heading">The Chartologic Trading Residency</h2>
                    <p className="section-sub">
                        An elite, structured accelerator designed to take you from absolute scratch to trading live prop capital across major asset classes.
                    </p>
                </div>

                <div ref={ref as any} className={`${styles.flagshipContainer} ${visible ? styles.visible : ''}`}>
                    {/* Left: Program Overview & Value Props */}
                    <div className={styles.left}>
                        <span className={styles.flagshipBadge}>🏆 Capital Incubator</span>
                        <h3 className={styles.title}>The Chartologic Trading Residency</h3>
                        <p className={styles.desc}>
                            We do not sell fragmented courses. The Residency is our single, intensive program designed to train retail traders to institutional standards, with direct live capital backing for top performers.
                        </p>

                        <div className={styles.pillars}>
                            {pillars.map((p) => {
                                const Icon = p.icon;
                                return (
                                    <div key={p.title} className={styles.pillar}>
                                        <div className={styles.iconWrap}>
                                            <Icon size={20} className={styles.icon} />
                                        </div>
                                        <div>
                                            <h4 className={styles.pillarTitle}>{p.title}</h4>
                                            <p className={styles.pillarDesc}>{p.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Deliverables, Details, and CTA */}
                    <div className={styles.right}>
                        <div className={styles.metaBox}>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Duration</span>
                                <span className={styles.metaVal}>6 Months</span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Backing</span>
                                <span className={styles.metaVal}>Prop Capital</span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Format</span>
                                <span className={styles.metaVal}>Live + Capital Audit</span>
                            </div>
                        </div>

                        <div className={styles.highlightsSection}>
                            <h4 className={styles.highlightsHeading}>What is Covered:</h4>
                            <ul className={styles.highlightsList}>
                                {curriculumHighlights.map((hl, idx) => (
                                    <li key={idx} className={styles.highlightItem}>
                                        <CheckCircle2 size={16} className={styles.checkIcon} />
                                        <span>{hl}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.ctaBox}>
                            <p className={styles.ctaText}>
                                Learn how to qualify for capital allocation. Register for our upcoming live workshop.
                            </p>
                            <a href="/#register" onClick={handleRegisterClick} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Register for Workshop <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';
import { Award, ShieldCheck, Check, Sparkles } from 'lucide-react';
import styles from './Certification.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Certification() {
    const { ref, visible } = useScrollReveal();

    const certs = [
        { title: 'Financial Markets Foundation', desc: 'Validates structure of global exchanges, indices mechanics, order types, and clearing houses.', code: 'CM-FND' },
        { title: 'Technical Trader Practitioner', desc: 'Validates trends analysis, candlestick patterns, support & resistance, and multi-timeframe analysis.', code: 'CM-TTP' },
        { title: 'Price Action Specialist', desc: 'Validates raw market structures, breaks of structure, order blocks, FVG, and liquidity sweeps.', code: 'CM-PAS' },
        { title: 'Risk Management Associate', desc: 'Validates position sizing math, 1% rule models, drawdown parameters, and capital rules.', code: 'CM-RMA' },
        { title: 'Trading Psychology Certified', desc: 'Validates systemic checks, discipline protocols, journal records, and cognitive biases.', code: 'CM-TPC' },
        { title: 'Equity Analysis Specialist', desc: 'Validates corporate filings, balance sheets, cash flow models, and fundamental ratios.', code: 'CM-EAS' },
        { title: 'Derivatives & Options Expert', desc: 'Validates options chain analysis, spread strategies, futures hedging, and Greeks mathematics.', code: 'CM-DOE' },
        { title: 'Portfolio Allocation Architect', desc: 'Validates risk-adjusted returns, satellite assets, rebalancing protocols, and compounding roadmaps.', code: 'CM-PAA' }
    ];

    return (
        <section id="certification" className={styles.section} ref={ref as any}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Skill Credentials</p>
                    <h2 className="section-heading">Earn Certifications Along The Way</h2>
                    <p className="section-sub">
                        Accelerate your credibility. Pass module assessments and evaluation stages to secure verifiable digital credentials.
                    </p>
                </div>

                <div className={`${styles.grid} ${visible ? styles.visible : ''}`}>
                    {certs.map((c, i) => (
                        <div
                            key={c.code}
                            className={styles.card}
                            style={{ transitionDelay: `${(i % 4) * 80}ms` }}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.badgeWrap}>
                                    <Award size={18} className={styles.badgeIcon} />
                                    <span className={styles.code}>{c.code}</span>
                                </div>
                                <ShieldCheck size={18} className={styles.verifiedIcon} />
                            </div>
                            <h3>{c.title}</h3>
                            <p>{c.desc}</p>
                            <div className={styles.footer}>
                                <Check size={12} className={styles.checkIcon} />
                                <span>Exam-Verified Assessment</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

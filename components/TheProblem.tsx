'use client';
import { XCircle, CheckCircle2 } from 'lucide-react';
import styles from './TheProblem.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function TheProblem() {
    const { ref, visible } = useScrollReveal();

    const pitfalls = [
        { label: 'The Hype', desc: 'Blindly following random social media advice.' },
        { label: 'The Illusion', desc: 'Relying on luck instead of proven systems.' },
        { label: 'The Noise', desc: 'Getting paralyzed by endless information overload.' },
        { label: 'The Blindspot', desc: 'Trading without defined risk or backtested strategies.' },
        { label: 'The Casino', desc: 'Pure gambling disguised as investing.' }
    ];

    const solutions = [
        { label: 'The Roadmap', desc: 'Structured, step-by-step learning to build your foundation.' },
        { label: 'The Edge', desc: 'Practical frameworks and actionable, proven strategies.' },
        { label: 'The Data', desc: 'Continuous assessment and backtested results you can trust.' },
        { label: 'The Shield', desc: 'Disciplined risk management to protect your capital.' },
        { label: 'The Network', desc: 'Expert guidance and a supportive community of peers.' }
    ];

    return (
        <section id="problem" className={styles.section} ref={ref as any}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">The Market Reality</p>
                    <h2 className="section-heading">Why Most People Never Succeed In Financial Markets</h2>
                    <p className="section-sub">
                        Trading and investing are often approached as shortcuts rather than professional skills. Here is the difference between the typical retail trap and a professional framework.
                    </p>
                </div>

                <div className={`${styles.grid} ${visible ? styles.visible : ''}`}>
                    {/* Left: Pitfalls */}
                    <div className={styles.cardPitfalls}>
                        <div className={styles.cardHeader}>
                            <span className={styles.badgeX}>The Trap</span>
                            <h3>Unstructured Market Participation</h3>
                        </div>
                        <ul className={styles.list}>
                            {pitfalls.map((p, idx) => (
                                <li key={idx} className={styles.itemPitfall}>
                                    <XCircle size={20} className={styles.iconX} />
                                    <span><strong>{p.label}:</strong> {p.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Solutions */}
                    <div className={styles.cardSolutions}>
                        <div className={styles.cardHeader}>
                            <span className={styles.badgeCheck}>The Solution</span>
                            <h3>Structured Skill Development</h3>
                        </div>
                        <ul className={styles.list}>
                            {solutions.map((s, idx) => (
                                <li key={idx} className={styles.itemSolution}>
                                    <CheckCircle2 size={20} className={styles.iconCheck} />
                                    <span><strong>{s.label}:</strong> {s.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

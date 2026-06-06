'use client';
import { CheckCircle2 } from 'lucide-react';
import styles from './WorkshopOutcomes.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function WorkshopOutcomes() {
    const { ref, visible } = useScrollReveal();

    const outcomes = [
        'How Financial Markets Actually Work',
        'Common Mistakes Beginners Make',
        'Risk Management Fundamentals',
        'Stock, Forex & Crypto Overview',
        'Market Opportunities',
        'Roadmap To Becoming Market Ready'
    ];

    return (
        <section id="workshop-outcomes" className={styles.section} ref={ref as any}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Webinar Blueprint</p>
                    <h2 className="section-heading">What You'll Learn In The Free Workshop</h2>
                    <p className="section-sub">
                        Skip the commercial hype. In this structured 2-hour session, we break down the operational realities of global exchanges.
                    </p>
                </div>

                <div className={`${styles.grid} ${visible ? styles.visible : ''}`}>
                    {outcomes.map((o, idx) => (
                        <div key={idx} className={styles.item}>
                            <div className={styles.checkWrap}>
                                <CheckCircle2 size={22} className={styles.checkIcon} />
                            </div>
                            <span>{o}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

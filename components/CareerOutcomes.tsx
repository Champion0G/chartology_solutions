'use client';
import { Landmark, TrendingUp, Search, Briefcase, Rocket, ShieldAlert, LineChart } from 'lucide-react';
import styles from './CareerOutcomes.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function CareerOutcomes() {
    const { ref, visible } = useScrollReveal();

    const outcomes = [
        { icon: Landmark, title: 'Financial Analysis', desc: 'Read corporate balance sheets, evaluate cash flows, and build analytical valuations.' },
        { icon: Search, title: 'Market Research', desc: 'Synthesize data and macroeconomic variables to write comprehensive industry research.' },
        { icon: LineChart, title: 'Investment Understanding', desc: 'Identify high-quality equities and growth sectors for long-term capital preservation.' },
        { icon: TrendingUp, title: 'Trading Competency', desc: 'Develop rule-based price action setups and execution tactics across multiple markets.' },
        { icon: Briefcase, title: 'Business Development', desc: 'Apply financial modeling and metrics to drive enterprise value and partnerships.' },
        { icon: Rocket, title: 'Entrepreneurship', desc: 'Understand capitalization, risk assessment, and market cycles to launch robust ventures.' },
        { icon: ShieldAlert, title: 'Personal Wealth Management', desc: 'Build personal asset allocation plans, protect downside risk, and battle inflation.' }
    ];

    return (
        <section id="outcomes" className={styles.section} ref={ref as any}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Future Readiness</p>
                    <h2 className="section-heading">How These Skills Can Help You</h2>
                    <p className="section-sub">
                        Financial literacy is a multiplier. Developing analytical market expertise can open up opportunities across professional and personal horizons.
                    </p>
                </div>

                <div className={`${styles.grid} ${visible ? styles.visible : ''}`}>
                    {outcomes.map((o, i) => {
                        const Icon = o.icon;
                        return (
                            <div key={o.title} className={styles.card}>
                                <div className={styles.iconWrap}>
                                    <Icon size={20} className={styles.icon} />
                                </div>
                                <h3>{o.title}</h3>
                                <p>{o.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

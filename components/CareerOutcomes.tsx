'use client';
import { Landmark, Search, LineChart, TrendingUp, Briefcase, ShieldAlert, Compass, GraduationCap } from 'lucide-react';
import styles from './CareerOutcomes.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function CareerOutcomes() {
    const { ref, visible } = useScrollReveal();

    const outcomes = [
        {
            icon: Landmark,
            title: 'Financial Analysis',
            desc: 'Read corporate balance sheets, evaluate cash flows, and build analytical valuations.'
        },
        {
            icon: Search,
            title: 'Equity Market Research',
            desc: 'Synthesize stock patterns, sector trends, and macroeconomic variables to compile research.'
        },
        {
            icon: LineChart,
            title: 'Investment Understanding',
            desc: 'Identify high-quality asset classes and growth sectors for capital preservation.'
        },
        {
            icon: TrendingUp,
            title: 'Trading & Investing Competency',
            desc: 'Develop rule-based price action setups and risk-adjusted tactical execution.'
        },
        {
            icon: Briefcase,
            title: 'Personal Wealth Management',
            desc: 'Build structured personal finance allocation plans to safeguard capital.'
        },
        {
            icon: ShieldAlert,
            title: 'Beating Inflation',
            desc: 'Deploy resources effectively across yield-generating assets to preserve purchasing power.'
        },
        {
            icon: Compass,
            title: 'Short & Long-Term Investing',
            desc: 'Navigate varying market horizons, aligning trade cycles with compounding goals.'
        },
        {
            icon: GraduationCap,
            title: 'Unlock Careers in Finance',
            desc: 'Qualify for analytical, operations, and advisory roles in modern financial institutions.'
        }
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

                <div className={`${styles.list} ${visible ? styles.visible : ''}`}>
                    {outcomes.map((o, i) => {
                        const Icon = o.icon;
                        return (
                            <div key={o.title} className={styles.item}>
                                <div className={styles.iconWrap}>
                                    <Icon size={20} className={styles.icon} />
                                </div>
                                <div className={styles.textWrap}>
                                    <h3>{o.title}</h3>
                                    <p>{o.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

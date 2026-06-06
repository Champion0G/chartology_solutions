'use client';
import { useState } from 'react';
import { ChevronDown, CheckCircle2, BookOpen, Clock, Users, Award, ShieldAlert, Library } from 'lucide-react';
import styles from './Curriculum.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

const modules = [
    {
        num: 'Module 1',
        title: 'Financial Markets Foundation',
        desc: 'Understand market participants, brokers, exchanges, order types, clearing operations, and the core structural mechanics of stocks, forex, and digital assets.',
        items: [
            'Understanding Nifty, Sensex, and Indices',
            'Types of Markets: Cash, Futures, Options, and Commodities',
            'Order types: Limit, Market, SL, SL-M, GTT',
            'Settle cycle, margin requirements, and leverage rules'
        ]
    },
    {
        num: 'Module 2',
        title: 'Technical Analysis',
        desc: 'Master candlestick analysis, volume confirmation, price trends, range boundaries, and dynamic support & resistance frameworks.',
        items: [
            'Dow Theory and basic market structure (Trends, Ranges)',
            'Advanced Candlestick patterns (Single & Multi-candles)',
            'Volume analysis and its significance in validation',
            'Support & Resistance: Dynamic vs. Static levels'
        ]
    },
    {
        num: 'Module 3',
        title: 'Price Action & Market Structure',
        desc: 'Learn advanced market mechanics: raw price shifted structures, breaks of structure (BOS), order blocks, fair value gaps, and liquidity sweeps.',
        items: [
            'Market structure shifts (MSS) and break of structure (BOS)',
            'Order blocks, demand-supply zones, and fair value gaps (FVG)',
            'Liquidity sweeps and stop hunts identification',
            'Trigger entries: Rejection bars, pinbars, engulfing candle setups'
        ]
    },
    {
        num: 'Module 4',
        title: 'Risk Management',
        desc: 'Protect capital using position sizing mathematics, the 1% risk rule, win-rate parameters, and maximum drawdown buffers.',
        items: [
            'Risk-to-reward ratio (RRR) and win-rate dynamics',
            '1% risk rule and calculating exact position sizing',
            'Portfolio diversification and asset allocation guidelines',
            'Drawdown management: When to scale down or stop trading'
        ]
    },
    {
        num: 'Module 5',
        title: 'Trading Psychology',
        desc: 'Develop systemic execution checklists, eliminate FOMO and revenge execution, and run a process-oriented trading routine.',
        items: [
            'The cognitive biases that destroy traders (Loss aversion, recency bias)',
            'Developing a discipline protocol and execution checklist',
            'How to handle winning streaks and losing streaks',
            'Establishing a neutral, process-oriented mindset'
        ]
    },
    {
        num: 'Module 6',
        title: 'Fundamental Analysis',
        desc: 'Evaluate corporate balance sheets, earnings reports, global macroeconomic statistics, interest rates, and valuation parameters.',
        items: [
            'Corporate balance sheets and cash flow statement analysis',
            'Key valuation metrics: P/E, Debt-to-Equity, EPS, ROE',
            'Macroeconomic cycles: Inflation, interest rates, and central bank policies',
            'Sector rotation analysis and long-term theme selection'
        ]
    },
    {
        num: 'Module 7',
        title: 'Portfolio Building',
        desc: 'Structure personal assets, diversify capital allocations, construct long-term stock portfolios, and manage tax implications.',
        items: [
            'Core principles of asset allocation & risk-adjusted returns',
            'Constructing core-satellite long-term investment portfolios',
            'Rebalancing schedules and passive compounding models',
            'Taxation guidelines on capital gains (STCG, LTCG)'
        ]
    },
    {
        num: 'Module 8',
        title: 'Challenge & Evaluation',
        desc: 'Test your knowledge in a virtual simulation environment. Complete trade journals, pass risk parameters, and earn credentials.',
        items: [
            'Participating in the monthly virtual Trading Challenge',
            'Maintaining standard professional trade journaling',
            'Applying mathematical draw-down rules in simulated setups',
            'Comprehensive knowledge assessment and certification exam'
        ]
    }
];

export default function Curriculum() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const { ref, visible } = useScrollReveal();

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    const metrics = [
        { icon: BookOpen, val: '50+', label: 'Topics Covered' },
        { icon: Clock, val: '100+', label: 'Learning Hours' },
        { icon: Users, val: 'Live', label: 'Interactive Sessions' },
        { icon: Library, val: 'Weekly', label: 'Assignments' },
        { icon: Award, val: 'Strict', label: 'Assessments' },
        { icon: ShieldAlert, val: '24/7', label: 'Community Support' }
    ];

    return (
        <section id="curriculum" className={styles.section} ref={ref as any}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Redesigned Timeline</p>
                    <h2 className="section-heading">Comprehensive Financial Markets Curriculum</h2>
                    <p className="section-sub">
                        Our structured learning roadmap is designed to build institutional-grade competencies step-by-step.
                    </p>
                </div>

                {/* Metrics Panel */}
                <div className={`${styles.metricsBar} ${visible ? styles.visible : ''}`}>
                    {metrics.map((m, idx) => {
                        const Icon = m.icon;
                        return (
                            <div key={idx} className={styles.metricItem}>
                                <Icon className={styles.metricIcon} size={18} />
                                <div>
                                    <span className={styles.metricVal}>{m.val}</span>
                                    <span className={styles.metricLabel}>{m.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Timeline Accordion */}
                <div className={`${styles.accordion} ${visible ? styles.visible : ''}`} style={{ transitionDelay: '100ms' }}>
                    {modules.map((m, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={m.num} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                                <button
                                    className={styles.trigger}
                                    onClick={() => toggle(i)}
                                    aria-expanded={isOpen}
                                >
                                    <div className={styles.triggerLeft}>
                                        <span className={styles.num}>{m.num}</span>
                                        <h3 className={styles.moduleTitle}>{m.title}</h3>
                                    </div>
                                    <span className={styles.chevronWrap}>
                                        <ChevronDown size={20} className={styles.chevron} />
                                    </span>
                                </button>

                                <div className={styles.content}>
                                    <div className={styles.contentInner}>
                                        <p className={styles.desc}>{m.desc}</p>
                                        <div className={styles.listSection}>
                                            <h4 className={styles.listHeading}>Core Modules:</h4>
                                            <ul className={styles.list}>
                                                {m.items.map((item, idx) => (
                                                    <li key={idx} className={styles.listItem}>
                                                        <CheckCircle2 size={16} className={styles.bulletIcon} />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

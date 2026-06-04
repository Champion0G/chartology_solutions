'use client';
import { useState } from 'react';
import { ChevronDown, BookOpen, Clock, FileText, CheckCircle2 } from 'lucide-react';
import styles from './Curriculum.module.css';

const modules = [
    {
        num: 'Module 1',
        title: 'Market Basics',
        desc: 'Build the foundational knowledge required for trading. Learn how stock exchanges, brokers, and clearing corporations function.',
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
        desc: 'Learn how to read price trends, volume trends, and build an understanding of historical patterns.',
        items: [
            'Dow Theory and basic market structure (Trends, Ranges)',
            'Advanced Candlestick patterns (Single & Multi-candles)',
            'Volume analysis and its significance in validation',
            'Support & Resistance: Dynamic vs. Static levels'
        ]
    },
    {
        num: 'Module 3',
        title: 'Chart Reading',
        desc: 'Master the art of chart interpretation across multiple timeframes to spot trading setups.',
        items: [
            'Classic chart patterns (Head & Shoulders, Double Tops/Bottoms, Flags)',
            'Multi-timeframe analysis (MTA) for high-probability setups',
            'Drawing trendlines and channels correctly',
            'Introduction to popular charting tools and platforms'
        ]
    },
    {
        num: 'Module 4',
        title: 'Price Action',
        desc: 'Understand price behavior without lagging indicators. Learn to read raw buyers and sellers activity.',
        items: [
            'Market structure shifts (MSS) and break of structure (BOS)',
            'Order blocks, demand-supply zones, and fair value gaps (FVG)',
            'Liquidity sweeps and stop hunts identification',
            'Trigger entries: Rejection bars, pinbars, engulfing candle setups'
        ]
    },
    {
        num: 'Module 5',
        title: 'Risk Management',
        desc: 'The single most important module. Protect your capital through math-based position sizing and strict rules.',
        items: [
            'Risk-to-reward ratio (RRR) and win-rate dynamics',
            '1% risk rule and calculating exact position sizing',
            'Portfolio diversification and asset allocation guidelines',
            'Drawdown management: When to scale down or stop trading'
        ]
    },
    {
        num: 'Module 6',
        title: 'Trading Psychology',
        desc: 'Manage the emotional roller coaster. Conquer fear, greed, FOMO, and revenge trading.',
        items: [
            'The cognitive biases that destroy traders (Loss aversion, recency bias)',
            'Developing a discipline protocol and execution checklist',
            'How to handle winning streaks and losing streaks',
            'Establishing a neutral, process-oriented mindset'
        ]
    },
    {
        num: 'Module 7',
        title: 'Strategy Building',
        desc: 'Assemble your tools into a repeatable, rule-based trading system tailored to your personality.',
        items: [
            'Defining trend-following vs. mean-reversion setups',
            'Creating clear entry, stop-loss, and target rules',
            'Backtesting and forward-testing methodologies',
            'System parameters and finding your edge'
        ]
    },
    {
        num: 'Module 8',
        title: 'Live Market Sessions',
        desc: 'Bridge theory and practice. Observe live market executions and real-time decision making.',
        items: [
            'Pre-market analysis and creating a daily watchlist',
            'Trading execution in live market hours (simulated/real)',
            'Managing trades: Trailing stop losses, partial profit booking',
            'Post-market review and feedback loops'
        ]
    },
    {
        num: 'Module 9',
        title: 'Trade Journaling',
        desc: 'Turn data into progress. Learn how to track and analyze your trades to optimize performance.',
        items: [
            'Setting up a detailed trading journal (Excel, Notion, or specialized tool)',
            'Metrics to track: Expectancy, profit factor, average win/loss',
            'Reviewing mistakes, identifying leaks, and tracking emotional state',
            'Quarterly review and strategy adjustments'
        ]
    },
    {
        num: 'Module 10',
        title: 'Long-Term Growth Framework',
        desc: 'Transition from active trading to compounding wealth. Build a sustainable financial future.',
        items: [
            'Introduction to long-term investing principles (Valuation, Moats)',
            'Blending swing trading returns into long-term mutual funds/equity portfolios',
            'Taxation rules on trading profits (STCG, LTCG, Business income)',
            'Constructing a lifetime compounding roadmap'
        ]
    }
];

export default function Curriculum() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section id="curriculum" className={styles.section}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Curriculum</p>
                    <h2 className="section-heading">A Highly Structured, 10-Module Roadmap</h2>
                    <p className="section-sub">
                        Designed sequentially to take you from absolute scratch to constructing, executing, and journaling your own trading system.
                    </p>
                </div>

                <div className={styles.accordion}>
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
                                            <h4 className={styles.listHeading}>Key Topics Covered:</h4>
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


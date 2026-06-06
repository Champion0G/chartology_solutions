'use client';
import { TrendingUp, Globe, Coins, Check } from 'lucide-react';
import styles from './MarketsCovered.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function MarketsCovered() {
    const { ref, visible } = useScrollReveal();

    const markets = [
        {
            icon: TrendingUp,
            name: 'Stocks',
            sub: 'Indian & Global Equities',
            features: ['Investing Fundamentals', 'Corporate Earnings & Ratios', 'Technical Analysis Systems', 'Portfolio Management & Growth']
        },
        {
            icon: Globe,
            name: 'Forex',
            sub: 'Foreign Exchange Markets',
            features: ['Currency Pairs & Execution', 'Macro Global Economics', 'Raw Price Action Models', 'Leverage & Risk Management']
        },
        {
            icon: Coins,
            name: 'Crypto',
            sub: 'Digital Assets & Tokens',
            features: ['Blockchain & Tech Baselines', 'Market Halving Cycles', 'Core Trading Concepts', 'Strategic Portfolio Allocation']
        }
    ];

    return (
        <section id="markets" className={styles.section} ref={ref as any}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Scope of Education</p>
                    <h2 className="section-heading">Explore Multiple Financial Markets</h2>
                    <p className="section-sub">
                        Our structured learning pathway covers three major global asset classes in detail, ensuring you gain a comprehensive financial education.
                    </p>
                </div>

                <div className={styles.grid}>
                    {markets.map((m, i) => {
                        const Icon = m.icon;
                        return (
                            <div
                                key={m.name}
                                className={`${styles.card} ${visible ? styles.visible : ''}`}
                                style={{ transitionDelay: `${i * 120}ms` }}
                            >
                                <div className={styles.cardHeader}>
                                    <div className={styles.iconWrap}>
                                        <Icon size={24} className={styles.icon} />
                                    </div>
                                    <div>
                                        <h3>{m.name}</h3>
                                        <p className={styles.subText}>{m.sub}</p>
                                    </div>
                                </div>
                                <ul className={styles.features}>
                                    {m.features.map((f, idx) => (
                                        <li key={idx} className={styles.featureItem}>
                                            <Check size={16} className={styles.checkIcon} />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

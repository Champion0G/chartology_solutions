'use client';
import { useRef, useEffect, useState } from 'react';
import styles from './Marquee.module.css';

const tools = [
    { name: 'TradingView', logoFull: '/logos/tradingview.svg' },
    { name: 'MetaTrader', logoFull: '/logos/metatrader.svg' },
    { name: 'Binance', logoFull: '/logos/binance.svg' },
    { name: 'Zerodha', logoFull: '/logos/zerodha.svg' },
    { name: 'Upstox', logoFull: '/logos/upstox.svg' },
    { name: 'Groww', logoFull: '/logos/groww.svg' },
    { name: 'Angel One', logoFull: '/logos/angelone.svg' },
    { name: 'Coinbase', logoFull: '/logos/coinbase.svg' },
    { name: 'Dhan', logoFull: '/logos/dhan.svg' },
    { name: 'ICICI Direct', logoFull: '/logos/icici.svg' },
    { name: 'NSE India', logoFull: '/logos/nse.svg' },
    { name: 'BSE India', logoFull: '/logos/bse.svg' },
];

export default function Marquee() {
    const [paused, setPaused] = useState(false);
    const prefersReduced = useRef(false);

    useEffect(() => {
        prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced.current) setPaused(true);
    }, []);

    const items = [...tools, ...tools];

    return (
        <section className={styles.section} aria-label="Supported trading platforms">
            <div className={styles.track}>
                <div
                    className={`${styles.inner} ${paused || prefersReduced.current ? styles.paused : ''}`}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                >
                    {items.map((t, i) => (
                        <div key={i} className={styles.item} tabIndex={i < tools.length ? 0 : -1} aria-label={t.name}>
                            <img
                                src={t.logoFull}
                                alt={t.name}
                                className={styles.logoImg}
                            />
                            <span className={styles.name}>{t.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.controls}>
                <button
                    className={styles.pauseBtn}
                    onClick={() => setPaused(!paused)}
                    aria-label={paused ? 'Play marquee' : 'Pause marquee'}
                >
                    {paused ? '▶' : '⏸'}
                </button>
            </div>
        </section>
    );
}


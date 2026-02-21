'use client';
import { useEffect, useRef } from 'react';
import { BookOpen, DollarSign, Clock, Globe, Swords, Wallet, Award, BarChart2 } from 'lucide-react';
import styles from './LearningJourney.module.css';

const cards = [
    { icon: BookOpen, title: 'Learn from Zero', desc: 'Start from fundamentals — no prior trading experience required.' },
    { icon: DollarSign, title: 'Earn While You Learn', desc: 'Apply practical strategies in live markets from week one.' },
    { icon: Clock, title: '100+ Live Hours', desc: 'Intensive live sessions with expert traders and analysts.' },
    { icon: Globe, title: 'Learn from Anywhere', desc: 'Access all content remotely with lifetime LMS login.' },
    { icon: Swords, title: 'Trading Challenge', desc: 'Compete with peers in our monthly simulated trading challenge.' },
    { icon: Wallet, title: 'Funding up to ₹5L', desc: 'Top performers receive prop trading funding up to INR 5 Lakhs.' },
    { icon: Award, title: 'Certified Experts', desc: 'Get industry-recognized certifications upon completion.' },
    { icon: BarChart2, title: 'Forex, Crypto & Stocks', desc: 'Multi-asset curriculum covering all major markets.' },
];

export default function LearningJourney() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = ref.current?.querySelectorAll('[data-card]');
        if (!cards) return;
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add(styles.cardVisible); } }),
            { threshold: 0.12 }
        );
        cards.forEach((c) => observer.observe(c));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="learning" className={styles.section}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">What You Get</p>
                    <h2 className="section-heading">A Learning Journey Like Never<br />Before in India</h2>
                    <p className="section-sub" style={{ maxWidth: 1080 }}>
                        Everything you need to go from beginner to confident, independent trader.
                    </p>
                </div>
                <div ref={ref} className={styles.grid}>
                    {cards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <div key={card.title} className={styles.card} data-card style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
                                <div className={styles.iconWrap}>
                                    <Icon size={22} strokeWidth={2} />
                                </div>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <p className={styles.cardDesc}>{card.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

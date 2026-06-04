'use client';
import { useEffect, useRef } from 'react';
import { BookOpen, UserCheck, Users, BarChart2, Shield, Sparkles, Flame } from 'lucide-react';
import styles from './LearningJourney.module.css';

const cards = [
    { icon: BookOpen, title: 'Structured Learning', desc: 'Go from scratch to building a rule-based trading system with step-by-step structured modules.' },
    { icon: UserCheck, title: 'Live Mentorship', desc: 'Direct access to market practitioners during interactive live sessions. Ask questions in real-time.' },
    { icon: Users, title: 'Community Support', desc: 'Discuss market setups, find study buddies, and share trade journals in active community rooms.' },
    { icon: BarChart2, title: 'Practical Sessions', desc: 'Bridge the gap between theory and execution by analyzing charts in live market hours.' },
    { icon: Shield, title: 'Risk Management Focus', desc: 'Learn the exact position sizing algorithms institutional traders use to protect their downside.' },
    { icon: Sparkles, title: 'Beginner Friendly', desc: 'No prior finance, economics, or mathematical background required. We start from absolute basics.' },
    { icon: Flame, title: 'Lifetime Network', desc: 'Retain access to our alumni channel, regional trading meetups, and continuous resources.' },
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
        <section id="why-choose" className={styles.section}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Why Choose Us</p>
                    <h2 className="section-heading">Built to Teach Trading the Right Way</h2>
                    <p className="section-sub" style={{ maxWidth: 1080 }}>
                        Here is what separates our education from generic video libraries and online hype.
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


'use client';
import { GraduationCap, Briefcase, BarChart4, Home } from 'lucide-react';
import styles from './WhoIsThisFor.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function WhoIsThisFor() {
    const { ref, visible } = useScrollReveal();

    const targets = [
        {
            icon: GraduationCap,
            title: 'College Students',
            desc: 'Build future-ready financial skills, gain practical market exposure, and unlock more career opportunities early in your academic journey.'
        },
        {
            icon: Briefcase,
            title: 'Working Professionals',
            desc: 'Develop practical market knowledge to make structured financial decisions alongside your career.'
        },
        {
            icon: BarChart4,
            title: 'Investors & Aspiring Traders',
            desc: 'Master the markets - Whether you are an investor allocating resources wisely through market cycles, or a trader building a professional, rule-based system.'
        },
        {
            icon: Home,
            title: 'Homemakers',
            desc: 'Build financial confidence from home. Learn how the markets actually work so you can make informed, independent investment decisions.'
        }
    ];

    return (
        <section id="audiences" className={styles.section} ref={ref as any}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Target Learners</p>
                    <h2 className="section-heading">Designed For</h2>
                    <p className="section-sub">
                        Our structured curriculum starts from the absolute fundamentals, making it valuable for a wide range of analytical goals.
                    </p>
                </div>

                <div className={styles.grid}>
                    {targets.map((t, i) => {
                        const Icon = t.icon;
                        return (
                            <div
                                key={t.title}
                                className={`${styles.card} ${visible ? styles.visible : ''}`}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <div className={styles.iconWrap}>
                                    <Icon size={24} className={styles.icon} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h3 style={{ margin: 0 }}>{t.title}</h3>
                                    <p style={{ margin: 0 }}>{t.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

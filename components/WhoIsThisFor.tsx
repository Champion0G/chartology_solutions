'use client';
import { GraduationCap, Briefcase, BarChart4, Compass } from 'lucide-react';
import styles from './WhoIsThisFor.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function WhoIsThisFor() {
    const { ref, visible } = useScrollReveal();

    const targets = [
        {
            icon: GraduationCap,
            title: 'Students',
            desc: 'Build future-ready financial skills and gain practical market exposure early in your academic journey.'
        },
        {
            icon: Briefcase,
            title: 'Working Professionals',
            desc: 'Develop practical market knowledge to make structured financial decisions alongside your career.'
        },
        {
            icon: BarChart4,
            title: 'Investors',
            desc: 'Understand the underlying mechanics of stocks, cycles, and risk parameters to allocate resources wisely.'
        },
        {
            icon: Compass,
            title: 'Aspiring Traders',
            desc: 'Skip random tip groups and learn a professional, rule-based approach to market participation.'
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
                                <h3>{t.title}</h3>
                                <p>{t.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

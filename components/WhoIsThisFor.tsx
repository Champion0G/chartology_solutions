'use client';
import styles from './WhoIsThisFor.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

const StudentIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="25" r="9" fill="#ffdbb5"/>
        <path d="M15 23c0-6 4-8 9-8s9 2 9 8c0 1-1 2-2 2h-14c-1 0-2-1-2-2z" fill="#2d3748"/>
        <path d="M24 8l14 4-14 4-14-4 14-4z" fill="#1a202c"/>
        <rect x="23" y="11" width="2" height="4" fill="#1a202c"/>
        <path d="M14 12v6l-2 1v-7h2z" fill="#d69e2e"/>
        <rect x="22" y="32" width="4" height="4" fill="#ffdbb5"/>
        <path d="M14 36c0-4 3-6 10-6s10 2 10 6v4H14v-4z" fill="#e10600"/>
        <path d="M20 30l4 3 4-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const ProfessionalIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="9" fill="#ffdbb5"/>
        <path d="M15 22c0-5 3-7 9-7s9 2 9 7v2H15v-2z" fill="#1a202c"/>
        <rect x="22" y="31" width="4" height="4" fill="#ffdbb5"/>
        <path d="M14 35c0-4 3-5 10-5s10 1 10 5v5H14v-5z" fill="#2d3748"/>
        <path d="M20 30l4 4 4-4" fill="#fff"/>
        <path d="M23 34h2l1 6-2 2-2-2 1-6z" fill="#e10600"/>
    </svg>
);

const TraderIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="9" fill="#ffdbb5"/>
        <path d="M15 22c0-5 3-7 9-7s9 2 9 7v2H15v-2z" fill="#2d3748"/>
        <rect x="17" y="21" width="6" height="4" rx="1" stroke="#1a202c" strokeWidth="1.5" fill="#e2e8f0"/>
        <rect x="25" y="21" width="6" height="4" rx="1" stroke="#1a202c" strokeWidth="1.5" fill="#e2e8f0"/>
        <line x1="23" y1="23" x2="25" y2="23" stroke="#1a202c" strokeWidth="1.5"/>
        <rect x="22" y="31" width="4" height="4" fill="#ffdbb5"/>
        <path d="M14 35c0-4 3-5 10-5s10 1 10 5v5H14v-5z" fill="#1a202c"/>
        <path d="M30 16l4-4M34 12h-3.5M34 12v3.5" stroke="#38a169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 20l4-4" stroke="#38a169" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const HomemakerIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="9" fill="#ffdbb5"/>
        <path d="M14 22c0-6 4-7 10-7s10 1 10 7v3c0 2-2 3-4 3h-12c-2 0-4-1-4-3v-3z" fill="#744210"/>
        <rect x="22" y="31" width="4" height="4" fill="#ffdbb5"/>
        <path d="M14 35c0-4 3-5 10-5s10 1 10 5v5H14v-5z" fill="#4a5568"/>
        <path d="M19 30h10v10H19V30z" fill="#edf2f7"/>
        <path d="M34 18l4-3 4 3v4h-8v-4z" fill="#e10600"/>
        <path d="M32 18l6-4.5 6 4.5" stroke="#1a202c" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

export default function WhoIsThisFor() {
    const { ref, visible } = useScrollReveal();

    const targets = [
        {
            icon: StudentIcon,
            title: 'College Students',
            desc: 'Build future-ready financial skills, gain practical market exposure, and unlock more career opportunities early in your academic journey.'
        },
        {
            icon: ProfessionalIcon,
            title: 'Working Professionals',
            desc: 'Develop practical market knowledge to make structured financial decisions alongside your career.'
        },
        {
            icon: TraderIcon,
            title: 'Investors & Aspiring Traders',
            desc: 'Master the markets - Whether you are an investor allocating resources wisely through market cycles, or a trader building a professional, rule-based system.'
        },
        {
            icon: HomemakerIcon,
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
                                    <Icon />
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

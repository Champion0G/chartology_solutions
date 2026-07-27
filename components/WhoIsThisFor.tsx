'use client';
import styles from './WhoIsThisFor.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function WhoIsThisFor() {
    const { ref, visible } = useScrollReveal();

    const targets = [
        {
            imgSrc: '/designed-students.png',
            title: 'College Students',
            desc: 'Build future-ready financial skills, gain practical market exposure, and unlock more career opportunities early in your academic journey.'
        },
        {
            imgSrc: '/designed-professionals.png',
            title: 'Working Professionals',
            desc: 'Develop practical market knowledge to make structured financial decisions alongside your career.'
        },
        {
            imgSrc: '/designed-traders.png',
            title: 'Investors & Aspiring Traders',
            desc: 'Master the markets - Whether you are an investor allocating resources wisely through market cycles, or a trader building a professional, rule-based system.'
        },
        {
            imgSrc: '/designed-homemakers.png',
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
                        return (
                            <div
                                key={t.title}
                                className={`${styles.card} ${visible ? styles.visible : ''}`}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <div className={styles.iconWrap}>
                                    <img src={t.imgSrc} alt={t.title} className={styles.illustration} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
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

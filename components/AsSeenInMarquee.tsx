'use client';
import styles from './AsSeenInMarquee.module.css';

const publications = [
    { name: 'The New York Times', fontStyle: 'serif', fontWeight: '800', letterSpacing: '-0.03em' },
    { name: 'Bloomberg', fontStyle: 'sans-serif', fontWeight: '900', letterSpacing: '-0.01em' },
    { name: 'Forbes', fontStyle: 'serif', fontWeight: '700', letterSpacing: '0' },
    { name: 'Mashable', fontStyle: 'sans-serif', fontWeight: '800', letterSpacing: '-0.02em' },
    { name: 'Financial Times', fontStyle: 'serif', fontWeight: '900', letterSpacing: '-0.01em' },
    { name: 'VOGUE', fontStyle: 'serif', fontWeight: '400', letterSpacing: '0.2em' },
    { name: 'MOTHERLY', fontStyle: 'sans-serif', fontWeight: '300', letterSpacing: '0.15em' },
    { name: 'TODAY', fontStyle: 'sans-serif', fontWeight: '900', letterSpacing: '0.05em' },
    { name: 'CNBC', fontStyle: 'sans-serif', fontWeight: '850', letterSpacing: '-0.02em' },
    { name: 'Reuters', fontStyle: 'serif', fontWeight: '700', letterSpacing: '-0.01em' }
];

export default function AsSeenInMarquee() {
    return (
        <section className={styles.section} aria-label="Featured media publications">
            <p className={styles.title}>AS SEEN IN</p>
            <div className="container">
                <div className={styles.grid}>
                    {publications.map((p, i) => (
                        <div 
                            key={i} 
                            className={styles.item}
                            style={{ 
                                fontFamily: p.fontStyle === 'serif' ? 'Georgia, serif' : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                fontWeight: p.fontWeight,
                                letterSpacing: p.letterSpacing,
                                fontStyle: p.name === 'Reuters' ? 'italic' : 'normal'
                            }}
                        >
                            {p.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

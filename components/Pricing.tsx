'use client';
import { Check } from 'lucide-react';
import styles from './Pricing.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

const plans = [
    {
        name: 'Pay At Once',
        price: '₹29,999',
        period: 'one-time',
        badge: null,
        features: [
            'All modules lifetime access',
            '100+ live recorded sessions',
            '4 asset classes covered',
            'Trading challenge access',
            'Digital certificate',
            'Community access',
        ],
        cta: 'Enroll Now',
    },
    {
        name: 'Pay Twice',
        price: '₹16,999',
        period: '× 2 installments',
        badge: 'Most Popular',
        features: [
            'All modules lifetime access',
            '100+ live recorded sessions',
            '4 asset classes covered',
            'Trading challenge access',
            'Digital certificate',
            'Community access',
        ],
        cta: 'Enroll Now',
    },
    {
        name: 'Pay Monthly',
        price: '₹9,999',
        period: '× 4 months',
        badge: null,
        features: [
            'All modules lifetime access',
            '100+ live recorded sessions',
            '4 asset classes covered',
            'Trading challenge access',
            'Digital certificate',
            'Community access',
        ],
        cta: 'Enroll Now',
    },
];

export default function Pricing() {
    const { ref, visible } = useScrollReveal();

    return (
        <section id="pricing" className={styles.section}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Pricing</p>
                    <h2 className="section-heading">Flexible Plans for Every Learner</h2>
                    <p className="section-sub">Choose the payment structure that works best for you. All plans include lifetime access.</p>
                </div>
                <div className={styles.grid} ref={ref as any}>
                    {plans.map((plan, i) => (
                        <div
                            key={plan.name}
                            className={`${styles.card} ${plan.badge ? styles.featured : ''} ${visible ? styles.visible : ''}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
                            <div className={styles.planName}>{plan.name}</div>
                            <div className={styles.priceRow}>
                                <span className={styles.price}>{plan.price}</span>
                                <span className={styles.period}>{plan.period}</span>
                            </div>
                            <ul className={styles.features}>
                                {plan.features.map((f) => (
                                    <li key={f} className={styles.feature}>
                                        <Check size={16} className={styles.check} />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <a href="#inquiry" className={`${styles.cta} ${plan.badge ? styles.ctaFeatured : ''}`}>
                                {plan.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

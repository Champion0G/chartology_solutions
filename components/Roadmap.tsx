'use client';
import { useEffect, useRef, useState } from 'react';
import { Download, UserCheck, ClipboardCheck, ShieldCheck } from 'lucide-react';
import styles from './Roadmap.module.css';

const steps = [
    {
        icon: Download,
        title: 'Download & Read Brochure',
        desc: 'Download our Brochure, read it carefully. All the answers to your questions are provided in the brochure.',
        highlight: 'Brochure',
    },
    {
        icon: UserCheck,
        title: 'Register & Enrollment',
        desc: 'Complete the registration process by paying the registration fee, and take a screenshot of the successful payment.',
        highlight: null,
    },
    {
        icon: ClipboardCheck,
        title: 'Confirmation',
        desc: 'Send the screenshot of successful payment on WhatsApp',
        highlight: '+91-8130245100',
    },
    {
        icon: ShieldCheck,
        title: 'Verification',
        desc: 'As soon as your payment is verified, you will receive details of your assigned Relationship Manager.',
        highlight: null,
    },
];

export default function Roadmap() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(-1);

    useEffect(() => {
        const section = sectionRef.current;
        const line = lineRef.current;
        if (!section || !line) return;

        const onScroll = () => {
            const rect = section.getBoundingClientRect();
            const windowH = window.innerHeight;

            // Progress: 0 when top of section hits bottom of viewport, 1 when bottom hits top
            const total = rect.height - windowH * 0.3;
            const scrolled = Math.max(0, windowH * 0.6 - rect.top);
            const progress = Math.min(1, Math.max(0, scrolled / total));

            // Animate the line height
            line.style.setProperty('--progress', `${progress * 100}%`);

            // Activate steps at 0%, 33%, 66%, 100% progress
            const thresholds = [0.05, 0.35, 0.65, 0.92];
            let active = -1;
            thresholds.forEach((t, i) => { if (progress >= t) active = i; });
            setActiveStep(active);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section id="roadmap" className={styles.section} ref={sectionRef}>
            <div className={`container ${styles.inner}`}>

                {/* LEFT: Title + Steps */}
                <div className={styles.left}>
                    <p className={styles.label}>How to Enroll</p>
                    <h2 className={styles.heading}>
                        Feel Like You Are<br />
                        Attending Your Classes<br />
                        <span className={styles.red}>Physically!</span>
                    </h2>

                    {/* Steps with animated vertical line */}
                    <div className={styles.stepsWrap}>
                        {/* Background track */}
                        <div className={styles.track} />
                        {/* Animated red progress line */}
                        <div className={styles.progressLine} ref={lineRef} />

                        {steps.map((s, i) => {
                            const Icon = s.icon;
                            const isActive = i <= activeStep;
                            return (
                                <div key={s.title} className={`${styles.step} ${isActive ? styles.stepActive : ''}`}>
                                    {/* Checkpoint dot */}
                                    <div className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}>
                                        <Icon size={14} strokeWidth={2.5} />
                                    </div>
                                    {/* Content */}
                                    <div className={styles.stepContent}>
                                        <h3 className={`${styles.stepTitle} ${isActive ? styles.stepTitleActive : ''}`}>
                                            {s.title}
                                        </h3>
                                        <p className={styles.stepDesc}>
                                            {s.desc}{' '}
                                            {s.highlight && (
                                                <span className={styles.stepHighlight}>{s.highlight}</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <a href="#inquiry" className={styles.cta}>
                        <span>🎓</span> Enroll Now
                    </a>
                </div>

                {/* RIGHT: Illustration */}
                <div className={styles.right}>
                    <div className={styles.illustrationWrap}>
                        <img
                            src="https://illustrations.popsy.co/amber/man-with-a-laptop.svg"
                            alt="Student learning online"
                            className={styles.illustration}
                            loading="lazy"
                            onError={(e) => {
                                // Fallback to Unsplash if SVG fails
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&q=80&auto=format';
                            }}
                        />
                        {/* Floating step count card */}
                        <div className={styles.floatCard}>
                            <div className={styles.floatNum}>{Math.max(0, activeStep + 1)}<span>/ 4</span></div>
                            <div className={styles.floatLabel}>Steps completed</div>
                            <div className={styles.floatBar}>
                                <div
                                    className={styles.floatBarFill}
                                    style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { UserPlus, BookOpen, Video, FileText, MessageSquare, UserCheck, TrendingUp, Award } from 'lucide-react';
import styles from './Roadmap.module.css';

const steps = [
    {
        icon: UserPlus,
        title: '1. Structured Enrollment',
        desc: 'Select your cohort (Beginner, Intermediate, Options, or Mentorship) and reserve your seat.',
        highlight: null,
    },
    {
        icon: BookOpen,
        title: '2. Welcome Onboarding',
        desc: 'Get access to pre-cohort reading guides, set up your charting tools, and join the group chat.',
        highlight: null,
    },
    {
        icon: Video,
        title: '3. Interactive Live Cohorts',
        desc: 'Attend highly structured live evening classes covering raw price action, indicators, and market mechanics.',
        highlight: null,
    },
    {
        icon: FileText,
        title: '4. Practical Assignments',
        desc: 'Complete weekend charting homework. Receive detailed feedback on your analysis from assistants.',
        highlight: null,
    },
    {
        icon: MessageSquare,
        title: '5. Daily Peer Discussions',
        desc: 'Debate active market charts, swap trade journals, and practice trade selection with your cohort.',
        highlight: null,
    },
    {
        icon: UserCheck,
        title: '6. Mentor Review Session',
        desc: 'Get personal reviews of your performance metrics. Locate and fix weaknesses in your execution.',
        highlight: null,
    },
    {
        icon: TrendingUp,
        title: '7. Guided Market Practice',
        desc: 'Enter live market executions using strict rules and a mandatory 1% risk limit per position.',
        highlight: null,
    },
    {
        icon: Award,
        title: '8. Cohort Graduation',
        desc: 'Receive your verified digital certificate and join our lifetime global alumni network.',
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

            const total = rect.height - windowH * 0.3;
            const scrolled = Math.max(0, windowH * 0.6 - rect.top);
            const progress = Math.min(1, Math.max(0, scrolled / total));

            line.style.setProperty('--progress', `${progress * 100}%`);

            // Activate steps dynamically based on scroll progress
            const stepCount = steps.length;
            const stepInterval = 1 / stepCount;
            let active = -1;
            for (let i = 0; i < stepCount; i++) {
                if (progress >= (i * stepInterval * 0.85 + 0.02)) {
                    active = i;
                }
            }
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
                    <p className={styles.label}>Learning Process</p>
                    <h2 className={styles.heading}>
                        Your Educational Roadmap<br />
                        to Trading<br />
                        <span className={styles.red}>Independence</span>
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

                    <a href="#register" className={styles.cta}>
                        <span>🎓</span> Register for Workshop
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
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&q=80&auto=format';
                            }}
                        />
                        {/* Floating step count card */}
                        <div className={styles.floatCard}>
                            <div className={styles.floatNum}>{Math.max(0, activeStep + 1)}<span>/ 8</span></div>
                            <div className={styles.floatLabel}>Steps completed</div>
                            <div className={styles.floatBar}>
                                <div
                                    className={styles.floatBarFill}
                                    style={{ width: `${((activeStep + 1) / 8) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}


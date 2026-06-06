'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

interface FAQItem {
    q: string;
    a: string;
}

const faqs: FAQItem[] = [
    {
        q: 'Is this beginner friendly?',
        a: 'Yes, absolutely. Our curriculum starts from the absolute fundamentals of financial markets, assuming no prior background in finance, economics, or math.'
    },
    {
        q: 'Is the workshop free?',
        a: 'Yes. The live workshop is completely free of charge. Our goal is to introduce you to structured market mechanics, common beginner traps, and risk management parameters.'
    },
    {
        q: 'How are classes conducted?',
        a: 'Classes are conducted online via live interactive sessions. We combine conceptual lectures with live charting analysis, weekly assignments, and real-time Q&As.'
    },
    {
        q: 'Are certifications provided?',
        a: 'Yes. You can earn verifiable digital certifications (such as CM-FND, CM-PAS, etc.) on successfully passing the exam assessments for the respective timeline modules.'
    },
    {
        q: 'Are internships guaranteed?',
        a: 'No, internships are not guaranteed. Practical project allocations and operations roles are purely performance-based and depend on current organizational requirements.'
    },
    {
        q: 'How much time is required weekly?',
        a: 'We recommend dedicating 6 to 8 hours per week. This includes attending the live weekend classes, completing trade log assignments, and participating in forum discussions.'
    },
    {
        q: 'Can working professionals join?',
        a: 'Yes. Our live cohorts are scheduled on weekends, and all materials, sheets, and recorded session replays are available 24/7 on our learning portal to fit your schedule.'
    },
    {
        q: 'Can college students join?',
        a: 'Yes. We highly encourage students to join to develop future-ready analytical skills, build financial literacy, and qualify for performance-based internship opportunities.'
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className={styles.section}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Common Queries</p>
                    <h2 className="section-heading">Frequently Asked Questions</h2>
                    <p className="section-sub">Everything you need to know before securing your seat.</p>
                </div>

                <div className={styles.accordion}>
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                                <button
                                    className={styles.question}
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown size={18} className={styles.chevron} />
                                </button>
                                <div className={styles.answer}>
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

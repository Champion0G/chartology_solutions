'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

const tabs = ['Program', 'Curriculum', 'Teaching', 'Trading Challenge', 'Payment', 'Certification'];

const faqs: Record<string, { q: string; a: string }[]> = {
    Program: [
        { q: 'Who is this program for?', a: 'This program is designed for anyone who wants to understand financial markets — from complete beginners to intermediate traders looking to sharpen their skills.' },
        { q: 'How long is the program?', a: 'The core curriculum spans 6 months with 100+ live session hours. You also get lifetime access to all recorded content and future updates.' },
        { q: 'Is prior trading experience required?', a: 'No. We start from the basics and progressively build to advanced strategies. All you need is a willingness to learn.' },
    ],
    Curriculum: [
        { q: 'What markets does the curriculum cover?', a: 'We cover Indian equities, Forex, Cryptocurrency, and Derivatives (Futures & Options) in depth.' },
        { q: 'Is the curriculum updated regularly?', a: 'Yes — our content is reviewed and updated every quarter to reflect current market conditions and regulatory changes.' },
    ],
    Teaching: [
        { q: 'Who are the instructors?', a: 'All instructors are active traders with a minimum of 10 years of live market experience. Many have institutional trading backgrounds.' },
        { q: 'Are sessions live or recorded?', a: 'We offer both — regularly scheduled live sessions plus a growing library of recorded lessons available on-demand.' },
    ],
    'Trading Challenge': [
        { q: 'What is the Trading Challenge?', a: 'A monthly virtual trading competition where students apply their skills in simulated live-market environments. Top performers receive prop funding up to ₹5 Lakhs.' },
        { q: 'Who can participate?', a: 'All enrolled students can participate in the monthly Trading Challenge at no additional cost.' },
    ],
    Payment: [
        { q: 'What payment options are available?', a: 'We offer a one-time payment, a 2-installment plan, and a 4-month EMI plan. All major cards, UPI, and net banking are supported.' },
        { q: 'Is there a refund policy?', a: 'We offer a 7-day money-back guarantee if you are not satisfied with the program content.' },
    ],
    Certification: [
        { q: 'How do I earn my certificate?', a: 'On completing all modules, you will take an online exam. Passing the exam (70%+ score) earns you an industry-recognized digital certificate.' },
        { q: 'Is the certificate shareable on LinkedIn?', a: 'Yes — each certificate comes with a LinkedIn badge and a unique verification link you can share publicly.' },
    ],
};

export default function FAQ() {
    const [activeTab, setActiveTab] = useState('Program');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const items = faqs[activeTab] || [];

    return (
        <section id="faq" className={styles.section}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">FAQ</p>
                    <h2 className="section-heading">Frequently Asked Questions</h2>
                </div>

                {/* Tabs */}
                <div className={styles.tabs} role="tablist" aria-label="FAQ categories">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            role="tab"
                            aria-selected={activeTab === tab}
                            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                            onClick={() => { setActiveTab(tab); setOpenIndex(0); }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Accordion */}
                <div className={styles.accordion} role="tabpanel">
                    {items.map((item, i) => (
                        <div key={i} className={`${styles.item} ${openIndex === i ? styles.open : ''}`}>
                            <button
                                className={styles.question}
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                aria-expanded={openIndex === i}
                            >
                                <span>{item.q}</span>
                                <ChevronDown size={18} className={styles.chevron} />
                            </button>
                            <div className={styles.answer}>
                                <p>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';
import { useState } from 'react';
import { Briefcase, BarChart, BookOpen, MessageSquare, Megaphone, AlertCircle, ChevronDown } from 'lucide-react';
import styles from './Internships.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Internships() {
    const { ref, visible } = useScrollReveal();
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

    const toggleExpand = (idx: number) => {
        setExpandedIdx(expandedIdx === idx ? null : idx);
    };

    const roles = [
        { icon: Briefcase, title: 'Business Development', desc: 'Work on partnership channels, outreach strategies, and corporate client relations.' },
        { icon: BarChart, title: 'Market Research', desc: 'Perform structured analysis on domestic/global equities, prepare weekend market reports.' },
        { icon: BookOpen, title: 'Content Operations', desc: 'Research and write financial case studies, learning manuals, and educational scripts.' },
        { icon: MessageSquare, title: 'Community Operations', desc: 'Manage study forums, facilitate peer-to-peer trading discussion rooms, and host log sessions.' },
        { icon: Megaphone, title: 'Marketing & Outreach', desc: 'Analyze learner funnel channels, work on growth metrics, and execute digital outreach plans.' }
    ];

    return (
        <section id="internships" className={styles.section} ref={ref as any}>
            <div className="container">
                <div className={styles.heading}>
                    <p className="section-label">Practical Exposure</p>
                    <h2 className="section-heading">Gain Practical Experience</h2>
                    <p className="section-sub">
                        We believe that real skills are built through execution. Top performing students are provided opportunities to apply their learnings in operational roles within the organization.
                    </p>
                </div>

                <div className={`${styles.list} ${visible ? styles.visible : ''}`}>
                    {roles.map((r, i) => {
                        const Icon = r.icon;
                        const isExpanded = expandedIdx === i;
                        return (
                            <div key={r.title} className={styles.item} onClick={() => toggleExpand(i)}>
                                <div className={styles.itemHeader}>
                                    <div className={styles.numWrap}>
                                        <span className={styles.number}>0{i + 1}</span>
                                    </div>
                                    <div className={styles.iconWrap}>
                                        <Icon size={20} className={styles.icon} />
                                    </div>
                                    <h3 className={styles.roleTitle}>{r.title}</h3>
                                    <button 
                                        className={`${styles.chevronBtn} ${isExpanded ? styles.expanded : ''}`}
                                        aria-label="Toggle description"
                                    >
                                        <ChevronDown size={20} />
                                    </button>
                                </div>
                                <div className={`${styles.itemBody} ${isExpanded ? styles.expandedBody : ''}`}>
                                    <p className={styles.desc}>{r.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={`${styles.disclaimer} ${visible ? styles.visible : ''}`}>
                    <AlertCircle size={16} className={styles.disclaimerIcon} />
                    <span><strong>Disclaimer:</strong> Internship allocations and operational role projects are purely performance-based, require passing certification modules, and could be paid, unpaid, volunteering, contract, or full-time opportunities depending on organization goals.</span>
                </div>
            </div>
        </section>
    );
}

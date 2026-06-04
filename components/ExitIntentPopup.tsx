'use client';
import { useState, useEffect } from 'react';
import { X, ArrowRight, BookOpen, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExitIntentPopup.module.css';

export default function ExitIntentPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Only trigger once per session
        const hasSeen = sessionStorage.getItem('exit_intent_seen');
        if (hasSeen) return;

        const handleMouseLeave = (e: MouseEvent) => {
            // Trigger when cursor leaves the top of the window
            if (e.clientY < 20) {
                setIsOpen(true);
                sessionStorage.setItem('exit_intent_seen', 'true');
                document.removeEventListener('mouseleave', handleMouseLeave);
            }
        };

        // Fallback for mobile/timing
        const timer = setTimeout(() => {
            const hasSeenDelayed = sessionStorage.getItem('exit_intent_seen');
            if (!hasSeenDelayed) {
                setIsOpen(true);
                sessionStorage.setItem('exit_intent_seen', 'true');
            }
        }, 50000); // 50 seconds fallback

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            clearTimeout(timer);
        };
    }, []);

    const closePopup = () => setIsOpen(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay} role="dialog" aria-modal="true">
                    {/* Backdrop */}
                    <motion.div 
                        className={styles.backdrop} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                    />

                    {/* Modal Content */}
                    <motion.div 
                        className={styles.modal}
                        initial={{ scale: 0.9, y: 30, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 30, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    >
                        <button className={styles.closeBtn} onClick={closePopup} aria-label="Close modal">
                            <X size={20} />
                        </button>

                        <div className={styles.grid}>
                            {/* Left Side: Visual / Offer */}
                            <div className={styles.left}>
                                <div className={styles.giftIconWrap}>
                                    <Gift size={32} className={styles.giftIcon} />
                                </div>
                                <h3 className={styles.offerHeading}>Free Starter Kit</h3>
                                <p className={styles.offerDesc}>Get our "Stock Market Blueprint" PDF guide and unlock 3 exclusive webinar recordings.</p>
                                <ul className={styles.perks}>
                                    <li>✓ Core Price Action Cheat Sheet</li>
                                    <li>✓ Position Sizing Calculator Excel</li>
                                    <li>✓ 1-Hour Beginner Crash Course</li>
                                </ul>
                            </div>

                            {/* Right Side: Form */}
                            <div className={styles.right}>
                                <span className={styles.label}>🔴 LIMITED TIME OFFER</span>
                                <h4 className={styles.title}>Don't Leave Empty Handed!</h4>
                                <p className={styles.sub}>Enter your email to receive our comprehensive trading starter bundle instantly.</p>

                                {!submitted ? (
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <div className={styles.inputGroup}>
                                            <input 
                                                type="email" 
                                                placeholder="Enter your best email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className={styles.input}
                                            />
                                        </div>
                                        <button type="submit" className={styles.submitBtn}>
                                            Send My Starter Kit <ArrowRight size={16} />
                                        </button>
                                    </form>
                                ) : (
                                    <motion.div 
                                        className={styles.success}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className={styles.successIcon}>✓</div>
                                        <h5>Sent Successfully!</h5>
                                        <p>Check your inbox. The PDF guide & resources are on the way.</p>
                                    </motion.div>
                                )}
                                <p className={styles.disclaimer}>We respect your privacy. No spam, unsubscribe anytime.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}


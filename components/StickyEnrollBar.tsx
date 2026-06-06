'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import styles from './StickyEnrollBar.module.css';

export default function StickyEnrollBar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show only after scrolling down 600px
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    className={styles.bar}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.3 }}
                >
                    <div className={`container ${styles.inner}`}>
                        <div className={styles.left}>
                            <span className={styles.dot}>🔴</span>
                            <span className={styles.text}>Free Live Trading Workshop Coming Up!</span>
                            <span className={styles.divider}>•</span>
                            <span className={styles.seats}>
                                <Clock size={14} className={styles.icon} /> Limited Seats Left
                            </span>
                        </div>
                        <div className={styles.right}>
                            <a href="#register" className={styles.cta}>
                                Reserve Workshop Seat
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


'use client';
import { useState, useEffect, FormEvent } from 'react';
import { X, Send, Calendar, Clock, Laptop, Users2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RegistrationModal.module.css';

export default function RegistrationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', occupation: '', city: '' });
    const [errors, setErrors] = useState<Partial<typeof form>>({});
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setSent(false);
            setForm({ name: '', email: '', phone: '', occupation: '', city: '' });
            setErrors({});
            document.body.style.overflow = 'hidden';
        };

        window.addEventListener('open-register-modal', handleOpen);
        return () => window.removeEventListener('open-register-modal', handleOpen);
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        document.body.style.overflow = '';
    };

    const validate = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
        if (!form.phone.match(/^[0-9]{10}$/)) e.phone = '10-digit phone number is required';
        if (!form.occupation) e.occupation = 'Please select your occupation';
        if (!form.city.trim()) e.city = 'City is required';
        return e;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            setSent(true);
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

                    {/* Modal Box */}
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
                            {/* Left Side: Session Quick Recap */}
                            <div className={styles.left}>
                                <span className={styles.badge}>🔴 LIVE WORKSHOP</span>
                                <h3>Free Financial Markets Masterclass</h3>
                                <p className={styles.desc}>Understand Stocks, Forex, and Crypto mechanics from institutional practitioners.</p>

                                <div className={styles.details}>
                                    <div className={styles.detail}>
                                        <Calendar size={16} className={styles.icon} />
                                        <span>Upcoming Sunday</span>
                                    </div>
                                    <div className={styles.detail}>
                                        <Clock size={16} className={styles.icon} />
                                        <span>11:00 AM IST (2 Hours)</span>
                                    </div>
                                    <div className={styles.detail}>
                                        <Laptop size={16} className={styles.icon} />
                                        <span>Online Live Session</span>
                                    </div>
                                    <div className={styles.detail}>
                                        <Users2 size={16} className={styles.icon} />
                                        <span style={{ color: 'var(--red)', fontWeight: '700' }}>Limited to 100 Seats</span>
                                    </div>
                                </div>

                                <ul className={styles.benefits}>
                                    <li><Check size={14} className={styles.check} /> Live interactive Q&A</li>
                                    <li><Check size={14} className={styles.check} /> 100% Beginner Friendly</li>
                                    <li><Check size={14} className={styles.check} /> Free Certification Participation</li>
                                </ul>
                            </div>

                            {/* Right Side: Form */}
                            <div className={styles.right}>
                                {sent ? (
                                    <div className={styles.success}>
                                        <span className={styles.successEmoji}>🎉</span>
                                        <h4>Seat Reserved!</h4>
                                        <p>We sent the live links and calendar invites to {form.email}. See you on Sunday!</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} noValidate className={styles.form}>
                                        <h4 className={styles.formTitle}>Reserve Your Free Seat</h4>
                                        
                                        <div className={styles.field}>
                                            <label htmlFor="modal-name">Full Name *</label>
                                            <input 
                                                id="modal-name"
                                                type="text" 
                                                placeholder="Enter your name"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className={errors.name ? styles.inputError : ''}
                                            />
                                            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                                        </div>

                                        <div className={styles.row}>
                                            <div className={styles.field}>
                                                <label htmlFor="modal-email">Email Address *</label>
                                                <input 
                                                    id="modal-email"
                                                    type="email" 
                                                    placeholder="your@email.com"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                    className={errors.email ? styles.inputError : ''}
                                                />
                                                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                                            </div>
                                            <div className={styles.field}>
                                                <label htmlFor="modal-phone">Phone Number *</label>
                                                <input 
                                                    id="modal-phone"
                                                    type="tel" 
                                                    placeholder="10-digit number"
                                                    value={form.phone}
                                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                    className={errors.phone ? styles.inputError : ''}
                                                />
                                                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                                            </div>
                                        </div>

                                        <div className={styles.field}>
                                            <label htmlFor="modal-occ">Occupation *</label>
                                            <select 
                                                id="modal-occ"
                                                value={form.occupation}
                                                onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                                                className={errors.occupation ? styles.inputError : ''}
                                            >
                                                <option value="">Select your occupation</option>
                                                <option value="Student">Student</option>
                                                <option value="Working Professional">Working Professional</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.occupation && <span className={styles.errorText}>{errors.occupation}</span>}
                                        </div>

                                        <div className={styles.field}>
                                            <label htmlFor="modal-city">City *</label>
                                            <input 
                                                id="modal-city"
                                                type="text" 
                                                placeholder="Enter your current city"
                                                value={form.city}
                                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                                className={errors.city ? styles.inputError : ''}
                                            />
                                            {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                                        </div>

                                        <button type="submit" className={styles.submitBtn}>
                                            <Send size={14} /> Reserve My Seat
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

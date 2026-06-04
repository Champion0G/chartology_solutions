'use client';
import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Calendar, Clock as ClockIcon } from 'lucide-react';
import styles from './Inquiry.module.css';

const experienceLevels = [
    'Complete Beginner (No experience)',
    'Beginner (Under 1 year trading)',
    'Intermediate (1-3 years trading)',
    'Advanced (3+ years trading)',
];

export default function Inquiry() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', message: '' });
    const [errors, setErrors] = useState<Partial<typeof form>>({});
    const [sent, setSent] = useState(false);

    const validate = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
        if (!form.phone.match(/^[0-9]{10}$/)) e.phone = 'Enter valid 10-digit phone';
        if (!form.experience) e.experience = 'Please select your experience level';
        return e;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) setSent(true);
    };

    return (
        <section id="register" className={styles.section}>
            <div className={`container ${styles.inner}`}>
                {/* Left */}
                <div className={styles.left}>
                    <p className="section-label">Limited Slots</p>
                    <h2 className="section-heading">Join Our Free Live<br />Trading Workshop</h2>
                    <p className="section-sub">
                        Learn how to read price action, manage risk, and identify high-probability setups in this interactive 2-hour session with our lead mentor.
                    </p>

                    <div className={styles.contacts}>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}><Calendar size={18} /></div>
                            <div>
                                <div className={styles.contactLabel}>Upcoming Date</div>
                                <div className={styles.contactVal}>This Sunday at 11:00 AM IST</div>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}><ClockIcon size={18} /></div>
                            <div>
                                <div className={styles.contactLabel}>Duration</div>
                                <div className={styles.contactVal}>2 Hours (Live + Q&A Session)</div>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}><Mail size={18} /></div>
                            <div>
                                <div className={styles.contactLabel}>Support</div>
                                <div className={styles.contactVal}>workshop@Chartologic.in</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className={styles.formWrap}>
                    {sent ? (
                        <div className={styles.success}>
                            <span style={{ fontSize: '2.5rem' }}>🎉</span>
                            <h3>Seat Reserved, {form.name}!</h3>
                            <p>We have sent the live webinar link and calendar invite to {form.email}.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className={styles.form}>
                            <h3 className={styles.formTitle}>Reserve Your Free Seat</h3>

                            <div className={styles.field}>
                                <label htmlFor="reg-name">Full Name *</label>
                                <input
                                    id="reg-name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    aria-invalid={!!errors.name}
                                />
                                {errors.name && <span className={styles.error}>{errors.name}</span>}
                            </div>

                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="reg-email">Email *</label>
                                    <input
                                        id="reg-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        aria-invalid={!!errors.email}
                                    />
                                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="reg-phone">Phone Number *</label>
                                    <input
                                        id="reg-phone"
                                        type="tel"
                                        placeholder="10-digit number"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        aria-invalid={!!errors.phone}
                                    />
                                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="reg-exp">Trading Experience Level *</label>
                                <select
                                    id="reg-exp"
                                    value={form.experience}
                                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                                    aria-invalid={!!errors.experience}
                                >
                                    <option value="">Select experience level</option>
                                    {experienceLevels.map((lvl) => <option key={lvl} value={lvl}>{lvl}</option>)}
                                </select>
                                {errors.experience && <span className={styles.error}>{errors.experience}</span>}
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="reg-msg">What is your primary goal for this workshop? (Optional)</label>
                                <textarea
                                    id="reg-msg"
                                    rows={3}
                                    placeholder="e.g., Learn options hedging, understand market structure..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                />
                            </div>

                            <button type="submit" className={styles.submit}>
                                <Send size={16} /> Secure My Free Seat
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}


'use client';
import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import styles from './Inquiry.module.css';

const courses = [
    'Equity Trading',
    'Forex & Currency',
    'Cryptocurrency & Web3',
    'Derivatives (F&O)',
    'Technical Analysis Masterclass',
];

export default function Inquiry() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', message: '' });
    const [errors, setErrors] = useState<Partial<typeof form>>({});
    const [sent, setSent] = useState(false);

    const validate = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
        if (!form.phone.match(/^[0-9]{10}$/)) e.phone = 'Enter valid 10-digit phone';
        if (!form.course) e.course = 'Please select a course';
        if (!form.message.trim()) e.message = 'Message cannot be empty';
        return e;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) setSent(true);
    };

    return (
        <section id="inquiry" className={styles.section}>
            <div className={`container ${styles.inner}`}>
                {/* Left */}
                <div className={styles.left}>
                    <p className="section-label">Get in Touch</p>
                    <h2 className="section-heading">Start Your Trading<br />Journey Today</h2>
                    <p className="section-sub">Have questions? Reach out and our team will get back to you within 24 hours.</p>

                    <div className={styles.contacts}>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}><Mail size={18} /></div>
                            <div>
                                <div className={styles.contactLabel}>Email Us</div>
                                <div className={styles.contactVal}>hello@chartology.in</div>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}><Phone size={18} /></div>
                            <div>
                                <div className={styles.contactLabel}>Call Us</div>
                                <div className={styles.contactVal}>+91 98765 43210</div>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}><MapPin size={18} /></div>
                            <div>
                                <div className={styles.contactLabel}>Office</div>
                                <div className={styles.contactVal}>Bandra West, Mumbai, India</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className={styles.formWrap}>
                    {sent ? (
                        <div className={styles.success}>
                            <span style={{ fontSize: '2.5rem' }}>🎉</span>
                            <h3>Thank you, {form.name}!</h3>
                            <p>We'll get back to you shortly at {form.email}.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className={styles.form}>
                            <h3 className={styles.formTitle}>Inquiry Form</h3>

                            <div className={styles.field}>
                                <label htmlFor="inq-name">Full Name *</label>
                                <input
                                    id="inq-name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    aria-invalid={!!errors.name}
                                />
                                {errors.name && <span className={styles.error}>{errors.name}</span>}
                            </div>

                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="inq-email">Email *</label>
                                    <input
                                        id="inq-email"
                                        type="email"
                                        placeholder="john@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        aria-invalid={!!errors.email}
                                    />
                                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="inq-phone">Phone *</label>
                                    <input
                                        id="inq-phone"
                                        type="tel"
                                        placeholder="9876543210"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        aria-invalid={!!errors.phone}
                                    />
                                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="inq-course">Course *</label>
                                <select
                                    id="inq-course"
                                    value={form.course}
                                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                                    aria-invalid={!!errors.course}
                                >
                                    <option value="">Select a course</option>
                                    {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                                {errors.course && <span className={styles.error}>{errors.course}</span>}
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="inq-msg">Message *</label>
                                <textarea
                                    id="inq-msg"
                                    rows={4}
                                    placeholder="Tell us about your goals..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    aria-invalid={!!errors.message}
                                />
                                {errors.message && <span className={styles.error}>{errors.message}</span>}
                            </div>

                            <button type="submit" className={styles.submit}>
                                <Send size={16} /> Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

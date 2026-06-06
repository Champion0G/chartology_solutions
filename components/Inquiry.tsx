'use client';
import { useState, FormEvent } from 'react';
import { Calendar, Clock, Laptop, Users2, ShieldCheck, Send, Check } from 'lucide-react';
import styles from './Inquiry.module.css';

export default function Inquiry() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', occupation: '', city: '' });
    const [errors, setErrors] = useState<Partial<typeof form>>({});
    const [sent, setSent] = useState(false);

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
        <section id="register" className={styles.section}>
            <div className={`container ${styles.inner}`}>
                {/* Section 15: Workshop Details (Left Side) */}
                <div className={styles.left}>
                    <p className="section-label">Upcoming Live Session</p>
                    <h2 className="section-heading">Free Financial Markets Workshop</h2>
                    <p className="section-sub">
                        Reserve your spot to understand the structural mechanics of Stocks, Forex, and Cryptocurrencies.
                    </p>

                    <div className={styles.detailsGrid}>
                        <div className={styles.detailItem}>
                            <Calendar className={styles.detailIcon} size={20} />
                            <div>
                                <span className={styles.detailLabel}>Date</span>
                                <span className={styles.detailVal}>Upcoming Sunday</span>
                            </div>
                        </div>
                        <div className={styles.detailItem}>
                            <Clock className={styles.detailIcon} size={20} />
                            <div>
                                <span className={styles.detailLabel}>Time</span>
                                <span className={styles.detailVal}>11:00 AM IST</span>
                            </div>
                        </div>
                        <div className={styles.detailItem}>
                            <Laptop className={styles.detailIcon} size={20} />
                            <div>
                                <span className={styles.detailLabel}>Mode</span>
                                <span className={styles.detailVal}>Online (Live Interactive)</span>
                            </div>
                        </div>
                        <div className={styles.detailItem}>
                            <Users2 className={styles.detailIcon} size={20} />
                            <div>
                                <span className={styles.detailLabel}>Seats Available</span>
                                <span className={styles.detailVal} style={{ color: 'var(--red)', fontWeight: '700' }}>Limited to 100 Learners</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.benefitsSection}>
                        <h4>Key Session Benefits:</h4>
                        <ul className={styles.benefitsList}>
                            <li>
                                <Check size={16} className={styles.check} />
                                <span>Live Q&A with experienced market professionals</span>
                            </li>
                            <li>
                                <Check size={16} className={styles.check} />
                                <span>Fully interactive learning session</span>
                            </li>
                            <li>
                                <Check size={16} className={styles.check} />
                                <span>100% beginner-friendly explanation</span>
                            </li>
                            <li>
                                <Check size={16} className={styles.check} />
                                <span>Certificate of Participation issued to all attendees</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Section 16: Registration Form (Right Side) */}
                <div className={styles.formWrap}>
                    {sent ? (
                        <div className={styles.success}>
                            <span className={styles.successEmoji}>🎉</span>
                            <h3>Seat Reserved, {form.name}!</h3>
                            <p>We have sent the live webinar links and calendar invite to {form.email}.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className={styles.form}>
                            <h3 className={styles.formTitle}>Reserve Your Free Seat</h3>
                            <p className={styles.formSub}>All fields are mandatory for certification eligibility.</p>

                            <div className={styles.field}>
                                <label htmlFor="reg-name">Full Name *</label>
                                <input
                                    id="reg-name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className={errors.name ? styles.inputError : ''}
                                />
                                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                            </div>

                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="reg-email">Email Address *</label>
                                    <input
                                        id="reg-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className={errors.email ? styles.inputError : ''}
                                    />
                                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="reg-phone">Phone Number *</label>
                                    <input
                                        id="reg-phone"
                                        type="tel"
                                        placeholder="10-digit mobile number"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className={errors.phone ? styles.inputError : ''}
                                    />
                                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="reg-occ">Occupation *</label>
                                <select
                                    id="reg-occ"
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
                                <label htmlFor="reg-city">City *</label>
                                <input
                                    id="reg-city"
                                    type="text"
                                    placeholder="Enter your current city"
                                    value={form.city}
                                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                                    className={errors.city ? styles.inputError : ''}
                                />
                                {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                <Send size={16} /> Reserve My Seat
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

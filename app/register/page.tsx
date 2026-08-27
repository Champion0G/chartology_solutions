'use client';
import { useState, FormEvent } from 'react';
import { Send, Calendar, Clock, Laptop, Users2, Check } from 'lucide-react';
import styles from './register.module.css';
import useWorkshopSchedule from '@/hooks/useWorkshopSchedule';
import { trackFunnelEvent } from '@/lib/analytics';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', occupation: '', collegeName: '', city: '' });
    const [errors, setErrors] = useState<Partial<typeof form>>({});
    const [sent, setSent] = useState(false);
    const { schedule } = useWorkshopSchedule();

    const validate = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
        if (!form.phone.match(/^[0-9]{10}$/)) e.phone = '10-digit phone number is required';
        if (!form.occupation) e.occupation = 'Please select your occupation';
        if (form.occupation === 'Student' && !form.collegeName.trim()) {
            e.collegeName = 'College name is required';
        }
        if (!form.city.trim()) e.city = 'City is required';
        return e;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            try {
                const res = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                });
                if (res.ok) {
                    setSent(true);
                    trackFunnelEvent('workshop_registration');
                } else {
                    alert('Registration failed. Please try again.');
                }
            } catch (err) {
                console.error(err);
                alert('Connection error. Please try again.');
            }
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <div className={styles.grid}>
                    {/* Left Side: Session Quick Recap */}
                    <div className={styles.left}>
                        <span className={styles.badge}>🔴 LIVE WORKSHOP</span>
                        <h2>Financial Markets Masterclass</h2>
                        <p className={styles.desc}>Understand Stocks, Forex, and Crypto mechanics from institutional practitioners.</p>

                        <div className={styles.details}>
                            <div className={styles.detail}>
                                <Calendar size={16} className={styles.icon} />
                                <span>{schedule.date}</span>
                            </div>
                            <div className={styles.detail}>
                                <Clock size={16} className={styles.icon} />
                                <span>{schedule.time} (3 Hours)</span>
                            </div>
                            <div className={styles.detail}>
                                <Laptop size={16} className={styles.icon} />
                                <span>Online Live Session</span>
                            </div>
                            <div className={styles.detail}>
                                <Users2 size={16} className={styles.icon} />
                                <span style={{ color: 'var(--red)', fontWeight: '700' }}>Limited to {schedule.seats} Seats</span>
                            </div>
                        </div>

                        <ul className={styles.benefits}>
                            <li><Check size={14} className={styles.check} /> Live interactive Q&A</li>
                            <li><Check size={14} className={styles.check} /> 100% Beginner Friendly</li>
                            <li><Check size={14} className={styles.check} /> Certification Participation</li>
                        </ul>
                    </div>

                    {/* Right Side: Form */}
                    <div className={styles.right}>
                        {sent ? (
                            <div className={styles.success}>
                                <span className={styles.successEmoji}>🎉</span>
                                <h3>Seat Reserved!</h3>
                                <p>We sent the live links and calendar invites to {form.email}. See you at the workshop!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className={styles.form}>
                                <h3 className={styles.formTitle}>Reserve Your Seat</h3>
                                
                                <div className={styles.field}>
                                    <label htmlFor="reg-name">Full Name *</label>
                                    <input 
                                        id="reg-name"
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
                                            placeholder="10-digit number"
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
                                        className={`${errors.occupation ? styles.inputError : ''} ${!form.occupation ? styles.placeholderActive : ''}`}
                                    >
                                        <option value="">Select your occupation</option>
                                        <option value="Student">Student</option>
                                        <option value="Working Professional">Working Professional</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.occupation && <span className={styles.errorText}>{errors.occupation}</span>}
                                </div>

                                {form.occupation === 'Student' && (
                                    <div className={styles.field}>
                                        <label htmlFor="reg-college">College Name *</label>
                                        <input 
                                            id="reg-college"
                                            type="text" 
                                            placeholder="Enter your college/university name"
                                            value={form.collegeName}
                                            onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
                                            className={errors.collegeName ? styles.inputError : ''}
                                        />
                                        {errors.collegeName && <span className={styles.errorText}>{errors.collegeName}</span>}
                                    </div>
                                )}

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
                                    <Send size={14} /> Reserve My Seat
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

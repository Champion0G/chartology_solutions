'use client';
import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import styles from './contact.module.css';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState<Partial<typeof form>>({});
    const [sent, setSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
        if (form.phone && !form.phone.match(/^[0-9]{10}$/)) e.phone = '10-digit phone number must be valid';
        if (!form.message.trim()) e.message = 'Message is required';
        return e;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
                setSent(true);
                setForm({ name: '', email: '', phone: '', message: '' });
            }, 1200);
        }
    };

    return (
        <main className={styles.section} style={{ minHeight: '90vh', padding: '140px 0 100px' }}>
            <div className={`container ${styles.inner}`}>
                {/* Left Side: Contact Information */}
                <div className={styles.infoCol}>
                    <p className="section-label">Get in Touch</p>
                    <h1 className={styles.title}>Contact Chartologic</h1>
                    <p className={styles.desc}>
                        Have questions about our live cohorts, certifications, or internship programs? Send us a message and our support team will get back to you within 24 hours.
                    </p>

                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <div className={styles.iconWrap}>
                                <Mail size={18} />
                            </div>
                            <div>
                                <h4>Email Support</h4>
                                <p><a href="mailto:support@chartologic.com">support@chartologic.com</a></p>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.iconWrap}>
                                <Phone size={18} />
                            </div>
                            <div>
                                <h4>WhatsApp Support</h4>
                                <p><a href="https://wa.me/917595881240" target="_blank" rel="noopener noreferrer">+91 7595 881 240</a></p>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.iconWrap}>
                                <MapPin size={18} />
                            </div>
                            <div>
                                <h4>HQ Location</h4>
                                <p>Kolkata, West Bengal, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className={styles.formCol}>
                    <div className={styles.formCard}>
                        {sent ? (
                            <div className={styles.success}>
                                <div className={styles.successIcon}>
                                    <Check size={28} />
                                </div>
                                <h3>Inquiry Received!</h3>
                                <p>Thank you for reaching out. A representative from Chartologic will respond to your email address shortly.</p>
                                <button onClick={() => setSent(false)} className="btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className={styles.form}>
                                <h3 className={styles.formHeading}>Send a Message</h3>
                                <p className={styles.formSub}>All fields marked with * are required.</p>

                                <div className={styles.field}>
                                    <label htmlFor="contact-name">Full Name *</label>
                                    <input
                                        id="contact-name"
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
                                        <label htmlFor="contact-email">Email Address *</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className={errors.email ? styles.inputError : ''}
                                        />
                                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="contact-phone">Phone Number</label>
                                        <input
                                            id="contact-phone"
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
                                    <label htmlFor="contact-msg">Your Message *</label>
                                    <textarea
                                        id="contact-msg"
                                        rows={4}
                                        placeholder="How can we help you?"
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        className={errors.message ? styles.inputError : ''}
                                    />
                                    {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                                </div>

                                <button type="submit" disabled={submitting} className={styles.submitBtn}>
                                    <Send size={16} /> {submitting ? 'Sending Message...' : 'Submit Inquiry'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

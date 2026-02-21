import { Twitter, Instagram, Youtube, Linkedin, Facebook } from 'lucide-react';
import styles from './Footer.module.css';

const quickLinks = ['Home', 'About Us', 'Curriculum', 'Pricing', 'Testimonials', 'Contact'];
const courses = ['Equity Trading', 'Forex & Currency', 'Cryptocurrency', 'Derivatives (F&O)', 'Technical Analysis'];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.top}`}>
                {/* Col 1: Brand */}
                <div className={styles.col}>
                    <div className={styles.logo}>
                        [Chart<span className={styles.red}>ology</span>]
                    </div>
                    <p className={styles.desc}>
                        India's most trusted trading academy. Turning beginners into confident, independent traders since 2019.
                    </p>
                    <div className={styles.socials}>
                        {[
                            { Icon: Twitter, label: 'Twitter', href: '#' },
                            { Icon: Instagram, label: 'Instagram', href: '#' },
                            { Icon: Youtube, label: 'YouTube', href: '#' },
                            { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                            { Icon: Facebook, label: 'Facebook', href: '#' },
                        ].map(({ Icon, label, href }) => (
                            <a key={label} href={href} aria-label={label} className={styles.social}>
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Col 2: Quick Links */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Quick Links</h4>
                    <ul className={styles.links}>
                        {quickLinks.map((l) => (
                            <li key={l}><a href="#" className={styles.link}>{l}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Col 3: Courses */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Courses</h4>
                    <ul className={styles.links}>
                        {courses.map((c) => (
                            <li key={c}><a href="#pricing" className={styles.link}>{c}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Col 4: Contact */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Contact</h4>
                    <ul className={styles.links}>
                        <li className={styles.contactLine}>📧 hello@chartology.in</li>
                        <li className={styles.contactLine}>📞 +91 98765 43210</li>
                        <li className={styles.contactLine}>📍 Bandra West, Mumbai, 400050</li>
                    </ul>
                    <a href="#inquiry" className={styles.ctaSmall}>Join Now →</a>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className="container">
                    <p className={styles.copy}>© {new Date().getFullYear()} Chartology Academy. All rights reserved.</p>
                    <div className={styles.legal}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Refund Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

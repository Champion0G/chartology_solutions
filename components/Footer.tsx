import { Twitter, Instagram, Youtube, Linkedin, Facebook } from 'lucide-react';
import styles from './Footer.module.css';

const companyLinks = [
    { label: 'About Us', href: '/about-us' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/#register' }
];

const programLinks = [
    { label: 'Cohorts', href: '/#programs' },
    { label: 'Curriculum', href: '/#curriculum' },
    { label: 'Free Workshop', href: '/#register' }
];

const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Disclaimer', href: '/disclaimer' }
];

const resourceLinks = [
    { label: 'Testimonials', href: '/#testimonials' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Sitemap', href: '/site-map' }
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.top}`}>
                {/* Col 1: Brand */}
                <div className={styles.col}>
                    <div className={styles.logo}>
                        <img src="/logo.png" alt="Chartologic" className={styles.logoImg} />
                    </div>
                    <p className={styles.desc}>
                        India's premium trading education platform. Turning beginners into disciplined, independent traders since 2019.
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

                {/* Col 2: Company */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Company</h4>
                    <ul className={styles.links}>
                        {companyLinks.map((l) => (
                            <li key={l.label}><a href={l.href} className={styles.link}>{l.label}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Col 3: Programs */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Programs</h4>
                    <ul className={styles.links}>
                        {programLinks.map((l) => (
                            <li key={l.label}><a href={l.href} className={styles.link}>{l.label}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Col 4: Legal */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Legal</h4>
                    <ul className={styles.links}>
                        {legalLinks.map((l) => (
                            <li key={l.label}><a href={l.href} className={styles.link}>{l.label}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Col 5: Resources */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>Resources</h4>
                    <ul className={styles.links}>
                        {resourceLinks.map((l) => (
                            <li key={l.label}><a href={l.href} className={styles.link}>{l.label}</a></li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.disclaimerBox}>
                <div className="container">
                    <p className={styles.disclaimerText}>
                        <strong>⚠️ Risk Disclosure & Disclaimer:</strong> Trading and investing in financial markets involve high risk of capital loss. All educational content, analysis, strategies, and materials provided by Chartologic are for educational and training purposes only. Under no circumstances should they be construed as investment recommendations or financial advice. We are not a SEBI-registered advisory entity. Perform your own due diligence or consult a registered advisor before making financial decisions.
                    </p>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className="container">
                    <p className={styles.copy}>© {new Date().getFullYear()} Chartologic. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}


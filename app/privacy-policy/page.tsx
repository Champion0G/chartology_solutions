import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy — Chartologic',
    description: 'Privacy Policy for Chartologic, detailing how we collect, store, and protect user information under Indian IT regulations.',
};

export default function PrivacyPolicy() {
    return (
        <main className="section-py" style={{ minHeight: '80vh', padding: '140px 0 100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <p className="section-label" style={{ textAlign: 'center' }}>Legal Docs</p>
                <h1 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 42px)', textAlign: 'center', marginBottom: '40px' }}>
                    Privacy Policy
                </h1>

                <div style={{ color: 'var(--muted)', fontSize: '0.98rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <p><em>Last Updated: June 2026</em></p>
                    <p>
                        Chartologic ("we", "our", "us") values your privacy. This Privacy Policy describes how we collect, use, and share personal information of users of our website and services, compliant with the Information Technology Act, 2000 of India.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us when you register for cohorts, submit inquiries, or contact us. This includes:
                    </p>
                    <ul>
                        <li>Identity Data: Name, phone number, email address, WhatsApp contact.</li>
                        <li>Payment Data: Payment records, billing address, transaction details (we do not store credit card numbers directly).</li>
                        <li>Technical Data: IP address, browser type, device information, and site interaction statistics.</li>
                    </ul>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>2. How We Use Your Information</h2>
                    <p>
                        We use the collected information to:
                    </p>
                    <ul>
                        <li>Verify registrations and manage student cohort access.</li>
                        <li>Send updates, notifications regarding live sessions, and cohort announcements.</li>
                        <li>Improve our educational platform experience.</li>
                        <li>Comply with regulatory and tax rules in India.</li>
                    </ul>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>3. Data Security & Storage</h2>
                    <p>
                        We implement industry-standard electronic security measures to protect your personal data from unauthorized access, alteration, or disclosure. All personal data is stored on secure databases with encrypted access controls.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>4. Cookies & Trackers</h2>
                    <p>
                        We use cookies and web beacons to optimize site navigation, remember preferences, and analyze web traffic (using tools like Google Analytics). You can disable cookies in your browser settings, though some features of our site may not function fully.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>5. Contact Information</h2>
                    <p>
                        If you have any questions, concerns, or requests regarding this Privacy Policy, please contact our Grievance Officer at <strong>legal@Chartologic.in</strong>.
                    </p>
                </div>
            </div>
        </main>
    );
}


import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions — Chartologic',
    description: 'Terms & Conditions governing enrollment, cohort access, user behavior, and disclosures at Chartologic.',
};

export default function TermsAndConditions() {
    return (
        <main className="section-py" style={{ minHeight: '80vh', padding: '140px 0 100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <p className="section-label" style={{ textAlign: 'center' }}>Legal Docs</p>
                <h1 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 42px)', textAlign: 'center', marginBottom: '40px' }}>
                    Terms & Conditions
                </h1>

                <div style={{ color: 'var(--muted)', fontSize: '0.98rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <p><em>Last Updated: June 2026</em></p>
                    <p>
                        Welcome to Chartologic. By registering for our cohorts, purchasing courses, or using our website, you agree to comply with and be bound by the following Terms & Conditions.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>1. Educational Scope & No Advisory</h2>
                    <p>
                        Chartologic is strictly an educational organization. We provide training, webinars, simulators, and guides. <strong>We do not offer stock advisory services, tips, recommendations, or manage portfolios.</strong> All analysis shown is illustrative. Under no circumstances should student exercises be considered trading signals.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>2. Access & Enrollment</h2>
                    <ul>
                        <li>Access to any cohort or student group is personal and non-transferable.</li>
                        <li>Sharing login details or group links is strictly prohibited and will result in immediate termination of access without refund.</li>
                        <li>Course materials, live link details, and community conversations are protected under Indian intellectual property laws. Re-selling or distributing our materials will lead to legal action.</li>
                    </ul>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>3. Professional Conduct</h2>
                    <p>
                        Our community forums (Discord, WhatsApp, etc.) are built for learning and collaboration. Inappropriate language, spam, advertising, harassment, or solicitation of financial tips will result in immediate ban from the community platforms.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>4. Governing Law</h2>
                    <p>
                        These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of your enrollment or use of our site shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                    </p>
                </div>
            </div>
        </main>
    );
}


import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us — Chartologic',
    description: 'Learn about our mission, vision, teaching philosophy, and how we help students achieve trading independence.',
};

export default function AboutUs() {
    return (
        <main className="section-py" style={{ minHeight: '80vh', padding: '140px 0 100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <p className="section-label" style={{ textAlign: 'center' }}>About Us</p>
                <h1 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 48px)', textAlign: 'center', marginBottom: '40px' }}>
                    Democratizing Trading Education in India
                </h1>

                <div style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <p>
                        Chartologic was founded in 2019 with a single, clear objective: to replace the rampant speculation in the Indian financial markets with structured, rule-based education.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginTop: '20px' }}>Our Mission</h2>
                    <p>
                        To empower everyday retail market participants with mathematical risk management models and raw price action understanding. We don't promise easy returns; we promise standard, institutional-grade skills so that our students can build wealth over the long term.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginTop: '20px' }}>Our Teaching Philosophy</h2>
                    <p>
                        We believe that trading cannot be learned from pre-recorded videos alone. That is why we operate on a <strong>Live Cohort Model</strong>. Every lesson is delivered live, supported by real-time charting assignments, weekly peer group discussions, and direct mentor review sessions.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginTop: '20px' }}>Our Vision</h2>
                    <p>
                        To become India's most trusted educational institution for financial independence, recognized for compliance, transparency, and top-tier student learning outcomes rather than market hype.
                    </p>

                    <div style={{ marginTop: '40px', padding: '30px', background: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--white)', fontSize: '1.25rem', fontWeight: '800', marginBottom: '12px' }}>Ready to learn trading the right way?</h3>
                        <p style={{ fontSize: '0.95rem', marginBottom: '20px' }}>Join our next structured live cohort program.</p>
                        <a href="/#pricing" className="btn-primary">Explore Cohort Plans</a>
                    </div>
                </div>
            </div>
        </main>
    );
}


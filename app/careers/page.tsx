import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Careers — Chartologic',
    description: 'Join the team at Chartologic. Explore open positions for trading instructors, community managers, and research assistants.',
};

export default function Careers() {
    return (
        <main className="section-py" style={{ minHeight: '80vh', padding: '140px 0 100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <p className="section-label" style={{ textAlign: 'center' }}>Careers</p>
                <h1 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 48px)', textAlign: 'center', marginBottom: '40px' }}>
                    Help Us Build the Future of Trading Education
                </h1>

                <div style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <p>
                        At Chartologic, we are on a mission to bring discipline and mathematical precision to retail trading in India. We are looking for passionate, process-oriented individuals to join our growing team.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginTop: '20px' }}>Open Roles</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            {
                                title: 'Trading Instructor & Mentor',
                                type: 'Part-time / Remote',
                                desc: 'Deliver interactive live sessions on Price Action and Technical Analysis. Must have 5+ years of live trading experience and a proven track record. SEBI certification is a massive plus.'
                            },
                            {
                                title: 'Community Manager & Student Support',
                                type: 'Full-time / Remote',
                                desc: 'Moderate our student Discord channels, coordinate accountability groups, and manage community announcements. Must be highly organized and passionate about trading.'
                            },
                            {
                                title: 'Quantitative Research Assistant',
                                type: 'Full-time / Hybrid (Mumbai)',
                                desc: 'Help backtest systematic trading strategies, maintain databases, and prepare research sheets for cohort assignments.'
                            }
                        ].map((role) => (
                            <div key={role.title} style={{ padding: '24px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
                                    <h3 style={{ color: '#0f0f0f', fontSize: '1.15rem', fontWeight: '700' }}>{role.title}</h3>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--red)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{role.type}</span>
                                </div>
                                <p style={{ fontSize: '0.92rem', color: '#555555' }}>{role.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginTop: '20px' }}>How to Apply</h2>
                    <p>
                        Send your resume, trading experience overview, and a brief description of why you want to work with Chartologic to <strong>careers@Chartologic.in</strong>. Let us know which role you are applying for in the subject line.
                    </p>
                </div>
            </div>
        </main>
    );
}


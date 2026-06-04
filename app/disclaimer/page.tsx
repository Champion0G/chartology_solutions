import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Risk Disclaimer — Chartologic',
    description: 'Read the legal and regulatory disclaimer regarding stock trading education at Chartologic.',
};

export default function Disclaimer() {
    return (
        <main className="section-py" style={{ minHeight: '80vh', padding: '140px 0 100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <p className="section-label" style={{ textAlign: 'center' }}>Legal Docs</p>
                <h1 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 42px)', textAlign: 'center', marginBottom: '40px' }}>
                    Risk Disclosure & Disclaimer
                </h1>

                <div style={{ color: 'var(--muted)', fontSize: '0.98rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ padding: '24px', background: 'rgba(225, 6, 0, 0.08)', border: '1px solid rgba(225, 6, 0, 0.25)', borderRadius: '10px', color: 'var(--white)' }}>
                        <p style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '10px' }}>⚠️ IMPORTANT REGULATORY DISCLOSURE</p>
                        Trading and investing in equities, derivatives, futures, options, currencies, or commodities involve high risk. Please ensure you fully understand the risks before trading.
                    </div>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>1. Educational Content Only</h2>
                    <p>
                        All material, concepts, charts, indicators, and setups discussed by Chartologic, its mentors, or featured on this website are exclusively for **educational and training purposes**. We do not provide buy, sell, or hold recommendations on any security or asset class.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>2. Not a SEBI Registered Advisor</h2>
                    <p>
                        Chartologic is not registered with the Securities and Exchange Board of India (SEBI) as an Investment Advisor, Portfolio Manager, or Research Analyst. The training provided is strictly structured instruction on technical analysis, market structure, risk control math, and trading habits. It is not financial advice.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>3. Market Risk and Loss Warning</h2>
                    <p>
                        Stock market trading involves substantial risk of capital loss. Past performance of any system, mentor, or student is not indicative of future results. Retaining discipline, practicing on simulators first, and using proper position sizing are vital guidelines. You are solely responsible for your own trading capital and execution decisions.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>4. Third Party Tools</h2>
                    <p>
                        Any mention of charting software, trading brokers, simulators, or journaling tools are for user utility and illustrative convenience only. We do not endorse or take responsibility for operational defaults or financial losses incurred while using third-party services.
                    </p>
                </div>
            </div>
        </main>
    );
}


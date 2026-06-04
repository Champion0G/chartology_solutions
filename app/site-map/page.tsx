'use client';

export default function Sitemap() {
    const pages = [
        { name: 'Home Page', href: '/' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms & Conditions', href: '/terms-and-conditions' },
        { name: 'Refund Policy', href: '/refund-policy' },
        { name: 'Risk Disclaimer', href: '/disclaimer' }
    ];

    const sections = [
        { name: 'Hero Section', href: '/#hero' },
        { name: 'Our Mission Block', href: '/#about' },
        { name: 'Why Choose Us Cards', href: '/#why-choose' },
        { name: 'Structured Programs Grid', href: '/#programs' },
        { name: 'Curriculum Accordion', href: '/#curriculum' },
        { name: 'Certification Proof', href: '/#certification' },
        { name: 'Student Success Stories', href: '/#testimonials' },
        { name: 'Learning Process Timeline', href: '/#roadmap' },
        { name: 'Trainer Profile', href: '/#trainer' },
        { name: 'Community Block', href: '/#community' },
        { name: 'Flexible Pricing Plans', href: '/#pricing' },
        { name: 'Frequently Asked Questions', href: '/#faq' },
        { name: 'Lead Registration Form', href: '/#inquiry' }
    ];

    return (
        <main className="section-py" style={{ minHeight: '80vh', padding: '140px 0 100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <p className="section-label" style={{ textAlign: 'center' }}>Site Index</p>
                <h1 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 42px)', textAlign: 'center', marginBottom: '40px' }}>
                    Sitemap
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginTop: '20px' }}>
                    {/* Subpages Column */}
                    <div>
                        <h2 style={{ color: 'var(--white)', fontSize: '1.25rem', fontWeight: '800', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '16px' }}>
                            Main Pages
                        </h2>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {pages.map((p) => (
                                <li key={p.href}>
                                    <a href={p.href} style={{ color: 'var(--muted)', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--red)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>
                                        📄 {p.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Anchors Column */}
                    <div>
                        <h2 style={{ color: 'var(--white)', fontSize: '1.25rem', fontWeight: '800', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '16px' }}>
                            Homepage Sections
                        </h2>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {sections.map((s) => (
                                <li key={s.href}>
                                    <a href={s.href} style={{ color: 'var(--muted)', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--red)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>
                                        🔗 {s.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}


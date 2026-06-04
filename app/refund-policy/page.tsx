import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refund Policy — Chartologic',
    description: 'Understand the refund and cancellation policies for cohort enrollments at Chartologic.',
};

export default function RefundPolicy() {
    return (
        <main className="section-py" style={{ minHeight: '80vh', padding: '140px 0 100px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <p className="section-label" style={{ textAlign: 'center' }}>Legal Docs</p>
                <h1 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 42px)', textAlign: 'center', marginBottom: '40px' }}>
                    Refund & Cancellation Policy
                </h1>

                <div style={{ color: 'var(--muted)', fontSize: '0.98rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <p><em>Last Updated: June 2026</em></p>
                    <p>
                        We want you to be completely satisfied with your learning experience. Please read our guidelines on refunds and cancellations carefully.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>1. 7-Day Money-Back Guarantee</h2>
                    <p>
                        We offer a <strong>7-day money-back guarantee</strong> on all our structured cohort programs. If you decide that the curriculum, mentor style, or pacing is not suitable for you within 7 days of the first live class, you may request a refund.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>2. Process for Claiming a Refund</h2>
                    <p>
                        To request a refund under the guarantee:
                    </p>
                    <ul>
                        <li>Email your request to <strong>support@Chartologic.in</strong>.</li>
                        <li>Include your registered email address, mobile number, and payment invoice receipt.</li>
                        <li>The refund request must be sent before midnight on the 7th day following the first official live session of your cohort.</li>
                    </ul>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>3. Processing and Fees</h2>
                    <p>
                        Once approved, refunds are processed within 7 to 10 working days. They will be credited to the original payment source (UPI, Card, or Net Banking). 
                    </p>
                    <p>
                        Please note: Payment gateway transaction fees (usually 2-3%) and GST charges levied by the government may be deducted from the final refund amount.
                    </p>

                    <h2 style={{ color: 'var(--white)', fontSize: '1.35rem', fontWeight: '800', marginTop: '16px' }}>4. EMI & Installment Plans</h2>
                    <p>
                        For students on EMI or installment plans, cancellations requested after the 7-day period will not void future installment payments. Students remain liable for completing their payment schedule if access has been utilized past the trial period.
                    </p>
                </div>
            </div>
        </main>
    );
}


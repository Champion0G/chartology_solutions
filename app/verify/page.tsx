'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, Award, XCircle, Search, RefreshCw, Calendar, CheckCircle2 } from 'lucide-react';
import styles from './verify.module.css';

function VerifyContent() {
    const searchParams = useSearchParams();
    const queryId = searchParams.get('id');

    const [certId, setCertId] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (queryId) {
            setCertId(queryId);
            verifyCertificate(queryId);
        }
    }, [queryId]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (certId.trim()) {
            verifyCertificate(certId.trim());
        }
    };

    const verifyCertificate = async (id: string) => {
        setLoading(true);
        setError('');
        setResult(null);
        setHasSearched(true);
        try {
            const res = await fetch(`/api/certificates?id=${encodeURIComponent(id)}`);
            const data = await res.json();
            if (res.ok && data.verified) {
                setResult(data.certificate);
            } else {
                setError(data.error || 'Invalid Certificate ID. Verification failed.');
            }
        } catch (err) {
            setError('Connection error. Could not verify certificate.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            {/* Search Input Box */}
            <div className={styles.searchBox}>
                <form onSubmit={handleSearch} className={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Enter Certificate Verification ID (e.g. CERT-TTP-8849)" 
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? (
                            <RefreshCw size={18} className={styles.spin} style={{ animation: 'spin 1.5s linear infinite' }} />
                        ) : (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Search size={18} /> Verify
                            </span>
                        )}
                    </button>
                </form>
            </div>

            {/* Loading Cover */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <RefreshCw size={28} style={{ color: 'var(--red)', animation: 'spin 1.5s linear infinite', margin: '0 auto 16px auto' }} />
                    <p style={{ color: 'var(--muted)' }}>Searching certificate records...</p>
                </div>
            )}

            {/* Error View */}
            {!loading && error && (
                <div className={styles.errorCard}>
                    <XCircle size={44} style={{ color: 'var(--red)', margin: '0 auto' }} />
                    <h3 className={styles.errorTitle}>Verification Failed</h3>
                    <p className={styles.errorDesc}>{error}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Ensure the Certificate ID matches the format on the bottom-left of your credentials document exactly.
                    </p>
                </div>
            )}

            {/* Result View */}
            {!loading && result && (
                <div className={styles.certCard}>
                    <div className={styles.cardHeader}>
                        <img src="/logo.png" alt="Chartologic" className={styles.logoImg} />
                        <div className={styles.statusBadge}>
                            <ShieldCheck size={16} /> Verified Certificate
                        </div>
                    </div>

                    <div className={styles.cardBody}>
                        <Award size={48} className={styles.badgeIcon} />
                        <h2 className={styles.certTitle}>{result.certType}</h2>
                        <span className={styles.certCode}>{result.code}</span>
                        
                        <p className={styles.recipientText}>This is to verify that the credentials for</p>
                        <h3 className={styles.recipientName}>{result.name}</h3>
                        
                        <p style={{ color: '#555555', fontSize: '0.9rem', maxWidth: '460px', lineHeight: '1.6', margin: '0 auto 20px auto' }}>
                            have been successfully cross-referenced with the Chartologic Registry Database. The holder has completed all required evaluation criteria, homework trade logs, and final examinations for this module.
                        </p>
                    </div>

                    <div className={styles.cardFooter}>
                        <div className={styles.footerCol}>
                            <span className={styles.footerLabel}>Recipient Email</span>
                            <span className={styles.footerVal}>{result.email}</span>
                        </div>
                        <div className={styles.footerCol}>
                            <span className={styles.footerLabel}>Date Issued</span>
                            <span className={styles.footerVal}>
                                {new Date(result.issueDate).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className={styles.footerCol}>
                            <span className={styles.footerLabel}>Certificate ID</span>
                            <span className={styles.footerVal} style={{ color: 'var(--red)' }}>{result.id}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Help Prompt */}
            {!hasSearched && !loading && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <p>Enter a unique verification code to audit credential validity.</p>
                    <p style={{ fontSize: '0.8rem', marginTop: '8px' }}>
                        Typical ID structure: <code>CERT-{"{TRACK}"}-{"{NUMBER}"}</code>
                    </p>
                </div>
            )}
        </div>
    );
}

export default function VerificationPortal() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Credential Audit</h1>
            <p className={styles.sub}>Verifying digital qualifications issued by Chartologic.</p>
            <Suspense fallback={
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <RefreshCw size={28} style={{ color: 'var(--red)', animation: 'spin 1.5s linear infinite', margin: '0 auto 16px auto' }} />
                    <p style={{ color: 'var(--muted)' }}>Loading verification parameters...</p>
                </div>
            }>
                <VerifyContent />
            </Suspense>
        </main>
    );
}

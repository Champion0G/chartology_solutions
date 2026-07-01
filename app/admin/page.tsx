'use client';
import { useState, useEffect } from 'react';
import { 
    Users, Download, RefreshCw, Calendar, Clock, 
    Award, ShieldCheck, Mail, Phone, MapPin, 
    Lock, CheckCircle2, ChevronRight, LogOut 
} from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const [isAuth, setIsAuth] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'funnel' | 'workshop' | 'starter' | 'certs'>('overview');
    
    // DB states
    const [schedule, setSchedule] = useState({ date: '', time: '', seats: 100 });
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [starterKitLeads, setStarterKitLeads] = useState<any[]>([]);
    const [certificates, setCertificates] = useState<any[]>([]);
    const [clickStream, setClickStream] = useState<any[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [savingSchedule, setSavingSchedule] = useState(false);

    // Form state for Certificate
    const [certForm, setCertForm] = useState({
        name: '',
        email: '',
        certType: 'Technical Trader Practitioner',
        code: 'CM-TTP',
        issueDate: new Date().toISOString().split('T')[0]
    });
    const [issuingCert, setIssuingCert] = useState(false);

    // Search filters
    const [regSearch, setRegSearch] = useState('');
    const [regOccFilter, setRegOccFilter] = useState('');
    const [starterSearch, setStarterSearch] = useState('');
    const [certSearch, setCertSearch] = useState('');
    const [funnelSearch, setFunnelSearch] = useState('');
    const [funnelEventFilter, setFunnelEventFilter] = useState('');

    useEffect(() => {
        const storedAuth = sessionStorage.getItem('admin_authenticated');
        if (storedAuth === 'true') {
            setIsAuth(true);
            fetchData();
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // A simple administration passcode
        if (password === 'chartologic2026') {
            sessionStorage.setItem('admin_authenticated', 'true');
            setIsAuth(true);
            setAuthError('');
            fetchData();
        } else {
            setAuthError('Invalid passcode. Please try again.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_authenticated');
        setIsAuth(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [resSched, resReg, resKit, resCert, resTrack] = await Promise.all([
                fetch('/api/schedule'),
                fetch('/api/register'),
                fetch('/api/starter-kit'),
                fetch('/api/certificates'),
                fetch('/api/track')
            ]);

            if (resSched.ok) setSchedule(await resSched.json());
            if (resReg.ok) setRegistrations(await resReg.json());
            if (resKit.ok) setStarterKitLeads(await resKit.json());
            if (resCert.ok) setCertificates(await resCert.json());
            if (resTrack.ok) setClickStream(await resTrack.json());
        } catch (err) {
            console.error("Failed to load admin data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSchedule = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingSchedule(true);
        try {
            const res = await fetch('/api/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(schedule)
            });
            if (res.ok) {
                alert('Schedule updated successfully!');
            } else {
                alert('Failed to update schedule.');
            }
        } catch (err) {
            alert('Error updating schedule.');
        } finally {
            setSavingSchedule(false);
        }
    };

    const handleIssueCertificate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!certForm.name || !certForm.email || !certForm.issueDate) {
            alert('Please fill out all fields.');
            return;
        }

        setIssuingCert(true);
        try {
            const res = await fetch('/api/certificates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(certForm)
            });
            if (res.ok) {
                alert('Certificate issued successfully!');
                setCertForm({
                    name: '',
                    email: '',
                    certType: 'Technical Trader Practitioner',
                    code: 'CM-TTP',
                    issueDate: new Date().toISOString().split('T')[0]
                });
                // Reload certifications list
                const resCert = await fetch('/api/certificates');
                if (resCert.ok) setCertificates(await resCert.json());
            } else {
                alert('Failed to issue certificate.');
            }
        } catch (err) {
            alert('Error issuing certificate.');
        } finally {
            setIssuingCert(false);
        }
    };

    const handleCertTypeChange = (val: string) => {
        const certMappings: Record<string, string> = {
            'Financial Markets Foundation': 'CM-FND',
            'Technical Trader Practitioner': 'CM-TTP',
            'Price Action Specialist': 'CM-PAS',
            'Risk Management Associate': 'CM-RMA',
            'Trading Psychology Certified': 'CM-TPC',
            'Equity Analysis Specialist': 'CM-EAS',
            'Derivatives & Options Expert': 'CM-DOE',
            'Portfolio Allocation Architect': 'CM-PAA'
        };

        setCertForm({
            ...certForm,
            certType: val,
            code: certMappings[val] || 'CM-GEN'
        });
    };

    // CSV Downloader Utility
    const handleExportCSV = (data: any[], filename: string) => {
        if (!data || data.length === 0) {
            alert('No data available to export.');
            return;
        }

        const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
            const flattened: Record<string, any> = {};
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    const newKey = prefix ? `${prefix}_${key}` : key;
                    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
                        Object.assign(flattened, flattenObject(value, newKey));
                    } else {
                        flattened[newKey] = value;
                    }
                }
            }
            return flattened;
        };

        const flattenedData = data.map(item => flattenObject(item));
        const allHeaders = Array.from(new Set(flattenedData.flatMap(item => Object.keys(item))));
        
        let headers = allHeaders.join(',');
        let csvRows = flattenedData.map(row => {
            return allHeaders.map(header => {
                const val = row[header];
                let cell = val === null || val === undefined ? '' : String(val);
                cell = cell.replace(/"/g, '""');
                return `"${cell}"`;
            }).join(',');
        });

        const csvContent = [headers, ...csvRows].join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filters
    const filteredRegs = registrations.filter(r => {
        const matchSearch = r.name.toLowerCase().includes(regSearch.toLowerCase()) || 
                            r.email.toLowerCase().includes(regSearch.toLowerCase()) || 
                            r.city.toLowerCase().includes(regSearch.toLowerCase());
        const matchOcc = regOccFilter === '' ? true : r.occupation === regOccFilter;
        return matchSearch && matchOcc;
    });

    const filteredStarters = starterKitLeads.filter(s => {
        return s.name.toLowerCase().includes(starterSearch.toLowerCase()) || 
               s.email.toLowerCase().includes(starterSearch.toLowerCase());
    });

    const filteredCerts = certificates.filter(c => {
        return c.name.toLowerCase().includes(certSearch.toLowerCase()) || 
               c.email.toLowerCase().includes(certSearch.toLowerCase()) ||
               c.id.toLowerCase().includes(certSearch.toLowerCase());
    });

    const filteredClickStream = clickStream.filter(e => {
        const matchSearch = e.sessionId.toLowerCase().includes(funnelSearch.toLowerCase()) ||
                            e.event.toLowerCase().includes(funnelSearch.toLowerCase()) ||
                            e.path.toLowerCase().includes(funnelSearch.toLowerCase());
        const matchType = funnelEventFilter === '' ? true : e.event === funnelEventFilter;
        return matchSearch && matchType;
    });

    // Clickstream Calculations
    const uniqueSessionIds = new Set(clickStream.map(e => e.sessionId));
    const totalUniqueVisitors = uniqueSessionIds.size;
    const pageViewEvents = clickStream.filter(e => e.event === 'page_view');
    const totalPageViews = pageViewEvents.length;
    const modalOpenEvents = clickStream.filter(e => e.event === 'modal_open');
    const totalModalOpens = modalOpenEvents.length;
    const uniqueModalOpens = new Set(modalOpenEvents.map(e => e.sessionId)).size;
    const registrationEvents = clickStream.filter(e => e.event === 'workshop_registration');
    const totalRegistrationsTracked = registrationEvents.length;
    const uniqueRegistrants = new Set(registrationEvents.map(e => e.sessionId)).size;

    const exitIntentTriggerEvents = clickStream.filter(e => e.event === 'exit_intent_trigger');
    const totalExitTriggers = exitIntentTriggerEvents.length;
    const uniqueExitTriggers = new Set(exitIntentTriggerEvents.map(e => e.sessionId)).size;

    const starterKitDownloadEvents = clickStream.filter(e => e.event === 'starter_kit_download');
    const totalDownloadsTracked = starterKitDownloadEvents.length;
    const uniqueDownloads = new Set(starterKitDownloadEvents.map(e => e.sessionId)).size;

    // Conversion Rates
    const modalOpenRate = totalUniqueVisitors > 0 ? Math.round((uniqueModalOpens / totalUniqueVisitors) * 100) : 0;
    const regConversionRate = totalUniqueVisitors > 0 ? Math.round((uniqueRegistrants / totalUniqueVisitors) * 100) : 0;
    const exitTriggerRate = totalUniqueVisitors > 0 ? Math.round((uniqueExitTriggers / totalUniqueVisitors) * 100) : 0;
    const exitConversionRate = uniqueExitTriggers > 0 ? Math.round((uniqueDownloads / uniqueExitTriggers) * 100) : 0;

    // Stats calculations
    const totalWorkshopLeads = registrations.length;
    const totalStarterLeads = starterKitLeads.length;
    const totalCerts = certificates.length;
    
    const studentCount = registrations.filter(r => r.occupation === 'Student').length;
    const studentRatio = totalWorkshopLeads > 0 ? Math.round((studentCount / totalWorkshopLeads) * 100) : 0;

    if (!isAuth) {
        return (
            <main className="container">
                <div className={styles.authContainer}>
                    <Lock size={40} style={{ color: 'var(--red)', marginBottom: '16px' }} />
                    <h1 className={styles.authTitle}>Admin Panel</h1>
                    <p className={styles.authSub}>Access restricted to Chartologic executives.</p>
                    
                    <form onSubmit={handleLogin} className={styles.authForm}>
                        <div className={styles.field} style={{ textAlign: 'left' }}>
                            <label htmlFor="admin-pass">Access PIN</label>
                            <input 
                                id="admin-pass"
                                type="password" 
                                placeholder="••••••••" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className={styles.input}
                                required
                            />
                        </div>
                        {authError && <p style={{ color: 'var(--red)', fontSize: '0.8rem', textAlign: 'left' }}>{authError}</p>}
                        <button type="submit" className={styles.button} style={{ width: '100%' }}>
                            Authenticate Access <ChevronRight size={16} style={{ marginLeft: '4px', verticalAlign: 'middle' }} />
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Chartologic Operations</h1>
                    <p style={{ color: 'var(--muted)', marginTop: '4px' }}>Administrative and analytical center.</p>
                </div>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <LogOut size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Sign Out
                </button>
            </div>

            {/* Statistics */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrap}>
                        <Users size={20} />
                    </div>
                    <div>
                        <span className={styles.statLabel}>Workshop Registrants</span>
                        <span className={styles.statVal}>{totalWorkshopLeads}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrap}>
                        <Download size={20} />
                    </div>
                    <div>
                        <span className={styles.statLabel}>Starter Kit Leads</span>
                        <span className={styles.statVal}>{totalStarterLeads}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrap}>
                        <Award size={20} />
                    </div>
                    <div>
                        <span className={styles.statLabel}>Issued Certificates</span>
                        <span className={styles.statVal}>{totalCerts}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconWrap}>
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <span className={styles.statLabel}>Student Ratio</span>
                        <span className={styles.statVal}>{studentRatio}% Student</span>
                    </div>
                </div>
            </div>

            {/* Tab Links */}
            <div className={styles.tabs}>
                <button 
                    className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    System Status
                </button>
                <button 
                    className={`${styles.tabBtn} ${activeTab === 'schedule' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('schedule')}
                >
                    Workshop Schedule
                </button>
                <button 
                    className={`${styles.tabBtn} ${activeTab === 'workshop' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('workshop')}
                >
                    Workshop Leads ({totalWorkshopLeads})
                </button>
                <button 
                    className={`${styles.tabBtn} ${activeTab === 'starter' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('starter')}
                >
                    Exit Popup Leads ({totalStarterLeads})
                </button>
                <button 
                    className={`${styles.tabBtn} ${activeTab === 'funnel' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('funnel')}
                >
                    Funnel Analytics
                </button>
                <button 
                    className={`${styles.tabBtn} ${activeTab === 'certs' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('certs')}
                >
                    Certifications ({totalCerts})
                </button>
            </div>

            {/* Loading Cover */}
            {loading ? (
                <div className={styles.panel} style={{ textAlign: 'center', padding: '60px' }}>
                    <RefreshCw size={28} className={styles.spin} style={{ color: 'var(--red)', animation: 'spin 1.5s linear infinite' }} />
                    <p style={{ color: 'var(--muted)', marginTop: '16px' }}>Fetching records...</p>
                </div>
            ) : (
                <>
                    {/* Tab Panels */}
                    {activeTab === 'overview' && (
                        <div className={styles.panel}>
                            <h2 className={styles.panelTitle}>Operations Summary</h2>
                            <p style={{ color: 'var(--muted)', marginTop: '8px', lineHeight: '1.7' }}>
                                Chartologic educational funnel status is healthy. Workshop data points are syncing dynamically across all components. Database persistent operations are operating locally with stable server-side files.
                            </p>
                            
                            <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
                                <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '10px' }}>
                                    <h3 style={{ color: 'var(--white)', fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px' }}>Upcoming Session Information</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <Calendar size={14} className={styles.icon} /> Date: <strong>{schedule.date}</strong>
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <Clock size={14} className={styles.icon} /> Time: <strong>{schedule.time}</strong>
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Users size={14} className={styles.icon} /> Max Cap: <strong>{schedule.seats} Students</strong>
                                    </p>
                                </div>
                                <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '10px' }}>
                                    <h3 style={{ color: 'var(--white)', fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px' }}>Database Health</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <CheckCircle2 size={14} style={{ color: '#4ade80' }} /> Persistence: <strong>Stable (Local JSON)</strong>
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <CheckCircle2 size={14} style={{ color: '#4ade80' }} /> API Routing: <strong>Active</strong>
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <CheckCircle2 size={14} style={{ color: '#4ade80' }} /> Client Sync: <strong>Dynamic Live State</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'schedule' && (
                        <div className={styles.panel}>
                            <h2 className={styles.panelTitle} style={{ marginBottom: '20px' }}>Workshop Scheduler</h2>
                            <form onSubmit={handleSaveSchedule} className={styles.form}>
                                <div className={styles.field}>
                                    <label htmlFor="sched-date">Session Date/Label *</label>
                                    <input 
                                        id="sched-date"
                                        type="text" 
                                        value={schedule.date} 
                                        onChange={(e) => setSchedule({ ...schedule, date: e.target.value })} 
                                        className={styles.input}
                                        required
                                    />
                                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Example: "Upcoming Sunday" or "July 12, 2026"</span>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="sched-time">Session Time/Duration *</label>
                                    <input 
                                        id="sched-time"
                                        type="text" 
                                        value={schedule.time} 
                                        onChange={(e) => setSchedule({ ...schedule, time: e.target.value })} 
                                        className={styles.input}
                                        required
                                    />
                                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Example: "11:00 AM IST" or "6:00 PM IST (2 Hours)"</span>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="sched-cap">Seats Allocation Limit *</label>
                                    <input 
                                        id="sched-cap"
                                        type="number" 
                                        value={schedule.seats} 
                                        onChange={(e) => setSchedule({ ...schedule, seats: Number(e.target.value) })} 
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <button type="submit" disabled={savingSchedule} className={styles.button}>
                                    {savingSchedule ? 'Saving Details...' : 'Update Workshop Schedule'}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'workshop' && (
                        <div className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Workshop Registrations</h2>
                                <button 
                                    onClick={() => handleExportCSV(registrations, 'workshop_leads.csv')}
                                    className={styles.exportBtn}
                                >
                                    <Download size={16} /> Export to CSV
                                </button>
                            </div>

                            <div className={styles.controls}>
                                <input 
                                    type="text" 
                                    placeholder="Search by name, email, or city..." 
                                    value={regSearch}
                                    onChange={(e) => setRegSearch(e.target.value)}
                                    className={`${styles.input} ${styles.search}`}
                                />
                                <select 
                                    value={regOccFilter} 
                                    onChange={(e) => setRegOccFilter(e.target.value)}
                                    className={styles.input}
                                    style={{ background: 'var(--bg)', width: '220px' }}
                                >
                                    <option value="">All Occupations</option>
                                    <option value="Student">Student</option>
                                    <option value="Working Professional">Working Professional</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Occupation</th>
                                            <th>City</th>
                                            <th>Date Registered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRegs.length > 0 ? (
                                            filteredRegs.map((reg, idx) => (
                                                <tr key={idx}>
                                                    <td style={{ color: 'var(--white)', fontWeight: '600' }}>{reg.name}</td>
                                                    <td>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <Mail size={12} /> {reg.email}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <Phone size={12} /> {reg.phone}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`${styles.badge} ${
                                                            reg.occupation === 'Student' ? styles.studentBadge : 
                                                            reg.occupation === 'Working Professional' ? styles.professionalBadge : styles.otherBadge
                                                        }`}>
                                                            {reg.occupation}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <MapPin size={12} /> {reg.city}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(reg.timestamp).toLocaleDateString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className={styles.noData}>No registrations found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'starter' && (
                        <div className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Exit Popup (Starter Kit) Leads</h2>
                                <button 
                                    onClick={() => handleExportCSV(starterKitLeads, 'starter_kit_leads.csv')}
                                    className={styles.exportBtn}
                                >
                                    <Download size={16} /> Export to CSV
                                </button>
                            </div>

                            <div className={styles.controls}>
                                <input 
                                    type="text" 
                                    placeholder="Search by name or email..." 
                                    value={starterSearch}
                                    onChange={(e) => setStarterSearch(e.target.value)}
                                    className={`${styles.input} ${styles.search}`}
                                />
                            </div>

                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Date Captured</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStarters.length > 0 ? (
                                            filteredStarters.map((s, idx) => (
                                                <tr key={idx}>
                                                    <td style={{ color: 'var(--white)', fontWeight: '600' }}>{s.name}</td>
                                                    <td>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <Mail size={12} /> {s.email}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <Phone size={12} /> {s.phone}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(s.timestamp).toLocaleDateString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className={styles.noData}>No starter kit leads found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'certs' && (
                        <div className={styles.panel}>
                            <h2 className={styles.panelTitle} style={{ marginBottom: '24px' }}>Digital Certifications Operations</h2>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '32px', flexWrap: 'wrap' }}>
                                {/* Left: Issue Form */}
                                <div>
                                    <h3 style={{ color: 'var(--white)', fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px' }}>Issue New Certificate</h3>
                                    <form onSubmit={handleIssueCertificate} className={styles.form} style={{ maxWidth: '100%' }}>
                                        <div className={styles.field}>
                                            <label htmlFor="cert-name">Recipient Name *</label>
                                            <input 
                                                id="cert-name"
                                                type="text" 
                                                placeholder="Full Name" 
                                                value={certForm.name}
                                                onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                                                className={styles.input}
                                                required
                                            />
                                        </div>
                                        <div className={styles.field}>
                                            <label htmlFor="cert-email">Recipient Email *</label>
                                            <input 
                                                id="cert-email"
                                                type="email" 
                                                placeholder="email@example.com" 
                                                value={certForm.email}
                                                onChange={(e) => setCertForm({ ...certForm, email: e.target.value })}
                                                className={styles.input}
                                                required
                                            />
                                        </div>
                                        <div className={styles.field}>
                                            <label htmlFor="cert-type">Certification Track *</label>
                                            <select
                                                id="cert-type"
                                                value={certForm.certType}
                                                onChange={(e) => handleCertTypeChange(e.target.value)}
                                                className={styles.input}
                                                style={{ background: 'var(--bg)' }}
                                            >
                                                <option value="Financial Markets Foundation">Financial Markets Foundation (CM-FND)</option>
                                                <option value="Technical Trader Practitioner">Technical Trader Practitioner (CM-TTP)</option>
                                                <option value="Price Action Specialist">Price Action Specialist (CM-PAS)</option>
                                                <option value="Risk Management Associate">Risk Management Associate (CM-RMA)</option>
                                                <option value="Trading Psychology Certified">Trading Psychology Certified (CM-TPC)</option>
                                                <option value="Equity Analysis Specialist">Equity Analysis Specialist (CM-EAS)</option>
                                                <option value="Derivatives & Options Expert">Derivatives & Options Expert (CM-DOE)</option>
                                                <option value="Portfolio Allocation Architect">Portfolio Allocation Architect (CM-PAA)</option>
                                            </select>
                                        </div>
                                        <div className={styles.field}>
                                            <label htmlFor="cert-date">Date Issued *</label>
                                            <input 
                                                id="cert-date"
                                                type="date" 
                                                value={certForm.issueDate}
                                                onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                                                className={styles.input}
                                                required
                                            />
                                        </div>
                                        <button type="submit" disabled={issuingCert} className={styles.button} style={{ width: '100%', justifyContent: 'center' }}>
                                            {issuingCert ? 'Issuing...' : 'Generate Verifiable Certificate'}
                                        </button>
                                    </form>
                                </div>

                                {/* Right: Searchable Certificates Grid */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <h3 style={{ color: 'var(--white)', fontSize: '1.05rem', fontWeight: '700' }}>Active Registry</h3>
                                        <input 
                                            type="text" 
                                            placeholder="Search by ID, name, email..." 
                                            value={certSearch}
                                            onChange={(e) => setCertSearch(e.target.value)}
                                            className={styles.input}
                                            style={{ width: '220px', padding: '8px 12px', fontSize: '0.85rem' }}
                                        />
                                    </div>

                                    <div className={styles.tableContainer}>
                                        <table className={styles.table} style={{ fontSize: '0.85rem' }}>
                                            <thead>
                                                <tr>
                                                    <th>Cert ID</th>
                                                    <th>Recipient</th>
                                                    <th>Track Code</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredCerts.length > 0 ? (
                                                    filteredCerts.map((c, idx) => (
                                                        <tr key={idx}>
                                                            <td style={{ color: 'var(--white)', fontWeight: '700' }}>{c.id}</td>
                                                            <td>
                                                                <div style={{ fontWeight: '600', color: 'var(--white)' }}>{c.name}</div>
                                                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{c.email}</div>
                                                            </td>
                                                            <td>
                                                                <span className={styles.badge} style={{ background: 'rgba(225,6,0,0.06)', color: 'var(--red)', border: '1px solid rgba(225,6,0,0.1)' }}>
                                                                    {c.code}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <button 
                                                                    onClick={() => {
                                                                        const url = `${window.location.origin}/verify?id=${c.id}`;
                                                                        navigator.clipboard.writeText(url);
                                                                        alert('Verification link copied to clipboard!');
                                                                    }}
                                                                    className={styles.exportBtn}
                                                                    style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                                                >
                                                                    Copy Link
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} className={styles.noData}>No records found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'funnel' && (
                        <div className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Funnel & Conversion Analytics</h2>
                                <button 
                                    onClick={() => handleExportCSV(clickStream, 'funnel_clickstream_logs.csv')}
                                    className={styles.exportBtn}
                                >
                                    <Download size={16} /> Export Clickstream
                                </button>
                            </div>

                            {/* Funnel Metrics Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Total Funnel Sessions</span>
                                    <h4 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginTop: '4px' }}>{totalUniqueVisitors}</h4>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Total Page Views</span>
                                    <h4 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginTop: '4px' }}>{totalPageViews}</h4>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Workshop Booking Rate</span>
                                    <h4 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginTop: '4px' }}>{regConversionRate}%</h4>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Exit popup Downloads</span>
                                    <h4 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginTop: '4px' }}>{exitConversionRate}%</h4>
                                </div>
                            </div>

                            {/* Funnel Comparison Visualization */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', marginBottom: '40px', flexWrap: 'wrap' }}>
                                {/* Left Side: Primary Funnel */}
                                <div style={{ background: 'rgba(255,255,255,0.01)', padding: '24px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                                    <h3 style={{ color: 'var(--white)', fontSize: '1.05rem', fontWeight: '700', marginBottom: '20px' }}>Primary Workshop Booking Funnel</h3>
                                    
                                    {/* Funnel Level 1 */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                                            <span style={{ color: 'var(--white)', fontWeight: '600' }}>1. Unique Visitors</span>
                                            <span style={{ color: 'var(--muted)' }}>{totalUniqueVisitors} sessions (100%)</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                            <div style={{ width: '100%', height: '100%', background: 'var(--muted)', borderRadius: '4px' }} />
                                        </div>
                                    </div>

                                    {/* Funnel Level 2 */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                                            <span style={{ color: 'var(--white)', fontWeight: '600' }}>2. Booking Modal Opened</span>
                                            <span style={{ color: 'var(--muted)' }}>{uniqueModalOpens} sessions ({modalOpenRate}% of traffic)</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                            <div style={{ width: `${modalOpenRate}%`, height: '100%', background: 'var(--red)', opacity: 0.7, borderRadius: '4px' }} />
                                        </div>
                                    </div>

                                    {/* Funnel Level 3 */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                                            <span style={{ color: 'var(--white)', fontWeight: '600' }}>3. Seat Reserved</span>
                                            <span style={{ color: 'var(--muted)' }}>{uniqueRegistrants} sessions ({regConversionRate}% funnel conversion)</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                            <div style={{ width: `${regConversionRate}%`, height: '100%', background: 'var(--red)', borderRadius: '4px' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Exit-Intent Funnel */}
                                <div style={{ background: 'rgba(255,255,255,0.01)', padding: '24px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                                    <h3 style={{ color: 'var(--white)', fontSize: '1.05rem', fontWeight: '700', marginBottom: '20px' }}>Secondary Exit-Intent Retention</h3>
                                    
                                    {/* Exit Level 1 */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                                            <span style={{ color: 'var(--white)', fontWeight: '600' }}>1. Unique Visitors</span>
                                            <span style={{ color: 'var(--muted)' }}>{totalUniqueVisitors} sessions</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                            <div style={{ width: '100%', height: '100%', background: 'var(--muted)', borderRadius: '4px' }} />
                                        </div>
                                    </div>

                                    {/* Exit Level 2 */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                                            <span style={{ color: 'var(--white)', fontWeight: '600' }}>2. Exit Intent Triggered</span>
                                            <span style={{ color: 'var(--muted)' }}>{uniqueExitTriggers} triggers ({exitTriggerRate}% of traffic)</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                            <div style={{ width: `${exitTriggerRate}%`, height: '100%', background: 'var(--red)', opacity: 0.6, borderRadius: '4px' }} />
                                        </div>
                                    </div>

                                    {/* Exit Level 3 */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                                            <span style={{ color: 'var(--white)', fontWeight: '600' }}>3. Starter Kit Downloaded</span>
                                            <span style={{ color: 'var(--muted)' }}>{uniqueDownloads} downloads ({exitConversionRate}% trigger conversion)</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                            <div style={{ width: `${exitConversionRate * exitTriggerRate / 100}%`, height: '100%', background: '#4ade80', borderRadius: '4px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Raw Click Stream Logs */}
                            <h3 style={{ color: 'var(--white)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px' }}>Clickstream Raw Log Events</h3>
                            
                            <div className={styles.controls}>
                                <input 
                                    type="text" 
                                    placeholder="Search by Session ID..." 
                                    value={funnelSearch}
                                    onChange={(e) => setFunnelSearch(e.target.value)}
                                    className={`${styles.input} ${styles.search}`}
                                />
                                <select 
                                    value={funnelEventFilter} 
                                    onChange={(e) => setFunnelEventFilter(e.target.value)}
                                    className={styles.input}
                                    style={{ background: 'var(--bg)', width: '220px' }}
                                >
                                    <option value="">All Events</option>
                                    <option value="page_view">Page View (page_view)</option>
                                    <option value="modal_open">Modal Open (modal_open)</option>
                                    <option value="workshop_registration">Registered (workshop_registration)</option>
                                    <option value="exit_intent_trigger">Exit Intent (exit_intent_trigger)</option>
                                    <option value="starter_kit_download">Downloaded Kit (starter_kit_download)</option>
                                </select>
                            </div>

                            <div className={styles.tableContainer}>
                                <table className={styles.table} style={{ fontSize: '0.82rem' }}>
                                    <thead>
                                        <tr>
                                            <th>Timestamp</th>
                                            <th>Event Name</th>
                                            <th>Device & OS</th>
                                            <th>Attribution</th>
                                            <th>Context Meta</th>
                                            <th>Session Token</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredClickStream.length > 0 ? (
                                            filteredClickStream.map((event, idx) => {
                                                const d = event.device || {};
                                                const a = event.attribution || {};
                                                const m = event.metadata || {};
                                                return (
                                                    <tr key={idx}>
                                                        <td>{new Date(event.timestamp).toLocaleString()}</td>
                                                        <td>
                                                            <span className={styles.badge} style={{ 
                                                                background: event.event === 'workshop_registration' || event.event === 'starter_kit_download' ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
                                                                color: event.event === 'workshop_registration' || event.event === 'starter_kit_download' ? '#4ade80' : 'var(--muted)',
                                                                border: '1px solid rgba(255,255,255,0.08)'
                                                            }}>
                                                                {event.event}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {d.type ? `${d.type} (${d.browser} on ${d.os})` : 'Unknown'}
                                                        </td>
                                                        <td>
                                                            {a.utm_source ? (
                                                                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                                                                    src: <strong>{a.utm_source}</strong> | campaign: <strong>{a.utm_campaign}</strong>
                                                                </span>
                                                            ) : (
                                                                <span style={{ color: 'var(--muted)' }}>Direct / Organic</span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {m.ctaId && <span>CTA: <code>{m.ctaId}</code></span>}
                                                            {m.faqQuestion && <span>FAQ: <em style={{ fontSize: '0.75rem' }}>{m.faqQuestion}</em></span>}
                                                            {!m.ctaId && !m.faqQuestion && <span style={{ color: 'var(--muted)' }}>-</span>}
                                                        </td>
                                                        <td style={{ fontFamily: 'monospace', color: 'var(--white)', cursor: 'pointer' }} onClick={() => setFunnelSearch(event.sessionId)}>
                                                            {event.sessionId}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className={styles.noData}>No log events found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}

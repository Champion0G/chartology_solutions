'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const navLinks = [
    { label: 'Home', href: '/#hero' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Programs', href: '/#programs' },
    { label: 'Curriculum', href: '/#curriculum' },
    { label: 'Testimonials', href: '/#testimonials' },
    { label: 'Free Workshop', href: '/#register' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const closeMenu = () => setOpen(false);

    return (
        <>
            <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
                <div className={`container ${styles.inner}`}>
                    {/* Logo */}
                    <a href="/#hero" className={styles.logo}>
                        <img src="/logo.png" alt="Chartologic" className={styles.logoImg} />
                    </a>

                    {/* Desktop nav */}
                    <nav className={styles.nav} aria-label="Main navigation">
                        {navLinks.map((l) => (
                            <a key={l.label} href={l.href} className={styles.navLink}>{l.label}</a>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className={styles.ctas}>
                        <a href="/#register" className="btn-primary" style={{ padding: '10px 22px' }}>Reserve Seat</a>
                    </div>

                    {/* Hamburger */}
                    <button
                        className={styles.burger}
                        onClick={() => setOpen(!open)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile drawer */}
            <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} role="dialog" aria-modal="true">
                <nav aria-label="Mobile navigation">
                    {navLinks.map((l) => (
                        <a key={l.label} href={l.href} className={styles.drawerLink} onClick={closeMenu}>{l.label}</a>
                    ))}
                    <div className={styles.drawerCtas}>
                        <a href="/#register" className="btn-primary" onClick={closeMenu} style={{ width: '100%', justifyContent: 'center' }}>Reserve Seat</a>
                    </div>
                </nav>
            </div>
            {open && <div className={styles.overlay} onClick={closeMenu} aria-hidden="true" />}
        </>
    );
}


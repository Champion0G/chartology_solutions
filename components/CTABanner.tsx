'use client';
import styles from './CTABanner.module.css';

export default function CTABanner() {
    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-register-modal'));
    };

    return (
        <section className={styles.section} id="cta-banner">
            <div className="container">
                <div className={styles.inner}>
                    <p className={styles.subText}>Start Your Journey</p>
                    <h2 className={styles.heading}>Ready To Understand Financial Markets<br />The Right Way?</h2>
                    <p className={styles.sub}>
                        Join the next free live workshop and discover the roadmap followed by successful market participants.
                    </p>
                    <a href="#register" onClick={handleRegisterClick} className={styles.btn}>
                        🚀 Reserve My Workshop Seat
                    </a>
                </div>
            </div>
        </section>
    );
}

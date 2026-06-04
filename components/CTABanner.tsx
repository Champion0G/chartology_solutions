import styles from './CTABanner.module.css';

export default function CTABanner() {
    return (
        <section className={styles.section} id="cta-banner">
            <div className="container">
                <div className={styles.inner}>
                    <p className={styles.subText}>Over 10,000 traders have transformed their careers</p>
                    <h2 className={styles.heading}>To find out more about our<br />Online Courses</h2>
                    <p className={styles.sub}>
                        Join the most comprehensive trading education platform in India. Start your journey today.
                    </p>
                    <a href="#inquiry" className={styles.btn}>
                        Join Now →
                    </a>
                </div>
            </div>
        </section>
    );
}


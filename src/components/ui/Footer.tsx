'use client';

import styles from './Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <h2 className="h2" style={{ color: 'white' }}>Let's Build<br />The Future.</h2>
                    <a href="https://calendly.com" className={styles.ctaButton}>Agendar una call</a>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.col}>
                        <h3>BE MARKETING</h3>
                        <p>Global Flagship Studio</p>
                    </div>

                    <div className={styles.col}>
                        <Link href="#">Instagram</Link>
                        <Link href="#">LinkedIn</Link>
                        <Link href="#">Behance</Link>
                    </div>

                    <div className={styles.col}>
                        <p>&copy; 2026 BE Marketing Studio.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

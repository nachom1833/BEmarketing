'use client';

import styles from './TrustBar.module.scss';
import { motion } from 'framer-motion';

const brands = ["NIKE", "ADIDAS", "PUMA", "REDBULL", "SONY", "SAMSUNG", "SPOTIFY", "TESLA"];

export default function TrustBar() {
    return (
        <section className={styles.trustBar}>
            <p className={styles.label}>Experience gained while working with top-tier brands</p>

            <div className={styles.marqueeContainer}>
                <motion.div
                    className={styles.marquee}
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                >
                    {brands.map((brand, index) => (
                        <span key={index} className={styles.brand}>{brand}</span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {brands.map((brand, index) => (
                        <span key={`dup-${index}`} className={styles.brand}>{brand}</span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

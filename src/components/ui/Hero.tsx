'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hero.module.scss';
import Image from 'next/image';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section className={styles.hero} ref={containerRef}>
            <div className={styles.bgContainer}>
                <motion.div style={{ y, opacity }} className={styles.parallaxBg}>
                    {/* Unsplash Placeholder for "Performance & Emotion" - Abstract dynamic architectural/light */}
                    <Image
                        src="https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=2070&auto=format&fit=crop"
                        alt="Background"
                        fill
                        className={styles.bgImage}
                        priority
                    />
                    <div className={styles.overlay} />
                </motion.div>
            </div>

            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <h1 className="h1">
                        Convertimos experiencias<br />
                        de marca en resultados<br />
                        de negocio.
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className={styles.subheadWrapper}
                >
                    <p className="subtitle">Diseño de espacios, retail deportivo y activaciones orientadas a performance.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                    className={styles.ctaWrapper}
                >
                    <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className={styles.heroCta}>
                        Agendar una call
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

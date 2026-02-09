'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './MethodSection.module.scss';

const steps = [
    { id: '01', title: 'Brief + Benchmark', desc: 'Entendemos, analizamos y trazamos impacto.' },
    { id: '02', title: 'Brand Core', desc: 'Definimos el alma y la voz de tu marca.' },
    { id: '03', title: 'Build & Design', desc: 'Diseñamos identidad con visión y precisión.' },
    { id: '04', title: 'Bit & Code', desc: 'Convertimos ideas en experiencias digitales.' },
    { id: '05', title: 'Boost & Activate', desc: 'Lanzamos campañas que conectan y movilizan.' },
    { id: '06', title: 'Balance & Iterate', desc: 'Medimos, aprendemos y evolucionamos.' },
    { id: '07', title: 'Bots con Criterio', desc: 'Automatizamos con inteligencia y propósito.' },
];

export default function MethodSection() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Map scroll progress to horizontal translation
    // We want to scroll effectively -90% of width? Depends on content width.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    return (
        <section ref={targetRef} className={styles.methodSection} id="method">
            <div className={styles.stickyContainer}>
                <div className={styles.bgOverlay} />
                <div className={styles.contentWrapper}>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>The BE Method™</h2>
                    </div>

                    <motion.div style={{ x }} className={styles.stepsContainer}>
                        {steps.map((step) => (
                            <div key={step.id} className={styles.stepCard}>
                                <span className={styles.stepNumber}>{step.id}</span>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

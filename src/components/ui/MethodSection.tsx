'use client';

import { motion, useScroll, useTransform, useVelocity, useSpring, Variants } from 'framer-motion';
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
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress, scrollY } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    // Directive 1: Scrubbable Coral Timeline
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Directive 3: Parallax for Numbers
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Physics: Scroll Velocity -> Tilt (Softened)
    const scrollVelocity = useVelocity(scrollY);
    const rawSkew = useTransform(scrollVelocity, [-2000, 2000], [-5, 5]);
    const smoothSkew = useSpring(rawSkew, { damping: 30, stiffness: 50 });

    // Physics: Balanced & Refined (User Preference: Slower Suspense)
    const cardVariants: Variants = {
        offscreen: {
            opacity: 0,
            y: 50, // Reduced travel for subtlety
            rotateX: 10,
            scale: 0.95,
            z: 0
        },
        onscreen: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            z: 0,
            transition: {
                type: "spring",
                stiffness: 100, // Softer, more luxurious snap
                damping: 30,    // No wobble
                mass: 1
            }
        },
        // Active Pop (Z-Axis)
        active: {
            scale: 1.03,
            zIndex: 10,
            z: 20, // translateZ
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    const nodeVariants: Variants = {
        offscreen: {
            backgroundColor: "transparent",
            borderColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 0 rgba(255, 111, 97, 0)",
            scale: 0.8
        },
        onscreen: {
            backgroundColor: "transparent",
            borderColor: "rgba(255, 255, 255, 0.2)",
            scale: 1
        },
        active: {
            backgroundColor: "#FF6F61",
            borderColor: "#FF6F61",
            boxShadow: "0 0 15px #FF6F61",
            scale: 1.2,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    return (
        <section className={styles.methodSection} id="method" ref={containerRef}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={styles.header}
                >
                    <h2 className={styles.sectionTitle}>The BE Method™</h2>
                </motion.div>

                <div className={styles.stepsWrapper}>
                    {/* The Luminous Thread */}
                    <div className={styles.connectorLineWrapper}>
                        {/* Active Fill */}
                        <motion.div
                            className={styles.luminousThread}
                            style={{
                                height: "100%",
                                originY: 0,
                                scaleY,
                            }}
                        />
                    </div>

                    <div className={styles.stepsContainer}>
                        {steps.map((step, index) => (
                            <MethodCard
                                key={step.id}
                                step={step}
                                index={index}
                                skew={smoothSkew}
                                variants={cardVariants}
                                nodeVariants={nodeVariants}
                                parallaxY={parallaxY}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const MethodCard = ({ step, index, skew, variants, nodeVariants, parallaxY }: {
    step: typeof steps[0],
    index: number,
    skew: any,
    variants: Variants,
    nodeVariants: Variants,
    parallaxY: any
}) => {
    return (
        <motion.div
            className={styles.stepCard}
            initial="offscreen"
            whileInView={["onscreen", "active"]}
            viewport={{ once: false, margin: "-20% 0px -20% 0px" }} // Trigger active state near center
            style={{
                skewX: skew,
                transformPerspective: 1000,
                transformStyle: "preserve-3d"
            }}
            variants={variants}
        >
            {/* Timeline Node */}
            <motion.div
                className={styles.timelineNode}
                variants={nodeVariants}
            />

            <motion.span
                className={styles.stepNumber}
                style={{ y: parallaxY }}
            >
                {step.id}
            </motion.span>

            <div className={styles.cardContent} style={{ transform: "translateZ(10px)" }}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
            </div>
        </motion.div>
    );
};

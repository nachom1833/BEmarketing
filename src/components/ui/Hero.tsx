'use client';

import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import styles from './Hero.module.scss';
import WindTunnelBackground from './WindTunnelBackground';

// Magnetic Button Component
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Magnetic pull effect (max 15px movement)
        x.set(distanceX * 0.3);
        y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroCta}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.a>
    );
}

export default function Hero() {
    // Staggered text animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const lineVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        },
    };

    return (
        <section className={styles.hero}>
            {/* Aerodynamic Wind Tunnel Background */}
            <WindTunnelBackground />

            <div className={styles.content}>
                {/* Staggered Headline Animation */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 className="h1" variants={lineVariants}>
                        Convertimos experiencias
                    </motion.h1>
                    <motion.h1 className="h1" variants={lineVariants}>
                        de marca en resultados
                    </motion.h1>
                    <motion.h1 className="h1" variants={lineVariants}>
                        de negocio.
                    </motion.h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
                    className={styles.subheadWrapper}
                >
                    <p className={styles.subtitle}>
                        Diseño de espacios, retail deportivo y activaciones orientadas a performance.
                    </p>
                </motion.div>

                {/* Magnetic CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
                    className={styles.ctaWrapper}
                >
                    <MagneticButton href="https://calendly.com">
                        Agendar una call
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}

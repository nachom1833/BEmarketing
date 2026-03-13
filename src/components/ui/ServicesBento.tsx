'use client';

import { motion, Variants } from 'framer-motion';
import styles from './ServicesBento.module.scss';
import Image from 'next/image';

const services = [
    {
        id: 1,
        title: "Espacios & Retail",
        desc: "Arquitectura comercial que activa emociones.",
        // Abstract Architecture / Blueprints
        image: "https://images.unsplash.com/photo-1506720165074-ce443b81109a?q=80&w=2000&auto=format&fit=crop",
        span: "large"
    },
    {
        id: 2,
        title: "Activaciones",
        desc: "Experiencias inmersivas de alto impacto.",
        // Kinetic Energy / Motion
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop",
        span: "medium"
    },
    {
        id: 3,
        title: "Branding Core",
        desc: "Identidad visual con alma y estrategia.",
        // Core / Soul / Light
        image: "https://images.unsplash.com/photo-1485627658391-1365e4e0dbfe?q=80&w=2000&auto=format&fit=crop",
        span: "medium"
    },
    {
        id: 4,
        title: "Data & Social",
        desc: "Contenido inteligente basado en datos.",
        // Data Stream / Network
        image: "https://images.unsplash.com/photo-1558494949-ef2bb6db879c?q=80&w=2000&auto=format&fit=crop",
        span: "small"
    },
    {
        id: 5,
        title: "Automatización IA",
        desc: "Escalabilidad digital con tecnología neural.",
        // Chip / Neural / Future
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
        span: "tall"
    }
];

const cardVariants: Variants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

// "The Lens Effect"
const imageVariants: Variants = {
    initial: {
        filter: "blur(15px) brightness(0.4) grayscale(1)", // Dark, blurred, monochrome
        scale: 1.1
    },
    hover: {
        filter: "blur(0px) brightness(0.9) grayscale(0)", // Sharp, bright, colorful
        scale: 1.05,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function ServicesBento() {
    return (
        <section className={styles.bentoSection} id="services">
            <div className={styles.header}>
                <h2 className={styles.h2}>Nuestros Servicios</h2>
                <p className={styles.subtitle}>Expertise Global</p>
            </div>

            <div className={styles.grid}>
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        className={`${styles.card} ${styles[service.span]}`}
                        initial="offscreen"
                        whileInView="onscreen"
                        whileHover="hover" // Trigger Lens Effect on Hover
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardVariants}
                    >
                        <div className={styles.imageWrapper}>
                            <motion.div
                                className={styles.bgImage}
                                variants={imageVariants}
                                style={{ width: '100%', height: '100%', position: 'relative' }}
                            >
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: 'cover' }}
                                />
                            </motion.div>
                            <div className={styles.overlay} />
                        </div>

                        <div className={styles.content}>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.desc}</p>
                            <div className={styles.iconArrow}>→</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

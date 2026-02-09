'use client';

import { motion } from 'framer-motion';
import styles from './ServicesBento.module.scss';
import Image from 'next/image';

const services = [
    {
        id: 1,
        title: "Diseño de Espacios & Retail Deportivo",
        desc: "Creamos espacios físicos que activan emociones y conversión.",
        image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2070&auto=format&fit=crop", // Sports retail/Gym
        span: "large"
    },
    {
        id: 2,
        title: "Activaciones & Eventos",
        desc: "Diseñamos activaciones que conectan marcas con personas de forma auténtica.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", // Event crowd
        span: "medium"
    },
    {
        id: 3,
        title: "Branding & Identidad Visual",
        desc: "Construimos marcas claras, sólidas y memorables.",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop", // Creative workspace
        span: "medium"
    },
    {
        id: 4,
        title: "Social Media & Content",
        desc: "Estrategia, creatividad y resultados medibles.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Dashboard/Data
        span: "small"
    },
    {
        id: 5,
        title: "Automatizaciones & IA",
        desc: "Escalar resultados sin perder creatividad humana.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop", // Tech/Chip
        span: "tall"
    }
];

export default function ServicesBento() {
    return (
        <section className={styles.bentoSection} id="services">
            <div className={styles.header}>
                <h2 className="h2">Nuestros Servicios</h2>
                <p className="subtitle">Expertise Global</p>
            </div>

            <div className={styles.grid}>
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        className={`${styles.card} ${styles[service.span]}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className={styles.bgImage}
                            />
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

'use client';

import { motion } from 'framer-motion';
import styles from './ReviewsSection.module.scss';
import Image from 'next/image';

const reviews = [
    {
        id: 1,
        name: "Carlos Mendez",
        role: "Director Marketing, Adidas",
        text: "Be Marketing transformó nuestra data en ventas reales. Increíble visión estratégica y ejecución impecable.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100"
    },
    {
        id: 2,
        name: "Sofia Rodriguez",
        role: "Brand Manager, Puma",
        text: "La velocidad de ejecución y el diseño son de otro planeta. Entendieron nuestro lenguaje visual al instante.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100"
    },
    {
        id: 3,
        name: "Javier Costa",
        role: "Digital Lead, RedBull",
        text: "Lograron captar la esencia de nuestra marca deportiva al 100%. Resultados que superaron todo KPI.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100"
    },
    {
        id: 4,
        name: "Elena Torres",
        role: "CMO, TechStyle",
        text: "Una agencia que no solo promete, sino que entrega calidad premium. El retorno de inversión fue inmediato.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"
    },
    {
        id: 5,
        name: "Miguel Angel",
        role: "CEO, Innovate",
        text: "Su enfoque en data-driven design es lo que necesitábamos para escalar. Partners estratégicos de verdad.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100"
    }
];

// Duplicate list for infinite scroll smoothness
const marqueeReviews = [...reviews, ...reviews, ...reviews];

export default function ReviewsSection() {
    return (
        <section className={styles.reviewsSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Trusted by <span>Leaders</span>
                    </h2>
                </div>

                <div className={styles.marqueeContainer}>
                    <motion.div
                        className={styles.track}
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 40, // Slow continuous flow
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {marqueeReviews.map((review, index) => (
                            <div key={`${review.id}-${index}`} className={styles.reviewCard}>
                                <div className={styles.clientInfo}>
                                    <Image
                                        src={review.avatar}
                                        alt={review.name}
                                        width={50}
                                        height={50}
                                        className={styles.avatar}
                                    />
                                    <div className={styles.meta}>
                                        <span className={styles.clientName}>{review.name}</span>
                                        <span className={styles.clientRole}>{review.role}</span>
                                    </div>
                                </div>

                                <div className={styles.rating}>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>

                                <p className={styles.reviewText}>"{review.text}"</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

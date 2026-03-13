'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.scss'; // We'll create this scss module

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - (isHovered ? 32 : 8)); // adjust offset based on size
            cursorY.set(e.clientY - (isHovered ? 32 : 8));
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver); // Global listener for hover targets

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, isHovered]);

    return (
        <motion.div
            className={styles.cursor}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            animate={{
                width: isHovered ? 64 : 16,
                height: isHovered ? 64 : 16,
                backgroundColor: isHovered ? 'rgba(255, 111, 97, 0.2)' : 'var(--brand-core)',
                mixBlendMode: isHovered ? 'difference' : 'normal',
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    );
}

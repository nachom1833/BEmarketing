import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TextDecoderProps {
    text: string;
    className?: string;
    trigger?: boolean;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export const TextDecoder: React.FC<TextDecoderProps> = ({ text, className = "", trigger = true }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        if (!trigger) {
            setDisplayText('');
            return;
        }

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text, trigger]);

    return (
        <span className={`${className} font-mono`}>
            {displayText}
        </span>
    );
};

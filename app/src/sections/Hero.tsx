/**
 * Hero Section - Creative Left-Aligned Layout
 * 
 * Features:
 * - Left-aligned title with creative typography
 * - WebGL shader background (aerodynamic smoke)
 * - Coral CTA button with magnetic hover effect
 */

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/contexts/BookingContext';
import { ArrowRight, TrendingUp, Target, Zap } from 'lucide-react';

// Magnetic Button Component
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, onClick, className = '' }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { openBooking } = useBooking();

  const titleLines = language === 'es'
    ? ['CONVERTIMOS', 'EXPERIENCIAS', 'DE MARCA EN', 'RESULTADOS']
    : ['WE TURN', 'BRAND', 'EXPERIENCES', 'INTO RESULTS'];

  const subtitle = language === 'es'
    ? 'Marketing deportivo basado en datos'
    : 'Data-driven sports marketing';

  const ctaText = language === 'es' ? 'AGENDAR UNA CALL' : 'SCHEDULE A CALL';

  const stats = [
    { icon: TrendingUp, value: '+340%', label: language === 'es' ? 'Engagement' : 'Engagement' },
    { icon: Target, value: '10+', label: language === 'es' ? 'Marcas' : 'Brands' },
    { icon: Zap, value: '7', label: language === 'es' ? 'Años' : 'Years' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Content Container - Left Aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Title & CTA */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.12, delayChildren: 0.3 }}
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-[2px] bg-be-coral" />
              <span className="font-lato text-sm tracking-[0.2em] text-be-coral uppercase">
                {subtitle}
              </span>
            </motion.div>

            {/* Main Title - Creative Stacked Layout */}
            <div className="mb-8">
              {titleLines.map((line, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      delay: 0.3 + index * 0.1
                    }}
                    className={`font-poppins font-black leading-[0.95] tracking-tight text-white ${index === 0 ? 'text-[3.5rem] md:text-[5rem]' : 'text-[3rem] md:text-[4.5rem]'
                      }`}
                    style={{
                      textShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                      WebkitTextStroke: index === 2 ? '2px rgba(255, 111, 97, 0.3)' : 'none',
                      WebkitTextFillColor: index === 2 ? 'transparent' : 'white'
                    }}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="font-lato text-lg text-be-gray max-w-md mb-8"
            >
              {language === 'es'
                ? 'Transformamos tu marca deportiva con estrategias data-driven que generan resultados medibles y sostenibles.'
                : 'We transform your sports brand with data-driven strategies that generate measurable and sustainable results.'}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <MagneticButton
                onClick={openBooking}
                className="group relative px-8 py-4 bg-be-coral text-white font-poppins font-bold text-lg rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-be-coral to-be-coral-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  {ctaText}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </span>
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  style={{ boxShadow: '0 0 40px rgba(255, 111, 97, 0.6)' }}
                />
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            className="hidden lg:flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-hud rounded-2xl p-6 flex items-center gap-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(255, 111, 97, 0.3)' }}
              >
                <div className="w-14 h-14 rounded-xl bg-be-coral/20 flex items-center justify-center">
                  <stat.icon size={28} className="text-be-coral" />
                </div>
                <div>
                  <span className="font-poppins font-black text-4xl text-white">{stat.value}</span>
                  <p className="font-lato text-sm text-be-gray">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-be-deep-blue to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;

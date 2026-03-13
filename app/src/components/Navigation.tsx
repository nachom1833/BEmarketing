/**
 * Global Navigation
 * 
 * Floating, transparent glass header that becomes slightly more opaque on scroll.
 * Features the BE MARKETING logo with "DO IT SIMPLE" tagline.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/contexts/BookingContext';
import { Menu, X } from 'lucide-react';
import { TextDecoder } from '@/components/ui/TextDecoder';

const Navigation: React.FC = () => {
  const { language } = useLanguage();
  const { openBooking } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: language === 'es' ? 'Inicio' : 'Home', href: '#hero' },
    { label: language === 'es' ? 'Método' : 'Method', href: '#method' },
    { label: language === 'es' ? 'Testimonios' : 'Testimonials', href: '#testimonials' },
    { label: language === 'es' ? 'Contacto' : 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="max-w-7xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between"
          style={{
            backgroundColor: `rgba(31, 41, 55, ${isScrolled ? 0.9 : 0.6})`,
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Logo - BE stacked on top of MARKETING */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="flex items-center"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="font-poppins font-black text-2xl tracking-tight text-white">
                BE
              </span>
              <span className="font-poppins font-bold text-sm tracking-[0.15em] text-white/90">
                MARKETING
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="relative font-lato text-sm text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF6F61] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button
              onClick={openBooking}
              className="px-5 py-2.5 bg-[#FF6F61] text-white text-sm font-poppins font-semibold rounded-full"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(255, 111, 97, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {language === 'es' ? 'Agendar' : 'Book'}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile Menu - Tactical HUD */}
      <motion.div
        className="fixed inset-0 z-30 md:hidden"
        initial={false}
        animate={isMobileMenuOpen ? { opacity: 1, pointerEvents: 'auto' as const } : { opacity: 0, pointerEvents: 'none' as const }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 bg-be-deep-blue/90 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <motion.nav
          className="absolute top-24 left-6 right-6 glass-hud-strong hud-border rounded-2xl p-8 flex flex-col gap-6 overflow-hidden"
          initial={{ y: -20, opacity: 0 }}
          animate={isMobileMenuOpen ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Scanline Effect */}
          <div className="hud-scanline absolute inset-0 pointer-events-none opacity-30" />

          {/* HUD Decor */}
          <div className="absolute top-3 left-3 text-[10px] text-be-coral/60 font-mono tracking-widest">SYS.READY</div>
          <div className="absolute top-3 right-3 text-[10px] text-be-coral/60 font-mono tracking-widest">V.2.0.4</div>
          <div className="absolute bottom-3 right-3 text-[10px] text-be-coral/60 font-mono tracking-widest">
            COORD: {Math.round(window.scrollY)}
          </div>

          <div className="mt-4 flex flex-col gap-2 relative z-10">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="font-poppins text-2xl text-white py-4 border-b border-white/5 flex items-center justify-between group"
                initial={{ x: -20, opacity: 0 }}
                animate={isMobileMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-be-coral/50 group-hover:text-be-coral transition-colors">
                    0{index + 1}
                  </span>
                  <span className="tracking-tight group-hover:text-be-coral transition-colors text-be-white">
                    <TextDecoder text={link.label} trigger={isMobileMenuOpen} />
                  </span>
                </div>
                <motion.span
                  className="opacity-0 group-hover:opacity-100 text-be-coral"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={() => {
              setIsMobileMenuOpen(false);
              openBooking();
            }}
            className="mt-6 w-full py-4 bg-be-coral text-white font-poppins font-bold tracking-widest rounded-sm relative overflow-hidden group"
            initial={{ y: 20, opacity: 0 }}
            animate={isMobileMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">
              {language === 'es' ? 'REQUEST ACCESS' : 'REQUEST ACCESS'}
            </span>
          </motion.button>
        </motion.nav>
      </motion.div>
    </>
  );
};

export default Navigation;

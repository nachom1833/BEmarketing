/**
 * Footer Section
 * 
 * Features:
 * - Infinite marquee with brand message
 * - Social links with coral hover effects
 * - Quick navigation links
 * - Contact information
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Twitter, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];
  
  const quickLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Método BE', href: '#method' },
    { label: 'Testimonios', href: '#testimonials' },
    { label: 'Contacto', href: '#contact' },
  ];
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer id="contact" className="relative bg-[#1F2937] pt-20 pb-8 overflow-hidden">
      {/* Top Marquee */}
      <div className="relative mb-16 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1F2937] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1F2937] to-transparent z-10" />
        
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(4)].map((_, i) => (
            <span 
              key={i} 
              className="font-poppins font-black text-6xl md:text-8xl text-white/5 mx-8"
            >
              BE MARKETING • DO IT SIMPLE •
            </span>
          ))}
        </motion.div>
      </div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="font-poppins font-bold text-2xl text-white mb-1">
                BE MARKETING
              </h3>
              <span className="font-lato text-sm tracking-[0.3em] text-[#FF6F61]">
                {t('footer.tagline')}
              </span>
            </div>
            
            <p className="font-lato text-[#D1D5DB] mb-6 max-w-md">
              Especialistas en marketing deportivo basado en datos. 
              Transformamos experiencias de marca en resultados de negocio medibles.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass-hud flex items-center justify-center text-white/60 hover:text-[#FF6F61] transition-colors"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 15px rgba(255, 111, 97, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-6">
              Navegación
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="font-lato text-[#D1D5DB] hover:text-[#FF6F61] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-6">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#FF6F61] mt-1 flex-shrink-0" />
                <span className="font-lato text-[#D1D5DB]">
                  Madrid, España
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#FF6F61] flex-shrink-0" />
                <a 
                  href="mailto:hola@bemarketing.es" 
                  className="font-lato text-[#D1D5DB] hover:text-[#FF6F61] transition-colors"
                >
                  hola@bemarketing.es
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#FF6F61] flex-shrink-0" />
                <a 
                  href="tel:+34123456789" 
                  className="font-lato text-[#D1D5DB] hover:text-[#FF6F61] transition-colors"
                >
                  +34 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-lato text-sm text-white/40">
              {t('footer.copyright')}
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="font-lato text-sm text-white/40 hover:text-white transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="font-lato text-sm text-white/40 hover:text-white transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6F61]/30 to-transparent" />
    </footer>
  );
};

export default Footer;

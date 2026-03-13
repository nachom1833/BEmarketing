/**
 * Testimonials Section - Infinite Data Stream
 * 
 * Features:
 * - Single row infinite horizontal scrolling marquee
 * - Pauses on hover/touch
 * - Dark Glassmorphism review cards
 * - Coral glowing avatar borders
 * - 5-star ratings
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

// Testimonials data
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    role: 'Director de Marketing',
    company: 'Real Sporting',
    content: 'BE Marketing transformó completamente nuestra presencia digital. Los resultados superaron todas nuestras expectativas.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 2,
    name: 'María González',
    role: 'CEO',
    company: 'FitPro Academy',
    content: 'El equipo de BE entiende perfectamente el mundo del deporte. Su enfoque data-driven nos dio una ventaja competitiva real.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 3,
    name: 'Alejandro Martínez',
    role: 'Fundador',
    company: 'Marathon Events',
    content: 'Increíble trabajo en nuestra última campaña. El engagement aumentó un 340% en solo dos meses.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 4,
    name: 'Laura Sánchez',
    role: 'Directora Comercial',
    company: 'SportsTech Spain',
    content: 'Profesionalismo, creatividad y resultados medibles. BE Marketing es nuestro partner estratégico desde 2022.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 5,
    name: 'Diego Fernández',
    role: 'Manager',
    company: 'Atleta Pro',
    content: 'Gracias a BE, mi marca personal creció exponencialmente. Mejoraron mi posicionamiento y alcance de forma impresionante.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    rating: 5
  },
  {
    id: 6,
    name: 'Ana López',
    role: 'CMO',
    company: 'NutriSport',
    content: 'La combinación de creatividad y análisis de datos es exactamente lo que necesitábamos. Resultados excepcionales.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    rating: 5
  }
];

// Star Rating Component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-[#FF6F61] fill-[#FF6F61]' : 'text-white/20'}
        />
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-[350px] md:w-[400px] glass-hud rounded-2xl p-6 mx-4"
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 30px rgba(255, 111, 97, 0.2), 0 20px 40px -10px rgba(0, 0, 0, 0.5)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Header with avatar and info */}
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar with coral glow */}
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 15px rgba(255, 111, 97, 0.5), 0 0 30px rgba(255, 111, 97, 0.2)'
            }}
          />
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="relative w-14 h-14 rounded-full object-cover border-2 border-[#FF6F61]"
          />
        </div>
        
        {/* Name and role */}
        <div>
          <h4 className="font-poppins font-bold text-white">
            {testimonial.name}
          </h4>
          <p className="font-lato text-sm text-[#D1D5DB]">
            {testimonial.role}
          </p>
          <p className="font-lato text-xs text-[#FF6F61]">
            {testimonial.company}
          </p>
        </div>
      </div>
      
      {/* Star rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>
      
      {/* Review content */}
      <p className="font-lato text-[#D1D5DB] italic leading-relaxed">
        &ldquo;{testimonial.content}&rdquo;
      </p>
    </motion.div>
  );
};

// Marquee Track Component
const MarqueeTrack: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  
  return (
    <div className="flex animate-marquee hover:[animation-play-state:paused]">
      {duplicatedTestimonials.map((testimonial, index) => (
        <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
      ))}
    </div>
  );
};

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  
  const label = language === 'es' ? 'TESTIMONIOS' : 'TESTIMONIALS';
  const title = language === 'es' ? 'Lo que dicen nuestros clientes' : 'What our clients say';
  
  return (
    <section 
      id="testimonials" 
      className="relative py-32 bg-[#1F2937] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937] via-[#2C3E50]/30 to-[#1F2937]" />
      
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block px-4 py-2 bg-[#FF6F61]/10 text-[#FF6F61] text-sm font-poppins font-semibold rounded-full mb-6">
            {label}
          </span>
          <h2 className="font-poppins font-bold text-fluid-section text-white">
            {title}
          </h2>
        </motion.div>
        
        {/* Marquee Container - Single Row */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1F2937] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1F2937] to-transparent z-10 pointer-events-none" />
          
          {/* Single row marquee */}
          <MarqueeTrack testimonials={testimonialsData} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

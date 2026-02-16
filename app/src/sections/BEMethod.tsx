/**
 * BE Method Section - Creative Connected Flow
 * 
 * Features:
 * - 7-step horizontal flow with connected nodes
 * - Animated connecting lines between steps
 * - Cards that slide in from alternating directions
 * - Visual connection between all steps
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface MethodStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

const BEMethod: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Method steps data
  const steps: MethodStep[] = language === 'es' ? [
    {
      number: '01',
      title: 'Brief + Benchmark',
      description: 'Analizamos tu mercado, competencia y oportunidades. Establecemos KPIs claros y definimos el territorio de marca.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
      number: '02',
      title: 'Brand Core',
      description: 'Definimos la esencia de tu marca: propósito, valores, personalidad y arquitectura de marca.',
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80'
    },
    {
      number: '03',
      title: 'Build & Design',
      description: 'Creamos la identidad visual completa: logo, paleta de colores, tipografías y sistema de diseño.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
    },
    {
      number: '04',
      title: 'Bit & Code',
      description: 'Desarrollamos plataformas digitales de alto rendimiento: web, apps y experiencias interactivas.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
    },
    {
      number: '05',
      title: 'Boost & Activate',
      description: 'Lanzamos campañas multicanal optimizadas: paid media, content marketing y activaciones.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    },
    {
      number: '06',
      title: 'Balance & Iterate',
      description: 'Medimos, analizamos y optimizamos continuamente para maximizar el ROI de cada acción.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
      number: '07',
      title: 'Bots con Criterio',
      description: 'Implementamos IA y automatización inteligente para escalar sin perder el toque humano.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    }
  ] : [
    {
      number: '01',
      title: 'Brief + Benchmark',
      description: 'We analyze your market, competition, and opportunities. We establish clear KPIs and define brand territory.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
      number: '02',
      title: 'Brand Core',
      description: 'We define your brand essence: purpose, values, personality, and brand architecture.',
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80'
    },
    {
      number: '03',
      title: 'Build & Design',
      description: 'We create the complete visual identity: logo, color palette, typography, and design system.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
    },
    {
      number: '04',
      title: 'Bit & Code',
      description: 'We develop high-performance digital platforms: web, apps, and interactive experiences.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
    },
    {
      number: '05',
      title: 'Boost & Activate',
      description: 'We launch optimized multichannel campaigns: paid media, content marketing, and activations.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    },
    {
      number: '06',
      title: 'Balance & Iterate',
      description: 'We measure, analyze, and continuously optimize to maximize ROI on every action.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
      number: '07',
      title: 'Smart Bots',
      description: 'We implement AI and intelligent automation to scale without losing the human touch.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    }
  ];
  
  const label = language === 'es' ? 'NUESTRO MÉTODO' : 'OUR METHOD';
  const title = language === 'es' ? 'El Método BE' : 'The BE Method';
  const subtitle = language === 'es' 
    ? '7 pasos para transformar tu marca deportiva' 
    : '7 steps to transform your sports brand';
  
  return (
    <section 
      id="method" 
      ref={containerRef}
      className="relative py-32 bg-[#1F2937] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937] via-[#2C3E50]/20 to-[#1F2937]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 bg-[#FF6F61]/10 text-[#FF6F61] text-sm font-poppins font-semibold rounded-full mb-6">
            {label}
          </span>
          <h2 className="font-poppins font-bold text-fluid-section text-white mb-4">
            {title}
          </h2>
          <p className="font-lato text-lg text-[#D1D5DB] max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>
        
        {/* Connected Steps Flow */}
        <div className="relative">
          {/* Central connecting line - desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
            <div className="absolute inset-0 bg-white/10 rounded-full" />
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#FF6F61] via-[#FF8A7A] to-[#FF6F61] rounded-full origin-top"
              style={{ 
                height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                boxShadow: '0 0 20px rgba(255, 111, 97, 0.5)'
              }}
            />
          </div>
          
          {/* Steps */}
          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${
                    index > 0 ? 'lg:mt-[-4rem]' : ''
                  }`}
                  initial={{ opacity: 0, x: isEven ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {/* Content side */}
                  <div className={`${isEven ? 'lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}>
                    <motion.div
                      className="glass-hud rounded-2xl p-8 relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: 'rgba(255, 111, 97, 0.4)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Step number badge */}
                      <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#FF6F61] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF6F61]/30">
                        <span className="font-poppins font-bold text-white">{step.number}</span>
                      </div>
                      
                      {/* Holographic background */}
                      <div 
                        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                        style={{
                          backgroundImage: `url(${step.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          mixBlendMode: 'overlay'
                        }}
                      />
                      
                      {/* Content */}
                      <div className="relative pt-6">
                        <h3 className="font-poppins font-bold text-2xl text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="font-lato text-[#D1D5DB] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* Connection indicator */}
                      <div className={`hidden lg:flex absolute top-1/2 ${isEven ? '-right-4' : '-left-4'} w-8 h-8 bg-[#1F2937] border-2 border-[#FF6F61] rounded-full items-center justify-center z-10`}>
                        <CheckCircle2 size={14} className="text-[#FF6F61]" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Empty side for alternating layout */}
                  <div className={`hidden lg:block ${isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`} />
                </motion.div>
              );
            })}
          </div>
          
          {/* Final result indicator */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-4 glass-hud rounded-full px-8 py-4">
              <span className="font-poppins font-bold text-white text-lg">
                {language === 'es' ? 'Resultado: Marca de Éxito' : 'Result: Successful Brand'}
              </span>
              <ArrowRight className="text-[#FF6F61]" />
              <span className="font-poppins font-bold text-[#FF6F61] text-lg">
                ROI Medible
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BEMethod;

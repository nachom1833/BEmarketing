/**
 * Services Section
 * 
 * Features:
 * - Grid of service cards with hover effects
 * - Icon-based visual representation
 * - Glassmorphism card design
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import type { LucideIcon } from 'lucide-react';
import { 
  BarChart3, 
  Palette, 
  Code2, 
  Megaphone, 
  Cpu, 
  LineChart 
} from 'lucide-react';

interface Service {
  Icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface ServiceCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ Icon, title, description, color, index }) => {
  return (
    <motion.div
      className="group relative glass-hud rounded-2xl p-8 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      {/* Background glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}, transparent 70%)` }}
      />
      
      {/* Icon */}
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={28} color={color} />
      </div>
      
      {/* Content */}
      <h3 className="font-poppins font-bold text-xl text-white mb-3">
        {title}
      </h3>
      <p className="font-lato text-[#D1D5DB] leading-relaxed">
        {description}
      </p>
      
      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { language } = useLanguage();
  
  const services: Service[] = language === 'es' ? [
    {
      Icon: BarChart3,
      title: 'Estrategia de Marca',
      description: 'Definimos tu posicionamiento, arquitectura de marca y plan estratégico para conquistar el mercado deportivo.',
      color: '#FF6F61'
    },
    {
      Icon: Palette,
      title: 'Diseño & Identidad',
      description: 'Creamos identidades visuales memorables que conectan con tu audiencia y diferencian tu marca.',
      color: '#3B82F6'
    },
    {
      Icon: Code2,
      title: 'Desarrollo Digital',
      description: 'Construimos plataformas digitales de alto rendimiento: webs, apps y experiencias interactivas.',
      color: '#10B981'
    },
    {
      Icon: Megaphone,
      title: 'Marketing Digital',
      description: 'Campañas multicanal optimizadas que maximizan el ROI y generan conversiones reales.',
      color: '#F59E0B'
    },
    {
      Icon: Cpu,
      title: 'Inteligencia Artificial',
      description: 'Implementamos IA y automatización para escalar tu operación sin perder el toque humano.',
      color: '#8B5CF6'
    },
    {
      Icon: LineChart,
      title: 'Analytics & Data',
      description: 'Medición continua y análisis de datos para optimizar cada decisión de marketing.',
      color: '#EC4899'
    }
  ] : [
    {
      Icon: BarChart3,
      title: 'Brand Strategy',
      description: 'We define your positioning, brand architecture and strategic plan to conquer the sports market.',
      color: '#FF6F61'
    },
    {
      Icon: Palette,
      title: 'Design & Identity',
      description: 'We create memorable visual identities that connect with your audience and differentiate your brand.',
      color: '#3B82F6'
    },
    {
      Icon: Code2,
      title: 'Digital Development',
      description: 'We build high-performance digital platforms: websites, apps and interactive experiences.',
      color: '#10B981'
    },
    {
      Icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Optimized multichannel campaigns that maximize ROI and generate real conversions.',
      color: '#F59E0B'
    },
    {
      Icon: Cpu,
      title: 'Artificial Intelligence',
      description: 'We implement AI and automation to scale your operation without losing the human touch.',
      color: '#8B5CF6'
    },
    {
      Icon: LineChart,
      title: 'Analytics & Data',
      description: 'Continuous measurement and data analysis to optimize every marketing decision.',
      color: '#EC4899'
    }
  ];
  
  const label = language === 'es' ? 'NUESTROS SERVICIOS' : 'OUR SERVICES';
  const title = language === 'es' ? '¿Qué hacemos?' : 'What we do?';
  
  return (
    <section id="services" className="relative py-24 bg-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-[#FF6F61]/10 text-[#FF6F61] text-sm font-poppins font-semibold rounded-full mb-4">
            {label}
          </span>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-white">
            {title}
          </h2>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              Icon={service.Icon}
              title={service.title}
              description={service.description}
              color={service.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

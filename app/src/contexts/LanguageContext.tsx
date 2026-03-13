/**
 * Language Context (i18n)
 * 
 * Provides global language state (ES/EN) with Framer Motion
 * layoutId animation for the language switcher indicator.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

// Translation dictionary
const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.method': 'Método',
    'nav.testimonials': 'Testimonios',
    'nav.contact': 'Contacto',
    'nav.book': 'Agendar',
    
    // Hero
    'hero.title.line1': 'CONVERTIMOS',
    'hero.title.line2': 'EXPERIENCIAS DE MARCA',
    'hero.title.line3': 'EN RESULTADOS',
    'hero.title.line4': 'DE NEGOCIO',
    'hero.cta': 'AGENDAR UNA CALL',
    'hero.subtitle': 'Marketing deportivo basado en datos',
    
    // BE Method Section
    'method.label': 'NUESTRO MÉTODO',
    'method.title': 'El Método BE',
    'method.subtitle': '7 pasos para transformar tu marca deportiva',
    
    // Method Steps
    'method.steps': [
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
    ],
    
    // Testimonials
    'testimonials.label': 'TESTIMONIOS',
    'testimonials.title': 'Lo que dicen nuestros clientes',
    
    // Booking Modal
    'booking.title': 'AGENDAR LLAMADA',
    'booking.subtitle': 'Selecciona fecha y hora',
    'booking.selectDate': 'Selecciona una fecha',
    'booking.selectTime': 'Selecciona una hora',
    'booking.name': 'Nombre completo',
    'booking.email': 'Correo electrónico',
    'booking.phone': 'Teléfono (opcional)',
    'booking.message': 'Mensaje (opcional)',
    'booking.submit': 'CONFIRMAR AGENDA',
    'booking.success': '¡Agendado con éxito! Te enviaremos un correo de confirmación.',
    'booking.error': 'Hubo un error. Por favor intenta de nuevo.',
    'booking.connect': 'CONECTAR',
    'booking.months': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    'booking.days': ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    
    // Footer
    'footer.tagline': 'DO IT SIMPLE',
    'footer.copyright': '© 2024 BE Marketing. Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.method': 'Method',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.book': 'Book',
    
    // Hero
    'hero.title.line1': 'WE TURN',
    'hero.title.line2': 'BRAND EXPERIENCES',
    'hero.title.line3': 'INTO BUSINESS',
    'hero.title.line4': 'RESULTS',
    'hero.cta': 'SCHEDULE A CALL',
    'hero.subtitle': 'Data-driven sports marketing',
    
    // BE Method Section
    'method.label': 'OUR METHOD',
    'method.title': 'The BE Method',
    'method.subtitle': '7 steps to transform your sports brand',
    
    // Method Steps
    'method.steps': [
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
    ],
    
    // Testimonials
    'testimonials.label': 'TESTIMONIALS',
    'testimonials.title': 'What our clients say',
    
    // Booking Modal
    'booking.title': 'SCHEDULE CALL',
    'booking.subtitle': 'Select date and time',
    'booking.selectDate': 'Select a date',
    'booking.selectTime': 'Select a time',
    'booking.name': 'Full name',
    'booking.email': 'Email address',
    'booking.phone': 'Phone (optional)',
    'booking.message': 'Message (optional)',
    'booking.submit': 'CONFIRM BOOKING',
    'booking.success': 'Successfully booked! We will send you a confirmation email.',
    'booking.error': 'There was an error. Please try again.',
    'booking.connect': 'CONNECT',
    'booking.months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'booking.days': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    
    // Footer
    'footer.tagline': 'DO IT SIMPLE',
    'footer.copyright': '© 2024 BE Marketing. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback((key: string): string | string[] => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value as string | string[];
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;

/**
 * BE Marketing - Main App Component
 * 
 * High-end, award-winning website for "BE Marketing - DO IT SIMPLE"
 * Focusing on "Sports Performance & Data-Driven Marketing"
 */

import { useEffect } from 'react';
import { Toaster } from 'sonner';

// Contexts
import { LanguageProvider } from '@/contexts/LanguageContext';
import { BookingProvider } from '@/contexts/BookingContext';

// Components
import WebGLBackground from '@/components/WebGLBackground';
import Navigation from '@/components/Navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BookingModal from '@/components/BookingModal';

// Sections
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import BEMethod from '@/sections/BEMethod';
import Testimonials from '@/sections/Testimonials';
import Footer from '@/sections/Footer';

// Styles
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'BE Marketing | DO IT SIMPLE';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Marketing deportivo basado en datos. Convertimos experiencias de marca en resultados de negocio.');
    }
    
    document.documentElement.lang = 'es';
  }, []);

  return (
    <LanguageProvider>
      <BookingProvider>
        <WebGLBackground />
        <Navigation />
        <LanguageSwitcher />
        
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(31, 41, 55, 0.95)',
              color: 'white',
              border: '1px solid rgba(255, 111, 97, 0.3)',
              backdropFilter: 'blur(12px)'
            }
          }}
        />
        
        <main className="relative z-10">
          <Hero />
          <Services />
          <BEMethod />
          <Testimonials />
          <Footer />
        </main>
        
        <BookingModal />
      </BookingProvider>
    </LanguageProvider>
  );
}

export default App;

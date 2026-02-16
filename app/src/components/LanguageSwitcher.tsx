/**
 * Language Switcher - Creative Floating Orb
 * 
 * A creative floating language switcher positioned at bottom-left.
 * Features a glowing orb design with smooth morphing animation.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };
  
  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 glass-hud rounded-2xl group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 30px rgba(255, 111, 97, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Globe icon with glow */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-[#FF6F61] rounded-full blur-md"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <Globe size={18} className="relative text-[#FF6F61]" />
      </div>
      
      {/* Language indicator */}
      <div className="flex items-center gap-2">
        <span className={`font-poppins font-bold text-sm transition-colors ${language === 'es' ? 'text-white' : 'text-white/40'}`}>
          ES
        </span>
        
        {/* Animated toggle bar */}
        <div className="relative w-10 h-5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0.5 w-4 h-4 bg-[#FF6F61] rounded-full"
            animate={{ 
              left: language === 'es' ? '2px' : 'calc(100% - 18px)',
            }}
            transition={{ 
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
            style={{
              boxShadow: '0 0 10px rgba(255, 111, 97, 0.8)'
            }}
          />
        </div>
        
        <span className={`font-poppins font-bold text-sm transition-colors ${language === 'en' ? 'text-white' : 'text-white/40'}`}>
          EN
        </span>
      </div>
    </motion.button>
  );
};

export default LanguageSwitcher;

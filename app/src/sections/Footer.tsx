import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Twitter, Linkedin, Youtube, MapPin, Clock, Shield, ArrowUpRight } from 'lucide-react';

interface ParallaxTextProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${Math.round(v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden flex flex-nowrap whitespace-nowrap">
      <motion.div className="flex flex-nowrap whitespace-nowrap font-poppins font-black text-8xl md:text-[10rem] text-be-white/5 uppercase leading-none" style={{ x }}>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
      </motion.div>
    </div>
  );
}

const LiveClock = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().split('T')[1].split('.')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono text-sm tracking-widest text-be-coral">{time}</span>;
};

const Footer: React.FC = () => {
  const { language } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'IG_GRID' },
    { icon: Twitter, href: '#', label: 'X_FEED' },
    { icon: Linkedin, href: '#', label: 'LN_PRO' },
    { icon: Youtube, href: '#', label: 'YT_STREAM' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative bg-be-deep-blue pt-32 pb-12 overflow-hidden">
      {/* Velocity Marquee */}
      <div className="absolute top-0 left-0 right-0 opacity-20 pointer-events-none select-none mix-blend-overlay">
        <ParallaxText baseVelocity={5}>PERFORMANCE MARKETING • DATA DRIVEN •</ParallaxText>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Mission Control Grid */}
        <div className="grid md:grid-cols-12 gap-6 mb-24">

          {/* Col 1: Brand & Identity (Span 4) */}
          <div className="md:col-span-4 flex flex-col justify-between glass-hud p-8 rounded-2xl border border-white/5 h-full">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-be-coral rounded-full animate-pulse" />
                <span className="font-mono text-xs text-be-coral tracking-widest">SYSTEM ONLINE</span>
              </div>
              <h3 className="font-poppins font-black text-4xl text-white mb-2 leading-none">
                BE<br />MARKETING
              </h3>
              <p className="font-lato text-be-gray/60 max-w-sm mt-4 text-sm leading-relaxed">
                Transforming chaos into calculated performance. We engineer brand experiences using precision data.
              </p>
            </div>

            <div className="mt-12 flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-be-coral hover:border-be-coral transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Protocol (Span 3) */}
          <div className="md:col-span-3 glass-hud p-8 rounded-2xl border border-white/5 flex flex-col">
            <h4 className="font-mono text-xs text-white/40 mb-8 flex items-center gap-2">
              <ArrowUpRight size={12} />
              NAVIGATION_PROTOCOL
            </h4>
            <ul className="space-y-2 flex-grow">
              {[
                { label: '01 // HOME', href: '#hero' },
                { label: '02 // METHOD', href: '#method' },
                { label: '03 // INTEL', href: '#testimonials' },
                { label: '04 // UPLINK', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="block font-poppins font-bold text-xl text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                  >
                    <span className="text-sm font-mono text-be-coral/60 mr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      [GO]
                    </span>
                    {link.label.split(' // ')[1]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Intel & Legal (Span 2) */}
          <div className="md:col-span-2 glass-hud p-8 rounded-2xl border border-white/5 flex flex-col">
            <h4 className="font-mono text-xs text-white/40 mb-8 flex items-center gap-2">
              <Shield size={12} />
              LEGAL_CORE
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="font-lato text-sm text-be-gray/60 hover:text-be-coral transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-lato text-sm text-be-gray/60 hover:text-be-coral transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="font-lato text-sm text-be-gray/60 hover:text-be-coral transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Status Widget (Span 3) */}
          <div className="md:col-span-3 flex flex-col gap-6">
            {/* Clock Widget */}
            <div className="glass-hud p-6 rounded-2xl border border-white/5 flex-grow flex flex-col justify-center items-center relative overflow-hidden">
              <div className="hud-scanline absolute inset-0 opacity-20" />
              <Clock size={32} className="text-white/20 mb-4" />
              <LiveClock />
              <span className="font-mono text-[10px] text-white/30 mt-2">GLOBAL SYNC TIME</span>
            </div>

            {/* Location Widget */}
            <div className="glass-hud p-6 rounded-2xl border border-white/5 flex-grow flex flex-col justify-center items-center relative overflow-hidden">
              <div className="hud-scanline absolute inset-0 opacity-20" />
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-be-coral" />
                <span className="font-poppins font-bold text-white">MADRID_HQ</span>
              </div>
              <span className="font-mono text-xs text-white/40">40.4168° N, 3.7038° W</span>
            </div>
          </div>

        </div>

        {/* Status Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-white/30">
          <div className="flex gap-4">
            <span>STATUS: ALL SENSORS ACTIVE</span>
            <span>Latency: 12ms</span>
          </div>
          <div>
            © {new Date().getFullYear()} BE MARKETING GROUP. ALL SYSTEMS SECURED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

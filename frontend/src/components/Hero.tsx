'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import ParticlesAnimation from './ParticlesAnimation';
import useTranslation from '../hooks/useTranslation';

const Hero = () => {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { t, isRTL } = useTranslation();

  const slogans = [
    t('hero.subtitle'),
    t('solutions.title'),
    "From University to Code... From Ideas to Impact",
    "Invest in Talent, Invest in the Future"
  ];

  const stats = [
    { number: '2000+', label: t('hero.stats.students') },
    { number: '50+', label: t('hero.stats.projects') },
    { number: '20+', label: t('hero.stats.companies') },
    { number: '95%', label: 'Success Rate' }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Change slogan every 3.5 seconds
    const interval = setInterval(() => {
      setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slogans.length]);

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4d1f53] via-[#6B2D73] to-[#9347a0] ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Particles Animation */}
      <ParticlesAnimation />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6B2D73]/20 to-[#6B2D73]/40 z-10" />
      
      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
        {/* Brand/Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-block p-4 sm:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 leading-tight">
              {t('hero.title')}
            </h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] mx-auto rounded-full" />
          </div>
        </motion.div>

        {/* Dynamic Slogan */}
        <motion.div
          key={currentSloganIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight px-4">
            {slogans[currentSloganIndex]}
          </h2>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4"
        >
          <Link href="/join">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto"
            >
              <span>{t('hero.cta1')}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </motion.button>
          </Link>
          
          <Link href="/consultation">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto"
            >
              <span>{t('hero.cta2')}</span>
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-purple-200 text-xs sm:text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

const trustBadges = [
  { name: 'Microsoft', logo: '🪟' },
  { name: 'Google', logo: '🔍' },
  { name: 'AWS', logo: '☁️' },
  { name: 'IBM', logo: '💙' },
  { name: 'Oracle', logo: '🔴' },
  { name: 'Salesforce', logo: '💙' }
];

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('subtitle')}
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide">
            {t('trustedBy')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.name}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">{badge.logo}</span>
                <span className="font-semibold text-gray-700">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('bookCall')}
          </motion.button>
          
          <motion.button
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('viewPortfolio')}
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">100+</div>
            <div className="text-gray-600">{t('projectsCompleted')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">50+</div>
            <div className="text-gray-600">{t('happyClients')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">24/7</div>
            <div className="text-gray-600">{t('support')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">99%</div>
            <div className="text-gray-600">{t('satisfaction')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

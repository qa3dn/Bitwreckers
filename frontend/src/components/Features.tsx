'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, GraduationCap, Rocket, Lightbulb, Users } from 'lucide-react';
import useTranslation from '../hooks/useTranslation';

const Features = () => {
  const { t, isRTL } = useTranslation();
  
  const features = [
    {
      icon: Code2,
      title: t('features.innovation.title'),
      description: t('features.innovation.description'),
      color: 'from-[#9347a0] to-[#b376bf]'
    },
    {
      icon: GraduationCap,
      title: t('features.education.title'),
      description: t('features.education.description'),
      color: 'from-[#6B2D73] to-[#9347a0]'
    },
    {
      icon: Rocket,
      title: t('features.technology.title'),
      description: t('features.technology.description'),
      color: 'from-[#b376bf] to-[#d4aad9]'
    },
    {
      icon: Lightbulb,
      title: t('features.community.title'),
      description: t('features.community.description'),
      color: 'from-[#7b3985] to-[#9347a0]'
    },
    {
      icon: Users,
      title: t('features.growth.title'),
      description: t('features.growth.description'),
      color: 'from-[#5c2663] to-[#7b3985]'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className={`relative py-32 overflow-hidden bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-[#6B2D73]/10 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-[#2D7363]/10 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#9347a0]/10 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-gradient-to-r from-[#6B2D73]/20 to-[#2D7363]/20 border border-[#6B2D73]/30 rounded-full text-[#d4aad9] font-semibold text-sm backdrop-blur-sm">
              {t('features.subtitle')}
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('features.title')}
          </motion.h2>

          {/* Decorative Line */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-[#6B2D73] via-[#9347a0] to-[#2D7363] mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mb-20"
        >
          {/* First Row - 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Card Background Glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                />

                {/* Main Card */}
                <div className="relative bg-[#131422]/50 backdrop-blur-xl rounded-3xl border border-[#6B2D73]/20 hover:border-[#6B2D73]/50 transition-all duration-500 p-8 overflow-hidden h-full">
                  {/* Top Gradient Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`} />
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(107, 45, 115, 0.4) 0%, transparent 50%),
                                        radial-gradient(circle at 80% 50%, rgba(45, 115, 99, 0.4) 0%, transparent 50%)`
                    }} />
                  </div>

                  {/* Icon Container */}
                  <motion.div 
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden`}>
                      {/* Icon Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-50 blur-xl`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <feature.icon className="w-10 h-10 text-white relative z-10" strokeWidth={2.5} />
                    </div>

                    {/* Floating Particles */}
                    <motion.div
                      className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${feature.color} rounded-full opacity-60`}
                      animate={{
                        y: [-5, 5, -5],
                        x: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[#F8F8F8]/80 leading-relaxed group-hover:text-[#F8F8F8] transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Bottom Accent Line */}
                    <motion.div
                      className={`mt-6 h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>

                  {/* Corner Decorations */}
                  <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className={`absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr ${feature.color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second Row - 2 items centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.slice(3, 5).map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Card Background Glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                />

                {/* Main Card */}
                <div className="relative bg-[#131422]/50 backdrop-blur-xl rounded-3xl border border-[#6B2D73]/20 hover:border-[#6B2D73]/50 transition-all duration-500 p-8 overflow-hidden h-full">
                  {/* Top Gradient Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`} />
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(107, 45, 115, 0.4) 0%, transparent 50%),
                                        radial-gradient(circle at 80% 50%, rgba(45, 115, 99, 0.4) 0%, transparent 50%)`
                    }} />
                  </div>

                  {/* Icon Container */}
                  <motion.div 
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden`}>
                      {/* Icon Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-50 blur-xl`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <feature.icon className="w-10 h-10 text-white relative z-10" strokeWidth={2.5} />
                    </div>

                    {/* Floating Particles */}
                    <motion.div
                      className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${feature.color} rounded-full opacity-60`}
                      animate={{
                        y: [-5, 5, -5],
                        x: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[#F8F8F8]/80 leading-relaxed group-hover:text-[#F8F8F8] transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Bottom Accent Line */}
                    <motion.div
                      className={`mt-6 h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 0.8, delay: (index + 3) * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>

                  {/* Corner Decorations */}
                  <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className={`absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr ${feature.color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          {/* Background Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#6B2D73]/20 to-[#2D7363]/20 rounded-3xl blur-3xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative bg-gradient-to-r from-[#6B2D73]/90 via-[#9347a0]/90 to-[#2D7363]/90 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-[#6B2D73]/30 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)`
              }} />
            </div>

            {/* Floating Orbs */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl"
              animate={{
                y: [10, -10, 10],
                x: [5, -5, 5],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative z-10">
              <motion.h3 
                className="text-4xl md:text-5xl font-black text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t('common.getStarted')}
              </motion.h3>
              <motion.p 
                className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t('common.joinUs')}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link href="/join">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-10 py-5 bg-white text-[#6B2D73] font-bold rounded-full text-lg shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10">{t('hero.cta1')}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#F8F8F8] to-white"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  </motion.button>
                </Link>
                
                <Link href="/consultation">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-10 py-5 border-2 border-white text-white font-bold rounded-full text-lg overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-[#6B2D73] transition-colors duration-300">{t('hero.cta2')}</span>
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

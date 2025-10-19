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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-[#9347a0] via-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent leading-tight px-4"
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

        {/* Enhanced Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-8xl mx-auto mb-20"
        >
          {/* Perfect Layout for 5 Services */}
          <div className="space-y-6 sm:space-y-8">
            {/* First Row - 3 Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -15,
                    scale: 1.02,
                    transition: { duration: 0.4 }
                  }}
                  className="group relative"
                >
                  {/* Enhanced Background Glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                  />

                  {/* Main Card */}
                  <div className="relative bg-white/8 backdrop-blur-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/15 hover:border-white/30 transition-all duration-700 p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden h-full group-hover:bg-white/12">
                    {/* Top Gradient Line */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.color} rounded-t-3xl`} />
                    
                    {/* Enhanced Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147, 71, 160, 0.6) 0%, transparent 60%),
                                          radial-gradient(circle at 75% 75%, rgba(179, 118, 191, 0.6) 0%, transparent 60%)`
                      }} />
                    </div>

                    {/* Enhanced Icon Container */}
                    <motion.div 
                      className="relative mb-4 sm:mb-6 lg:mb-8"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:shadow-[#9347a0]/40 transition-all duration-500`}>
                        {/* Enhanced Icon Glow Effect */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-60 blur-2xl`}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white relative z-10" strokeWidth={2} />
                      </div>

                      {/* Enhanced Floating Particles */}
                      <motion.div
                        className={`absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full opacity-70`}
                        animate={{
                          y: [-8, 8, -8],
                          x: [-4, 4, -4],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <motion.div
                        className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${feature.color} rounded-full opacity-50`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Enhanced Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 transition-all duration-300 group-hover:text-[#d4aad9] leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed group-hover:text-white transition-colors duration-300" style={{ color: '#d9d8d6' }}>
                        {feature.description}
                      </p>

                      {/* Enhanced Bottom Accent Line */}
                      <motion.div
                        className={`mt-8 h-1.5 bg-gradient-to-r ${feature.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>

                    {/* Enhanced Corner Decorations */}
                    <div className={`absolute top-6 right-6 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-15 rounded-full blur-3xl group-hover:opacity-25 transition-opacity duration-700`} />
                    <div className={`absolute bottom-6 left-6 w-20 h-20 bg-gradient-to-tr ${feature.color} opacity-15 rounded-full blur-2xl group-hover:opacity-25 transition-opacity duration-700`} />
                    
                    {/* Additional Decorative Elements */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full opacity-60" />
                    <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white/40 rounded-full opacity-60" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second Row - 2 Services Centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
              {features.slice(3, 5).map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -15,
                    scale: 1.02,
                    transition: { duration: 0.4 }
                  }}
                  className="group relative"
                >
                  {/* Enhanced Background Glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                  />

                  {/* Main Card */}
                  <div className="relative bg-white/8 backdrop-blur-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/15 hover:border-white/30 transition-all duration-700 p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden h-full group-hover:bg-white/12">
                    {/* Top Gradient Line */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.color} rounded-t-3xl`} />
                    
                    {/* Enhanced Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147, 71, 160, 0.6) 0%, transparent 60%),
                                          radial-gradient(circle at 75% 75%, rgba(179, 118, 191, 0.6) 0%, transparent 60%)`
                      }} />
                    </div>

                    {/* Enhanced Icon Container */}
                    <motion.div 
                      className="relative mb-4 sm:mb-6 lg:mb-8"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:shadow-[#9347a0]/40 transition-all duration-500`}>
                        {/* Enhanced Icon Glow Effect */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-60 blur-2xl`}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white relative z-10" strokeWidth={2} />
                      </div>

                      {/* Enhanced Floating Particles */}
                      <motion.div
                        className={`absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full opacity-70`}
                        animate={{
                          y: [-8, 8, -8],
                          x: [-4, 4, -4],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <motion.div
                        className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${feature.color} rounded-full opacity-50`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Enhanced Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 transition-all duration-300 group-hover:text-[#d4aad9] leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed group-hover:text-white transition-colors duration-300" style={{ color: '#d9d8d6' }}>
                        {feature.description}
                      </p>

                      {/* Enhanced Bottom Accent Line */}
                      <motion.div
                        className={`mt-8 h-1.5 bg-gradient-to-r ${feature.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: (index + 3) * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>

                    {/* Enhanced Corner Decorations */}
                    <div className={`absolute top-6 right-6 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-15 rounded-full blur-3xl group-hover:opacity-25 transition-opacity duration-700`} />
                    <div className={`absolute bottom-6 left-6 w-20 h-20 bg-gradient-to-tr ${feature.color} opacity-15 rounded-full blur-2xl group-hover:opacity-25 transition-opacity duration-700`} />
                    
                    {/* Additional Decorative Elements */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full opacity-60" />
                    <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white/40 rounded-full opacity-60" />
                  </div>
                </motion.div>
              ))}
            </div>
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

          <div className="relative bg-gradient-to-r from-[#6B2D73]/90 via-[#9347a0]/90 to-[#2D7363]/90 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 border border-[#6B2D73]/30 overflow-hidden">
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
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t('common.getStarted')}
              </motion.h3>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t('common.joinUs')}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link href="/join">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-white text-[#6B2D73] font-bold rounded-full text-base sm:text-lg shadow-2xl overflow-hidden"
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
                
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 border-2 border-white text-white font-bold rounded-full text-base sm:text-lg overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-[#6B2D73] transition-colors duration-300">Learn More</span>
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

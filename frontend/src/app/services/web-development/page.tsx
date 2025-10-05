'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import useTranslation from '../../../hooks/useTranslation';
import { Code, Globe, Database, Server, Shield, Zap, Users, Rocket, CheckCircle, ArrowRight } from 'lucide-react';

export default function WebDevelopmentPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const { t, isRTL } = useTranslation();

  const technologies = [
    { name: 'React', icon: <Code className="w-6 h-6" />, description: 'Modern UI Library' },
    { name: 'Next.js', icon: <Globe className="w-6 h-6" />, description: 'Full-Stack Framework' },
    { name: 'Node.js', icon: <Server className="w-6 h-6" />, description: 'Backend Runtime' },
    { name: 'PostgreSQL', icon: <Database className="w-6 h-6" />, description: 'Reliable Database' },
    { name: 'TypeScript', icon: <Shield className="w-6 h-6" />, description: 'Type Safety' },
    { name: 'Tailwind CSS', icon: <Zap className="w-6 h-6" />, description: 'Utility-First CSS' }
  ];

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('services.web.responsiveTitle'),
      description: t('services.web.responsiveDescription')
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('services.web.performanceTitle'),
      description: t('services.web.performanceDescription')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('services.web.securityTitle'),
      description: t('services.web.securityDescription')
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t('services.web.scalabilityTitle'),
      description: t('services.web.scalabilityDescription')
    }
  ];

  const teamMembers = [
    { name: 'Ahmad Al Hamad', role: 'Back-end Developer', specialization: 'Server Architecture' },
    { name: 'Mohammad Freihat', role: 'Full Stack Developer', specialization: 'API Development' },
    { name: 'Ahmad Jarad', role: 'Full Stack Developer', specialization: 'Database Design' },
    { name: 'Maen Ababneh', role: 'Full Stack Developer', specialization: 'System Integration' },
    { name: 'Lina Khdeir', role: 'Full Stack Developer', specialization: 'Performance Optimization' }
  ];

  const processSteps = [
    {
      number: '01',
      title: t('services.web.analysisTitle'),
      description: t('services.web.analysisDescription'),
      icon: <Users className="w-6 h-6" />
    },
    {
      number: '02',
      title: t('services.web.designTitle'),
      description: t('services.web.designDescription'),
      icon: <Code className="w-6 h-6" />
    },
    {
      number: '03',
      title: t('services.web.developmentTitle'),
      description: t('services.web.developmentDescription'),
      icon: <Globe className="w-6 h-6" />
    },
    {
      number: '04',
      title: t('services.web.testingTitle'),
      description: t('services.web.testingDescription'),
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] text-white overflow-hidden ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B2D73] via-[#9347a0] to-[#2D7363] z-50"
        style={{ width: progressWidth }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6B2D73]/20 via-[#9347a0]/20 to-[#2D7363]/20" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#b376bf]/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <motion.div
                className="w-24 h-24 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Code className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent">
              {t('services.web.title')}
            </h1>
            <p className="text-xl md:text-2xl text-[#F8F8F8] mb-12 max-w-4xl mx-auto">
              {t('services.web.subtitle')}
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-full font-bold text-lg shadow-lg hover:shadow-[#2D7363]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/consultation', '_blank')}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-5 h-5" />
                  {t('services.web.startProject')}
                </span>
              </motion.button>
              
              <motion.button
                className="group relative px-8 py-4 bg-transparent border-2 border-[#6B2D73] text-[#b376bf] rounded-full font-bold text-lg hover:bg-[#6B2D73] hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/join', '_blank')}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  {t('services.web.joinTeam')}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('services.web.technologiesTitle')}
            </h2>
            <p className="text-xl text-[#F8F8F8]/80 max-w-3xl mx-auto">
              {t('services.web.technologiesSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/30 p-6 text-center hover:border-[#2D7363]/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#2D7363]/25 transition-all duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-[#F8F8F8]/60">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#6B2D73]/10 to-[#2D7363]/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('services.web.featuresTitle')}
            </h2>
            <p className="text-xl text-[#F8F8F8]/80 max-w-3xl mx-auto">
              {t('services.web.featuresSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/30 p-8 hover:border-[#2D7363]/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-full flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-[#2D7363]/25 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-[#F8F8F8]/80 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('services.web.teamTitle')}
            </h2>
            <p className="text-xl text-[#F8F8F8]/80 max-w-3xl mx-auto">
              {t('services.web.teamSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="group bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/30 p-6 text-center hover:border-[#2D7363]/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#2D7363]/25 transition-all duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                <p className="text-[#b376bf] font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-[#F8F8F8]/60">{member.specialization}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#6B2D73]/10 to-[#2D7363]/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('services.web.processTitle')}
            </h2>
            <p className="text-xl text-[#F8F8F8]/80 max-w-3xl mx-auto">
              {t('services.web.processSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/30 p-6 text-center hover:border-[#2D7363]/50 transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#2D7363]/25 transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-[#b376bf] mb-2">{step.number}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-[#F8F8F8]/80 text-sm leading-relaxed">{step.description}</p>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-[#6B2D73]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            className="bg-gradient-to-r from-[#6B2D73]/20 to-[#2D7363]/20 backdrop-blur-xl rounded-3xl border border-[#6B2D73]/30 p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('services.web.ctaTitle')}
            </h3>
            <p className="text-xl text-[#F8F8F8] mb-8">
              {t('services.web.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#2D7363]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/consultation', '_blank')}
              >
                {t('services.web.startProject')}
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-[#6B2D73] text-[#b376bf] rounded-xl font-bold text-lg hover:bg-[#6B2D73] hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/join', '_blank')}
              >
                {t('services.web.joinTeam')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

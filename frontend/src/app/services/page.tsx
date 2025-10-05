'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import useTranslation from '../../hooks/useTranslation';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Cloud, 
  Palette, 
  Lightbulb,
  Search,
  Edit3,
  Settings,
  Rocket,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  Target,
  Zap,
  Sparkles,
  Wrench
} from 'lucide-react';

export default function ServicesPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const { t, isRTL } = useTranslation();

  const services = [
    {
      id: 'web-development',
      title: t('services.webDevelopment.title'),
      description: t('services.webDevelopment.description'),
      icon: <Globe className="w-8 h-8" />,
      color: 'from-[#2D7363] to-[#5fa896]',
      glowColor: '#2D7363',
      href: '/services/web-development'
    },
    {
      id: 'mobile-apps',
      title: t('services.mobileApps.title'),
      description: t('services.mobileApps.description'),
      icon: <Smartphone className="w-8 h-8" />,
      color: 'from-[#2D7363] to-[#5fa896]',
      glowColor: '#2D7363',
      href: '/services/mobile-development'
    },
    {
      id: 'ai-automation',
      title: t('services.aiAutomation.title'),
      description: t('services.aiAutomation.description'),
      icon: <Bot className="w-8 h-8" />,
      color: 'from-[#2D7363] to-[#5fa896]',
      glowColor: '#2D7363',
      href: '/consultation'
    },
    {
      id: 'cloud-devops',
      title: t('services.cloudDevops.title'),
      description: t('services.cloudDevops.description'),
      icon: <Cloud className="w-8 h-8" />,
      color: 'from-[#2D7363] to-[#5fa896]',
      glowColor: '#2D7363',
      href: '/consultation'
    },
    {
      id: 'ui-ux-design',
      title: t('services.uiUxDesign.title'),
      description: t('services.uiUxDesign.description'),
      icon: <Palette className="w-8 h-8" />,
      color: 'from-[#2D7363] to-[#5fa896]',
      glowColor: '#2D7363',
      href: '/services/ui-ux-design'
    },
    {
      id: 'consulting',
      title: t('services.techConsulting.title'),
      description: t('services.techConsulting.description'),
      icon: <Lightbulb className="w-8 h-8" />,
      color: 'from-[#2D7363] to-[#5fa896]',
      glowColor: '#2D7363',
      href: '/consultation'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: t('services.howWeWork.research.title'),
      description: t('services.howWeWork.research.description'),
      icon: <Search className="w-6 h-6" />
    },
    {
      step: '02',
      title: t('services.howWeWork.design.title'),
      description: t('services.howWeWork.design.description'),
      icon: <Edit3 className="w-6 h-6" />
    },
    {
      step: '03',
      title: t('services.howWeWork.development.title'),
      description: t('services.howWeWork.development.description'),
      icon: <Settings className="w-6 h-6" />
    },
    {
      step: '04',
      title: t('services.howWeWork.launch.title'),
      description: t('services.howWeWork.launch.description'),
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] text-white overflow-hidden ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B2D73] via-[#9347a0] to-[#2D7363] z-50"
        style={{ width: progressWidth }}
      />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background with Multiple Layers */}
        <div className="absolute inset-0">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1b] via-[#1a1a2e] to-[#131422]" />
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(107, 45, 115, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(45, 115, 99, 0.1) 0%, transparent 50%)`
            }} />
          </div>
          
          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 border border-[#6B2D73]/20 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 border border-[#2D7363]/20 rounded-full"
            animate={{
              rotate: -360,
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Animated Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#b376bf] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          {/* Interactive Title with 3D Effect */}
          <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Title Shadow */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black text-black/20 absolute inset-0"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            >
              {t('services.title')}
            </motion.h1>
            
            {/* Main Title */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent relative flex items-center justify-center gap-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <Wrench className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
              {t('services.title')}
            </motion.h1>
            
            {/* Glowing Underline */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#6B2D73] to-[#2D7363] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </motion.div>
          
          {/* Enhanced Subtitle with Typing Effect */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-[#F8F8F8] max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
{t('services.subtitle')}
            </motion.p>
          </motion.div>
          
          {/* Interactive Service Categories */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {[
              { icon: <Globe className="w-8 h-8" />, label: t('services.categories.webApps'), color: "from-[#2D7363] to-[#5fa896]" },
              { icon: <Smartphone className="w-8 h-8" />, label: t('services.categories.mobile'), color: "from-[#2D7363] to-[#5fa896]" },
              { icon: <Bot className="w-8 h-8" />, label: t('services.categories.aiMl'), color: "from-[#2D7363] to-[#5fa896]" },
              { icon: <Cloud className="w-8 h-8" />, label: t('services.categories.cloud'), color: "from-[#2D7363] to-[#5fa896]" }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group relative p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-[#6B2D73]/50 transition-all duration-500 cursor-pointer flex flex-col items-center text-center"
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(107, 45, 115, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                {/* Service Icon */}
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300 text-white">
                  {service.icon}
                </div>
                
                {/* Service Label */}
                <div className="text-sm font-semibold text-white transition-colors duration-300">
                  {service.label}
                </div>
                
                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.color})`,
                    filter: "blur(20px)"
                  }}
                />
                
                {/* Floating Particles on Hover */}
                {[...Array(3)].map((_, particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    className="absolute w-1 h-1 bg-[#b376bf] rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      top: `${20 + particleIndex * 30}%`,
                      left: `${20 + particleIndex * 30}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: particleIndex * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Interactive Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            onClick={() => {
              const nextSection = document.querySelector('#services-grid');
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <motion.div
              className="text-[#F8F8F8]/80 text-sm mb-2 flex items-center gap-2 hover:text-white transition-colors duration-300"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-4 h-4" />
              {t('services.scrollToExplore')}
            </motion.div>
            <motion.div
              className="w-6 h-10 border-2 border-[#F8F8F8]/80 rounded-full flex justify-center hover:border-white transition-colors duration-300"
              animate={{ borderColor: ["#F8F8F8", "#6B2D73", "#F8F8F8"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-[#F8F8F8]/80 rounded-full mt-2"
                animate={{ 
                  y: [0, 12, 0],
                  backgroundColor: ["#F8F8F8", "#6B2D73", "#F8F8F8"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Action Button */}
        <motion.button
          className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-full shadow-2xl hover:shadow-[#6B2D73]/25 transition-all duration-300 group flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          onClick={() => window.open('/consultation', '_blank')}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          
          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6B2D73] to-[#9347a0] opacity-75"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.75, 0, 0.75],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </section>

      {/* Services Grid Section */}
      <section id="services-grid" className="py-20 px-4 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent flex items-center justify-center gap-3 sm:gap-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            {t('services.whatWeOffer')}
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredService(service.id)}
                onHoverEnd={() => setHoveredService(null)}
              >
                {/* Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.glowColor}20, transparent)`
                  }}
                />
                
                {/* Service Icon */}
                <motion.div
                  className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 flex items-center justify-center`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="text-white">
                    {service.icon}
                  </div>
                </motion.div>
                
                {/* Service Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#b376bf] transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-[#F8F8F8]/80 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Service Link - Click anywhere on card to navigate */}
                {service.href && (
                  <Link href={service.href} className="absolute inset-0 z-10">
                    <span className="sr-only">View {service.title} details</span>
                  </Link>
                )}
                
                {/* Hover Glow Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `0 0 30px ${service.glowColor}40`,
                    border: `2px solid ${service.glowColor}`
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-[#2D7363] to-[#5fa896] bg-clip-text text-transparent flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Zap className="w-10 h-10" />
            {t('services.howWeWork.title')}
          </motion.h2>
          
          <div className="relative max-w-7xl mx-auto">
            {/* Process Steps - No Timeline */}
            <div className="space-y-32">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -150 : 150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                    viewport={{ once: true }}
                  >
                    {/* Step Circle with Enhanced Design */}
                    <motion.div 
                      className={`relative z-20 flex-shrink-0 w-32 h-32 ${
                        index % 2 === 0 ? 'mr-16' : 'ml-16'
                      }`}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                    >
                      {/* Outer Glow Ring */}
                      <motion.div
                        className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#6B2D73] via-[#9347a0] to-[#2D7363] rounded-full blur-xl opacity-50"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Main Circle */}
                      <div className="relative w-full h-full bg-gradient-to-br from-[#6B2D73] via-[#9347a0] to-[#2D7363] rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                        {/* Inner Circle */}
                        <div className="w-24 h-24 bg-[#131422] rounded-full flex items-center justify-center border-3 border-white/30 shadow-inner">
                          <div className="text-white">
                            {step.icon}
                          </div>
                        </div>
                        
                        {/* Step Number Badge */}
                        <motion.div
                          className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-full flex items-center justify-center text-lg font-black text-white shadow-2xl border-3 border-white/30"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.3 + 0.5, type: "spring", bounce: 0.6 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                        >
                          {step.step}
                        </motion.div>
                        
                        {/* Floating Particles */}
                        {[...Array(3)].map((_, particleIndex) => (
                          <motion.div
                            key={particleIndex}
                            className="absolute w-2 h-2 bg-[#b376bf] rounded-full"
                            style={{
                              top: `${20 + particleIndex * 20}%`,
                              left: `${20 + particleIndex * 20}%`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              delay: particleIndex * 0.3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Step Content Card */}
                    <motion.div 
                      className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative bg-[#131422]/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/50 shadow-2xl hover:shadow-[#6B2D73]/20 transition-all duration-500 group overflow-hidden">
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#6B2D73]/20 via-[#9347a0]/20 to-[#2D7363]/20 rounded-3xl" />
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6B2D73]/10 to-transparent rounded-full blur-3xl" />
                          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-[#2D7363]/10 to-transparent rounded-full blur-3xl" />
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <motion.h3 
                            className="text-4xl font-bold text-white mb-6 group-hover:bg-gradient-to-r group-hover:from-[#b376bf] group-hover:to-[#2D7363] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
                            whileHover={{ x: index % 2 === 0 ? -15 : 15 }}
                          >
                            {step.title}
                          </motion.h3>
                          <p className="text-[#F8F8F8]/80 leading-relaxed text-xl group-hover:text-[#F8F8F8] transition-colors duration-500">
                            {step.description}
                          </p>
                        </div>
                        
                        {/* Enhanced Hover Effects */}
                        <motion.div
                          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(135deg, rgba(107, 45, 115, 0.1), rgba(45, 115, 99, 0.1))`,
                            boxShadow: `0 0 60px rgba(107, 45, 115, 0.4), 0 0 120px rgba(45, 115, 99, 0.3)`
                          }}
                        />
                        
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#6B2D73] rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#2D7363] rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated Background Elements */}
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-[#6B2D73]/10 rounded-full mix-blend-screen filter blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 bg-[#2D7363]/10 rounded-full mix-blend-screen filter blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -80, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Main Content Container */}
          <motion.div
            className="relative bg-[#131422]/80 backdrop-blur-xl rounded-3xl border border-[#6B2D73]/50 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6B2D73]/20 via-[#9347a0]/20 to-[#2D7363]/20" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6B2D73]/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-[#2D7363]/20 to-transparent rounded-full blur-3xl" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center py-20 px-8">
              {/* Title with Enhanced Animation */}
              <motion.h2
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent leading-tight flex items-center justify-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Sparkles className="w-12 h-12 md:w-16 md:h-16" />
                {t('services.cta.title')}
              </motion.h2>
              
              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-[#F8F8F8] mb-16 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
{t('services.cta.subtitle')}
              </motion.p>
              
              {/* Interactive Stats */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {[
                  { number: "20+", label: t('services.stats.projectsDelivered'), icon: <Rocket className="w-8 h-8" /> },
                  { number: "24h", label: t('services.stats.responseTime'), icon: <Zap className="w-8 h-8" /> },
                  { number: "98%", label: t('services.stats.clientSatisfaction'), icon: <Sparkles className="w-8 h-8" /> }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-[#6B2D73]/50 transition-all duration-500"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-3">{stat.icon}</div>
                    <motion.div
                      className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent mb-2"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-[#F8F8F8]/80 group-hover:text-[#F8F8F8] transition-colors duration-300">
                      {stat.label}
                    </div>
                    
                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: `0 0 30px rgba(107, 45, 115, 0.3)`
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Enhanced CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Primary CTA */}
                <motion.button
                  className="group relative px-12 py-6 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-[#2D7363]/25 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('/consultation', '_blank')}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Rocket className="w-5 h-5" />
                    {t('services.cta.startProject')}
                  </span>
                  
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#5fa896] to-[#8fd5c4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2D7363] to-[#5fa896] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Floating Particles */}
                  {[...Array(3)].map((_, particleIndex) => (
                    <motion.div
                      key={particleIndex}
                      className="absolute w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        top: `${30 + particleIndex * 20}%`,
                        left: `${20 + particleIndex * 30}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: particleIndex * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.button>
                
              </motion.div>
              
              {/* Contact Info */}
              <motion.div
                className="mt-16 text-[#F8F8F8]/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="mb-4">{t('services.cta.readyToStart')}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a
                    href="mailto:bitwreckers@gmail.com"
                    className="text-[#b376bf] hover:text-[#d4aad9] transition-colors duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Mail className="w-4 h-4" />
                    bitwreckers@gmail.com
                  </motion.a>
                  <span className="hidden sm:block text-gray-600">|</span>
                  <motion.a
                    href="tel:+962780242419"
                    className="text-[#b376bf] hover:text-[#d4aad9] transition-colors duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Phone className="w-4 h-4" />
                    0780242419
                  </motion.a>
                </div>
              </motion.div>
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#6B2D73]/50 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#2D7363]/50 rounded-br-3xl" />
            
            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 right-10 w-6 h-6 bg-[#b376bf] rounded-full opacity-60"
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-4 h-4 bg-[#2D7363] rounded-full opacity-60"
              animate={{
                y: [0, -15, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

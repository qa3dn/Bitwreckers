'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies and best practices.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'from-cyan-400 to-blue-500',
    glowColor: '#00F6FF'
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'from-purple-400 to-pink-500',
    glowColor: '#A259FF'
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    description: 'Intelligent solutions that streamline processes and enhance user experiences.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2L14.09 8.26L22 9L16 14.74L17.18 22.02L12 18.77L6.82 22.02L8 14.74L2 9L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'from-green-400 to-emerald-500',
    glowColor: '#00FF88'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and automated deployment pipelines.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M18 10H22L18 6L14 10H18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 20H18L22 16L18 12L14 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 9L2 5L6 1L10 5L6 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'from-orange-400 to-red-500',
    glowColor: '#FF6B35'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that delight users and drive engagement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M21 16V8A2 2 0 0 0 19 6H5A2 2 0 0 0 3 8V16A2 2 0 0 0 5 18H19A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 14H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'from-indigo-400 to-purple-500',
    glowColor: '#8B5CF6'
  },
  {
    id: 'consulting',
    title: 'Tech Consulting',
    description: 'Strategic technology guidance to help your business grow and innovate.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M19.4 15A1.65 1.65 0 0 0 21 13.35A1.65 1.65 0 0 0 19.4 11.65A1.65 1.65 0 0 0 17.75 13A1.65 1.65 0 0 0 19.4 15Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M4.6 15A1.65 1.65 0 0 0 6.25 13.35A1.65 1.65 0 0 0 4.6 11.65A1.65 1.65 0 0 0 2.95 13A1.65 1.65 0 0 0 4.6 15Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 4.6A1.65 1.65 0 0 0 13.35 2.95A1.65 1.65 0 0 0 12 1.3A1.65 1.65 0 0 0 10.65 2.95A1.65 1.65 0 0 0 12 4.6Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: 'from-yellow-400 to-orange-500',
    glowColor: '#FFD700'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Research & Strategy',
    description: 'We analyze your needs and create a comprehensive development strategy.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    step: '02',
    title: 'Design & Prototype',
    description: 'Our designers create stunning mockups and interactive prototypes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M17 3A2.828 2.828 0 1 1 19.828 5.828L6.828 18.828A2.828 2.828 0 1 1 4 16L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 8L12 20L9 17L17 9L20 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    step: '03',
    title: 'Development',
    description: 'Expert developers bring your vision to life with clean, efficient code.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'We deploy your product and provide ongoing maintenance and support.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4.5 16.5C-1.5 10.5 3 4 12 4S25.5 10.5 19.5 16.5L12 24L4.5 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

export default function ServicesPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-50"
        style={{ width: progressWidth }}
      />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background with Multiple Layers */}
        <div className="absolute inset-0">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900" />
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 246, 255, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(162, 89, 255, 0.1) 0%, transparent 50%)`
            }} />
          </div>
          
          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 border border-cyan-400/20 rounded-full"
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
            className="absolute bottom-20 right-20 w-80 h-80 border border-purple-400/20 rounded-full"
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
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
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
              Our Services
            </motion.h1>
            
            {/* Main Title */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              Our Services
            </motion.h1>
            
            {/* Glowing Underline */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
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
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              We design, build, and scale{" "}
              <motion.span
                className="text-cyan-400 font-semibold"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(0, 246, 255, 0.5)",
                    "0 0 20px rgba(0, 246, 255, 0.8)",
                    "0 0 10px rgba(0, 246, 255, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                innovative digital products
              </motion.span>{" "}
              tailored to your needs.
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
              { icon: "🚀", label: "Web Apps", color: "from-cyan-400 to-blue-500" },
              { icon: "📱", label: "Mobile", color: "from-purple-400 to-pink-500" },
              { icon: "🤖", label: "AI/ML", color: "from-green-400 to-emerald-500" },
              { icon: "☁️", label: "Cloud", color: "from-orange-400 to-red-500" }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group relative p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 cursor-pointer"
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 246, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                {/* Service Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                {/* Service Label */}
                <div className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
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
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
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
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.div
              className="text-gray-400 text-sm mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to explore
            </motion.div>
            <motion.div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
              animate={{ borderColor: ["#9CA3AF", "#00F6FF", "#9CA3AF"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{ 
                  y: [0, 12, 0],
                  backgroundColor: ["#9CA3AF", "#00F6FF", "#9CA3AF"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Action Button */}
        <motion.button
          className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <svg className="w-8 h-8 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          
          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-75"
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
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What We Offer
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${service.color} text-white text-4xl mb-6`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                >
                  {service.icon}
                </motion.div>
                
                {/* Service Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
                
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
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            How We Work
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
                      className={`relative z-20 flex-shrink-0 w-28 h-28 ${
                        index % 2 === 0 ? 'mr-16' : 'ml-16'
                      }`}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                    >
                      {/* Outer Glow Ring */}
                      <motion.div
                        className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-40"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Main Circle */}
                      <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-gray-900">
                        {/* Inner Circle */}
                        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center border-2 border-gray-700">
                          <div className="text-white">
                            {step.icon}
                          </div>
                        </div>
                        
                        {/* Step Number Badge */}
                        <motion.div
                          className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-black shadow-xl border-2 border-gray-900"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.3 + 0.5, type: "spring", bounce: 0.6 }}
                          viewport={{ once: true }}
                        >
                          {step.step}
                        </motion.div>
                        
                        {/* Floating Particles */}
                        {[...Array(3)].map((_, particleIndex) => (
                          <motion.div
                            key={particleIndex}
                            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
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
                      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 group overflow-hidden">
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl" />
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl" />
                          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl" />
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <motion.h3 
                            className="text-4xl font-bold text-white mb-6 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
                            whileHover={{ x: index % 2 === 0 ? -15 : 15 }}
                          >
                            {step.title}
                          </motion.h3>
                          <p className="text-gray-300 leading-relaxed text-xl group-hover:text-gray-100 transition-colors duration-500">
                            {step.description}
                          </p>
                        </div>
                        
                        {/* Enhanced Hover Effects */}
                        <motion.div
                          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(135deg, rgba(0, 246, 255, 0.1), rgba(162, 89, 255, 0.1))`,
                            boxShadow: `0 0 60px rgba(0, 246, 255, 0.4), 0 0 120px rgba(162, 89, 255, 0.3)`
                          }}
                        />
                        
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-400 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-purple-400 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
        <div className="container mx-auto">
          {/* Animated Background Elements */}
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full mix-blend-screen filter blur-3xl"
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
            className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400/10 rounded-full mix-blend-screen filter blur-3xl"
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
            className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center py-20 px-8">
              {/* Title with Enhanced Animation */}
              <motion.h2
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Let's build something
                <br />
                <motion.span
                  className="inline-block"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(0, 246, 255, 0.5)",
                      "0 0 40px rgba(162, 89, 255, 0.5)",
                      "0 0 20px rgba(0, 246, 255, 0.5)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  amazing together
                </motion.span>
              </motion.h2>
              
              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Ready to transform your ideas into reality? Let's discuss your project and create something extraordinary that pushes the boundaries of innovation.
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
                  { number: "500+", label: "Projects Delivered", icon: "🚀" },
                  { number: "24h", label: "Response Time", icon: "⚡" },
                  { number: "98%", label: "Client Satisfaction", icon: "⭐" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <motion.div
                      className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2"
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
                    <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                    
                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: `0 0 30px rgba(0, 246, 255, 0.3)`
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
                  className="group relative px-12 py-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Start Your Project</span>
                  
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
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
                
                {/* Secondary CTA */}
                <motion.button
                  className="group relative px-12 py-6 border-2 border-cyan-400 text-cyan-400 rounded-full font-bold text-xl hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">View Portfolio</span>
                  
                  {/* Hover Background */}
                  <motion.div
                    className="absolute inset-0 bg-cyan-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"
                  />
                </motion.button>
              </motion.div>
              
              {/* Contact Info */}
              <motion.div
                className="mt-16 text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="mb-4">Ready to get started? Reach out to us:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a
                    href="mailto:hello@bitwreckers.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    hello@bitwreckers.com
                  </motion.a>
                  <span className="hidden sm:block text-gray-600">|</span>
                  <motion.a
                    href="tel:+1234567890"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    +1 (234) 567-890
                  </motion.a>
                </div>
              </motion.div>
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-400/50 rounded-br-3xl" />
            
            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 right-10 w-6 h-6 bg-cyan-400 rounded-full opacity-60"
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
              className="absolute bottom-10 left-10 w-4 h-4 bg-purple-400 rounded-full opacity-60"
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

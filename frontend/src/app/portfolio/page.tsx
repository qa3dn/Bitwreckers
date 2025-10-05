'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import useTranslation from '../../hooks/useTranslation';

export default function PortfolioPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t, isRTL } = useTranslation();

  const categories = [
    { id: 'all', name: t('portfolio.categories.all'), icon: '🎯' },
    { id: 'web', name: t('portfolio.categories.web'), icon: '🌐' },
    { id: 'mobile', name: t('portfolio.categories.mobile'), icon: '📱' },
    { id: 'ai', name: t('portfolio.categories.ai'), icon: '🤖' },
    { id: 'design', name: t('portfolio.categories.design'), icon: '🎨' }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      image: '/api/placeholder/600/400',
      description: 'A modern e-commerce platform with advanced features and seamless user experience.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      impact: 'Increased sales by 300%',
      liveUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 2,
      title: 'AI-Powered Analytics',
      category: 'ai',
      image: '/api/placeholder/600/400',
      description: 'Machine learning platform for business intelligence and predictive analytics.',
      technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
      impact: 'Reduced analysis time by 80%',
      liveUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 3,
      title: 'Fitness Tracking App',
      category: 'mobile',
      image: '/api/placeholder/600/400',
      description: 'Cross-platform mobile app for fitness tracking and workout planning.',
      technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit'],
      impact: '1M+ downloads',
      liveUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 4,
      title: 'Brand Identity Design',
      category: 'design',
      image: '/api/placeholder/600/400',
      description: 'Complete brand identity redesign for a tech startup.',
      technologies: ['Figma', 'Adobe Creative Suite', 'Brand Guidelines'],
      impact: 'Brand recognition up 150%',
      liveUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 5,
      title: 'Real-time Chat Platform',
      category: 'web',
      image: '/api/placeholder/600/400',
      description: 'Real-time messaging platform with video calls and file sharing.',
      technologies: ['Vue.js', 'Socket.io', 'WebRTC', 'Redis'],
      impact: '10K+ active users',
      liveUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 6,
      title: 'Smart Home Dashboard',
      category: 'ai',
      image: '/api/placeholder/600/400',
      description: 'IoT dashboard for smart home automation and monitoring.',
      technologies: ['React', 'Python', 'MQTT', 'TensorFlow'],
      impact: 'Energy savings of 25%',
      liveUrl: '#',
      caseStudyUrl: '#'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      company: 'TechStart Inc.',
      image: '/api/placeholder/100/100',
      quote: t('portfolio.testimonials.sarahQuote'),
      logo: '🏢'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO, DataFlow',
      company: 'DataFlow Solutions',
      image: '/api/placeholder/100/100',
      quote: t('portfolio.testimonials.michaelQuote'),
      logo: '📊'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Founder, FitLife',
      company: 'FitLife App',
      image: '/api/placeholder/100/100',
      quote: t('portfolio.testimonials.emilyQuote'),
      logo: '💪'
    }
  ];

  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] text-white overflow-hidden ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B2D73] via-[#9347a0] to-[#2D7363] z-50"
        style={{ width: progressWidth }}
      />
      
      {/* Header Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e]" />
        
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-[#6B2D73]/10 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-[#2D7363]/10 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {t('portfolio.title')}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-[#F8F8F8] mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {t('portfolio.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#6B2D73] to-[#9347a0] text-white shadow-lg shadow-[#6B2D73]/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => openProjectModal(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-80 bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6B2D73]/20 to-[#2D7363]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-full flex items-center justify-center mb-4 mx-auto">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <p className="text-[#F8F8F8]/80">{t('portfolio.projectPreview')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-[#b376bf]">🔗</span>
                        <span className="text-white">{t('portfolio.viewDetails')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] blur-xl" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('portfolio.testimonials.title')}
          </motion.h2>

          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-[#131422]/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-full flex items-center justify-center text-2xl">
                      {testimonials[currentTestimonial].logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{testimonials[currentTestimonial].name}</h3>
                      <p className="text-[#F8F8F8]/80">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl text-[#F8F8F8] mb-8 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  
                  <p className="text-[#b376bf] font-semibold">{testimonials[currentTestimonial].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-gradient-to-r from-[#6B2D73] to-[#9347a0]'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="bg-gradient-to-r from-[#6B2D73]/20 to-[#2D7363]/20 backdrop-blur-xl rounded-3xl border border-[#6B2D73]/30 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center py-16 px-8">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {t('portfolio.cta.title')}
                <br />
                {t('portfolio.cta.subtitle')}
              </motion.h2>
              
              <motion.button
                className="group relative px-12 py-6 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-[#2D7363]/25 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t('portfolio.cta.startProject')}
                </span>
                
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
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Project Hero Image */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6B2D73]/20 to-[#2D7363]/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-full flex items-center justify-center mb-4 mx-auto">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <p className="text-[#F8F8F8]/80">{t('portfolio.projectPreview')}</p>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedProject.title}</h2>
                <p className="text-[#F8F8F8] text-lg mb-6">{selectedProject.description}</p>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{t('portfolio.technologiesUsed')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-[#6B2D73]/20 to-[#9347a0]/20 border border-[#6B2D73]/30 rounded-full text-sm text-[#d4aad9]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-3">{t('portfolio.impactResults')}</h3>
                  <p className="text-[#2D7363] text-lg font-semibold">{selectedProject.impact}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-xl font-semibold hover:from-[#5fa896] hover:to-[#8fd5c4] transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M10 6H6A2 2 0 0 0 4 8V16A2 2 0 0 0 6 18H18A2 2 0 0 0 20 16V10A2 2 0 0 0 18 8H14M10 6V4A2 2 0 0 1 12 2H16A2 2 0 0 1 18 4V6M10 6H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {t('portfolio.viewLive')}
                    </span>
                  </motion.button>
                  
                  <motion.button
                    className="flex-1 px-6 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-semibold hover:bg-gray-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {t('portfolio.caseStudy')}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

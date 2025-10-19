'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Smartphone, Settings, Database, MonitorSmartphone, Globe, BookOpen, Users as UsersIcon, Trophy, Target, Send, GraduationCap, DollarSign, Building2, Eye } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

// Tech paths will be defined inside component to use translation

// How it works steps will be defined inside component to use translation

// Benefits will be defined inside component to use translation

// Student projects will be defined inside component to use translation

// Upcoming events will be defined inside component to use translation

// FAQs will be defined inside component to use translation

export default function StudentsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeFAQ, setActiveFAQ] = useState(0);
  const [formData, setFormData] = useState({});
  const { t, isRTL } = useTranslation();

  const techPaths = [
    { name: t('students.techPaths.techMedia'), icon: Smartphone, color: 'from-[#9347a0] to-[#b376bf]' },
    { name: t('students.techPaths.devops'), icon: Settings, color: 'from-[#7b3985] to-[#9347a0]' },
    { name: t('students.techPaths.backend'), icon: Database, color: 'from-[#6B2D73] to-[#9347a0]' },
    { name: t('students.techPaths.mobile'), icon: MonitorSmartphone, color: 'from-[#b376bf] to-[#d4aad9]' },
    { name: t('students.techPaths.web'), icon: Globe, color: 'from-[#5c2663] to-[#7b3985]' }
  ];

  const howItWorksSteps = [
    { step: 'Ship', title: t('students.howItWorks.ship.title'), description: t('students.howItWorks.ship.description') },
    { step: 'Sprint', title: t('students.howItWorks.sprint.title'), description: t('students.howItWorks.sprint.description') },
    { step: 'Challenge', title: t('students.howItWorks.challenge.title'), description: t('students.howItWorks.challenge.description') },
    { step: 'Apply', title: t('students.howItWorks.apply.title'), description: t('students.howItWorks.apply.description') }
  ];

  const benefits = [
    { title: t('students.benefits.mentorship.title'), description: t('students.benefits.mentorship.description'), icon: GraduationCap },
    { title: t('students.benefits.showcase.title'), description: t('students.benefits.showcase.description'), icon: Target },
    { title: t('students.benefits.stipends.title'), description: t('students.benefits.stipends.description'), icon: DollarSign },
    { title: t('students.benefits.realClients.title'), description: t('students.benefits.realClients.description'), icon: Building2 },
    { title: t('students.benefits.codeReviews.title'), description: t('students.benefits.codeReviews.description'), icon: Eye }
  ];

  const studentProjects = [
    { title: 'E-Commerce App', tech: 'React Native', status: t('students.projects.completed') },
    { title: 'AI Chatbot', tech: 'Python', status: t('students.projects.inProgress') },
    { title: 'Portfolio Website', tech: 'Next.js', status: t('students.projects.completed') },
    { title: 'Mobile Game', tech: 'Unity', status: t('students.projects.planning') }
  ];

  const upcomingEvents = [
    { title: 'Hackathon 2024', date: 'Dec 15-17', type: t('students.events.hackathon') },
    { title: 'Tech Workshop', date: 'Dec 20', type: t('students.events.workshop') },
    { title: 'Career Fair', date: 'Jan 10', type: t('students.events.lecture') }
  ];

  const faqs = [
    { question: t('students.faq.q1'), answer: t('students.faq.a1') },
    { question: t('students.faq.q2'), answer: t('students.faq.a2') },
    { question: t('students.faq.q3'), answer: t('students.faq.a3') }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className={`py-24 px-4 relative bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-8"
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#9347a0] via-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent leading-tight">
              {t('students.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#9347a0] to-[#d4aad9] mx-auto rounded-full" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-5xl mx-auto leading-relaxed"
            style={{ color: '#d9d8d6' }}
          >
            {t('students.subtitle')}
          </motion.p>

          {/* Tech Paths - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16"
          >
            {techPaths.map((path, index) => (
              <motion.div
                key={path.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:bg-white/10">
                  <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${path.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <path.icon className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-base font-semibold text-white group-hover:text-[#d4aad9] transition-colors duration-300">{path.name}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* How It Works - Ultra Enhanced */}
        <motion.div
          className="mb-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block relative">
              <h3 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#9347a0] via-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent leading-tight">
                {t('students.howItWorks.title')}
              </h3>
              <motion.div 
                className="w-32 h-1.5 bg-gradient-to-r from-[#9347a0] to-[#d4aad9] mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-full opacity-60 blur-sm" />
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-[#d4aad9] to-[#e6d1ea] rounded-full opacity-60 blur-sm" />
            </div>
          </motion.div>
          
          <div className="relative">
            {/* Enhanced Connection Lines */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-[#9347a0] via-[#b376bf] via-[#d4aad9] to-[#e6d1ea] transform -translate-y-1/2 rounded-full shadow-lg" />
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-white/20 transform -translate-y-1/2 rounded-full" />
            
            {/* Floating Particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#9347a0] rounded-full opacity-60 animate-pulse" />
            <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-[#b376bf] rounded-full opacity-60 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#d4aad9] rounded-full opacity-60 animate-pulse" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="group"
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -15 }}
                >
                  <div className="relative">
                    {/* Background Glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#9347a0]/30 to-[#b376bf]/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    {/* Main Card */}
                    <div className="relative text-center p-10 bg-white/8 backdrop-blur-xl rounded-3xl border border-white/15 hover:border-white/30 transition-all duration-500 group-hover:bg-white/12 group-hover:shadow-2xl group-hover:shadow-[#9347a0]/25 overflow-hidden">
                      {/* Top Gradient Line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-t-3xl" />
                      
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(147, 71, 160, 0.4) 0%, transparent 50%),
                                            radial-gradient(circle at 70% 70%, rgba(179, 118, 191, 0.4) 0%, transparent 50%)`
                        }} />
                      </div>
                      
                      {/* Step Number Container */}
                      <div className="relative mb-10">
                        <motion.div 
                          className="w-32 h-32 mx-auto bg-gradient-to-br from-[#9347a0] via-[#b376bf] to-[#d4aad9] rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-2xl relative overflow-hidden group-hover:shadow-[#9347a0]/40 transition-all duration-500"
                          whileHover={{ rotate: 5, scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Animated Background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#9347a0] via-[#b376bf] to-[#d4aad9] opacity-50"
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          <span className="relative z-10">{index + 1}</span>
                        </motion.div>
                        
                        {/* Floating Indicators */}
                        <motion.div
                          className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-[#d4aad9] to-[#e6d1ea] rounded-full flex items-center justify-center shadow-lg"
                          animate={{
                            y: [-3, 3, -3],
                            rotate: [0, 5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                        </motion.div>
                        
                        <motion.div
                          className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-full opacity-80"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-[#d4aad9] transition-colors duration-300 leading-tight">
                          {step.title}
                        </h4>
                        <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300" style={{ color: '#d9d8d6' }}>
                          {step.description}
                        </p>
                        
                        {/* Bottom Accent */}
                        <motion.div
                          className="mt-8 h-1 bg-gradient-to-r from-[#9347a0] to-[#d4aad9] rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      
                      {/* Corner Decorations */}
                      <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-[#9347a0]/20 to-[#b376bf]/20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-[#d4aad9]/20 to-[#e6d1ea]/20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Benefits - Enhanced */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#9347a0] via-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('students.benefits.title')}
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-[#9347a0] to-[#d4aad9] mx-auto rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-home/20 transition-all duration-300 p-8 text-center group-hover:bg-white/10 group-hover:shadow-2xl group-hover:shadow-[#9347a0]/20 h-full">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <benefit.icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#d4aad9] to-[#e6d1ea] rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-[#d4aad9] transition-colors duration-300">{benefit.title}</h4>
                  <p className="text-gray-300 leading-relaxed" style={{ color: '#d9d8d6' }}>{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Student Projects - Hidden temporarily */}
        {/* <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            {t('students.projects.title')}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[t('students.projects.all'), 'React', 'Python', 'Next.js', 'Unity'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white shadow-lg shadow-[#9347a0]/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === t('students.projects.all') ? t('students.projects.all') : filter}
              </motion.button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
                <p className="text-gray-400 text-sm mb-3">{project.tech}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Completed' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : project.status === 'In Progress'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {project.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Upcoming Events - Hidden temporarily */}
        {/* <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            {t('students.events.title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-xl font-bold text-white mb-3">{event.title}</h4>
                <p className="text-[#d4aad9] font-semibold mb-2">{event.date}</p>
                <span className="px-3 py-1 bg-[#9347a0]/20 text-[#d4aad9] border border-[#9347a0]/30 rounded-full text-sm">
                  {event.type}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* FAQ - Removed (has dedicated page) */}

        {/* CTA Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 backdrop-blur-xl rounded-3xl border border-[#9347a0]/30 p-12 md:p-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#9347a0] via-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
                Ready to Start Your Journey?
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-[#9347a0] to-[#d4aad9] mx-auto rounded-full" />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ color: '#d9d8d6' }}
            >
              Join our community of talented developers and build your future in technology
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button
                className="glass-button glass-button-enhanced px-10 py-5 text-white font-semibold flex items-center gap-3 text-lg w-full sm:w-auto relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Join as Student</span>
                <Send className="w-5 h-5 relative z-10" strokeWidth={2.5} />
              </motion.button>
              
              <motion.button
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Learn More</span>
                <BookOpen className="w-5 h-5" strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

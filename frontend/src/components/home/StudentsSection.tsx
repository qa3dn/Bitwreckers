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
    <section className={`py-20 px-4 relative ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#e6d1ea] bg-clip-text text-transparent">
            {t('students.title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            {t('students.subtitle')}
          </p>

          {/* Tech Paths */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {techPaths.map((path, index) => (
              <motion.div
                key={path.name}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${path.color} rounded-full flex items-center justify-center`}>
                  <path.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <p className="text-sm font-semibold text-white">{path.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            {t('students.howItWorks.title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {index + 1}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            {t('students.benefits.title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{benefit.title}</h4>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
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

        {/* Application Form - Removed (has dedicated page) */}
      </div>
    </section>
  );
}

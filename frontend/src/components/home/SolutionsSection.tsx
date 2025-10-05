'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, Smartphone, Link2, Bot, Cloud, Building2, BarChart3, Rocket } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

// Services will be defined inside component to use translation

// Process steps will be defined inside component to use translation

// Case studies will be defined inside component to use translation

// Testimonials will be defined inside component to use translation

export default function SolutionsSection() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const { t, isRTL } = useTranslation();

  const services = [
    { title: 'Web Development', icon: Globe, description: 'Modern, responsive web applications built with cutting-edge technologies' },
    { title: 'Mobile Development', icon: Smartphone, description: 'Cross-platform mobile apps for iOS and Android using Flutter' },
    { title: 'UI/UX Design', icon: Link2, description: 'Beautiful, intuitive user interfaces that enhance user experience' },
    { title: 'AI & Automation', icon: Bot, description: 'Intelligent solutions that streamline processes and boost efficiency' },
    { title: 'Cloud & DevOps', icon: Cloud, description: 'Scalable cloud infrastructure and automated deployment pipelines' }
  ];

  const processSteps = [
    { step: 'Discovery', title: t('solutions.process.discovery.title'), description: t('solutions.process.discovery.description') },
    { step: 'Architecture', title: t('solutions.process.architecture.title'), description: t('solutions.process.architecture.description') },
    { step: 'Sprint', title: t('solutions.process.sprint.title'), description: t('solutions.process.sprint.description') },
    { step: 'Handover', title: t('solutions.process.handover.title'), description: t('solutions.process.handover.description') },
    { step: 'Delivery', title: t('solutions.process.delivery.title'), description: t('solutions.process.delivery.description') }
  ];

  const caseStudies = [
    {
      title: 'Student Management System',
      before: 'Manual processes, paper-based records',
      after: 'Digital platform with automated workflows',
      results: ['95% reduction in administrative time', 'Real-time student tracking', 'Improved data accuracy']
    },
    {
      title: 'University Mobile App',
      before: 'Outdated web portal, poor mobile experience',
      after: 'Modern Flutter app with seamless UX',
      results: ['300% increase in student engagement', '4.9/5 app store rating', '50% reduction in support tickets']
    },
    {
      title: 'AI-Powered Learning Platform',
      before: 'Static content, no personalization',
      after: 'Adaptive learning with AI recommendations',
      results: ['40% improvement in learning outcomes', 'Personalized study paths', 'Real-time progress tracking']
    }
  ];

  const testimonials = [
    { name: 'Digital Academy', logo: Building2, quote: 'Bitwreckers created an innovative e-learning platform that revolutionized our educational approach.' },
    { name: 'TechStartup', logo: BarChart3, quote: 'Outstanding mobile app development with Flutter - exceeded all our expectations.' },
    { name: 'EduTech', logo: Rocket, quote: 'Their AI-powered learning platform increased student engagement by 300%.' }
  ];

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
            {t('solutions.title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            {t('solutions.subtitle')}
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="flex items-center gap-3 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 px-6 py-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <testimonial.logo className="w-6 h-6 text-[#b376bf]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            Our Services
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-2xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            {t('solutions.process.title')}
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#9347a0] to-[#b376bf] hidden lg:block" />
            
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col gap-8`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Circle */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 max-w-md">
                    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
                      <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            Selected Case Studies
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-2xl font-bold text-white mb-6">{study.title}</h4>
                
                <div className="space-y-6">
                  <div>
                                         <h5 className="text-[#d4aad9] font-semibold mb-2">{t('solutions.caseStudies.before')}</h5>
                     <p className="text-gray-300 text-sm">{study.before}</p>
                   </div>
                   
                   <div>
                     <h5 className="text-green-400 font-semibold mb-2">{t('solutions.caseStudies.after')}</h5>
                     <p className="text-gray-300 text-sm">{study.after}</p>
                   </div>
                   
                   <div>
                     <h5 className="text-[#b376bf] font-semibold mb-3">{t('solutions.caseStudies.results')}</h5>
                    <ul className="space-y-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#b376bf] rounded-full" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 backdrop-blur-xl rounded-3xl border border-[#9347a0]/30 p-12">
                         <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
               {t('solutions.cta.title')}
             </h3>
             <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
               {t('solutions.cta.subtitle')}
             </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open('/consultation', '_blank')}
                className="px-8 py-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#9347a0]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Call
               </motion.button>
               
               <motion.button
                 onClick={() => window.open('/join', '_blank')}
                 className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all duration-300"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                Join Our Team
               </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

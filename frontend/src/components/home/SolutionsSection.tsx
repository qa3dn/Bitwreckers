'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  { title: 'Web Apps', icon: '🌐', description: 'Modern web applications with cutting-edge technologies' },
  { title: 'Mobile Apps', icon: '📱', description: 'Cross-platform mobile applications for iOS and Android' },
  { title: 'Integrations', icon: '🔗', description: 'Seamless integration with existing systems and APIs' },
  { title: 'AI/Automation', icon: '🤖', description: 'Intelligent automation and AI-powered solutions' },
  { title: 'Cloud/DevOps', icon: '☁️', description: 'Cloud infrastructure and DevOps implementation' }
];

const processSteps = [
  { step: 'Discovery', title: 'Discovery & Analysis', description: 'We analyze your requirements and create a comprehensive plan' },
  { step: 'Architecture', title: 'Architecture Design', description: 'Design scalable and robust system architecture' },
  { step: 'Sprint', title: 'Sprint Development', description: 'Agile development with regular milestones and updates' },
  { step: 'Handover', title: 'Handover & QA', description: 'Thorough testing and quality assurance' },
  { step: 'Delivery', title: 'Delivery & Support', description: 'Deploy and provide ongoing support and maintenance' }
];

const caseStudies = [
  {
    title: 'E-Commerce Platform',
    before: 'Manual processes, slow performance',
    after: 'Automated workflows, 300% faster',
    results: ['300% increase in sales', '80% reduction in processing time', '50% cost savings']
  },
  {
    title: 'AI-Powered Analytics',
    before: 'Basic reporting, limited insights',
    after: 'Real-time analytics, predictive insights',
    results: ['90% faster decision making', '40% increase in efficiency', 'Real-time monitoring']
  },
  {
    title: 'Mobile Banking App',
    before: 'Outdated interface, poor UX',
    after: 'Modern design, seamless experience',
    results: ['200% increase in user engagement', '60% reduction in support tickets', '4.8/5 user rating']
  }
];

const testimonials = [
  { name: 'TechCorp', logo: '🏢', quote: 'Bitwreckers transformed our business with their innovative solutions.' },
  { name: 'DataFlow', logo: '📊', quote: 'Exceptional quality and professional service delivery.' },
  { name: 'StartupXYZ', logo: '🚀', quote: 'They helped us scale from 0 to 1M users in just 6 months.' }
];

export default function SolutionsSection() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Today's Solutions for Tomorrow's Technology
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            We provide integrated technical solutions that help companies grow and innovate in the digital age
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
                <span className="text-2xl">{testimonial.logo}</span>
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
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            What We Offer
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
                <div className="text-4xl mb-4">{service.icon}</div>
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
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Our Process
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-orange-600 hidden lg:block" />
            
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
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
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
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
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
                                         <h5 className="text-red-400 font-semibold mb-2">Before</h5>
                     <p className="text-gray-300 text-sm">{study.before}</p>
                   </div>
                   
                   <div>
                     <h5 className="text-green-400 font-semibold mb-2">After</h5>
                     <p className="text-gray-300 text-sm">{study.after}</p>
                   </div>
                   
                   <div>
                     <h5 className="text-orange-400 font-semibold mb-3">Results</h5>
                    <ul className="space-y-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-400 rounded-full" />
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
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-xl rounded-3xl border border-red-500/30 p-12">
                         <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
               Ready to Start Your Project?
             </h3>
             <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
               Book a free exploratory call and let's discuss how we can help you achieve your goals
             </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                                 Book a Call
               </motion.button>
               
               <motion.button
                 className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all duration-300"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 Download Profile
               </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

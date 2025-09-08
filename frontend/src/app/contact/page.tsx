'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const contactTypes = [
  {
    id: 'companies',
    title: 'Companies',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'blue',
    fields: [
      { name: 'companyName', label: 'Company Name', type: 'text', required: true },
      { name: 'email', label: 'Official Email', type: 'email', required: true },
      { name: 'serviceType', label: 'Service Type', type: 'select', required: true, options: ['Web Development', 'Mobile App', 'AI Solutions', 'Consulting', 'Other'] },
      { name: 'message', label: 'Message', type: 'textarea', required: true }
    ]
  },
  {
    id: 'partnerships',
    title: 'Partnerships',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'purple',
    fields: [
      { name: 'organizationName', label: 'Organization Name', type: 'text', required: true },
      { name: 'representative', label: 'Contact Representative', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'collaborationIdea', label: 'Collaboration Idea', type: 'textarea', required: true }
    ]
  },
  {
    id: 'media',
    title: 'Media',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: 'purple',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'coverageType', label: 'Coverage Type', type: 'select', required: true, options: ['Article', 'Interview', 'News', 'Feature', 'Other'] },
      { name: 'message', label: 'Message', type: 'textarea', required: true }
    ]
  },
  {
    id: 'student',
    title: 'Student',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M22 10V6L12 1L2 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 10L12 15L22 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 12V20L12 23L18 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'purple',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'university', label: 'University', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'reason', label: 'Reason for Contact', type: 'select', required: true, options: ['Internship', 'Volunteering', 'Question', 'Project Collaboration', 'Other'] }
    ]
  }
];

export default function ContactPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [activeTab, setActiveTab] = useState('companies');
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setSuccessType(activeTab);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({});
    }, 3000);
  };

  const getSuccessAnimation = (type: string) => {
    switch (type) {
      case 'companies':
        return (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        );
      case 'partnerships':
        return (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-purple-500 rounded-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(168, 85, 247, 0.4)",
                  "0 0 0 20px rgba(168, 85, 247, 0)",
                ]
              }}
              transition={{ duration: 1, repeat: 2 }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-purple-500">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        );
      case 'media':
        return (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-purple-500 rounded-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-purple-500">
                <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </motion.div>
          </motion.div>
        );
      case 'student':
        return (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-purple-500 rounded-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 0.5 }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {/* Confetti effect */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, (i % 2 === 0 ? 1 : -1) * 20],
                    y: [0, -30],
                    opacity: [1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const renderField = (field: any) => {
    if (field.type === 'textarea') {
      return (
        <textarea
          key={field.name}
          name={field.name}
          placeholder={field.label}
          required={field.required}
          value={formData[field.name] || ''}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-300 resize-none"
          rows={4}
        />
      );
    }
    
    if (field.type === 'select') {
      return (
        <select
          key={field.name}
          name={field.name}
          required={field.required}
          value={formData[field.name] || ''}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-300"
        >
          <option value="">Select {field.label}</option>
          {field.options?.map((option: string) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }
    
    return (
      <input
        key={field.name}
        type={field.type}
        name={field.name}
        placeholder={field.label}
        required={field.required}
        value={formData[field.name] || ''}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-300"
      />
    );
  };

  const activeContactType = contactTypes.find(type => type.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 z-50"
        style={{ width: progressWidth }}
      />
      
      {/* Header Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />
        
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-red-500/10 rounded-full mix-blend-screen filter blur-3xl"
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
          className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/10 rounded-full mix-blend-screen filter blur-3xl"
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
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Let's Build Something Together
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Whether you're a company, media partner, or student – we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          {/* Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {contactTypes.map((type, index) => (
              <motion.button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                                 className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                   activeTab === type.id
                     ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/25'
                     : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                 }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`${activeTab === type.id ? 'text-white' : 'text-gray-400'}`}>
                  {type.icon}
                </div>
                {type.title}
              </motion.button>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="p-8 md:p-12">
                             <div className="flex items-center gap-4 mb-8">
                 <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
                   {activeContactType?.icon}
                 </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{activeContactType?.title}</h2>
                  <p className="text-gray-400">Tell us about your project</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeContactType?.fields.slice(0, -1).map(renderField)}
                </div>
                <div className="col-span-full">
                  {activeContactType?.fields.slice(-1).map(renderField)}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                                     className={`relative w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                     activeTab === 'companies'
                       ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                       : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                   } text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showSuccess ? (
                    getSuccessAnimation(successType)
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Send Message
                          </>
                        )}
                      </span>
                      
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300"
                                                 style={{
                           background: activeTab === 'companies' 
                             ? 'linear-gradient(45deg, rgba(239, 68, 68, 0.3), rgba(251, 146, 60, 0.3))'
                             : 'linear-gradient(45deg, rgba(251, 146, 60, 0.3), rgba(239, 68, 68, 0.3))'
                         }}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden h-96">
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 text-gray-600 mx-auto mb-4">
                      <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <p className="text-gray-400">Interactive Map Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <motion.div
                className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                        <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-semibold">Amman, Jordan</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-semibold">hello@bitwreckers.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                        <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9844 21.5573 21.2136 21.3521 21.4019C21.1469 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0975 21.9452 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09477 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65178C2.82196 2.44687 3.0498 2.28335 3.30351 2.17149C3.55722 2.05963 3.83149 2.00189 4.10999 2H7.10999C7.59522 1.99522 8.06574 2.16708 8.43376 2.48353C8.80178 2.79999 9.042 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97348 7.27675 9.89382 7.64999C9.81416 8.02323 9.62984 8.36811 9.35999 8.65L8.08999 9.92C9.51355 12.4135 11.5865 14.4865 14.08 15.91L15.35 14.64C15.6319 14.3702 15.9768 14.1858 16.35 14.1062C16.7232 14.0265 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-semibold">+962 79 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Working Hours</p>
                      <p className="text-white font-semibold">Mon - Fri: 9AM - 6PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl">
                     <motion.div
             className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-xl rounded-3xl border border-red-500/30 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center py-16 px-8">
                             <motion.h2
                 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Have a project in mind?
                <br />
                Let's make it happen.
              </motion.h2>
              
                             <motion.button
                 className="group relative px-12 py-6 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M15 10L11 14L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Schedule a Call
                </span>
                
                {/* Glow Effect */}
                                 <motion.div
                   className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
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
    </div>
  );
}

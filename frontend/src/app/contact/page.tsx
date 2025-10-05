'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import useTranslation from '../../hooks/useTranslation';
import { submitContactForm, ContactFormData } from '../../lib/api';

export default function ContactPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [activeTab, setActiveTab] = useState('companies');
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState('');
  const { t, isRTL } = useTranslation();

  const contactTypes = [
    {
      id: 'companies',
      title: t('contact.tabs.companies'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      fields: [
        { name: 'companyName', label: t('contact.forms.companyName'), type: 'text', required: true },
        { name: 'email', label: t('contact.forms.officialEmail'), type: 'email', required: true },
        { name: 'serviceType', label: t('contact.forms.serviceType'), type: 'select', required: true, options: [t('contact.serviceTypes.webDevelopment'), t('contact.serviceTypes.mobileApp'), t('contact.serviceTypes.aiSolutions'), t('contact.serviceTypes.consulting'), t('contact.serviceTypes.other')] },
        { name: 'message', label: t('contact.forms.message'), type: 'textarea', required: true }
      ]
    },
    {
      id: 'partnerships',
      title: t('contact.tabs.partnerships'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      fields: [
        { name: 'organizationName', label: t('contact.forms.organizationName'), type: 'text', required: true },
        { name: 'representative', label: t('contact.forms.contactRepresentative'), type: 'text', required: true },
        { name: 'email', label: t('contact.forms.email'), type: 'email', required: true },
        { name: 'collaborationIdea', label: t('contact.forms.collaborationIdea'), type: 'textarea', required: true }
      ]
    },
    {
      id: 'media',
      title: t('contact.tabs.media'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      fields: [
        { name: 'name', label: t('contact.forms.name'), type: 'text', required: true },
        { name: 'email', label: t('contact.forms.email'), type: 'email', required: true },
        { name: 'coverageType', label: t('contact.forms.coverageType'), type: 'select', required: true, options: [t('contact.coverageTypes.article'), t('contact.coverageTypes.interview'), t('contact.coverageTypes.news'), t('contact.coverageTypes.feature'), t('contact.coverageTypes.other')] },
        { name: 'message', label: t('contact.forms.message'), type: 'textarea', required: true }
      ]
    },
    {
      id: 'student',
      title: t('contact.tabs.student'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M22 10V6L12 1L2 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 10L12 15L22 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 12V20L12 23L18 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      fields: [
        { name: 'name', label: t('contact.forms.name'), type: 'text', required: true },
        { name: 'university', label: t('contact.forms.university'), type: 'text', required: true },
        { name: 'email', label: t('contact.forms.email'), type: 'email', required: true },
        { name: 'reason', label: t('contact.forms.reasonForContact'), type: 'select', required: true, options: [t('contact.reasons.internship'), t('contact.reasons.volunteering'), t('contact.reasons.question'), t('contact.reasons.projectCollaboration'), t('contact.reasons.other')] }
      ]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare form data based on active tab
      const contactData: ContactFormData = {
        full_name: formData.fullName || formData.representative || formData.contactName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        company: formData.companyName || formData.organizationName || formData.mediaOutlet || '',
        subject: formData.subject || formData.partnershipType || formData.inquiryType || '',
        message: formData.message || formData.partnershipDetails || formData.inquiryDetails || '',
        category: activeTab as 'general' | 'companies' | 'partnerships' | 'media'
      };

      await submitContactForm(contactData);
      
      setSuccessType(activeTab);
      setShowSuccess(true);
      setFormData({});
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSuccessAnimation = (type: string) => {
    switch (type) {
      case 'companies':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        );
      case 'partnerships':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </motion.div>
        );
      case 'media':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </motion.div>
        );
      case 'student':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </motion.div>
        );
      default:
        return null;
    }
  };

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
          {[...Array(20)].map((_, i) => (
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
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent">
              {t('contact.title')}
            </h1>
            <p className="text-xl md:text-2xl text-[#F8F8F8] mb-12 max-w-4xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Forms Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {contactTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === type.id
                    ? 'bg-[#2D7363] text-white shadow-lg hover:bg-[#5fa896]'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type.icon}
                {type.title}
              </motion.button>
            ))}
          </motion.div>

          {/* Form Container */}
          <motion.div
            className="bg-[#131422]/50 backdrop-blur-xl rounded-3xl border border-[#6B2D73]/30 p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Success Message */}
            {showSuccess && (
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-gray-900 rounded-2xl p-8 max-w-md mx-4 text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  {getSuccessAnimation(successType)}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t('contact.success.title')}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {t('contact.success.message')}
                  </p>
                  <motion.button
                    onClick={() => setShowSuccess(false)}
                    className="px-6 py-3 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('contact.success.close')}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {contactTypes
                .find(type => type.id === activeTab)
                ?.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-white font-semibold mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        required={field.required}
                        value={formData[field.name as keyof typeof formData] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                        rows={4}
                        placeholder={field.label}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        required={field.required}
                        value={formData[field.name as keyof typeof formData] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      >
                        <option value="">{field.label}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        required={field.required}
                        value={formData[field.name as keyof typeof formData] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                        placeholder={field.label}
                      />
                    )}
                  </div>
                ))}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#2D7363]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? t('contact.buttons.sending') : t('contact.buttons.sendMessage')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-12">
                {t('contact.contactInfo.getInTouch')}
              </h3>
              
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phone */}
              <motion.div 
                className="group bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/30 p-8 hover:border-[#2D7363]/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-[#2D7363]/25 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {t('contact.contactInfo.phone')}
                </h4>
                <a 
                  href="tel:+962780242419"
                  className="text-[#F8F8F8]/80 hover:text-white transition-colors duration-300 text-lg font-semibold"
                >
                  +962 78 024 2419
                </a>
              </motion.div>

              {/* Location */}
              <motion.div 
                className="group bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/30 p-8 hover:border-[#2D7363]/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-[#2D7363]/25 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {t('contact.contactInfo.location')}
                </h4>
                <p className="text-[#F8F8F8]/80 text-lg font-semibold">
                  {t('contact.contactInfo.ammanJordan')}
                </p>
              </motion.div>

              {/* Working Hours */}
              <motion.div 
                className="group bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/30 p-8 hover:border-[#2D7363]/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-[#2D7363]/25 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {t('contact.contactInfo.workingHours')}
                </h4>
                <p className="text-[#F8F8F8]/80 text-lg font-semibold">
                  {t('contact.contactInfo.workingHoursText')}
                </p>
              </motion.div>
            </div>
          </motion.div>
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
              {t('contact.cta.title')}
            </h3>
            <p className="text-xl text-[#F8F8F8] mb-8">
              {t('contact.cta.subtitle')}
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#2D7363]/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/consultation', '_blank')}
            >
              {t('contact.buttons.scheduleCall')}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
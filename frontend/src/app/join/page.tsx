'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, GraduationCap, Code, Target, Users, Clock, CheckCircle, Send } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';
import { submitJoinRequest } from '../../lib/api';

export default function JoinPage() {
  const { t, isRTL } = useTranslation();
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    email: '',
    phone: '',
    age: '',
    country: '',
    university: '',
    
    // Technical Skills
    fieldOfInterest: '',
    otherField: '',
    experienceLevel: '',
    skills: '',
    portfolio: '',
    
    // Motivation
    motivation: '',
    inspiration: '',
    expectations: '',
    contribution: '',
    
    // Collaboration
    teamwork: '',
    hoursPerWeek: '',
    activities: [] as string[],
    previousExperience: '',
    
    // Future Vision
    futureVision: '',
    projectIdea: '',
    
    // Agreement
    agreement: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => {
      const key = field as keyof typeof prev;
      const currentValue = prev[key];
      
      // Check if current value is an array before using includes/filter
      if (Array.isArray(currentValue)) {
        const updatedValue = currentValue.includes(value)
          ? currentValue.filter(item => item !== value)
          : [...currentValue, value];
        
        return { ...prev, [key]: updatedValue };
      }
      
      // If not an array, return data without modification
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitJoinRequest(formData);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can add error handling here
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldsOfInterest = [
    'Frontend Development',
    'Backend Development', 
    'Mobile Development',
    'Data Science / AI',
    'Cybersecurity',
    'Embedded Systems / IoT',
    'Game Development',
    'UI/UX Design',
    'Project Management',
    'Content Creation',
    'Other'
  ];

  const experienceLevels = [
    'Beginner (less than 1 year)',
    'Intermediate (1–3 years)',
    'Advanced (3+ years)'
  ];

  const hoursOptions = [
    'Less than 5 hours',
    '5–10 hours', 
    'More than 10 hours'
  ];

  const activities = [
    'Contributing to open-source projects',
    'Attending/organizing workshops',
    'Participating in hackathons',
    'Creating technical content',
    'Administrative/organizational tasks'
  ];

  if (showSuccess) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] flex items-center justify-center ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={2} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent mb-6"
          >
            {isRTL ? 'تم إرسال طلبك بنجاح!' : 'Application Submitted Successfully!'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-[#F8F8F8] mb-8"
          >
            {isRTL 
              ? 'شكراً لك! سنراجع طلبك ونعود إليك قريباً.' 
              : 'Thank you! We\'ll review your application and get back to you soon.'
            }
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => setShowSuccess(false)}
            className="px-8 py-4 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] text-white rounded-full font-semibold hover:from-[#9347a0] hover:to-[#b376bf] transition-all duration-300"
          >
            {isRTL ? 'إرسال طلب آخر' : 'Submit Another Application'}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] text-white overflow-hidden ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-[#6B2D73]/10 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-[#2D7363]/10 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-gradient-to-r from-[#6B2D73]/20 to-[#2D7363]/20 border border-[#6B2D73]/30 rounded-full text-[#d4aad9] font-semibold text-sm backdrop-blur-sm">
              {isRTL ? 'انضم إلى مجتمعنا' : 'Join Our Community'}
            </span>
          </motion.div>
          
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isRTL ? 'انضم إلى Bitwreckers' : 'Join Bitwreckers'}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-[#F8F8F8] max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isRTL 
              ? 'كن جزءاً من مجتمع المطورين الأكثر إبداعاً وطموحاً في المنطقة'
              : 'Be part of the most creative and ambitious developer community in the region'
            }
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-[#6B2D73] via-[#9347a0] to-[#2D7363] mx-auto rounded-full mt-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-[#131422]/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#6B2D73]/20 p-4 sm:p-6 md:p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 md:space-y-12">
              
              {/* Section 1: Basic Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {isRTL ? '1. المعلومات الأساسية' : '1. Basic Information'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'الاسم الكامل' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'البريد الإلكتروني' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      placeholder={isRTL ? 'example@email.com' : 'example@email.com'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'رقم الهاتف' : 'Phone Number'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      placeholder={isRTL ? '+962 79 123 4567' : '+962 79 123 4567'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'العمر' : 'Age'} *
                    </label>
                    <input
                      type="number"
                      required
                      min="16"
                      max="50"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      placeholder="18"
                    />
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'الدولة / المدينة' : 'Country / City'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      placeholder={isRTL ? 'الأردن، عمان' : 'Jordan, Amman'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'الجامعة والتخصص' : 'University & Major'} {isRTL ? '(إذا طالب)' : '(if student)'}
                    </label>
                    <input
                      type="text"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      placeholder={isRTL ? 'الجامعة الأردنية، علوم الحاسب' : 'University of Jordan, Computer Science'}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Section 2: Technical Skills */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {isRTL ? '2. المستوى التقني والخبرة' : '2. Technical Skills & Experience'}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-3">
                      {isRTL ? 'ما هو مجالك الرئيسي؟' : 'What is your primary field of interest?'} *
                    </label>
                    <select
                      required
                      value={formData.fieldOfInterest}
                      onChange={(e) => handleInputChange('fieldOfInterest', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                    >
                      <option value="">{isRTL ? 'اختر مجالك' : 'Select your field'}</option>
                      {fieldsOfInterest.map((field) => (
                        <option key={field} value={field}>{field}</option>
                      ))}
                    </select>
                    
                    {/* Other field input */}
                    {formData.fieldOfInterest === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <label className="block text-[#F8F8F8] font-semibold mb-2">
                          {isRTL ? 'يرجى تحديد المجال:' : 'Please specify the field:'} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.otherField}
                          onChange={(e) => handleInputChange('otherField', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                          placeholder={isRTL ? 'اكتب مجالك هنا...' : 'Enter your field here...'}
                        />
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-3">
                      {isRTL ? 'ما هو مستوى خبرتك؟' : 'What is your level of experience?'} *
                    </label>
                    <div className="space-y-2">
                      {experienceLevels.map((level) => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="experienceLevel"
                            value={level}
                            checked={formData.experienceLevel === level}
                            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                            className="w-4 h-4 text-[#6B2D73] bg-gray-800 border-gray-600 focus:ring-[#6B2D73] focus:ring-2"
                          />
                          <span className="text-[#F8F8F8] group-hover:text-[#b376bf] transition-colors duration-200">
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'ما الأدوات أو اللغات التي تتقنها؟' : 'Which tools, languages, or frameworks are you most comfortable with?'} *
                    </label>
                    <textarea
                      required
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                      rows={3}
                      placeholder={isRTL ? 'مثلاً: React, Python, C++, Figma, etc.' : 'e.g., React, Python, C++, Figma, etc.'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'هل لديك مشاريع منشورة؟' : 'Do you have published projects or portfolios?'}
                    </label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange('portfolio', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      placeholder={isRTL ? 'https://github.com/username' : 'https://github.com/username'}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Section 3: Motivation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {isRTL ? '3. الدوافع والأهداف' : '3. Motivation & Goals'}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'لماذا تريد الانضمام إلى Bitwreckers؟' : 'Why do you want to join Bitwreckers?'} *
                    </label>
                    <textarea
                      required
                      value={formData.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                      rows={4}
                      placeholder={isRTL ? 'اكتب فقرة قصيرة عن دوافعك...' : 'Write a short paragraph about your motivation...'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'ما الذي يلهمك أكثر في المجال التقني؟' : 'What inspires you most in the tech field?'} *
                    </label>
                    <textarea
                      required
                      value={formData.inspiration}
                      onChange={(e) => handleInputChange('inspiration', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                      rows={3}
                      placeholder={isRTL ? 'شاركنا ما يلهمك...' : 'Share what inspires you...'}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-[#F8F8F8] font-semibold mb-2">
                        {isRTL ? 'ما الذي تتوقع أن تستفيده؟' : 'What do you expect to gain?'} *
                      </label>
                      <textarea
                        required
                        value={formData.expectations}
                        onChange={(e) => handleInputChange('expectations', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                        rows={3}
                        placeholder={isRTL ? 'توقعاتك من الانضمام...' : 'Your expectations...'}
                      />
                    </div>

                    <div>
                      <label className="block text-[#F8F8F8] font-semibold mb-2">
                        {isRTL ? 'ما الذي تستطيع تقديمه؟' : 'What can you contribute?'} *
                      </label>
                      <textarea
                        required
                        value={formData.contribution}
                        onChange={(e) => handleInputChange('contribution', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                        rows={3}
                        placeholder={isRTL ? 'مساهماتك المحتملة...' : 'Your potential contributions...'}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section 4: Collaboration */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#7b3985] to-[#9347a0] rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {isRTL ? '4. التعاون والالتزام' : '4. Collaboration & Commitment'}
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Teamwork Question */}
                  <div className="bg-[#131422]/30 backdrop-blur-sm rounded-2xl p-6 border border-[#7b3985]/20">
                    <label className="block text-[#F8F8F8] font-semibold mb-4 text-lg">
                      {isRTL ? 'هل تستطيع العمل ضمن فريق؟' : 'Are you comfortable working in a team?'} *
                    </label>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="teamwork"
                          value="Yes"
                          checked={formData.teamwork === 'Yes'}
                          onChange={(e) => handleInputChange('teamwork', e.target.value)}
                          className="w-5 h-5 text-[#7b3985] bg-gray-800 border-gray-600 focus:ring-[#7b3985] focus:ring-2"
                        />
                        <span className="text-[#F8F8F8] group-hover:text-[#b376bf] transition-colors duration-200 text-lg font-medium">
                          {isRTL ? 'نعم' : 'Yes'}
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="teamwork"
                          value="No"
                          checked={formData.teamwork === 'No'}
                          onChange={(e) => handleInputChange('teamwork', e.target.value)}
                          className="w-5 h-5 text-[#7b3985] bg-gray-800 border-gray-600 focus:ring-[#7b3985] focus:ring-2"
                        />
                        <span className="text-[#F8F8F8] group-hover:text-[#b376bf] transition-colors duration-200 text-lg font-medium">
                          {isRTL ? 'لا' : 'No'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Hours Commitment */}
                  <div className="bg-[#131422]/30 backdrop-blur-sm rounded-2xl p-6 border border-[#7b3985]/20">
                    <label className="block text-[#F8F8F8] font-semibold mb-4 text-lg">
                      {isRTL ? 'كم ساعة أسبوعياً تستطيع الالتزام؟' : 'How many hours per week can you commit?'} *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {hoursOptions.map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group p-4 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-all duration-300">
                          <input
                            type="radio"
                            name="hoursPerWeek"
                            value={option}
                            checked={formData.hoursPerWeek === option}
                            onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                            className="w-5 h-5 text-[#7b3985] bg-gray-800 border-gray-600 focus:ring-[#7b3985] focus:ring-2"
                          />
                          <span className="text-[#F8F8F8] group-hover:text-[#b376bf] transition-colors duration-200 font-medium">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="bg-[#131422]/30 backdrop-blur-sm rounded-2xl p-6 border border-[#7b3985]/20">
                    <label className="block text-[#F8F8F8] font-semibold mb-4 text-lg">
                      {isRTL ? 'ما نوع الأنشطة التي تفضلها؟' : 'Which activities would you like to be part of?'} *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {activities.map((activity) => (
                        <label key={activity} className="flex items-start gap-3 cursor-pointer group p-4 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-all duration-300">
                          <input
                            type="checkbox"
                            checked={formData.activities.includes(activity)}
                            onChange={() => handleCheckboxChange('activities', activity)}
                            className="w-5 h-5 text-[#7b3985] bg-gray-800 border-gray-600 rounded focus:ring-[#7b3985] focus:ring-2 mt-1"
                          />
                          <span className="text-[#F8F8F8] group-hover:text-[#b376bf] transition-colors duration-200 font-medium leading-relaxed">
                            {activity}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Previous Experience */}
                  <div className="bg-[#131422]/30 backdrop-blur-sm rounded-2xl p-6 border border-[#7b3985]/20">
                    <label className="block text-[#F8F8F8] font-semibold mb-4 text-lg">
                      {isRTL ? 'هل لديك خبرة سابقة في المجتمعات التقنية؟' : 'Do you have previous experience with communities or tech clubs?'}
                    </label>
                    <textarea
                      value={formData.previousExperience}
                      onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                      rows={4}
                      placeholder={isRTL ? 'شاركنا خبرتك السابقة...' : 'Share your previous experience...'}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Section 5: Future Vision */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#5c2663] to-[#7b3985] rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {isRTL ? '5. الرؤية المستقبلية' : '5. Future Vision'}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'أين ترى نفسك بعد 3 سنوات في المجال التقني؟' : 'Where do you see yourself in the tech industry in 3 years?'} *
                    </label>
                    <textarea
                      required
                      value={formData.futureVision}
                      onChange={(e) => handleInputChange('futureVision', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                      rows={4}
                      placeholder={isRTL ? 'شاركنا رؤيتك المستقبلية...' : 'Share your future vision...'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'إذا أتيح لك قيادة مشروع في Bitwreckers، ما نوع المشروع الذي تختاره؟' : 'If you had the chance to lead a project at Bitwreckers, what kind of project would you choose?'} *
                    </label>
                    <textarea
                      required
                      value={formData.projectIdea}
                      onChange={(e) => handleInputChange('projectIdea', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                      rows={4}
                      placeholder={isRTL ? 'وصف فكرة مشروعك...' : 'Describe your project idea...'}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Section 6: Agreement */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {isRTL ? '6. التأكيد النهائي' : '6. Final Confirmation'}
                  </h2>
                </div>

                <div className="bg-[#6B2D73]/10 border border-[#6B2D73]/30 rounded-xl p-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreement}
                      onChange={(e) => handleInputChange('agreement', e.target.checked)}
                      className="w-5 h-5 text-[#6B2D73] bg-gray-800 border-gray-600 rounded focus:ring-[#6B2D73] focus:ring-2 mt-1"
                    />
                    <span className="text-[#F8F8F8] group-hover:text-[#b376bf] transition-colors duration-200 leading-relaxed">
                      {isRTL 
                        ? 'أوافق على المشاركة ضمن مجتمع Bitwreckers بروح تعاونية والتزام أخلاقي. أتعهد بالمساهمة الإيجابية في المجتمع واحترام جميع الأعضاء.'
                        : 'I agree to participate in Bitwreckers with a collaborative and ethical spirit. I commit to positive contribution to the community and respect for all members.'
                      }
                    </span>
                  </label>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-center pt-8"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                    className="group relative px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-full font-bold text-lg sm:text-xl shadow-2xl hover:shadow-[#2D7363]/25 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        {isRTL ? 'جاري الإرسال...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" strokeWidth={2} />
                        {isRTL ? 'إرسال الطلب' : 'Send Application'}
                      </>
                    )}
                  </span>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#5fa896] to-[#8fd5c4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2D7363] to-[#5fa896] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
                  />
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Code, 
  Palette, 
  Rocket, 
  GraduationCap, 
  Settings, 
  MessageSquare, 
  Clock, 
  Calendar,
  CheckCircle,
  Send,
  Brain,
  Users,
  Lightbulb,
  Target,
  Upload,
  Star,
  Award,
  BookOpen
} from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';
import { submitConsultationRequest } from '../../lib/api';

export default function ConsultationPage() {
  const { t, isRTL } = useTranslation();
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    
    // Consultation Details
    consultationType: '',
    otherType: '',
    projectDescription: '',
    consultationFormat: '',
    duration: '',
    preferredTime: '',
    preferredDate: '',
    
    // Optional
    documents: null as File | null,
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      documents: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitConsultationRequest(formData);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can add error handling here
    } finally {
      setIsSubmitting(false);
    }
  };

  const consultationTypes = [
    'Software Development',
    'UI/UX Design', 
    'Startup & Innovation',
    'Career Guidance (Students & Developers)',
    'Project Management',
    'Other'
  ];

  const consultationFormats = [
    'Online Video Call (Zoom/Meet)',
    'Written Feedback',
    'In-Person Meeting (if possible)'
  ];

  const durations = [
    'Quick Advice (30 minutes)',
    'Deep Dive (1 hour)',
    'Full Workshop (Custom)'
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: isRTL ? 'فريق شبابي ملهم' : 'Young & Innovative Team',
      description: isRTL ? 'فريق من المطورين الشباب المتحمسين الذين يفهمون أحدث التقنيات' : 'A team of passionate young developers who understand the latest technologies'
    },
    {
      icon: Target,
      title: isRTL ? 'خبرة عملية بمشاريع حقيقية' : 'Hands-on Experience in Real Projects',
      description: isRTL ? 'خبرتنا مستمدة من مشاريع حقيقية وليس فقط النظرية' : 'Our experience comes from real projects, not just theory'
    },
    {
      icon: BookOpen,
      title: isRTL ? 'جمعنا بين الأكاديمي والعملي' : 'Academic + Industry Perspective',
      description: isRTL ? 'نربط بين المعرفة الأكاديمية والخبرة العملية في السوق' : 'We bridge academic knowledge with real-world industry experience'
    },
    {
      icon: Lightbulb,
      title: isRTL ? 'استشارة مصممة حسب حالتك' : 'Personalized Guidance',
      description: isRTL ? 'كل استشارة مصممة خصيصاً لاحتياجاتك وأهدافك' : 'Every consultation is tailored to your specific needs and goals'
    }
  ];

  const pricingPlans = [
    {
      name: isRTL ? 'الجلسة الأولى مجاناً' : 'First Session Free',
      price: isRTL ? 'مجاناً' : 'Free',
      description: isRTL ? 'جلسة استشارية مجانية لبناء الثقة' : 'Free consultation session to build trust',
      features: [
        isRTL ? 'تقييم أولي للمشروع' : 'Initial project assessment',
        isRTL ? 'نصائح أساسية' : 'Basic recommendations',
        isRTL ? 'خطة عمل مبدئية' : 'Initial action plan'
      ],
      popular: false
    },
    {
      name: isRTL ? 'جلسة استشارية عادية' : 'Standard Session',
      price: isRTL ? '50 دولار' : '$50',
      description: isRTL ? 'استشارة متخصصة مع خبير في المجال' : 'Specialized consultation with an expert in the field',
      features: [
        isRTL ? 'تحليل مفصل للمشروع' : 'Detailed project analysis',
        isRTL ? 'استراتيجية تطوير شاملة' : 'Comprehensive development strategy',
        isRTL ? 'متابعة لمدة أسبوع' : 'One-week follow-up'
      ],
      popular: true
    },
    {
      name: isRTL ? 'باقة الشركات الناشئة' : 'Startup Package',
      price: isRTL ? 'اختياري' : 'Optional',
      description: isRTL ? 'دعم طويل الأمد للشركات الناشئة' : 'Long-term support for startups',
      features: [
        isRTL ? 'استشارات شهرية' : 'Monthly consultations',
        isRTL ? 'مراجعة دورية للمشروع' : 'Regular project reviews',
        isRTL ? 'دعم تقني مستمر' : 'Ongoing technical support'
      ],
      popular: false
    }
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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight"
          >
            {isRTL ? 'تم إرسال طلب الاستشارة بنجاح!' : 'Consultation Request Submitted Successfully!'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-[#F8F8F8] mb-8"
          >
            {isRTL 
              ? 'شكراً لك! سنتواصل معك خلال 24 ساعة لتحديد موعد الاستشارة.' 
              : 'Thank you! We\'ll contact you within 24 hours to schedule your consultation.'
            }
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => setShowSuccess(false)}
            className="px-8 py-4 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] text-white rounded-full font-semibold hover:from-[#9347a0] hover:to-[#b376bf] transition-all duration-300"
          >
            {isRTL ? 'إرسال طلب آخر' : 'Submit Another Request'}
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

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-gradient-to-r from-[#6B2D73]/20 to-[#2D7363]/20 border border-[#6B2D73]/30 rounded-full text-[#d4aad9] font-semibold text-sm backdrop-blur-sm">
              {isRTL ? 'استشارة تقنية متخصصة' : 'Expert Tech Consultation'}
            </span>
          </motion.div>
          
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isRTL ? 'احصل على استشارة تقنية متخصصة' : 'Get Expert Tech Consultation'}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-[#F8F8F8] max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isRTL 
              ? 'خبراؤنا يقدمون إرشادات مخصصة في تطوير البرمجيات والتصميم والشركات الناشئة والنمو المهني. احجز جلستك اليوم واتخذ الخطوة التالية.'
              : 'Our experts provide personalized guidance in software development, design, startups, and career growth. Book your session today and take the next step forward.'
            }
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-[#2D7363]/25 transition-all duration-300"
            onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {isRTL ? 'احجز استشارة' : 'Book a Consultation'}
          </motion.button>

          {/* Decorative Line */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-[#6B2D73] via-[#9347a0] to-[#2D7363] mx-auto rounded-full mt-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.div>

        {/* Why Choose Bitwreckers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {isRTL ? 'لماذا تختار Bitwreckers؟' : 'Why Choose Bitwreckers?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#b376bf] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#F8F8F8]/80 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Consultation Form */}
        <motion.div
          id="consultation-form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-[#131422]/50 backdrop-blur-xl rounded-3xl border border-[#6B2D73]/20 p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
                {isRTL ? 'طلب الاستشارة' : 'Consultation Request'}
              </h2>
              <p className="text-[#F8F8F8]/80 text-lg">
                {isRTL ? 'املأ النموذج أدناه وسنتواصل معك قريباً' : 'Fill out the form below and we\'ll get back to you soon'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {isRTL ? 'المعلومات الشخصية' : 'Personal Information'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'رقم الهاتف' : 'Phone Number'} {isRTL ? '(اختياري)' : '(optional)'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      placeholder={isRTL ? '+962 79 123 4567' : '+962 79 123 4567'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'المنظمة / الجامعة / الشركة' : 'Organization / University / Company'}
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      placeholder={isRTL ? 'الجامعة الأردنية' : 'University of Jordan'}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Consultation Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {isRTL ? 'تفاصيل الاستشارة' : 'Consultation Details'}
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-3">
                      {isRTL ? 'نوع الاستشارة' : 'Consultation Type'} *
                    </label>
                    <select
                      required
                      value={formData.consultationType}
                      onChange={(e) => handleInputChange('consultationType', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                    >
                      <option value="">{isRTL ? 'اختر نوع الاستشارة' : 'Select consultation type'}</option>
                      {consultationTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    
                    {/* Other type input */}
                    {formData.consultationType === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <label className="block text-[#F8F8F8] font-semibold mb-2">
                          {isRTL ? 'يرجى تحديد نوع الاستشارة:' : 'Please specify the consultation type:'} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.otherType}
                          onChange={(e) => handleInputChange('otherType', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                          placeholder={isRTL ? 'اكتب نوع الاستشارة هنا...' : 'Enter consultation type here...'}
                        />
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'وصف مشروعك/مشكلتك' : 'Describe your project/problem'} *
                    </label>
                    <textarea
                      required
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                      rows={4}
                      placeholder={isRTL ? 'مثال: "أبني تطبيق شركة ناشئة وأحتاج مساعدة في المعمارية والتوسع"' : 'e.g., "I\'m building a startup app and need help with architecture & scaling."'}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[#F8F8F8] font-semibold mb-3">
                        {isRTL ? 'تنسيق الاستشارة المفضل' : 'Preferred Consultation Format'} *
                      </label>
                      <select
                        required
                        value={formData.consultationFormat}
                        onChange={(e) => handleInputChange('consultationFormat', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      >
                        <option value="">{isRTL ? 'اختر التنسيق' : 'Select format'}</option>
                        {consultationFormats.map((format) => (
                          <option key={format} value={format}>{format}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#F8F8F8] font-semibold mb-3">
                        {isRTL ? 'المدة المفضلة' : 'Preferred Duration'} *
                      </label>
                      <select
                        required
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      >
                        <option value="">{isRTL ? 'اختر المدة' : 'Select duration'}</option>
                        {durations.map((duration) => (
                          <option key={duration} value={duration}>{duration}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#F8F8F8] font-semibold mb-2">
                        {isRTL ? 'التاريخ المفضل' : 'Preferred Date'}
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'الوقت المفضل' : 'Preferred Time'}
                    </label>
                    <input
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Optional Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] rounded-xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {isRTL ? 'معلومات إضافية (اختياري)' : 'Additional Information (Optional)'}
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'رفع مستندات داعمة' : 'Upload Supporting Documents'}
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#6B2D73] file:text-white hover:file:bg-[#9347a0]"
                    />
                    <p className="text-sm text-[#F8F8F8]/60 mt-2">
                      {isRTL ? 'يمكنك رفع: Pitch Deck، Wireframes، Project Brief' : 'You can upload: Pitch Deck, Wireframes, Project Brief'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[#F8F8F8] font-semibold mb-2">
                      {isRTL ? 'ملاحظات إضافية' : 'Additional Notes'}
                    </label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#b376bf] focus:outline-none transition-colors duration-300 resize-none"
                      rows={3}
                      placeholder={isRTL ? 'أي معلومات إضافية تريد مشاركتها...' : 'Any additional information you\'d like to share...'}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-center pt-8"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-6 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-[#2D7363]/25 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
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
                        {isRTL ? 'إرسال طلب الاستشارة' : 'Send Consultation Request'}
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

        {/* Pricing Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {isRTL ? 'خطط الأسعار' : 'Pricing Plans'}
            </h2>
            <p className="text-[#F8F8F8]/80 text-lg max-w-2xl mx-auto">
              {isRTL 
                ? 'هذه الخطط التي نقدمها والجلسة الأولى مجانية'
                : 'These are the plans we offer and the first session is free'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className={`relative bg-[#131422]/50 backdrop-blur-xl rounded-3xl border p-8 ${
                  plan.popular 
                    ? 'border-[#2D7363] shadow-2xl shadow-[#2D7363]/20' 
                    : 'border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-2 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-full text-sm font-semibold">
                      {isRTL ? 'الأكثر شعبية' : 'Most Popular'}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent mb-2">
                    {plan.price}
                  </div>
                  <p className="text-[#F8F8F8]/80">{plan.description}</p>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2D7363] flex-shrink-0" strokeWidth={2} />
                      <span className="text-[#F8F8F8]/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-[#6B2D73]/20 to-[#2D7363]/20 backdrop-blur-xl rounded-3xl border border-[#6B2D73]/30 p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {isRTL ? 'فكرتك الكبيرة التالية تستحق الإرشاد الصحيح. دعنا نبنيها معاً.' : 'Your next big idea deserves the right guidance. Let\'s build it together.'}
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-[#2D7363]/25 transition-all duration-300"
              onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {isRTL ? 'احجز استشارة الآن' : 'Book Consultation Now'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

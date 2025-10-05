'use client';

import { motion } from 'framer-motion';
import { Clock, BookOpen, Code, Lightbulb } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

export default function TutorialsPage() {
  const { t, isRTL } = useTranslation();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-[#131422] to-gray-900 ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 pt-24 pb-20">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-full mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BookOpen className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isRTL ? 'قريباً' : 'Coming Soon'}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-[#F8F8F8] max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {isRTL 
              ? 'نعمل على إعداد مجموعة شاملة من الدروس والبرامج التعليمية لمساعدتك في رحلة التعلم التقني'
              : 'We\'re preparing a comprehensive collection of tutorials and educational content to help you in your tech learning journey'
            }
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 text-[#b376bf] text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Clock className="w-5 h-5" />
            <span>{isRTL ? 'قريباً جداً' : 'Very Soon'}</span>
          </motion.div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Programming Tutorials */}
          <motion.div
            className="bg-gradient-to-br from-[#6B2D73]/20 to-[#9347a0]/20 rounded-2xl p-6 border border-[#6B2D73]/30 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {isRTL ? 'دروس البرمجة' : 'Programming Tutorials'}
            </h3>
            <p className="text-gray-300 text-sm">
              {isRTL 
                ? 'دروس شاملة في مختلف لغات البرمجة والتقنيات الحديثة'
                : 'Comprehensive tutorials in various programming languages and modern technologies'
              }
            </p>
          </motion.div>

          {/* Web Development */}
          <motion.div
            className="bg-gradient-to-br from-[#2D7363]/20 to-[#5fa896]/20 rounded-2xl p-6 border border-[#2D7363]/30 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-[#2D7363] to-[#5fa896] rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {isRTL ? 'تطوير الويب' : 'Web Development'}
            </h3>
            <p className="text-gray-300 text-sm">
              {isRTL 
                ? 'دروس متخصصة في تطوير المواقع والتطبيقات الويب'
                : 'Specialized tutorials in website and web application development'
              }
            </p>
          </motion.div>

          {/* Tech Tips */}
          <motion.div
            className="bg-gradient-to-br from-[#9347a0]/20 to-[#b376bf]/20 rounded-2xl p-6 border border-[#9347a0]/30 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-lg flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {isRTL ? 'نصائح تقنية' : 'Tech Tips'}
            </h3>
            <p className="text-gray-300 text-sm">
              {isRTL 
                ? 'نصائح وحيل مفيدة لتطوير مهاراتك التقنية'
                : 'Useful tips and tricks to enhance your technical skills'
              }
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={() => window.open('/consultation', '_blank')}
            className="px-8 py-4 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-[#6B2D73]/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRTL ? 'احجز استشارة' : 'Book a Consultation'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

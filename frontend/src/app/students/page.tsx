'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function StudentsPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
        style={{ width: progressWidth }}
      />
      
      {/* Simple Test Content */}
      <div className="container mx-auto px-4 py-20">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Students Page - صفحة الطلاب
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          This is a test page to verify routing is working correctly
          هذه صفحة اختبار للتأكد من أن التوجيه يعمل بشكل صحيح
        </motion.p>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-lg text-green-600">Page is working! الصفحة تعمل!</p>
        </motion.div>
      </div>
    </div>
  );
}

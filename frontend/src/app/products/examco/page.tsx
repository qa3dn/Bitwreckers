'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Code, Target, CheckCircle, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import useTranslation from '../../../hooks/useTranslation';

export default function ExamcoPage() {
  const { isRTL } = useTranslation();

  const features = [
    {
      title: 'Practice Real Questions',
      description: 'Access and practice questions from previous years to understand exam patterns and expectations',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: 'Test with Recommended Exercises',
      description: 'Challenge yourself with instructor-recommended exercises tailored to your specific courses',
      icon: <Target className="w-6 h-6" />
    },
    {
      title: 'Track Progress & Improvement',
      description: 'Monitor your progress over time and identify your strengths and areas for improvement',
      icon: <Star className="w-6 h-6" />
    },
    {
      title: 'Youth-Driven Platform',
      description: 'Designed specifically for university students with a supportive digital learning space',
      icon: <Users className="w-6 h-6" />
    }
  ];

  const techStack = [
    'Next.js', 'AI/ML', 'PostgreSQL', 'React', 'TypeScript', 'Tailwind CSS', 'OpenAI API'
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] text-white ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-6xl px-4 py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block p-4 bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 rounded-2xl border border-[#9347a0]/30 mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto p-2">
              <img 
                src="/examco-logo.png" 
                alt="Examco Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#e6d1ea] bg-clip-text text-transparent">
            Examco
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            At Examco, we believe exam preparation should be smarter, not harder.
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="font-semibold">In Development - 85% Complete</span>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Our mission is to make studying more efficient, engaging, and stress-free by providing a centralized hub where students can:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#b376bf] mt-1">•</span>
                <span>Practice Real Questions - Access and practice questions from previous years to understand exam patterns and expectations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b376bf] mt-1">•</span>
                <span>Test with Recommended Exercises - Challenge yourself with instructor-recommended exercises tailored to your specific courses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b376bf] mt-1">•</span>
                <span>Track Progress & Improvement - Monitor your progress over time and identify your strengths and areas for improvement</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              With Examco, students gain the confidence they need to face exams fully prepared.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We're building more than just a study tool – we're creating a supportive digital space where learners can practice, improve, and succeed together.
            </p>
          </div>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              About Examco
            </h2>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We are a youth-driven platform designed specifically for university students to access and practice past exam questions 
                and curated suggested questions tailored to their courses. Our platform serves as a centralized hub where students can 
                access high-quality study resources and practice materials.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Examco is more than just a study tool – it's a comprehensive learning ecosystem that empowers students to excel in their 
                academic journey through smart, efficient, and engaging exam preparation.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#b376bf]" />
                  <div>
                    <p className="text-gray-400 text-sm">Start Date</p>
                    <p className="text-white font-semibold">January 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#b376bf]" />
                  <div>
                    <p className="text-gray-400 text-sm">Team</p>
                    <p className="text-white font-semibold">Bitwreckers Development Team</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#b376bf]" />
                  <div>
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white font-semibold">Education</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Development Progress</span>
                  <span className="text-white font-semibold">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#9347a0] to-[#b376bf] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-gray-400 text-sm">Expected Launch: Q2 2024</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            Technology Stack
          </h2>
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-6 py-3 bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 border border-[#9347a0]/30 rounded-full text-white font-semibold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 backdrop-blur-xl rounded-3xl border border-[#9347a0]/30 p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              Interested in ExamCo?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get early access or learn more about our development progress
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open('/consultation', '_blank')}
                className="px-8 py-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#9347a0]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Early Access
              </motion.button>
              <motion.button
                onClick={() => window.open('/join', '_blank')}
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Development Team
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

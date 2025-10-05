'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Code, Target, CheckCircle, Clock, Star, MapPin, Calendar as CalendarIcon, Users2, Trophy } from 'lucide-react';
import Link from 'next/link';
import useTranslation from '../../../hooks/useTranslation';

export default function UniversityClubsHubPage() {
  const { isRTL } = useTranslation();

  const features = [
    {
      title: 'Comprehensive Club Directory',
      description: 'Complete database of all university clubs and organizations across Jordan',
      icon: <Users2 className="w-6 h-6" />
    },
    {
      title: 'Event Discovery',
      description: 'Find and join university events, workshops, and activities',
      icon: <CalendarIcon className="w-6 h-6" />
    },
    {
      title: 'Location-Based Services',
      description: 'Discover nearby events and clubs using advanced mapping technology',
      icon: <MapPin className="w-6 h-6" />
    },
    {
      title: 'Achievement Tracking',
      description: 'Track your participation and earn recognition for club activities',
      icon: <Trophy className="w-6 h-6" />
    }
  ];

  const techStack = [
    'React Native', 'Firebase', 'Maps API', 'Social', 'Node.js', 'MongoDB', 'Push Notifications'
  ];

  const targetUniversities = [
    'University of Jordan',
    'Jordan University of Science and Technology',
    'Yarmouk University',
    'Hashemite University',
    'Al-Balqa Applied University',
    'Princess Sumaya University for Technology',
    'German Jordanian University',
    'American University of Madaba'
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
            <div className="w-20 h-20 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">🏛️</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#e6d1ea] bg-clip-text text-transparent">
            University Clubs Hub
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Comprehensive app for all university clubs, activities, and events across Jordan
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="font-semibold">In Planning - 30% Complete</span>
          </div>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              Project Overview
            </h2>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                University Clubs Hub is a comprehensive mobile application designed to connect Jordanian university students 
                with campus life. The app serves as a centralized platform for discovering clubs, events, and activities 
                across all major universities in Jordan.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                By bringing together students from different universities and providing easy access to campus activities, 
                the app fosters a vibrant academic community and enhances the overall university experience.
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
                    <p className="text-white font-semibold">May 2024</p>
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
                    <p className="text-white font-semibold">Social</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Development Progress</span>
                  <span className="text-white font-semibold">30%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#9347a0] to-[#b376bf] h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <p className="text-gray-400 text-sm">Expected Launch: Q2 2025</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Target Universities */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            Target Universities
          </h2>
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {targetUniversities.map((university, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-[#9347a0]/10 to-[#b376bf]/10 border border-[#9347a0]/20 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-white font-semibold text-sm">{university}</p>
                </motion.div>
              ))}
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
              Ready to Connect University Life?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join us in building the ultimate platform for Jordanian university students
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open('/consultation', '_blank')}
                className="px-8 py-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#9347a0]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Partner With Us
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

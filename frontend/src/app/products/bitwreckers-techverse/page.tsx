'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Code, Target, CheckCircle, Clock, Star, Globe, Zap, Users2, ShoppingBag, BookOpen, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import useTranslation from '../../../hooks/useTranslation';

export default function BitwreckersTechversePage() {
  const { isRTL } = useTranslation();

  const features = [
    {
      title: 'Specialized Tech Media',
      description: 'High-quality content covering AI, AR/VR, Web3, and digital economy trends',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: 'Social Interaction Hub',
      description: 'Connect with tech enthusiasts, share ideas, and build meaningful relationships',
      icon: <Users2 className="w-6 h-6" />
    },
    {
      title: 'Interactive Learning',
      description: 'Hands-on tutorials, workshops, and courses for skill development',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'Digital Marketplace',
      description: 'Buy and sell tech products, services, and digital assets',
      icon: <ShoppingBag className="w-6 h-6" />
    },
    {
      title: 'Community Forums',
      description: 'Engage in discussions, ask questions, and get expert advice',
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      title: 'Global Reach',
      description: 'Bridging Arab culture with global tech trends and innovations',
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const techStack = [
    'Next.js', 'AI', 'Web3', 'Media', 'React', 'TypeScript', 'Blockchain', 'AR/VR'
  ];

  const keyObjectives = [
    {
      title: 'Educational',
      description: 'Provide free and paid learning resources to develop technical skills, targeting 50% of users to earn certificates or achievements within the first year',
      icon: '📚'
    },
    {
      title: 'Interactive',
      description: 'Build a community exceeding one million monthly interactions, encouraging positive discussions and cross-border collaboration',
      icon: '💬'
    },
    {
      title: 'Media-Oriented',
      description: 'Cover 80% of global tech events with an Arab perspective, increasing awareness of local impacts',
      icon: '📰'
    },
    {
      title: 'Economic',
      description: 'Facilitate 10,000 job or freelance opportunities annually, generating revenues of up to $5 million in the third year through subscriptions and ads',
      icon: '💰'
    },
    {
      title: 'Innovative',
      description: 'Integrate AI into 70% of features to deliver personalized, sustainable experiences, prioritizing privacy and environmental sustainability',
      icon: '🤖'
    }
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
              <span className="text-3xl">🚀</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#e6d1ea] bg-clip-text text-transparent">
            Bitwreckers Techverse
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Comprehensive tech-media platform integrating specialized media, social interaction, and digital marketplace
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="font-semibold">In Planning - 20% Complete</span>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              Vision
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Bitwreckers Techverse is an Arab-originated tech-media platform designed to be a global hub for 
              technological innovation, integrating specialized media, social interaction, interactive learning, 
              and a digital marketplace. We aim to build a vibrant tech community that empowers Arab and global 
              youth to explore technology, share ideas, and create sustainable career paths.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              Mission
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              "We are reshaping the technological future by empowering individuals and communities with 
              cutting-edge, interactive, and innovative knowledge. Bitwreckers Techverse is not just a platform; 
              it is a movement that combines inspiration with practical action, transforming ideas into reality 
              to drive societal and economic progress in the Arab world and beyond."
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
              Project Overview
            </h2>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                In a world driven by rapid advancements in artificial intelligence (AI), augmented/virtual reality (AR/VR), 
                and the digital economy (Web3/DeFi), Bitwreckers Techverse aims to blend Arab culture with global trends, 
                creating a "Techverse" that fosters local innovation and bridges the digital divide.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                By 2030, we aspire to reach one million active users, establish global partnerships, and make a positive 
                impact on the Arab digital economy through our comprehensive platform.
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
                    <p className="text-white font-semibold">June 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#b376bf]" />
                  <div>
                    <p className="text-gray-400 text-sm">Team</p>
                    <p className="text-white font-semibold">Bitwreckers Core Team</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#b376bf]" />
                  <div>
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white font-semibold">Tech Media</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Development Progress</span>
                  <span className="text-white font-semibold">20%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#9347a0] to-[#b376bf] h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <p className="text-gray-400 text-sm">Expected Launch: Q3 2025</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Objectives */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            Key Objectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyObjectives.map((objective, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{objective.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{objective.title}</h3>
                    <p className="text-gray-300 text-sm">{objective.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
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
          transition={{ duration: 0.8, delay: 0.7 }}
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
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
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
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 backdrop-blur-xl rounded-3xl border border-[#9347a0]/30 p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              Join the Techverse Revolution
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of the movement that's reshaping the technological future in the Arab world and beyond
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open('/consultation', '_blank')}
                className="px-8 py-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#9347a0]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Early Access
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

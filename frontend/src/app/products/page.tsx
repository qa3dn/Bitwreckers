'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Users, Target, Zap, Globe, MessageSquare, Calendar, CheckCircle, Star, Building2, Handshake } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

export default function ProductsPage() {
  const { t, isRTL } = useTranslation();

  const products = [
    {
      id: 'examco',
      title: 'Examco',
      description: 'Comprehensive platform for university course questions and exam preparation with AI-powered study tools',
      icon: '📚',
      status: 'In Development - 85%',
      category: 'Education',
      href: '/products/examco'
    },
    {
      id: 'project-portfolio-hub',
      title: 'Project Portfolio Hub',
      description: 'Centralized platform connecting students, supervisors, and companies through graduation projects',
      icon: '📁',
      status: 'In Development - 70%',
      category: 'Education',
      href: '/products/project-portfolio-hub'
    },
    {
      id: 'teacher-platform',
      title: 'Teacher Platform',
      description: 'Personal website platform for teachers with lectures, exams, digital store, and student management',
      icon: '👨‍💼',
      status: 'In Development - 60%',
      category: 'Education',
      href: '/products/teacher-platform'
    },
    {
      id: 'ai-fragrance-finder',
      title: 'AI Fragrance Finder',
      description: 'AI-powered app suggesting global fragrances based on scent components with direct purchase integration',
      icon: '🤖',
      status: 'In Development - 40%',
      category: 'AI & E-commerce',
      href: '/products/ai-fragrance-finder'
    },
    {
      id: 'university-clubs-hub',
      title: 'University Clubs Hub',
      description: 'Comprehensive app for all university clubs, activities, and events across Jordan',
      icon: '🏛️',
      status: 'In Planning - 30%',
      category: 'Social',
      href: '/products/university-clubs-hub'
    },
    {
      id: 'bitwreckers-techverse',
      title: 'Bitwreckers Techverse',
      description: 'Comprehensive tech-media platform integrating specialized media, social interaction, and digital marketplace',
      icon: '🚀',
      status: 'In Planning - 20%',
      category: 'Tech Media',
      href: '/products/bitwreckers-techverse'
    }
  ];

  const partnershipBenefits = [
    {
      title: t('products.technicalExpertise'),
      description: t('products.technicalExpertiseDescription'),
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: t('products.marketKnowledge'),
      description: t('products.marketKnowledgeDescription'),
      icon: <Target className="w-6 h-6" />
    },
    {
      title: t('products.innovationFocus'),
      description: t('products.innovationFocusDescription'),
      icon: <Star className="w-6 h-6" />
    },
    {
      title: t('products.globalReach'),
      description: t('products.globalReachDescription'),
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const whyPartnerWithUs = [
    {
      title: t('products.provenTrackRecord'),
      description: t('products.provenTrackDescription'),
      icon: <CheckCircle className="w-8 h-8" />
    },
    {
      title: t('products.youthDrivenInnovation'),
      description: t('products.youthDrivenDescription'),
      icon: <Users className="w-8 h-8" />
    },
    {
      title: t('products.comprehensiveSupport'),
      description: t('products.comprehensiveSupportDescription'),
      icon: <Handshake className="w-8 h-8" />
    },
    {
      title: t('products.futureReadySolutions'),
      description: t('products.futureReadyDescription'),
      icon: <Building2 className="w-8 h-8" />
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] text-white ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#e6d1ea] bg-clip-text text-transparent">
            {t('products.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Product Header */}
              <div className="relative h-32 bg-gradient-to-br from-[#9347a0]/10 to-[#b376bf]/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9347a0]/20 to-[#b376bf]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-lg">{product.icon}</span>
                    </div>
                    <p className="text-gray-400 text-sm font-semibold">{t('products.underDevelopment')}</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#9347a0]/20 text-[#d4aad9] border border-[#9347a0]/30 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#b376bf] transition-colors duration-300">
                  {product.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                  {product.description}
                </p>

                {/* Action Button */}
                <Link href={product.href}>
                  <motion.button
                    className="w-full px-4 py-2 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-lg font-semibold text-sm hover:from-[#7b3985] hover:to-[#9347a0] transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
{t('products.viewDetails')}
                  </motion.button>
                </Link>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#9347a0]/10 to-[#b376bf]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Why Partner With Us Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('products.whyPartnerWithUs')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('products.whyPartnerSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {whyPartnerWithUs.map((reason, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-gray-300 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
              {t('products.readyToPartner')}
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('products.readyToPartnerSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open('/consultation', '_blank')}
                className="px-8 py-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#9347a0]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-5 h-5 inline mr-2" />
{t('products.bookConsultation')}
              </motion.button>
              <motion.button
                onClick={() => window.open('/join', '_blank')}
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5 inline mr-2" />
{t('products.joinOurTeam')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
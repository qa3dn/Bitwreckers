'use client';

import { motion } from 'framer-motion';
import { 
  Users,
  Heart,
  Globe,
  Share2,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { 
  FaFacebook, 
  FaTelegram, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import useTranslation from '../../hooks/useTranslation';

export default function CommunityPage() {
  const { t, isRTL } = useTranslation();

  const socialLinks = [
    {
      name: t('community.facebook'),
      icon: FaFacebook,
      url: 'https://facebook.com/bitwreckers',
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-500 hover:to-blue-600',
      description: t('community.facebookDescription')
    },
    {
      name: t('community.twitter'),
      icon: FaXTwitter,
      url: 'https://x.com/bitwreckers',
      color: 'from-gray-800 to-gray-900',
      hoverColor: 'hover:from-gray-700 hover:to-gray-800',
      description: t('community.twitterDescription')
    },
    {
      name: t('community.instagram'),
      icon: FaInstagram,
      url: 'https://instagram.com/bitwreckers',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-400 hover:to-purple-500',
      description: t('community.instagramDescription')
    },
    {
      name: t('community.telegram'),
      icon: FaTelegram,
      url: 'https://t.me/bitwreckers',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-400 hover:to-blue-500',
      description: t('community.telegramDescription')
    },
    {
      name: t('community.linkedin'),
      icon: FaLinkedin,
      url: 'https://linkedin.com/company/bitwreckers',
      color: 'from-blue-700 to-blue-800',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      description: t('community.linkedinDescription')
    },
    {
      name: t('community.github'),
      icon: FaGithub,
      url: 'https://github.com/bitwreckers',
      color: 'from-gray-700 to-gray-800',
      hoverColor: 'hover:from-gray-600 hover:to-gray-700',
      description: t('community.githubDescription')
    }
  ];

  const communityStats = [
    { label: t('community.communityMembers'), value: '2,500+', icon: Users },
    { label: t('community.activeContributors'), value: '150+', icon: Heart },
    { label: t('community.projectsShared'), value: '50+', icon: Globe },
    { label: t('community.knowledgeExchanged'), value: '∞', icon: Share2 }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-[#131422] to-gray-900 ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 sm:pb-20">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 backdrop-blur-xl rounded-full px-6 py-3 border border-[#9347a0]/30 mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Zap className="w-5 h-5 text-[#b376bf]" />
            <span className="text-[#b376bf] font-semibold">{t('community.joinCommunity')}</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#e6d1ea] bg-clip-text text-transparent">
            {t('community.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('community.subtitle')}
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* WhatsApp Community Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 backdrop-blur-xl rounded-3xl border border-green-500/30 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaWhatsapp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('community.whatsappTitle')}
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('community.whatsappDescription')}
              </p>
            </div>

            <motion.a
              href="https://chat.whatsapp.com/Hg7P6WJorc79CGQAzLoidc"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-md mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white rounded-2xl p-6 text-center font-bold text-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                <div className="flex items-center justify-center gap-3">
                  <FaWhatsapp className="w-6 h-6" />
                  <span>{t('community.joinWhatsappGroup')}</span>
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('community.socialMediaTitle')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('community.socialMediaDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 h-full transition-all duration-300 group-hover:border-gray-600/50">
                  <div className={`w-12 h-12 bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-xl flex items-center justify-center mb-4 transition-all duration-300`}>
                    <social.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#b376bf] transition-colors duration-300">
                    {social.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {social.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-[#b376bf] text-sm font-semibold group-hover:text-[#d4aad9] transition-colors duration-300">
                    <span>{t('community.followBitwreckers')}</span>
                    <ArrowLeft className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.a>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('community.ctaTitle')}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('community.ctaDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://chat.whatsapp.com/Hg7P6WJorc79CGQAzLoidc"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('community.joinWhatsappGroup')}
              </motion.a>
              
              <motion.a
                href="/contact"
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('community.contactUs')}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

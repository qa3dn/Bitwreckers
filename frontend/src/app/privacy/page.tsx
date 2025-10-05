'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Users } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

export default function PrivacyPage() {
  const { t, isRTL } = useTranslation();

  const privacySections = [
    {
      icon: Database,
      title: t('privacy.informationWeCollect.title'),
      content: t('privacy.informationWeCollect.content')
    },
    {
      icon: Eye,
      title: t('privacy.howWeUse.title'),
      content: t('privacy.howWeUse.content')
    },
    {
      icon: Shield,
      title: t('privacy.informationSharing.title'),
      content: t('privacy.informationSharing.content')
    },
    {
      icon: Lock,
      title: t('privacy.dataSecurity.title'),
      content: t('privacy.dataSecurity.content')
    },
    {
      icon: Users,
      title: t('privacy.yourRights.title'),
      content: t('privacy.yourRights.content')
    }
  ];

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 backdrop-blur-xl rounded-full px-6 py-3 border border-[#9347a0]/30 mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Shield className="w-5 h-5 text-[#b376bf]" />
            <span className="text-[#b376bf] font-semibold">{t('privacy.title')}</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#e6d1ea] bg-clip-text text-transparent">
            {t('privacy.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('privacy.subtitle')}
          </p>
          
          <p className="text-gray-400 text-sm">
            {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* Privacy Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {privacySections.map((section, index) => (
            <motion.div
              key={section.title}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 backdrop-blur-xl rounded-3xl border border-[#9347a0]/30 p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('privacy.questionsTitle')}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('privacy.questionsSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#9347a0]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('privacy.contactUs')}
              </motion.a>
              
              <motion.a
                href="mailto:bitwreckers@gmail.com"
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('privacy.emailUs')}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

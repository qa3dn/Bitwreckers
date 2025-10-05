'use client';

import { motion } from 'framer-motion';
import useTranslation from '../../hooks/useTranslation';

export default function CommunitySection() {
  const { t, isRTL } = useTranslation();

  const networkStats = {
    totalMembers: 2500,
    activeStudents: 1200,
    experts: 150,
    mentors: 80,
    graduates: 1070
  };

  return (
    <section className={`pt-40 pb-20 px-4 relative mt-20 ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#e6d1ea] bg-clip-text text-transparent">
            {t('community.title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            {t('community.subtitle')}
          </p>
        </motion.div>

        {/* Network Stats */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {Object.entries(networkStats).map(([key, value], index) => (
              <motion.div
                key={key}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
                  <div className="text-3xl font-bold text-white mb-2">{value.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">
                    {key === 'totalMembers' && 'Total Members'}
                    {key === 'activeStudents' && 'Active Students'}
                    {key === 'experts' && 'Experts'}
                    {key === 'mentors' && 'Mentors'}
                    {key === 'graduates' && 'Graduates'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 backdrop-blur-xl rounded-3xl border border-[#9347a0]/30 p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('community.ctaTitle')}
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('community.ctaDescription')}
            </p>
            
            <div className="flex justify-center">
              <motion.a
                href="/community"
                className="px-8 py-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#9347a0]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('community.joinCommunity')}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

const benefits = [
  {
    icon: '👨‍🏫',
    title: 'Mentorship',
    description: 'students.benefits.mentorship',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '🎯',
    title: 'Code Reviews',
    description: 'students.benefits.codeReviews',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: '💰',
    title: 'Stipends',
    description: 'students.benefits.stipends',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: '🏢',
    title: 'Real Clients',
    description: 'students.benefits.realClients',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: '🎪',
    title: 'Showcase',
    description: 'students.benefits.showcase',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function Benefits() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-3xl mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {benefit.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(benefit.description)}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600 font-semibold">{t('benefits.stats.mentorship')}</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">$5K+</div>
            <div className="text-gray-600 font-semibold">{t('benefits.stats.averageStipend')}</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600 font-semibold">{t('benefits.stats.clients')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

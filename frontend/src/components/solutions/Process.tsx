'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

const processSteps = [
  {
    id: 1,
    title: 'Discovery',
    description: 'solutions.process.discovery',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-500',
    duration: '1-2 weeks'
  },
  {
    id: 2,
    title: 'Architecture',
    description: 'solutions.process.architecture',
    icon: '🏗️',
    color: 'from-purple-500 to-pink-500',
    duration: '1 week'
  },
  {
    id: 3,
    title: 'Sprint',
    description: 'solutions.process.sprint',
    icon: '⚡',
    color: 'from-green-500 to-emerald-500',
    duration: '2-4 weeks'
  },
  {
    id: 4,
    title: 'Handover',
    description: 'solutions.process.handover',
    icon: '🤝',
    color: 'from-orange-500 to-red-500',
    duration: '1 week'
  },
  {
    id: 5,
    title: 'QA',
    description: 'solutions.process.qa',
    icon: '✅',
    color: 'from-indigo-500 to-purple-500',
    duration: '1 week'
  },
  {
    id: 6,
    title: 'Delivery',
    description: 'solutions.process.delivery',
    icon: '🚀',
    color: 'from-yellow-500 to-orange-500',
    duration: '1 day'
  }
];

export default function Process() {
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
            {t('process.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('process.subtitle')}
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mb-6 mx-auto`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {t(step.description)}
                    </p>
                    <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {step.duration}
                    </div>
                  </div>

                  {/* Arrow for mobile */}
                  {index < processSteps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-6">
                      <motion.div
                        className="w-6 h-6 text-gray-400"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ↓
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">6-8</div>
            <div className="text-gray-600 font-semibold">{t('process.stats.weeks')}</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600 font-semibold">{t('process.stats.transparency')}</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600 font-semibold">{t('process.stats.support')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

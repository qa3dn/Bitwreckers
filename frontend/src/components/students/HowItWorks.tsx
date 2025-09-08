'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const steps = [
  {
    id: 1,
    title: 'Apply',
    description: 'students.howItWorks.apply',
    icon: '📝',
    color: 'from-blue-500 to-cyan-500',
    delay: 0.2
  },
  {
    id: 2,
    title: 'Challenge',
    description: 'students.howItWorks.challenge',
    icon: '🎯',
    color: 'from-purple-500 to-pink-500',
    delay: 0.4
  },
  {
    id: 3,
    title: 'Sprint Team',
    description: 'students.howItWorks.sprintTeam',
    icon: '👥',
    color: 'from-green-500 to-emerald-500',
    delay: 0.6
  },
  {
    id: 4,
    title: 'Ship',
    description: 'students.howItWorks.ship',
    icon: '🚀',
    color: 'from-orange-500 to-red-500',
    delay: 0.8
  }
];

export default function HowItWorks() {
  const t = useTranslations('students');

  return (
    <section className="py-20 bg-white">
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
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: step.delay }}
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
                    <p className="text-gray-600 leading-relaxed">
                      {t(step.description)}
                    </p>
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
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

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('howItWorks.startJourney')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

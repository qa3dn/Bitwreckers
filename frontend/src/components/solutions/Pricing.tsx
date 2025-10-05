'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$5,000',
    duration: '4-6 weeks',
    description: 'solutions.pricing.starter.description',
    features: [
      'solutions.pricing.starter.feature1',
      'solutions.pricing.starter.feature2',
      'solutions.pricing.starter.feature3',
      'solutions.pricing.starter.feature4'
    ],
    color: 'from-blue-500 to-cyan-500',
    popular: false
  },
  {
    name: 'Professional',
    price: '$15,000',
    duration: '6-8 weeks',
    description: 'solutions.pricing.professional.description',
    features: [
      'solutions.pricing.professional.feature1',
      'solutions.pricing.professional.feature2',
      'solutions.pricing.professional.feature3',
      'solutions.pricing.professional.feature4',
      'solutions.pricing.professional.feature5'
    ],
    color: 'from-purple-500 to-pink-500',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    duration: '8-12 weeks',
    description: 'solutions.pricing.enterprise.description',
    features: [
      'solutions.pricing.enterprise.feature1',
      'solutions.pricing.enterprise.feature2',
      'solutions.pricing.enterprise.feature3',
      'solutions.pricing.enterprise.feature4',
      'solutions.pricing.enterprise.feature5',
      'solutions.pricing.enterprise.feature6'
    ],
    color: 'from-green-500 to-emerald-500',
    popular: false
  }
];

export default function Pricing() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
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
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  {t('pricing.mostPopular')}
                </div>
              )}

              {/* Pricing Card */}
              <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                plan.popular ? 'border-purple-500' : 'border-gray-100'
              }`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className="text-gray-600 ml-2">/project</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {plan.duration}
                  </p>
                  <p className="text-gray-600">
                    {t(plan.description)}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mr-3`}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{t(feature)}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.price === 'Custom' ? t('pricing.contactUs') : t('pricing.getStarted')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">
            {t('pricing.additionalInfo')}
          </p>
          <motion.button
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('pricing.downloadBrochure')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

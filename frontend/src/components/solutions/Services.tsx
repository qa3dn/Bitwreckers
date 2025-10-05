'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

const services = [
  {
    icon: '🌐',
    title: 'Web Apps',
    description: 'solutions.services.webApps',
    features: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '📱',
    title: 'Mobile Apps',
    description: 'solutions.services.mobileApps',
    features: ['React Native', 'Flutter', 'iOS', 'Android'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: '🔗',
    title: 'Integrations',
    description: 'solutions.services.integrations',
    features: ['API Development', 'Third-party APIs', 'Webhooks', 'Data Sync'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: '🤖',
    title: 'AI/Automation',
    description: 'solutions.services.aiAutomation',
    features: ['Machine Learning', 'Chatbots', 'Process Automation', 'Data Analysis'],
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: '☁️',
    title: 'Cloud/DevOps',
    description: 'solutions.services.cloudDevOps',
    features: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function Services() {
  const { t } = useTranslation();

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
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t(service.description)}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>

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

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('services.getQuote')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

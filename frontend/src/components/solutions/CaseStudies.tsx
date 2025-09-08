'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const caseStudies = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    client: 'TechCorp',
    industry: 'Retail',
    before: 'Manual processes, 2-week delivery',
    after: 'Automated system, 2-day delivery',
    results: {
      efficiency: '300%',
      revenue: '150%',
      customers: '200%'
    },
    image: '/api/placeholder/400/300'
  },
  {
    id: 2,
    title: 'AI-Powered Analytics',
    client: 'DataFlow Inc',
    industry: 'Technology',
    before: 'Basic reporting, manual insights',
    after: 'Real-time AI insights, predictive analytics',
    results: {
      efficiency: '500%',
      accuracy: '95%',
      time: '80%'
    },
    image: '/api/placeholder/400/300'
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    client: 'BankSecure',
    industry: 'Finance',
    before: 'Web-only access, limited features',
    after: 'Full mobile banking, biometric security',
    results: {
      users: '400%',
      transactions: '250%',
      satisfaction: '98%'
    },
    image: '/api/placeholder/400/300'
  }
];

export default function CaseStudies() {
  const t = useTranslations('solutions');

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
            {t('caseStudies.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('caseStudies.subtitle')}
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  🏢
                </div>
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-600">
                  {study.industry}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {study.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {study.client}
                </p>

                {/* Before/After */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-700 mb-2">Before</h4>
                    <p className="text-sm text-red-600">{study.before}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">After</h4>
                    <p className="text-sm text-green-600">{study.after}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-2">
                  {Object.entries(study.results).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 capitalize">
                        {key} Improvement:
                      </span>
                      <span className="font-bold text-green-600">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('caseStudies.viewDetails')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

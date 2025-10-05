'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

export default function ContactCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('contactCTA.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            {t('contactCTA.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.button
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('contactCTA.bookCall')}
            </motion.button>
            
            <motion.button
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('contactCTA.downloadProfile')}
            </motion.button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">📧</div>
              <div className="text-white font-semibold mb-2">Email</div>
              <div className="text-blue-100">hello@bitwreckers.com</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📞</div>
              <div className="text-white font-semibold mb-2">Phone</div>
              <div className="text-blue-100">+20 123 456 7890</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <div className="text-white font-semibold mb-2">WhatsApp</div>
              <div className="text-blue-100">+20 123 456 7890</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import useTranslation from '../../hooks/useTranslation';

const FAQPage = () => {
  const { t, isRTL, language } = useTranslation();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemKey: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemKey)) {
      newOpenItems.delete(itemKey);
    } else {
      newOpenItems.add(itemKey);
    }
    setOpenItems(newOpenItems);
  };

  const faqItems = [
    // العمود الأول
    [
      { q: t('faq.lms.best_platform'), a: t('faq.answers.lms_best_platform') },
      { q: t('faq.student_systems'), a: t('faq.answers.student_systems') },
      { q: t('faq.technology_services'), a: t('faq.answers.technology_services') },
      { q: t('faq.school_management'), a: t('faq.answers.school_management') },
      { q: t('faq.project_steps'), a: t('faq.answers.project_steps') },
      { q: t('faq.multilanguage_rtl'), a: t('faq.answers.multilanguage_rtl') },
      { q: t('faq.training_support'), a: t('faq.answers.training_support') },
      { q: t('faq.mobile_ios_android'), a: t('faq.answers.mobile_ios_android') },
      { q: t('faq.ecommerce_support'), a: t('faq.answers.ecommerce_support') },
      { q: t('faq.ui_ux_identity'), a: t('faq.answers.ui_ux_identity') },
      { q: t('faq.security_measures'), a: t('faq.answers.security_measures') },
      { q: t('faq.ai_integration'), a: t('faq.answers.ai_integration') },
      { q: t('faq.quality_assurance'), a: t('faq.answers.quality_assurance') }
    ],
    // العمود الثاني
    [
      { q: t('faq.education_management'), a: t('faq.answers.education_management') },
      { q: t('faq.services_offered'), a: t('faq.answers.services_offered') },
      { q: t('faq.post_launch_support'), a: t('faq.answers.post_launch_support') },
      { q: t('faq.project_start'), a: t('faq.answers.project_start') },
      { q: t('faq.hosting_server'), a: t('faq.answers.hosting_server') },
      { q: t('faq.maintenance_contracts'), a: t('faq.answers.maintenance_contracts') },
      { q: t('faq.data_migration'), a: t('faq.answers.data_migration') },
      { q: t('faq.seo_performance'), a: t('faq.answers.seo_performance') },
      { q: t('faq.external_integration'), a: t('faq.answers.external_integration') },
      { q: t('faq.previous_work'), a: t('faq.answers.previous_work') },
      { q: t('faq.pricing_payment'), a: t('faq.answers.pricing_payment') },
      { q: t('faq.cms_support'), a: t('faq.answers.cms_support') },
      { q: t('faq.monitoring_alerts'), a: t('faq.answers.monitoring_alerts') }
    ],
    // العمود الثالث
    [
      { q: t('faq.school_systems'), a: t('faq.answers.school_systems') },
      { q: t('faq.project_duration'), a: t('faq.answers.project_duration') },
      { q: t('faq.lms_sale'), a: t('faq.answers.lms_sale') },
      { q: t('faq.development_cost'), a: t('faq.answers.development_cost') },
      { q: t('faq.electronic_payment'), a: t('faq.answers.electronic_payment') },
      { q: t('faq.nda_support'), a: t('faq.answers.nda_support') },
      { q: t('faq.system_scalability'), a: t('faq.answers.system_scalability') },
      { q: t('faq.control_panels'), a: t('faq.answers.control_panels') },
      { q: t('faq.api_provision'), a: t('faq.answers.api_provision') },
      { q: t('faq.delivery_documentation'), a: t('faq.answers.delivery_documentation') },
      { q: t('faq.client_cloud'), a: t('faq.answers.client_cloud') },
      { q: t('faq.operating_contracts'), a: t('faq.answers.operating_contracts') }
    ]
  ];

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] py-20 ${isRTL ? 'font-arabic' : 'font-english'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        {/* العنوان الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent mb-6">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-[#F8F8F8] max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        {/* الأسئلة الشائعة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {faqItems.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + columnIndex * 0.2 }}
              className="space-y-4"
            >
              {column.map((item, itemIndex) => {
                const itemKey = `${columnIndex}-${itemIndex}`;
                const isOpen = openItems.has(itemKey);
                
                return (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + columnIndex * 0.2 + itemIndex * 0.1 }}
                    className="bg-[#131422]/50 backdrop-blur-sm rounded-lg border border-[#6B2D73]/20 hover:bg-[#6B2D73]/10 transition-all duration-300"
                  >
                    <div 
                      className="cursor-pointer p-4"
                      onClick={() => toggleItem(itemKey)}
                    >
                      <div className="flex items-center justify-between">
                        {/* السؤال */}
                        <h3 className={`text-lg font-semibold leading-relaxed transition-colors duration-200 flex-1 pr-4 ${
                          isOpen ? 'text-[#d4aad9]' : 'text-white'
                        }`}>
                          {item.q}
                        </h3>
                        
                        {/* أيقونة التوسع */}
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                            isOpen ? 'bg-[#6B2D73]/20' : 'bg-gray-800/50 hover:bg-gray-700/50'
                          }`}>
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* الإجابة */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0">
                        <div className="h-px bg-[#6B2D73]/30 mb-3"></div>
                        <p className="text-[#F8F8F8]/80 text-base leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>

        {/* قسم إضافي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent mb-6">
            {t('faq.contact_title')}
          </h2>
          <p className="text-xl text-[#F8F8F8] mb-8 max-w-2xl mx-auto">
            {t('faq.contact_subtitle')}
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-[#2D7363]/25 hover:shadow-xl transition-all duration-200"
            >
              {t('faq.contact_button')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;

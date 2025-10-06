'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

export default function CookiesPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            سياسة ملفات تعريف الارتباط
          </h1>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                ما هي ملفات تعريف الارتباط؟
              </h2>
              <p className="text-gray-600 mb-6">
                ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقعنا الإلكتروني. 
                تساعدنا هذه الملفات في تحسين تجربتك على الموقع وتقديم خدمات أفضل.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                أنواع ملفات تعريف الارتباط التي نستخدمها
              </h2>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li><strong>ملفات تعريف الارتباط الأساسية:</strong> ضرورية لعمل الموقع بشكل صحيح</li>
                <li><strong>ملفات تعريف الارتباط الوظيفية:</strong> تحفظ تفضيلاتك مثل اللغة</li>
                <li><strong>ملفات تعريف الارتباط التحليلية:</strong> تساعدنا في فهم كيفية استخدام الموقع</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                كيفية إدارة ملفات تعريف الارتباط
              </h2>
              <p className="text-gray-600 mb-6">
                يمكنك إدارة ملفات تعريف الارتباط من خلال إعدادات متصفحك. 
                يرجى ملاحظة أن تعطيل بعض ملفات تعريف الارتباط قد يؤثر على وظائف الموقع.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                تحديثات هذه السياسة
              </h2>
              <p className="text-gray-600 mb-6">
                قد نقوم بتحديث هذه السياسة من وقت لآخر. 
                سيتم إشعارك بأي تغييرات مهمة من خلال الموقع.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
                <p className="text-blue-800">
                  <strong>آخر تحديث:</strong> {new Date().toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
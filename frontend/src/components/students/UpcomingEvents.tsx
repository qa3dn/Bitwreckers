'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const events = [
  {
    id: 1,
    title: 'Web Development Hackathon',
    date: '2024-02-15',
    time: '09:00 AM',
    duration: '48 hours',
    location: 'Cairo, Egypt',
    type: 'Hackathon',
    participants: 120,
    prize: '$10,000',
    status: 'upcoming',
    description: 'Build innovative web applications using modern technologies'
  },
  {
    id: 2,
    title: 'AI/ML Workshop',
    date: '2024-02-20',
    time: '02:00 PM',
    duration: '4 hours',
    location: 'Online',
    type: 'Workshop',
    participants: 50,
    prize: 'Certificates',
    status: 'upcoming',
    description: 'Learn the fundamentals of machine learning and AI'
  },
  {
    id: 3,
    title: 'Mobile App Challenge',
    date: '2024-03-01',
    time: '10:00 AM',
    duration: '24 hours',
    location: 'Alexandria, Egypt',
    type: 'Challenge',
    participants: 80,
    prize: '$5,000',
    status: 'upcoming',
    description: 'Create mobile applications that solve real-world problems'
  }
];

export default function UpcomingEvents() {
  const t = useTranslations('students');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
            {t('events.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('events.subtitle')}
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Event Header */}
              <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                <div className="absolute top-4 right-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                    {event.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-2xl font-bold">{formatDate(event.date)}</div>
                  <div className="text-sm opacity-90">{event.time}</div>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">⏱️</span>
                    <span>{event.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">👥</span>
                    <span>{event.participants} participants</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 mr-2">🏆</span>
                    <span>Prize: {event.prize}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('events.register')}
                  </motion.button>
                  <motion.button
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('events.details')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('events.viewAll')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

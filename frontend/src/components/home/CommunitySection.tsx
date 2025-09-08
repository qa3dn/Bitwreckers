'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const communityMembers = [
  { id: 1, name: 'Ahmed Mohammed', role: 'Student', location: 'Riyadh', avatar: '👨‍🎓', category: 'student' },
  { id: 2, name: 'Sarah Ahmed', role: 'Tech Expert', location: 'Jeddah', avatar: '👩‍💻', category: 'expert' },
  { id: 3, name: 'Mohammed Ali', role: 'Mentor', location: 'Dammam', avatar: '👨‍🏫', category: 'mentor' },
  { id: 4, name: 'Fatima Hassan', role: 'Student', location: 'Makkah', avatar: '👩‍🎓', category: 'student' },
  { id: 5, name: 'Ali Ahmed', role: 'Graduate', location: 'Madinah', avatar: '👨‍🎓', category: 'graduate' },
  { id: 6, name: 'Nour Al-Din', role: 'Expert', location: 'Tabuk', avatar: '👨‍💻', category: 'expert' }
];

const events = [
  {
    id: 1,
    title: 'AI Workshop',
    date: '2024-01-15',
    time: '18:00',
    location: 'Riyadh',
    type: 'workshop',
    attendees: 45,
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'App Development Hackathon',
    date: '2024-01-20',
    time: '09:00',
    location: 'Jeddah',
    type: 'hackathon',
    attendees: 120,
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Entrepreneurship Lecture',
    date: '2024-01-25',
    time: '19:00',
    location: 'Dammam',
    type: 'lecture',
    attendees: 80,
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Developers Meetup',
    date: '2024-02-01',
    time: '16:00',
    location: 'Makkah',
    type: 'meetup',
    attendees: 60,
    status: 'upcoming'
  }
];

const networkStats = {
  totalMembers: 2500,
  activeStudents: 1200,
  experts: 150,
  mentors: 80,
  graduates: 1070
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CommunitySection() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [hoveredMember, setHoveredMember] = useState(null);

  const filteredEvents = events.filter(event => {
    const eventMonth = new Date(event.date).getMonth();
    return eventMonth === selectedMonth;
  });

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Community
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Join our growing network of students, experts, and mentors
          </p>
        </motion.div>

        {/* Network Stats */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {Object.entries(networkStats).map(([key, value], index) => (
              <motion.div
                key={key}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
                  <div className="text-3xl font-bold text-white mb-2">{value.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">
                    {key === 'totalMembers' && 'Total Members'}
                    {key === 'activeStudents' && 'Active Students'}
                    {key === 'experts' && 'Experts'}
                    {key === 'mentors' && 'Mentors'}
                    {key === 'graduates' && 'Graduates'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Network Map */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Interactive Community Map
          </h3>
          
          <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12">
            {/* Map Background */}
            <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full">
                {communityMembers.map((member, index) => {
                  const nextMember = communityMembers[(index + 1) % communityMembers.length];
                  const x1 = 20 + (index * 15) % 80;
                  const y1 = 20 + (index * 10) % 60;
                  const x2 = 20 + ((index + 1) * 15) % 80;
                  const y2 = 20 + ((index + 1) * 10) % 60;
                  
                  return (
                    <line
                      key={`line-${index}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="rgba(239, 68, 68, 0.3)"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  );
                })}
              </svg>

              {/* Member Nodes */}
              {communityMembers.map((member, index) => {
                const x = 20 + (index * 15) % 80;
                const y = 20 + (index * 10) % 60;
                
                return (
                  <motion.div
                    key={member.id}
                    className="absolute cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    onHoverStart={() => setHoveredMember(member)}
                    onHoverEnd={() => setHoveredMember(null)}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-white">
                        {member.avatar}
                      </div>
                      
                      {/* Pulse Effect */}
                      <motion.div
                        className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full opacity-30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Member Info Tooltip */}
            {hoveredMember && (
              <motion.div
                className="absolute top-4 right-4 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 p-4 max-w-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{hoveredMember.avatar}</div>
                  <div>
                    <h4 className="text-white font-semibold">{hoveredMember.name}</h4>
                    <p className="text-gray-400 text-sm">{hoveredMember.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">📍 {hoveredMember.location}</p>
              </motion.div>
            )}

            {/* Community Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-orange-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>💬</span>
                Join Slack
              </motion.a>
              
              <motion.a
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-semibold hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🎮</span>
                Join Discord
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Events Calendar */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Events Calendar
          </h3>
          
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8">
            {/* Month Selector */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-2 bg-gray-800/50 rounded-xl p-2">
                {months.map((month, index) => (
                  <motion.button
                    key={month}
                    onClick={() => setSelectedMonth(index)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      selectedMonth === index
                        ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {month}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
                      <p className="text-gray-400 text-sm">📍 {event.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.type === 'workshop' 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : event.type === 'hackathon'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : event.type === 'lecture'
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}>
                      {event.type === 'workshop' && 'Workshop'}
                      {event.type === 'hackathon' && 'Hackathon'}
                      {event.type === 'lecture' && 'Lecture'}
                      {event.type === 'meetup' && 'Meetup'}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400">📅</span>
                        <span className="text-gray-300">{new Date(event.date).toLocaleDateString('en-US')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400">🕒</span>
                        <span className="text-gray-300">{event.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-orange-400">👥</span>
                      <span className="text-gray-300">{event.attendees} participants</span>
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-orange-700 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Register Now
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-gray-400 text-lg">No events this month</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-xl rounded-3xl border border-red-500/30 p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Join Our Community
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with developers and experts, participate in events and workshops
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Events
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

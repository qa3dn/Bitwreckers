'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const techPaths = [
  { name: 'Tech-Media', icon: '📱', color: 'from-blue-500 to-cyan-500' },
  { name: 'DevOps', icon: '⚙️', color: 'from-green-500 to-emerald-500' },
  { name: 'Backend', icon: '🔧', color: 'from-purple-500 to-pink-500' },
  { name: 'Mobile', icon: '📱', color: 'from-orange-500 to-red-500' },
  { name: 'Web', icon: '🌐', color: 'from-indigo-500 to-blue-500' }
];

const howItWorksSteps = [
  { step: 'Ship', title: 'Ship Your Ideas', description: 'Submit your innovative project ideas and get ready to build something amazing.' },
  { step: 'Sprint', title: 'Sprint Team', description: 'Join our sprint teams and collaborate with like-minded developers.' },
  { step: 'Challenge', title: 'Challenge Yourself', description: 'Take on real-world challenges and push your skills to the limit.' },
  { step: 'Apply', title: 'Apply & Grow', description: 'Apply your knowledge and grow your career with real opportunities.' }
];

const benefits = [
  { title: 'Mentorship', description: 'Get guidance from industry experts', icon: '👨‍🏫' },
  { title: 'Showcase', description: 'Showcase your work to potential employers', icon: '🎯' },
  { title: 'Stipends', description: 'Earn stipends for your contributions', icon: '💰' },
  { title: 'Real Clients', description: 'Work with real clients and projects', icon: '🏢' },
  { title: 'Code Reviews', description: 'Get professional code reviews', icon: '🔍' }
];

const studentProjects = [
  { title: 'E-Commerce App', tech: 'React Native', status: 'Completed' },
  { title: 'AI Chatbot', tech: 'Python', status: 'In Progress' },
  { title: 'Portfolio Website', tech: 'Next.js', status: 'Completed' },
  { title: 'Mobile Game', tech: 'Unity', status: 'Planning' }
];

const upcomingEvents = [
  { title: 'Hackathon 2024', date: 'Dec 15-17', type: 'Competition' },
  { title: 'Tech Workshop', date: 'Dec 20', type: 'Workshop' },
  { title: 'Career Fair', date: 'Jan 10', type: 'Networking' }
];

const faqs = [
  { question: 'How can I join the student program?', answer: 'Submit your application through our portal and we\'ll review your profile within 48 hours.' },
  { question: 'What technologies do you work with?', answer: 'We work with a wide range of technologies including React, Node.js, Python, AI/ML, and more.' },
  { question: 'Is there any cost to participate?', answer: 'No, our student program is completely free and you can even earn stipends for your contributions.' }
];

export default function StudentsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeFAQ, setActiveFAQ] = useState(0);
  const [formData, setFormData] = useState({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

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
            Innovation in Every Line of Code
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Join our community of talented developers and build your future in technology
          </p>

          {/* Tech Paths */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {techPaths.map((path, index) => (
              <motion.div
                key={path.name}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${path.color} rounded-full flex items-center justify-center text-2xl`}>
                  {path.icon}
                </div>
                <p className="text-sm font-semibold text-white">{path.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            How Does It Work?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {index + 1}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Benefits of Joining
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Student Projects */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Student Projects
          </h3>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['all', 'React', 'Python', 'Next.js', 'Unity'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === 'all' ? 'All' : filter}
              </motion.button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
                <p className="text-gray-400 text-sm mb-3">{project.tech}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Completed' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : project.status === 'In Progress'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {project.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Upcoming Events
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-xl font-bold text-white mb-3">{event.title}</h4>
                <p className="text-orange-400 font-semibold mb-2">{event.date}</p>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-sm">
                  {event.type}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h3>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? -1 : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors duration-300"
                >
                  <h4 className="text-lg font-semibold text-white">{faq.question}</h4>
                  <span className="text-2xl text-gray-400 transition-transform duration-300">
                    {activeFAQ === index ? '−' : '+'}
                  </span>
                </button>
                {activeFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Application Form
          </h3>
          
          <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8">
            <div className="space-y-6">
              <div>
                                 <label className="block text-white font-semibold mb-2">Full Name</label>
                 <input
                   type="text"
                   required
                   value={formData.name || ''}
                   onChange={(e) => handleInputChange('name', e.target.value)}
                   className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-red-400 focus:outline-none transition-colors duration-300"
                   placeholder="Enter your full name"
                 />
              </div>
              
              <div>
                                 <label className="block text-white font-semibold mb-2">Email</label>
                 <input
                   type="email"
                   required
                   value={formData.email || ''}
                   onChange={(e) => handleInputChange('email', e.target.value)}
                   className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-red-400 focus:outline-none transition-colors duration-300"
                   placeholder="Enter your email"
                 />
              </div>
              
              <div>
                                 <label className="block text-white font-semibold mb-2">University</label>
                 <input
                   type="text"
                   required
                   value={formData.university || ''}
                   onChange={(e) => handleInputChange('university', e.target.value)}
                   className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-red-400 focus:outline-none transition-colors duration-300"
                   placeholder="Enter your university name"
                 />
              </div>
              
              <div>
                                 <label className="block text-white font-semibold mb-2">Preferred Field</label>
                 <select
                   required
                   value={formData.field || ''}
                   onChange={(e) => handleInputChange('field', e.target.value)}
                   className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-red-400 focus:outline-none transition-colors duration-300"
                 >
                   <option value="">Choose your preferred field</option>
                   <option value="web">Web Development</option>
                   <option value="mobile">Mobile Development</option>
                   <option value="ai">Artificial Intelligence</option>
                   <option value="devops">DevOps</option>
                   <option value="design">Design</option>
                 </select>
              </div>
              
              <div>
                                 <label className="block text-white font-semibold mb-2">Application Message</label>
                 <textarea
                   required
                   rows={4}
                   value={formData.message || ''}
                   onChange={(e) => handleInputChange('message', e.target.value)}
                   className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-red-400 focus:outline-none transition-colors duration-300 resize-none"
                   placeholder="Write a brief application message..."
                 />
              </div>
              
              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                                 Submit Application
              </motion.button>
            </div>
          </form>
          
          <div className="text-center mt-8">
                         <p className="text-gray-400 mb-4">Or apply through our portal</p>
             <motion.a
               href="/students"
               className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl hover:bg-gray-700/50 transition-all duration-300"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <span>Career Portal</span>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

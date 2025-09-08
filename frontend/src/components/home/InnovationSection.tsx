'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const acceleratorProgram = {
  title: 'Student Ideas Accelerator Program',
  description: 'We help students transform their ideas into successful projects',
  criteria: [
    { title: 'Innovation', description: 'Innovative idea that solves a real problem', icon: '💡' },
    { title: 'Feasibility', description: 'Technically and financially feasible', icon: '⚡' },
    { title: 'Impact', description: 'Positive impact on society', icon: '🌍' },
    { title: 'Team', description: 'Collaborative and enthusiastic team', icon: '👥' }
  ],
  deadlines: [
    { phase: 'Initial Application', date: 'January 15', status: 'Open' },
    { phase: 'Second Round Interviews', date: 'February 1', status: 'Coming Soon' },
    { phase: 'Final Results Announcement', date: 'February 15', status: 'Coming Soon' }
  ],
  funding: {
    amount: '50,000 SAR',
    description: 'Micro-funding for each accepted project',
    benefits: ['Intensive Training', 'Expert Mentorship', 'Network Connections', 'Investment Opportunities']
  }
};

const ideaPipeline = [
  {
    stage: 'Ideation',
    title: 'Idea Development',
    description: 'Market analysis and prototype development',
    duration: '2-4 weeks',
    icon: '🧠',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    stage: 'Building',
    title: 'Prototype Building',
    description: 'MVP development and idea testing',
    duration: '4-8 weeks',
    icon: '🔨',
    color: 'from-green-500 to-emerald-500'
  },
  {
    stage: 'Testing',
    title: 'Market Testing',
    description: 'Gathering feedback and product improvement',
    duration: '2-6 weeks',
    icon: '🧪',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    stage: 'Launch',
    title: 'Product Launch',
    description: 'Official launch and user acquisition',
    duration: 'Ongoing',
    icon: '🚀',
    color: 'from-red-500 to-pink-500'
  }
];

const incubatedIdeas = [
  {
    title: 'EduTech Platform',
    description: 'Interactive educational platform for students',
    team: 'Team of 4 students',
    progress: 75,
    category: 'Education',
    status: 'In Development'
  },
  {
    title: 'Green Energy Tracker',
    description: 'App for tracking green energy consumption',
    team: 'Team of 3 students',
    progress: 90,
    category: 'Environment',
    status: 'Ready for Launch'
  },
  {
    title: 'Health AI Assistant',
    description: 'Smart health and fitness assistant',
    team: 'Team of 5 students',
    progress: 60,
    category: 'Health',
    status: 'In Development'
  },
  {
    title: 'Local Market Connect',
    description: 'Platform connecting local sellers with buyers',
    team: 'Team of 6 students',
    progress: 45,
    category: 'Commerce',
    status: 'In Development'
  }
];

export default function InnovationSection() {
  const [activeStage, setActiveStage] = useState(0);

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
            Innovation & Entrepreneurship
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            We foster innovation and help students transform their ideas into successful projects
          </p>
        </motion.div>

        {/* Accelerator Program */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {acceleratorProgram.title}
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {acceleratorProgram.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Criteria */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">Acceptance Criteria</h4>
                <div className="space-y-4">
                  {acceleratorProgram.criteria.map((criterion, index) => (
                    <motion.div
                      key={criterion.title}
                      className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-2xl">{criterion.icon}</div>
                      <div>
                        <h5 className="text-white font-semibold mb-1">{criterion.title}</h5>
                        <p className="text-gray-300 text-sm">{criterion.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Deadlines */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">Important Deadlines</h4>
                <div className="space-y-4">
                  {acceleratorProgram.deadlines.map((deadline, index) => (
                    <motion.div
                      key={deadline.phase}
                      className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-white font-semibold">{deadline.phase}</h5>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          deadline.status === 'Open' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {deadline.status}
                        </span>
                      </div>
                      <p className="text-orange-400 font-semibold">{deadline.date}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Funding */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">Funding & Benefits</h4>
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-6 border border-red-500/30">
                  <div className="text-center mb-4">
                    <h5 className="text-3xl font-bold text-white mb-2">{acceleratorProgram.funding.amount}</h5>
                    <p className="text-gray-300">{acceleratorProgram.funding.description}</p>
                  </div>
                  <div className="space-y-2">
                    {acceleratorProgram.funding.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-orange-400">✓</span>
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Idea Development Pipeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Idea Development Journey
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-orange-600 hidden lg:block" />
            
            <div className="space-y-12">
              {ideaPipeline.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col gap-8`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Stage Circle */}
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-r ${stage.color} rounded-full flex items-center justify-center text-white text-2xl shadow-lg`}>
                      {stage.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 max-w-md">
                    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-semibold">
                          {stage.stage}
                        </span>
                        <span className="text-gray-400 text-sm">{stage.duration}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">{stage.title}</h4>
                      <p className="text-gray-300">{stage.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Incubated Ideas Showcase */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Incubated Ideas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {incubatedIdeas.map((idea, index) => (
              <motion.div
                key={idea.title}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{idea.title}</h4>
                    <p className="text-gray-300 text-sm mb-3">{idea.description}</p>
                  </div>
                                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          idea.status === 'Ready for Launch' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {idea.status}
                        </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Team:</span>
                    <span className="text-white">{idea.team}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-orange-400">{idea.category}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress:</span>
                      <span className="text-white">{idea.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${idea.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Have an Innovative Idea?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our program and help us turn your idea into reality
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

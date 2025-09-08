'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

const acceleratorProgram = {
  criteria: [
    'Innovative and scalable business idea',
    'Strong technical foundation',
    'Clear market opportunity',
    'Passionate and committed team',
    'Potential for social impact'
  ],
  deadlines: [
    { round: 'Spring 2024', deadline: 'March 15, 2024', status: 'Open' },
    { round: 'Summer 2024', deadline: 'June 15, 2024', status: 'Coming Soon' },
    { round: 'Fall 2024', deadline: 'September 15, 2024', status: 'Coming Soon' }
  ],
  funding: [
    { type: 'Seed Grant', amount: '$5,000', description: 'Initial funding for MVP development' },
    { type: 'Growth Grant', amount: '$15,000', description: 'Scaling and market expansion' },
    { type: 'Innovation Award', amount: '$25,000', description: 'Breakthrough technology projects' }
  ]
};

const ideaPipeline = [
  {
    stage: 'Ideation',
    description: 'Brainstorming and concept development',
    duration: '2 weeks',
    deliverables: ['Problem statement', 'Solution concept', 'Market research'],
    icon: '💡'
  },
  {
    stage: 'Validation',
    description: 'Testing assumptions and market fit',
    duration: '3 weeks',
    deliverables: ['Customer interviews', 'MVP prototype', 'Feedback analysis'],
    icon: '🔍'
  },
  {
    stage: 'Development',
    description: 'Building the minimum viable product',
    duration: '6 weeks',
    deliverables: ['Working prototype', 'User testing', 'Technical documentation'],
    icon: '⚙️'
  },
  {
    stage: 'Launch',
    description: 'Market entry and user acquisition',
    duration: '4 weeks',
    deliverables: ['Beta launch', 'User onboarding', 'Metrics tracking'],
    icon: '🚀'
  },
  {
    stage: 'Scale',
    description: 'Growth and optimization',
    duration: 'Ongoing',
    deliverables: ['User growth', 'Feature development', 'Partnerships'],
    icon: '📈'
  }
];

const incubatedIdeas = [
  {
    name: 'EduTech Platform',
    description: 'AI-powered personalized learning platform for students',
    team: 'Team Innovators',
    stage: 'Development',
    funding: '$15,000',
    impact: '10,000+ students reached',
    icon: '🎓'
  },
  {
    name: 'GreenTech Solution',
    description: 'Sustainable energy management system for campuses',
    team: 'Eco Warriors',
    stage: 'Launch',
    funding: '$25,000',
    impact: '5 campuses implemented',
    icon: '🌱'
  },
  {
    name: 'HealthTech App',
    description: 'Mental health support app for university students',
    team: 'Mind Matters',
    stage: 'Scale',
    funding: '$20,000',
    impact: '50,000+ active users',
    icon: '🧠'
  },
  {
    name: 'FinTech Platform',
    description: 'Financial literacy and budgeting tools for students',
    team: 'Money Masters',
    stage: 'Validation',
    funding: '$10,000',
    impact: '2,000+ users onboarded',
    icon: '💰'
  }
];

export default function LabInnovationPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [activeSection, setActiveSection] = useState('accelerator');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
        style={{ width: progressWidth }}
      />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Lab Innovation
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Accelerating student ideas into successful startups and innovative solutions
          </motion.p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="px-4 pb-8">
        <div className="container mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { id: 'accelerator', label: 'Accelerator Program', icon: '🚀' },
              { id: 'pipeline', label: 'Idea Pipeline', icon: '🔄' },
              { id: 'showcase', label: 'Incubated Ideas', icon: '💡' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeSection === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Accelerator Program */}
            {activeSection === 'accelerator' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Student Idea Accelerator Program</h2>
                
                {/* Criteria */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-6">Selection Criteria</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {acceleratorProgram.criteria.map((criterion, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <span className="text-blue-600 text-xl">✓</span>
                        <span className="text-gray-700">{criterion}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Deadlines */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-6">Application Deadlines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {acceleratorProgram.deadlines.map((round, index) => (
                      <motion.div
                        key={index}
                        className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <h4 className="text-xl font-semibold text-purple-800 mb-2">{round.round}</h4>
                        <p className="text-gray-600 mb-3">{round.deadline}</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          round.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {round.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Funding */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-6">Funding Opportunities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {acceleratorProgram.funding.map((fund, index) => (
                      <motion.div
                        key={index}
                        className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <h4 className="text-xl font-semibold text-green-800 mb-2">{fund.type}</h4>
                        <div className="text-3xl font-bold text-green-600 mb-2">{fund.amount}</div>
                        <p className="text-gray-600">{fund.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Idea Pipeline */}
            {activeSection === 'pipeline' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Idea Development Pipeline</h2>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                  
                  <div className="space-y-8">
                    {ideaPipeline.map((stage, index) => (
                      <motion.div
                        key={index}
                        className="relative flex items-start gap-6"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        {/* Stage Icon */}
                        <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                          {stage.icon}
                        </div>
                        
                        {/* Stage Content */}
                        <div className="flex-1 bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{stage.stage}</h3>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                              {stage.duration}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{stage.description}</p>
                          
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Deliverables:</h4>
                            <ul className="space-y-1">
                              {stage.deliverables.map((deliverable, delIndex) => (
                                <li key={delIndex} className="flex items-center gap-2 text-gray-600">
                                  <span className="text-blue-500">•</span>
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Incubated Ideas Showcase */}
            {activeSection === 'showcase' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Incubated Ideas Showcase</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {incubatedIdeas.map((idea, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{idea.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{idea.name}</h3>
                          <p className="text-sm text-gray-500">{idea.team}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{idea.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-500">Stage</div>
                          <div className="font-semibold text-blue-700">{idea.stage}</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-gray-500">Funding</div>
                          <div className="font-semibold text-green-700">{idea.funding}</div>
                        </div>
                      </div>
                      
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-500">Impact</div>
                        <div className="font-semibold text-purple-700">{idea.impact}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

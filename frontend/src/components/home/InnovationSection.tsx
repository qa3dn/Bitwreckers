'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Brain, Hammer, FlaskConical, Rocket as RocketIcon, Lightbulb, Zap, Globe2, Users } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

// Accelerator program will be defined inside component to use translation

const incubatedIdeas = [
  {
    title: 'ExamCo',
    description: 'Comprehensive platform for university course questions and exam preparation',
    team: 'Bitwreckers Development Team',
    progress: 85,
    category: 'Education',
    status: 'In Development'
  },
  {
    title: 'Project Portfolio Hub',
    description: 'Centralized platform for graduation projects - connecting students, supervisors, and companies',
    team: 'Bitwreckers Development Team',
    progress: 70,
    category: 'Education',
    status: 'In Development'
  },
  {
    title: 'Teacher Platform',
    description: 'Personal website platform for teachers with lectures, exams, digital store, and student management',
    team: 'Bitwreckers Development Team',
    progress: 60,
    category: 'Education',
    status: 'In Development'
  },
  {
    title: 'AI Fragrance Finder',
    description: 'AI-powered app that suggests global fragrances based on scent components with direct purchase integration',
    team: 'Bitwreckers Development Team',
    progress: 40,
    category: 'AI & E-commerce',
    status: 'In Development'
  },
  {
    title: 'University Clubs Hub',
    description: 'Comprehensive app for all university clubs, activities, and events across Jordan',
    team: 'Bitwreckers Development Team',
    progress: 30,
    category: 'Social',
    status: 'Planning'
  },
  {
    title: 'Bitwreckers Techverse',
    description: 'Comprehensive tech-media platform integrating specialized media, social interaction, and digital marketplace',
    team: 'Bitwreckers Core Team',
    progress: 20,
    category: 'Tech Media',
    status: 'Planning'
  }
];

export default function InnovationSection() {
  const [activeStage, setActiveStage] = useState(0);
  const { t, isRTL } = useTranslation();

  const acceleratorProgram = {
    title: t('innovation.accelerator.title'),
    description: t('innovation.accelerator.description'),
    criteria: [
      { title: t('innovation.accelerator.criteria.innovation.title'), description: t('innovation.accelerator.criteria.innovation.description'), icon: Lightbulb },
      { title: t('innovation.accelerator.criteria.feasibility.title'), description: t('innovation.accelerator.criteria.feasibility.description'), icon: Zap },
      { title: t('innovation.accelerator.criteria.impact.title'), description: t('innovation.accelerator.criteria.impact.description'), icon: Globe2 },
      { title: t('innovation.accelerator.criteria.team.title'), description: t('innovation.accelerator.criteria.team.description'), icon: Users }
    ],
    deadlines: [
      { phase: t('innovation.accelerator.deadlines.initialApplication'), date: 'January 15', status: t('innovation.accelerator.deadlines.open') },
      { phase: t('innovation.accelerator.deadlines.secondRound'), date: 'February 1', status: t('innovation.accelerator.deadlines.comingSoon') },
      { phase: t('innovation.accelerator.deadlines.finalResults'), date: 'February 15', status: t('innovation.accelerator.deadlines.comingSoon') }
    ],
    funding: {
      amount: t('innovation.accelerator.funding.amount'),
      description: t('innovation.accelerator.funding.description'),
      benefits: [
        t('innovation.accelerator.funding.benefits.0'),
        t('innovation.accelerator.funding.benefits.1'),
        t('innovation.accelerator.funding.benefits.2'),
        t('innovation.accelerator.funding.benefits.3')
      ]
    }
  };

  const ideaPipeline = [
    {
      stage: 'Ideation',
      title: t('innovation.pipeline.ideation.title'),
      description: t('innovation.pipeline.ideation.description'),
      duration: t('innovation.pipeline.ideation.duration'),
      icon: Brain,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      stage: 'Building',
      title: t('innovation.pipeline.building.title'),
      description: t('innovation.pipeline.building.description'),
      duration: t('innovation.pipeline.building.duration'),
      icon: Hammer,
      color: 'from-green-500 to-emerald-500'
    },
    {
      stage: 'Testing',
      title: t('innovation.pipeline.testing.title'),
      description: t('innovation.pipeline.testing.description'),
      duration: t('innovation.pipeline.testing.duration'),
      icon: FlaskConical,
      color: 'from-orange-500 to-red-500'
    },
    {
      stage: 'Launch',
      title: t('innovation.pipeline.launch.title'),
      description: t('innovation.pipeline.launch.description'),
      duration: t('innovation.pipeline.launch.duration'),
      icon: RocketIcon,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const incubatedIdeas = [
    {
      title: 'Smart Learning Platform',
      description: 'AI-powered personalized learning system',
      team: 'Team of 4 students',
      progress: 75,
      category: 'Education',
      status: t('innovation.incubated.status.development')
    },
    {
      title: 'Green Energy Tracker',
      description: 'App for tracking green energy consumption',
      team: 'Team of 3 students',
      progress: 90,
      category: 'Environment',
      status: t('innovation.incubated.status.ready')
    },
    {
      title: 'Health AI Assistant',
      description: 'Smart health and fitness assistant',
      team: 'Team of 5 students',
      progress: 60,
      category: 'Health',
      status: t('innovation.incubated.status.development')
    },
    {
      title: 'Local Market Connect',
      description: 'Platform connecting local sellers with buyers',
      team: 'Team of 6 students',
      progress: 45,
      category: 'Commerce',
      status: t('innovation.incubated.status.development')
    }
  ];

  return (
    <section className={`py-20 px-4 relative ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#e6d1ea] bg-clip-text text-transparent">
            {t('innovation.title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            {t('innovation.subtitle')}
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
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
                {acceleratorProgram.title}
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {acceleratorProgram.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Criteria */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">{t('innovation.accelerator.criteria.title')}</h4>
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
                      <div className="w-10 h-10 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-xl flex items-center justify-center flex-shrink-0">
                        <criterion.icon className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>
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
                <h4 className="text-2xl font-bold text-white mb-6">{t('innovation.accelerator.deadlines.title')}</h4>
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

              {/* Support & Development */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">Support & Development</h4>
                <div className="bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 rounded-xl p-6 border border-[#9347a0]/30">
                  <div className="text-center mb-4">
                    <h5 className="text-2xl font-bold text-white mb-2">We Build Your Idea</h5>
                    <p className="text-gray-300">We develop your idea and bring it under our umbrella as part of our ecosystem</p>
                  </div>
                  <div className="space-y-2">
                    {acceleratorProgram.funding.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-[#b376bf]">✓</span>
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
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
            {t('innovation.pipeline.title')}
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#9347a0] to-[#b376bf] hidden lg:block" />
            
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
                    <div className={`w-20 h-20 bg-gradient-to-r ${stage.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                      <stage.icon className="w-10 h-10" strokeWidth={2} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 max-w-md">
                    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[#9347a0]/20 text-[#d4aad9] border border-[#9347a0]/30 rounded-full text-xs font-semibold">
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
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
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
                    <span className="text-gray-400">{t('innovation.incubated.team')}:</span>
                    <span className="text-white">{idea.team}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{t('innovation.incubated.category')}:</span>
                    <span className="text-[#b376bf]">{idea.category}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{t('innovation.incubated.progress')}:</span>
                      <span className="text-white">{idea.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-[#9347a0] to-[#b376bf] h-2 rounded-full"
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
          <div className="bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 backdrop-blur-xl rounded-3xl border border-[#9347a0]/30 p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              {t('innovation.cta.title')}
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('innovation.cta.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#9347a0]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
{t('innovation.cta.applyNow')}
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
{t('innovation.cta.learnMore')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

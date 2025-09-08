'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { notFound } from 'next/navigation';

const products = {
  'bitwreckers-platform': {
    name: 'Bitwreckers Platform',
    description: 'A comprehensive platform for student developers to showcase projects, collaborate, and find opportunities.',
    color: 'from-blue-600 to-purple-600',
    demo: {
      title: 'Interactive Demo',
      description: 'Experience the platform firsthand with our interactive demo',
      features: ['Project Showcase', 'Team Collaboration', 'Mentorship Matching', 'Resource Library']
    },
    changelog: [
      { version: '2.1.0', date: '2024-01-15', changes: ['Added AI-powered project recommendations', 'Improved collaboration tools', 'Enhanced mobile responsiveness'] },
      { version: '2.0.0', date: '2023-12-01', changes: ['Complete UI redesign', 'New mentorship system', 'Advanced analytics dashboard'] },
      { version: '1.5.0', date: '2023-10-15', changes: ['Added real-time notifications', 'Improved search functionality', 'Bug fixes and performance improvements'] }
    ],
    roadmap: [
      { quarter: 'Q1 2024', features: ['AI-powered learning paths', 'Advanced analytics', 'Mobile app launch'] },
      { quarter: 'Q2 2024', features: ['Integration with major platforms', 'Advanced collaboration tools', 'Performance optimization'] },
      { quarter: 'Q3 2024', features: ['Machine learning recommendations', 'Advanced security features', 'API marketplace'] }
    ],
    documentation: {
      overview: 'The Bitwreckers Platform is designed to bridge the gap between student developers and industry opportunities.',
      architecture: 'Built with a modern microservices architecture using React, Node.js, and MongoDB.',
      apis: 'Comprehensive REST and GraphQL APIs for seamless integration.',
      deployment: 'Deployed on AWS with CI/CD pipeline and automated testing.'
    }
  }
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [activeTab, setActiveTab] = useState('demo');
  
  const product = products[params.slug as keyof typeof products];
  
  if (!product) {
    notFound();
  }

  const tabs = [
    { id: 'demo', label: 'Demo', icon: '🚀' },
    { id: 'changelog', label: 'Changelog', icon: '📝' },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
    { id: 'docs', label: 'Documentation', icon: '📚' }
  ];

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
          <motion.div
            className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${product.color} text-white text-6xl mb-6`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            🚀
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {product.name}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {product.description}
          </motion.p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="px-4 pb-8">
        <div className="container mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
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

      {/* Tab Content */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Demo Tab */}
            {activeTab === 'demo' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{product.demo.title}</h2>
                <p className="text-gray-600 mb-8 text-lg">{product.demo.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.demo.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature}</h3>
                      <p className="text-gray-600">Experience this feature in our interactive demo</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Launch Demo
                  </motion.button>
                </div>
              </div>
            )}

            {/* Changelog Tab */}
            {activeTab === 'changelog' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Changelog</h2>
                <div className="space-y-6">
                  {product.changelog.map((release, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-gray-50 rounded-xl border-l-4 border-blue-500"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {release.version}
                        </span>
                        <span className="text-gray-500">{release.date}</span>
                      </div>
                      <ul className="space-y-2">
                        {release.changes.map((change, changeIndex) => (
                          <li key={changeIndex} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="text-gray-700">{change}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Roadmap Tab */}
            {activeTab === 'roadmap' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Product Roadmap</h2>
                <div className="space-y-6">
                  {product.roadmap.map((quarter, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-semibold text-purple-800 mb-3">{quarter.quarter}</h3>
                      <ul className="space-y-2">
                        {quarter.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <span className="text-purple-500 mt-1">🎯</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Documentation Tab */}
            {activeTab === 'docs' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Documentation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="p-6 bg-blue-50 rounded-xl border border-blue-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">Overview</h3>
                    <p className="text-gray-700">{product.documentation.overview}</p>
                  </motion.div>
                  
                  <motion.div
                    className="p-6 bg-green-50 rounded-xl border border-green-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Architecture</h3>
                    <p className="text-gray-700">{product.documentation.architecture}</p>
                  </motion.div>
                  
                  <motion.div
                    className="p-6 bg-purple-50 rounded-xl border border-purple-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold text-purple-800 mb-3">APIs</h3>
                    <p className="text-gray-700">{product.documentation.apis}</p>
                  </motion.div>
                  
                  <motion.div
                    className="p-6 bg-orange-50 rounded-xl border border-orange-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-orange-800 mb-3">Deployment</h3>
                    <p className="text-gray-700">{product.documentation.deployment}</p>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

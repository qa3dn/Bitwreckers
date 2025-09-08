'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const products = [
  {
    id: 'ai-analytics',
    title: 'AI Analytics Platform',
    description: 'Advanced analytics platform powered by machine learning for business intelligence',
    image: '/api/placeholder/400/300',
    techStack: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
    status: 'Live',
    category: 'AI/ML',
    users: '10K+',
    rating: 4.8
  },
  {
    id: 'mobile-wallet',
    title: 'Mobile Wallet App',
    description: 'Secure digital wallet for cryptocurrency and traditional payments',
    image: '/api/placeholder/400/300',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Blockchain'],
    status: 'Beta',
    category: 'Mobile',
    users: '5K+',
    rating: 4.6
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Complete e-commerce solution with advanced features and analytics',
    image: '/api/placeholder/400/300',
    techStack: ['Next.js', 'Stripe', 'Redis', 'AWS'],
    status: 'Live',
    category: 'Web',
    users: '50K+',
    rating: 4.9
  },
  {
    id: 'project-management',
    title: 'Project Management Tool',
    description: 'Collaborative project management platform for teams',
    image: '/api/placeholder/400/300',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'WebSocket'],
    status: 'Development',
    category: 'Web',
    users: '2K+',
    rating: 4.7
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker App',
    description: 'Comprehensive fitness tracking with AI-powered insights',
    image: '/api/placeholder/400/300',
    techStack: ['Flutter', 'Firebase', 'TensorFlow Lite', 'HealthKit'],
    status: 'Live',
    category: 'Mobile',
    users: '25K+',
    rating: 4.5
  },
  {
    id: 'chat-platform',
    title: 'Real-time Chat Platform',
    description: 'Secure messaging platform with video calls and file sharing',
    image: '/api/placeholder/400/300',
    techStack: ['React', 'Socket.io', 'WebRTC', 'Redis'],
    status: 'Live',
    category: 'Web',
    users: '15K+',
    rating: 4.8
  }
];

const categories = [
  { id: 'all', name: 'الكل', icon: '🎯' },
  { id: 'AI/ML', name: 'الذكاء الاصطناعي', icon: '🤖' },
  { id: 'Mobile', name: 'تطبيقات الموبايل', icon: '📱' },
  { id: 'Web', name: 'تطبيقات الويب', icon: '🌐' }
];

export default function ProductsSection() {
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
            Products & Platforms
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            A collection of innovative products and platforms we develop to serve various sectors
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <p className="text-gray-400">Product Preview</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'Live' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : product.status === 'Beta'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white text-sm">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {product.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                                     <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md border border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {product.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-md border border-gray-700/50">
                        +{product.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">👥</span>
                    <span className="text-white text-sm font-semibold">{product.users}</span>
                  </div>
                                     <div className="text-gray-400 text-sm">
                     Active Users
                   </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link href={`/products/${product.id}`}>
                    <motion.button
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg font-semibold text-sm hover:from-red-600 hover:to-orange-700 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                                             View Details
                    </motion.button>
                  </Link>
                  
                  <motion.button
                    className="px-4 py-2 bg-gray-800/50 border border-gray-700 text-white rounded-lg font-semibold text-sm hover:bg-gray-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-xl rounded-3xl border border-red-500/30 p-12">
                         <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
               Want to Know More?
             </h3>
             <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
               Discover all our products and platforms with their technical details
             </p>
            
            <Link href="/products">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                                 Explore All Products
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

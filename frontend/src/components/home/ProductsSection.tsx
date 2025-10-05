'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Target, Bot, Smartphone, Globe } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

// Products will be defined inside component to use translation

// Categories will be defined inside component to use translation

export default function ProductsSection() {
  const { t, isRTL } = useTranslation();

  const products = [
    {
      id: 'examco',
      title: 'Examco',
      description: 'Comprehensive platform for university course questions and exam preparation with AI-powered study tools',
      image: '/api/placeholder/400/300',
      techStack: ['Next.js', 'AI/ML', 'PostgreSQL', 'React'],
      status: 'In Development',
      category: 'Education',
      users: 'Coming Soon',
      rating: 4.8
    },
    {
      id: 'project-portfolio-hub',
      title: 'Project Portfolio Hub',
      description: 'Centralized platform connecting students, supervisors, and companies through graduation projects',
      image: '/api/placeholder/400/300',
      techStack: ['Flutter', 'Node.js', 'MongoDB', 'AI'],
      status: 'In Development',
      category: 'Education',
      users: 'Coming Soon',
      rating: 4.9
    },
    {
      id: 'teacher-platform',
      title: 'Teacher Platform',
      description: 'Personal website platform for teachers with lectures, exams, digital store, and student management',
      image: '/api/placeholder/400/300',
      techStack: ['Next.js', 'Stripe', 'PostgreSQL', 'AWS'],
      status: 'In Development',
      category: 'Education',
      users: 'Coming Soon',
      rating: 4.7
    },
    {
      id: 'ai-fragrance-finder',
      title: 'AI Fragrance Finder',
      description: 'AI-powered app suggesting global fragrances based on scent components with direct purchase integration',
      image: '/api/placeholder/400/300',
      techStack: ['Flutter', 'AI/ML', 'APIs', 'E-commerce'],
      status: 'In Development',
      category: 'AI & E-commerce',
      users: 'Coming Soon',
      rating: 4.6
    },
    {
      id: 'university-clubs-hub',
      title: 'University Clubs Hub',
      description: 'Comprehensive app for all university clubs, activities, and events across Jordan',
      image: '/api/placeholder/400/300',
      techStack: ['React Native', 'Firebase', 'Maps API', 'Social'],
      status: 'Planning',
      category: 'Social',
      users: 'Coming Soon',
      rating: 4.5
    },
    {
      id: 'bitwreckers-techverse',
      title: 'Bitwreckers Techverse',
      description: 'Comprehensive tech-media platform integrating specialized media, social interaction, and digital marketplace',
      image: '/api/placeholder/400/300',
      techStack: ['Next.js', 'AI', 'Web3', 'Media'],
      status: 'Planning',
      category: 'Tech Media',
      users: 'Coming Soon',
      rating: 4.8
    }
  ];

  const categories = [
    { id: 'all', name: t('products.categories.all'), icon: Target },
    { id: 'Education', name: 'Education', icon: Bot },
    { id: 'AI & E-commerce', name: 'AI & E-commerce', icon: Bot },
    { id: 'Social', name: 'Social', icon: Smartphone },
    { id: 'Tech Media', name: 'Tech Media', icon: Globe }
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
            {t('products.title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            {t('products.subtitle')}
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
              {/* Development Status Header */}
              <div className="relative h-32 bg-gradient-to-br from-[#9347a0]/10 to-[#b376bf]/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9347a0]/20 to-[#b376bf]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#9347a0] to-[#b376bf] rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-lg">⚙️</span>
                    </div>
                    <p className="text-gray-400 text-sm font-semibold">Under Development</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#9347a0]/20 text-[#d4aad9] border border-[#9347a0]/30 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white text-sm">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#b376bf] transition-colors duration-300">
                  {product.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                                     <h4 className="text-sm font-semibold text-gray-400 mb-2">{t('products.technologies')}</h4>
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
                    <span className="text-[#b376bf]">👥</span>
                    <span className="text-white text-sm font-semibold">{product.users}</span>
                  </div>
                                     <div className="text-gray-400 text-sm">
{t('products.activeUsers')}
                   </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link href={`/products/${product.id}`}>
                    <motion.button
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-lg font-semibold text-sm hover:from-[#7b3985] hover:to-[#9347a0] transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </Link>
                  
                  <motion.button
                    onClick={() => window.open('/consultation', '_blank')}
                    className="px-4 py-2 bg-gray-800/50 border border-gray-700 text-white rounded-lg font-semibold text-sm hover:bg-gray-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    title="Get Consultation"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#9347a0]/10 to-[#b376bf]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
          <div className="bg-gradient-to-r from-[#9347a0]/20 to-[#b376bf]/20 backdrop-blur-xl rounded-3xl border border-[#9347a0]/30 p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
              Explore All Products
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover our complete portfolio of innovative projects and cutting-edge solutions
            </p>
            
            <Link href="/products">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#9347a0] to-[#b376bf] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-[#9347a0]/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Products
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

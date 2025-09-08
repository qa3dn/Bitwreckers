'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const products = [
  {
    id: 'bitwreckers-platform',
    name: 'Bitwreckers Platform',
    description: 'A comprehensive platform for student developers to showcase projects, collaborate, and find opportunities.',
    image: '/api/placeholder/400/300',
    video: '/videos/platform-demo.mp4',
    stack: ['React', 'Node.js', 'MongoDB', 'AWS'],
    status: 'Live',
    statusColor: 'bg-green-500',
    slug: 'bitwreckers-platform'
  },
  {
    id: 'student-hub',
    name: 'Student Hub',
    description: 'Centralized hub for student resources, mentorship programs, and project management.',
    image: '/api/placeholder/400/300',
    video: '/videos/student-hub-demo.mp4',
    stack: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
    status: 'Beta',
    statusColor: 'bg-yellow-500',
    slug: 'student-hub'
  },
  {
    id: 'code-collab',
    name: 'Code Collab',
    description: 'Real-time collaborative coding environment for team projects and hackathons.',
    image: '/api/placeholder/400/300',
    video: '/videos/code-collab-demo.mp4',
    stack: ['TypeScript', 'WebRTC', 'Redis', 'Socket.io'],
    status: 'Development',
    statusColor: 'bg-blue-500',
    slug: 'code-collab'
  },
  {
    id: 'mentor-match',
    name: 'Mentor Match',
    description: 'AI-powered platform connecting students with industry mentors and experts.',
    image: '/api/placeholder/400/300',
    video: '/videos/mentor-match-demo.mp4',
    stack: ['Next.js', 'TensorFlow', 'Firebase', 'OpenAI'],
    status: 'Planning',
    statusColor: 'bg-purple-500',
    slug: 'mentor-match'
  },
  {
    id: 'project-showcase',
    name: 'Project Showcase',
    description: 'Portfolio platform for students to display their projects and achievements.',
    image: '/api/placeholder/400/300',
    video: '/videos/project-showcase-demo.mp4',
    stack: ['Svelte', 'Supabase', 'Tailwind CSS', 'Vercel'],
    status: 'Live',
    statusColor: 'bg-green-500',
    slug: 'project-showcase'
  },
  {
    id: 'learning-path',
    name: 'Learning Path',
    description: 'Personalized learning journey with AI-driven recommendations and progress tracking.',
    image: '/api/placeholder/400/300',
    video: '/videos/learning-path-demo.mp4',
    stack: ['Angular', 'Machine Learning', 'GraphQL', 'Kubernetes'],
    status: 'Alpha',
    statusColor: 'bg-orange-500',
    slug: 'learning-path'
  }
];

export default function ProductsPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

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
            Our Products & Platforms
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the innovative tools and platforms we've built to empower student developers
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
              >
                {/* Product Image/Video */}
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-4xl">🚀</span>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${product.statusColor}`}>
                    {product.status}
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.stack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={`/products/${product.slug}`}>
                    <motion.button
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 border-2 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: hoveredProduct === product.id ? '#3B82F6' : 'transparent' }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

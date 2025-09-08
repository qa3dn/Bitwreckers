'use client';

import { motion } from 'framer-motion';

const techPaths = [
  { name: 'Tech-Media', icon: '📱', color: 'from-purple-500 to-pink-500' },
  { name: 'DevOps', icon: '⚙️', color: 'from-blue-500 to-cyan-500' },
  { name: 'Backend', icon: '🔧', color: 'from-green-500 to-emerald-500' },
  { name: 'Mobile', icon: '📱', color: 'from-orange-500 to-red-500' },
  { name: 'Web', icon: '🌐', color: 'from-indigo-500 to-purple-500' },
];

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Innovation in every line of code
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join the next generation of developers and build your future with us
        </motion.p>

        {/* Tech Paths */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {techPaths.map((path, index) => (
            <motion.div
              key={path.name}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${path.color} text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <div className="text-4xl mb-2">{path.icon}</div>
              <div className="font-semibold text-sm">{path.name}</div>
              
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
          
          <motion.button
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">50+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

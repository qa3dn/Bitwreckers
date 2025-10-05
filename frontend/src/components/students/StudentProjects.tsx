'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

const technologies = ['All', 'React', 'Node.js', 'Python', 'Flutter', 'DevOps', 'AI/ML'];

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React and Node.js',
    technology: 'React',
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    student: 'Ahmed Ali',
    rating: 4.8
  },
  {
    id: 2,
    title: 'AI Chatbot',
    description: 'Intelligent chatbot using Python and machine learning',
    technology: 'AI/ML',
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    student: 'Sara Ahmed',
    rating: 4.9
  },
  {
    id: 3,
    title: 'Mobile App',
    description: 'Cross-platform mobile app built with Flutter',
    technology: 'Flutter',
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    student: 'Omar Hassan',
    rating: 4.7
  },
  {
    id: 4,
    title: 'DevOps Pipeline',
    description: 'Automated CI/CD pipeline with Docker and Kubernetes',
    technology: 'DevOps',
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    student: 'Fatima Zahra',
    rating: 4.6
  },
  {
    id: 5,
    title: 'Backend API',
    description: 'RESTful API built with Node.js and Express',
    technology: 'Node.js',
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    student: 'Youssef Mohamed',
    rating: 4.5
  },
  {
    id: 6,
    title: 'Data Analysis Tool',
    description: 'Python-based data analysis and visualization tool',
    technology: 'Python',
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    student: 'Layla Ibrahim',
    rating: 4.8
  }
];

export default function StudentProjects() {
  const { t } = useTranslation();
  const [selectedTech, setSelectedTech] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleFilter = (tech: string) => {
    setSelectedTech(tech);
    if (tech === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.technology === tech));
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {technologies.map((tech) => (
            <motion.button
              key={tech}
              onClick={() => handleFilter(tech)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedTech === tech
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTech}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                    {project.technology === 'React' && '⚛️'}
                    {project.technology === 'Node.js' && '🟢'}
                    {project.technology === 'Python' && '🐍'}
                    {project.technology === 'Flutter' && '📱'}
                    {project.technology === 'DevOps' && '⚙️'}
                    {project.technology === 'AI/ML' && '🤖'}
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-600">
                    {project.technology}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>

                  {/* Student Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {project.student.charAt(0)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{project.student}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-500">⭐</span>
                      <span className="ml-1 text-sm font-semibold">{project.rating}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('projects.viewCode')}
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('projects.liveDemo')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Projects */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('projects.viewAll')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

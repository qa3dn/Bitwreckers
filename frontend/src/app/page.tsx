'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import StudentsSection from '../components/home/StudentsSection';
import SolutionsSection from '../components/home/SolutionsSection';
import ProductsSection from '../components/home/ProductsSection';
import InnovationSection from '../components/home/InnovationSection';
import CommunitySection from '../components/home/CommunitySection';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 z-50"
        style={{ width: progressWidth }}
      />
      
      <Hero />
      <Features />
      
      {/* Students Section */}
      <StudentsSection />
      
      {/* Solutions Section */}
      <SolutionsSection />
      
      {/* Products Section */}
      <ProductsSection />
      
      {/* Innovation Section */}
      <InnovationSection />
      
      {/* Community Section */}
      <CommunitySection />
    </div>
  );
}

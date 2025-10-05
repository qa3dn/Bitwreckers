'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import StudentsSection from '../components/home/StudentsSection';
import SolutionsSection from '../components/home/SolutionsSection';
import ProductsSection from '../components/home/ProductsSection';
import InnovationSection from '../components/home/InnovationSection';
import CommunitySection from '../components/home/CommunitySection';
import useTranslation from '../hooks/useTranslation';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const { isRTL } = useTranslation();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] text-white overflow-hidden ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B2D73] via-[#9347a0] to-[#2D7363] z-50"
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

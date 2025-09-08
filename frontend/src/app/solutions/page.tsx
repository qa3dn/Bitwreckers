'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../../components/solutions/Hero';
import Services from '../../components/solutions/Services';
import Process from '../../components/solutions/Process';
import CaseStudies from '../../components/solutions/CaseStudies';
import Pricing from '../../components/solutions/Pricing';
import ContactCTA from '../../components/solutions/ContactCTA';

export default function SolutionsPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
        style={{ width: progressWidth }}
      />
      
      <Hero />
      <Services />
      <Process />
      <CaseStudies />
      <Pricing />
      <ContactCTA />
    </div>
  );
}

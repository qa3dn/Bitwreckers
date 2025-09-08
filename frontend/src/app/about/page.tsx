'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge technology and creative solutions."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Excellence",
    description: "Delivering exceptional quality in every project we undertake."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Collaboration",
    description: "Working together to achieve extraordinary results."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Growth",
    description: "Continuous learning and development for ourselves and our clients."
  }
];

const teamMembers = [
  {
    name: "Ahmed Hassan",
    role: "CEO & Founder",
    avatar: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Visionary leader driving innovation and strategic growth."
  },
  {
    name: "Sarah Al-Zahra",
    role: "CTO & Tech Lead",
    avatar: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Technical expert leading our development initiatives."
  },
  {
    name: "Omar Khalil",
    role: "Media & Design Lead",
    avatar: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Creative director crafting stunning visual experiences."
  },
  {
    name: "Layla Mansour",
    role: "PR & Communications",
    avatar: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Building strong relationships and brand presence."
  },
  {
    name: "Youssef Ibrahim",
    role: "Senior Developer",
    avatar: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Full-stack expert turning ideas into reality."
  },
  {
    name: "Nour El-Din",
    role: "DevOps Engineer",
    avatar: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Ensuring seamless deployment and infrastructure."
  }
];

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22.02L12 18.77L5.82 22.02L7 14.74L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Innovation",
    description: "Constantly exploring new technologies and approaches"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Transparency",
    description: "Open communication and honest collaboration"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Team Spirit",
    description: "Supporting each other to achieve common goals"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 6h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Growth",
    description: "Personal and professional development for all"
  }
];

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 z-50"
        style={{ width: progressWidth }}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />
        
                 {/* Animated Background Elements */}
         <motion.div
           className="absolute top-20 left-20 w-96 h-96 bg-red-500/10 rounded-full mix-blend-screen filter blur-3xl"
           animate={{
             scale: [1, 1.2, 1],
             rotate: [0, 180, 360],
             x: [0, 50, 0],
             y: [0, -50, 0],
           }}
           transition={{
             duration: 20,
             repeat: Infinity,
             ease: "linear"
           }}
         />
         <motion.div
           className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/10 rounded-full mix-blend-screen filter blur-3xl"
           animate={{
             scale: [1.2, 1, 1.2],
             rotate: [360, 180, 0],
             x: [0, -50, 0],
             y: [0, 50, 0],
           }}
           transition={{
             duration: 25,
             repeat: Infinity,
             ease: "linear"
           }}
         />
        
                 {/* Parallax Orb */}
         <motion.div
           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-10 blur-2xl"
           animate={{
             scale: [1, 1.5, 1],
             opacity: [0.1, 0.3, 0.1],
           }}
           transition={{
             duration: 4,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           style={{
             x: mousePosition.x * 0.01,
             y: mousePosition.y * 0.01,
           }}
         />

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            About Us
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Who we are, our vision, our mission, and what drives us forward.
          </motion.p>
          
          {/* Floating Elements */}
          <motion.div
            className="flex justify-center gap-12 mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {[
              <svg key="star" viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-red-400">
                <path d="M12 2L14.09 8.26L22 9L16 14.74L17.18 22.02L12 18.77L6.82 22.02L8 14.74L2 9L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              <svg key="eye" viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-orange-400">
                <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>,
              <svg key="target" viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-yellow-400">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ].map((icon, index) => (
              <motion.div
                key={index}
                className="relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  delay: index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.2, y: -10 }}
              >
                {icon}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100"
                  animate={{
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          {/* Vision */}
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-16 mb-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Text Content */}
            <motion.div
              className="flex-1 lg:text-right"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
                             <div className="flex items-center justify-end mb-6">
                 <motion.div
                   className="mr-4"
                   animate={{
                     textShadow: [
                       "0 0 10px rgba(239, 68, 68, 0.5)",
                       "0 0 20px rgba(239, 68, 68, 0.8)",
                       "0 0 10px rgba(239, 68, 68, 0.5)"
                     ]
                   }}
                   transition={{
                     duration: 2,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                 >
                   <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-red-400">
                     <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                   </svg>
                 </motion.div>
                 <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                   Our Vision
                 </h2>
               </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                To be the leading force in digital innovation, creating transformative solutions that empower businesses and individuals to reach their full potential in the digital age.
              </p>
            </motion.div>
            
            {/* Visual Element */}
                         <motion.div
               className="flex-1"
               initial={{ opacity: 0, x: 100 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, delay: 0.4 }}
               viewport={{ once: true }}
             >
               <div className="relative w-full h-96 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-3xl backdrop-blur-sm border border-red-400/20 overflow-hidden">
                 <motion.div
                   className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-orange-400/5"
                   animate={{
                     scale: [1, 1.1, 1],
                     rotate: [0, 5, 0],
                   }}
                   transition={{
                     duration: 8,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <motion.div
                     className="text-6xl text-red-400"
                     animate={{
                       y: [0, -20, 0],
                       scale: [1, 1.1, 1],
                     }}
                     transition={{
                       duration: 4,
                       repeat: Infinity,
                       ease: "easeInOut"
                     }}
                   >
                     <svg viewBox="0 0 24 24" fill="none" className="w-24 h-24">
                       <path d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22.02L12 18.77L5.82 22.02L7 14.74L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </motion.div>
                 </div>
               </div>
             </motion.div>
          </motion.div>

          {/* Mission */}
          <motion.div
            className="flex flex-col lg:flex-row-reverse items-center gap-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Text Content */}
            <motion.div
              className="flex-1 lg:text-left"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
                             <div className="flex items-center mb-6">
                 <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                   Our Mission
                 </h2>
                 <motion.div
                   className="ml-4"
                   animate={{
                     textShadow: [
                       "0 0 10px rgba(251, 146, 60, 0.5)",
                       "0 0 20px rgba(251, 146, 60, 0.8)",
                       "0 0 10px rgba(251, 146, 60, 0.5)"
                     ]
                   }}
                   transition={{
                     duration: 2,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                 >
                   <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-orange-400">
                     <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                     <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                     <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
                   </svg>
                 </motion.div>
               </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                To deliver exceptional digital experiences through innovative technology solutions, fostering creativity, collaboration, and continuous growth for our team and clients.
              </p>
            </motion.div>
            
            {/* Visual Element */}
                         <motion.div
               className="flex-1"
               initial={{ opacity: 0, x: -100 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, delay: 0.4 }}
               viewport={{ once: true }}
             >
               <div className="relative w-full h-96 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-3xl backdrop-blur-sm border border-orange-400/20 overflow-hidden">
                 <motion.div
                   className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-yellow-400/5"
                   animate={{
                     scale: [1.1, 1, 1.1],
                     rotate: [0, -5, 0],
                   }}
                   transition={{
                     duration: 8,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <motion.div
                     className="text-6xl text-orange-400"
                     animate={{
                       y: [0, 20, 0],
                       scale: [1, 1.1, 1],
                     }}
                     transition={{
                       duration: 4,
                       repeat: Infinity,
                       ease: "easeInOut"
                     }}
                   >
                     <svg viewBox="0 0 24 24" fill="none" className="w-24 h-24">
                       <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </motion.div>
                 </div>
               </div>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Pillars
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {pillars.map((pillar, index) => (
                             <motion.div
                 key={index}
                 className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-red-400/50 transition-all duration-500 overflow-hidden"
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: index * 0.1 }}
                 viewport={{ once: true }}
                 whileHover={{ y: -10, scale: 1.05 }}
               >
                 {/* Background Glow */}
                 <motion.div
                   className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                   style={{
                     background: `linear-gradient(135deg, rgba(239, 68, 68, 0.2), transparent)`
                   }}
                 />
                 
                 {/* Icon */}
                 <motion.div
                   className="mb-6 group-hover:scale-110 transition-transform duration-300 text-red-400"
                   animate={{
                     y: [0, -10, 0],
                   }}
                   transition={{
                     duration: 3,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: index * 0.2
                   }}
                 >
                   {pillar.icon}
                 </motion.div>
                 
                 {/* Content */}
                 <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                   {pillar.title}
                 </h3>
                 
                 <p className="text-gray-400 leading-relaxed">
                   {pillar.description}
                 </p>
                 
                 {/* Hover Glow Border */}
                 <motion.div
                   className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     boxShadow: `0 0 30px rgba(239, 68, 68, 0.4)`,
                     border: `2px solid rgba(239, 68, 68, 0.5)`
                   }}
                 />
               </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
                             <motion.div
                 key={index}
                 className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-orange-400/50 transition-all duration-500 overflow-hidden"
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: index * 0.1 }}
                 viewport={{ once: true }}
                 whileHover={{ y: -10, scale: 1.03 }}
               >
                 {/* Background Glow */}
                 <motion.div
                   className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                   style={{
                     background: `linear-gradient(135deg, rgba(251, 146, 60, 0.2), transparent)`
                   }}
                 />
                 
                 {/* Avatar */}
                 <motion.div
                   className="relative w-24 h-24 mx-auto mb-6"
                   whileHover={{ rotateY: 15, rotateX: 5 }}
                   transition={{ duration: 0.3 }}
                 >
                   <div className="w-full h-full bg-gradient-to-br from-red-400 to-orange-400 rounded-full p-1">
                     <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center text-white">
                       {member.avatar}
                     </div>
                   </div>
                   <motion.div
                     className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 to-orange-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"
                     animate={{
                       scale: [1, 1.2, 1],
                     }}
                     transition={{
                       duration: 2,
                       repeat: Infinity,
                       ease: "easeInOut"
                     }}
                   />
                 </motion.div>
                 
                 {/* Content */}
                 <div className="text-center">
                   <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                     {member.name}
                   </h3>
                   <p className="text-red-400 font-semibold mb-4">
                     {member.role}
                   </p>
                   <p className="text-gray-400 leading-relaxed">
                     {member.description}
                   </p>
                 </div>
                 
                 {/* Hover Glow Border */}
                 <motion.div
                   className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     boxShadow: `0 0 30px rgba(251, 146, 60, 0.4)`,
                     border: `2px solid rgba(251, 146, 60, 0.5)`
                   }}
                 />
               </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values & Culture Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Text Content */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
                             <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                 Values & Culture
               </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Our core values shape everything we do, from how we work together to how we serve our clients.
              </p>
              
              <div className="space-y-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl">{value.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {value.title}
                      </h3>
                      <p className="text-gray-400">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Visual Elements */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-96">
                                 {values.map((value, index) => (
                   <motion.div
                     key={index}
                     className="absolute w-20 h-20 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-full backdrop-blur-sm border border-red-400/20 flex items-center justify-center text-red-400"
                     style={{
                       top: `${20 + index * 20}%`,
                       left: `${20 + index * 15}%`,
                     }}
                     animate={{
                       y: [0, -20, 0],
                       scale: [1, 1.1, 1],
                       rotate: [0, 10, 0],
                     }}
                     transition={{
                       duration: 3,
                       delay: index * 0.5,
                       repeat: Infinity,
                       ease: "easeInOut"
                     }}
                   >
                     {value.icon}
                   </motion.div>
                 ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="container mx-auto">
                     {/* Animated Background Elements */}
           <motion.div
             className="absolute top-0 left-0 w-96 h-96 bg-red-400/5 rounded-full mix-blend-screen filter blur-3xl"
             animate={{
               scale: [1, 1.3, 1],
               x: [0, 100, 0],
               y: [0, -50, 0],
             }}
             transition={{
               duration: 20,
               repeat: Infinity,
               ease: "linear"
             }}
           />
           <motion.div
             className="absolute bottom-0 right-0 w-80 h-80 bg-orange-400/5 rounded-full mix-blend-screen filter blur-3xl"
             animate={{
               scale: [1.2, 1, 1.2],
               x: [0, -80, 0],
               y: [0, 30, 0],
             }}
             transition={{
               duration: 25,
               repeat: Infinity,
               ease: "linear"
             }}
           />
          
          {/* Main Content Container */}
          <motion.div
            className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
                         {/* Background Pattern */}
             <div className="absolute inset-0 opacity-5">
               <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10" />
               <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-400/10 to-transparent rounded-full blur-3xl" />
               <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl" />
             </div>
            
            {/* Content */}
            <div className="relative z-10 text-center py-20 px-8">
              {/* Title */}
                             <motion.h2
                 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent leading-tight"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
                 viewport={{ once: true }}
               >
                 Ready to innovate
                 <br />
                 <motion.span
                   className="inline-block"
                   animate={{
                     textShadow: [
                       "0 0 20px rgba(239, 68, 68, 0.5)",
                       "0 0 40px rgba(251, 146, 60, 0.5)",
                       "0 0 20px rgba(239, 68, 68, 0.5)"
                     ]
                   }}
                   transition={{
                     duration: 3,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                 >
                   with us?
                 </motion.span>
               </motion.h2>
              
              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join us on this exciting journey of innovation and growth. Let's create something extraordinary together.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                                 {/* Primary CTA */}
                 <motion.button
                   className="group relative px-12 py-6 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-red-400/25 transition-all duration-300 overflow-hidden"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <span className="relative z-10">Contact Us</span>
                   
                   {/* Animated Background */}
                   <motion.div
                     className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     initial={{ x: "-100%" }}
                     whileHover={{ x: "0%" }}
                     transition={{ duration: 0.3 }}
                   />
                   
                   {/* Glow Effect */}
                   <motion.div
                     className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
                     animate={{
                       scale: [1, 1.2, 1],
                     }}
                     transition={{
                       duration: 2,
                       repeat: Infinity,
                       ease: "easeInOut"
                     }}
                   />
                 </motion.button>
                 
                 {/* Secondary CTA */}
                 <motion.button
                   className="group relative px-12 py-6 border-2 border-red-400 text-red-400 rounded-full font-bold text-xl hover:bg-red-400 hover:text-gray-900 transition-all duration-300"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <span className="relative z-10">Join Our Team</span>
                   
                   {/* Hover Background */}
                   <motion.div
                     className="absolute inset-0 bg-red-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"
                   />
                 </motion.button>
              </motion.div>
            </div>
            
                         {/* Corner Accents */}
             <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-red-400/50 rounded-tl-3xl" />
             <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-orange-400/50 rounded-br-3xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

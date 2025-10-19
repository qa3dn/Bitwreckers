'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import useTranslation from '../../hooks/useTranslation';

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t, isRTL } = useTranslation();

  const pillars = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t('about.pillars.innovation.title'),
      description: t('about.pillars.innovation.description')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t('about.pillars.excellence.title'),
      description: t('about.pillars.excellence.description')
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
      title: t('about.pillars.collaboration.title'),
      description: t('about.pillars.collaboration.description')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t('about.pillars.growth.title'),
      description: t('about.pillars.growth.description')
    }
  ];

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoadingMembers(true);
      
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      
      // Transform data to match the expected format
      const transformedMembers = (data || []).map(member => ({
        name: member.name,
        role: member.role,
        description: member.description,
        avatar_url: member.avatar_url,
        avatar: member.avatar_url ? (
          <img 
            src={member.avatar_url} 
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      }));
      
      setTeamMembers(transformedMembers);
    } catch (error: any) {
      console.error('Error fetching team members:', error);
      // Fallback to static data if API fails or table doesn't exist
      if (error.message.includes('relation "team_members" does not exist') || 
          error.message.includes('relation "public.team_members" does not exist')) {
        console.log('Team members table does not exist, using fallback data');
      }
      
      setTeamMembers([
        {
          name: "Mohammad Qaadan",
          role: "Founder | CEO",
          avatar: (
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          description: "Visionary leader driving innovation and strategic growth."
        },
        {
          name: "Ahmad Al Hamad",
          role: "Back-end Developer",
          avatar: (
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          description: "Expert in server-side development and database architecture."
        },
        {
          name: "Mohammad Al Khaldi",
          role: "UI/UX Team",
          avatar: (
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          description: "Creative designer crafting stunning user experiences."
        }
      ]);
    } finally {
      setLoadingMembers(false);
    }
  };

  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22.02L12 18.77L5.82 22.02L7 14.74L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t('about.values.transparency.title'),
      description: t('about.values.transparency.description')
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
      title: t('about.values.teamSpirit.title'),
      description: t('about.values.teamSpirit.description')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 6h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t('about.values.growth.title'),
      description: t('about.values.growth.description')
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] text-white overflow-hidden ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B2D73] via-[#9347a0] to-[#2D7363] z-50"
        style={{ width: progressWidth }}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1b] via-[#1a1a2e] to-[#131422]" />
        
                 {/* Animated Background Elements */}
         <motion.div
           className="absolute top-20 left-20 w-96 h-96 bg-[#6B2D73]/10 rounded-full mix-blend-screen filter blur-3xl"
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
           className="absolute bottom-20 right-20 w-80 h-80 bg-[#2D7363]/10 rounded-full mix-blend-screen filter blur-3xl"
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
           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-[#6B2D73] to-[#2D7363] rounded-full opacity-10 blur-2xl"
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

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <motion.div
            className="mb-8 sm:mb-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              <img 
                src="/Logo-icon.png" 
                alt="Bitwreckers Logo" 
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain filter drop-shadow-2xl"
              />
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6B2D73] to-[#2D7363] rounded-full blur-2xl opacity-30 scale-110 -z-10" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
{t('about.title')}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-[#F8F8F8] mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
{t('about.subtitle')}
          </motion.p>
          
          {/* Floating Elements */}
          <motion.div
            className="flex justify-center gap-12 mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {[
              <svg key="star" viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-[#b376bf]">
                <path d="M12 2L14.09 8.26L22 9L16 14.74L17.18 22.02L12 18.77L6.82 22.02L8 14.74L2 9L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              <svg key="eye" viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-[#2D7363]">
                <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>,
              <svg key="target" viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-[#d4aad9]">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ].map((icon, index) => (
              <motion.div
                key={index}
                className="relative p-4 rounded-2xl bg-[#6B2D73]/10 backdrop-blur-sm border border-[#6B2D73]/20"
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
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6B2D73]/20 to-[#2D7363]/20 opacity-0 group-hover:opacity-100"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                       "0 0 10px rgba(107, 45, 115, 0.5)",
                       "0 0 20px rgba(107, 45, 115, 0.8)",
                       "0 0 10px rgba(107, 45, 115, 0.5)"
                     ]
                   }}
                   transition={{
                     duration: 2,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                 >
                   <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-[#b376bf]">
                     <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                   </svg>
                 </motion.div>
                 <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent">
{t('about.vision.title')}
                 </h2>
               </div>
              <p className="text-xl text-[#F8F8F8] leading-relaxed">
{t('about.vision.description')}
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
               <div className="relative w-full h-96 bg-gradient-to-br from-[#6B2D73]/10 to-[#2D7363]/10 rounded-3xl backdrop-blur-sm border border-[#6B2D73]/20 overflow-hidden">
                 <motion.div
                   className="absolute inset-0 bg-gradient-to-br from-[#6B2D73]/5 to-[#2D7363]/5"
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
                     className="text-6xl text-[#b376bf]"
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
                 <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2D7363] to-[#5fa896] bg-clip-text text-transparent">
{t('about.mission.title')}
                 </h2>
                 <motion.div
                   className="ml-4"
                   animate={{
                     textShadow: [
                       "0 0 10px rgba(45, 115, 99, 0.5)",
                       "0 0 20px rgba(45, 115, 99, 0.8)",
                       "0 0 10px rgba(45, 115, 99, 0.5)"
                     ]
                   }}
                   transition={{
                     duration: 2,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                 >
                   <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-[#2D7363]">
                     <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                     <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                     <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
                   </svg>
                 </motion.div>
               </div>
              <p className="text-xl text-[#F8F8F8] leading-relaxed">
{t('about.mission.description')}
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
               <div className="relative w-full h-96 bg-gradient-to-br from-[#2D7363]/10 to-[#5fa896]/10 rounded-3xl backdrop-blur-sm border border-[#2D7363]/20 overflow-hidden">
                 <motion.div
                   className="absolute inset-0 bg-gradient-to-br from-[#2D7363]/5 to-[#5fa896]/5"
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
                     className="text-6xl text-[#2D7363]"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
{t('about.pillars.title')}
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
                 className="group relative bg-[#131422]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#6B2D73]/30 hover:border-[#6B2D73]/80 transition-all duration-500 overflow-hidden"
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
                     background: `linear-gradient(135deg, rgba(107, 45, 115, 0.2), transparent)`
                   }}
                 />
                 
                 {/* Icon */}
                 <motion.div
                   className="mb-6 group-hover:scale-110 transition-transform duration-300 text-[#b376bf]"
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
                 <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#b376bf] transition-colors duration-300">
                   {pillar.title}
                 </h3>
                 
                 <p className="text-[#F8F8F8]/80 leading-relaxed">
                   {pillar.description}
                 </p>
                 
                 {/* Hover Glow Border */}
                 <motion.div
                   className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     boxShadow: `0 0 30px rgba(107, 45, 115, 0.4)`,
                     border: `2px solid rgba(107, 45, 115, 0.5)`
                   }}
                 />
               </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#2D7363] to-[#5fa896] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
{t('about.team.title')}
          </motion.h2>
          
          {loadingMembers ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-[#6B2D73] border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-4 text-[#F8F8F8] text-lg">Loading team members...</span>
            </div>
          ) : (
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
                 className="group relative bg-[#131422]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#2D7363]/30 hover:border-[#2D7363]/80 transition-all duration-500 overflow-hidden"
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
                     background: `linear-gradient(135deg, rgba(45, 115, 99, 0.2), transparent)`
                   }}
                 />
                 
                 {/* Avatar */}
                 <motion.div
                   className="relative w-24 h-24 mx-auto mb-6"
                   whileHover={{ rotateY: 15, rotateX: 5 }}
                   transition={{ duration: 0.3 }}
                 >
                   <div className="w-full h-full bg-gradient-to-br from-[#6B2D73] to-[#2D7363] rounded-full p-1">
                     <div className="w-full h-full bg-[#131422] rounded-full flex items-center justify-center text-white">
                       {member.avatar}
                     </div>
                   </div>
                   <motion.div
                     className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6B2D73] to-[#2D7363] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"
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
                   <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#2D7363] transition-colors duration-300">
                     {member.name}
                   </h3>
                   <p className="text-[#b376bf] font-semibold mb-4">
                     {member.role}
                   </p>
                   <p className="text-[#F8F8F8]/80 leading-relaxed">
                     {member.description}
                   </p>
                 </div>
                 
                 {/* Hover Glow Border */}
                 <motion.div
                   className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{
                     boxShadow: `0 0 30px rgba(45, 115, 99, 0.4)`,
                     border: `2px solid rgba(45, 115, 99, 0.5)`
                   }}
                 />
               </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Values & Culture Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-[#6B2D73]/5 rounded-full mix-blend-screen filter blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-[#2D7363]/5 rounded-full mix-blend-screen filter blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('about.values.title')}
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-[#F8F8F8] max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {t('about.values.subtitle')}
            </motion.p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group relative bg-[#131422]/60 backdrop-blur-xl rounded-3xl p-8 border border-[#6B2D73]/30 hover:border-[#6B2D73]/80 transition-all duration-700 overflow-hidden"
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, rgba(107, 45, 115, 0.3), rgba(45, 115, 99, 0.2))`
                  }}
                />
                
                {/* Floating Particles */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-[#b376bf] rounded-full opacity-60"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-6 left-6 w-1 h-1 bg-[#2D7363] rounded-full opacity-40"
                  animate={{
                    y: [0, 8, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Icon Container */}
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-6"
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#6B2D73] to-[#2D7363] rounded-2xl p-4 flex items-center justify-center">
                    <motion.div
                      className="text-3xl text-white"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        delay: index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {value.icon}
                    </motion.div>
                  </div>
                  
                  {/* Icon Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6B2D73] to-[#2D7363] opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                {/* Content */}
                <div className="text-center">
                  <motion.h3
                    className="text-2xl font-bold text-white mb-4 group-hover:text-[#b376bf] transition-colors duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {value.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-[#F8F8F8]/90 leading-relaxed group-hover:text-white transition-colors duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {value.description}
                  </motion.p>
                </div>
                
                {/* Hover Glow Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    boxShadow: `0 0 40px rgba(107, 45, 115, 0.6), inset 0 0 20px rgba(45, 115, 99, 0.2)`,
                    border: `2px solid rgba(107, 45, 115, 0.8)`
                  }}
                />
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#6B2D73]/50 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#2D7363]/50 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Decoration */}
          <motion.div
            className="flex justify-center mt-20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-16 h-1 bg-gradient-to-r from-[#6B2D73] to-[#2D7363] rounded-full"
                animate={{
                  scaleX: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="w-3 h-3 bg-[#b376bf] rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="w-16 h-1 bg-gradient-to-r from-[#2D7363] to-[#6B2D73] rounded-full"
                animate={{
                  scaleX: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     {/* Animated Background Elements */}
           <motion.div
             className="absolute top-0 left-0 w-96 h-96 bg-[#6B2D73]/5 rounded-full mix-blend-screen filter blur-3xl"
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
             className="absolute bottom-0 right-0 w-80 h-80 bg-[#2D7363]/5 rounded-full mix-blend-screen filter blur-3xl"
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
            className="relative bg-[#131422]/80 backdrop-blur-xl rounded-3xl border border-[#6B2D73]/50 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
                         {/* Background Pattern */}
             <div className="absolute inset-0 opacity-5">
               <div className="absolute inset-0 bg-gradient-to-br from-[#6B2D73]/10 via-[#9347a0]/10 to-[#2D7363]/10" />
               <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6B2D73]/10 to-transparent rounded-full blur-3xl" />
               <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-[#2D7363]/10 to-transparent rounded-full blur-3xl" />
             </div>
            
            {/* Content */}
            <div className="relative z-10 text-center py-20 px-8">
              {/* Title */}
                             <motion.h2
                 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-[#b376bf] via-[#d4aad9] to-[#2D7363] bg-clip-text text-transparent leading-tight"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
                 viewport={{ once: true }}
               >
{t('about.cta.title')}
               </motion.h2>
              
              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-[#F8F8F8] mb-16 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
{t('about.cta.subtitle')}
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                                 {/* Primary CTA - Contact */}
                 <Link href="/contact">
                   <motion.button
                     className="group relative px-12 py-6 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-[#2D7363]/25 transition-all duration-300 overflow-hidden"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     <span className="relative z-10">{t('about.cta.contactUs')}</span>
                     
                     {/* Animated Background */}
                     <motion.div
                       className="absolute inset-0 bg-gradient-to-r from-[#5fa896] to-[#8fd5c4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       initial={{ x: "-100%" }}
                       whileHover={{ x: "0%" }}
                       transition={{ duration: 0.3 }}
                     />
                     
                     {/* Glow Effect */}
                     <motion.div
                       className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2D7363] to-[#5fa896] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
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
                 </Link>
                 
                 {/* Secondary CTA - Join */}
                 <Link href="/join">
                   <motion.button
                     className="group relative px-12 py-6 border-2 border-[#6B2D73] text-[#b376bf] rounded-full font-bold text-xl hover:bg-[#6B2D73] hover:text-white transition-all duration-300"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     <span className="relative z-10">{t('about.cta.joinTeam')}</span>
                     
                     {/* Hover Background */}
                     <motion.div
                       className="absolute inset-0 bg-[#6B2D73] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"
                     />
                   </motion.button>
                 </Link>
              </motion.div>
            </div>
            
                         {/* Corner Accents */}
             <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#6B2D73]/50 rounded-tl-3xl" />
             <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#2D7363]/50 rounded-br-3xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

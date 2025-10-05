'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import useTranslation from '../hooks/useTranslation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, changeLanguage, isRTL } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('common.home'), href: '/' },
    { name: t('common.about'), href: '/about' },
    { name: t('common.services'), href: '/services' },
    { name: t('common.blog'), href: '/blog' },
    // { name: t('common.portfolio'), href: '/portfolio' }, // Temporarily hidden
    { name: t('common.faq'), href: '/faq' },
    { name: t('common.contact'), href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isRTL ? 'font-arabic' : 'font-english'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className={`flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-[#6B2D73]/95 backdrop-blur-md shadow-xl shadow-[#6B2D73]/20'
            : 'bg-white/5 backdrop-blur-sm'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xl sm:text-2xl font-bold text-white">
                Bitwreckers
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mx-6"
              >
                <Link
                  href={item.href}
                  className="text-sm font-semibold transition-colors duration-200 text-white hover:text-[#d4aad9] whitespace-nowrap"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => {
                changeLanguage('en');
                // Force page re-render to update all components
                setTimeout(() => {
                  window.location.reload();
                }, 50);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                language === 'en'
                  ? 'bg-[#2D7363] text-white hover:bg-[#5fa896]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => {
                changeLanguage('ar');
                // Force page re-render to update all components
                setTimeout(() => {
                  window.location.reload();
                }, 50);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                language === 'ar'
                  ? 'bg-[#2D7363] text-white hover:bg-[#5fa896]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              العربية
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md transition-colors duration-200 text-white hover:text-[#d4aad9]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#6B2D73]/95 backdrop-blur-md rounded-2xl mt-2 shadow-xl"
            >
              <div className="px-6 py-6 space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-white hover:text-[#d4aad9] font-semibold transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => {
                        changeLanguage('en');
                        setTimeout(() => {
                          window.location.reload();
                        }, 50);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        language === 'en'
                          ? 'bg-[#2D7363] text-white'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      English
                    </button>
                    <button 
                      onClick={() => {
                        changeLanguage('ar');
                        setTimeout(() => {
                          window.location.reload();
                        }, 50);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        language === 'ar'
                          ? 'bg-[#2D7363] text-white'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      العربية
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

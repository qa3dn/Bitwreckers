'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import useTranslation from '../hooks/useTranslation';
import { 
  FaFacebook, 
  FaTelegram, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, isRTL } = useTranslation();

  const footerLinks = {
    company: [
      { name: t('footer.company.about'), href: '/about' },
      { name: 'Our Team', href: '/about#team' },
      { name: t('footer.company.careers'), href: '/join' },
      { name: 'Join Bitwreckers', href: '/join' },
    ],
    services: [
      { name: t('footer.services.webDevelopment'), href: '/services/web-development' },
      { name: t('footer.services.mobileDevelopment'), href: '/services/mobile-development' },
      { name: 'UI/UX Design', href: '/services/ui-ux-design' },
      { name: 'Get Consultation', href: '/consultation' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: t('footer.resources.tutorials'), href: '/tutorials' },
      { name: 'FAQ', href: '/faq' },
      { name: t('footer.resources.support'), href: '/contact' },
    ],
    legal: [
        { name: t('footer.legal.privacy'), href: '/privacy' },
        { name: t('footer.legal.terms'), href: '/terms' },
      ],
  };

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/bitwreckers', icon: FaFacebook, color: 'hover:text-blue-500' },
    { name: 'X (Twitter)', href: 'https://x.com/bitwreckers', icon: FaXTwitter, color: 'hover:text-gray-300' },
    { name: 'Instagram', href: 'https://instagram.com/bitwreckers', icon: FaInstagram, color: 'hover:text-pink-500' },
    { name: 'Telegram', href: 'https://t.me/bitwreckers', icon: FaTelegram, color: 'hover:text-blue-400' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/bitwreckers', icon: FaLinkedin, color: 'hover:text-blue-600' },
    { name: 'GitHub', href: 'https://github.com/bitwreckers', icon: FaGithub, color: 'hover:text-gray-300' },
  ];

  return (
    <footer className={`bg-[#6B2D73]/95 backdrop-blur-md border-t border-[#6B2D73]/30 text-white ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="inline-block mb-4">
                <span className="text-3xl font-bold text-white">
                  {t('navbar.logo')}
                </span>
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t('footer.description')}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:bg-gray-700/50`}
                  >
                    <span className="sr-only">{social.name}</span>
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">{t('footer.services.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">{t('footer.resources.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-[#6B2D73]/30 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              {t('footer.copyright').replace('2024', currentYear.toString())}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

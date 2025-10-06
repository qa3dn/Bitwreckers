'use client';

import { useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface Translation {
  [key: string]: any;
}

const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translation>({});

  useEffect(() => {
    // Load translations based on current language
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../locales/${language}.json`);
        console.log(`Loaded translations for ${language}:`, translationModule.default);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English if Arabic fails
        if (language === 'ar') {
          const fallbackModule = await import(`../locales/en.json`);
          setTranslations(fallbackModule.default);
        }
      }
    };

    loadTranslations();
  }, [language]);

  // Add a key to force re-render of components when language changes
  const translationKey = `${language}-${Object.keys(translations).length}`;

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.log(`Translation not found for key: ${key}, language: ${language}`);
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // Store language preference in localStorage
    localStorage.setItem('language', newLanguage);
    // Update HTML lang attribute
    document.documentElement.lang = newLanguage;
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Force reload translations immediately
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../locales/${newLanguage}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English if Arabic fails
        if (newLanguage === 'ar') {
          const fallbackModule = await import(`../locales/en.json`);
          setTranslations(fallbackModule.default);
        }
      }
    };
    
    loadTranslations();
  };

  useEffect(() => {
    // Load language preference from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    } else {
      // Default to English
      setLanguage('en');
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    }
  }, []);

  return {
    t,
    language,
    changeLanguage,
    isRTL: language === 'ar',
    translationKey,
  };
};

export { useTranslation };
export default useTranslation;

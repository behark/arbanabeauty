"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiGlobe } from 'react-icons/fi';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-md"
      >
        <FiGlobe className="w-4 h-4 text-primary" />
        <div className="flex gap-1">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 text-sm font-medium rounded-full transition-all ${
              language === 'en'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('sq')}
            className={`px-2 py-1 text-sm font-medium rounded-full transition-all ${
              language === 'sq'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            SQ
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSwitcher;

"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show the toggle once the component is mounted on client-side
  // to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className={`w-10 h-10 ${className}`}></div>; // Placeholder with same dimensions
  }
  
  return (
    <button
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <FiSun className="w-6 h-6 text-yellow-400" />
      ) : (
        <FiMoon className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
}

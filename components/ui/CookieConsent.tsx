"use client";

import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

interface CookieConsentProps {
  className?: string;
}

export default function CookieConsent({ className = "" }: CookieConsentProps) {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsent = localStorage.getItem("cookie-consent");
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500); // Delay to allow page to load first
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "false");
    setShowConsent(false);
    
    // Disable analytics if user declines cookies
    if (typeof window !== 'undefined') {
      // Disable Google Analytics
      (window as any)['ga-disable-GA_MEASUREMENT_ID'] = true;
      
      // Clear any existing cookies (simplified example)
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
    }
  };

  if (!showConsent) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 p-4 ${className}`}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 pr-4">
          <h3 className="text-lg font-semibold mb-2">Privacy &amp; Cookies</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We use cookies to improve your experience on our website. By browsing this site, 
            you agree to our use of cookies. You can adjust your preferences anytime.
            <a 
              href="/privacy" 
              className="text-primary underline ml-1"
              onClick={(e) => e.stopPropagation()}
            >
              Learn more
            </a>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-sm text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-primary text-white rounded-sm text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Accept All Cookies
          </button>
          <button 
            onClick={() => setShowConsent(false)} 
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'sq';
  setLanguage: (lang: 'en' | 'sq') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.makeup': 'Makeup',
    'nav.academy': 'Academy',
    'nav.products': 'Products',
    'nav.contact': 'Contact',
    'nav.book': 'Book Now',
    'hero.title': 'Professional Makeup Artist & Beauty Expert',
    'hero.subtitle': 'Transform your beauty with expert makeup artistry and professional training in Mitrovica',
    'hero.cta.book': 'Book Consultation',
    'hero.cta.portfolio': 'View Portfolio',
    'about.title': 'About Arbana',
    'about.subtitle': 'Your trusted beauty professional',
    'about.description': 'With years of experience in the beauty industry, I provide personalized treatments to enhance your natural beauty.',
    'services.title': 'Our Services',
    'services.subtitle': 'Professional beauty treatments for every occasion',
    'services.popular': 'Popular',
    'services.book': 'Book Now',
    'services.details': 'Learn More',
    'services.viewAll': 'View All Services',
    'booking.title': 'Book Appointment',
    'booking.subtitle': 'Schedule your beauty treatment with us',
    'booking.service': 'Select Service',
    'booking.selectService': 'Choose a service',
    'booking.date': 'Select Date',
    'booking.time': 'Select Time',
    'booking.name': 'Full Name',
    'booking.phone': 'Phone Number',
    'booking.email': 'Email Address',
    'booking.notes': 'Additional Notes',
    'booking.notesPlaceholder': 'Any special requests or concerns?',
    'booking.submit': 'Send Booking Request'
  },
  sq: {
    'nav.home': 'Ballina',
    'nav.about': 'Rreth Nesh',
    'nav.makeup': 'Makeup',
    'nav.academy': 'Akademia',
    'nav.products': 'Produktet',
    'nav.contact': 'Kontakti',
    'nav.book': 'Rezervo Tani',
    'hero.title': 'Artiste Profesionale Makeup & Eksperte Bukurie',
    'hero.subtitle': 'Transformo bukurinë tënde me artizanatin ekspert të makeup-it dhe trajnimin profesional në Mitrovicë',
    'hero.cta.book': 'Rezervo Konsultim',
    'hero.cta.portfolio': 'Shiko Portfolion',
    'about.title': 'Rreth Arbana',
    'about.subtitle': 'Profesionistja juaj e besuar e bukurisë',
    'about.description': 'Me vite përvojë në industrinë e bukurisë, ofrojmë trajtime të personalizuara për të theksuar bukurinë tuaj natyrale.',
    'services.title': 'Shërbimet Tona',
    'services.subtitle': 'Trajtim profesional bukurie për çdo rast',
    'services.popular': 'Popullor',
    'services.book': 'Rezervo Tani',
    'services.details': 'Mëso Më Shumë',
    'services.viewAll': 'Shiko Të Gjitha',
    'booking.title': 'Rezervo Takim',
    'booking.subtitle': 'Planifiko trajtimin tënd të bukurisë me ne',
    'booking.service': 'Zgjidh Shërbimin',
    'booking.selectService': 'Zgjidh një shërbim',
    'booking.date': 'Zgjidh Datën',
    'booking.time': 'Zgjidh Kohën',
    'booking.name': 'Emri i Plotë',
    'booking.phone': 'Numri i Telefonit',
    'booking.email': 'Adresa Email',
    'booking.notes': 'Shënime Shtesë',
    'booking.notesPlaceholder': 'Ndonjë kërkesë ose shqetësim i veçantë?',
    'booking.submit': 'Dërgo Kërkesën'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'sq'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

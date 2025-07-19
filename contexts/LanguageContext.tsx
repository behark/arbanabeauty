"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sq';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.makeup': 'Makeup',
    'nav.academy': 'Academy',
    'nav.products': 'Products',
    'nav.contact': 'Contact',
    'nav.book': 'Book Now',
    
    // Hero Section
    'hero.title': 'Professional Makeup Artist & Beauty Expert',
    'hero.subtitle': 'Transform your beauty with expert makeup artistry and professional training in Mitrovice',
    'hero.cta.book': 'Book Consultation',
    'hero.cta.portfolio': 'View Portfolio',
    
    // About Section
    'about.title': 'About Arbana',
    'about.subtitle': 'Professional makeup artist with years of experience in bridal, editorial, and special event makeup',
    'about.description': 'With a passion for enhancing natural beauty and years of professional experience, I specialize in creating stunning makeup looks for every occasion. From intimate bridal sessions to high-fashion editorial shoots, I bring artistry and precision to every client.',
    'about.cta': 'Learn More About Me',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'Professional makeup services for every occasion',
    'services.bridal.title': 'Bridal Makeup',
    'services.bridal.description': 'Your perfect wedding day look with trial sessions and on-location service',
    'services.editorial.title': 'Editorial & Fashion',
    'services.editorial.description': 'High-fashion makeup for photoshoots, runway, and editorial work',
    'services.special.title': 'Special Events',
    'services.special.description': 'Glamorous makeup for parties, galas, and special occasions',
    'services.lessons.title': 'Makeup Lessons',
    'services.lessons.description': 'Learn professional techniques with personalized one-on-one instruction',
    
    // Academy Section
    'academy.title': 'Arbana Beauty Academy',
    'academy.subtitle': 'Learn from a professional and start your makeup artistry journey',
    'academy.description': 'Our comprehensive courses cover everything from basic makeup application to advanced professional techniques. Join our academy and turn your passion into a career.',
    'academy.cta': 'Explore Courses',
    
    // Products Section
    'products.title': 'Arbana Beauty Products',
    'products.subtitle': 'Discover our premium collection of vegan, cruelty-free, and paraben-free beauty essentials crafted with quality and performance in mind.',
    'products.cta': 'Shop Now',
    
    // Testimonials Section
    'testimonials.title': 'Client Testimonials',
    'testimonials.subtitle': 'What our clients say about their experience',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Ready to transform your look or start your beauty journey? Contact us today.',
    'contact.location': 'Studio Location',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.social': 'Social Media',
    'contact.hours': 'Working Hours',
    'contact.cta': 'Book Consultation',
    
    // Footer
    'footer.description': 'Professional makeup artist and beauty expert in Mitrovice, Kosovo. Specializing in bridal, editorial, and special event makeup.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.contact': 'Contact Info',
    'footer.rights': 'All rights reserved.',
  },
  sq: {
    // Navigation
    'nav.home': 'Kreu',
    'nav.about': 'Rreth Nesh',
    'nav.makeup': 'Makeup',
    'nav.academy': 'Akademia',
    'nav.products': 'Produktet',
    'nav.contact': 'Kontakti',
    'nav.book': 'Rezervo Tani',
    
    // Hero Section
    'hero.title': 'Artiste Profesionale Makeup & Eksperte Bukurie',
    'hero.subtitle': 'Transformo bukurinë tënde me artizanatin ekspert të makeup-it dhe trajnimin profesional në Mitrovicë',
    'hero.cta.book': 'Rezervo Konsultim',
    'hero.cta.portfolio': 'Shiko Portfolion',
    
    // About Section
    'about.title': 'Rreth Arbana',
    'about.subtitle': 'Artiste profesionale makeup me vite përvojë në makeup për nuse, editorial dhe ngjarje të veçanta',
    'about.description': 'Me një pasion për të theksuar bukurinë natyrore dhe vite përvojë profesionale, specializohem në krijimin e pamjeve mahnitëse të makeup-it për çdo rast. Nga seanset intime të nuseve deri te fotografimet e modës së lartë, sjell artizanatin dhe precizionin për çdo klient.',
    'about.cta': 'Mëso Më Shumë Rreth Meje',
    
    // Services Section
    'services.title': 'Shërbimet Tona',
    'services.subtitle': 'Shërbime profesionale makeup për çdo rast',
    'services.bridal.title': 'Makeup Nusesh',
    'services.bridal.description': 'Pamja e përsosur për ditën tuaj të dasmës me seanca prove dhe shërbim në lokacion',
    'services.editorial.title': 'Editorial & Modë',
    'services.editorial.description': 'Makeup i modës së lartë për fotografime, pistë dhe punë editoriale',
    'services.special.title': 'Ngjarje të Veçanta',
    'services.special.description': 'Makeup i shkëlqyer për festa, gala dhe raste të veçanta',
    'services.lessons.title': 'Mësime Makeup',
    'services.lessons.description': 'Mëso teknika profesionale me udhëzime të personalizuara një-me-një',
    
    // Academy Section
    'academy.title': 'Akademia e Bukurisë Arbana',
    'academy.subtitle': 'Mëso nga një profesionale dhe fillo udhëtimin tënd në artizanatin e makeup-it',
    'academy.description': 'Kurset tona gjithëpërfshirëse mbulojnë gjithçka nga aplikimi bazik i makeup-it deri te teknikat e avancuara profesionale. Bashkohu me akademinë tonë dhe ktheje pasionin tënd në karrierë.',
    'academy.cta': 'Eksploro Kurset',
    
    // Products Section
    'products.title': 'Produktet e Bukurisë Arbana',
    'products.subtitle': 'Zbulo koleksionin tonë premium të produkteve vegan, pa krudelteti dhe pa parabene të bukurisë të krijuara me cilësi dhe performancë në mendje.',
    'products.cta': 'Blej Tani',
    
    // Testimonials Section
    'testimonials.title': 'Dëshmitë e Klientëve',
    'testimonials.subtitle': 'Çfarë thonë klientët tanë për përvojën e tyre',
    
    // Contact Section
    'contact.title': 'Na Kontaktoni',
    'contact.subtitle': 'Gati të transformosh pamjen tënde ose të fillosh udhëtimin tënd të bukurisë? Na kontakto sot.',
    'contact.location': 'Lokacioni i Studios',
    'contact.phone': 'Telefoni',
    'contact.email': 'Email-i',
    'contact.social': 'Rrjetet Sociale',
    'contact.hours': 'Orët e Punës',
    'contact.cta': 'Rezervo Konsultim',
    
    // Footer
    'footer.description': 'Artiste profesionale makeup dhe eksperte bukurie në Mitrovicë, Kosovë. Specializohem në makeup për nuse, editorial dhe ngjarje të veçanta.',
    'footer.quickLinks': 'Lidhje të Shpejta',
    'footer.services': 'Shërbimet',
    'footer.contact': 'Informacionet e Kontaktit',
    'footer.rights': 'Të gjitha të drejtat e rezervuara.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

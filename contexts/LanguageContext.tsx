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
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
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
    booking: {
      title: 'Rezervo Takim',
      subtitle: 'Planifiko trajtimin tënd të bukurisë me ne',
      service: 'Zgjidh Shërbimin',
      selectService: 'Zgjidh një shërbim',
      date: 'Zgjidh Datën',
      time: 'Zgjidh Kohën',
      name: 'Emri i Plotë',
      phone: 'Numri i Telefonit',
      email: 'Adresa Email',
      notes: 'Shënime Shtesë',
      notesPlaceholder: 'Ndonjë kërkesë ose shqetësim i veçantë?',
      submit: 'Dërgo Kërkesën'
    },
    services: {
      title: 'Shërbimet Tona',
      subtitle: 'Trajtim profesional bukurie për çdo rast',
      popular: 'Popullor',
      book: 'Rezervo Tani',
      details: 'Mëso Më Shumë',
      viewAll: 'Shiko Të Gjitha',
      duration: 'Kohëzgjatja',
      price: 'Çmimi'
    }
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
  return context;
};

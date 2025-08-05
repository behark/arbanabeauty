'use client';

import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import ServicesSection from "@/components/sections/ServicesSection";
import Link from "next/link";

// Language support
const translations = {
  sq: {
    title: 'Arbana Beauty - Transformimi Juaj i Bukurisë Fillon Këtu',
    description: 'Përvojë profesionale në trajtimin e bukurisë me Arbana - ku ekspertiza takohet me elegancën.',
    nav: {
      home: 'Ballina',
      services: 'Shërbimet',
      about: 'Rreth Nesh',
      contact: 'Kontakti',
      book: 'Rezervo'
    },
    hero: {
      title: 'Transformimi Juaj i',
      titleHighlight: 'Bukurisë',
      subtitle: 'Fillon Këtu',
      description: 'Përvojë premium në trajtimin e bukurisë me Arbana - ku ekspertiza takohet me elegancën. Nga makijazhi i mahnitshëm deri te facialët ringjalluës, ne forcojmë shkëlqimin tuaj natyral.',
      bookAppointment: 'Rezervo Takimin',
      exploreServices: 'Shiko Shërbimet'
    },
    stats: {
      happyClients: 'Klientë të Kënaqur',
      averageRating: 'Vlerësim Mesatar',
      yearsExperience: 'Vite Përvojë',
      treatments: 'Trajtime të Ndryshme'
    },
    featured: {
      title: 'Shërbimet Tona të Zgjedhura',
      subtitle: 'Shërbimet më të kërkuara për bukurinë tuaj'
    },
    services: {
      makeup: {
        title: 'Makijazh Profesional',
        description: 'Makijazh i personalizuar për çdo rast special'
      },
      skincare: {
        title: 'Kujdesi për Lëkurën',
        description: 'Trajtime të avancuara për lëkurë të shëndetshme'
      },
      hair: {
        title: 'Stilimi i Flokëve',
        description: 'Stilime moderne dhe klasike për flokët tuaj'
      },
      nails: {
        title: 'Kujdesi për Thonjtë',
        description: 'Manikyr dhe pedikyr me cilësi të lartë'
      }
    },
    about: {
      title: 'Rreth Arbana Beauty',
      description: 'Me mbi 8 vite përvojë në industrinë e bukurisë, Arbana Beauty është destinacioni juaj i besuar për të gjitha nevojat tuaja të bukurisë. Ekipi ynë i kualifikuar përdor produktet më të mira dhe teknikat më të reja për të siguruar rezultate të shkëlqyera.'
    },
    testimonials: {
      title: 'Çfarë Thonë Klientët Tanë',
      subtitle: 'Lexoni përvojat e klientëve tanë të kënaqur',
      testimonial1: {
        text: 'Arbana është artistja më e talentuar e makijajit! Më bëri të ndihesha si princesha në dasmën time.',
        author: 'Elvira K.',
        role: 'Nuse'
      },
      testimonial2: {
        text: 'Shërbimi i jashtëzakonshëm dhe rezultatet e mahnitshme. E rekomandoj pa hezitim!',
        author: 'Fatmira M.',
        role: 'Klientë e rregullt'
      },
      testimonial3: {
        text: 'Faciali më i mirë që kam bërë ndonjëherë. Lëkura ime duket 10 vite më e re!',
        author: 'Albana S.',
        role: 'Klientë VIP'
      }
    },
    contact: {
      title: 'Kontaktoni Me Ne',
      subtitle: 'Gati për të filluar udhëtimin tuaj të bukurisë?',
      phone: 'Telefon',
      email: 'Email',
      address: 'Adresa',
      schedule: 'Orari i Punës',
      workingHours: 'Hënë - Shtunë: 9:00 - 19:00',
      sunday: 'E Diel: Mbyllur',
      getInTouch: 'Na Kontaktoni',
      bookNow: 'Rezervo Tani'
    },
    footer: {
      description: 'Destinacioni juaj i besuar për të gjitha nevojat tuaja të bukurisë.',
      quickLinks: 'Lidhje të Shpejta',
      services: 'Shërbimet',
      contact: 'Kontakti',
      rights: 'Të gjitha të drejtat e rezervuara.',
      followUs: 'Na Ndiqni'
    }
  },
  en: {
    title: 'Arbana Beauty - Your Beauty Transformation Starts Here',
    description: 'Professional beauty treatment experience with Arbana - where expertise meets elegance.',
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      book: 'Book'
    },
    hero: {
      title: 'Your Beauty',
      titleHighlight: 'Transformation',
      subtitle: 'Starts Here',
      description: 'Experience premium beauty treatments with Arbana - where expertise meets elegance. From stunning makeup to rejuvenating facials, we enhance your natural radiance.',
      bookAppointment: 'Book Your Appointment',
      exploreServices: 'Explore Services'
    },
    stats: {
      happyClients: 'Happy Clients',
      averageRating: 'Average Rating',
      yearsExperience: 'Years Experience',
      treatments: 'Different Treatments'
    },
    featured: {
      title: 'Our Featured Services',
      subtitle: 'The most sought-after services for your beauty'
    },
    services: {
      makeup: {
        title: 'Professional Makeup',
        description: 'Personalized makeup for every special occasion'
      },
      skincare: {
        title: 'Skincare',
        description: 'Advanced treatments for healthy skin'
      },
      hair: {
        title: 'Hair Styling',
        description: 'Modern and classic styling for your hair'
      },
      nails: {
        title: 'Nail Care',
        description: 'High-quality manicure and pedicure'
      }
    },
    about: {
      title: 'About Arbana Beauty',
      description: 'With over 8 years of experience in the beauty industry, Arbana Beauty is your trusted destination for all your beauty needs. Our qualified team uses the best products and latest techniques to ensure excellent results.'
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Read the experiences of our satisfied clients',
      testimonial1: {
        text: 'Arbana is the most talented makeup artist! She made me feel like a princess on my wedding day.',
        author: 'Elvira K.',
        role: 'Bride'
      },
      testimonial2: {
        text: 'Exceptional service and amazing results. I recommend without hesitation!',
        author: 'Fatmira M.',
        role: 'Regular Client'
      },
      testimonial3: {
        text: 'The best facial I\'ve ever had. My skin looks 10 years younger!',
        author: 'Albana S.',
        role: 'VIP Client'
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Ready to start your beauty journey?',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      schedule: 'Working Hours',
      workingHours: 'Monday - Saturday: 9:00 - 19:00',
      sunday: 'Sunday: Closed',
      getInTouch: 'Get In Touch',
      bookNow: 'Book Now'
    },
    footer: {
      description: 'Your trusted destination for all your beauty needs.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      rights: 'All rights reserved.',
      followUs: 'Follow Us'
    }
  }
};

export default function HomePage() {
  const [language, setLanguage] = useState<'sq' | 'en'>('sq');
  const [location, setLocation] = useState<'kosovo' | 'albania' | 'macedonia'>('kosovo');
  
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'sq' ? 'en' : 'sq');
  };

  const handleLocationChange = (newLocation: 'kosovo' | 'albania' | 'macedonia') => {
    setLocation(newLocation);
  };

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Language and Location Controls */}
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-3">
          {/* Location Selector */}
          <div className="relative">
            <select 
              value={location} 
              onChange={(e) => handleLocationChange(e.target.value as 'kosovo' | 'albania' | 'macedonia')}
              className="bg-white/90 backdrop-blur border border-pink-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-lg"
            >
              <option value="kosovo">🇽🇰 Kosovë</option>
              <option value="albania">🇦🇱 Shqipëri</option>
              <option value="macedonia">🇲🇰 Maqedoni</option>
            </select>
          </div>
          
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-200 shadow-lg"
          >
            <span>{language === 'sq' ? '🇬🇧 EN' : '🇦🇱 SQ'}</span>
          </button>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/60"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                {t.hero.title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                  {t.hero.titleHighlight}
                </span>
                <span className="block text-4xl md:text-5xl">{t.hero.subtitle}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/book"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t.hero.bookAppointment}
                </Link>
                <Link
                  href="#services"
                  className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-lg hover:bg-pink-50 transition-all duration-300 text-lg font-semibold"
                >
                  {t.hero.exploreServices}
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">500+</div>
                  <div className="text-gray-600">{t.stats.happyClients}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">5★</div>
                  <div className="text-gray-600">{t.stats.averageRating}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">8+</div>
                  <div className="text-gray-600">{t.stats.yearsExperience}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">15+</div>
                  <div className="text-gray-600">{t.stats.treatments}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section id="services" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.featured.title}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.featured.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{t.services.makeup.title}</h3>
                <p className="text-gray-600 text-center">{t.services.makeup.description}</p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{t.services.skincare.title}</h3>
                <p className="text-gray-600 text-center">{t.services.skincare.description}</p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{t.services.hair.title}</h3>
                <p className="text-gray-600 text-center">{t.services.hair.description}</p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{t.services.nails.title}</h3>
                <p className="text-gray-600 text-center">{t.services.nails.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">{t.about.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {t.about.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Trajnim Profesional</h3>
                  <p className="text-gray-600">Certifikime ndërkombëtare dhe trajnime të vazhdueshme</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Cilësi Premium</h3>
                  <p className="text-gray-600">Produkte të cilësisë së lartë nga markat më të mira</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Kujdes Personal</h3>
                  <p className="text-gray-600">Çdo klient trajtohet me kujdes dhe vëmendje individuale</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.testimonials.title}</h2>
              <p className="text-lg text-gray-600">{t.testimonials.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{t.testimonials.testimonial1.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">E</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{t.testimonials.testimonial1.author}</div>
                    <div className="text-sm text-gray-600">{t.testimonials.testimonial1.role}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{t.testimonials.testimonial2.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">F</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{t.testimonials.testimonial2.author}</div>
                    <div className="text-sm text-gray-600">{t.testimonials.testimonial2.role}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{t.testimonials.testimonial3.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">A</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{t.testimonials.testimonial3.author}</div>
                    <div className="text-sm text-gray-600">{t.testimonials.testimonial3.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.contact.title}</h2>
              <p className="text-lg text-gray-600">{t.contact.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{t.contact.phone}</h3>
                      <p className="text-gray-600">+383 44 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{t.contact.email}</h3>
                      <p className="text-gray-600">info@arbanabeauty.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{t.contact.address}</h3>
                      <p className="text-gray-600">
                        {location === 'kosovo' ? 'Prishtinë, Kosovë' : 
                         location === 'albania' ? 'Tiranë, Shqipëri' : 
                         'Shkup, Maqedoni'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{t.contact.schedule}</h3>
                      <p className="text-gray-600">{t.contact.workingHours}</p>
                      <p className="text-gray-600">{t.contact.sunday}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link
                    href="/book"
                    className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {t.contact.bookNow}
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">{t.contact.getInTouch}</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emri</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefoni</label>
                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mesazhi</label>
                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 font-semibold">
                    Dërgo Mesazhin
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <ServicesSection />
      </div>
    </MainLayout>
  );
}

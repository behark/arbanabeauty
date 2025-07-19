"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiEdit, FiEye, FiGlobe } from 'react-icons/fi';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const ContentEditor = () => {
  const { language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const sections = [
    // Homepage Sections
    { id: 'hero', name: 'Hero Section', icon: '🏠' },
    { id: 'about', name: 'About Section', icon: '👤' },
    { id: 'services', name: 'Services', icon: '💄' },
    { id: 'academy', name: 'Academy', icon: '🎓' },
    { id: 'products', name: 'Products', icon: '🛍️' },
    { id: 'testimonials', name: 'Testimonials', icon: '💬' },
    { id: 'contact', name: 'Contact', icon: '📞' },
    // Individual Pages
    { id: 'aboutPage', name: 'About Page', icon: '📄' },
    { id: 'makeupPage', name: 'Makeup Services Page', icon: '💋' },
    { id: 'academyPage', name: 'Academy Page', icon: '📚' },
    { id: 'productsPage', name: 'Products Page', icon: '🛒' },
  ];

  // Sample content structure - in a real app, this would come from a database
  const [content, setContent] = useState({
    // Homepage Sections
    hero: {
      en: {
        title: 'Professional Makeup Artist & Beauty Entrepreneur',
        subtitle: 'Creating stunning looks for weddings, editorials, and special events with years of professional experience',
        ctaBook: 'Book Consultation',
        ctaPortfolio: 'View Portfolio',
      },
      sq: {
        title: 'Artiste Profesionale Makeup & Sipërmarrëse Bukurie',
        subtitle: 'Krijimi i pamjeve mahnitëse për dasma, editorial dhe ngjarje të veçanta me vite përvojë profesionale',
        ctaBook: 'Rezervo Konsultim',
        ctaPortfolio: 'Shiko Punët',
      },
    },
    about: {
      en: {
        title: 'About Arbana',
        subtitle: 'Professional makeup artist with years of experience in bridal, editorial, and special event makeup',
        description: 'With a passion for enhancing natural beauty and years of professional experience, I specialize in creating stunning makeup looks for every occasion.',
        cta: 'Learn More About Me',
      },
      sq: {
        title: 'Rreth Arbanës',
        subtitle: 'Artiste profesionale makeup me vite përvojë në makeup për nuse, editorial dhe ngjarje të veçanta',
        description: 'Me një pasion për të theksuar bukurinë natyrore dhe vite përvojë profesionale, specializohem në krijimin e pamjeve mahnitëse të makeup-it për çdo rast.',
        cta: 'Mëso Më Shumë Rreth Meje',
      },
    },
    services: {
      en: {
        title: 'My Services',
        subtitle: 'Professional makeup services for every occasion',
        description: 'From bridal makeup to editorial shoots, I offer comprehensive beauty services tailored to your needs.',
      },
      sq: {
        title: 'Shërbimet e Mia',
        subtitle: 'Shërbime profesionale makeup për çdo rast',
        description: 'Nga makeup për nuse deri tek seanset editoriale, ofroj shërbime të plota bukurie të përshtatura për nevojat tuaja.',
      },
    },
    academy: {
      en: {
        title: 'Beauty Academy',
        subtitle: 'Learn professional makeup techniques',
        description: 'Join our comprehensive makeup courses and master the art of professional beauty application.',
        cta: 'Enroll Now',
      },
      sq: {
        title: 'Akademia e Bukurisë',
        subtitle: 'Mëso teknika profesionale makeup',
        description: 'Bashkohu me kurset tona të plota të makeup-it dhe zotëro artin e aplikimit profesional të bukurisë.',
        cta: 'Regjistrohu Tani',
      },
    },
    products: {
      en: {
        title: 'Beauty Products',
        subtitle: 'Premium makeup and skincare products',
        description: 'Discover our curated collection of high-quality beauty products from top brands.',
        cta: 'Shop Now',
      },
      sq: {
        title: 'Produktet e Bukurisë',
        subtitle: 'Produkte premium makeup dhe kujdesi për lëkurën',
        description: 'Zbuloni koleksionin tonë të zgjedhur të produkteve cilësore të bukurisë nga markat më të mira.',
        cta: 'Blej Tani',
      },
    },
    testimonials: {
      en: {
        title: 'Client Testimonials',
        subtitle: 'What my clients say about their experience',
        description: 'Read reviews from satisfied clients who trusted me with their special moments.',
      },
      sq: {
        title: 'Dëshmitë e Klientëve',
        subtitle: 'Çfarë thonë klientët e mi për përvojën e tyre',
        description: 'Lexoni recensionet nga klientët e kënaqur që më besuan momentet e tyre të veçanta.',
      },
    },
    contact: {
      en: {
        title: 'Get In Touch',
        subtitle: 'Ready to book your appointment?',
        description: 'Contact me today to discuss your makeup needs and schedule your consultation.',
        cta: 'Contact Me',
      },
      sq: {
        title: 'Kontaktoni',
        subtitle: 'Gati për të rezervuar takimin tuaj?',
        description: 'Kontaktoni sot për të diskutuar nevojat tuaja të makeup-it dhe për të planifikuar konsultimin.',
        cta: 'Kontaktoni',
      },
    },
    // Individual Pages
    aboutPage: {
      en: {
        title: 'About Arbana Kabashi',
        subtitle: 'Professional Makeup Artist & Beauty Entrepreneur',
        bio: 'With over 8 years of experience in the beauty industry, I have built a reputation for creating flawless, stunning makeup looks that enhance natural beauty. My journey began with a passion for art and beauty, which led me to pursue professional training in makeup artistry.',
        experience: 'I have worked with numerous clients for weddings, fashion shoots, special events, and editorial work. My expertise spans from natural everyday looks to dramatic evening makeup, always ensuring each client feels confident and beautiful.',
        mission: 'My mission is to help every woman feel beautiful and confident in her own skin. I believe makeup is an art form that should enhance, not mask, your natural beauty.',
      },
      sq: {
        title: 'Rreth Arbana Kabashi',
        subtitle: 'Artiste Profesionale Makeup & Sipërmarrëse Bukurie',
        bio: 'Me mbi 8 vjet përvojë në industrinë e bukurisë, kam ndërtuar një reputacion për krijimin e pamjeve të përsosura dhe mahnitëse të makeup-it që theksojnë bukurinë natyrore. Udhëtimi im filloi me një pasion për artin dhe bukurinë, që më çoi të ndjek trajnim profesional në artizanatin e makeup-it.',
        experience: 'Kam punuar me shumë klientë për dasma, seanset e modës, ngjarje të veçanta dhe punë editoriale. Ekspertiza ime shtrihet nga pamjet natyrore të përditshme deri tek makeup-i dramatik i mbrëmjes, duke siguruar gjithmonë që çdo klient të ndihet i sigurt dhe i bukur.',
        mission: 'Misioni im është të ndihmoj çdo grua të ndihet e bukur dhe e sigurt në lëkurën e saj. Besoj se makeup-i është një formë arti që duhet të theksojë, jo të maskojë, bukurinë tuaj natyrore.',
      },
    },
    makeupPage: {
      en: {
        title: 'Makeup Services',
        subtitle: 'Professional makeup for every occasion',
        bridal: 'Bridal makeup that makes your special day unforgettable with long-lasting, photo-perfect results.',
        editorial: 'Editorial and fashion makeup for photoshoots, runway shows, and creative projects.',
        special: 'Special event makeup for parties, galas, and important occasions.',
        everyday: 'Everyday makeup lessons and natural looks for daily confidence.',
      },
      sq: {
        title: 'Shërbimet e Makeup-it',
        subtitle: 'Makeup profesional për çdo rast',
        bridal: 'Makeup për nuse që e bën ditën tuaj të veçantë të paharrueshme me rezultate të qëndrueshme dhe të përsosura për foto.',
        editorial: 'Makeup editorial dhe mode për seanset fotografike, shfaqjet e modës dhe projektet kreative.',
        special: 'Makeup për ngjarje të veçanta për festa, gala dhe raste të rëndësishme.',
        everyday: 'Mësime makeup-i për çdo ditë dhe pamje natyrore për besim të përditshëm.',
      },
    },
    academyPage: {
      en: {
        title: 'Beauty Academy',
        subtitle: 'Master the art of professional makeup',
        courses: 'Comprehensive makeup courses covering basic to advanced techniques.',
        certification: 'Professional certification programs for aspiring makeup artists.',
        workshops: 'Specialized workshops on specific makeup techniques and trends.',
        mentorship: 'One-on-one mentorship programs for personalized learning.',
      },
      sq: {
        title: 'Akademia e Bukurisë',
        subtitle: 'Zotëro artin e makeup-it profesional',
        courses: 'Kurse të plota makeup-i që mbulojnë teknikat nga bazike deri tek të avancuara.',
        certification: 'Programe certifikimi profesional për artistët aspirantë të makeup-it.',
        workshops: 'Punëtori të specializuara për teknika dhe tendenca specifike të makeup-it.',
        mentorship: 'Programe mentorimi një-për-një për mësim të personalizuar.',
      },
    },
    productsPage: {
      en: {
        title: 'Beauty Products',
        subtitle: 'Premium makeup and skincare collection',
        makeup: 'Professional-grade makeup products used by industry experts.',
        skincare: 'Luxury skincare products for healthy, glowing skin.',
        tools: 'High-quality makeup brushes and application tools.',
        brands: 'Curated selection from top international beauty brands.',
      },
      sq: {
        title: 'Produktet e Bukurisë',
        subtitle: 'Koleksion premium makeup dhe kujdesi për lëkurën',
        makeup: 'Produkte makeup-i me cilësi profesionale të përdorura nga ekspertët e industrisë.',
        skincare: 'Produkte luksoze për kujdesin e lëkurës për një lëkurë të shëndetshme dhe të shkëlqyer.',
        tools: 'Furça makeup-i dhe mjete aplikimi me cilësi të lartë.',
        brands: 'Përzgjedhje e kuruar nga markat më të mira ndërkombëtare të bukurisë.',
      },
    },
  });

  const handleContentChange = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection as keyof typeof prev],
        [language]: {
          ...prev[activeSection as keyof typeof prev]?.[language as keyof typeof prev[keyof typeof prev]],
          [field]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    // In a real app, this would save to a database or API
    console.log('Saving content:', content);
    setHasChanges(false);
    // Show success message
    alert('Content saved successfully!');
  };

  const currentContent = content[activeSection as keyof typeof content]?.[language as keyof typeof content[keyof typeof content]] || {};

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Editor</h1>
            <p className="text-gray-600 mt-2">
              Edit website content in both English and Albanian
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <FiGlobe className="w-5 h-5 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'sq')}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="sq">Albanian</option>
              </select>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                hasChanges
                  ? 'bg-primary text-white hover:bg-primary-dark'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FiSave className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{section.icon}</span>
                    {section.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Editing: {sections.find(s => s.id === activeSection)?.name} ({language.toUpperCase()})
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center px-3 py-1 rounded-md text-sm transition-colors ${
                      isEditing
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isEditing ? <FiEye className="w-4 h-4 mr-1" /> : <FiEdit className="w-4 h-4 mr-1" />}
                    {isEditing ? 'Preview' : 'Edit'}
                  </button>
                </div>
              </div>

              {/* Content Fields */}
              <div className="space-y-6">
                {Object.entries(currentContent).map(([field, value]) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isEditing ? (
                      field === 'description' ? (
                        <textarea
                          value={value as string}
                          onChange={(e) => handleContentChange(field, e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      ) : (
                        <input
                          type="text"
                          value={value as string}
                          onChange={(e) => handleContentChange(field, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      )
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className="text-gray-900">{value as string}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Preview Section */}
              {!isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
                >
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Live Preview</h4>
                  <div className="space-y-4">
                    {activeSection === 'hero' && (
                      <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                          {currentContent.title}
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                          {currentContent.subtitle}
                        </p>
                        <div className="flex justify-center space-x-4">
                          <button className="bg-primary text-white px-6 py-2 rounded-md">
                            {(currentContent as any).ctaBook || 'Book Now'}
                          </button>
                          <button className="border border-primary text-primary px-6 py-2 rounded-md">
                            {(currentContent as any).ctaPortfolio || 'View Portfolio'}
                          </button>
                        </div>
                      </div>
                    )}
                    {activeSection === 'about' && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          {currentContent.title}
                        </h2>
                        <p className="text-lg text-gray-600 mb-4">
                          {currentContent.subtitle}
                        </p>
                        <p className="text-gray-600 mb-6">
                          {(currentContent as any).description || 'Description text here'}
                        </p>
                        <button className="bg-primary text-white px-6 py-2 rounded-md">
                          {(currentContent as any).cta || 'Learn More'}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentEditor;

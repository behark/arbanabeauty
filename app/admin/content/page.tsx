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
    { id: 'hero', name: 'Hero Section', icon: '🏠' },
    { id: 'about', name: 'About Section', icon: '👤' },
    { id: 'services', name: 'Services', icon: '💄' },
    { id: 'academy', name: 'Academy', icon: '🎓' },
    { id: 'products', name: 'Products', icon: '🛍️' },
    { id: 'testimonials', name: 'Testimonials', icon: '💬' },
    { id: 'contact', name: 'Contact', icon: '📞' },
  ];

  // Sample content structure - in a real app, this would come from a database
  const [content, setContent] = useState({
    hero: {
      en: {
        title: 'Professional Makeup Artist & Beauty Expert',
        subtitle: 'Transform your beauty with expert makeup artistry and professional training in Mitrovice',
        ctaBook: 'Book Consultation',
        ctaPortfolio: 'View Portfolio',
      },
      sq: {
        title: 'Artiste Profesionale Makeup & Eksperte Bukurie',
        subtitle: 'Transformo bukurinë tënde me artizanatin ekspert të makeup-it dhe trajnimin profesional në Mitrovicë',
        ctaBook: 'Rezervo Konsultim',
        ctaPortfolio: 'Shiko Portfolion',
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
        title: 'Rreth Arbana',
        subtitle: 'Artiste profesionale makeup me vite përvojë në makeup për nuse, editorial dhe ngjarje të veçanta',
        description: 'Me një pasion për të theksuar bukurinë natyrore dhe vite përvojë profesionale, specializohem në krijimin e pamjeve mahnitëse të makeup-it për çdo rast.',
        cta: 'Mëso Më Shumë Rreth Meje',
      },
    },
    // Add more sections as needed
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

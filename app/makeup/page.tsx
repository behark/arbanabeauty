"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { FiCalendar, FiMail, FiPhone, FiInstagram } from "react-icons/fi";

const MakeupPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const portfolioItems = [
    {
      id: 1,
      category: "bridal",
      title: "Elegant Bridal Look",
      description: "Classic bridal makeup with soft glam finish",
      image: "/images/portfolio/bridal-1.jpg"
    },
    {
      id: 2,
      category: "editorial",
      title: "Fashion Editorial",
      description: "Bold editorial look for magazine shoot",
      image: "/images/portfolio/editorial-1.jpg"
    },
    {
      id: 3,
      category: "special",
      title: "Red Carpet Glam",
      description: "Glamorous look for special events",
      image: "/images/portfolio/special-1.jpg"
    },
    {
      id: 4,
      category: "bridal",
      title: "Natural Bridal Beauty",
      description: "Soft, natural bridal makeup",
      image: "/images/portfolio/bridal-2.jpg"
    },
    {
      id: 5,
      category: "editorial",
      title: "Avant-Garde Creation",
      description: "Creative editorial makeup artistry",
      image: "/images/portfolio/editorial-2.jpg"
    },
    {
      id: 6,
      category: "special",
      title: "Evening Elegance",
      description: "Sophisticated evening makeup",
      image: "/images/portfolio/special-2.jpg"
    }
  ];

  const categories = [
    { id: "all", label: "All Work" },
    { id: "bridal", label: "Bridal" },
    { id: "editorial", label: "Editorial" },
    { id: "special", label: "Special Events" }
  ];

  const filteredItems = selectedCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-accent">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="heading-xl mb-6">Makeup Portfolio</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover my passion for makeup artistry through a curated collection of my finest work. From bridal elegance to editorial boldness, each look tells a unique story.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Filter */}
        <section className="pb-8">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-primary/10 border border-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="pb-20">
          <div className="container-custom">
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      {item.title}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full capitalize">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="heading-lg mb-4">Makeup Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Professional makeup services tailored to your unique needs and vision.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Bridal Makeup",
                  description: "Complete bridal beauty package including trial session",
                  price: "From €150",
                  features: ["Trial session included", "Long-lasting formula", "Touch-up kit provided"]
                },
                {
                  title: "Special Events",
                  description: "Glamorous looks for parties, galas, and celebrations",
                  price: "From €80",
                  features: ["Custom look design", "Professional products", "Photo-ready finish"]
                },
                {
                  title: "Editorial & Fashion",
                  description: "Creative makeup for photoshoots and fashion shows",
                  price: "From €120",
                  features: ["Avant-garde techniques", "Collaboration with photographers", "Portfolio development"]
                },
                {
                  title: "Makeup Lessons",
                  description: "Personal makeup tutorials and technique training",
                  price: "From €60",
                  features: ["One-on-one instruction", "Product recommendations", "Technique practice"]
                },
                {
                  title: "Group Sessions",
                  description: "Makeup parties and group learning experiences",
                  price: "From €40/person",
                  features: ["Fun group atmosphere", "Multiple looks", "Product trials"]
                },
                {
                  title: "Consultation",
                  description: "Professional makeup consultation and color analysis",
                  price: "From €30",
                  features: ["Skin tone analysis", "Product recommendations", "Technique guidance"]
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-accent p-6 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-primary font-semibold text-lg mb-4">{service.price}</div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-lg mb-6">Ready to Book Your Session?</h2>
              <p className="text-xl mb-8 opacity-90">
                Transform your look with professional makeup artistry. Book your appointment today!
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <FiPhone className="w-5 h-5" />
                  <span>+383 49 633 634</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMail className="w-5 h-5" />
                  <span>info@arbanakabashi.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiInstagram className="w-5 h-5" />
                  <span>@arbanakabashi_beauty</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn-secondary bg-white text-primary hover:bg-gray-100">
                  <FiCalendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </button>
                <button className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
                  <FiMail className="w-5 h-5 mr-2" />
                  Get Quote
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default MakeupPage;

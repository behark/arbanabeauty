"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiHeart, FiCamera, FiStar, FiUsers } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const services = [
  {
    icon: FiHeart,
    title: 'Bridal & Special Events',
    description: 'Bespoke makeup services for weddings and special occasions with personalized consultations.',
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    link: "/services/bridal-makeup",
  },
  {
    icon: FiCamera,
    title: 'Celebrity & Editorial',
    description: 'High-impact makeup for photoshoots, red carpet events, and magazine features.',
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    link: "/services/editorial",
  },
  {
    icon: FiStar,
    title: 'Private Coaching',
    description: 'One-on-one makeup lessons tailored to your specific needs and skill level.',
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    link: "/services/private-lessons",
  },
  {
    icon: FiUsers,
    title: 'Makeup & Photography',
    description: 'Complete packages including professional makeup and photography services.',
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80",
    link: "/services/photography",
  },
];

const ServicesSection = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-white dark:bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">
            Premium <span className="gradient-text">Makeup Services</span>
          </h2>
          <h2 className="heading-lg mb-4">{t('services.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')} and personalized attention to detail.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-accent dark:bg-gray-800 p-6 rounded-sm hover:shadow-lg transition-shadow group"
              variants={itemVariants}
            >
              <div className="relative h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-3 bg-primary bg-opacity-10 rounded-full w-fit mb-4 text-primary">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5">{service.description}</p>
              <Link
                href={service.link}
                className="text-primary font-medium group-hover:underline flex items-center"
              >
                Discover More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="px-8 py-3 border-2 border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-white transition-colors inline-block"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

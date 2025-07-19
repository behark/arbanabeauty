"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCalendar, FiBook, FiStar, FiCamera } from "react-icons/fi";

const services = [
  {
    icon: <FiCalendar size={24} />,
    title: "Bridal & Special Events",
    description: "Bespoke makeup services for weddings and special occasions with personalized consultations.",
    link: "/services/bridal-makeup",
  },
  {
    icon: <FiStar size={24} />,
    title: "Celebrity & Editorial",
    description: "High-impact makeup for photoshoots, red carpet events, and magazine features.",
    link: "/services/editorial",
  },
  {
    icon: <FiBook size={24} />,
    title: "Private Coaching",
    description: "One-on-one makeup lessons tailored to your specific needs and skill level.",
    link: "/services/private-lessons",
  },
  {
    icon: <FiCamera size={24} />,
    title: "Makeup & Photography",
    description: "Complete packages including professional makeup and photography services.",
    link: "/services/photography",
  },
];

const ServicesSection = () => {
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
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Exceptional makeup artistry for all occasions, delivered with precision, creativity,
            and personalized attention to detail.
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

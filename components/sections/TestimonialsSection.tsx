"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Bride",
    content:
      "Arbana made my wedding day absolutely perfect. Her attention to detail and artistic vision exceeded all my expectations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=2087&q=80",
  },
  {
    name: "Maria Rodriguez",
    role: "Model",
    content:
      "Working with Arbana for my photoshoot was incredible. She understood exactly what I needed and delivered flawlessly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Emma Thompson",
    role: "Academy Student",
    content:
      "The academy courses transformed my skills completely. Arbana is not just talented but an amazing teacher.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2088&q=80",
  },
  {
    name: "Elena Martinez",
    role: "Bride",
    content: "Arbana created the most stunning bridal look for my wedding day. Her attention to detail and ability to understand exactly what I wanted was incredible. I felt beautiful, confident, and completely myself.",
    rating: 5,
    image: "/images/testimonials/testimonial-1.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Academy Graduate",
    content: "The Academy masterclass transformed my approach to makeup application. Arbana's teaching style is clear, thorough, and incredibly inspiring. The skills I've learned have already helped me land several professional jobs.",
    rating: 5,
    image: "/images/testimonials/testimonial-2.jpg",
  },
  {
    name: "Mira Patel",
    role: "Editorial Client",
    content: "Working with Arbana on our fashion editorial was a game-changer. Her creativity and technical expertise brought our vision to life in ways we hadn't even imagined. The results were absolutely stunning.",
    rating: 5,
    image: "/images/testimonials/testimonial-3.jpg",
  },
  {
    name: "Jessica Chen",
    role: "Regular Client",
    content: "I've been using Arbana's product line for over a year now, and I'm completely hooked. The lip mattes are long-lasting without being drying, and the lashes are so natural-looking yet dramatic. Simply the best products I've tried.",
    rating: 5,
    image: "/images/testimonials/testimonial-4.jpg",
  },
];

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex: number) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-accent">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">{t("testimonials.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Testimonial Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-12 rounded-sm shadow-md relative"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-24 h-24 rounded-full mx-auto overflow-hidden relative">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <div className="flex justify-center mb-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <blockquote>
                  <p className="text-gray-600 text-lg italic leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <footer>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </footer>
                </blockquote>
              </div>
            </div>
            
            <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-primary opacity-20 z-[-1]"></div>
          </motion.div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

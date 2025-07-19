"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Elena Martinez",
    role: "Bride",
    quote: "Arbana created the most stunning bridal look for my wedding day. Her attention to detail and ability to understand exactly what I wanted was incredible. I felt beautiful, confident, and completely myself.",
    image: "/images/testimonials/testimonial-1.jpg",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Academy Graduate",
    quote: "The Academy masterclass transformed my approach to makeup application. Arbana's teaching style is clear, thorough, and incredibly inspiring. The skills I've learned have already helped me land several professional jobs.",
    image: "/images/testimonials/testimonial-2.jpg",
    rating: 5,
  },
  {
    name: "Mira Patel",
    role: "Editorial Client",
    quote: "Working with Arbana on our fashion editorial was a game-changer. Her creativity and technical expertise brought our vision to life in ways we hadn't even imagined. The results were absolutely stunning.",
    image: "/images/testimonials/testimonial-3.jpg",
    rating: 5,
  },
  {
    name: "Jessica Chen",
    role: "Regular Client",
    quote: "I've been using Arbana's product line for over a year now, and I'm completely hooked. The lip mattes are long-lasting without being drying, and the lashes are so natural-looking yet dramatic. Simply the best products I've tried.",
    image: "/images/testimonials/testimonial-4.jpg",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-accent">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Client Testimonials</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Read what our clients have to say about their experiences with Arbana's services and products.
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
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto overflow-hidden relative">
                  {/* We'll replace this with an actual testimonial image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Photo
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="flex justify-center mb-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <blockquote>
                  <p className="text-lg italic text-gray-700 mb-4">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </p>
                  <footer>
                    <div className="font-bold text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-primary">
                      {testimonials[currentIndex].role}
                    </div>
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

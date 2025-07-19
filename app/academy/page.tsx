"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { FiBook, FiUsers, FiAward, FiClock, FiStar, FiCalendar, FiMail } from "react-icons/fi";

const AcademyPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      title: "Fundamentals of Makeup Artistry",
      level: "Beginner",
      duration: "4 weeks",
      price: "€299",
      description: "Master the basics of makeup application with comprehensive foundation techniques.",
      features: [
        "Color theory and skin undertones",
        "Basic makeup tools and products",
        "Foundation and concealer techniques",
        "Eye makeup fundamentals",
        "Lip and cheek application",
        "Certificate of completion"
      ],
      schedule: "Weekends (Sat & Sun) 10:00-16:00"
    },
    {
      id: 2,
      title: "Advanced Bridal Makeup",
      level: "Intermediate",
      duration: "6 weeks",
      price: "€499",
      description: "Specialize in bridal makeup with advanced techniques for the perfect wedding day look.",
      features: [
        "Bridal consultation techniques",
        "Long-lasting makeup formulas",
        "Traditional and modern bridal styles",
        "Working with different skin types",
        "Client communication skills",
        "Business development for bridal artists"
      ],
      schedule: "Weekdays (Mon-Wed) 18:00-21:00"
    },
    {
      id: 3,
      title: "Editorial & Fashion Makeup",
      level: "Advanced",
      duration: "8 weeks",
      price: "€699",
      description: "Create stunning editorial looks for fashion shows, photoshoots, and creative projects.",
      features: [
        "Avant-garde makeup techniques",
        "Working with photographers",
        "Fashion industry standards",
        "Creative color application",
        "Portfolio development",
        "Industry networking opportunities"
      ],
      schedule: "Flexible scheduling available"
    },
    {
      id: 4,
      title: "Professional Makeup Artist Certification",
      level: "Complete Program",
      duration: "12 weeks",
      price: "€999",
      description: "Comprehensive program covering all aspects of professional makeup artistry.",
      features: [
        "All previous course content included",
        "Business and marketing training",
        "Kit building guidance",
        "Internship opportunities",
        "Professional certification",
        "Lifetime alumni support"
      ],
      schedule: "Full-time or part-time options"
    },
    {
      id: 5,
      title: "Special Effects Makeup",
      level: "Specialized",
      duration: "5 weeks",
      price: "€399",
      description: "Learn theatrical and special effects makeup for film, TV, and creative projects.",
      features: [
        "Prosthetics application",
        "Wound and scar simulation",
        "Character transformation",
        "Aging techniques",
        "Fantasy and creature makeup",
        "Industry-standard products"
      ],
      schedule: "Weekends (Sat & Sun) 12:00-18:00"
    },
    {
      id: 6,
      title: "Makeup for Men",
      level: "Specialized",
      duration: "3 weeks",
      price: "€199",
      description: "Specialized techniques for male grooming and makeup application.",
      features: [
        "Male skin characteristics",
        "Natural enhancement techniques",
        "Grooming and skincare",
        "Media and photography makeup",
        "Product recommendations",
        "Client consultation for men"
      ],
      schedule: "Weekdays (Thu-Fri) 19:00-22:00"
    }
  ];

  const testimonials = [
    {
      name: "Elena Rexhepi",
      course: "Professional Certification",
      text: "Arbana&apos;s academy transformed my passion into a successful career. The hands-on training and personal attention were exceptional.",
      rating: 5
    },
    {
      name: "Drita Krasniqi",
      course: "Bridal Makeup",
      text: "The bridal course gave me the confidence and skills to start my own bridal makeup business. Highly recommended!",
      rating: 5
    },
    {
      name: "Arta Berisha",
      course: "Editorial Makeup",
      text: "Learning editorial techniques opened up amazing opportunities in fashion photography. The portfolio development was invaluable.",
      rating: 5
    }
  ];

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
              <h1 className="heading-xl mb-6">Arbana&apos;s Beauty Academy</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your passion for beauty into professional expertise. Join our comprehensive makeup artistry programs and learn from industry experts.
              </p>
            </motion.div>

            {/* Academy Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {[
                { icon: FiUsers, number: "500+", label: "Students Trained" },
                { icon: FiAward, number: "15+", label: "Years Experience" },
                { icon: FiBook, number: "12", label: "Course Modules" },
                { icon: FiStar, number: "4.9", label: "Average Rating" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-lg shadow-md"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="heading-lg mb-4">Our Courses</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from our comprehensive range of makeup artistry courses designed for all skill levels.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-accent p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">{course.level}</span>
                        <span className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary">{course.price}</div>
                  </div>

                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">What you&apos;ll learn:</h4>
                    <ul className="space-y-1">
                      {course.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                      {course.features.length > 3 && (
                        <li className="text-sm text-primary cursor-pointer"
                            onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}>
                          {selectedCourse === course.id ? "Show less..." : `+${course.features.length - 3} more...`}
                        </li>
                      )}
                    </ul>
                    
                    {selectedCourse === course.id && (
                      <ul className="space-y-1 mt-2">
                        {course.features.slice(3).map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Schedule:</strong> {course.schedule}
                  </div>

                  <div className="flex gap-3">
                    <button className="btn-primary flex-1">
                      <FiCalendar className="w-4 h-4 mr-2" />
                      Enroll Now
                    </button>
                    <button className="btn-secondary">
                      <FiMail className="w-4 h-4 mr-2" />
                      Info
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="heading-lg mb-4">Student Success Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from our graduates who have transformed their passion into successful careers.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.course}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-lg mb-6">Start Your Makeup Journey Today</h2>
              <p className="text-xl mb-8 opacity-90">
                Join hundreds of successful graduates and turn your passion into a rewarding career.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn-secondary bg-white text-primary hover:bg-gray-100">
                  <FiCalendar className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </button>
                <button className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
                  <FiMail className="w-5 h-5 mr-2" />
                  Download Brochure
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="mb-2">Questions? Contact us:</p>
                <p className="text-lg">📞 +383 49 633 634 | ✉️ academy@arbanakabashi.com</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AcademyPage;

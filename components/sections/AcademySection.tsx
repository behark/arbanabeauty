"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const courses = [
  {
    title: "Fundamentals of Makeup Artistry",
    level: "Beginner",
    duration: "4 Weeks",
    image: "/images/academy/course-1.jpg", 
    price: "$799",
    link: "/academy/fundamentals",
  },
  {
    title: "Advanced Techniques & Color Theory",
    level: "Intermediate",
    duration: "6 Weeks",
    image: "/images/academy/course-2.jpg",
    price: "$1,199",
    link: "/academy/advanced-techniques",
  },
  {
    title: "Professional Bridal Masterclass",
    level: "Advanced",
    duration: "4 Weeks",
    image: "/images/academy/course-3.jpg",
    price: "$1,499",
    link: "/academy/bridal-masterclass",
  },
];

const AcademySection = () => {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-xl">
            <h2 className="heading-lg mb-4">
              Arbana Beauty <span className="text-primary">Academy</span>
            </h2>
            <p className="text-gray-300">
              Learn from an industry expert and master the art of makeup through 
              comprehensive courses designed for all skill levels. Transform your
              passion into expertise with hands-on training and personalized guidance.
            </p>
          </div>
          <Link
            href="/academy"
            className="mt-6 md:mt-0 px-6 py-3 border-2 border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-white transition-colors inline-block"
          >
            View All Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-sm overflow-hidden text-secondary dark:text-white group"
            >
              <div className="relative h-60 overflow-hidden">
                <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                  <span className="text-gray-500">{course.title} Image</span>
                </div>
                <div className="absolute top-4 right-4 bg-primary text-white text-sm font-medium py-1 px-3 rounded-sm">
                  {course.level}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500">{course.duration}</span>
                  <span className="text-primary font-bold">{course.price}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                <Link
                  href={course.link}
                  className="text-primary font-medium flex items-center group-hover:underline"
                >
                  Learn More
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
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary/10 p-8 rounded-sm border-l-4 border-primary"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-xl font-bold mb-2">Ready to Elevate Your Makeup Skills?</h3>
              <p className="text-gray-300">
                Join our next cohort and learn directly from Arbana Kabashi. Limited seats available.
              </p>
            </div>
            <Link
              href="/academy/enroll"
              className="whitespace-nowrap px-8 py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary-dark transition-colors"
            >
              Enroll Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademySection;

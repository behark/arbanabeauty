"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="py-20 bg-accent">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto">
              {/* We'll need to replace this with an actual image of Arbana */}
              <div className="bg-gray-300 w-full h-full relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Arbana&apos;s Image
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-4 border-primary z-[-1]"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">
              About Arbana Kabashi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              With over 15 years of experience in the beauty industry, I&apos;ve established myself as a leading makeup artist and educator, known for creating flawless, elegant looks for clients worldwide.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              My unique approach combines artistry with education, ensuring that every client doesn&apos;t just look beautiful but learns techniques to enhance their natural beauty. As the founder of Arbana&apos;s Beauty Academy, I&apos;ve trained hundreds of aspiring makeup artists who have gone on to successful careers in fashion, film, and television.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold text-xl mb-2">10+</h3>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">500+</h3>
                <p className="text-gray-600">Satisfied Clients</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">20+</h3>
                <p className="text-gray-600">Celebrity Collaborations</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">15+</h3>
                <p className="text-gray-600">Industry Awards</p>
              </div>
            </div>

            <Link
              href="/about"
              className="px-6 py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary-dark transition-colors inline-block"
            >
              Learn More About Arbana
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

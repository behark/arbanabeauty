"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
                  Arbana's Image
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
              Meet <span className="gradient-text">Arbana Kabashi</span>
            </h2>
            <p className="text-gray-700 mb-4">
              With over a decade of experience in the beauty industry, Arbana Kabashi has established
              herself as a leading makeup artist and beauty entrepreneur. Her expertise spans from
              bridal and special event makeup to editorial work with major fashion publications.
            </p>
            <p className="text-gray-700 mb-6">
              Arbana's signature approach combines technical precision with artistic flair, 
              creating looks that enhance her clients' natural beauty while pushing creative boundaries.
              Her commitment to excellence has earned her a loyal clientele that includes celebrities,
              influencers, and discerning individuals seeking premium makeup services.
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

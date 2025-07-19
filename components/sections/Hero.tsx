"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="heading-xl mb-6">
            Elevate Your <span className="text-primary">Beauty</span> with Artistry and Excellence
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Professional makeup artist, educator, and beauty entrepreneur bringing innovation and artistry to the beauty industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/booking"
              className="px-8 py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary-dark transition-colors inline-block text-center"
            >
              Book a Session
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-sm hover:bg-white hover:text-secondary transition-colors inline-block text-center"
            >
              Discover More
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="text-white text-sm mb-2">Scroll to explore</p>
        <motion.div
          className="w-5 h-10 border-2 border-white rounded-full flex justify-center p-1"
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

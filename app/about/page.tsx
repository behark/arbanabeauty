"use client";

import React from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { FiAward, FiUsers, FiCamera, FiMapPin, FiPhone, FiInstagram } from "react-icons/fi";

const AboutPage = () => {
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
              <h1 className="heading-xl mb-6">About Arbana Kabashi</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Makeup Master • Entrepreneur • Beauty Instructor • Trendsetter
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 w-full h-full relative rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                      Professional Portrait
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-4 border-primary z-[-1] rounded-lg"></div>
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="heading-lg mb-6">My Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    With over 15 years of experience in the beauty industry, I&apos;ve established myself as a leading makeup artist and educator, known for creating flawless, elegant looks for clients worldwide.
                  </p>
                  <p>
                    Based in Mitrovice, I&apos;ve built a reputation for excellence that extends far beyond borders. My unique approach combines artistry with education, ensuring that every client doesn&apos;t just look beautiful but learns techniques to enhance their natural beauty.
                  </p>
                  <p>
                    As the founder of Arbana&apos;s Beauty Academy, I&apos;ve trained hundreds of aspiring makeup artists who have gone on to successful careers in fashion, film, and television. My work has been internationally recognized and highly esteemed by enthusiasts in the fields of art, beauty, fashion, and aesthetics.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiMapPin className="text-primary" />
                    <span>Mitrovice, Kosovo</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiPhone className="text-primary" />
                    <span>+383 49 633 634</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiInstagram className="text-primary" />
                    <span>@arbanakabashi_beauty</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="heading-lg mb-4">Achievements & Recognition</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Years of dedication and passion have led to numerous achievements and recognition in the beauty industry.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center p-6 bg-accent rounded-lg"
              >
                <FiAward className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">15+ Years</h3>
                <p className="text-gray-600">Professional Experience</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center p-6 bg-accent rounded-lg"
              >
                <FiUsers className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">500+</h3>
                <p className="text-gray-600">Students Trained</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center p-6 bg-accent rounded-lg"
              >
                <FiCamera className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">1000+</h3>
                <p className="text-gray-600">Successful Projects</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="heading-lg mb-8">My Philosophy</h2>
                <blockquote className="text-xl text-gray-700 italic leading-relaxed">
                  &quot;Beauty is not just about looking good—it&apos;s about feeling confident, empowered, and authentic. My mission is to help every client discover their unique beauty and learn the skills to enhance it themselves. Makeup is not just an art; it&apos;s a lifestyle, a form of self-expression, and a way to celebrate individuality.&quot;
                </blockquote>
                <cite className="block mt-6 text-primary font-semibold">— Arbana Kabashi</cite>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutPage;

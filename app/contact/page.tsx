"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiClock, FiSend } from "react-icons/fi";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              <h1 className="heading-xl mb-6">Get in Touch</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to transform your look or start your beauty journey? Contact us today to schedule your appointment or learn more about our services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="pb-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="heading-lg mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md">
                    <FiMapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Studio Location</h3>
                      <p className="text-gray-600">
                        Mitrovice, Kosovo<br />
                        Professional makeup studio with all amenities
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md">
                    <FiPhone className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Phone</h3>
                      <p className="text-gray-600">
                        +383 49 633 634<br />
                        Available for calls and WhatsApp
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md">
                    <FiMail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-gray-600">
                        info@arbanakabashi.com<br />
                        We&apos;ll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md">
                    <FiInstagram className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Social Media</h3>
                      <p className="text-gray-600">
                        @arbanakabashi_beauty<br />
                        Follow for daily inspiration and updates
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md">
                    <FiClock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Working Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                        <p>Saturday: 9:00 AM - 6:00 PM</p>
                        <p>Sunday: 10:00 AM - 4:00 PM</p>
                        <p className="text-sm text-primary">*Evening appointments available by request</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="heading-lg mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="+383 XX XXX XXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      >
                        <option value="">Select a service</option>
                        <option value="bridal">Bridal Makeup</option>
                        <option value="special-events">Special Events</option>
                        <option value="editorial">Editorial & Fashion</option>
                        <option value="lessons">Makeup Lessons</option>
                        <option value="academy">Academy Courses</option>
                        <option value="consultation">Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-vertical"
                        placeholder="Tell us about your needs, preferred dates, or any questions you have..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary"
                    >
                      <FiSend className="w-5 h-5 mr-2" />
                      Send Message
                    </button>

                    <p className="text-sm text-gray-600 text-center">
                      We&apos;ll get back to you within 24 hours. For urgent requests, please call us directly.
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="heading-lg mb-4">Find Our Studio</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Located in the heart of Mitrovice, our professional studio is easily accessible and equipped with everything needed for your beauty transformation.
              </p>
            </motion.div>

            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <FiMapPin className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg font-semibold">Interactive Map</p>
                <p>Mitrovice, Kosovo</p>
                <p className="text-sm mt-2">Map integration coming soon</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Quick answers to common questions about our services and booking process.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How far in advance should I book?",
                  answer: "For bridal services, we recommend booking 3-6 months in advance. For other services, 1-2 weeks is usually sufficient."
                },
                {
                  question: "Do you offer trial sessions?",
                  answer: "Yes! We highly recommend trial sessions for bridal clients and special events to ensure you&apos;re completely happy with your look."
                },
                {
                  question: "What should I bring to my appointment?",
                  answer: "Just bring yourself! We provide all professional products and tools. If you have specific products you love, feel free to bring them."
                },
                {
                  question: "Do you travel for appointments?",
                  answer: "Yes, we offer on-location services for bridal parties and special events. Travel fees may apply depending on distance."
                },
                {
                  question: "What&apos;s your cancellation policy?",
                  answer: "We require 48 hours notice for cancellations. Same-day cancellations may incur a fee to cover reserved time."
                },
                {
                  question: "Do you offer group discounts?",
                  answer: "Yes! We offer special rates for bridal parties, group lessons, and academy enrollments. Contact us for details."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="font-semibold mb-3 text-primary">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ContactPage;

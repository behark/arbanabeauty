"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiClock, FiSend } from "react-icons/fi";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here we would normally send the form data to a server
    // For now, we'll just simulate a successful submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Have questions about services, academy courses, or collaboration opportunities? 
              Reach out to us and we&apos;ll get back to you promptly.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                  <FiMapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Studio Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Beauty Avenue<br />
                    Prishtina, Kosovo
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                  <FiMail className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <a href="mailto:contact@arbanakabashi.com" className="hover:text-primary transition-colors">
                      contact@arbanakabashi.com
                    </a><br />
                    <a href="mailto:academy@arbanakabashi.com" className="hover:text-primary transition-colors">
                      academy@arbanakabashi.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                  <FiClock className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Working Hours</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monday - Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-accent dark:bg-gray-800 p-8 rounded-sm">
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 text-green-700 rounded-md mt-4">
                  Thank you for your message! We&apos;ll be in touch soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  Something went wrong. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select a subject</option>
                    <option value="Services Inquiry">Services Inquiry</option>
                    <option value="Academy Information">Academy Information</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary-dark transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <FiSend className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Academy", href: "/academy" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-md dark:bg-secondary/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="text-2xl font-bold gradient-text">Arbana Kabashi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/booking"
              className="text-sm font-medium px-6 py-2 rounded bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-white dark:bg-secondary"
        >
          <div className="container-custom pt-20 pb-8">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/booking"
                className="text-lg font-medium px-6 py-3 rounded bg-primary text-white hover:bg-primary-dark transition-colors mt-4 inline-block w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;

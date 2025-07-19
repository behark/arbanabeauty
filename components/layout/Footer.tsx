import Link from "next/link";
import { FiInstagram, FiYoutube, FiFacebook, FiTwitter, FiMail } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Arbana Kabashi</h3>
            <p className="text-gray-300">
              Professional makeup artist, educator, and beauty entrepreneur bringing artistry and innovation to the beauty industry.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors">
                <FiYoutube size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">About</Link>
              <Link href="/services" className="text-gray-300 hover:text-primary transition-colors">Services</Link>
              <Link href="/portfolio" className="text-gray-300 hover:text-primary transition-colors">Portfolio</Link>
              <Link href="/academy" className="text-gray-300 hover:text-primary transition-colors">Academy</Link>
              <Link href="/shop" className="text-gray-300 hover:text-primary transition-colors">Shop</Link>
              <Link href="/blog" className="text-gray-300 hover:text-primary transition-colors">Blog</Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/services/bridal-makeup" className="text-gray-300 hover:text-primary transition-colors">Bridal Makeup</Link>
              <Link href="/services/special-events" className="text-gray-300 hover:text-primary transition-colors">Special Events</Link>
              <Link href="/services/editorial" className="text-gray-300 hover:text-primary transition-colors">Editorial</Link>
              <Link href="/services/private-lessons" className="text-gray-300 hover:text-primary transition-colors">Private Lessons</Link>
              <Link href="/academy/courses" className="text-gray-300 hover:text-primary transition-colors">Academy Courses</Link>
              <Link href="/booking" className="text-gray-300 hover:text-primary transition-colors">Book Now</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <p>Studio Location: Prishtina, Kosovo</p>
              <p className="flex items-center">
                <FiMail className="mr-2" /> 
                <a href="mailto:contact@arbanakabashi.com" className="hover:text-primary transition-colors">
                  contact@arbanakabashi.com
                </a>
              </p>
              <p>Working Hours: Mon-Sat, 9am-6pm</p>
              <Link href="/contact" className="inline-block mt-2 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Arbana Kabashi. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-400 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

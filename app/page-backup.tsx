import MainLayout from "@/components/layout/MainLayout";
import ServicesSection from "@/components/sections/ServicesSection";
import Link from "next/link";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/60"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                Your Beauty
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                  Transformation
                </span>
                <span className="block text-4xl md:text-5xl">Starts Here</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience premium beauty treatments with Arbana - where expertise meets elegance. 
                From stunning makeup to rejuvenating facials, we enhance your natural radiance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/book"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Book Your Appointment
                </Link>
                <Link
                  href="#services"
                  className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-lg hover:bg-pink-50 transition-all duration-300 text-lg font-semibold"
                >
                  Explore Services
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">500+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">5★</div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">3+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">100%</div>
                  <div className="text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services Preview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Signature Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our most popular treatments designed to enhance your natural beauty
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">💄</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Makeup Artistry</h3>
                <p className="text-gray-600 text-center mb-6">
                  Professional makeup for special events, photoshoots, and everyday glamour
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Bridal makeup</li>
                  <li>✓ Event makeup</li>
                  <li>✓ Photo makeup</li>
                  <li>✓ Everyday looks</li>
                </ul>
                <div className="text-center">
                  <Link href="/makeup" className="text-pink-600 hover:text-pink-700 font-semibold">
                    Learn More →
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Skincare Treatments</h3>
                <p className="text-gray-600 text-center mb-6">
                  Rejuvenating facials and treatments for healthy, glowing skin
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Deep cleansing facials</li>
                  <li>✓ Anti-aging treatments</li>
                  <li>✓ Hydrating masks</li>
                  <li>✓ Custom skincare</li>
                </ul>
                <div className="text-center">
                  <Link href="/services" className="text-purple-600 hover:text-purple-700 font-semibold">
                    Learn More →
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">💅</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Beauty Packages</h3>
                <p className="text-gray-600 text-center mb-6">
                  Complete beauty transformations with our curated packages
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Bridal packages</li>
                  <li>✓ Pamper sessions</li>
                  <li>✓ Makeover packages</li>
                  <li>✓ Monthly memberships</li>
                </ul>
                <div className="text-center">
                  <Link href="/packages" className="text-pink-600 hover:text-pink-700 font-semibold">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* About Section */}
        <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Meet Arbana
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  With over 3 years of professional experience in the beauty industry, 
                  I'm passionate about helping women feel confident and beautiful. 
                  My expertise spans from glamorous event makeup to therapeutic skincare treatments.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  I believe that beauty is not just about looking good, but feeling good too. 
                  Every treatment is personalized to enhance your unique features and boost your natural confidence.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white">🎓</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Certified Professional</h4>
                    <p className="text-sm text-gray-600">Licensed beauty therapist</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white">💝</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Premium Products</h4>
                    <p className="text-sm text-gray-600">High-quality brands only</p>
                  </div>
                </div>
                
                <Link
                  href="/about"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 inline-block"
                >
                  Learn More About Me
                </Link>
              </div>
              
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=600&fit=crop" 
                    alt="Arbana - Professional Beauty Therapist"
                    className="w-full h-96 object-cover rounded-xl"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">Arbana Krasniqi</h3>
                    <p className="text-gray-600">Professional Beauty Therapist</p>
                    <div className="flex justify-center space-x-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real reviews from real clients who trust us with their beauty
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-pink-50 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face" 
                    alt="Client review"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Sarah M.</h4>
                    <div className="flex text-yellow-400">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Arbana did my bridal makeup and it was absolutely perfect! 
                  She listened to exactly what I wanted and made me feel like a princess on my special day."
                </p>
              </div>
              
              <div className="bg-purple-50 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" 
                    alt="Client review"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Emma L.</h4>
                    <div className="flex text-yellow-400">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The facial treatment was amazing! My skin has never looked better. 
                  Arbana really knows what she's doing and uses the best products."
                </p>
              </div>
              
              <div className="bg-pink-50 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face" 
                    alt="Client review"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Lisa K.</h4>
                    <div className="flex text-yellow-400">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Professional, friendly, and incredibly talented. 
                  I always leave feeling more confident and beautiful. Highly recommend!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Look?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your appointment today and experience the difference professional beauty care can make
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="bg-white text-pink-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
              >
                Book Appointment Now
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-pink-600 transition-colors text-lg font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

import MainLayout from "@/components/layout/MainLayout";
import ServicesSection from "@/components/sections/ServicesSection";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Professional Beauty Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your beauty with our expert treatments
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/book"
                className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Book Appointment
              </a>
              <a
                href="#services"
                className="border border-pink-600 text-pink-600 px-8 py-3 rounded-lg hover:bg-pink-50 transition-colors"
              >
                View Services
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              About Arbana
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              With years of experience in the beauty industry, I provide
              personalized treatments to enhance your natural beauty and boost
              your confidence.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Ready to book your appointment?
            </p>
            <a
              href="/book"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors inline-block"
            >
              Book Now
            </a>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

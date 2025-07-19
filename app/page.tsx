import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AcademySection from "@/components/sections/AcademySection";
import ProductsSection from "@/components/sections/ProductsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Academy Section */}
      <AcademySection />
      
      {/* Products Section */}
      <ProductsSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Contact Section */}
      <ContactSection />
    </MainLayout>
  );
}

"use client";

import Script from "next/script";

interface SchemaMarkupProps {
  type?: 'Person' | 'LocalBusiness' | 'Organization' | 'Product' | 'Service';
  data?: any;
}

export default function SchemaMarkup({ 
  type = 'LocalBusiness', 
  data 
}: SchemaMarkupProps) {
  // Default schema for the beauty business
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Arbana Kabashi Beauty",
    "image": "https://arbanabeauty.netlify.app/images/og-image.jpg",
    "url": "https://arbanabeauty.netlify.app",
    "telephone": "+38349633634",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mitrovice",
      "addressCountry": "Kosovo"
    },
    "geo": {
      "@type": "GeoCoordinates"
    },
    "description": "Professional makeup artist, educator, and beauty entrepreneur offering premium makeup services, beauty academy courses, and luxury beauty products.",
    "priceRange": "€€",
    "sameAs": [
      "https://www.instagram.com/arbanakabashi_beauty/"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "",
      "priceCurrency": "EUR"
    }
  };

  // Use provided data or default schema
  const schemaData = data || defaultSchema;

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData)
      }}
    />
  );
}

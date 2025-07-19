import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import FacebookPixel from "@/components/analytics/FacebookPixel";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CookieConsent from "@/components/ui/CookieConsent";
import WhatsAppChat from "@/components/chat/WhatsAppChat";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/shop/CartDrawer";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arbanabeauty.netlify.app'),
  title: "Arbana Kabashi | Professional Makeup Artist & Beauty Entrepreneur",
  description: "Professional makeup artist, educator, and beauty entrepreneur offering premium makeup services, beauty academy courses, and luxury beauty products in Mitrovice, Kosovo.",
  keywords: ["makeup artist", "beauty academy", "professional makeup", "beauty products", "makeup courses", "Arbana Kabashi", "Mitrovice", "Kosovo"],
  authors: [{ name: "Arbana Kabashi" }],
  creator: "Arbana Kabashi",
  publisher: "Arbana Kabashi Beauty",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'sq-AL': '/sq',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'sq_AL',
    url: 'https://arbanabeauty.netlify.app',
    siteName: 'Arbana Kabashi Beauty',
    title: 'Arbana Kabashi | Professional Makeup Artist & Beauty Entrepreneur',
    description: 'Professional makeup artist, educator, and beauty entrepreneur offering premium makeup services, beauty academy courses, and luxury beauty products.',
    images: [
      {
        url: 'https://arbanabeauty.netlify.app/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arbana Kabashi Beauty',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arbana Kabashi Beauty',
    description: 'Professional makeup artist, educator, and beauty entrepreneur in Mitrovice, Kosovo.',
    images: ['https://arbanabeauty.netlify.app/images/og-image.jpg'],
    creator: '@arbanakabashi_beauty',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <GoogleAnalytics />
        <FacebookPixel />
        <MicrosoftClarity />
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased`}>
        <SchemaMarkup />
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              {children}
              <CookieConsent />
              <WhatsAppChat phoneNumber="38349633634" />
              <CartDrawer />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

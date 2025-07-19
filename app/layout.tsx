import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "Arbana Kabashi | Professional Makeup Artist & Beauty Entrepreneur",
  description: "Professional makeup artist, educator, and beauty entrepreneur offering premium makeup services, beauty academy courses, and luxury beauty products.",
  keywords: ["makeup artist", "beauty academy", "professional makeup", "beauty products", "makeup courses", "Arbana Kabashi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

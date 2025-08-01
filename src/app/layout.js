import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "../components/SEO/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Paperly - Create Professional Invoices in Seconds | No Signup Required",
  description: "Create professional invoices instantly with Paperly. No signup required. Designed for Indian businesses, freelancers, and consultants. Drag & drop builder, customizable templates, and instant sharing.",
  keywords: "invoice generator, professional invoices, Indian business, freelancer invoices, invoice templates, drag drop builder, instant invoice, no signup, invoice software, billing software, GST invoice, tax invoice",
  authors: [{ name: "Paperly Team" }],
  creator: "Paperly",
  publisher: "Paperly",
  robots: "index, follow",
  openGraph: {
    title: "Paperly - Create Professional Invoices in Seconds",
    description: "Create professional invoices instantly with Paperly. No signup required. Perfect for Indian businesses and freelancers.",
    type: "website",
    locale: "en_US",
    siteName: "Paperly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paperly - Professional Invoice Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paperly - Create Professional Invoices in Seconds",
    description: "Create professional invoices instantly with Paperly. No signup required.",
    images: ["/og-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1F2937",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://paperly.in",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

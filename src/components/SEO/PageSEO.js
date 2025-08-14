"use client";

import Head from "next/head";
import { getPageMetadata } from "@/app/metadata-config";

export default function PageSEO({ pageName, customMetadata = {} }) {
  const metadata = { ...getPageMetadata(pageName), ...customMetadata };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={metadata.canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={metadata.ogTitle || metadata.title} />
      <meta property="og:description" content={metadata.ogDescription || metadata.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metadata.canonical} />
      <meta property="og:site_name" content="Paperly" />
      <meta property="og:image" content="https://paprly.in/final_logo.png" />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content="Paperly - Professional Document Management Platform" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.ogTitle || metadata.title} />
      <meta name="twitter:description" content={metadata.ogDescription || metadata.description} />
      <meta name="twitter:image" content="https://paprly.in/final_logo.png" />
      <meta name="twitter:image:alt" content="Paperly - Professional Document Management Platform" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Paperly Team" />
      <meta name="creator" content="Paperly" />
      <meta name="publisher" content="Paperly" />
      
      {/* Structured Data for Better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Paperly",
            "description": metadata.description,
            "url": "https://paprly.in",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "Paperly"
            }
          })
        }}
      />
    </Head>
  );
}

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Paperly",
    "description": "Create professional invoices instantly with Paperly. No signup required. Designed for Indian businesses, freelancers, and consultants.",
    "url": "https://paperly.in",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "description": "Free invoice generator with no signup required"
    },
    "featureList": [
      "Professional invoice templates",
      "Drag and drop builder",
      "Instant sharing",
      "No signup required",
      "GST compliant invoices",
      "Indian business focused"
    ],
    "screenshot": "https://paperly.in/screenshot.png",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "Paperly Team"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "potentialAction": {
      "@type": "UseAction",
      "target": "https://paperly.in/invoice-generator"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 
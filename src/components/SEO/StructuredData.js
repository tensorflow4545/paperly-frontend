export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Paperly - Free Invoice Generator",
    "description": "Generate free invoices online instantly with Paperly. Create professional invoices for freelancers, businesses, and consultants. No signup required. Free invoice generator with templates, GST compliance, and instant sharing.",
    "url": "https://paprly.in",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "description": "Free invoice generator online with no signup required"
    },
    "featureList": [
      "Generate free invoice online",
      "Professional invoice templates",
      "Drag and drop builder",
      "Instant sharing",
      "No signup required",
      "GST compliant invoices",
      "Indian business focused",
      "PDF invoice generator",
      "Online invoice maker",
      "Free invoice templates"
    ],
    "screenshot": "https://paprly.in/screenshot.png",
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
      "target": "https://paprly.in/invoice-generator"
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to generate free invoice online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can generate free invoices online with Paperly. Simply visit our website, choose a template, fill in your details, and download or share your professional invoice instantly. No signup required."
        }
      },
      {
        "@type": "Question",
        "name": "Is Paperly invoice generator really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Paperly is completely free to use. You can generate unlimited invoices online without any cost or signup required. We offer professional templates and features at no charge."
        }
      },
      {
        "@type": "Question",
        "name": "Can I create GST compliant invoices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Paperly supports GST compliant invoices for Indian businesses. Our templates include all necessary fields for GST invoices and tax calculations."
        }
      }
    ]
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Paperly",
    "url": "https://paprly.in",
    "logo": "https://paprly.in/logo.png",
    "description": "Free online invoice generator for freelancers, businesses, and consultants",
    "sameAs": [
      "https://twitter.com/paperly",
      "https://linkedin.com/company/paperly"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
    </>
  );
} 
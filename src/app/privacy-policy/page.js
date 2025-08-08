"use client"

import Head from "next/head"
import React from "react"
import { useRouter } from "next/navigation"
import { Shield, Eye, Lock, FileText, Users, Globe, CheckCircle, ArrowRight, Mail, Calendar, Database, Server } from 'lucide-react'
import Navbar from "../../components/LandingPage/Navbar"
import Footer from "../../components/LandingPage/Footer"

export default function PrivacyPolicyPage() {
  const router = useRouter()

  const handleBackToHome = () => {
    router.push("/")
  }
  
  const handleGoToTemplates = () => {
    router.push("/template")
  }

  const privacyFeatures = [
    {
      icon: Shield,
      title: "Data Protection",
      description: "Your data is protected with industry-standard encryption"
    },
    {
      icon: Eye,
      title: "No Tracking",
      description: "We don't track your browsing or personal information"
    },
    {
      icon: Lock,
      title: "Secure Storage",
      description: "All data is stored securely and never shared with third parties"
    },
    {
      icon: FileText,
      title: "Transparent Policy",
      description: "Clear and simple privacy policy that you can understand"
    }
  ]

  const dataCollection = [
    {
      title: "Information We Collect",
      items: [
        "Invoice data you create (business details, client information, service descriptions)",
        "Temporary session data for functionality",
        "Basic analytics to improve our service (no personal identification)",
        "Technical information (browser type, device type for compatibility)"
      ]
    },
    {
      title: "Information We Don't Collect",
      items: [
        "Personal identification information (name, email, phone)",
        "Payment information (we don't process payments)",
        "Browsing history or search patterns",
        "Location data or device identifiers"
      ]
    }
  ]

  const dataUsage = [
    {
      title: "How We Use Your Data",
      items: [
        "Generate and format your invoices as requested",
        "Provide customer support when needed",
        "Improve our service functionality and user experience",
        "Ensure security and prevent fraud"
      ]
    },
    {
      title: "Data Sharing Policy",
      items: [
        "We never sell, rent, or share your data with third parties",
        "No advertising companies receive your information",
        "Data is only used for service provision",
        "Legal requirements may require disclosure (with proper notice)"
      ]
    }
  ]

  const faqs = [
    {
      question: "Is my invoice data stored permanently?",
      answer: "No, your invoice data is not stored permanently. We only temporarily process your data to generate invoices. Once the invoice is created and shared, the data is not retained on our servers."
    },
    {
      question: "Do you track my browsing activity?",
      answer: "No, we do not track your browsing activity, search history, or any other personal behavior. We only collect minimal technical data necessary for the service to function properly."
    },
    {
      question: "Can I delete my data?",
      answer: "Since we don't store your personal data permanently, there's nothing to delete. Your invoice data is processed temporarily and not retained after invoice generation."
    },
    {
      question: "Do you use cookies?",
      answer: "We use minimal, essential cookies only for basic functionality like session management. We don't use tracking cookies or analytics that could identify you personally."
    },
    {
      question: "Is my data encrypted?",
      answer: "Yes, all data transmission is encrypted using HTTPS/SSL protocols. We implement industry-standard security measures to protect any temporary data processing."
    },
    {
      question: "Do you share data with third parties?",
      answer: "No, we do not share, sell, or rent your data to any third parties. Your information is only used for providing our invoice generation service."
    }
  ]

  return (
    <>
      <Head>
        <title>Privacy Policy | Paprly - Free Invoice Generator</title>
        <meta
          name="description"
          content="Learn about Paprly's privacy policy. We protect your data with industry-standard encryption, no tracking, and transparent practices. Your privacy is our priority."
        />
        <meta name="keywords" content="privacy policy, data protection, invoice generator privacy, secure invoicing, GDPR compliant, no tracking" />
        <link rel="canonical" href="https://paprly.in/privacy-policy" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <div className="w-full min-h-[300px] md:h-[362px] bg-[#FEFCE8] items-center justify-center flex px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-[130px] items-center lg:items-start">
          <div className="flex flex-col gap-4 w-full lg:w-[739px] max-w-full lg:h-[170px] text-center lg:text-left">
            <h1 className="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight">
              Privacy Policy
            </h1>
            <h2 className="text-gray-600 text-base md:text-lg leading-relaxed">
              Your privacy is our priority. Learn how we protect your data and maintain transparency 
              in everything we do. Simple, clear, and secure.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={handleBackToHome} 
              className="bg-white w-full sm:w-[156px] h-[45px] cursor-pointer hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-md transition-all duration-200"
            >
              Back to Home
            </button>
            <button 
              onClick={handleGoToTemplates}
              className="bg-gray-600 w-full sm:w-[156px] h-[45px] cursor-pointer hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200"
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Features Section */}
      <div className="w-full bg-white py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Privacy Commitment</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              At Paprly, we believe privacy is a fundamental right. We've built our service with privacy 
              by design, ensuring your data is protected and never misused.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
            {privacyFeatures.map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Key Principles */}
          <div className="bg-[#FEFCE8] rounded-lg p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Our Privacy Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">No Permanent Storage</h4>
                  <p className="text-gray-600 text-sm">Your invoice data is processed temporarily and not stored permanently</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">No Tracking</h4>
                  <p className="text-gray-600 text-sm">We don't track your browsing activity or personal behavior</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">No Third-Party Sharing</h4>
                  <p className="text-gray-600 text-sm">Your data is never sold, rented, or shared with third parties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Collection Section */}
      <div className="w-full bg-gray-50 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Data Collection & Usage</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We believe in complete transparency about what data we collect and how we use it. 
              Here's everything you need to know.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dataCollection.map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Usage Section */}
      <div className="w-full bg-white py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How We Use Your Data</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We use your data only for providing our service and improving your experience. 
              Nothing more, nothing less.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dataUsage.map((section, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="w-full bg-gray-50 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Security Measures</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We implement industry-standard security measures to protect your data and ensure 
              your privacy is never compromised.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">HTTPS Encryption</h3>
              <p className="text-gray-600 text-sm">All data transmission is encrypted using SSL/TLS protocols</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Server className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Servers</h3>
              <p className="text-gray-600 text-sm">Hosted on secure, enterprise-grade infrastructure</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No Permanent Storage</h3>
              <p className="text-gray-600 text-sm">Data is processed temporarily and not stored permanently</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="w-full bg-white py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Common questions about our privacy practices and data handling. 
              If you don't find your answer here, feel free to contact us.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full bg-gray-50 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Questions About Privacy?</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            We're committed to transparency and are here to answer any questions you have about 
            our privacy practices. Don't hesitate to reach out.
          </p>
          
          <div className="bg-[#FEFCE8] rounded-lg p-6 md:p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900">Get in Touch</h3>
            </div>
            <p className="text-gray-600 mb-4">Email us at:</p>
            <a 
              href="mailto:home@paprly.in" 
              className="inline-flex items-center gap-2 bg-transparent text-gray-800 hover:text-white hover:bg-gray-700  font-semibold px-4 py-2 rounded-md transition-all duration-200"
            >
              home@paprly.in
            </a>
            <p className="text-gray-600 text-sm mt-4">
              We typically respond within 24 hours and are happy to address any privacy concerns.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

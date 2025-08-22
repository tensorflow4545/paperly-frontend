"use client"

import Head from "next/head"
import React from "react"
import { useRouter } from "next/navigation"
import { Shield, FileText, Users, Globe, CheckCircle, ArrowRight, Mail, Calendar, Database, Server, AlertTriangle } from 'lucide-react'
import Navbar from "../../components/LandingPage/Navbar"
import Footer from "../../components/LandingPage/Footer"

export default function TermsOfServicePage() {
  const router = useRouter()

  const handleBackToHome = () => {
    router.push("/")
  }
  
  const handleGoToTemplates = () => {
    router.push("/template")
  }

  const termsFeatures = [
    {
      icon: Shield,
      title: "Clear Terms",
      description: "Transparent and easy-to-understand terms of service"
    },
    {
      icon: FileText,
      title: "Legal Protection",
      description: "Comprehensive legal framework for all users"
    },
    {
      icon: Users,
      title: "User Rights",
      description: "Clear definition of user rights and responsibilities"
    },
    {
      icon: Globe,
      title: "Global Compliance",
      description: "Terms compliant with international standards"
    }
  ]

  const serviceTerms = [
    {
      title: "Service Description",
      items: [
        "Paprly provides online document creation and management services",
        "Services include invoice generation, contract creation, and e-signing",
        "All services are provided &apos;as is&apos; without warranties",
        "We reserve the right to modify or discontinue services"
      ]
    },
    {
      title: "User Responsibilities",
      items: [
        "Provide accurate and truthful information",
        "Maintain the security of your account",
        "Use services only for lawful purposes",
        "Respect intellectual property rights"
      ]
    }
  ]

  const legalTerms = [
    {
      title: "Limitation of Liability",
      items: [
        "Paprly is not liable for indirect, incidental, or consequential damages",
        "Maximum liability limited to the amount paid for services",
        "No liability for data loss or service interruptions",
        "Users are responsible for backing up their data"
      ]
    },
    {
      title: "Intellectual Property",
      items: [
        "Paprly retains rights to platform and technology",
        "Users retain rights to their created content",
        "Templates are provided under license for personal/business use",
        "No redistribution of templates without permission"
      ]
    }
  ]

  const faqs = [
    {
      question: "Can I use Paprly for commercial purposes?",
      answer: "Yes, Paprly is designed for both personal and commercial use. However, you must comply with all applicable laws and regulations."
    },
    {
      question: "What happens if I violate these terms?",
      answer: "Violation of terms may result in account suspension or termination. We reserve the right to take appropriate action to protect our services and users."
    },
    {
      question: "Are these terms legally binding?",
      answer: "Yes, by using Paprly services, you agree to be bound by these terms. We recommend reviewing them carefully before use."
    },
    {
      question: "Can these terms change?",
      answer: "Yes, we may update these terms periodically. Continued use of services constitutes acceptance of updated terms."
    },
    {
      question: "What if I don&apos;t agree with the terms?",
      answer: "If you don&apos;t agree with these terms, please do not use our services. You can contact us with any questions or concerns."
    },
    {
      question: "How do I report violations?",
      answer: "Report violations through our contact form or email. We take all reports seriously and will investigate appropriately."
    }
  ]

  return (
    <>
      <Head>
        <title>Terms of Service | Paperly - Legal Terms & Conditions</title>
        <meta name="description" content="Read Paperly&apos;s terms of service to understand the legal terms and conditions for using our document management platform." />
        <meta name="keywords" content="terms of service, legal terms, conditions, user agreement, paperly terms, document management terms" />
        <link rel="canonical" href="https://paprly.in/terms" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        <Navbar />
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 text-gray-800 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-yellow-200/30 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-xl text-gray-700">Effective Date: 08/08/2025</p>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl">
              These terms govern your use of Paperly&apos;s document management platform. By using our services, 
              you agree to these terms and conditions.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {termsFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Service Terms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {serviceTerms.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Legal Terms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {legalTerms.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-yellow-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-yellow-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-8 border border-yellow-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Our Terms?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you have any questions about these terms or need clarification on any point, 
                please don&apos;t hesitate to contact us. We&apos;re here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleBackToHome}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  Back to Home
                </button>
                <button
                  onClick={handleGoToTemplates}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Try Templates
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
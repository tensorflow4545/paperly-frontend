"use client"

import Head from "next/head"
import React from "react"
import { useRouter } from "next/navigation"
import { FileText, Edit3, Download, Users, Calendar, DollarSign, CreditCard, Shield, BarChart3, Briefcase, Palette, Wrench, UserCheck, Mail, CheckCircle, ArrowRight, Smartphone, Monitor, Tablet } from 'lucide-react'
import Navbar from "../../components/LandingPage/Navbar"
import Footer from "../../components/LandingPage/Footer"

export default function HelpPage() {
  const router = useRouter()

  const handleBackToHome = () => {
    router.push("/")
  }
  
  const handleGoToTemplates = () => {
    router.push("/template")
  }

  const features = [
    {
      icon: FileText,
      title: "Create from Scratch",
      description: "Build your invoice from ground up with our intuitive form builder"
    },
    {
      icon: Palette,
      title: "10+ Templates",
      description: "Choose from our professionally designed templates, always updating"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Works perfectly on mobile, tablet, and desktop devices"
    },
    {
      icon: Mail,
      title: "One-Click Share",
      description: "Share directly to your client's email with just one click"
    }
  ]

  const comingSoonFeatures = [
    {
      icon: Shield,
      title: "NDA Creation",
      description: "Generate professional Non-Disclosure Agreements"
    },
    {
      icon: Users,
      title: "Offer Letters",
      description: "Create job offer letters for your team"
    },
    {
      icon: FileText,
      title: "Freelancer Agreements",
      description: "Client-freelancer contracts made simple"
    },
    {
      icon: Edit3,
      title: "Digital Signing",
      description: "Sign documents digitally with legal validity"
    },
    {
      icon: BarChart3,
      title: "Personal Dashboard",
      description: "Manage all your clients and documents in one place"
    }
  ]

  const steps = [
    {
      number: "1",
      title: "Choose Your Starting Point",
      description: "Select between a blank template or one of our built-in professional templates"
    },
    {
      number: "2",
      title: "Edit Your Details",
      description: "Fill in your business information and client details with our super easy steps"
    },
    {
      number: "3",
      title: "Enter Client Information",
      description: "Add your name, client's email, and service details"
    },
    {
      number: "4",
      title: "Generate & Share",
      description: "BOOM! Paprly manages everything on your behalf and delivers to your client"
    }
  ]

  return (
    <>
      <Head>
        <title>Help & Support | Paprly - Free Invoice Generator</title>
        <meta
          name="description"
          content="Learn how to use Paprly's free invoice generator. Create professional invoices from scratch or templates. Mobile-friendly, one-click sharing, and completely free."
        />
        <meta name="keywords" content="invoice generator help, free invoicing, invoice templates, mobile invoice creator, freelancer tools" />
        <link rel="canonical" href="https://paprly.in/help" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <div className="w-full min-h-[300px] md:h-[362px] bg-[#FEFCE8] items-center justify-center flex px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-[130px] items-center lg:items-start">
          <div className="flex flex-col gap-4 w-full lg:w-[739px] max-w-full lg:h-[170px] text-center lg:text-left">
            <h1 className="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight">
              Help & Support
            </h1>
            <h2 className="text-gray-600 text-base md:text-lg leading-relaxed">
              Everything you need to know about using Paprly&apos;s free invoice generator. 
              Get started in minutes and create professional invoices effortlessly.
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

      {/* What is Paprly Section */}
      <div className="w-full bg-white py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is Paprly?</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Paprly is a 100% free and ad-free invoice generator that lets you create professional invoices 
              from scratch or choose from our 10+ always-updating prebuilt templates. Perfect for freelancers, 
              small businesses, and startups.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Why Use Paprly */}
          <div className="bg-[#FEFCE8] rounded-lg p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Paprly?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">100% Free Forever</h4>
                  <p className="text-gray-600 text-sm">No hidden costs, no premium plans, completely free to use</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Cross-Platform</h4>
                  <p className="text-gray-600 text-sm">Works perfectly on mobile, tablet, and desktop devices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Instant Sharing</h4>
                  <p className="text-gray-600 text-sm">Share directly to client&apos;s email with one click</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="w-full bg-gray-50 py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We&apos;re building a complete business document suite. All tools will be available at one stop, 
              completely free, designed for freelancers, small businesses, and fully developed startups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {comingSoonFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center text-xs bg-[#FEFCE8] text-gray-700 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Generate Invoice Section */}
      <div className="w-full bg-white py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Generate Invoice</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Creating professional invoices with Paprly is incredibly simple. Follow these easy steps 
              and you&apos;ll have your invoice ready in minutes.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-15 md:h-15 bg-gray-600 text-white rounded-full flex items-center justify-center">
                    <span className="text-xl md:text-xl font-bold">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="bg-[#FEFCE8] rounded-lg p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 text-base md:text-lg mb-6">
                Choose between a blank template or one of our built-in templates. 
                Enter your details with super easy steps, and BOOM! Paprly manages everything on your behalf.
              </p>
              <button onClick={handleGoToTemplates} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-md transition-all duration-200">
                Start Creating Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* More Coming Soon Section */}
      <div className="w-full bg-gray-50 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">A Lot More Coming Soon</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            We&apos;re constantly working to add new features and templates to make your business documentation 
            process even smoother. Stay tuned for exciting updates!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Monitor className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Desktop App</h4>
              <p className="text-gray-600 text-sm">Native desktop application for offline invoice creation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Team Collaboration</h4>
              <p className="text-gray-600 text-sm">Collaborate with your team on invoice creation and management</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <BarChart3 className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Analytics Dashboard</h4>
              <p className="text-gray-600 text-sm">Track your invoicing patterns and business insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full bg-white py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Need Help or Have Suggestions?</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            We&apos;re here to help! Whether you have questions, need support, or want to suggest new features, 
            we&apos;d love to hear from you. We listen to all queries and implement everything that&apos;s needed.
          </p>
          
          <div className="bg-[#FEFCE8] rounded-lg p-6 md:p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900">Get in Touch</h3>
            </div>
            <p className="text-gray-600 mb-4">Email us at:</p>
            <a 
              href="mailto:home@paprly.in" 
              className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-md transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              home@paprly.in
            </a>
            <p className="text-gray-600 text-sm mt-4">
              We typically respond within 24 hours and are committed to making Paprly better based on your feedback.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

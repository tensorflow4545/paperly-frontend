"use client"

import Head from "next/head"
import React from "react"
import { useRouter } from "next/navigation"
import { Home, ArrowLeft, FileText, Search, AlertCircle } from 'lucide-react'
import Navbar from "../components/LandingPage/Navbar"
import Footer from "../components/LandingPage/Footer"

export default function NotFoundPage() {
  const router = useRouter()

  const handleBackToHome = () => {
    router.push("/")
  }
  
  const handleGoToTemplates = () => {
    router.push("/template")
  }

  const handleGoBack = () => {
    router.back()
  }

  const popularPages = [
    {
      title: "Home",
      description: "Main landing page",
      href: "/",
      icon: Home
    },
    {
      title: "Templates",
      description: "Create invoices with templates",
      href: "/template",
      icon: FileText
    },
    {
      title: "Help & Support",
      description: "Get help and learn how to use Paprly",
      href: "/help",
      icon: Search
    }
  ]

  return (
    <>
      <Head>
        <title>404 - Page Not Found | Paprly - Free Invoice Generator</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Navigate back to Paprly's free invoice generator and create professional invoices instantly."
        />
        <meta name="keywords" content="404, page not found, invoice generator, free invoicing" />
        <link rel="canonical" href="https://paprly.in/404" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <div className="w-full min-h-[300px] md:h-[362px] bg-[#FEFCE8] items-center justify-center flex px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-[130px] items-center lg:items-start">
          <div className="flex flex-col gap-4 w-full lg:w-[739px] max-w-full lg:h-[170px] text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-gray-600" />
              <h1 className="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight">
                404 - Page Not Found
              </h1>
            </div>
            <h2 className="text-gray-600 text-base md:text-lg leading-relaxed">
              Oops! The page you're looking for doesn't exist. Don't worry, you can still create 
              professional invoices with Paprly. Let's get you back on track.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={handleBackToHome} 
              className="bg-white w-full sm:w-[156px] h-[45px] cursor-pointer hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              Go Home
            </button>
            <button 
              onClick={handleGoToTemplates}
              className="bg-gray-600 w-full sm:w-[156px] h-[45px] cursor-pointer hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              Create Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-white py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Happened?</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              The page you're looking for might have been moved, deleted, or you entered the wrong URL. 
              No worries! Here are some helpful options to get you back on track.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Go Back</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Return to the previous page you were on
              </p>
              <button 
                onClick={handleGoBack}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 text-sm"
              >
                Go Back
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Home className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Go Home</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Start fresh from our homepage
              </p>
              <button 
                onClick={handleBackToHome}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 text-sm"
              >
                Go Home
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Invoice</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Jump straight into creating your invoice
              </p>
              <button 
                onClick={handleGoToTemplates}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 text-sm"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="bg-[#FEFCE8] rounded-lg p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Popular Pages</h3>
            <p className="text-gray-600 text-center mb-8">
              Here are some popular pages you might be looking for:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularPages.map((page, index) => (
                <a
                  key={index}
                  href={page.href}
                  className="group bg-white p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:border-gray-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                      <page.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                        {page.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{page.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="w-full bg-gray-50 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Still Can't Find What You're Looking For?</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            If you're having trouble finding a specific page or feature, our help section 
            has all the information you need to get started with Paprly.
          </p>
          
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900">Need Help?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Check out our comprehensive help section for guides, tutorials, and answers to common questions.
            </p>
            <a 
              href="/help"
              className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-md transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              Visit Help Center
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

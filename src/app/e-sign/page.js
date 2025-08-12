"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, Edit3, Download, Upload, Pen, Shield, Clock, Users, CheckCircle, Palette, Type } from "lucide-react"
import Navbar from "@/components/LandingPage/Navbar"
import Footer from "@/components/LandingPage/Footer"
import ESignEditor from "@/components/ESignEditor/ESignEditor"
import Head from "next/head"

function ESignContent() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  // Auto-rotate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      title: "Upload Document",
      description: "Upload any PDF document that needs to be signed securely",
      icon: Upload,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Add Signatures",
      description: "Place text or drawn signatures anywhere on the document",
      icon: Edit3,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Download Signed",
      description: "Download your professionally signed document instantly",
      icon: Download,
      color: "from-purple-500 to-violet-600"
    }
  ]

  const features = [
    {
      icon: FileText,
      title: "PDF Support",
      description: "Upload and sign any PDF document with professional quality"
    },
    {
      icon: Pen,
      title: "Multiple Signature Types",
      description: "Choose from text signatures with custom fonts or draw your own"
    },
    {
      icon: Palette,
      title: "Customizable Styles",
      description: "Multiple signature fonts and colors to match your preferences"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your documents are processed securely without cloud storage"
    },
    {
      icon: Clock,
      title: "Instant Processing",
      description: "Sign and download your documents in seconds, not hours"
    },
    {
      icon: CheckCircle,
      title: "Professional Quality",
      description: "Generate legally compliant signed documents every time"
    }
  ]

  return (
    <>
      <Head>
        <title>e-Sign Documents | Paprly</title>
        <meta name="description" content="Professional PDF e-signature tool. Upload, sign, and download documents with multiple signature styles." />
        <link rel="canonical" href="https://paprly.in/e-sign" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <div className="w-full min-h-[300px] md:h-[362px] bg-[#FEFCE8] items-center justify-center flex px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-[130px] items-center lg:items-start">
          <div className="flex flex-col gap-4 w-full lg:w-[739px] max-w-full lg:h-[170px] text-center lg:text-left">
            <h1 className="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight">
              Professional e-Signature
            </h1>
            <h2 className="text-gray-600 text-base md:text-lg leading-relaxed">
              Upload any PDF document and add professional signatures with multiple styles and colors. 
              Perfect for contracts, agreements, and business documents.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => router.push('/')} 
              className="bg-white w-full sm:w-[156px] h-[45px] cursor-pointer hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-md transition-all duration-200"
            >
              Back to Home
            </button>
            <button 
              onClick={() => document.getElementById('editor-section')?.scrollIntoView({ behavior: 'smooth' })} 
              className="bg-gray-600 w-full sm:w-[156px] h-[45px] cursor-pointer hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200"
            >
              Start Signing
            </button>
          </div>
        </div>
      </div>

      {/* Quick Steps */}
      <div className="w-full bg-white py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Upload className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Upload PDF</h3>
              <p className="text-base text-gray-600">Any PDF document</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Edit3 className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Signatures</h3>
              <p className="text-base text-gray-600">Multiple styles & colors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Download</h3>
              <p className="text-base text-gray-600">Signed document ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-[#F9FAFB] py-10 md:py-16 ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Professional Digital Signatures
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Secure, legally compliant, and easy to use. Perfect for contracts, agreements, and business documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 md:p-10 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Section */}
      <div id="editor-section" className="bg-gray-50">
        <ESignEditor />
      </div>

      {/* Bottom CTA Section */}
      <div className="w-full bg-gray-600 px-4 py-12 md:py-20">
        <div className="flex flex-col gap-8 items-center justify-center text-center max-w-3xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Ready to sign your documents?
            </h2>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
              Join thousands of professionals using our secure e-signature solution.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => router.push('/help')} 
              className="bg-white w-full sm:w-[156px] h-[45px] hover:bg-gray-100 text-gray-700 cursor-pointer font-semibold px-4 py-2 rounded-md transition-all duration-200"
            >
              Need Help?
            </button>
            <button 
              onClick={() => document.getElementById('editor-section')?.scrollIntoView({ behavior: 'smooth' })} 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-600 text-white cursor-pointer font-semibold px-4 py-2 rounded-md transition-all duration-200 w-full sm:w-[156px] h-[45px]"
            >
              Start Signing 
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default function ESignPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading e-Sign editor...</div>
      </div>
    }>
      <ESignContent />
    </Suspense>
  )
}

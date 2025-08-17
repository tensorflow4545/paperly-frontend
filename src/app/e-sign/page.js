"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, Edit3, Download, Upload, Pen, Shield, Clock, Users, CheckCircle, Palette, Type } from "lucide-react"
import Navbar from "@/components/LandingPage/Navbar"
import Footer from "@/components/LandingPage/Footer"
import ESignEditor from "@/components/ESignEditor/ESignEditor"
import PageSEO from "@/components/SEO/PageSEO"

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
      title: "Sign PDF Online",
      description: "Upload and sign any PDF document with our free digital signature tool"
    },
    {
      icon: Pen,
      title: "Digital Signature Types",
      description: "Create text signatures with custom fonts or draw your own digital signature"
    },
    {
      icon: Palette,
      title: "Professional Styles",
      description: "Multiple signature fonts and colors for professional document signing"
    },
    {
      icon: Shield,
      title: "Secure Document Signing",
      description: "Your documents are processed securely without cloud storage or registration"
    },
    {
      icon: Clock,
      title: "Instant Digital Signatures",
      description: "Sign documents online and download in seconds with our free e-sign tool"
    },
    {
      icon: CheckCircle,
      title: "Legally Compliant",
      description: "Generate professional digital signatures that are legally recognized"
    }
  ]

  return (
    <>
      <PageSEO pageName="e-sign" />

      <Navbar />

      {/* Hero Section */}
      <div className="w-full min-h-[300px] md:h-[362px] bg-[#FEFCE8] items-center justify-center flex px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-[130px] items-center lg:items-start">
          <div className="flex flex-col gap-4 w-full lg:w-[739px] max-w-full lg:h-[170px] text-center lg:text-left">
            <h1 className="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight">
              Sign PDF Online Free - Digital Signature Tool
            </h1>
            <h2 className="text-gray-600 text-base md:text-lg leading-relaxed">
              Free online document sign tool. Sign PDF online instantly without signup. Professional digital signature tool for contracts, agreements, and business documents. Upload, sign, and download documents with multiple signature styles.
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
              Professional Digital Signature Features
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our free e-sign tool provides secure, legally compliant digital signatures. Perfect for signing contracts, agreements, and business documents online.
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

      {/* How to Sign Documents Online - Step by Step Instructions */}
      <div className="w-full bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How to Sign Documents Online for Free
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to sign PDF online using our free digital signature tool. No registration required.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-500 text-gray-800 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-lg font-semibold text-gray-900">Upload Your PDF Document</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Click the upload button or drag and drop your PDF file. Our online document sign tool supports files up to 10MB. No account creation needed.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-500 text-gray-800 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="text-lg font-semibold text-gray-900">Add Digital Signatures</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Choose between text signatures with custom fonts or draw your own signature. Place signatures anywhere on the document using our free e-sign tool.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-500 text-gray-800 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <h3 className="text-lg font-semibold text-gray-900">Download Signed Document</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Preview your signed document and download the professionally signed PDF. Your digital signature tool creates legally compliant documents instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Content Section */}
      <div className="w-full bg-gray-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Free Online Document Sign Tool - Professional Digital Signatures
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Paprly&apos;s free e-sign tool revolutionizes how you sign PDF online. Our digital signature tool eliminates the need for expensive software or complex registration processes. Whether you&apos;re signing contracts, agreements, or business documents, our online document sign platform provides everything you need for professional digital signatures.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Choose Our Free E-Sign Tool?
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Unlike other digital signature tools that require subscriptions or account creation, Paprly&apos;s sign PDF online service is completely free and accessible immediately. Our online document sign tool processes your documents securely without storing them on our servers, ensuring your privacy and data security.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Professional Digital Signature Features
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our digital signature tool offers multiple signature options to meet your needs. Create text signatures with professional fonts, or draw custom signatures using our intuitive drawing interface. The sign documents without signup feature means you can start signing immediately, making it perfect for urgent document signing needs.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Secure Document Processing
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              When you sign PDF online with Paprly, your documents are processed securely in your browser. Our free e-sign tool doesn&apos;t store your files, ensuring complete privacy. The digital signature tool creates legally compliant signatures that are recognized by courts and businesses worldwide.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Perfect for Business and Personal Use
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether you&apos;re a business professional needing to sign contracts, a freelancer completing agreements, or an individual signing personal documents, our online document sign tool provides the professional digital signature solution you need. The sign documents without signup feature makes it ideal for one-time users and regular customers alike.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Mobile-Friendly Digital Signature Tool
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our sign PDF online tool works perfectly on all devices. Whether you&apos;re using a desktop computer, tablet, or smartphone, you can access our free e-sign tool and create professional digital signatures anywhere, anytime. The responsive design ensures optimal experience across all screen sizes.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Instant Document Signing
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Time is valuable, and our digital signature tool respects that. The sign documents without signup feature means no waiting for account verification or email confirmations. Upload your PDF, add your digital signature, and download the signed document in seconds. Our online document sign platform is designed for speed and efficiency.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Professional Quality Digital Signatures
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Every digital signature created with our free e-sign tool meets professional standards. The sign PDF online feature produces high-quality, legally compliant signatures that are suitable for business contracts, legal documents, and official agreements. Our digital signature tool ensures your documents look professional and trustworthy.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No Hidden Costs or Limitations
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Unlike other digital signature tools that offer free trials with limitations, Paprly&apos;s sign documents without signup service is truly free. No page limits, no watermark, no expiration dates. Our online document sign tool provides unlimited access to professional digital signatures without any restrictions.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Start Signing Documents Online Today
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Ready to experience the best free e-sign tool available? Our sign PDF online platform is ready to help you create professional digital signatures instantly. No registration, no downloads, no complications. Just upload, sign, and download your documents with our trusted digital signature tool.
            </p>
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
              Ready to Sign Documents Online?
            </h2>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
              Join thousands of users signing PDF online with our free digital signature tool. No registration required.
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
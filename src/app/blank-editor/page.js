"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Monitor, Smartphone, Home, FileText } from "lucide-react"
import BlankEditor from '@/components/Editor/BlankEditor/BlankEditor'
import Navbar from '@/components/LandingPage/Navbar'
import Footer from '@/components/LandingPage/Footer'

export default function BlankEditorPage() {
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleGoToTemplates = () => {
    router.push("/template")
  }

  const handleGoToHome = () => {
    router.push("/")
  }

  if (isMobile) {
    return (
      <>
        <Navbar />
        
        {/* Mobile Message Section - Same styling as help page hero */}
        <div className="w-full min-h-[300px] md:h-[362px] bg-[#FEFCE8] items-center justify-center flex px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-[130px] items-center lg:items-start">
            <div className="flex flex-col gap-4 w-full lg:w-[739px] max-w-full lg:h-[170px] text-center lg:text-left">
              <div className="flex items-center justify-center gap-3 mb-4">
                <h1 className="font-medium text-2xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight">
                  Editor Not Available on Mobile
                </h1>
              </div>
              <h2 className="text-gray-600 text-base md:text-lg leading-relaxed">
                Our advanced invoice editor requires more screen space and resources than mobile devices can provide. 
                For the best experience, please use a desktop or tablet device.
              </h2>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                <span>Bigger screen resolution recommended for optimal experience. Meanwhile you can try creating invoices withing built in templates smoothly on mobile devices.</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={handleGoToHome}
                className="bg-white w-full sm:w-[156px] h-[45px] cursor-pointer hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
              <button 
                onClick={handleGoToTemplates}
                className="bg-gray-600 w-full sm:w-[156px] h-[45px] cursor-pointer hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Use Templates
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="w-full bg-white py-8 md:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Still Want to Create Invoices?</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
              You can still create professional invoices using our built-in templates that work perfectly on mobile devices. 
              Our templates are designed to be mobile-friendly and provide all the features you need.
            </p>
            
            <div className="bg-[#FEFCE8] rounded-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Why Use Templates?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Mobile Optimized</h4>
                    <p className="text-gray-600 text-sm">Designed specifically for mobile devices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Professional Design</h4>
                    <p className="text-gray-600 text-sm">10+ professionally designed templates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Easy to Use</h4>
                    <p className="text-gray-600 text-sm">Simple form-based interface</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Instant Sharing</h4>
                    <p className="text-gray-600 text-sm">One-click email sharing to clients</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleGoToTemplates}
                className="mt-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-md transition-all duration-200 flex items-center gap-2 mx-auto"
              >
                <FileText className="w-4 h-4" />
                Explore Templates
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </>
    )
  }

  // Desktop version - show the actual editor
  return <BlankEditor />
} 
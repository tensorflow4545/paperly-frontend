"use client"
import Head from "next/head"
import React from "react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { FileText, Edit3, Download, Users, Calendar, DollarSign, CreditCard, Shield, BarChart3, Briefcase, Palette, Wrench, UserCheck } from "lucide-react"
import Navbar from "../../components/LandingPage/Navbar"
import Footer from "../../components/LandingPage/Footer"
import TemplatesPage from "@/components/ReciptPage/Templates"



export default function CodePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const handleBackToHome = () => {
    router.push("/")
  }

  // Auto-rotate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      title: "Choose Template",
      description: "Select from our professionally designed invoice templates tailored for different business types",
      icon: FileText,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Fill Details",
      description: "Add your business information, client details, services, and payment terms",
      icon: Edit3,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Download & Share",
      description: "Generate your invoice and share it directly with clients via email or download as PDF",
      icon: Download,
      color: "from-purple-500 to-violet-600"
    }
  ]

  return (
    <>
      <Navbar />
      <>
      <Head>
        <title>Invoice Template | Paprly</title>
        <meta
          name="description"
          content="Download professional invoice templates for free from Paprly. Simple, clean, and customizable for freelancers and businesses."
        />
        <link rel="canonical" href="https://paprly.in/template" />
      </Head>

        {/* Hero section */}
        <div className="w-full min-h-[300px] md:h-[362px] bg-[#FEFCE8] items-center justify-center flex px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-x-[130px] items-center lg:items-start">
            <div className="flex flex-col gap-4 w-full lg:w-[739px] max-w-full lg:h-[170px] text-center lg:text-left">
                             <h1 className="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight">
                 Generate Free Invoice
                 Online Templates
              </h1>
                             <h2 className="text-gray-600 text-base md:text-lg leading-relaxed">
                 Generate free invoices online with professionally designed templates tailored for freelancers, 
                 businesses, and consultants. Each template includes everything you need to create professional 
                 invoices — from client details to payment terms. Free invoice generator with no signup required.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button onClick={handleBackToHome} className="bg-white w-full sm:w-[156px] h-[45px] cursor-pointer hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-md  transition-all duration-200">Back to Home</button>
              <button onClick={() => router.push('/blank-editor')} className="bg-gray-600 w-full sm:w-[156px] h-[45px] cursor-pointer hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-md  transition-all duration-200">Blank Template</button>
            </div>
          </div>


        </div>

        <TemplatesPage/>

        {/* How It Works Section */}
        <div className="w-full bg-white py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Side - Text Content */}
              <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Create professional invoices in just three simple steps. Our streamlined process makes invoicing effortless and efficient.
                  </p>
                </div>

                {/* Steps List */}
                <div className="space-y-3 md:space-y-4">
                  {steps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg transition-all duration-300 ${
                        currentStep === index 
                          ? 'bg-gray-50 border border-gray-200 shadow-sm' 
                          : 'bg-white border border-gray-100'
                      }`}
                    >
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-base md:text-lg transition-all duration-300 flex-shrink-0 ${
                        currentStep === index 
                          ? 'bg-gray-400 text-white shadow-sm' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm md:text-base mb-1 transition-all duration-300 ${
                          currentStep === index ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {index + 1}. {step.title}
                        </h3>
                        <p className={`text-xs md:text-sm leading-relaxed transition-all duration-300 ${
                          currentStep === index ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Professional Video Frame */}
              <div className="relative order-1 lg:order-2">
                <div className="relative w-full h-[280px] sm:h-[320px] md:h-[350px] lg:h-[400px] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                  {/* Video-like interface with realistic elements */}
                  <div className="absolute inset-0 bg-white">
                    {/* Browser-like header */}
                    <div className="absolute top-0 left-0 right-0 h-5 sm:h-6 md:h-8 bg-gray-100 border-b border-gray-200 flex items-center px-2 md:px-3">
                      <div className="flex space-x-1 md:space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-red-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="bg-white rounded-md px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-xs text-gray-500 border border-gray-200">
                          paperly.in/template
                        </div>
                      </div>
                    </div>

                    {/* Main content area */}
                    <div className="absolute top-5 sm:top-6 md:top-8 left-0 right-0 bottom-0 p-2 sm:p-3 md:p-6">
                      {/* Animated content based on current step */}
                      <div className="h-full flex flex-col">
                        {/* Step indicator */}
                        <div className="flex items-center justify-between mb-2 sm:mb-4 md:mb-6">
                          <div className="flex space-x-1 md:space-x-2">
                            {[0, 1, 2].map((step) => (
                              <div
                                key={step}
                                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                                  currentStep === step 
                                    ? 'bg-gray-800 scale-125' 
                                    : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">Step {currentStep + 1} of 3</div>
                        </div>

                        {/* Main content - Dynamic based on step */}
                        <div className="flex-1">
                          {currentStep === 0 && (
                            <div className="h-full">
                                                             {/* Template Selection Interface */}
                               <div className="mb-2 sm:mb-3">
                                 <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">Choose Template</h3>
                                 <div className="grid grid-cols-2 gap-1 sm:gap-2">
                                   <div className="bg-blue-50 border border-blue-200 rounded-md p-1.5 sm:p-2 cursor-pointer hover:bg-blue-100 transition-colors">
                                     <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-md mb-1 flex items-center justify-center">
                                       <Users className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                     </div>
                                     <div className="text-xs text-gray-600">Freelancer</div>
                                   </div>
                                   <div className="bg-gray-50 border border-gray-200 rounded-md p-1.5 sm:p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                                     <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-500 rounded-md mb-1 flex items-center justify-center">
                                       <Briefcase className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                     </div>
                                     <div className="text-xs text-gray-600">Business</div>
                                   </div>
                                   <div className="bg-gray-50 border border-gray-200 rounded-md p-1.5 sm:p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                                     <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-500 rounded-md mb-1 flex items-center justify-center">
                                       <Wrench className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                     </div>
                                     <div className="text-xs text-gray-600">Service</div>
                                   </div>
                                   <div className="bg-gray-50 border border-gray-200 rounded-md p-1.5 sm:p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                                     <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-500 rounded-md mb-1 flex items-center justify-center">
                                       <UserCheck className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                     </div>
                                     <div className="text-xs text-gray-600">Consultant</div>
                                   </div>
                                 </div>
                               </div>
                              
                                                             {/* Preview Area */}
                               <div className="bg-gray-50 rounded-md p-2 sm:p-3 border border-gray-200">
                                 <div className="flex items-center justify-between mb-1 sm:mb-2">
                                   <div className="text-xs font-medium text-gray-700">INVOICE</div>
                                   <div className="text-xs text-gray-500">#INV-001</div>
                                 </div>
                                 <div className="space-y-1">
                                   <div className="h-1.5 sm:h-2 bg-gray-300 rounded w-3/4"></div>
                                   <div className="h-1.5 sm:h-2 bg-gray-300 rounded w-1/2"></div>
                                   <div className="h-1.5 sm:h-2 bg-gray-300 rounded w-2/3"></div>
                                 </div>
                               </div>
                            </div>
                          )}

                          {currentStep === 1 && (
                                                         <div className="h-full">
                               {/* Form Interface */}
                               <div className="space-y-2 sm:space-y-3">
                                 <div>
                                   <label className="block text-xs font-medium text-gray-700 mb-1">Business Name</label>
                                   <div className="h-5 sm:h-6 bg-gray-100 rounded border border-gray-200 px-2 flex items-center">
                                     <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                     <div className="ml-2 text-xs text-gray-600">Acme Design Studio</div>
                                   </div>
                                 </div>
                                 
                                 <div>
                                   <label className="block text-xs font-medium text-gray-700 mb-1">Client Email</label>
                                   <div className="h-5 sm:h-6 bg-gray-100 rounded border border-gray-200 px-2 flex items-center">
                                     <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                                     <div className="ml-2 text-xs text-gray-600">demo@pay.com</div>
                                   </div>
                                 </div>
                                 
                                 <div>
                                   <label className="block text-xs font-medium text-gray-700 mb-1">Services</label>
                                   <div className="space-y-1">
                                     <div className="flex justify-between items-center">
                                       <div className="text-xs text-gray-600">Web Design</div>
                                       <div className="text-xs text-gray-600">$500</div>
                                     </div>
                                     <div className="flex justify-between items-center">
                                       <div className="text-xs text-gray-600">Logo Design</div>
                                       <div className="text-xs text-gray-600">$200</div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </div>
                          )}

                          {currentStep === 2 && (
                                                         <div className="h-full">
                               {/* Download/Share Interface */}
                               <div className="space-y-2 sm:space-y-3">
                                 <div className="bg-green-50 border border-green-200 rounded-md p-2 sm:p-3">
                                   <div className="flex items-center justify-between">
                                     <div className="text-xs font-medium text-green-800">Invoice Generated!</div>
                                     <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center">
                                       <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                     </div>
                                   </div>
                                 </div>
                                 
                                 <div className="space-y-1.5 sm:space-y-2">
                                   <button className="w-full h-6 sm:h-8 bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center">
                                     <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                     Download PDF
                                   </button>
                                   <button className="w-full h-6 sm:h-8 bg-gray-500 text-white text-xs font-medium rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center">
                                     <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                     Send via Email
                                   </button>
                                 </div>
                                 
                                 <div className="bg-gray-50 rounded-md p-1.5 sm:p-2">
                                   <div className="text-xs text-gray-600 mb-1">Share Link</div>
                                   <div className="h-4 sm:h-5 bg-white border border-gray-200 rounded px-2 flex items-center">
                                     <div className="text-xs text-gray-400">paperly.in/inv/abc123</div>
                                   </div>
                                 </div>
                               </div>
                             </div>
                          )}
                        </div>

                                                 {/* Bottom toolbar */}
                         <div className="flex justify-between items-center pt-2 sm:pt-3 md:pt-4 border-t border-gray-100">
                           <div className="flex space-x-1 md:space-x-2">
                             <div className="w-4 h-3 sm:w-6 sm:h-4 md:w-8 md:h-6 bg-gray-200 rounded flex items-center justify-center">
                               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-400 rounded-sm"></div>
                             </div>
                             <div className="w-4 h-3 sm:w-6 sm:h-4 md:w-8 md:h-6 bg-gray-200 rounded flex items-center justify-center">
                               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-400 rounded-sm"></div>
                             </div>
                           </div>
                           <div className="text-xs text-gray-400">Ready</div>
                         </div>
                      </div>
                    </div>

                    {/* Professional interface elements */}
                    <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-green-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
                    
                    {/* Animated cursor */}
                    <div className="absolute top-1/2 left-1/3 w-0.5 h-4 bg-blue-500 animate-pulse opacity-80"></div>
                    
                    {/* Subtle loading animation */}
                    <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle professional border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded-xl blur opacity-5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* what each template cover section */}

        <div className="w-full bg-[#F9FAFB] py-8 md:py-16">
             {/* main div container  */}
          <div className="max-w-6xl mx-auto px-4">

            <div className="items-center justify-center flex flex-col gap-4 mb-8 md:mb-12 text-center">
              <span className="text-black text-2xl md:text-3xl font-semibold">What Each Template Covers</span>
              <p className="w-full max-w-[650px] text-center text-base md:text-lg text-gray-600">Every template includes all the essential fields you need for professional 
              invoicing, with xsart suggestions and AI-powered features</p>
            </div>
           
           {/* grid div */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

              {/* Client and Freelancer Info */}
              <div className="bg-transparent p-4 md:p-6 rounded-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg text-center flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Client and Freelancer Info</h3>
                <p className="text-gray-600 text-xs md:text-xs">Complete contact details, addresses, phone numbers, and professional information for both parties</p>
              </div>

              {/* Invoice ID and Date */}
              <div className="bg-transparent p-4 md:p-6 rounded-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Invoice ID and Date</h3>
                <p className="text-gray-600 text-xs md:text-xs">Unique invoice numbers, issue dates, payment due dates, and project timelines</p>
              </div>

              {/* Itemized Services with Rates */}
              <div className="bg-transparent p-4 md:p-6 rounded-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Itemized Services with Rates</h3>
                <p className="text-gray-600 text-xs md:text-xs">Detailed service descriptions, quantities, hourly rates, milestone tracking, and totals</p>
              </div>

              {/* Taxes & Discounts */}
              <div className="bg-transparent p-4 md:p-6 rounded-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Taxes & Discounts</h3>
                <p className="text-gray-600 text-xs md:text-xs">Flexible tax calculations, VAT support, discount applications, and multi-currency options</p>
              </div>

              {/* Payment Terms and Notes */}
              <div className="bg-transparent p-4 md:p-6 rounded-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Payment Terms and Notes</h3>
                <p className="text-gray-600 text-xs md:text-xs">Clear payment instructions, bank details, UPI/QR codes, and custom terms</p>
              </div>

              {/* Smart Suggestions */}
              <div className="bg-transparent p-4 md:p-6 rounded-lg text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Smart Suggestions</h3>
                <p className="text-gray-600 text-xs md:text-xs">AI-powered field suggestions, auto-formatting, and smart descriptions for faster invoicing</p>
              </div>

            </div>

          </div>


        </div>

        {/* bottom section */}

        {/* main div */}
        <div className="w-full items-center justify-center flex min-h-[200px] md:h-[289px] bg-gray-600 px-4 py-8 md:py-0">
          {/* main section of center */}
          <div className="flex flex-col gap-6 md:gap-4 items-center justify-center text-center max-w-md mx-auto">
            <div className="space-y-3 md:space-y-2">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
              Ready to create your first invoice?
            </h1>
            <span className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed">Your perfect invoice is just a click away. Choose a template or start from scratch.</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button className="bg-white w-full sm:w-auto h-[45px] sm:h-[60px] hover:bg-transparent hover:border-1 hover:border-white hover:rounded-md hover:text-white text-gray-700 cursor-pointer font-semibold px-6 py-1 rounded-md transition-all duration-200">Start With Blank Document</button>
              <button className="bg-transparent border border-white hover:bg-white hover:text-gray-600 text-white cursor-pointer font-semibold px-6 py-1 rounded-md transition-all duration-200 w-full sm:w-auto h-[45px] sm:h-[60px]">Create a custom Template</button>
            </div>
          
          </div>

        </div>




      </>




      <Footer />
    </>
  );
}

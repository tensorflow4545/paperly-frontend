"use client"

import { useRouter } from "next/navigation"
import Navbar from "../../components/LandingPage/Navbar"
import Footer from "../../components/LandingPage/Footer"
import TemplatesPage from "@/components/ReciptPage/Templates"



export default function CodePage() {
  const router = useRouter()

  const handleBackToHome = () => {
    router.push("/")
  }
  return (
    <>
      <Navbar />
      <>

        {/* Hero section */}
        <div className="w-full h-[362px] bg-[#FEFCE8] items-center justify-center flex">
          <div className="flex flex-row gap-x-[130px]">
            <div className="flex flex-col gap-4 w-[739px] h-[170px]">
              <h1 className="font-medium text-5xl tracking-tight text-gray-900 leading-tight">
                Choose Your
                Invoice Style
              </h1>
              <h2 className="text-gray-600 text-lg leading-relaxed">
                Pick a professionally designed template tailored for freelancers and xsall
                businesses. Each template is crafted to include everything you need to invoice
                like a pro — from client details to payment terms.
              </h2>
            </div>
            <div className="flex flex-row gap-4">
              <button onClick={handleBackToHome} className="bg-white w-[156px] h-[45px] cursor-pointer hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-md  transition-all duration-200">Back to Home</button>
              <button className="bg-gray-600 w-[156px] h-[45px] cursor-pointer hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-md  transition-all duration-200">Generate Invoice</button>
            </div>
          </div>


        </div>

        <TemplatesPage/>


        {/* what each template cover section */}

        <div className="w-full bg-[#F9FAFB] py-16">
             {/* main div container  */}
          <div className="max-w-6xl mx-auto px-4">

            <div className="items-center justify-center flex flex-col gap-4 mb-12">
              <span className="text-black text-3xl font-semibold">What Each Template Covers</span>
              <p className="w-[650px] text-center text-lg text-gray-600">Every template includes all the essential fields you need for professional 
              invoicing, with xsart suggestions and AI-powered features</p>
            </div>
           
           {/* grid div */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Client and Freelancer Info */}
              <div className="bg-transparent p-6 rounded-lg text-center  ">
                <div className="w-12 h-12 bg-blue-100 rounded-lg text-center flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Client and Freelancer Info</h3>
                <p className="text-gray-600 text-xs">Complete contact details, addresses, phone numbers, and professional information for both parties</p>
              </div>

              {/* Invoice ID and Date */}
              <div className="bg-transparent p-6 rounded-lg text-center  ">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Invoice ID and Date</h3>
                <p className="text-gray-600 text-xs">Unique invoice numbers, issue dates, payment due dates, and project timelines</p>
              </div>

              {/* Itemized Services with Rates */}
              <div className="bg-transparent p-6 rounded-lg text-center  ">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Itemized Services with Rates</h3>
                <p className="text-gray-600 text-xs">Detailed service descriptions, quantities, hourly rates, milestone tracking, and totals</p>
              </div>

              {/* Taxes & Discounts */}
              <div className="bg-transparent p-6 rounded-lg text-center  ">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Taxes & Discounts</h3>
                <p className="text-gray-600 text-xs">Flexible tax calculations, VAT support, discount applications, and multi-currency options</p>
              </div>

              {/* Payment Terms and Notes */}
              <div className="bg-transparent p-6 rounded-lg text-center  ">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Terms and Notes</h3>
                <p className="text-gray-600 text-xs">Clear payment instructions, bank details, UPI/QR codes, and custom terms</p>
              </div>

              {/* xsart Suggestions */}
              <div className="bg-transparent p-6 rounded-lg text-center  ">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">xsart Suggestions</h3>
                <p className="text-gray-600 text-xs">AI-powered field suggestions, auto-formatting, and xsart descriptions for faster invoicing</p>
              </div>

            </div>

          </div>


        </div>

        {/* bottom section */}

        {/* main div */}
        <div className="w-full items-center justify-center flex h-[289px] bg-gray-600">
          {/* main section of center */}
          <div className="flex flex-col gap-4 items-center justify-center">
            <div>
            <h1 className=" text-white text-4xl font-medium">
              Ready to create your first invoice?
            </h1>
            <span className="text-gray-200 text-lg">Your perfect invoice is just a click away. Choose a template or start from scratch.</span>
            </div>

            <div className="flex flex-row gap-4 ">
              <button className="bg-white w-auto h-[50px] hover:bg-transparent hover:border-1 hover:border-white hover:rounded-md hover:text-white  text-gray-700 cursor-pointer  font-semibold px-4 py-2 rounded-md  transition-all duration-200">Start With Blank Document</button>
              <button className="bg-background border-1 border-white hover:bg-white hover:text-gray-600 hover:border-0 rouded-md w-auto h-[50px] cursor-pointer  text-white font-semibold px-4 py-2 rounded-md  transition-all duration-200">Create a custom Template</button>
            </div>
          
          </div>

        </div>




      </>




      <Footer />
    </>
  );
}

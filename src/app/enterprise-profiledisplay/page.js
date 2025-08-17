"use client"

import { useState } from "react";
import Navbar from "@/components/enterprise-components/enterprise-navbar";
import Footer from "@/components/enterprise-components/enterprise-footer";
import Sidebar from "@/components/enterprise-components/sidebar";

export default function ProfilePage() {
  const [activeNavItem, setActiveNavItem] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "Aditya Guvi",
    email: "aditya@gmail.com",
    userId: "505508",
    companyType: "Technology",
    industry: "Healthcare",
    gstinTaxId: "",
    registeredAddress: "",
    phone: "",
    website: "",
    businessName: "",
    businessPhone: "",
    businessWebsite: "",
    address: "",
    currency: "USD ($)",
    paymentLink: "",
    language: "English",
    timezone: "UTC-05:00 - Eastern Time (US & Canada)",
    downloadingAds: true,
    promotionalEmail: false,
    referralCode: "",
    defaultCurrency: "USD ($)",
    paymentCycle: "Weekly",
    preferredLanguage: "Hindi",
    onboardingKit: true,
    timestampProof: false,
    defaultSignatureStyle: "Modern Signature",
  })



  const handleNavItemClick = (item) => {
    setActiveNavItem(item)
    setSidebarOpen(false) // Close sidebar on mobile after selection
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex relative">
        <Sidebar
          activeNavItem={activeNavItem}
          onNavItemClick={handleNavItemClick}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="w-full bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] flex-1 lg:ml-0">
          {/* Header */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pt-16 lg:pt-12">
            <div className="w-full p-4 sm:p-6 lg:p-10 rounded-[10px] bg-[#FFF3BBB0]">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Welcome back, Aditya Guvi!
              </h1>
              <p className="text-sm sm:text-base text-gray-700 mb-4 lg:mb-6">
                Update your company profile to unlock full Paprly features.
              </p>
              <button className="bg-[#D4AF37] hover:bg-[#B8941F] text-gray-900 font-medium px-4 sm:px-6 py-2 rounded-md transition-colors text-sm sm:text-base">
                Explore Paprly Studio
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-4 sm:px-6 lg:px-8 pb-20">
            <div className="w-full space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Basic Information</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                     <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                     <input
                       type="text"
                       value="Aditya Guvi"
                       readOnly
                       className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                     <div className="relative">
                       <input
                         type="email"
                         value="aditya@gmail.com"
                         readOnly
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default pr-10"
                       />
                       <svg
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                         />
                       </svg>
                     </div>
                   </div>
                </div>

                                 <div className="mb-6 sm:mb-8">
                   <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                   <div className="relative max-w-full sm:max-w-md">
                     <input
                       type="text"
                       value="505508"
                       readOnly
                       className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default pr-10"
                     />
                     <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                       #
                     </span>
                   </div>
                 </div>

                
              </div>

              {/* Business Details */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Business Details</h2>

                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
                     <div className="relative">
                       <input
                         type="text"
                         value="Technology"
                         readOnly
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default pr-10"
                       />
                       <svg
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8"
                         />
                       </svg>
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                     <div className="relative">
                       <input
                         type="text"
                         value="Healthcare"
                         readOnly
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default pr-10"
                       />
                       <svg
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                         />
                       </svg>
                     </div>
                   </div>
                 </div>

                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">GSTIN (Tax ID)</label>
                     <input
                       type="text"
                       value={formData.gstinTaxId || ""}
                       readOnly
                       className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Registered Address</label>
                     <input
                       type="text"
                       value={formData.registeredAddress || ""}
                       readOnly
                       className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default"
                     />
                   </div>
                 </div>
              </div>

              {/* Team & Preferences */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Team & Preferences</h2>

                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                     <div className="relative">
                       <input
                         type="text"
                         value={formData.defaultCurrency || ""}
                         readOnly
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default pr-10"
                       />
                       <svg
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                         />
                       </svg>
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Payment Cycle</label>
                     <div className="relative">
                       <input
                         type="text"
                         value={formData.paymentCycle || ""}
                         readOnly
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default pr-10"
                       />
                       <svg
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                         />
                       </svg>
                     </div>
                   </div>
                 </div>

                                 <div className="max-w-full sm:max-w-md">
                   <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                   <div className="relative">
                     <input
                       type="text"
                       value={formData.preferredLanguage || ""}
                       readOnly
                       className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default pr-10"
                     />
                     <svg
                       className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         strokeWidth={2}
                         d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                       />
                     </svg>
                   </div>
                 </div>
              </div>

              {/* Enterprise Suite Settings */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Enterprise Suite Settings
                </h2>

                <div className="space-y-4 sm:space-y-6">
                                     <div className="flex items-center justify-between">
                     <div>
                       <h3 className="text-sm font-medium text-gray-900">Onboarding Kit</h3>
                     </div>
                     <div
                       className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                         formData.onboardingKit ? "bg-yellow-400" : "bg-gray-200"
                       }`}
                     >
                       <span
                         className={`inline-block h-4 w-4 transform rounded-full bg-white ${
                           formData.onboardingKit ? "translate-x-6" : "translate-x-1"
                         }`}
                       />
                     </div>
                   </div>

                   <div className="flex items-center justify-between">
                     <div>
                       <h3 className="text-sm font-medium text-gray-900">Timestamp Proof</h3>
                     </div>
                     <div
                       className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                         formData.timestampProof ? "bg-yellow-400" : "bg-gray-200"
                       }`}
                     >
                       <span
                         className={`inline-block h-4 w-4 transform rounded-full bg-white ${
                           formData.timestampProof ? "translate-x-6" : "translate-x-1"
                         }`}
                       />
                     </div>
                   </div>

                                     <div className="max-w-full sm:max-w-md">
                     <label className="block text-sm font-medium text-gray-700 mb-2">Default Signature Style</label>
                     <div className="relative">
                       <input
                         type="text"
                         value={formData.defaultSignatureStyle || ""}
                         readOnly
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-default pr-10"
                       />
                       <svg
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                         />
                       </svg>
                     </div>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { X, Globe, Upload, FileText, Shield, BarChart3, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function PhaseTwoModal({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const features = [
    {
      icon: Users,
      title: "Save and Manage Invoices",
      description: "Create, save, and organize all your invoices in one secure place",
    },
    {
      icon: BarChart3,
      title: "Personal Dashboard",
      description: "Track your invoicing activity and business metrics at a glance",
    },
    {
      icon: FileText,
      title: "NDA Creation for Employees",
      description: "Generate professional non-disclosure agreements for your team",
    },
    {
      icon: Upload,
      title: "Offer Letter Making",
      description: "Create customized offer letters with your company branding",
    },
    {
      icon: Shield,
      title: "Digital Signature",
      description: "Sign documents electronically with legally binding signatures",
    },
    {
      icon: Globe,
      title: "Official Document Management",
      description: "Share documents securely, get signed proof, and store everything safely",
    },
  ]

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Subtle Backdrop */}
      <div
        className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

             {/* Sleek Modal Content */}
       <div
         className={`relative rounded-xl shadow-lg max-w-3xl w-full max-h-[75vh] overflow-hidden transform transition-all duration-300 ${
           isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
         }`}
         style={{ backgroundColor: '#e9f0ff' }}
       >
                 {/* Clean Header */}
         <div className="bg-gray-100 border-b border-gray-200 px-6 py-4">
           <div className="flex items-center justify-between">
             <div>
               <span className="relative inline-block px-3 py-1">
                  <span className="relative z-10">Phase 2 Features <br/>
                  <span className="text-gray-700 text-xs sm:text-sm mt-0.5">Coming soon to enhance your experience</span>
                  </span>
             
                  <motion.div 
                    className="absolute inset-0 bg-yellow-400 rounded-lg -rotate-1 transform"
                    initial={{ scaleX: 0, scaleY: 0 }}
                    animate={{ scaleX: 1, scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    style={{
                      filter: "url('#rough-paint')",
                      zIndex: 1,
                    }}
                  />
                
                  <motion.div 
                    className="absolute inset-0 bg-yellow-300 rounded-lg rotate-1 transform"
                    initial={{ scaleX: 0, scaleY: 0 }}
                    animate={{ scaleX: 1, scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    style={{
                      filter: "url('#rough-paint')",
                      zIndex: 0,
                    }}
                  />
                </span>
             </div>
             <button
               onClick={onClose}
               className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors duration-200"
               aria-label="Close modal"
             >
               <X className="w-4 h-4 text-gray-500" />
             </button>
           </div>
         </div>

        {/* Features Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-4 h-4" style={{ color: '#e3b854' }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { X, Sparkles, Globe, Upload, FileText, Shield, BarChart3, Users, Calendar, List, DollarSign, CreditCard, Zap } from "lucide-react"

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
      title: "Save & Edit Invoices",
      description: "Create, save and modify your invoices anytime with our intuitive editor",
      color: "from-yellow-100 to-amber-50",
    },
    {
      icon: Globe,
      title: "Shareable Links for Clients",
      description: "Send secure, branded links directly to your clients for instant access",
      color: "from-blue-50 to-cyan-50",
    },
    {
      icon: Upload,
      title: "Upload Company Logo",
      description: "Brand your invoices professionally with your company logo and colors",
      color: "from-purple-50 to-pink-50",
    },
    {
      icon: FileText,
      title: "GST & Tax Configurations",
      description: "Automated tax calculations with full compliance and reporting",
      color: "from-green-50 to-emerald-50",
    },
    {
      icon: Shield,
      title: "End-to-End PDF Encryption",
      description: "Bank-grade security with encrypted documents and secure sharing",
      color: "from-red-50 to-rose-50",
    },
    {
      icon: BarChart3,
      title: "Dashboard Analytics (Beta)",
      description: "Comprehensive insights into your invoicing performance and trends",
      color: "from-indigo-50 to-blue-50",
    },
  ]

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced Backdrop */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Professional Modal Content */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        {/* Professional Header */}
        <div className="relative bg-gradient-to-r from-yellow-400/10 via-yellow-300/10 to-amber-300/10 border-b border-yellow-200/20 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Phase 2 Features</h2>
              <p className="text-gray-600 text-sm mt-1">Coming soon to enhance your invoicing experience</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-200 group"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${feature.color} border border-gray-100/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
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

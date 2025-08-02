"use client"

import { motion } from "framer-motion"
import InvoicePreview from "./Recipt"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* SVG Filter for rough paint effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="rough-paint">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G"/>
            <feGaussianBlur stdDeviation="0.5"/>
          </filter>
        </defs>
      </svg>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-2xl text-sm font-medium border-2 border-gray-200 shadow-sm"
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                borderColor: "#9CA3AF",
              }}
            >
              <span className="text-yellow-500 text-lg">✨</span>
              <span className="font-semibold">No Signup Required</span>
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Generate Free Invoice{" "}
                <motion.span 
                  className="text-gray-800"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Online
                </motion.span>{" "}
                in{" "}
                <motion.span 
                  className="text-gray-700"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Seconds.
                </motion.span>
              </motion.h1>
              <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="relative inline-block px-3 py-1">
                  <span className="relative z-10">No Login Required.</span>
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
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Generate free invoices online instantly. Create professional invoices for freelancers, businesses, and consultants. 
              No signup required. Free invoice generator with templates, GST compliance, and instant sharing.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button 
                className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 text-lg font-medium rounded-lg transition-colors duration-200"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(55, 65, 81, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Create Invoice
                <motion.svg 
                  className="ml-2 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
              <motion.button 
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "#6B7280",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div 
                className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-lg border border-green-200"
                whileHover={{ 
                  scale: 1.05, 
                  x: 5,
                  boxShadow: "0 8px 25px rgba(34, 197, 94, 0.15)",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  duration: 0.6, 
                  delay: 1 
                }}
              >
                <motion.div className="relative">
                  <motion.svg 
                    className="w-6 h-6 text-green-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                  <motion.div 
                    className="absolute inset-0 bg-green-400 rounded-full opacity-20"
                    animate={{ scale: [0, 1.5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  />
                </motion.div>
                <span className="text-gray-700 font-semibold">Free to Use</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200"
                whileHover={{ 
                  scale: 1.05, 
                  x: 5,
                  boxShadow: "0 8px 25px rgba(107, 114, 128, 0.15)",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  duration: 0.6, 
                  delay: 1.2 
                }}
              >
                <motion.div className="relative">
                  <motion.svg 
                    className="w-6 h-6 text-gray-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </motion.svg>
                  <motion.div 
                    className="absolute inset-0 bg-gray-400 rounded-full opacity-20"
                    animate={{ scale: [0, 1.5, 0] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.8 }}
                  />
                </motion.div>
                <span className="text-gray-700 font-semibold">Works on Mobile</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 px-4 py-2 bg-yellow-50 rounded-lg border border-yellow-200"
                whileHover={{ 
                  scale: 1.05, 
                  x: 5,
                  boxShadow: "0 8px 25px rgba(245, 158, 11, 0.15)",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  duration: 0.6, 
                  delay: 1.4 
                }}
              >
                <motion.div className="relative">
                  <motion.svg 
                    className="w-6 h-6 text-yellow-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </motion.svg>
                  <motion.div 
                    className="absolute inset-0 bg-yellow-400 rounded-full opacity-20"
                    animate={{ scale: [0, 1.5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.2 }}
                  />
                </motion.div>
                <span className="text-gray-700 font-semibold">Instant Download</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Invoice Preview */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div 
              className="transform rotate-3 hover:rotate-0 transition-transform duration-300"
              whileHover={{ 
                scale: 1.05,
                rotate: 0,
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <InvoicePreview />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

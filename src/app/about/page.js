"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

export default function AboutPage() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const animatedTexts = [
    "Creating Invoices",
    "NDA Creation", 
    "Offer Letters",
    "Digital Signing",
    "Document Sharing",
    "Much More..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-white text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-sm font-medium border-2 border-gray-200 shadow-sm mb-6"
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">About Paperly</span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl  font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Simplifying{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTextIndex}
                    className="text-yellow-500 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {animatedTexts[currentTextIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Say goodbye to complicated tools and costly subscriptions. Paperly lets freelancers, 
              small teams, and startups create clean, professional documents in just a few clicks — 
              totally free and ad-free.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div 
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                y: -5,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">No Logins Required</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                No fuss. Just generate, download or share your documents in seconds without any account creation.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                y: -5,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Works Everywhere</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Works smoothly on desktop, tablet, or mobile. Access your documents from any device, anywhere.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                y: -5,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Secure & Simple</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Secure, simple, and designed for real humans. Your data stays private and protected.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                y: -5,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">One-Click Sharing</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                One click share to your Clients/Employee and add needed details instantly.
              </p>
            </motion.div>
          </motion.div>

          {/* Enhanced Features Section */}
          <motion.div 
            className="bg-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-200 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Perfect for Freelancers & Clients
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We&apos;re building the smartest, simplest way to handle work documents — all in one place.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Current Features
                </h3>
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-start gap-3 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium">Professional Invoice Creation</span>
                      <p className="text-sm text-gray-600 mt-1">Create beautiful, customizable invoices with your branding</p>
                    </div>
                  </motion.li>
                  <motion.li 
                    className="flex items-start gap-3 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium">One-Click Sharing</span>
                      <p className="text-sm text-gray-600 mt-1">Share your documents with clients instantly, completely free</p>
                    </div>
                  </motion.li>
                  <motion.li 
                    className="flex items-start gap-3 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium">Fast & Secure Processing</span>
                      <p className="text-sm text-gray-600 mt-1">Lightning-fast document generation with enterprise-grade security</p>
                    </div>
                  </motion.li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">NDA & Offer Letter creation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">Digital document signing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">Team document management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">Freelance–Client workflows</span>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phase 1 Focus:</span> Freelancers and their clients
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile-First Benefits Section */}
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200"
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile-First Design</h3>
              <p className="text-sm text-gray-600">Optimized for touch interactions and mobile workflows</p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200"
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">Generate and share documents in seconds, not minutes</p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-2xl border border-purple-200 sm:col-span-2 lg:col-span-1"
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enterprise Security</h3>
              <p className="text-sm text-gray-600">Bank-level security with end-to-end encryption</p>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Try it. Share it. Tell us what you&apos;d love to see next!
            </p>
            <motion.button 
              className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(55, 65, 81, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/blank-editor'}
            >
              Create Your First Document
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}

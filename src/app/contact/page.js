"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

export default function ContactPage() {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">Get in Touch</span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let&apos;s Build Something{" "}
              <span className="text-yellow-500 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have questions about Paperly? Want to share feedback? Looking to collaborate? 
              We&apos;d love to hear from you. Our team is here to help you succeed.
            </motion.p>
          </motion.div>

          {/* Contact Methods Grid */}
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
                         {/* Email Contact */}
             <motion.div 
               className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
               whileHover={{ 
                 scale: 1.02,
                 y: -5,
               }}
               transition={{ type: "spring", stiffness: 300 }}
             >
               <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                 <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
               </div>
               <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Us</h3>
               <p className="text-gray-600 mb-4 leading-relaxed">
                 Send us an email and we&apos;ll get back to you within 24 hours.
               </p>
               <a 
                 href="mailto:home@paprly.in"
                 className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
               >
                 home@paprly.in
                 <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                 </svg>
               </a>
             </motion.div>

             {/* Phone Contact */}
             <motion.div 
               className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
               whileHover={{ 
                 scale: 1.02,
                 y: -5,
               }}
               transition={{ type: "spring", stiffness: 300 }}
             >
               <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                 <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                 </svg>
               </div>
               <h3 className="text-xl font-semibold text-gray-900 mb-3">Call Us</h3>
               <p className="text-gray-600 mb-4 leading-relaxed">
                 Prefer to talk? Give us a call during business hours.
               </p>
               <a 
                 href="tel:+917317202906"
                 className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
               >
                 +91 7317202906
                 <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                 </svg>
               </a>
             </motion.div>

             {/* LinkedIn Contact */}
             <motion.div 
               className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
               whileHover={{ 
                 scale: 1.02,
                 y: -5,
               }}
               transition={{ type: "spring", stiffness: 300 }}
             >
               <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                 <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                 </svg>
               </div>
               <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect on LinkedIn</h3>
               <p className="text-gray-600 mb-4 leading-relaxed">
                 Follow us for updates, insights, and professional networking.
               </p>
               <a 
                 href="https://www.linkedin.com/company/wwwpaprlyin"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
               >
                 Visit LinkedIn
                 <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                 </svg>
               </a>
             </motion.div>
          </motion.div>

          {/* Additional Information Section */}
          <motion.div 
            className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-200 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Paperly?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We&apos;re committed to making document creation simple, secure, and accessible for everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We believe that professional document creation should be accessible to everyone. 
                  No matter the size of your business or the complexity of your needs, 
                  you deserve tools that work for you, not against you.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our focus is on freelancers and small businesses who need reliable, 
                  professional tools without the complexity and cost of enterprise solutions.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">Email Support</span>
                    <span className="text-gray-900 font-medium">Within 24 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">Phone Support</span>
                    <span className="text-gray-900 font-medium">Business Hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">Feature Requests</span>
                    <span className="text-gray-900 font-medium">We listen & act</span>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Business Hours:</span> Monday - Friday, 9 AM - 6 PM IST
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Try Paperly today and experience the difference. No signup required, completely free.
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

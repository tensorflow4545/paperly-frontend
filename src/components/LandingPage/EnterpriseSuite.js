"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function EnterpriseSuite() {
  const router = useRouter()

  const handleExploreEnterprise = () => {
    router.push('/enterprise-home')
  }

  return (
         <div className="bg-white py-12 lg:py-20">
       <div className="max-w-7xl mx-auto px-4 lg:px-8">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
           {/* Left side - Content */}
           <div className="space-y-8 lg:pr-8">
            {/* Main heading */}
                                      <motion.h2 
               className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
             >
               <span className="whitespace-nowrap ">
                 Meet{" "}
                 <motion.span 
                   className="text-gray-700"
                   whileHover={{ scale: 1.02 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 >
                   Paprly Enterprise Suite
                 </motion.span>{" "}
                 — Built for
               </span>{" "}
               <motion.span 
                 className="relative inline-block px-3 py-1 mt-3 sm:mt-4"
                 whileHover={{ scale: 1.02 }}
                 transition={{ type: "spring", stiffness: 300 }}
               >
                 <span className="relative z-10 text-gray-600 ">Founders Who Move Fast</span>
                 <motion.div 
                   className="absolute inset-0 bg-yellow-400 rounded-lg -rotate-1 transform"
                   initial={{ scaleX: 0, scaleY: 0 }}
                   whileInView={{ scaleX: 1, scaleY: 1 }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                   viewport={{ once: true }}
                 />
                 <motion.div 
                   className="absolute inset-0 bg-yellow-300 rounded-lg rotate-1 transform"
                   initial={{ scaleX: 0, scaleY: 0 }}
                   whileInView={{ scaleX: 1, scaleY: 1 }}
                   transition={{ duration: 0.8, delay: 0.3 }}
                   viewport={{ once: true }}
                 />
               </motion.span>
             </motion.h2>

            {/* Problem Questions */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
                             <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700 mb-4">Are you a founder juggling endless onboarding docs?</h3>
              <div className="space-y-3">
                {[
                  "Struggling to get NDAs, offer letters, and contracts signed on time?",
                  "Wasting hours sending, tracking, and organizing documents?",
                  "Tired of chasing payments and receipts across tools?"
                ].map((question, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-3"></div>
                                         <p className="text-gray-600 text-sm sm:text-base lg:text-lg">{question}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Value Pitch */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
                             <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700 mb-4">
                 With Paprly Enterprise Suite, simplify your entire workflow:
               </h3>
              <div className="space-y-3">
                {[
                  "Create, sign & send documents instantly.",
                  "Track every signature without messy emails.",
                  "Auto-generate NDAs, offer letters & more with AI.",
                  "Manage invoices & payments all in one place."
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                                         <p className="text-gray-600 text-sm sm:text-base lg:text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button 
                onClick={handleExploreEnterprise}
                                 className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base lg:text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(55, 65, 81, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">🔘</span>
                Explore Paprly Enterprise Suite
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
            </motion.div>
          </div>

                     {/* Right side - Professional Interactive Slider */}
           <motion.div 
             className="hidden lg:flex justify-center lg:justify-end"
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, delay: 0.3 }}
             viewport={{ once: true }}
           >
             <motion.div 
               className="relative w-[85%]  transform rotate-3"
               animate={{
                 y: [0, -2, 0],
               }}
               transition={{
                 y: {
                   duration: 4,
                   repeat: Number.POSITIVE_INFINITY,
                   ease: "easeInOut",
                 },
               }}
             >
               {/* Professional Container */}
               <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-200 relative overflow-hidden">
                 {/* Header */}
                 <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 flex items-center justify-center">
                       <img src="/final_logo.png" alt="Paprly" className="w-8 h-8 object-contain rounded-lg" />
                     </div>
                     <div>
                       <h4 className="font-semibold text-gray-800 text-base">Enterprise Suite</h4>
                       <p className="text-gray-500 text-sm">Interactive Demo</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-1">
                     <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                     <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                     <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                   </div>
                 </div>

                 {/* Professional Feature Cards */}
                 <div className="space-y-4">
                   {/* Feature Card 1: Onboarding */}
                   <motion.div 
                     className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.1 }}
                     viewport={{ once: true }}
                     whileHover={{ scale: 1.02 }}
                   >
                     <div className="flex items-start gap-4">
                       <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                         <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                         </svg>
                       </div>
                       <div className="flex-1">
                         <h3 className="text-lg font-semibold text-gray-800 mb-2">Onboard Smarter, Sign Faster</h3>
                         <p className="text-gray-600 text-sm leading-relaxed">
                           Generate onboarding documents with a few clicks, send for digital signatures, and track everything from one dashboard.
                         </p>
                       </div>
                     </div>
                   </motion.div>

                   {/* Feature Card 2: Payments */}
                   <motion.div 
                     className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.2 }}
                     viewport={{ once: true }}
                     whileHover={{ scale: 1.02 }}
                   >
                     <div className="flex items-start gap-4">
                       <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                         <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                         </svg>
                       </div>
                       <div className="flex-1">
                         <h3 className="text-lg font-semibold text-gray-800 mb-2">One Place for All Payments</h3>
                         <p className="text-gray-600 text-sm leading-relaxed">
                           Pay employees and freelancers from one place. Auto-generate invoices and keep all payment records secure.
                         </p>
                       </div>
                     </div>
                   </motion.div>

                   {/* Feature Card 3: Legal */}
                   <motion.div 
                     className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.3 }}
                     viewport={{ once: true }}
                     whileHover={{ scale: 1.02 }}
                   >
                     <div className="flex items-start gap-4">
                       <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                         <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                         </svg>
                       </div>
                       <div className="flex-1">
                         <h3 className="text-lg font-semibold text-gray-800 mb-2">Contracts That Hold Legal Power</h3>
                         <p className="text-gray-600 text-sm leading-relaxed">
                           Get certified digital signatures that are legally valid. Review, renew, and secure all contracts at one stop.
                         </p>
                       </div>
                     </div>
                   </motion.div>
                 </div>
               </div>
             </motion.div>
           </motion.div>
         </div>
       </div>
     </div>
   )
 }

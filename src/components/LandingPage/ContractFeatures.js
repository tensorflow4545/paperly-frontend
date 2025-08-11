"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { FileText, Edit3, Shield, CheckCircle, ArrowRight, Sparkles, Users, Clock, Star, Award, Zap } from "lucide-react"

export default function ContractFeatures() {
  const router = useRouter()

  const handleCreateFromScratch = () => {
    router.push('/contract-editor')
  }

  const handleBrowseTemplates = () => {
    router.push('/contracts')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const floatingVariants = {
    float: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const features = [
    {
      icon: FileText,
      title: "Multiple Templates",
      description: "Professional contract templates for freelancers, retainers, NDAs, and project work",
      gradient: "from-gray-400 to-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      iconColor: "text-gray-600"
    },
    {
      icon: Edit3,
      title: "Create from Scratch",
      description: "Build custom contracts tailored to your specific business needs and requirements",
      gradient: "from-yellow-300 to-yellow-400",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      icon: Shield,
      title: "Legally Sound",
      description: "All templates are crafted with legal compliance and professional standards in mind",
      gradient: "from-gray-400 to-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      iconColor: "text-gray-600"
    }
  ]

  const highlights = [
    "One-to-one contract customization",
    "Professional templates library",
    "Enterprise-grade security",
    "Instant contract generation"
  ]

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-15 blur-3xl"
          variants={floatingVariants}
          animate="float"
        />
        <motion.div
          className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-10 blur-3xl"
          variants={floatingVariants}
          animate="float"
          style={{ animationDelay: '1s' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-10 blur-2xl"
          variants={floatingVariants}
          animate="float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-gray-400 to-gray-500 p-2 sm:p-1.5 rounded-full"
              >
                <Sparkles className="w-4 h-4 sm:w-3 sm:h-3 text-white" />
              </motion.div>
              <span className="text-gray-600 font-medium text-xs sm:text-sm uppercase tracking-wider bg-gray-100 px-4 py-2 sm:px-3 sm:py-1 rounded-full">
                Contract Management
              </span>
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4 sm:mb-6 leading-tight px-4 sm:px-0"
            >
              Professional{" "}
              <motion.span
                className="text-gray-700 relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Contracts
                <motion.div
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.span>{" "}
              for Your Business
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              Create legally compliant contracts from multiple professional templates or build from scratch. 
              Streamline your client agreements with enterprise-level security and customization.
            </motion.p>
          </div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-4 sm:px-0"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className={`bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 ${feature.borderColor} border group relative overflow-hidden touch-manipulation`}
              >
                {/* Decorative corner element */}
                <div className={`absolute top-0 right-0 w-12 h-12 ${feature.bgColor} transform rotate-45 translate-x-6 -translate-y-6 opacity-60`}></div>
                
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-all duration-300 shadow-md relative z-10`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                
                <h3 className={`text-lg font-medium text-gray-800 mb-3 group-hover:${feature.iconColor} transition-colors duration-300`}>
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {feature.description}
                </p>
                
                {/* Subtle background pattern */}
                <div className={`absolute bottom-0 left-0 w-full h-2 ${feature.bgColor} opacity-50`}></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Preview Section */}
          <motion.div
            variants={itemVariants}
            className="bg-[#fefce8] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border border-yellow-200 mb-12 sm:mb-16 relative overflow-hidden mx-4 sm:mx-0"
          >
            {/* Decorative elements for the preview section */}
            <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-yellow-200 to-yellow-300"></div>
            <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-3 h-3 sm:w-5 sm:h-5 bg-gray-300 rounded-full opacity-40"></div>
            <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 h-2 sm:w-4 sm:h-4 bg-yellow-300 rounded-full opacity-30"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="order-2 lg:order-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-4">
                    <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-2 sm:p-1.5 rounded-lg flex-shrink-0">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium text-xs sm:text-sm bg-gray-100 px-3 py-1.5 sm:py-1 rounded-full">Contract Templates</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 mb-4 leading-tight">
                    Choose Your Perfect Template
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    From freelance agreements to NDAs, select from our professionally crafted templates 
                    designed for various business scenarios and legal requirements.
                  </p>
                </motion.div>

                {/* Highlights */}
                <div className="space-y-3 mb-8">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  <motion.button
                    onClick={handleBrowseTemplates}
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.10)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-500 text-white px-6 py-3 sm:py-4 rounded-lg font-medium hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-2 group w-full sm:w-auto touch-manipulation text-sm sm:text-base"
                  >
                    Browse Templates
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleCreateFromScratch}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 sm:py-4 border border-gray-400 text-gray-600 hover:border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto touch-manipulation text-sm sm:text-base"
                  >
                    Create from Scratch
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Right Preview */}
              <div className="relative order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-lg relative overflow-hidden"
                >
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-45 translate-x-6 -translate-y-6 opacity-60"></div>
                  {/* Contract Preview */}
                  <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 space-y-3 sm:space-y-4 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-1.5 rounded-lg flex-shrink-0">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-800 text-sm sm:text-base">Freelance Agreement</span>
                      </div>
                      <span className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full font-medium self-start sm:self-auto">Professional</span>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded p-0.5 flex-shrink-0">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 truncate">Client: [Company Name]</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded p-0.5 flex-shrink-0">
                          <Clock className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 truncate">Duration: Project-based</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded p-0.5 flex-shrink-0">
                          <Shield className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 truncate">Status: Ready to customize</span>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-700 mb-2 font-medium">Template includes:</div>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {["Scope of Work", "Payment Terms", "Timeline", "Signatures"].map((item, index) => (
                          <span key={index} className={`text-xs px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap ${
                            index % 2 === 0 
                              ? 'bg-gray-100 text-gray-700' 
                              : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full shadow-sm opacity-40"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.4, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-full shadow-sm opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center px-4 sm:px-0"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block"
            >
              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                Ready to streamline your contract process?{" "}
                <span className="text-gray-700 font-medium">Get started in minutes.</span>
              </p>
              <motion.button
                onClick={handleBrowseTemplates}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.10)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-400 transition-all duration-200 shadow-md w-full sm:w-auto touch-manipulation"
              >
                Explore Contract Templates
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

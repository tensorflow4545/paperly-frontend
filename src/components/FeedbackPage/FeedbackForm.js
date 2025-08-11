"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star, Send, MessageCircle, User, Mail, Lightbulb, CheckCircle, AlertCircle, ArrowRight, X } from "lucide-react"

export default function FeedbackForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "suggestion",
    rating: 0,
    message: ""
  })
  const [hoveredStar, setHoveredStar] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [errors, setErrors] = useState({})

 

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Please share your feedback"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide more detailed feedback (at least 10 characters)"
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please rate your experience"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://paperly-backend-five.vercel.app/api/take-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          feedback: formData.message.trim(),
          star: formData.rating
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Success - show modal and reset form
        setIsSubmitting(false)
        setShowSuccessModal(true)
        setFormData({
          name: "",
          email: "",
          feedbackType: "suggestion",
          rating: 0,
          message: ""
        })
      } else {
        // API returned an error
        setIsSubmitting(false)
        const errorMessage = data.error || 'Failed to submit feedback. Please try again.'
        setErrors({ submit: errorMessage })
      }
    } catch (error) {
      // Network error or other issues
      setIsSubmitting(false)
      console.error('Feedback submission error:', error)
      setErrors({ submit: 'Network error. Please check your connection and try again.' })
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
    // Clear submit error when user makes changes
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: "" }))
    }
  }

  const renderStars = () => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center justify-center sm:justify-start gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 rounded touch-manipulation p-1 ${
                star <= (hoveredStar || formData.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => handleInputChange("rating", star)}
            >
              <Star 
                className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7" 
                fill={star <= (hoveredStar || formData.rating) ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>
        <span className="text-center sm:text-left text-sm text-gray-600 font-medium">
          {formData.rating === 0 
            ? "Tap to rate your experience" 
            : `${formData.rating} star${formData.rating > 1 ? 's' : ''} - ${getRatingText(formData.rating)}`
          }
        </span>
      </div>
    )
  }

  const getRatingText = (rating) => {
    const texts = {
      1: "Poor",
      2: "Fair", 
      3: "Good",
      4: "Very Good",
      5: "Excellent"
    }
    return texts[rating] || ""
  }

  // Success Modal Component
  const SuccessModal = () => {
    if (!showSuccessModal) return null

    const handleExplore = () => {
      router.push('/')
    }

    const handleClose = () => {
      setShowSuccessModal(false)
    }

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      >
        <div 
          className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl relative transform"
          style={{ animation: 'slideUp 0.4s ease-out' }}
        >
          <div className="text-center">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 bg-[#FEFCE8] border-2 border-yellow-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-yellow-600" />
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Feedback Submitted!</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for sharing your thoughts. Your feedback helps us make Paprly better for everyone.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleExplore}
                className="w-full bg-[#FEFCE8] border-2 border-yellow-300 text-gray-800 font-semibold py-3 px-6 rounded-lg sm:rounded-xl hover:bg-yellow-100 hover:border-yellow-400 transition-all duration-200 flex items-center justify-center group touch-manipulation"
              >
                Explore Paprly
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleClose}
                className="w-full text-gray-500 hover:text-gray-700 py-3 px-6 rounded-lg transition-colors touch-manipulation"
              >
                Continue Here
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      <SuccessModal />
      <div className="w-full py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
      

        {/* Main Form */}
        <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 relative">
           <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
             {/* Loading Overlay */}
             {isSubmitting && (
               <div className="absolute inset-0 bg-white bg-opacity-95 backdrop-blur-sm flex items-center justify-center rounded-xl sm:rounded-2xl z-10">
                 <div className="text-center bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border border-gray-100 mx-4">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-yellow-300 border-t-yellow-600 rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
                   <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Submitting Feedback</h3>
                   <p className="text-gray-600 text-sm">Please wait while we process your feedback...</p>
                   <div className="mt-2 sm:mt-3 flex items-center justify-center">
                     <div className="flex space-x-1">
                       <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                       <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                       <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                     </div>
                   </div>
                 </div>
               </div>
             )}
            
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                  <User className="w-4 h-4 inline mr-2" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-3 sm:px-4 py-3 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-gray-900 placeholder-gray-500 text-base touch-manipulation ${
                    errors.name ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-3 sm:px-4 py-3 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-gray-900 placeholder-gray-500 text-base touch-manipulation ${
                    errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

           
                         {/* Star Rating */}
             <div>
               <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                 How would you rate your experience with Paprly?
               </label>
               <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                 {renderStars()}
                 {errors.rating && (
                   <p className="mt-2 text-sm text-red-600 flex items-center">
                     <AlertCircle className="w-4 h-4 mr-1" />
                     {errors.rating}
                   </p>
                 )}
               </div>
             </div>

                         {/* Message */}
             <div>
               <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                 <MessageCircle className="w-4 h-4 inline mr-2" />
                 Your Feedback
               </label>
               <textarea
                 value={formData.message}
                 onChange={(e) => handleInputChange("message", e.target.value)}
                 rows={5}
                 className={`w-full px-3 sm:px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-gray-900 placeholder-gray-500 resize-none text-base touch-manipulation ${
                   errors.message ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                 }`}
                 placeholder="Share your thoughts, suggestions, or feedback here. The more detailed, the better we can help!"
               />
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-2 sm:gap-0">
                 {errors.message ? (
                   <p className="text-sm text-red-600 flex items-center">
                     <AlertCircle className="w-4 h-4 mr-1" />
                     {errors.message}
                   </p>
                 ) : (
                   <p className="text-sm text-gray-500 text-right sm:text-left">
                     {formData.message.length}/500 characters
                   </p>
                 )}
               </div>
             </div>

                         {/* Submit Error Display */}
             {errors.submit && (
               <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
                 <p className="text-sm text-red-600 flex items-center">
                   <AlertCircle className="w-4 h-4 mr-2" />
                   {errors.submit}
                 </p>
               </div>
             )}

             {/* Submit Button */}
             <div className="flex flex-col gap-4 sm:gap-4 sm:flex-row sm:justify-between sm:items-center pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center sm:text-left">
                Your feedback helps us improve Paprly for everyone. Thank you for taking the time to share!
              </p>
              
              <button
                 type="submit"
                 disabled={isSubmitting}
                 className={`w-full sm:w-auto inline-flex items-center px-6 sm:px-8 py-3 sm:py-3 bg-[#FEFCE8] border-2 border-yellow-300 text-gray-800 font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-w-[160px] justify-center touch-manipulation ${
                   isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:bg-yellow-100 hover:border-yellow-400"
                 }`}
              >
                 {isSubmitting ? (
                   <>
                     <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin mr-2"></div>
                     Submitting...
                   </>
                 ) : (
                   <>
                     <Send className="w-5 h-5 mr-2" />
                     Send Feedback
                   </>
                 )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
           <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm">
             <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Quick Response</h3>
             <p className="text-gray-600 text-sm leading-relaxed">
               We typically respond to feedback within 24-48 hours. For urgent issues, 
               please reach out to us directly at{" "}
               <a href="mailto:home@paprly.in" className="text-blue-600 hover:underline font-medium hover:text-blue-800 transition-colors touch-manipulation">
                 home@paprly.in
               </a>
             </p>
           </div>
          
           <div className="bg-[#FEFCE8] p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-yellow-300">
             <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Feature Requests</h3>
             <p className="text-gray-700 text-sm leading-relaxed">
               Love suggesting new features? Join our community on{" "}
               <a href="#" className="text-gray-800 hover:underline font-medium hover:text-yellow-800 transition-colors touch-manipulation">
                 Discord
               </a>
               {" "}where you can vote on features, discuss ideas, and connect with other Paprly users.
             </p>
           </div>
        </div>
      </div>
    </div>
    </>
  )
}

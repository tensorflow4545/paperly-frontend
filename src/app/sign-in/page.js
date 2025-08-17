"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import PageSEO from "@/components/SEO/PageSEO"
import { useAuth } from "@/hooks/useAuth"
import { Borel } from "next/font/google"

const borel = Borel({
  subsets: ["latin"],
  weight: "400",
})



export default function LoginPage() {
  const { login } = useAuth()
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  })

  

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [redirectMessage, setRedirectMessage] = useState("")

  // Clear any cached form data on component mount
  useEffect(() => {
    setForm({
      email: "",
      password: "",
      remember: false,
    })
    setFormErrors({})
    console.log('Form state cleared on mount')
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    // Email validation
    if (!form.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email"
    }
    
    // Password validation
    if (!form.password) {
      errors.password = "Password is required"
    }
    
    setFormErrors(errors)
    console.log('Form validation errors:', errors)
    console.log('Form is valid:', Object.keys(errors).length === 0)
    
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    // Prepare the data to send
    const userData = {
      email: form.email.trim(),
      password: form.password,
    }
    
    console.log('Form state:', form)
    console.log('Sending data to API:', userData)
    
    try {
      const response = await fetch('https://paperly-backend-five.vercel.app/api/userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      const data = await response.json()
      console.log('API Response:', data)
      
      if (response.ok && data.success) {
        // Login using auth hook
        login(data.token, data.user, form.remember)
        
        // Check if user has completed profile before redirecting
        try {
          const profileResponse = await fetch(`https://paperly-backend-five.vercel.app/api/enterprise-profile?email=${encodeURIComponent(form.email.trim())}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (profileResponse.ok) {
            const profileData = await profileResponse.json()
            
            // Check if profile exists and has required fields
            const hasCompleteProfile = profileData.profile && 
              profileData.profile.fullName && 
              profileData.profile.companyName && 
              profileData.profile.companyType && 
              profileData.profile.industry && 
              profileData.profile.registeredAddress && 
              profileData.profile.defaultCurrency && 
              profileData.profile.defaultPaymentCycle && 
              profileData.profile.preferredLanguage
            
            // Set appropriate redirect message
            if (hasCompleteProfile) {
              setRedirectMessage("Welcome back to Paprly! You've been successfully signed in. Redirecting to your workspace...")
            } else {
              setRedirectMessage("Welcome to Paprly! Please complete your profile to get started. Redirecting to profile setup...")
            }
            
            setShowSuccessPopup(true)
            
            // Reset form
            setForm({
              email: "",
              password: "",
              remember: false,
            })
            
            // Redirect based on profile completion
            setTimeout(() => {
              if (hasCompleteProfile) {
                window.location.href = '/home'
              } else {
                window.location.href = '/enterprise-profile'
              }
            }, 2000)
          } else {
            // If profile check fails, redirect to profile completion
            setRedirectMessage("Welcome to Paprly! Please complete your profile to get started. Redirecting to profile setup...")
            setShowSuccessPopup(true)
            
            // Reset form
            setForm({
              email: "",
              password: "",
              remember: false,
            })
            
            setTimeout(() => {
              window.location.href = '/enterprise-profile'
            }, 2000)
          }
        } catch (profileError) {
          console.error('Error checking profile:', profileError)
          // If profile check fails, redirect to profile completion
          setRedirectMessage("Welcome to Paprly! Please complete your profile to get started. Redirecting to profile setup...")
          setShowSuccessPopup(true)
          
          // Reset form
          setForm({
            email: "",
            password: "",
            remember: false,
          })
          
          setTimeout(() => {
            window.location.href = '/enterprise-profile'
          }, 2000)
        }
        
      } else {
        setErrorMessage(data.message || "Login failed. Please check your credentials and try again.")
        setShowErrorPopup(true)
      }
      
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage("Network error. Please check your connection and try again.")
      setShowErrorPopup(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageSEO pageName="sign-in" />
      <div className="flex min-h-screen">
      {/* Left Side - Chatbot GIF */}
      <div className="relative hidden w-1/2 overflow-hidden md:flex bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="relative inset-0 ml-12 left-10 bg-yellow-200/20"></div>
        <div className="relative z-10 flex flex-col items-center justify-start h-full px-12 pt-12 text-center">
          <div className="mb-8">
            {/* Chatbot GIF */}
            <div className="flex items-center justify-center mb-6">
              <Image 
                src="/Chat bot.gif" 
                alt="AI Chatbot Assistant" 
                width={380}
                height={400}
                className="rounded rounded-xl"
              />
            </div>
          </div>
          <div className="max-w-md">
            <h2 className="mb-4 text-2xl font-bold text-yellow-800">
              Welcome back to Paprly
            </h2>
            <p className="text-lg leading-relaxed text-yellow-700">
              Access your professional workspace. Manage contracts, invoices, and documents 
              with our intelligent automation. Your secure, organized document management 
              solution awaits.
            </p>
            <div className="flex items-center justify-center mt-8 space-x-4 text-yellow-600">
              <div className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Secure</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Simple</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-start justify-center w-full px-8 py-12 bg-white md:w-1/2">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Image 
                src="/final_logo.png" 
                alt="Paprly Logo" 
                width={48}
                height={48}
                className="mr-3 rounded-lg"
              />
<h1
  className={`text-3xl mt-5 font-bold text-[#B29200] font-borel ${borel.className}`}
>
  Welcome Back
</h1>
            </div>
            <p className="text-gray-500">
              Sign in to your Paprly account and continue managing your documents.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email id"
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 hover:bg-yellow-50 hover:border-yellow-300 ${
                  formErrors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 hover:bg-yellow-50 hover:border-yellow-300 ${
                  formErrors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.password && (
                <p className="mt-1 text-xs text-red-500">{formErrors.password}</p>
              )}
            </div>

            {/* Forgot Password + Remember */}
            <div>
              <div className="flex items-center justify-between">
                <a href="/forgot-password" className="text-sm font-medium text-yellow-600 transition-colors duration-200 hover:text-yellow-700">
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">Remember sign in details</span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${
                      form.remember ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 ${
                        form.remember ? "left-6" : "left-0.5"
                      } w-5 h-5 bg-white rounded-full shadow transition-all duration-200`}
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-full px-6 py-3 font-medium text-white transition-colors duration-200 bg-yellow-500 rounded-full hover:bg-yellow-600 disabled:bg-yellow-300"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  Signing In...
                </>
              ) : (
                "Log in"
              )}
            </button>

            {/* OR Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-4 text-sm text-gray-400">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="flex items-center justify-center w-full gap-3 px-6 py-3 font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <div className="mt-4 text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-yellow-600 transition-colors duration-200 hover:text-yellow-700"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
          <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Login Successful!</h3>
            <p className="mb-6 text-gray-600">{redirectMessage}</p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-yellow-500 rounded-full hover:bg-yellow-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
          <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Login Failed</h3>
            <p className="mb-6 text-gray-600">{errorMessage}</p>
            <button
              onClick={() => setShowErrorPopup(false)}
              className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-yellow-500 rounded-full hover:bg-yellow-600"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  )
}





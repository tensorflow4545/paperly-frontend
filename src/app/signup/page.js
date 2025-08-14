"use client"

import { useState, useEffect } from "react"

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    remember: false,
  })

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formErrors, setFormErrors] = useState({})

  // Clear any cached form data on component mount
  useEffect(() => {
    // Force clear any cached form data
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      organization: "",
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

  const handleOrganizationSelect = (value) => {
    setForm((prev) => ({ ...prev, organization: value }))
    setIsDropdownOpen(false)
    if (formErrors.organization) {
      setFormErrors(prev => ({ ...prev, organization: "" }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    // Name validation
    if (!form.name.trim()) {
      errors.name = "Name is required"
    } else if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }
    
    // Email validation
    if (!form.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email"
    }
    
    // Password validation
    if (!form.password) {
      errors.password = "Password is required"
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }
    
    // Confirm password validation
    if (!form.confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
    
    // Organization validation
    if (!form.organization) {
      errors.organization = "Please select an organization type"
    }
    
    setFormErrors(errors)
    
    // Log validation results
    console.log('Form validation errors:', errors)
    console.log('Form is valid:', Object.keys(errors).length === 0)
    
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Force clear any old cached data
    const currentForm = { ...form }
    console.log('Current form state before validation:', currentForm)
    
    // Double-check organization value
    if (currentForm.organization && !organizationOptions.includes(currentForm.organization)) {
      console.log('Invalid organization value detected, clearing form...')
      setForm({
        name: currentForm.name,
        email: currentForm.email,
        password: currentForm.password,
        confirmPassword: currentForm.confirmPassword,
        organization: "", // Clear invalid organization
        remember: currentForm.remember,
      })
      setFormErrors(prev => ({ ...prev, organization: "Please select a valid organization type" }))
      return
    }
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    // Prepare the data to send
    const userData = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      OrganizationType: form.organization, // Changed to match backend API field name
    }
    
    console.log('Form state:', form)
    console.log('Sending data to API:', userData)
    console.log('Organization value being sent:', form.organization)
    
    try {
      const response = await fetch('https://paperly-backend-five.vercel.app/api/userRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      const data = await response.json()
      console.log('API Response:', data)
      
      if (response.ok) {
        setShowSuccessPopup(true)
        // Reset form
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          organization: "",
          remember: false,
        })
      } else {
        setErrorMessage(data.message || "Registration failed. Please try again.")
        setShowErrorPopup(true)
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrorMessage("Network error. Please check your connection and try again.")
      setShowErrorPopup(true)
    } finally {
      setIsLoading(false)
    }
  }

  const organizationOptions = [
    "Freelancer",
    "Business",
    "Individual",
    "Other",
  ]

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Chatbot GIF */}
      <div className="hidden  md:flex w-1/2 bg-gradient-to-br from-yellow-50 to-yellow-100 relative overflow-hidden">
        <div className="relative ml-12 left-10 inset-0 bg-yellow-200/20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-center">
          <div className="mb-8">
            {/* Chatbot GIF */}
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/Chat bot.gif" 
                alt="AI Chatbot Assistant" 
                className="w-[380px] h-[400px] rounded rounded-xl "
              />
            </div>
          </div>
                     <div className="max-w-md">
             <h2 className="text-2xl font-bold text-yellow-800 mb-4">
               Welcome to Paprly Enterprise Suite
             </h2>
             <p className="text-lg text-yellow-700 leading-relaxed">
               All your paperwork, organized in one place. From contracts and invoices to e-signatures 
               and secure sharing — our intelligent automation makes managing documents faster, easier, 
               and stress-free. Get started today and power your workflow with Paprly.
             </p>
            <div className="mt-8 flex items-center justify-center space-x-4 text-yellow-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm">Secure</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm">Simple</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm">Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/final_logo.png" 
                alt="Paprly Logo" 
                className="w-12 h-12 rounded-lg mr-3"
              />
              <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
            </div>
                         <p className="text-gray-500">Join thousands of professionals who trust Paprly for their document management needs.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 hover:bg-yellow-50 hover:border-yellow-300 ${
                  formErrors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">Email</label>
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
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 hover:bg-yellow-50 hover:border-yellow-300 ${
                  formErrors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 hover:bg-yellow-50 hover:border-yellow-300 ${
                  formErrors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>

            {/* Organization Dropdown */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">Organization</label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-left flex items-center justify-between transition-all duration-200 hover:bg-yellow-50 hover:border-yellow-300 ${
                  formErrors.organization ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
              >
                <span className={form.organization ? "text-gray-900" : "text-gray-400"}>
                  {form.organization || "Select Organization Type"}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-20 transition-all duration-300 ease-out origin-top ${
                  isDropdownOpen
                    ? "opacity-100 scale-y-100 translate-y-0"
                    : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
                }`}
              >
                {organizationOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleOrganizationSelect(option)}
                    className="w-full px-4 py-3 text-left hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-200 text-gray-700 border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {formErrors.organization && (
                <p className="text-red-500 text-xs mt-1">{formErrors.organization}</p>
              )}
            </div>

            {/* Remember Toggle */}
            <div className="flex items-center justify-between mt-8 mb-6">
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

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </>
              ) : (
                "Sign up"
              )}
            </button>

            {/* OR Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-4 text-gray-400 text-sm">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-full flex items-center justify-center gap-3 transition-colors duration-200"
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

            {/* Login Link */}
            <div className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-yellow-600 hover:text-yellow-700 font-medium">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>

             {/* Success Popup */}
       {showSuccessPopup && (
         <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
           <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-xl">
             <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
               </svg>
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
             <p className="text-gray-600 mb-6">Welcome to Paprly! Your account has been created successfully.</p>
             <button
               onClick={() => setShowSuccessPopup(false)}
               className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200"
             >
               Get Started
             </button>
           </div>
         </div>
       )}

             {/* Error Popup */}
       {showErrorPopup && (
         <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
           <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-xl">
             <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
               </svg>
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Failed</h3>
             <p className="text-gray-600 mb-6">{errorMessage}</p>
             <button
               onClick={() => setShowErrorPopup(false)}
               className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200"
             >
               Try Again
             </button>
           </div>
         </div>
       )}
    </div>
  )
}

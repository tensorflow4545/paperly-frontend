"use client"

import { useState, useRef, useEffect } from "react"
import PageSEO from "@/components/SEO/PageSEO"
import { getAuthToken, getUserData, logout } from "@/utils/auth"

export default function EnterpriseProfilePage() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const handleLogout = () => {
    logout()
  }
  
  
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    companyName: "",
    companyLogo: null,
    companyType: "",
    industry: "",
    gstNumber: "",
    registeredAddress: "",
    defaultCurrency: "",
    defaultPaymentCycle: "",
    preferredLanguage: "",
    enableOnboardingKit: true,
    enableTimestampProof: true,
    defaultSignatureStyle: ""
  })

  const [formErrors, setFormErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isNewProfile, setIsNewProfile] = useState(true)
  const [hasExistingProfile, setHasExistingProfile] = useState(false)
  const fileInputRef = useRef(null)

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      const token = getAuthToken()
      const userData = getUserData()
      
      
      if (token && userData) {
        setUser(userData)
        setIsAuthenticated(true)
      } else {
        setIsLoadingProfile(false)
      }
    }
    
    loadUserData()
  }, [])

  // Load existing profile data from API when user changes
  useEffect(() => {
    const loadProfileData = async () => {
      if (user?.email) {
        try {
          
          // Fetch existing profile data from API
          const response = await fetch(`https://paperly-backend-five.vercel.app/api/enterprise-profile?email=${encodeURIComponent(user.email)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (response.ok) {
            const data = await response.json()
            if (data.profile) {
              setHasExistingProfile(true)
              // Populate form ONLY with API data
              setForm(prev => ({
                ...prev,
                fullName: data.profile.fullName || "",
                email: data.profile.email || "",
                companyName: data.profile.companyName || "",
                companyLogo: data.profile.companyLogo || null,
                companyType: data.profile.companyType || "",
                industry: data.profile.industry || "",
                gstNumber: data.profile.gstNumber || "",
                registeredAddress: data.profile.registeredAddress || "",
                defaultCurrency: data.profile.defaultCurrency || "",
                defaultPaymentCycle: data.profile.defaultPaymentCycle || "",
                preferredLanguage: data.profile.preferredLanguage || "",
                enableOnboardingKit: data.profile.enableOneClickOnboardingKit || true,
                enableTimestampProof: data.profile.enableDocumentTimestampProof || true,
                defaultSignatureStyle: data.profile.defaultSignatureStyle || ""
              }))
            } else {
              setHasExistingProfile(false)
              // Keep form empty for new profile
              setForm(prev => ({
                ...prev,
                email: user.email || "" // Only set email from auth
              }))
            }
          } else if (response.status === 404) {
            setHasExistingProfile(false)
            // Keep form empty for new profile, only set email
            setForm(prev => ({
              ...prev,
              email: user.email || "" // Only set email from auth
            }))
          } else {
            console.error('Error fetching profile:', response.status, response.statusText)
            setHasExistingProfile(false)
            // On error, only set email from auth
            setForm(prev => ({
              ...prev,
              email: user.email || "" // Only set email from auth
            }))
          }
           
        } catch (error) {
          console.error('Error loading profile data:', error)
          setHasExistingProfile(false)
          // On error, only set email from auth
          setForm(prev => ({
            ...prev,
            email: user.email || "" // Only set email from auth
          }))
        } finally {
          setIsLoadingProfile(false)
        }
      } else if (user === null) {
        // User data is loaded but no user found
        setIsLoadingProfile(false)
      } else {
        setIsLoadingProfile(false)
      }
    }
    
    if (user !== undefined) {
      loadProfileData()
    } 
  }, [user])

  // Show loading if user data is not yet loaded
  if (!user && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    )
  }

  // Show loading while profile data is being fetched
  if (isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading profile data...</p>
        </div>
      </div>
    )
  }

  // If no user data after loading, redirect to login
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-gray-600 mb-4">No user data found. Please log in.</p>
          <button 
            onClick={() => window.location.href = '/sign-in'}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  // Helper function to map organization type to company type
  const mapOrganizationTypeToCompanyType = (orgType) => {
    const mapping = {
      "Freelancer": "Solo Founder",
      "Business": "Private Limited",
      "Individual": "Proprietorship",
      "Other": "Other"
    }
    return mapping[orgType] || ""
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm(prev => ({ ...prev, companyLogo: file }))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setForm(prev => ({ ...prev, companyLogo: file }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!form.fullName.trim()) errors.fullName = "Full name is required"
    if (!form.companyName.trim()) errors.companyName = "Company name is required"
    if (!form.companyType) errors.companyType = "Company type is required"
    if (!form.industry) errors.industry = "Industry is required"
    if (!form.registeredAddress.trim()) errors.registeredAddress = "Registered address is required"
    if (!form.defaultCurrency) errors.defaultCurrency = "Default currency is required"
    if (!form.defaultPaymentCycle) errors.defaultPaymentCycle = "Default payment cycle is required"
    if (!form.preferredLanguage) errors.preferredLanguage = "Preferred language is required"
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      // Prepare the data to send to API
      const profileData = {
        email: form.email,
        fullName: form.fullName,
        companyName: form.companyName,
        companyLogo: form.companyLogo ? URL.createObjectURL(form.companyLogo) : "",
        companyType: form.companyType,
        industry: form.industry,
        gstNumber: form.gstNumber,
        registeredAddress: form.registeredAddress,
        defaultCurrency: form.defaultCurrency,
        defaultPaymentCycle: form.defaultPaymentCycle,
        preferredLanguage: form.preferredLanguage,
        enableOneClickOnboardingKit: form.enableOnboardingKit,
        enableDocumentTimestampProof: form.enableTimestampProof,
        defaultSignatureStyle: form.defaultSignatureStyle
      }
     
      
      const response = await fetch('https://paperly-backend-five.vercel.app/api/enterprise-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setShowSuccess(true)
        // Check if it's a new profile or update based on response
        setIsNewProfile(response.status === 201)
      } else {
        console.error('Profile save failed:', data.error)
        setErrorMessage(data.error || "Failed to save profile. Please try again.")
        setShowError(true)
      }
      
    } catch (error) {
      console.error('Error saving profile:', error)
      setErrorMessage("Network error. Please check your connection and try again.")
      setShowError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const companyTypes = [
    "Solo Founder",
    "Partnership",
    "Private Limited",
    "LLP",
    "Public Limited",
    "Proprietorship",
    "Other"
  ]

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Real Estate",
    "Other"
  ]

  const currencies = [
    "INR (₹)",
    "USD ($)",
    "EUR (€)",
    "GBP (£)",
    "CAD ($)",
    "AUD ($)"
  ]

  const paymentCycles = [
    "Weekly",
    "Bi-weekly",
    "Monthly",
    "Quarterly"
  ]

  const languages = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Chinese"
  ]

  const signatureStyles = [
    "Professional Cursive",
    "Clean Print",
    "Modern Signature",
    "Classic Script"
  ]

  return (
    <>
      <PageSEO pageName="enterprise-profile" />
      
      {/* Premium Navbar */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex justify-between items-center h-12 sm:h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg">
                <img 
                  src="/enterprise_logo.png" 
                  alt="Paprly Logo" 
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-lg sm:text-xl font-bold text-gray-900">Paprly</span>
                <span className="bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full font-semibold tracking-wide shadow-sm">
                  ENTERPRISE
                </span>
              </div>
            </div>
            
            {/* Right Side - User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-6">
              {/* Notifications - Hidden on mobile */}
              <button className="hidden sm:block text-gray-500 hover:text-purple-600 transition-all duration-200 p-2 rounded-lg hover:bg-purple-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 006 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
              </button>
              
              {/* User Profile */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-xs sm:text-sm font-semibold">
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 font-medium">{user?.OrganizationType || 'Member'}</p>
                </div>
              </div>
              
              {/* Settings */}
              <button className="text-gray-500 hover:text-purple-600 transition-all duration-200 p-1.5 sm:p-2 rounded-lg hover:bg-purple-50">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-0 sm:p-4 rounded-md ">
        
        {/* Minimal Page Header */}
        <div className="w-full px-4 sm:px-6 py-6 sm:py-8 border-b-[1px] border-purple-400 ">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Enterprise Profile
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-1">
                Welcome back, {user?.name || 'User'}! {hasExistingProfile ? 'Update your company profile' : 'Complete your company profile'}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {hasExistingProfile ? 'Your profile data has been loaded from the database. Make changes and save.' : 'Create your enterprise profile to unlock advanced features'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button 
                onClick={handleLogout}
                className="px-4 py-3 sm:py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-300 rounded-lg hover:border-gray-400 text-sm sm:text-base"
              >
                Log Out
              </button>
              <button className="px-6 py-3 sm:py-2 bg-purple-500 hover:bg-purple-500 text-white rounded-lg font-medium transition-all duration-200 border border-purple-300 hover:border-purple-400 text-sm sm:text-base">
                Explore Paprly Studio
              </button>
            </div>
          </div>
        </div>

        {/* Form Container & Basic Information */}
        <div className="w-full px-0 sm:px-6 py-8 sm:py-12 border-b border-purple-400">
          <div className="bg-white/80 backdrop-blur-sm rounded-none sm:rounded-xl border border-white/20 shadow-md p-4 sm:p-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                <p className="text-sm text-gray-500">Your personal and company details</p>
              </div>
              {hasExistingProfile && (
                <div className="flex items-center text-green-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Profile Data Loaded
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name(Company or Personal)
                  {user?.OrganizationType && (
                    <span className="ml-2 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {user.OrganizationType}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (Company or Personal)</label>
                                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter company name"
                />
                {formErrors.companyName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.companyName}</p>
                )}
              </div>

              {/* Company Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors duration-200"
                >
                  {form.companyLogo ? (
                    <div className="text-center">
                      <img 
                        src={URL.createObjectURL(form.companyLogo)} 
                        alt="Company Logo" 
                        className="w-16 h-16 mx-auto mb-2 rounded-lg object-cover"
                      />
                      <p className="text-sm text-gray-600">{form.companyLogo.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-gray-500">Drop logo here or click to upload</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Details Section */}
        <div className="w-full px-0 sm:px-6 py-6 sm:py-8 border-b border-purple-400">
          <div className="bg-white/80 backdrop-blur-sm rounded-none sm:rounded-xl border border-white/20 shadow-md p-4 sm:p-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Business Details</h2>
                <p className="text-sm text-gray-500">Company structure and legal information</p>
              </div>
              
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
                <select
                  name="companyType"
                  value={form.companyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select company type</option>
                  {companyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {formErrors.companyType && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.companyType}</p>
                )}
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {formErrors.industry && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.industry}</p>
                )}
              </div>

              {/* GST Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GST Number (Optional)</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={form.gstNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter GST number"
                />
              </div>

              {/* Registered Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Registered Address</label>
                <textarea
                  name="registeredAddress"
                  value={form.registeredAddress}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter registered address"
                />
                {formErrors.registeredAddress && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.registeredAddress}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Team & Preferences Section */}
        <div className="w-full px-0 sm:px-6 py-6 sm:py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-none sm:rounded-xl border border-white/20 shadow-md p-4 sm:p-8">
            {/* Section Header */}
            <div className="flex items-center mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Team & Preferences</h2>
                <p className="text-sm text-gray-500">Default settings for your team workflow</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Default Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                <select
                  name="defaultCurrency"
                  value={form.defaultCurrency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select currency</option>
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
                {formErrors.defaultCurrency && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.defaultCurrency}</p>
                )}
              </div>

              {/* Default Payment Cycle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Payment Cycle</label>
                <select
                  name="defaultPaymentCycle"
                  value={form.defaultPaymentCycle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select payment cycle</option>
                  {paymentCycles.map(cycle => (
                    <option key={cycle} value={cycle}>{cycle}</option>
                  ))}
                </select>
                {formErrors.defaultPaymentCycle && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.defaultPaymentCycle}</p>
                )}
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                <select
                  name="preferredLanguage"
                  value={form.preferredLanguage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select language</option>
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
                {formErrors.preferredLanguage && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.preferredLanguage}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Suite Settings Section */}
        <div className="w-full px-0 sm:px-6 py-6 sm:py-8 border-b border-purple-400">
          <div className="bg-white/80 backdrop-blur-sm sm:rounded-xl border border-white/20 shadow-md p-4 sm:p-8">
            {/* Section Header */}
            <div className="flex items-center mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Enterprise Suite Settings</h2>
                <p className="text-sm text-gray-500">Advanced features and configurations</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Toggle Settings */}
              <div className="space-y-4">
                {/* Onboarding Kit Toggle */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100/50">
                  <div>
                    <h4 className="font-semibold text-gray-900">Enable One-Click Onboarding Kit</h4>
                    <p className="text-sm text-gray-600">Automatically generate onboarding documents for new team members</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableOnboardingKit"
                      checked={form.enableOnboardingKit}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
                      form.enableOnboardingKit ? "bg-purple-600" : "bg-gray-300"
                    }`}>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                        form.enableOnboardingKit ? "left-6" : "left-0.5"
                      }`} />
                    </div>
                  </label>
                </div>

                {/* Timestamp Proof Toggle */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100/50">
                  <div>
                    <h4 className="font-semibold text-gray-900">Enable Document Timestamp Proof</h4>
                    <p className="text-sm text-gray-600">Add blockchain timestamping to all documents for legal compliance</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableTimestampProof"
                      checked={form.enableTimestampProof}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
                      form.enableTimestampProof ? "bg-purple-600" : "bg-gray-300"
                    }`}>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                        form.enableTimestampProof ? "left-6" : "left-0.5"
                      }`} />
                    </div>
                  </label>
                </div>
              </div>

              {/* Signature Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Signature Style</label>
                <select
                  name="defaultSignatureStyle"
                  value={form.defaultSignatureStyle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select signature style</option>
                  {signatureStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="w-full px-0 sm:px-6 py-3 sm:py-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-none sm:rounded-xl border border-white/20 shadow-md p-4 sm:p-8">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <button
                type="button"
                className="px-6 py-3 sm:py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-300 rounded-lg hover:border-gray-400 text-sm sm:text-base"
              >
                Cancel & Exit
              </button>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <button
                  onClick={handleSubmit}
                  type="button"
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-md transform hover:scale-105 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </div>
                  ) : (
                    "Save Profile"
                  )}
                </button>
                <button
                onClick={handleSubmit}
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-md transform hover:scale-105"
                >
                  Proceed to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

                  {/* Professional Footer */}
          <footer className="bg-white border-t border-gray-100 mt-16 rounded-xl">
            <div className="w-full px-0 sm:px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <img 
                  src="/final_logo.png" 
                  alt="Paprly Logo" 
                  className="w-6 h-6 rounded mr-2"
                />
                <span className="text-sm text-gray-600">© 2024 Paprly Enterprise Suite. All rights reserved.</span>
              </div>
              <div className="flex space-x-6 text-sm text-gray-600">
                <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-md">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {isNewProfile ? 'Profile Created Successfully!' : 'Profile Updated Successfully!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isNewProfile 
                ? 'Your enterprise profile has been created and saved.' 
                : 'Your enterprise profile has been updated and saved.'
              }
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Save Failed</h3>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => setShowError(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </>
  )
}

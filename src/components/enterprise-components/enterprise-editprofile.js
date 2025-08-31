"use client"

import { useState, useRef, useEffect } from "react"
import { getAuthToken, getUserData, logout } from "@/utils/auth"
import { Inter, Outfit } from "next/font/google";
import { Upload, ChevronDown, Info, User, Building, Settings, Save, ArrowRight } from "lucide-react"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export default function EnterpriseProfilePage() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
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
                email: user.email || ""
              }))
            }
          } else {
            setHasExistingProfile(false)
            // Keep form empty for new profile
            setForm(prev => ({
              ...prev,
              email: user.email || ""
            }))
          }
        } catch (error) {
          console.error('Error loading profile data:', error)
          setHasExistingProfile(false)
          // Keep form empty for new profile
          setForm(prev => ({
            ...prev,
            email: user.email || ""
          }))
        } finally {
          setIsLoadingProfile(false)
        }
      }
    }
    
      loadProfileData()
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm(prev => ({
        ...prev,
        companyLogo: file
      }))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setForm(prev => ({
        ...prev,
        companyLogo: file
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!form.fullName.trim()) {
      errors.fullName = "Full name is required"
    }
    
    if (!form.companyName.trim()) {
      errors.companyName = "Company name is required"
    }
    
    if (!form.companyType) {
      errors.companyType = "Company type is required"
    }
    
    if (!form.industry) {
      errors.industry = "Industry is required"
    }
    
    if (!form.registeredAddress.trim()) {
      errors.registeredAddress = "Registered address is required"
    }
    
    if (!form.defaultCurrency) {
      errors.defaultCurrency = "Default currency is required"
    }
    
    if (!form.defaultPaymentCycle) {
      errors.defaultPaymentCycle = "Payment cycle is required"
    }
    
    if (!form.preferredLanguage) {
      errors.preferredLanguage = "Preferred language is required"
    }
    
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

  // Show loading if user data is not yet loaded
  if (!user && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 border-3 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-3 text-sm text-gray-600">Loading user data...</p>
        </div>
      </div>
    )
  }

  // Show loading while profile data is being fetched
  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 border-3 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-3 text-sm text-gray-600">Loading profile data...</p>
        </div>
      </div>
    )
  }

  // If no user data after loading, redirect to login
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <p className="mb-3 text-sm text-gray-600">No user data found. Please log in.</p>
          <button 
            onClick={() => window.location.href = '/sign-in'}
            className="px-3 py-2 text-sm text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-yellow-50 to-yellow-100 flex-1 lg:ml-0 min-h-screen">
      {/* Header */}
      <div className="px-4 lg:px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                <User className="w-5 h-5 text-yellow-600" />
                Company Profile
          </h1>
              <p className="text-sm text-gray-600">
                {hasExistingProfile ? 'Update your company profile' : 'Complete your company profile to unlock full features'}
               </p>
             </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>Powered by Paprly</span>
             </div>
           </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 lg:px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-4">
          {/* Basic Information */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
                <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-600" />
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Full Name */}
              <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                      className="w-full px-3 py-2 text-sm transition-colors border border-yellow-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                      placeholder="Enter full name"
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                      className="w-full px-3 py-2 text-sm transition-colors border border-yellow-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                  disabled
                />
              </div>
            </div>

            {/* Company Name */}
                <div className="mb-4">
                  <label className="block mb-1.5 text-xs font-medium text-gray-600">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                    className="w-full px-3 py-2 text-sm transition-colors border border-yellow-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                    placeholder="Enter company name"
              />
              {formErrors.companyName && (
                <p className="mt-1 text-xs text-red-500">{formErrors.companyName}</p>
              )}
            </div>

            {/* Logo Upload Area */}
            <div 
                  className="p-4 text-center border-2 border-dashed rounded-lg border-yellow-300 bg-yellow-50/50 hover:bg-yellow-100/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                    <Upload className="w-5 h-5 mb-2 text-yellow-600" />
                    <p className="text-xs text-gray-600 mb-2">
                  Drag & drop your company logo here, or{' '}
                      <span className="text-yellow-600 underline">browse</span>
                </p>
                {form.companyLogo ? (
                      <div className="w-10 h-10 overflow-hidden rounded-lg">
                    <img 
                      src={URL.createObjectURL(form.companyLogo)} 
                      alt="Company Logo" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                      <div className="w-10 h-10 border-2 rounded-lg border-yellow-300"></div>
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

          {/* Business Details Section */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
                <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-4 h-4 text-yellow-600" />
                  Business Details
                </h2>

            {/* Form Fields - First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Company Type */}
              <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">
                  Company Type
                </label>
                <div className="relative">
                  <select 
                    name="companyType"
                    value={form.companyType}
                    onChange={handleChange}
                        className="w-full px-3 py-2 text-sm transition-colors border border-yellow-200 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                  >
                    <option value="">Select company type</option>
                    {companyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                      <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                </div>
                {formErrors.companyType && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.companyType}</p>
                )}
              </div>

              {/* Industry */}
              <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">
                  Industry
                </label>
                <div className="relative">
                  <select 
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                        className="w-full px-3 py-2 text-sm transition-colors border border-yellow-200 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                      <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                </div>
                {formErrors.industry && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.industry}</p>
                )}
              </div>
            </div>

            {/* Form Fields - Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* GST Number */}
              <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={form.gstNumber}
                  onChange={handleChange}
                      className="w-full px-3 py-2 text-sm transition-colors border border-yellow-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                      placeholder="Enter GST number"
                />
              </div>

              {/* Registered Address */}
              <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">
                  Registered Address
                </label>
                <input
                  type="text"
                  name="registeredAddress"
                  value={form.registeredAddress}
                  onChange={handleChange}
                      className="w-full px-3 py-2 text-sm transition-colors border border-yellow-200 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                      placeholder="Enter registered address"
                />
                {formErrors.registeredAddress && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.registeredAddress}</p>
                )}
              </div>
            </div>
          </div>

          {/* Team & Preferences Section */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
                <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-yellow-600" />
                  Team & Preferences
                </h2>

            {/* Form Fields - First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Default Currency */}
              <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">
                  Default Currency
                </label>
                <div className="relative">
                  <select 
                    name="defaultCurrency"
                    value={form.defaultCurrency}
                    onChange={handleChange}
                        className="w-full px-3 py-2 text-sm transition-colors border border-yellow-200 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                  >
                    <option value="">Select currency</option>
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                      <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                </div>
                {formErrors.defaultCurrency && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.defaultCurrency}</p>
                )}
              </div>

              {/* Payment Cycle */}
              <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">
                  Payment Cycle
                </label>
                <div className="relative">
                  <select 
                    name="defaultPaymentCycle"
                    value={form.defaultPaymentCycle}
                    onChange={handleChange}
                        className="w-full px-3 py-2 text-sm transition-colors border border-yellow-200 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                  >
                    <option value="">Select payment cycle</option>
                    {paymentCycles.map(cycle => (
                      <option key={cycle} value={cycle}>{cycle}</option>
                    ))}
                  </select>
                      <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                </div>
                {formErrors.defaultPaymentCycle && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.defaultPaymentCycle}</p>
                )}
              </div>
            </div>

            {/* Form Fields - Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Preferred Language */}
              <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">
                  Preferred Language
                </label>
                <div className="relative">
                  <select 
                    name="preferredLanguage"
                    value={form.preferredLanguage}
                    onChange={handleChange}
                        className="w-full px-3 py-2 text-sm transition-colors border border-yellow-200 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
                  >
                    <option value="">Select language</option>
                    {languages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                      <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                </div>
                {formErrors.preferredLanguage && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.preferredLanguage}</p>
                )}
              </div>

                  {/* Empty column for layout */}
                  <div className="hidden md:block">
                    {/* Empty space to maintain grid layout */}
              </div>
            </div>
          </div>

          {/* Enterprise Suite Settings Section */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
                <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-yellow-600" />
                  Enterprise Suite Settings
                </h2>

            {/* Settings Items */}
                <div className="space-y-4">
              {/* Onboarding Kit */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">Onboarding Kit</span>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setForm(prev => ({...prev, enableOnboardingKit: !form.enableOnboardingKit}))}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                          form.enableOnboardingKit ? 'bg-yellow-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            form.enableOnboardingKit ? 'translate-x-4' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Timestamp Proof */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">Timestamp Proof</span>
                      <Info className="w-3 h-3 ml-1 text-yellow-500" />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setForm(prev => ({...prev, enableTimestampProof: !form.enableTimestampProof}))}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                          form.enableTimestampProof ? 'bg-yellow-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            form.enableTimestampProof ? 'translate-x-4' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Default Signature Style */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">Default Signature Style</span>
                </div>
                <div className="relative">
                  <select 
                    name="defaultSignatureStyle"
                    value={form.defaultSignatureStyle}
                    onChange={handleChange}
                        className="px-3 py-1.5 text-sm transition-colors bg-white border border-yellow-200 rounded-lg outline-none appearance-none w-32 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                        <option value="">Select style</option>
                    {signatureStyles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                      <ChevronDown className="absolute w-3 h-3 text-gray-400 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {/* Assuming profileData is available from the API response or state */}
                      {/* For now, using user.name or a placeholder */}
                      {/* {profileData?.fullName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || "U"} */}
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {/* Assuming profileData is available from the API response or state */}
                      {/* For now, using profileData.companyName or a placeholder */}
                      {/* {profileData?.companyName || "Enterprise Account"} */}
                      Enterprise Account
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg hover:from-yellow-700 hover:to-yellow-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
                    <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : 'Save Profile'}
            </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-sm hover:shadow-md">
                    <ArrowRight className="w-4 h-4" />
                    Dashboard
            </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick Tips */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-yellow-600" />
                  Quick Tips
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-xs text-gray-600">All fields marked with * are required</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-xs text-gray-600">Upload a high-quality company logo</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-xs text-gray-600">Settings can be changed later</p>
                  </div>
                </div>
              </div>

              {/* Profile Status */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Profile Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Basic Info</span>
                    <div className={`w-2 h-2 rounded-full ${form.fullName && form.companyName ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Business Details</span>
                    <div className={`w-2 h-2 rounded-full ${form.companyType && form.industry ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Preferences</span>
                    <div className={`w-2 h-2 rounded-full ${form.defaultCurrency && form.defaultPaymentCycle ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
          <div className="w-full max-w-sm p-6 text-center bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-500 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {isNewProfile ? 'Profile Created!' : 'Profile Updated!'}
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              {isNewProfile 
                ? 'Your enterprise profile has been created successfully.' 
                : 'Your enterprise profile has been updated successfully.'
              }
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-yellow-600 rounded-lg hover:bg-yellow-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
          <div className="w-full max-w-sm p-6 text-center bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Profile Save Failed</h3>
            <p className="mb-4 text-sm text-gray-600">{errorMessage}</p>
            <button
              onClick={() => setShowError(false)}
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
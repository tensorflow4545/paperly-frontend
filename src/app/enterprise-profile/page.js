"use client"

import { useState, useRef, useEffect } from "react"
import PageSEO from "@/components/SEO/PageSEO"
import { getAuthToken, getUserData, logout } from "@/utils/auth"
import EnterpriseNavbar from "@/components/enterprise-components/enterprise-navbar"
import { Inter, Outfit } from "next/font/google";
import { Upload, ChevronDown, Info } from 'lucide-react'
import Footer from "@/components/enterprise-components/enterprise-footer"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export default function EnterpriseProfilePage() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
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

  const handleLogout = () => {
    logout()
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

  // Show loading if user data is not yet loaded
  if (!user && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    )
  }

  // Show loading while profile data is being fetched
  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading profile data...</p>
        </div>
      </div>
    )
  }

  // If no user data after loading, redirect to login
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <p className="mb-4 text-gray-600">No user data found. Please log in.</p>
          <button 
            onClick={() => window.location.href = '/sign-in'}
            className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageSEO pageName="enterprise-profile" />
      <EnterpriseNavbar />

      {/* Main Content Area */}
      <div className="p-0 border-b-2 shadow-sm bg-gradient-to-br from-gray-100 to-gray-200 border-b-gray-300">
        <div className="rounded-lg bg-gradient-to-br from-yellow-50 to-white">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between max-w-7xl">
              <div className="flex-1">
                <h1 className={`${outfit.className} text-4xl text-gray-900 mb-2 font-bold`}>
                  Welcome back, {user?.name || 'User'}!
                </h1>
                <p className="text-lg text-gray-600">
                  {hasExistingProfile ? 'Update your company profile' : 'Complete your company profile to unlock full Paprly features.'}
                </p>
              </div>
              
              <div className="flex items-center gap-4 ml-8">
                <button className="px-6 py-3 font-medium text-white transition-colors duration-200 bg-yellow-600 rounded-lg hover:bg-amber-700">
                  Explore Paprly Studio
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 font-medium text-gray-800 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container & Basic Information */}
        <div className="min-h-screen p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-semibold text-[#B29200] mb-1">Basic Information</h1>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50"
                  />
                  {formErrors.fullName && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50"
                    disabled
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="mb-8">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50"
                />
                {formErrors.companyName && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.companyName}</p>
                )}
              </div>

              {/* Logo Upload Area */}
              <div 
                className="p-12 text-center border-2 border-dashed rounded-lg border-amber-400 bg-amber-50/30"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 mb-4 text-amber-500" />
                  <p className="mb-2 text-gray-600">
                    Drag & drop your company logo here, or{' '}
                    <button className="text-blue-600 underline hover:text-blue-700">
                      browse
                    </button>
                  </p>
                  {form.companyLogo ? (
                    <div className="w-16 h-16 mt-4 overflow-hidden rounded-full">
                      <img 
                        src={URL.createObjectURL(form.companyLogo)} 
                        alt="Company Logo" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 mt-4 border-2 rounded-full border-amber-400"></div>
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
        <div className="p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-semibold text-[#B29200] mb-1">Business Details</h1>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                {/* Company Type */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Company Type
                  </label>
                  <div className="relative">
                    <select 
                      name="companyType"
                      value={form.companyType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50"
                    >
                      <option value="">Select company type</option>
                      {companyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                  </div>
                  {formErrors.companyType && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.companyType}</p>
                  )}
                </div>

                {/* Industry */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <div className="relative">
                    <select 
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50"
                    >
                      <option value="">Select industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                  </div>
                  {formErrors.industry && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.industry}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* GST Number */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    GST Number
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={form.gstNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50"
                  />
                </div>

                {/* Registered Address */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Registered Address
                  </label>
                  <input
                    type="text"
                    name="registeredAddress"
                    value={form.registeredAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50"
                  />
                  {formErrors.registeredAddress && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.registeredAddress}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team & Preferences Section */}
        <div className="p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-semibold text-[#B29200] mb-1">Team & Preferences</h1>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                {/* Default Currency */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Default Currency
                  </label>
                  <div className="relative">
                    <select 
                      name="defaultCurrency"
                      value={form.defaultCurrency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50"
                    >
                      <option value="">Select currency</option>
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                  </div>
                  {formErrors.defaultCurrency && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.defaultCurrency}</p>
                  )}
                </div>

                {/* Payment Cycle */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Payment Cycle
                  </label>
                  <div className="relative">
                    <select 
                      name="defaultPaymentCycle"
                      value={form.defaultPaymentCycle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50"
                    >
                      <option value="">Select payment cycle</option>
                      {paymentCycles.map(cycle => (
                        <option key={cycle} value={cycle}>{cycle}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                  </div>
                  {formErrors.defaultPaymentCycle && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.defaultPaymentCycle}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Preferred Language */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Preferred Language
                  </label>
                  <div className="relative">
                    <select 
                      name="preferredLanguage"
                      value={form.preferredLanguage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50"
                    >
                      <option value="">Select language</option>
                      {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                  </div>
                  {formErrors.preferredLanguage && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.preferredLanguage}</p>
                  )}
                </div>

                {/* Empty column for layout */}
                <div>
                  {/* Empty space to maintain grid layout */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Suite Settings Section */}
        <div className="bg-gray-50 p-8 border-b-1 border-[#DEE1E6]">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-semibold text-[#B29200] mb-1">Enterprise Suite Settings</h1>
              </div>

              {/* Settings Items */}
              <div className="space-y-8">
                {/* Onboarding Kit */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-base font-medium text-gray-700">Onboarding Kit</span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setForm(prev => ({...prev, enableOnboardingKit: !form.enableOnboardingKit}))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        form.enableOnboardingKit ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          form.enableOnboardingKit ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Timestamp Proof */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-base font-medium text-gray-700">Timestamp Proof</span>
                    <Info className="w-4 h-4 ml-2 text-amber-500" />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setForm(prev => ({...prev, enableTimestampProof: !form.enableTimestampProof}))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        form.enableTimestampProof ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          form.enableTimestampProof ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Default Signature Style */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-base font-medium text-gray-700">Default Signature Style</span>
                  </div>
                  <div className="relative">
                    <select 
                      name="defaultSignatureStyle"
                      value={form.defaultSignatureStyle}
                      onChange={handleChange}
                      className="w-48 px-4 py-2 transition-colors bg-white border border-gray-300 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="">Select signature style</option>
                      {signatureStyles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full border-t border-[#DEE1E6] bg-white px-6 py-4 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-[#6B4DE6] text-[#6B4DE6] rounded-md hover:bg-[#f5f5f7]">
            Cancel & Exit
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#b8952f] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
          <button className="px-4 py-2 bg-[#6B4DE6] text-white rounded-md hover:bg-[#5638b8]">
            Proceed to Dashboard
          </button>
        </div>
      </div>
      
      <Footer />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
          <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              {isNewProfile ? 'Profile Created Successfully!' : 'Profile Updated Successfully!'}
            </h3>
            <p className="mb-6 text-gray-600">
              {isNewProfile 
                ? 'Your enterprise profile has been created and saved.' 
                : 'Your enterprise profile has been updated and saved.'
              }
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
          <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Profile Save Failed</h3>
            <p className="mb-6 text-gray-600">{errorMessage}</p>
            <button
              onClick={() => setShowError(false)}
              className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </>
  )
}
"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { Borel, Inter } from "next/font/google"
import { getAuthToken, getUserData, logout } from "@/utils/auth"
import { useRouter } from "next/navigation"
import { FiLogOut } from "react-icons/fi" // Import logout icon

const borel = Borel({
  subsets: ["latin"],
  weight: "400",
})

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
})

const EnterpriseNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = getAuthToken()
    const userData = getUserData()
    
    if (token && userData) {
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
    setUser(null)
    router.push('/sign-in')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="relative flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Left: Logo */}
     <div className="flex items-center space-x-3">
  <Image
    src="/final_logo.png"
    alt="Logo"
    width={40}
    height={40}
    className="ml-4 rounded-md"
  />
  <span
  className={`relative top-1 font-borel text-[25px] leading-[25px] font-bold text-[#B29200] ${borel.className}`}
>
  paprly
</span>
</div>

      {/* Desktop Navigation */}
      <div className={`hidden md:flex space-x-6 text-md text-yellow-500 ${inter.className}`}>
        <a href="#" className="hover:text-yellow-800">Solutions</a>
        <a href="#" className="hover:text-yellow-800">Features</a>
        <a href="#" className="hover:text-yellow-800">Pricing</a>
        <a href="#" className="hover:text-yellow-800">About Us</a>
        <a href="#" className="hover:text-yellow-800">Contact</a>
      </div>

      {/* Desktop Auth buttons */}
      {/* <div className="items-center hidden space-x-4 md:flex"> */}
        {/* {isAuthenticated ? (
          <div className="flex items-center space-x-4">
           
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 transition-colors rounded-full hover:text-yellow-600 hover:bg-gray-100"
              title="Logout"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
            <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
              <span className="text-sm font-medium text-yellow-700">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>
        ) : (
          <a
            href="/sign-in"
            className={`bg-yellow-700 text-white px-4 py-1 rounded hover:bg-yellow-800 text-sm font-semibold`}
          >
            Sign In
          </a>
        )}
      </div> */}

      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-yellow-500 hover:text-yellow-700 focus:outline-none focus:text-yellow-700"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg top-full md:hidden">
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className={`space-y-3 text-sm text-yellow-500 ${inter.className}`}>
              <a 
                href="#" 
                className="block py-2 font-semibold border-b border-gray-100 hover:text-yellow-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solutions
              </a>
              <a 
                href="#" 
                className="block py-2 font-semibold border-b border-gray-100 hover:text-yellow-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#" 
                className="block py-2 font-semibold border-b border-gray-100 hover:text-yellow-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#" 
                className="block py-2 font-semibold border-b border-gray-100 hover:text-yellow-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </a>
              <a 
                href="#" 
                className="block py-2 font-semibold border-b border-gray-100 hover:text-yellow-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
            
            {/* Mobile Auth Button */}
            {/* <div className="pt-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
                      <span className="text-lg font-medium text-yellow-700">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center w-full px-4 py-2 text-center text-gray-700 rounded hover:bg-gray-100"
                  >
                    <FiLogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <a
                  href="/sign-in"
                  className={`block w-full text-center bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 text-sm font-semibold`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </a>
              )}
            </div> */}
          </div>
        </div>
      )}
    </nav>
  )
}

export default EnterpriseNavbar
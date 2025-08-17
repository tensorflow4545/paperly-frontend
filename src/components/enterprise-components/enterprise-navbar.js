"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { Borel, Inter, Open_Sans } from "next/font/google"
import { getAuthToken, getUserData, logout } from "@/utils/auth"
import { useRouter } from "next/navigation"
import { FiLogOut } from "react-icons/fi"

const borel = Borel({
  subsets: ["latin"],
  weight: "400",
})

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
})

const openSans = Open_Sans({
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
      <div className="md:col-span-1">
        <div className="flex flex-row items-center space-x-4 mb-4">
          <Image
            src="/final_logo.png"
            alt="Paprly Logo"
            width={40}
            height={40}
            className="object-contain rounded-lg"
            loading="lazy"
          />
          <span className="text-xl font-semibold text-gray-900">Paprly</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className={`hidden md:flex space-x-5 ml-auto mr-6 text-md text-yellow-500 ${inter.className}`}>
        <a href="#" className="hover:text-yellow-800">Solutions</a>
        <a href="#" className="hover:text-yellow-800">Features</a>
        <a href="#" className="hover:text-yellow-800">Pricing</a>
        <a href="#" className="hover:text-yellow-800">About Us</a>
        <a href="#" className="hover:text-yellow-800">Contact</a>
      </div>

      {/* Desktop Auth buttons */}
      <div className="hidden md:flex items-center space-x-4 justify-end">
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            {/* Logout icon button */}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 transition-colors rounded-full hover:text-yellow-600 hover:bg-gray-100"
              title="Logout"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
            {/* Profile icon */}
            <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
              <span className="text-sm font-medium text-yellow-700">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>
        ) : (
          <a
            href="/sign-in"
            className={`bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 text-sm font-semibold ${openSans.className}`}
          >
            Sign In
          </a>
        )}
      </div>

      {/* Mobile Hamburger Menu Button */}
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
              {["Solutions", "Features", "Pricing", "About Us", "Contact"].map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="block py-2 font-semibold border-b border-gray-100 hover:text-yellow-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-4">
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
                  className={`block w-full text-center bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 text-sm font-semibold ${openSans.className}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default EnterpriseNavbar

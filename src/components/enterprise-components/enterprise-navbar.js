// components/EnterpriseNavbar.js
"use client"
import React, { useState } from 'react'
import Image from "next/image"
import { Borel } from "next/font/google"
import { Inter } from "next/font/google"
import { Open_Sans } from "next/font/google"

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow-sm relative">
      {/* Left: Logo */}
      <div className="md:col-span-1">
                  <div className="flex flex-row items-center space-x-4 mb-4 ">
                    <Image
                      src="/final_logo.png"
                      alt="Paprly Logo"
                      width={40}
                      height={40}
                      className=" object-contain rounded-lg"
                      loading="lazy"
                    />
                    <span className={`text-xl font-semibold text-gray-900 px-0 py-0`}>
                      Paprly
                    </span>
                  </div>
                  </div>
      {/* Desktop Navigation */}
      <div className={`hidden md:flex space-x-5 ml-auto mr-6 text-md text-yellow-500   ${inter.className}`}>
        <a href="#" className="hover:text-yellow-800 ">Solutions</a>
        <a href="#" className="hover:text-yellow-800 ">Features</a>
        <a href="#" className="hover:text-yellow-800 ">Pricing</a>
        <a href="#" className="hover:text-yellow-800 ">About Us</a>
        <a href="#" className="hover:text-yellow-800 ">Contact</a>
      </div>

      {/* Desktop Auth buttons */}
      <div className="hidden md:flex items-center space-x-4  justify-end">
        <a
          href="#"
          className={`bg-yellow-700 text-white px-6 py-3 rounded hover:bg-yellow-800 text-sm font-semibold ${openSans.className}`}
        >
          Sign In
        </a>
        
      </div>

      {/* Mobile Hamburger Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-yellow-500 hover:text-yellow-700 focus:outline-none focus:text-yellow-700"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="h-6 w-6"
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
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden z-50">
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className={`space-y-3 text-sm text-yellow-500 ${inter.className}`}>
              <a 
                href="#" 
                className="block hover:text-yellow-700 font-semibold py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solutions
              </a>
              <a 
                href="#" 
                className="block hover:text-yellow-700 font-semibold py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#" 
                className="block hover:text-yellow-700 font-semibold py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#" 
                className="block hover:text-yellow-700 font-semibold py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </a>
              <a 
                href="#" 
                className="block hover:text-yellow-700 font-semibold py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
            
            {/* Mobile Auth Button */}
            <div className="pt-4">
              <a
                href="#"
                className={`block w-full text-center bg-yellow-700 text-white px-6 py-3 rounded hover:bg-yellow-800 text-sm font-semibold ${openSans.className}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default EnterpriseNavbar
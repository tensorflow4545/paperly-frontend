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
    <nav className="relative flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <Image src="/starlogo.png" alt="Logo" className='ml-15' width={40} height={40} />
        <span className={`absolute top-[19px] left-[120px] font-borel text-[25px] leading-[25px] font-bold mr-20 text-[#B29200] ${borel.className}`}>paprly</span>
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
      <div className="items-center hidden space-x-4 md:flex">
        <a
          href="#"
          className={`bg-yellow-700 text-white px-4 py-1 rounded hover:bg-yellow-800 text-sm font-semibold ${openSans.className}`}
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
            <div className="pt-4">
              <a
                href="#"
                className={`block w-full text-center bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 text-sm font-semibold ${openSans.className}`}
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
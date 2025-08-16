// components/EnterpriseNavbar.js
import React from 'react'
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
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2 ">
        <Image src="/starlogo.png" alt="Logo" className='ml-15' width={40} height={40} />
        <span className={`absolute top-[19px] left-[120px] font-borel text-[25px] leading-[25px] font-bold mr-20 text-[#B29200] ${borel.className}`}>paprly</span>
      </div>

      {/* Middle: Links */}
      <div className={`flex space-x-6 text-sm text-yellow-500 ${inter.className}`}>
        <a href="#" className="hover:text-yellow-700 font-bold">Solutions</a>
        <a href="#" className="hover:text-yellow-700 font-bold">Features</a>
        <a href="#" className="hover:text-yellow-700 font-bold">Pricing</a>
        <a href="#" className="hover:text-yellow-700 font-bold">About Us</a>
        <a href="#" className="hover:text-yellow-700 font-bold">Contact</a>
      </div>

      {/* Right: Auth buttons */}
      <div className="flex items-center space-x-4">
        <a href="#" className={`text-sm text-yellow-500 hover:text-yellow-700 ${openSans.className}`}>Sign In</a>
        <a
          href="#"
          className={`bg-yellow-700 text-white px-4 py-1 rounded hover:bg-yellow-800 text-sm ${openSans.className}`}
        >
          Try Free
        </a>
      </div>
    </nav>
  )
}

export default EnterpriseNavbar
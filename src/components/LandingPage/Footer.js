"use client"

import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="Paperly Logo" 
                  width={32} 
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-semibold text-gray-900">Paperly</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              The simplest way to create professional invoices for your freelance business.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/template" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Upcoming Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © 2024 Paprly. Made with <span className="text-red-500">❤️</span> for freelancers in India.
          </p>
        </div>
      </div>
    </footer>
  )
}

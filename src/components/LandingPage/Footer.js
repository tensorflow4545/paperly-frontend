"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import PhaseTwoModal from "./phasetwomoadal"

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 justify-between gap-8 mb-8">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/final_logo.png" 
                  alt="Paperly Logo" 
                  width={32} 
                  height={32}
                  className="object-contain rounded rounded-lg"
                />
                <span className="text-xl font-semibold text-gray-900">Paprly</span>
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
                  <button 
                    onClick={openModal}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-left"
                  >
                    Upcoming Features
                  </button>
                </li>
                <li>
                  <Link href="/help" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="/e-sign" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    e-Sign Documents
                  </Link>
                </li>
              </ul>
            </div>

                         {/* Support Links */}
             <div>
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
               <ul className="space-y-3">
                 <li>
                   <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                     About
                   </Link>
                 </li>
                 <li>
                   <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                     Contact
                   </Link>
                 </li>
                 <li>
                   <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                     Privacy Policy
                   </Link>
                 </li>
               </ul>
             </div>

             {/* Suggestion Links */}
             <div>
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggestion</h3>
               <ul className="space-y-3">
                 <li>
                   <Link href="/testimonials" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                     Testimonials
                   </Link>
                 </li>
                 <li>
                   <Link href="/feedback" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                     Feedback
                   </Link>
                 </li>
               </ul>
             </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              © 2025 Paprly. Made with <span className="text-red-500">❤️</span> by Team Paprly.
            </p>
          </div>
        </div>
      </footer>

      {/* Phase 2 Modal */}
      <PhaseTwoModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

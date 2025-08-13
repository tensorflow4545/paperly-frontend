"use client"

import { useRouter } from "next/navigation"

export default function CTASection() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/blank-editor')
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 border-t border-gray-300">
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-6 leading-tight">
          Ready to create your first professional invoice?
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          Join thousands of freelancers who trust our platform for their invoicing needs.
        </p>

        {/* CTA Button */}
        <button 
          onClick={handleGetStarted}
          className="bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-lg"
        >
          Start Creating Now
        </button>
      </div>
    </section>
  )
}

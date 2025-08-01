"use client"

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 border-t border-gray-300">
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Main Heading */}
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Get started with your professional invoice in under 60 seconds.
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Join thousands of freelancers who trust Paprly for their invoicing needs.
        </p>

        {/* CTA Button */}
        <button className="bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-lg">
          Try It Free Now
        </button>
      </div>
    </section>
  )
}

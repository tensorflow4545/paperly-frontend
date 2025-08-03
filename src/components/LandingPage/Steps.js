"use client"

export default function StepsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Create Your Invoice in 3 Simple Steps</h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8"></div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <div className="w-8 h-8"></div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
              <div className="w-8 h-8"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Start with Blank Template</h3>
              <p className="text-gray-600 leading-relaxed">
                Begin with a clean slate and build your invoice from scratch with our powerful editor.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add Your Details</h3>
              <p className="text-gray-600 leading-relaxed">
                Include your business info, client details, services rendered, and payment terms.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Send to Client</h3>
              <p className="text-gray-600 leading-relaxed">
                Download as PDF, share via email, or send a payment link directly to your client.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

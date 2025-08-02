"use client"

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-[#FFF8E1]">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Invoice Like a Pro
          </h2>
          <p className="text-base sm:text-lg text-gray-600">Zero design hassle. Drag. Drop. Share.</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Professional Templates */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-200">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Templates</h3>
            <p className="text-gray-600 leading-relaxed">
              Choose from sleek, customizable templates designed for Indian businesses.
            </p>
          </div>

          {/* Drag & Drop Builder */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-200">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Drag & Drop Builder</h3>
            <p className="text-gray-600 leading-relaxed">
              Intuitive interface to customize your invoice layout with modular blocks.
            </p>
          </div>

          {/* One Tap Share */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-200">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">One Tap Share</h3>
            <p className="text-gray-600 leading-relaxed">
              Send polished documents in seconds to clients with, clear payment terms, and sleek formatting.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

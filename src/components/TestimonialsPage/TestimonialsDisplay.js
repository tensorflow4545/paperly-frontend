"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, MessageCircle, User, Calendar, Filter } from "lucide-react"

export default function TestimonialsDisplay() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterRating, setFilterRating] = useState('all')
  const [sortOrder, setSortOrder] = useState('newest')
  
  const testimonialsPerPage = 9

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://paperly-backend-five.vercel.app/api/take-feedback')
      
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials')
      }

      const data = await response.json()
      setTestimonials(data.feedbacks || [])
    } catch (err) {
      console.error('Error fetching testimonials:', err)
      setError('Failed to load testimonials. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort testimonials
  const filteredTestimonials = testimonials
    .filter(testimonial => {
      if (filterRating === 'all') return true
      return testimonial.star === parseInt(filterRating)
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortOrder === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else if (sortOrder === 'highest') {
        return b.star - a.star
      } else if (sortOrder === 'lowest') {
        return a.star - b.star
      }
      return 0
    })

  // Pagination
  const totalPages = Math.ceil(filteredTestimonials.length / testimonialsPerPage)
  const startIndex = (currentPage - 1) * testimonialsPerPage
  const currentTestimonials = filteredTestimonials.slice(startIndex, startIndex + testimonialsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return (
      <div className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-yellow-300 border-t-yellow-600 rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Testimonials</h3>
              <p className="text-gray-600">Fetching the latest feedback from our users...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <MessageCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-800 mb-2">Unable to Load Testimonials</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={fetchTestimonials}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center border border-gray-200">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{testimonials.length}+</div>
            <div className="text-sm text-gray-600">Total Testimonials</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl text-center border border-yellow-200">
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-yellow-800">
              {testimonials.length > 0 
                ? (testimonials.reduce((sum, t) => sum + t.star, 0) / testimonials.length).toFixed(1)
                : '0'
              }
            </div>
            <div className="text-sm text-yellow-600">Average Rating</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center border border-gray-200">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {testimonials.filter(t => t.star >= 4).length}
            </div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Filter & Sort</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Rating Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Rating:</label>
                <select
                  value={filterRating}
                  onChange={(e) => {
                    setFilterRating(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              {/* Sort Order */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Sort:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Showing {startIndex + 1}-{Math.min(startIndex + testimonialsPerPage, filteredTestimonials.length)} of {filteredTestimonials.length} testimonials
          </p>
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #fbbf24 #f3f4f6;
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          
          @media (min-width: 640px) {
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 2px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            border-radius: 2px;
            transition: background 0.3s ease;
            min-height: 20px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #f59e0b, #d97706);
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:active {
            background: linear-gradient(135deg, #d97706, #b45309);
          }
        `}</style>

        {/* Testimonials Grid */}
        {currentTestimonials.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-8 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Testimonials Found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
                          {currentTestimonials.map((testimonial) => (
                <div key={testimonial._id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 h-64 sm:h-72 flex flex-col touch-manipulation">
                {/* Header - Fixed */}
                <div className="flex items-start justify-between p-4 pb-3 sm:p-6 sm:pb-4 flex-shrink-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs sm:text-sm">
                        {getInitials(testimonial.name)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                      <div className="flex items-center gap-1 sm:gap-2 mt-1">
                        {renderStars(testimonial.star)}
                        <span className="text-xs text-gray-500">({testimonial.star}/5)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span className="hidden sm:inline">{formatDate(testimonial.createdAt)}</span>
                    <span className="sm:hidden">{formatDate(testimonial.createdAt).split(',')[0]}</span>
                  </div>
                </div>

                {/* Feedback Content - Scrollable */}
                <div className="flex-1 px-4 sm:px-6 overflow-hidden">
                  <div className="h-full overflow-y-auto custom-scrollbar pr-1 sm:pr-2">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-sm">
                      "{testimonial.feedback}"
                    </p>
                  </div>
                </div>

                {/* Footer - Fixed */}
                <div className="p-4 pt-3 sm:p-6 sm:pt-4 border-t border-gray-100 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Verified Customer
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium text-gray-700">{testimonial.star}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-colors ${
                currentPage === 1
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === page
                    ? "bg-[#FEFCE8] border-yellow-300 text-gray-900 font-medium"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

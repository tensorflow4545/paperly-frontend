"use client"

import { motion } from 'framer-motion'

export default function ElementsSidebar({ onClose, onAddElement }) {
  const renderIcon = (iconName) => {
    const iconClasses = "w-5 h-5 text-gray-600"
    switch (iconName) {
      case 'settings':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      case 'clock':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'bar-chart':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      case 'tag':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        )
      case 'calculator':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      case 'calendar':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'building':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'edit':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        )
      case 'credit-card':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        )
      case 'x-circle':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'shield-check':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      case 'phone':
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )
      default:
        return (
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const elements = [
    // Basic Invoice Elements
    {
      id: 'service-item',
      name: 'Service Item',
      icon: 'settings',
      description: 'Add a service with description and pricing',
      category: 'basic'
    },

    // Billing Elements
    {
      id: 'time-tracking',
      name: 'Time Tracking',
      icon: 'clock',
      description: 'Time-based billing with hours and rates',
      category: 'billing'
    },

    // Advanced Elements
    {
      id: 'pricing-table',
      name: 'Pricing Table',
      icon: 'bar-chart',
      description: 'Professional pricing table with multiple tiers',
      category: 'advanced'
    },
    {
      id: 'discount-section',
      name: 'Discount Section',
      icon: 'tag',
      description: 'Apply discounts and promotional codes',
      category: 'advanced'
    },
    {
      id: 'tax-breakdown',
      name: 'Tax Breakdown',
      icon: 'calculator',
      description: 'Detailed tax calculation breakdown',
      category: 'advanced'
    },
    {
      id: 'payment-schedule',
      name: 'Payment Schedule',
      icon: 'calendar',
      description: 'Installment payment schedule',
      category: 'advanced'
    },

    // Branding Elements
    // {
    //   id: 'logo-upload',
    //   name: 'Logo Upload',
    //   icon: 'image',
    //   description: 'Upload your business logo',
    //   category: 'branding'
    // },
    {
      id: 'company-header',
      name: 'Company Header',
      icon: 'building',
      description: 'Professional company header section',
      category: 'branding'
    },
    {
      id: 'signature-section',
      name: 'Signature Section',
      icon: 'edit',
      description: 'Digital signature area',
      category: 'branding'
    },
    // {
    //   id: 'stamp-seal',
    //   name: 'Stamp & Seal',
    //   icon: 'stamp',
    //   description: 'Add official stamp or seal',
    //   category: 'branding'
    // },

    // Legal & Terms
    {
      id: 'payment-terms',
      name: 'Payment Terms',
      icon: 'credit-card',
      description: 'Standard payment terms and conditions',
      category: 'legal'
    },
    {
      id: 'late-fees',
      name: 'Late Fees',
      icon: 'clock',
      description: 'Late payment fee structure',
      category: 'legal'
    },
    {
      id: 'cancellation-policy',
      name: 'Cancellation Policy',
      icon: 'x-circle',
      description: 'Cancellation terms and conditions',
      category: 'legal'
    },
    {
      id: 'warranty-info',
      name: 'Warranty Information',
      icon: 'shield-check',
      description: 'Warranty and guarantee details',
      category: 'legal'
    },

    // Additional Elements
    {
      id: 'payment-info',
      name: 'Payment Information',
      icon: 'credit-card',
      description: 'Payment methods and details',
      category: 'basic'
    },
    {
      id: 'contact-info',
      name: 'Contact Information',
      icon: 'phone',
      description: 'Business contact details',
      category: 'basic'
    }
  ]

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData('application/json', JSON.stringify(element))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleElementClick = (element) => {
    onAddElement(element)
  }

  const renderElement = (element) => (
    <motion.div
      key={element.id}
      draggable
      onDragStart={(e) => handleDragStart(e, element)}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleElementClick(element)}
      className="p-4 rounded-lg border cursor-pointer transition-colors border-gray-200 hover:bg-yellow-50 text-gray-700"
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {renderIcon(element.icon)}
        </div>
        <div className="flex-1">
          <div className="font-medium">{element.name}</div>
          <div className="text-xs text-gray-500">
            {element.description}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            handleElementClick(element)
          }}
          className="p-2 rounded-lg hover:bg-yellow-100 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )

  const renderCategorySection = (title, items, category) => (
    <div className="mb-6">
      <h4 className="text-sm font-semibold mb-3 px-2 text-gray-700 bg-yellow-50 py-1 rounded-lg">
        {title}
      </h4>
      <div className="space-y-2">
        {items.filter(item => item.category === category).map(renderElement)}
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="w-80 h-full border-r bg-white border-gray-200"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Invoice Elements
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto h-full">
        <div className="space-y-4">
          <div className="text-xs font-medium mb-4 px-3 py-2 text-gray-600 bg-yellow-50 rounded-lg border border-yellow-200">
            Drag elements to add them to your invoice or click the + button
          </div>
          
          {renderCategorySection('Basic Elements', elements, 'basic')}
          {renderCategorySection('Billing Elements', elements, 'billing')}
          {renderCategorySection('Advanced Elements', elements, 'advanced')}
          {renderCategorySection('Branding Elements', elements, 'branding')}
          {renderCategorySection('Legal & Terms', elements, 'legal')}
        </div>
      </div>
    </motion.div>
  )
} 
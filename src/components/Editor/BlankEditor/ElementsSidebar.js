"use client"

import { motion } from 'framer-motion'

export default function ElementsSidebar({ onClose, onAddElement }) {
  const elements = [
    // Basic Invoice Elements
    {
      id: 'service-item',
      name: 'Service Item',
      icon: '⚙️',
      description: 'Add a service with description and pricing',
      category: 'basic'
    },

    // Billing Elements
    {
      id: 'time-tracking',
      name: 'Time Tracking',
      icon: '⏱️',
      description: 'Time-based billing with hours and rates',
      category: 'billing'
    },

    // Advanced Elements
    {
      id: 'pricing-table',
      name: 'Pricing Table',
      icon: '📊',
      description: 'Professional pricing table with multiple tiers',
      category: 'advanced'
    },
    {
      id: 'discount-section',
      name: 'Discount Section',
      icon: '🎫',
      description: 'Apply discounts and promotional codes',
      category: 'advanced'
    },
    {
      id: 'tax-breakdown',
      name: 'Tax Breakdown',
      icon: '🧮',
      description: 'Detailed tax calculation breakdown',
      category: 'advanced'
    },
    {
      id: 'payment-schedule',
      name: 'Payment Schedule',
      icon: '📅',
      description: 'Installment payment schedule',
      category: 'advanced'
    },

    // Branding Elements
    {
      id: 'logo-upload',
      name: 'Logo Upload',
      icon: '🖼️',
      description: 'Upload your business logo',
      category: 'branding'
    },
    {
      id: 'company-header',
      name: 'Company Header',
      icon: '🏢',
      description: 'Professional company header section',
      category: 'branding'
    },
    {
      id: 'signature-section',
      name: 'Signature Section',
      icon: '✍️',
      description: 'Digital signature area',
      category: 'branding'
    },
    {
      id: 'stamp-seal',
      name: 'Stamp & Seal',
      icon: '🔖',
      description: 'Add official stamp or seal',
      category: 'branding'
    },

    // Legal & Terms
    {
      id: 'payment-terms',
      name: 'Payment Terms',
      icon: '💳',
      description: 'Standard payment terms and conditions',
      category: 'legal'
    },
    {
      id: 'late-fees',
      name: 'Late Fees',
      icon: '⏰',
      description: 'Late payment fee structure',
      category: 'legal'
    },
    {
      id: 'cancellation-policy',
      name: 'Cancellation Policy',
      icon: '❌',
      description: 'Cancellation terms and conditions',
      category: 'legal'
    },
    {
      id: 'warranty-info',
      name: 'Warranty Information',
      icon: '🛡️',
      description: 'Warranty and guarantee details',
      category: 'legal'
    },

    // Additional Elements
    {
      id: 'payment-info',
      name: 'Payment Information',
      icon: '💳',
      description: 'Payment methods and details',
      category: 'basic'
    },
    {
      id: 'contact-info',
      name: 'Contact Information',
      icon: '📞',
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
      className="p-4 rounded-lg border cursor-pointer transition-colors border-gray-200 hover:bg-gray-50 text-gray-700"
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{element.icon}</span>
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
          className="p-1 rounded hover:bg-gray-200"
        >
          +
        </motion.button>
      </div>
    </motion.div>
  )

  const renderCategorySection = (title, items, category) => (
    <div className="mb-6">
      <h4 className="text-sm font-semibold mb-3 px-2 text-gray-600">
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
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Invoice Elements
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100"
          >
            ✕
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto h-full">
        <div className="space-y-4">
          <div className="text-xs font-medium mb-4 px-2 text-gray-500">
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
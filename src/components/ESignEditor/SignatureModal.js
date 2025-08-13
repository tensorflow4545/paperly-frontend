"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Type, X, Palette, Check } from 'lucide-react'

export default function SignatureModal({ isOpen, onClose, onSignatureSelect }) {
  const [signatureText, setSignatureText] = useState('')
  const [selectedFont, setSelectedFont] = useState('cursive')
  const [selectedColor, setSelectedColor] = useState('#1f2937')

  const signatureFonts = [
    { 
      id: 'cursive', 
      name: 'Elegant Script', 
      family: 'cursive',
      preview: 'John Doe',
      description: 'Classic handwritten style'
    },
    { 
      id: 'dancing', 
      name: 'Modern Script', 
      family: 'var(--font-dancing-script), cursive',
      preview: 'John Doe',
      description: 'Contemporary flowing style'
    },
    { 
      id: 'satisfy', 
      name: 'Casual Script', 
      family: 'var(--font-satisfy), cursive',
      preview: 'John Doe',
      description: 'Relaxed handwritten feel'
    },
    { 
      id: 'great-vibes', 
      name: 'Artistic Script', 
      family: 'var(--font-great-vibes), cursive',
      preview: 'John Doe',
      description: 'Artistic flowing signature'
    },
    { 
      id: 'sacramento', 
      name: 'Formal Script', 
      family: 'var(--font-sacramento), cursive',
      preview: 'John Doe',
      description: 'Professional elegant style'
    },
    { 
      id: 'allura', 
      name: 'Bold Script', 
      family: 'var(--font-allura), cursive',
      preview: 'John Doe',
      description: 'Bold and confident'
    }
  ]

  const signatureColors = [
    { name: 'Classic Black', value: '#1f2937' },
    { name: 'Navy Blue', value: '#1e40af' },
    { name: 'Forest Green', value: '#166534' },
    { name: 'Deep Purple', value: '#7c3aed' },
    { name: 'Burgundy', value: '#991b1b' },
    { name: 'Dark Brown', value: '#92400e' }
  ]

  const handleCreateSignature = () => {
    if (!signatureText.trim()) {
      alert('Please enter your signature text')
      return
    }

    const signature = {
      type: 'text',
      text: signatureText.trim(),
      font: selectedFont,
      color: selectedColor,
      timestamp: Date.now()
    }

    onSignatureSelect(signature)
    onClose()
    setSignatureText('')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Type className="w-4 h-4 text-gray-800" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-800">Text Signature</h2>
                <p className="text-xs text-gray-500">Type your name and choose a style</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Text Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name or Signature Text
              </label>
              <input
                type="text"
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)}
                placeholder="Enter your full name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-base"
                autoFocus
              />
            </div>

            {/* Live Preview */}
            {signatureText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4 text-yellow-600" />
                  Preview
                </h3>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                  <span
                    style={{
                      fontFamily: signatureFonts.find(f => f.id === selectedFont)?.family,
                      color: selectedColor,
                      fontSize: '28px',
                      fontWeight: '400'
                    }}
                  >
                    {signatureText}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Font Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Signature Style</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {signatureFonts.map((font) => (
                  <motion.button
                    key={font.id}
                    onClick={() => setSelectedFont(font.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                      selectedFont === font.id
                        ? 'border-yellow-400 bg-yellow-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800 text-sm">{font.name}</span>
                      {selectedFont === font.id && (
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-gray-800" />
                        </div>
                      )}
                    </div>
                    <div 
                      style={{ 
                        fontFamily: font.family,
                        fontSize: '20px',
                        color: selectedColor
                      }}
                      className="mb-1"
                    >
                      {signatureText || font.preview}
                    </div>
                    <span className="text-xs text-gray-500">{font.description}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Color
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {signatureColors.map((color) => (
                  <motion.button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-2 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
                      selectedColor === color.value
                        ? 'border-yellow-400 bg-yellow-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200 flex-shrink-0"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-sm font-medium text-gray-700">{color.name}</span>
                    {selectedColor === color.value && (
                      <Check className="w-4 h-4 text-gray-600 ml-auto" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3 border-t border-gray-100">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleCreateSignature}
                disabled={!signatureText.trim()}
                whileHover={{ scale: signatureText.trim() ? 1.02 : 1 }}
                whileTap={{ scale: signatureText.trim() ? 0.98 : 1 }}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  signatureText.trim()
                    ? 'bg-yellow-500 text-gray-800 hover:bg-yellow-600 shadow-sm'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Create Signature
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

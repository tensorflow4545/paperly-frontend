"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, FileText, AlertCircle, Check } from 'lucide-react'

export default function UploadModal({ isOpen, onClose, onFileUpload }) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFile = async (file) => {
    setError('')
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only.')
      return
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.')
      return
    }
    
    setUploading(true)
    
    // Simulate upload delay for better UX
    setTimeout(() => {
      onFileUpload(file)
      setUploading(false)
    }, 1000)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
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
          className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
                <Upload className="w-3 h-3 text-gray-800" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-800">Upload PDF</h2>
                <p className="text-xs text-gray-500">Select a PDF file to add signatures</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-50 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Upload Area */}
          <div className="p-4">
            <div
              className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-yellow-400 bg-yellow-50' 
                  : 'border-gray-300 hover:border-yellow-400 hover:bg-yellow-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {uploading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mb-2 animate-pulse">
                    <FileText className="w-4 h-4 text-gray-800" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Uploading...</p>
                  <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-yellow-500"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-4 h-4 text-white" />
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-800 mb-1">
                    Drop PDF here or{' '}
                    <button
                      onClick={openFileDialog}
                      className="text-yellow-600 underline hover:text-yellow-700 transition-colors"
                    >
                      browse
                    </button>
                  </h3>
                  
                  <p className="text-xs text-gray-500 mb-3">
                    Up to 10MB
                  </p>
                  
                  <motion.button
                    onClick={openFileDialog}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-yellow-500 text-gray-800 px-4 py-2 rounded font-medium hover:bg-yellow-600 transition-all duration-200 flex items-center gap-2 mx-auto text-sm"
                  >
                    <FileText className="w-3 h-3" />
                    Select File
                  </motion.button>
                </>
              )}
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2"
                >
                  <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                  <span className="text-xs text-red-700">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* File Requirements */}
            <div className="mt-3 bg-gray-50 rounded p-3">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2 text-xs">
                <Check className="w-3 h-3 text-yellow-600" />
                Requirements
              </h4>
              <ul className="space-y-1 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  PDF format only
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  Max 10MB
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  Text content works best
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

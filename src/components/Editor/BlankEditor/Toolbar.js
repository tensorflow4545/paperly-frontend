"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Toolbar({ onClose }) {
  const [activeFormat, setActiveFormat] = useState(null)

  const formatOptions = [
    { name: 'bold', icon: 'B', command: 'bold' },
    { name: 'italic', icon: 'I', command: 'italic' },
    { name: 'underline', icon: 'U', command: 'underline' },
    { name: 'strikethrough', icon: 'S', command: 'strikethrough' },
  ]

  const alignmentOptions = [
    { name: 'left', icon: '⫷', command: 'justifyLeft' },
    { name: 'center', icon: '⫸', command: 'justifyCenter' },
    { name: 'right', icon: '⫹', command: 'justifyRight' },
    { name: 'justify', icon: '⫺', command: 'justifyFull' },
  ]

  const headingOptions = [
    { name: 'h1', label: 'H1', command: 'formatBlock', value: 'h1' },
    { name: 'h2', label: 'H2', command: 'formatBlock', value: 'h2' },
    { name: 'h3', label: 'H3', command: 'formatBlock', value: 'h3' },
  ]

  const handleFormat = (format) => {
    document.execCommand(format.command, false, format.value || null)
    setActiveFormat(format.name)
  }

  const handleInsertElement = (type) => {
    switch (type) {
      case 'image':
        const url = prompt('Enter image URL:')
        if (url) {
          document.execCommand('insertImage', false, url)
        }
        break
      case 'link':
        const linkUrl = prompt('Enter URL:')
        const linkText = prompt('Enter link text:')
        if (linkUrl && linkText) {
          document.execCommand('createLink', false, linkUrl)
        }
        break
      case 'hr':
        document.execCommand('insertHorizontalRule', false, null)
        break
      default:
        break
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 rounded-lg shadow-lg border bg-white border-gray-200"
    >
      <div className="flex items-center space-x-1 p-2">
        {/* Text Formatting */}
        <div className="flex items-center space-x-1 border-r pr-2">
          {formatOptions.map((format) => (
            <motion.button
              key={format.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFormat(format)}
              className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                activeFormat === format.name
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {format.icon}
            </motion.button>
          ))}
        </div>

        {/* Alignment */}
        <div className="flex items-center space-x-1 border-r pr-2">
          {alignmentOptions.map((align) => (
            <motion.button
              key={align.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFormat(align)}
              className="w-8 h-8 rounded flex items-center justify-center text-sm transition-colors hover:bg-gray-100 text-gray-700"
            >
              {align.icon}
            </motion.button>
          ))}
        </div>

        {/* Headings */}
        <div className="flex items-center space-x-1 border-r pr-2">
          {headingOptions.map((heading) => (
            <motion.button
              key={heading.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFormat(heading)}
              className="px-2 py-1 rounded text-xs font-medium transition-colors hover:bg-gray-100 text-gray-700"
            >
              {heading.label}
            </motion.button>
          ))}
        </div>

        {/* Insert Elements */}
        <div className="flex items-center space-x-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleInsertElement('image')}
            className="w-8 h-8 rounded flex items-center justify-center text-sm transition-colors hover:bg-gray-100 text-gray-700"
            title="Insert Image"
          >
            🖼️
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleInsertElement('link')}
            className="w-8 h-8 rounded flex items-center justify-center text-sm transition-colors hover:bg-gray-100 text-gray-700"
            title="Insert Link"
          >
            🔗
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleInsertElement('hr')}
            className="w-8 h-8 rounded flex items-center justify-center text-sm transition-colors hover:bg-gray-100 text-gray-700"
            title="Insert Divider"
          >
            ➖
          </motion.button>
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-8 h-8 rounded flex items-center justify-center text-sm transition-colors hover:bg-red-100 text-gray-700"
        >
          ✕
        </motion.button>
      </div>
    </motion.div>
  )
} 
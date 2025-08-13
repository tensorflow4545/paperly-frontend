"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pen, X, RotateCcw, Check, Palette } from 'lucide-react'

export default function DrawingSignature({ isOpen, onClose, onSignatureCreate }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const [strokeColor, setStrokeColor] = useState('#1f2937')
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [canvasEmpty, setCanvasEmpty] = useState(true)

  const strokeColors = [
    { name: 'Classic Black', value: '#1f2937' },
    { name: 'Navy Blue', value: '#1e40af' },
    { name: 'Forest Green', value: '#166534' },
    { name: 'Deep Purple', value: '#7c3aed' },
    { name: 'Burgundy', value: '#991b1b' },
    { name: 'Dark Brown', value: '#92400e' }
  ]

  const strokeWidths = [
    { name: 'Fine', value: 1 },
    { name: 'Normal', value: 2 },
    { name: 'Bold', value: 3 },
    { name: 'Extra Bold', value: 4 }
  ]

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      // Set canvas size
      canvas.width = 500
      canvas.height = 200
      
      // Clear canvas and set initial styles
      clearCanvas()
    }
  }, [isOpen])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Clear the canvas (transparent background)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Set drawing styles
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    
    setCanvasEmpty(true)
  }

  const getPosition = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const startDrawing = (e) => {
    setIsDrawing(true)
    const pos = getPosition(e)
    setLastPosition(pos)
    setCanvasEmpty(false)
  }

  const draw = (e) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const currentPosition = getPosition(e)
    
    ctx.beginPath()
    ctx.moveTo(lastPosition.x, lastPosition.y)
    ctx.lineTo(currentPosition.x, currentPosition.y)
    ctx.stroke()
    
    setLastPosition(currentPosition)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  // Touch events for mobile
  const handleTouchStart = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    startDrawing(mouseEvent)
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    draw(mouseEvent)
  }

  const handleTouchEnd = (e) => {
    e.preventDefault()
    stopDrawing()
  }

  const handleColorChange = (color) => {
    setStrokeColor(color)
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.strokeStyle = color
    }
  }

  const handleWidthChange = (width) => {
    setStrokeWidth(width)
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.lineWidth = width
    }
  }

  const saveSignature = () => {
    if (canvasEmpty) {
      alert('Please draw your signature first')
      return
    }

    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL('image/png')
    
    const signature = {
      type: 'drawing',
      dataUrl,
      color: strokeColor,
      strokeWidth,
      timestamp: Date.now()
    }

    onSignatureCreate(signature)
    onClose()
    clearCanvas()
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
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                <Pen className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-800">Draw Signature</h2>
                <p className="text-xs text-gray-500">Use your mouse or finger to sign</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="p-4">
            {/* Drawing Controls */}
            <div className="mb-4 space-y-3">
              {/* Stroke Color */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {strokeColors.map((color) => (
                    <motion.button
                      key={color.value}
                      onClick={() => handleColorChange(color.value)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                        strokeColor === color.value
                          ? 'border-yellow-400 shadow-sm scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Stroke Width */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Thickness</h3>
                <div className="flex gap-2">
                  {strokeWidths.map((width) => (
                    <motion.button
                      key={width.value}
                      onClick={() => handleWidthChange(width.value)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        strokeWidth === width.value
                          ? 'bg-yellow-500 text-gray-800 shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {width.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawing Canvas */}
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="border rounded-lg cursor-crosshair touch-none"
                    style={{ maxWidth: '100%', height: '200px' }}
                  />
                  {canvasEmpty && (
                    <p className="text-gray-500 text-sm mt-2">
                      Click and drag to draw your signature
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={clearCanvas}
                disabled={canvasEmpty}
                whileHover={{ scale: canvasEmpty ? 1 : 1.02 }}
                whileTap={{ scale: canvasEmpty ? 1 : 0.98 }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  canvasEmpty
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </motion.button>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </motion.button>

              <motion.button
                onClick={saveSignature}
                disabled={canvasEmpty}
                whileHover={{ scale: canvasEmpty ? 1 : 1.02 }}
                whileTap={{ scale: canvasEmpty ? 1 : 0.98 }}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  canvasEmpty
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-500 text-gray-800 hover:bg-yellow-600 shadow-sm'
                }`}
              >
                <Check className="w-4 h-4" />
                Use Signature
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

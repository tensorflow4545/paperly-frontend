"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  Download, 
  Type, 
  Pen, 
  Palette, 
  RotateCcw, 
  Check, 
  X,
  ZoomIn,
  ZoomOut,
  Send,
  Save
} from 'lucide-react'
import { getAuthToken } from '@/utils/auth'

// PDF.js will be loaded dynamically to avoid SSR issues
let pdfjsLib = null

export default function EnterpriseDocumentEditor({ documentData, onClose, onDocumentSigned }) {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [showDrawingModal, setShowDrawingModal] = useState(false)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [signatures, setSignatures] = useState([])
  const [currentSignature, setCurrentSignature] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [canvasScale, setCanvasScale] = useState(1.5)
  const [isLoadingPdf, setIsLoadingPdf] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedSignature, setDraggedSignature] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizedSignature, setResizedSignature] = useState(null)
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const pdfCanvasRef = useRef(null)     // PDF content only
  const signatureCanvasRef = useRef(null) // Signatures only
  const containerRef = useRef(null)

  // Load PDF from document data
  useEffect(() => {
    if (documentData?.supabaseLink) {
      const loadPdfFromUrl = async () => {
        setIsLoadingPdf(true)
        try {
          // Fetch PDF from Supabase URL
          const response = await fetch(documentData.supabaseLink)
          if (!response.ok) {
            throw new Error('Failed to fetch PDF')
          }
          
          const blob = await response.blob()
          const file = new File([blob], documentData.documentTitle || 'document.pdf', { type: 'application/pdf' })
          setUploadedFile(file)
          
          // Create URL for the file
          const url = URL.createObjectURL(file)
          setPdfUrl(url)
        } catch (error) {
          console.error('Error loading PDF from URL:', error)
          alert('Failed to load PDF. Please try again.')
        } finally {
          setIsLoadingPdf(false)
        }
      }
      
      loadPdfFromUrl()
    }
  }, [documentData])

  // Load PDF using PDF.js
  useEffect(() => {
    if (uploadedFile) {
      const loadPdf = async () => {
        setIsLoadingPdf(true)
        try {
          // Wait for PDF.js to be loaded
          if (!pdfjsLib) {
            const pdfjs = await import('pdfjs-dist')
            pdfjsLib = pdfjs
            // Use local worker file from public directory
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
          }
          
          const arrayBuffer = await uploadedFile.arrayBuffer()
          let loadingTask
          
          try {
            // Try with worker first
            loadingTask = pdfjsLib.getDocument({
              data: arrayBuffer,
              disableWorker: false
            })
          } catch (workerError) {
            console.warn('Worker failed, trying without worker:', workerError)
            // Fallback: disable worker
            pdfjsLib.GlobalWorkerOptions.workerSrc = false
            loadingTask = pdfjsLib.getDocument({
              data: arrayBuffer,
              disableWorker: true
            })
          }
          
          const pdf = await loadingTask.promise
          setPdfDoc(pdf)
          setTotalPages(pdf.numPages)
          setCurrentPage(1)
        } catch (error) {
          console.error('Error loading PDF:', error)
          alert('Failed to load PDF. Please try a different file.')
        } finally {
          setIsLoadingPdf(false)
        }
      }
      loadPdf()
      
      return () => {
        if (pdfUrl) {
          URL.revokeObjectURL(pdfUrl)
        }
      }
    }
  }, [uploadedFile])

  // Render PDF page on PDF canvas only
  useEffect(() => {
    if (pdfDoc && pdfCanvasRef.current) {
      renderPdfPage(currentPage)
    }
  }, [pdfDoc, currentPage, canvasScale])

  const renderPdfPage = async (pageNum) => {
    if (!pdfDoc || !pdfCanvasRef.current) return
    
    try {
      const page = await pdfDoc.getPage(pageNum)
      const canvas = pdfCanvasRef.current
      const context = canvas.getContext('2d')
      
      const viewport = page.getViewport({ scale: canvasScale })
      canvas.width = viewport.width
      canvas.height = viewport.height
      
      // Clear previous content
      context.clearRect(0, 0, canvas.width, canvas.height)
      
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }
      
      await page.render(renderContext).promise
      
      // Setup signature canvas to match PDF canvas dimensions
      if (signatureCanvasRef.current) {
        signatureCanvasRef.current.width = canvas.width
        signatureCanvasRef.current.height = canvas.height
        // Render signatures on separate canvas
        drawSignatures()
      }
    } catch (error) {
      console.error('Error rendering page:', error)
    }
  }

  const drawSignatures = () => {
    if (!signatureCanvasRef.current) return
    
    const canvas = signatureCanvasRef.current
    const context = canvas.getContext('2d')
    
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw signatures for current page
    signatures
      .filter(sig => sig.page === currentPage)
      .forEach(signature => {
        if (signature.type === 'text') {
          drawTextSignature(context, signature)
        } else if (signature.type === 'drawing') {
          drawDrawingSignature(context, signature)
        }
      })
  }

  const drawTextSignature = (context, signature) => {
    const fontSize = Math.min(signature.width / signature.text.length * 1.2, signature.height * 0.6)
    const fontFamily = signature.fontFamily || signature.font || 'cursive'
    
    context.font = `${fontSize}px ${fontFamily}, cursive, serif`
    context.fillStyle = signature.color || '#000000'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    
    context.fillText(signature.text, signature.x + signature.width / 2, signature.y + signature.height / 2)
  }

  const drawDrawingSignature = (context, signature) => {
    if (signature.drawingData) {
      const img = new Image()
      img.onload = () => {
        context.drawImage(img, signature.x, signature.y, signature.width, signature.height)
      }
      img.src = signature.drawingData
    }
  }

  const handleCanvasClick = (e) => {
    // Only handle clicks when placing a signature
    if (!currentSignature || !pdfCanvasRef.current) return
    
    // Prevent default for touch events
    if (e.type === 'touchstart') {
      e.preventDefault()
    }
    
    // Get click/touch position relative to PDF canvas
    const rect = pdfCanvasRef.current.getBoundingClientRect()
    const canvas = pdfCanvasRef.current
    
    // Handle both mouse and touch events
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY
    
    // Calculate precise click coordinates
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY
    
    // Create signature with canvas coordinates and mobile-optimized sizing
    const isMobile = window.innerWidth < 768
    const drawingWidth = isMobile ? 150 : 200
    const drawingHeight = isMobile ? 60 : 80
    const textWidth = isMobile ? 120 : 160
    const textHeight = isMobile ? 40 : 50
    
    const newSignature = {
      id: Date.now(),
      ...currentSignature,
      x,
      y,
      width: currentSignature.type === 'drawing' ? drawingWidth : textWidth,
      height: currentSignature.type === 'drawing' ? drawingHeight : textHeight,
      page: currentPage
    }
    
    setSignatures([...signatures, newSignature])
    setCurrentSignature(null)
  }

  const removeSignature = (signatureId) => {
    setSignatures(signatures.filter(sig => sig.id !== signatureId))
  }

  // Handle signature creation
  const handleCreateTextSignature = (text, font, color) => {
    setCurrentSignature({
      type: 'text',
      text,
      font,
      color,
      fontFamily: font
    })
    setShowSignatureModal(false)
  }

  const handleCreateDrawingSignature = (drawingData) => {
    setCurrentSignature({
      type: 'drawing',
      drawingData
    })
    setShowDrawingModal(false)
  }

  // Navigation functions
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleZoomIn = () => {
    setCanvasScale(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setCanvasScale(prev => Math.max(prev - 0.2, 0.5))
  }

  // Handle document signing and upload
  const handleSignDocument = async () => {
    if (!uploadedFile || signatures.length === 0) {
      alert('Please add at least one signature before signing the document.')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Import PDF-lib dynamically
      const { PDFDocument } = await import('pdf-lib')
      
      setUploadProgress(20)
      
      // Read the uploaded PDF
      const existingPdfBytes = await uploadedFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const pages = pdfDoc.getPages()
      
      setUploadProgress(40)
      
      // Add signatures to each page based on their page number
      for (const signature of signatures) {
        const targetPage = pages[signature.page - 1] || pages[0]
        const { width: pageWidth, height: pageHeight } = targetPage.getSize()
        
        const canvas = pdfCanvasRef.current
        if (!canvas) continue
        
        const canvasWidth = canvas.width
        const canvasHeight = canvas.height
        
        if (signature.type === 'text') {
          // Map canvas coordinates to PDF coordinates
          const relativeX = (signature.x / canvasWidth) * pageWidth
          const relativeY = pageHeight - ((signature.y / canvasHeight) * pageHeight)
          
          const baseFontSize = Math.min(signature.width / signature.text.length * 1.2, signature.height * 0.6)
          const fontSize = baseFontSize * (pageWidth / canvasWidth)
          const textWidth = signature.text.length * fontSize * 0.6
          
          const offsetY = 8 * (pageWidth / canvasWidth)
          
          const finalX = Math.max(20, Math.min(relativeX - textWidth/2, pageWidth - textWidth - 20))
          const finalY = Math.max(20, Math.min(relativeY - fontSize/2 + offsetY, pageHeight - 20))
          
          // Create canvas to render text with exact font
          const textCanvas = document.createElement('canvas')
          const textContext = textCanvas.getContext('2d')
          
          const padding = 20
          const canvasFontSize = Math.min(signature.width / signature.text.length * 1.2, signature.height * 0.6)
          textCanvas.width = signature.text.length * canvasFontSize + padding * 2
          textCanvas.height = canvasFontSize + padding * 2
          
          const fontFamily = signature.fontFamily || signature.font || 'cursive'
          textContext.font = `${canvasFontSize}px ${fontFamily}, cursive, serif`
          textContext.fillStyle = signature.color || '#000000'
          textContext.textAlign = 'center'
          textContext.textBaseline = 'middle'
          
          textContext.fillText(signature.text, textCanvas.width / 2, textCanvas.height / 2)
          
          const imageData = textCanvas.toDataURL('image/png')
          
          try {
            const pngImageBytes = imageData.split(',')[1]
            const pngImage = await pdfDoc.embedPng(`data:image/png;base64,${pngImageBytes}`)
            
            const imageWidth = textCanvas.width * (pageWidth / canvasWidth)
            const imageHeight = textCanvas.height * (pageHeight / canvasHeight)
            
            const imageX = finalX - (imageWidth - textWidth) / 2
            const imageY = finalY - (imageHeight - fontSize) / 2
            
            targetPage.drawImage(pngImage, {
              x: imageX,
              y: imageY,
              width: imageWidth,
              height: imageHeight
            })
          } catch (error) {
            console.error('Error embedding text as image:', error)
          }
        } else if (signature.type === 'drawing' && signature.drawingData) {
          // Handle drawing signatures
          try {
            const pngImageBytes = signature.drawingData.split(',')[1]
            const pngImage = await pdfDoc.embedPng(`data:image/png;base64,${pngImageBytes}`)
            
            const relativeX = (signature.x / canvasWidth) * pageWidth
            const relativeY = pageHeight - ((signature.y / canvasHeight) * pageHeight)
            
            const imageWidth = signature.width * (pageWidth / canvasWidth)
            const imageHeight = signature.height * (pageHeight / canvasHeight)
            
            targetPage.drawImage(pngImage, {
              x: relativeX,
              y: relativeY,
              width: imageWidth,
              height: imageHeight
            })
          } catch (error) {
            console.error('Error embedding drawing signature:', error)
          }
        }
      }
      
      setUploadProgress(60)
      
      // Generate signed PDF
      const signedPdfBytes = await pdfDoc.save()
      
      setUploadProgress(80)
      
      // Upload to API
      const token = getAuthToken()
      if (!token) {
        throw new Error('Authentication token not found')
      }
      
      const formData = new FormData()
      const signedPdfBlob = new Blob([signedPdfBytes], { type: 'application/pdf' })
      formData.append('file', signedPdfBlob, `${documentData.documentTitle || 'signed-document'}.pdf`)
      
      // Add metadata if available
      if (documentData.metadata) {
        formData.append('metadata', JSON.stringify(documentData.metadata))
      }
      
      if (documentData.tags) {
        formData.append('tags', JSON.stringify(documentData.tags))
      }
      
      const response = await fetch(`https://paperly-backend-five.vercel.app/api/adminDocumentUpload/${documentData._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload signed document')
      }
      
      const result = await response.json()
      
      setUploadProgress(100)
      
      // Call success callback
      if (onDocumentSigned) {
        onDocumentSigned(result.data)
      }
      
      // Close editor
      if (onClose) {
        onClose()
      }
      
    } catch (error) {
      console.error('Error signing document:', error)
      alert(`Failed to sign document: ${error.message}`)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  if (isLoadingPdf) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading PDF...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-7xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Sign Document: {documentData?.documentTitle || 'Document'}
              </h2>
              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Toolbar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Document Info */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Document Info</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-2 text-gray-900">{documentData?.documentType}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Employee:</span>
                    <span className="ml-2 text-gray-900">{documentData?.employeeName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className="ml-2 text-gray-900">{documentData?.status}</span>
                  </div>
                </div>
              </div>

              {/* Signature Tools */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Add Signature</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowSignatureModal(true)}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                  >
                    <Type className="w-4 h-4" />
                    <span>Text Signature</span>
                  </button>
                  
                  <button
                    onClick={() => setShowDrawingModal(true)}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-md transition-colors"
                  >
                    <Pen className="w-4 h-4" />
                    <span>Draw Signature</span>
                  </button>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Zoom</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600 min-w-[3rem] text-center">
                    {Math.round(canvasScale * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Signatures List */}
              {signatures.length > 0 && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Signatures ({signatures.length})</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {signatures.map((signature) => (
                      <div
                        key={signature.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                      >
                        <span className="text-sm text-gray-700 truncate">
                          {signature.type === 'text' ? signature.text : 'Drawing'}
                        </span>
                        <button
                          onClick={() => removeSignature(signature.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sign Document Button */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <button
                  onClick={handleSignDocument}
                  disabled={isUploading || signatures.length === 0}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-300 text-white font-medium rounded-md transition-colors"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      <span>Signing... {uploadProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Sign & Upload Document</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* PDF Navigation */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>

            {/* PDF Canvas */}
            <div 
              ref={containerRef}
              className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4"
              style={{ cursor: currentSignature ? 'crosshair' : 'default' }}
              onClick={handleCanvasClick}
            >
              <div className="relative">
                <canvas
                  ref={pdfCanvasRef}
                  className="border border-gray-300 shadow-lg"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
                <canvas
                  ref={signatureCanvasRef}
                  className="absolute top-0 left-0 pointer-events-none"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showSignatureModal && (
            <SignatureModal
              onClose={() => setShowSignatureModal(false)}
              onSignatureCreate={handleCreateTextSignature}
            />
          )}
          
          {showDrawingModal && (
            <DrawingSignature
              onClose={() => setShowDrawingModal(false)}
              onSignatureCreate={handleCreateDrawingSignature}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Signature Modal Component
function SignatureModal({ onClose, onSignatureCreate }) {
  const [text, setText] = useState('')
  const [font, setFont] = useState('cursive')
  const [color, setColor] = useState('#000000')

  const fonts = [
    { name: 'Cursive', value: 'cursive' },
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Times New Roman', value: 'Times New Roman, serif' },
    { name: 'Courier New', value: 'Courier New, monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' }
  ]

  const colors = [
    '#000000', '#0000FF', '#FF0000', '#008000', '#800080', '#FFA500', '#A52A2A'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onSignatureCreate(text.trim(), font, color)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Text Signature</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Signature Text
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your signature"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font
            </label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              {fonts.map((fontOption) => (
                <option key={fontOption.value} value={fontOption.value}>
                  {fontOption.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex space-x-2">
              {colors.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  onClick={() => setColor(colorOption)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === colorOption ? 'border-gray-900' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: colorOption }}
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
            >
              Create Signature
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Drawing Signature Component
function DrawingSignature({ onClose, onSignatureCreate }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      setContext(ctx)
    }
  }, [])

  const startDrawing = (e) => {
    setIsDrawing(true)
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    context.beginPath()
    context.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const saveSignature = () => {
    const dataUrl = canvasRef.current.toDataURL()
    onSignatureCreate(dataUrl)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Draw Your Signature</h3>
        
        <div className="border-2 border-gray-300 rounded-md mb-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-48 cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={clearCanvas}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveSignature}
            className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
          >
            Save Signature
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

"use client"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
// PDF.js will be loaded dynamically to avoid SSR issues
let pdfjsLib = null
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
  ZoomOut
} from 'lucide-react'
import UploadModal from './UploadModal'
import SignatureModal from './SignatureModal'
import DrawingSignature from './DrawingSignature'

export default function ESignEditor({ initialFile = null }) {
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState(initialFile)
  const [showUploadModal, setShowUploadModal] = useState(false)
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
  const pdfCanvasRef = useRef(null)     // PDF content only
  const signatureCanvasRef = useRef(null) // Signatures only
  const containerRef = useRef(null)
  const lastUpdateTime = useRef(0)

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
          
          // Create URL for download functionality
          const url = URL.createObjectURL(uploadedFile)
          setPdfUrl(url)
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



  const handleFileUpload = async (file) => {
    // Only redirect if we don't already have an initial file (meaning we're on the main e-sign page)
    if (!initialFile) {
      // Convert file to base64 for storing in sessionStorage
      const reader = new FileReader()
      reader.onload = () => {
        const base64Data = reader.result
        sessionStorage.setItem('esign-pdf-data', base64Data)
        sessionStorage.setItem('esign-pdf-name', file.name)
        
        // Redirect to the dedicated editor page
        router.push('/e-sign-editor')
      }
      reader.readAsDataURL(file)
    } else {
      // If we're already on the editor page, just update the file
      setUploadedFile(file)
      setShowUploadModal(false)
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

  // Dragging functionality
  const handleMouseDown = (e, signature) => {
    e.stopPropagation()
    
    // Handle both mouse and touch events
    const isTouch = e.type === 'touchstart'
    if (!isTouch && e.button !== 0) return // Only left mouse button for mouse events
    if (isTouch) e.preventDefault() // Prevent scrolling on touch
    
    const rect = pdfCanvasRef.current.getBoundingClientRect()
    const scaleX = pdfCanvasRef.current.width / rect.width
    const scaleY = pdfCanvasRef.current.height / rect.height
    
    // Get coordinates from mouse or touch event
    const clientX = isTouch ? e.touches[0].clientX : e.clientX
    const clientY = isTouch ? e.touches[0].clientY : e.clientY
    
    const mouseX = (clientX - rect.left) * scaleX
    const mouseY = (clientY - rect.top) * scaleY
    
    setIsDragging(true)
    setDraggedSignature(signature.id)
    setDragOffset({
      x: mouseX - signature.x,
      y: mouseY - signature.y
    })
  }

  const handleResizeStart = (e, signature) => {
    e.stopPropagation()
    
    // Only allow resizing on desktop
    if (window.innerWidth < 768) return
    
    const isTouch = e.type === 'touchstart'
    if (!isTouch && e.button !== 0) return
    if (isTouch) e.preventDefault()
    
    const rect = pdfCanvasRef.current.getBoundingClientRect()
    const scaleX = pdfCanvasRef.current.width / rect.width
    const scaleY = pdfCanvasRef.current.height / rect.height
    
    const clientX = isTouch ? e.touches[0].clientX : e.clientX
    const clientY = isTouch ? e.touches[0].clientY : e.clientY
    
    const mouseX = (clientX - rect.left) * scaleX
    const mouseY = (clientY - rect.top) * scaleY
    
    setIsResizing(true)
    setResizedSignature(signature.id)
    setResizeStart({
      x: mouseX,
      y: mouseY,
      width: signature.width,
      height: signature.height
    })
  }

  const handleMouseMove = (e) => {
    if ((!isDragging && !isResizing) || (!draggedSignature && !resizedSignature) || !pdfCanvasRef.current) return
    
    // Throttle updates to prevent too many re-renders
    const now = Date.now()
    if (now - lastUpdateTime.current < 16) return // ~60fps limit
    lastUpdateTime.current = now
    
    const isTouch = e.type === 'touchmove'
    if (isTouch) e.preventDefault() // Prevent scrolling on touch
    
    const rect = pdfCanvasRef.current.getBoundingClientRect()
    const scaleX = pdfCanvasRef.current.width / rect.width
    const scaleY = pdfCanvasRef.current.height / rect.height
    
    // Get coordinates from mouse or touch event
    const clientX = isTouch ? e.touches[0].clientX : e.clientX
    const clientY = isTouch ? e.touches[0].clientY : e.clientY
    
    const mouseX = (clientX - rect.left) * scaleX
    const mouseY = (clientY - rect.top) * scaleY
    
    if (isDragging && draggedSignature) {
      const newX = mouseX - dragOffset.x
      const newY = mouseY - dragOffset.y
      
      setSignatures(signatures.map(sig => 
        sig.id === draggedSignature 
          ? { ...sig, x: newX, y: newY }
          : sig
      ))
    } else if (isResizing && resizedSignature) {
      const deltaX = mouseX - resizeStart.x
      const deltaY = mouseY - resizeStart.y
      
      const newWidth = Math.max(50, resizeStart.width + deltaX)
      const newHeight = Math.max(30, resizeStart.height + deltaY)
      
      setSignatures(signatures.map(sig => 
        sig.id === resizedSignature 
          ? { ...sig, width: newWidth, height: newHeight }
          : sig
      ))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggedSignature(null)
    setDragOffset({ x: 0, y: 0 })
    setIsResizing(false)
    setResizedSignature(null)
    setResizeStart({ x: 0, y: 0, width: 0, height: 0 })
    // Signatures will automatically re-render via useEffect
  }

  // Add global mouse and touch event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleMouseMove, { passive: false })
      document.addEventListener('touchend', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleMouseMove)
        document.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, draggedSignature, resizedSignature, dragOffset, resizeStart, signatures])

  // Draw signatures on separate signature canvas
  const drawSignatures = async () => {
    if (!signatureCanvasRef.current) return
    
    const canvas = signatureCanvasRef.current
    const context = canvas.getContext('2d')
    
    // Clear signature canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw signatures for current page
    const pageSignatures = signatures.filter(sig => sig.page === currentPage)
    
    for (const signature of pageSignatures) {
      // Skip the signature being dragged (it will be shown as overlay)
      if (isDragging && signature.id === draggedSignature) continue
      
      context.save()
      
      if (signature.type === 'text') {
                  // Draw text signature centered on click point with dynamic font size
          const fontSize = Math.min(signature.width / signature.text.length * 1.2, signature.height * 0.6)
          context.font = `${fontSize}px ${signature.fontFamily || signature.font || 'cursive'}`
          context.fillStyle = signature.color || '#000000'
          context.textAlign = 'center'
          context.textBaseline = 'middle'
          context.fillText(signature.text, signature.x, signature.y)
      } else if (signature.type === 'drawing') {
        // Draw signature from drawing data (either dataUrl or paths)
        if (signature.dataUrl) {
          // Load and draw the image from dataUrl
          await new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
              // Center the signature on the click point
              const drawX = signature.x - (signature.width / 2)
              const drawY = signature.y - (signature.height / 2)
              context.drawImage(img, drawX, drawY, signature.width, signature.height)
              resolve()
            }
            img.onerror = () => {
              console.error('Failed to load signature image')
              resolve()
            }
            img.src = signature.dataUrl
          })
        } else if (signature.data && signature.data.length > 0) {
          // Legacy: Draw from path data
          context.strokeStyle = signature.color || '#000000'
          context.lineWidth = signature.thickness || 2
          context.lineCap = 'round'
          context.lineJoin = 'round'
          
          signature.data.forEach(path => {
            if (path.length > 1) {
              context.beginPath()
              context.moveTo(
                signature.x + (path[0].x * signature.width / 300), 
                signature.y + (path[0].y * signature.height / 150)
              )
              for (let i = 1; i < path.length; i++) {
                context.lineTo(
                  signature.x + (path[i].x * signature.width / 300), 
                  signature.y + (path[i].y * signature.height / 150)
                )
              }
              context.stroke()
            }
          })
        }
      }
      
      context.restore()
    }
  }

  // Redraw signatures when they change
  useEffect(() => {
    if (signatureCanvasRef.current) {
      drawSignatures()
    }
  }, [signatures, currentPage, isDragging])

    const handleZoom = (direction) => {
    const newScale = direction === 'in' 
      ? Math.min(canvasScale * 1.2, 3)
      : Math.max(canvasScale / 1.2, 0.5)
    setCanvasScale(newScale)
    
    // Force re-render of PDF after zoom
    if (pdfDoc && currentPage) {
      setTimeout(() => {
        renderPdfPage(currentPage)
      }, 50)
    }
  }

  const handleDownload = async () => {
    if (!uploadedFile || signatures.length === 0) {
      alert('Please upload a PDF and add at least one signature before downloading.')
      return
    }

    try {
      // Import PDF-lib dynamically
      const { PDFDocument, rgb } = await import('pdf-lib')
      
      // Read the uploaded PDF
      const existingPdfBytes = await uploadedFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      const { width, height } = firstPage.getSize()

      // Add signatures to each page based on their page number
      for (const signature of signatures) {
        // Get the target page
        const targetPage = pages[signature.page - 1] || firstPage
        const { width: pageWidth, height: pageHeight } = targetPage.getSize()
        
        // Get canvas dimensions for coordinate mapping
        const canvas = pdfCanvasRef.current
        if (!canvas) continue
        
        const canvasWidth = canvas.width
        const canvasHeight = canvas.height
        
        if (signature.type === 'text') {
          // Map canvas coordinates to PDF coordinates (signature.x,y is center point)
          const relativeX = (signature.x / canvasWidth) * pageWidth
          const relativeY = pageHeight - ((signature.y / canvasHeight) * pageHeight)
          
          // Get text dimensions for centering with dynamic font size
          const baseFontSize = Math.min(signature.width / signature.text.length * 1.2, signature.height * 0.6)
          const fontSize = baseFontSize * (pageWidth / canvasWidth)
          const textWidth = signature.text.length * fontSize * 0.6 // Approximate text width
          
          // Add small offset correction for better positioning alignment
          const offsetY = 8 * (pageWidth / canvasWidth) // Scale the offset based on canvas scale
          
          const finalX = Math.max(20, Math.min(relativeX - textWidth/2, pageWidth - textWidth - 20))
          const finalY = Math.max(20, Math.min(relativeY - fontSize/2 + offsetY, pageHeight - 20))
          

          
          targetPage.drawText(signature.text, {
            x: finalX,
            y: finalY,
            size: fontSize,
            color: rgb(
              parseInt(signature.color.slice(1, 3), 16) / 255,
              parseInt(signature.color.slice(3, 5), 16) / 255,
              parseInt(signature.color.slice(5, 7), 16) / 255
            ),
            font: await pdfDoc.embedFont('Helvetica')
          })
        } else if (signature.type === 'drawing') {
          // For drawing signatures, embed the image
          try {
            const pngImageBytes = signature.dataUrl.split(',')[1]
            const pngImage = await pdfDoc.embedPng(`data:image/png;base64,${pngImageBytes}`)
            
            // Map canvas coordinates to PDF coordinates (signature.x,y is center point)
            const centerX = (signature.x / canvasWidth) * pageWidth
            const centerY = pageHeight - ((signature.y / canvasHeight) * pageHeight)
            
            // Scale signature dimensions
            const scaledWidth = signature.width * (pageWidth / canvasWidth)
            const scaledHeight = signature.height * (pageHeight / canvasHeight)
            
            // Add small offset correction for better positioning alignment
            const offsetY = 8 * (pageWidth / canvasWidth) // Scale the offset based on canvas scale
            
            // Position image centered on the click point
            const imageX = centerX - (scaledWidth / 2)
            const imageY = centerY - (scaledHeight / 2) + offsetY
            
            const finalX = Math.max(0, Math.min(imageX, pageWidth - scaledWidth))
            const finalY = Math.max(0, Math.min(imageY, pageHeight - scaledHeight))
            

            
            targetPage.drawImage(pngImage, {
              x: finalX,
              y: finalY,
              width: Math.min(scaledWidth, pageWidth),
              height: Math.min(scaledHeight, pageHeight)
            })
          } catch (error) {
            console.error('Error embedding signature image:', error)
          }
        }
      }

      // Save the PDF
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      // Download the file
      const a = document.createElement('a')
      a.href = url
      a.download = `signed_${uploadedFile.name}`
      a.click()
      
      URL.revokeObjectURL(url)
      
      // Show success message
    } catch (error) {
      console.error('Error downloading signed PDF:', error)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  if (!uploadedFile) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center py-8 px-4  sm:mb-10"
      >
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-6">
            Professional{" "}
            <span className="text-gray-700 relative">
              e-Signature
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Upload any PDF document and add professional signatures with multiple styles and colors. 
            Perfect for contracts, agreements, and business documents.
          </p>
          
          <motion.button
            onClick={() => setShowUploadModal(true)}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-3 mx-auto shadow-md"
          >
            <Upload className="w-5 h-5" />
            Upload PDF Document
          </motion.button>
        </motion.div>
        
        <UploadModal 
          isOpen={showUploadModal} 
          onClose={() => setShowUploadModal(false)}
          onFileUpload={handleFileUpload}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-200px)]"
      style={{ backgroundColor: 'rgba(249, 250, 251, 0.65)' }}
    >
      {/* Desktop Header Toolbar */}
      <div className="hidden md:block bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800 truncate max-w-xs">
                {uploadedFile.name}
              </span>
            </div>
            
            <div className="flex items-center gap-2 border-l pl-4 ml-4">
              <button
                onClick={() => handleZoom('out')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={canvasScale <= 0.5}
              >
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-sm text-gray-600 min-w-[60px] text-center">
                {Math.round(canvasScale * 100)}%
              </span>
              <button
                onClick={() => handleZoom('in')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={canvasScale >= 3}
              >
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setShowSignatureModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentSignature?.type === 'text' 
                  ? 'bg-gray-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Type className="w-4 h-4" />
              Text Signature
            </motion.button>
            
            <motion.button
              onClick={() => setShowDrawingModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentSignature?.type === 'drawing' 
                  ? 'bg-gray-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Pen className="w-4 h-4" />
              Draw Signature
            </motion.button>
            
            <motion.button
              onClick={handleDownload}
              disabled={signatures.length === 0}
              whileHover={{ scale: signatures.length > 0 ? 1.02 : 1 }}
              whileTap={{ scale: signatures.length > 0 ? 0.98 : 1 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                signatures.length > 0
                  ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-500 shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Header - App-like design */}
      <div className="md:hidden bg-gray-800 text-white sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-yellow-400" />
            <div>
              <h1 className="text-sm font-medium truncate max-w-[200px]">
                {uploadedFile.name}
              </h1>
              <p className="text-xs text-gray-300">
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
          
          {signatures.length > 0 && (
            <motion.button
              onClick={handleDownload}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" />
              Done
            </motion.button>
          )}
        </div>
        
        {/* Mobile Progress Bar */}
        {signatures.length > 0 && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Check className="w-3 h-3 text-yellow-400" />
              {signatures.length} signature{signatures.length !== 1 ? 's' : ''} added
            </div>
          </div>
        )}
      </div>

      {/* PDF Editor Area - Click directly on PDF to sign */}
      <div className="p-1 md:p-4 min-h-[calc(100vh-200px)]" style={{ backgroundColor: 'rgba(249, 250, 251, 0.65)' }}>
        <div className="max-w-4xl mx-auto">
          {/* Simple instruction */}
          {currentSignature && (
            <div className="mb-2 md:mb-4 p-2 md:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs md:text-sm text-yellow-700">
                <span className="hidden md:inline">✨ Click anywhere on the PDF below to place your signature</span>
                <span className="md:hidden">👆 Tap on PDF to place signature</span>
              </p>
            </div>
          )}
          
          {/* Canvas-based PDF Viewer */}
          <div className="relative rounded-lg shadow-lg overflow-auto max-h-[75vh] md:max-h-[800px]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            {pdfDoc ? (
              <div className="relative p-2 md:p-4">
                {/* Page Navigation */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-4 p-2 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-2 md:px-3 py-1 bg-yellow-500 text-gray-800 rounded disabled:bg-gray-300 text-sm font-medium"
                    >
                      <span className="hidden md:inline">Previous</span>
                      <span className="md:hidden">←</span>
                    </button>
                    <span className="text-xs md:text-sm text-gray-600 min-w-[80px] text-center font-medium">
                      {currentPage}/{totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2 md:px-3 py-1 bg-yellow-500 text-gray-800 rounded disabled:bg-gray-300 text-sm font-medium"
                    >
                      <span className="hidden md:inline">Next</span>
                      <span className="md:hidden">→</span>
                    </button>
                  </div>
                )}
                
                {/* Dual Canvas System */}
                <div className="relative flex justify-center">
                  {/* PDF Canvas - Never re-rendered during drag */}
                  <canvas
                    ref={pdfCanvasRef}
                    onClick={handleCanvasClick}
                    onTouchStart={handleCanvasClick}
                    className={`border border-gray-300 rounded shadow-sm touch-manipulation w-full ${
                      currentSignature ? 'cursor-crosshair' : 'cursor-default'
                    }`}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      touchAction: 'manipulation',
                      display: 'block'
                    }}
                  />
                  
                  {/* Signature Overlay Canvas - Transparent layer for signatures */}
                  <canvas
                    ref={signatureCanvasRef}
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                  
                  {/* Interactive Signature Areas */}
                  {signatures.filter(sig => sig.page === currentPage).map((signature) => {
                    const canvas = pdfCanvasRef.current
                    if (!canvas) return null
                    
                    const rect = canvas.getBoundingClientRect()
                    const scaleX = rect.width / canvas.width
                    const scaleY = rect.height / canvas.height
                    
                    let displayX, displayY, displayWidth, displayHeight
                    
                    if (signature.type === 'text') {
                      displayX = signature.x * scaleX - (signature.width * scaleX) / 2
                      displayY = signature.y * scaleY - (signature.height * scaleY) / 2
                      displayWidth = signature.width * scaleX
                      displayHeight = signature.height * scaleY
                    } else {
                      displayX = (signature.x - signature.width / 2) * scaleX
                      displayY = (signature.y - signature.height / 2) * scaleY
                      displayWidth = signature.width * scaleX
                      displayHeight = signature.height * scaleY
                    }
                    
                    const isBeingDragged = draggedSignature === signature.id
                    const isBeingResized = resizedSignature === signature.id
                    
                    return (
                      <div
                        key={signature.id}
                        onMouseDown={(e) => handleMouseDown(e, signature)}
                        onTouchStart={(e) => handleMouseDown(e, signature)}
                        onDoubleClick={() => removeSignature(signature.id)}
                        className={`absolute transition-all duration-200 touch-manipulation ${
                          isBeingDragged || isBeingResized
                            ? 'border-2 border-yellow-400 border-dashed shadow-lg bg-transparent' 
                            : 'hover:border-2 hover:border-yellow-300 hover:border-dashed border-2 border-transparent'
                        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} flex items-center justify-center overflow-hidden group`}
                        style={{
                          left: `${displayX}px`,
                          top: `${displayY}px`,
                          width: `${displayWidth}px`,
                          height: `${displayHeight}px`,
                          zIndex: (isBeingDragged || isBeingResized) ? 1000 : 10,
                          pointerEvents: currentSignature ? 'none' : 'auto',
                          backgroundColor: 'transparent'
                        }}
                        title="Drag to move, double-click to delete"
                      >
                        {/* Show actual signature content during drag */}
                        {(isBeingDragged || isBeingResized) && (
                          <div className="w-full h-full flex items-center justify-center">
                            {signature.type === 'text' ? (
                                                              <span 
                                  style={{
                                    fontFamily: signature.fontFamily || signature.font || 'cursive',
                                    fontSize: `${Math.min(displayWidth / signature.text.length * 1.2, displayHeight * 0.6)}px`,
                                    color: signature.color || '#000000',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    textShadow: '1px 1px 2px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8)'
                                  }}
                                >
                                {signature.text}
                              </span>
                            ) : signature.dataUrl ? (
                              <img 
                                src={signature.dataUrl} 
                                alt="Signature"
                                className="max-w-full max-h-full object-contain"
                                style={{
                                  filter: 'drop-shadow(1px 1px 2px rgba(255,255,255,0.8))'
                                }}
                              />
                            ) : (
                              <span className="text-xs text-gray-500">Signature</span>
                            )}
                          </div>
                        )}

                        {/* Desktop Resize Handles */}
                        <div className="hidden md:block">
                          {/* Bottom-right resize handle */}
                          <div
                            onMouseDown={(e) => handleResizeStart(e, signature)}
                            onTouchStart={(e) => handleResizeStart(e, signature)}
                            className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-500 border border-yellow-600 rounded-bl cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ zIndex: 1001 }}
                            title="Drag to resize"
                          />
                          
                          {/* Bottom-left resize handle */}
                          <div
                            onMouseDown={(e) => handleResizeStart(e, signature)}
                            onTouchStart={(e) => handleResizeStart(e, signature)}
                            className="absolute bottom-0 left-0 w-4 h-4 bg-yellow-500 border border-yellow-600 rounded-br cursor-sw-resize opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ zIndex: 1001 }}
                            title="Drag to resize"
                          />
                          
                          {/* Top-right resize handle */}
                          <div
                            onMouseDown={(e) => handleResizeStart(e, signature)}
                            onTouchStart={(e) => handleResizeStart(e, signature)}
                            className="absolute top-0 right-0 w-4 h-4 bg-yellow-500 border border-yellow-600 rounded-tl cursor-ne-resize opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ zIndex: 1001 }}
                            title="Drag to resize"
                          />
                          
                          {/* Top-left resize handle */}
                          <div
                            onMouseDown={(e) => handleResizeStart(e, signature)}
                            onTouchStart={(e) => handleResizeStart(e, signature)}
                            className="absolute top-0 left-0 w-4 h-4 bg-yellow-500 border border-yellow-600 rounded-tr cursor-nw-resize opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ zIndex: 1001 }}
                            title="Drag to resize"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                {isLoadingPdf ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading PDF...</p>
                  </div>
                ) : (
                  <p>Upload a PDF to start signing</p>
                )}
              </div>
            )}
          </div>
          

          
          {signatures.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 md:mt-4 bg-white rounded-lg p-3 md:p-4 shadow-md border border-gray-200"
            >
              <h3 className="font-medium text-gray-800 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                <Check className="w-4 h-4 text-yellow-600" />
                <span className="hidden md:inline">Fixed Signatures Ready ({signatures.length})</span>
                <span className="md:hidden">{signatures.length} signature{signatures.length !== 1 ? 's' : ''} added</span>
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 hidden md:block">
                 Your signatures are locked in position and will be permanently embedded in the PDF when you download. Click a signature to remove it.
              </p>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {signatures.map((sig, index) => (
                  <span
                    key={sig.id}
                    className="bg-gray-100 text-gray-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center gap-1 md:gap-2"
                  >
                    {sig.type === 'text' ? (
                      <Type className="w-3 h-3" />
                    ) : (
                      <Pen className="w-3 h-3" />
                    )}
                    <span className="hidden md:inline">Signature {index + 1}</span>
                    <span className="md:hidden">{index + 1}</span>
                    <button
                      onClick={() => removeSignature(sig.id)}
                      className="hover:text-red-600 transition-colors ml-1"
                      title="Delete this signature"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Floating Action Buttons */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        {!currentSignature ? (
          <div className="flex gap-2 justify-center">
            <motion.button
              onClick={() => setShowSignatureModal(true)}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 p-3 rounded-full shadow-lg flex items-center justify-center min-w-[52px] h-[52px]"
            >
              <Type className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setShowDrawingModal(true)}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center min-w-[52px] h-[52px]"
            >
              <Pen className="w-5 h-5" />
            </motion.button>
          </div>
        ) : (
          <div className="flex gap-2 justify-center items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-yellow-500 text-gray-800 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium"
              style={{ backgroundColor: 'rgba(234, 179, 8, 0.9)' }}
            >
              <Check className="w-3 h-3" />
              Tap PDF to place
            </motion.div>
            <motion.button
              onClick={() => {
                setCurrentSignature(null)
                setShowSignatureModal(false)
                setShowDrawingModal(false)
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Mobile Zoom Controls */}
      <div className="md:hidden fixed top-20 right-3 z-40 flex flex-col gap-2">
        <motion.button
          onClick={() => handleZoom('in')}
          disabled={canvasScale >= 3}
          whileTap={{ scale: 0.9 }}
          className="bg-white text-gray-700 p-3 rounded-full shadow-lg border border-gray-200 disabled:opacity-50 touch-manipulation"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <ZoomIn className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={() => handleZoom('out')}
          disabled={canvasScale <= 0.5}
          whileTap={{ scale: 0.9 }}
          className="bg-white text-gray-700 p-3 rounded-full shadow-lg border border-gray-200 disabled:opacity-50 touch-manipulation"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <ZoomOut className="w-4 h-4" />
        </motion.button>
        {/* Zoom indicator */}
        <div className="text-center">
          <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full text-center min-w-[44px] shadow-lg" style={{ backgroundColor: 'rgba(31, 41, 55, 0.85)' }}>
            {Math.round(canvasScale * 100)}%
          </div>
        </div>
      </div>

      {/* Modals */}
      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSignatureSelect={setCurrentSignature}
      />
      
      <DrawingSignature
        isOpen={showDrawingModal}
        onClose={() => setShowDrawingModal(false)}
        onSignatureCreate={setCurrentSignature}
      />
    </motion.div>
  )
}

// Individual signature element component - FIXED POSITIONING
function SignatureElement({ signature, onRemove, containerOffset }) {
  const elementRef = useRef(null)
  
  // Calculate absolute position based on container offset
  const absoluteLeft = containerOffset.left + signature.x
  const absoluteTop = containerOffset.top + signature.y

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="group cursor-pointer border-2 border-dashed border-transparent hover:border-red-300 rounded pointer-events-auto select-none bg-white shadow-lg"
      style={{
        position: 'fixed',
        left: `${absoluteLeft}px`,
        top: `${absoluteTop}px`,
        width: `${signature.width}px`,
        height: `${signature.height}px`,
        zIndex: 1001,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        touchAction: 'none',
        pointerEvents: 'auto'
      }}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      {/* Signature Content */}
      <div className="w-full h-full flex items-center justify-center pointer-events-none select-none">
        {signature.type === 'text' ? (
          <span
                          style={{
                color: signature.color,
                fontFamily: signature.fontFamily || signature.font || 'cursive',
                fontSize: '18px',
                fontWeight: signature.font === 'bold' ? 'bold' : 'normal',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none'
            }}
          >
            {signature.text}
          </span>
        ) : (
          <img 
            src={signature.dataUrl} 
            alt="Signature" 
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        )}
      </div>
      
      {/* Remove button - Now more prominent since it's the only action */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove(signature.id)
        }}
        className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110 shadow-md"
        title="Delete signature"
      >
        <X className="w-4 h-4" />
      </button>
      
      {/* Lock indicator */}
      <div className="absolute top-1 left-1 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs" title="Locked signature">
        
      </div>
    </motion.div>
  )
}

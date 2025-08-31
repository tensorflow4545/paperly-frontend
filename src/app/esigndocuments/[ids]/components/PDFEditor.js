"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  Check,
  X
} from 'lucide-react';

// PDF.js will be loaded dynamically to avoid SSR issues
let pdfjsLib = null;

export default function PDFEditor({ 
  document, 
  signatures, 
  onSignaturePlacement, 
  onDocumentSigned, 
  currentSignature, 
  onRemoveSignature 
}) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [canvasScale, setCanvasScale] = useState(1.5);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  
  const pdfCanvasRef = useRef(null);
  const signatureCanvasRef = useRef(null);

  // Load PDF from URL
  useEffect(() => {
    if (document?.supabaseLink) {
      const loadPdf = async () => {
        setIsLoadingPdf(true);
        try {
          // Wait for PDF.js to be loaded
          if (!pdfjsLib) {
            const pdfjs = await import('pdfjs-dist');
            pdfjsLib = pdfjs;
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
          }
          
          // Fetch PDF from URL
          const response = await fetch(document.supabaseLink);
          const arrayBuffer = await response.arrayBuffer();
          
          const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            disableWorker: false
          });
          
          const pdf = await loadingTask.promise;
          setPdfDoc(pdf);
          setTotalPages(pdf.numPages);
          setCurrentPage(1);
        } catch (error) {
          console.error('Error loading PDF:', error);
          alert('Failed to load PDF. Please try again.');
        } finally {
          setIsLoadingPdf(false);
        }
      };
      loadPdf();
    }
  }, [document]);

  // Render PDF page
  useEffect(() => {
    if (pdfDoc && pdfCanvasRef.current) {
      renderPdfPage(currentPage);
    }
  }, [pdfDoc, currentPage, canvasScale]);

  const renderPdfPage = async (pageNum) => {
    if (!pdfDoc || !pdfCanvasRef.current) return;
    
    try {
      const page = await pdfDoc.getPage(pageNum);
      const canvas = pdfCanvasRef.current;
      const context = canvas.getContext('2d');
      
      const viewport = page.getViewport({ scale: canvasScale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
      
      if (signatureCanvasRef.current) {
        signatureCanvasRef.current.width = canvas.width;
        signatureCanvasRef.current.height = canvas.height;
        drawSignatures();
      }
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  };

  const handleCanvasClick = (e) => {
    if (!currentSignature || !pdfCanvasRef.current) return;
    
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
    
    const rect = pdfCanvasRef.current.getBoundingClientRect();
    const canvas = pdfCanvasRef.current;
    
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    const isMobile = window.innerWidth < 768;
    const drawingWidth = isMobile ? 150 : 200;
    const drawingHeight = isMobile ? 60 : 80;
    const textWidth = isMobile ? 120 : 160;
    const textHeight = isMobile ? 40 : 50;
    
    const signatureData = {
      x,
      y,
      width: currentSignature.type === 'drawing' ? drawingWidth : textWidth,
      height: currentSignature.type === 'drawing' ? drawingHeight : textHeight,
      page: currentPage
    };
    
    onSignaturePlacement(signatureData);
  };

  // Draw signatures
  const drawSignatures = async () => {
    if (!signatureCanvasRef.current) return;
    
    const canvas = signatureCanvasRef.current;
    const context = canvas.getContext('2d');
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    const pageSignatures = signatures.filter(sig => sig.page === currentPage);
    
    for (const signature of pageSignatures) {
      context.save();
      
      if (signature.type === 'text') {
        const fontSize = Math.min(signature.width / signature.text.length * 1.2, signature.height * 0.6);
        const fontFamily = signature.fontFamily || signature.font || 'cursive';
        const fontString = `${fontSize}px ${fontFamily}, cursive, serif`;
        
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
        
        context.font = fontString;
        context.fillStyle = signature.color || '#000000';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(signature.text, signature.x, signature.y);
      } else if (signature.type === 'drawing' && signature.dataUrl) {
        await new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => {
            const drawWidth = signature.width;
            const drawHeight = signature.height;
            const drawX = signature.x - drawWidth / 2;
            const drawY = signature.y - drawHeight / 2;
            
            context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
            resolve();
          };
          image.onerror = reject;
          image.src = signature.dataUrl;
        });
      }
      
      context.restore();
    }
  };

  useEffect(() => {
    if (signatureCanvasRef.current) {
      drawSignatures();
    }
  }, [signatures, currentPage]);

  const handleZoom = (direction) => {
    const newScale = direction === 'in' 
      ? Math.min(canvasScale * 1.2, 3)
      : Math.max(canvasScale / 1.2, 0.5);
    setCanvasScale(newScale);
    
    if (pdfDoc && currentPage) {
      setTimeout(() => {
        renderPdfPage(currentPage);
      }, 50);
    }
  };

  const handleDownload = async () => {
    if (!pdfDoc || signatures.length === 0) {
      alert('Please add at least one signature before signing.');
      return;
    }

    try {
      const { PDFDocument, rgb } = await import('pdf-lib');
      
      const response = await fetch(document.supabaseLink);
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();

      for (const signature of signatures) {
        const targetPage = pages[signature.page - 1] || pages[0];
        const { width: pageWidth, height: pageHeight } = targetPage.getSize();
        
        const canvas = pdfCanvasRef.current;
        if (!canvas) continue;
        
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        if (signature.type === 'text') {
          const relativeX = (signature.x / canvasWidth) * pageWidth;
          const relativeY = pageHeight - ((signature.y / canvasHeight) * pageHeight);
          
          const baseFontSize = Math.min(signature.width / signature.text.length * 1.2, signature.height * 0.6);
          const fontSize = baseFontSize * (pageWidth / canvasWidth);
          
          const fontId = signature.font || 'cursive';
          const fontMapping = {
            'cursive': 'Times-Roman',
            'dancing': 'Times-Bold',
            'satisfy': 'Times-Bold',
            'great-vibes': 'Times-Bold',
            'sacramento': 'Times-Bold',
            'allura': 'Times-Bold'
          };
          
          const pdfFontName = fontMapping[fontId] || 'Times-Roman';
          const pdfFont = await pdfDoc.embedFont(pdfFontName);
          
          targetPage.drawText(signature.text, {
            x: relativeX,
            y: relativeY,
            size: fontSize,
            color: rgb(0, 0, 0),
            font: pdfFont
          });
        } else if (signature.type === 'drawing' && signature.dataUrl) {
          try {
            const pngImageBytes = signature.dataUrl.split(',')[1];
            const pngImage = await pdfDoc.embedPng(`data:image/png;base64,${pngImageBytes}`);
            
            const centerX = (signature.x / canvasWidth) * pageWidth;
            const centerY = pageHeight - ((signature.y / canvasHeight) * pageHeight);
            
            const scaledWidth = signature.width * (pageWidth / canvasWidth);
            const scaledHeight = signature.height * (pageHeight / canvasHeight);
            
            const imageX = centerX - (scaledWidth / 2);
            const imageY = centerY - (scaledHeight / 2);
            
            targetPage.drawImage(pngImage, {
              x: imageX,
              y: imageY,
              width: scaledWidth,
              height: scaledHeight
            });
          } catch (error) {
            console.error('Error embedding signature image:', error);
          }
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      onDocumentSigned(blob);
      
    } catch (error) {
      console.error('Error creating signed PDF:', error);
      alert('Error creating signed PDF. Please try again.');
    }
  };

  if (!document?.supabaseLink) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🔗</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Document Not Available</h2>
          <p className="text-gray-600">This document link is not available or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-800">
              {document.documentTitle || 'Document'}
            </span>
            
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
          
          <button
            onClick={handleDownload}
            disabled={signatures.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              signatures.length > 0
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" />
            Sign Document
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {currentSignature && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                ✨ Click anywhere on the PDF below to place your signature
              </p>
            </div>
          )}
          
          <div className="relative rounded-lg shadow-lg overflow-auto max-h-[800px] bg-white">
            {pdfDoc ? (
              <div className="relative p-4">
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mb-4 p-2 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 text-sm font-medium"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600 min-w-[80px] text-center font-medium">
                      {currentPage}/{totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 text-sm font-medium"
                    >
                      Next
                    </button>
                  </div>
                )}
                
                <div className="relative flex justify-center">
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
                  
                  <canvas
                    ref={signatureCanvasRef}
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
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
                  <p>Loading document...</p>
                )}
              </div>
            )}
          </div>
          
          {signatures.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-white rounded-lg p-4 shadow-md border border-gray-200"
            >
              <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Signatures Ready ({signatures.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {signatures.map((sig, index) => (
                  <span
                    key={sig.id}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {sig.type === 'text' ? (
                      <span>Text: {sig.text}</span>
                    ) : (
                      <span>Drawing</span>
                    )}
                    <button
                      onClick={() => onRemoveSignature(sig.id)}
                      className="hover:text-red-600 transition-colors ml-1"
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
    </div>
  );
}

"use client"

import { useState } from "react"
import { ArrowLeft, Save, FileText, User, Building2, ShoppingCart, CreditCard, X, Plus, Trash2, Eye, Download, Share, Mail } from "lucide-react"
import InlineEditableInvoice from "./inline-editable-invoice"

export default function EditorLayout({ templateId, invoiceData, updateInvoiceData, updateItem, addItem, removeItem }) {
  const [activeEditPanel, setActiveEditPanel] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [clientEmail, setClientEmail] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const [shareMessage, setShareMessage] = useState("")

  // Custom scrollbar styles
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #94a3b8;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #64748b;
    }
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #94a3b8 #f1f5f9;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  `

  const templateNames = {
    quickbill: "QuickBill",
    standardpro: "StandardPro",
    businessedge: "BusinessEdge",
    contractorplus: "ContractorPlus",
    enterpriseinvoice: "EnterpriseInvoice",
    creativeagency: "CreativeAgency",
  }

  const closeEditPanel = () => {
    setActiveEditPanel(null)
    setEditingField(null)
  }

  const openEditPanel = (panel, field = null) => {
    setActiveEditPanel(panel)
    setEditingField(field)
  }

  const downloadInvoice = () => {
    // Create a temporary container to render the invoice
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'absolute'
    tempContainer.style.left = '-9999px'
    tempContainer.style.top = '0'
    tempContainer.style.width = '800px'
    tempContainer.style.backgroundColor = 'white'
    tempContainer.style.padding = '40px'
    tempContainer.style.fontFamily = 'Arial, sans-serif'
    tempContainer.style.fontSize = '14px'
    tempContainer.style.lineHeight = '1.4'
    tempContainer.style.color = '#000'
    
    // Generate the invoice HTML content
    const invoiceContent = generateInvoiceHTML()
    tempContainer.innerHTML = invoiceContent
    
    document.body.appendChild(tempContainer)
    
    // Use html2canvas and jsPDF for more reliable PDF generation
    import('html2canvas').then((html2canvas) => {
      import('jspdf').then((jsPDF) => {
        html2canvas.default(tempContainer, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 800,
          height: tempContainer.scrollHeight
        }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png')
          const pdf = new jsPDF.default('p', 'mm', 'a4')
          const imgWidth = 210
          const pageHeight = 295
          const imgHeight = (canvas.height * imgWidth) / canvas.width
          let heightLeft = imgHeight
          let position = 0

          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight
            pdf.addPage()
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight
          }

          pdf.save(`${invoiceData.invoiceNumber || 'invoice'}.pdf`)
          document.body.removeChild(tempContainer)
        }).catch((error) => {
          console.error('Canvas generation failed:', error)
          // Fallback to text download
          downloadAsText()
          document.body.removeChild(tempContainer)
        })
      }).catch(() => {
        // Fallback to text download
        downloadAsText()
        document.body.removeChild(tempContainer)
      })
    }).catch(() => {
      // Fallback to text download
      downloadAsText()
      document.body.removeChild(tempContainer)
    })
  }

  const downloadAsText = () => {
    const textContent = generateInvoiceText()
    const blob = new Blob([textContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${invoiceData.invoiceNumber || 'invoice'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareInvoice = async () => {
    if (!clientEmail.trim()) {
      setShareMessage("Please enter a valid email address")
      return
    }

    setIsSharing(true)
    setShareMessage("")

    try {
      // First, generate the PDF to get the document URL
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '0'
      tempContainer.style.width = '800px'
      tempContainer.style.backgroundColor = 'white'
      tempContainer.style.padding = '40px'
      tempContainer.style.fontFamily = 'Arial, sans-serif'
      tempContainer.style.fontSize = '14px'
      tempContainer.style.lineHeight = '1.4'
      tempContainer.style.color = '#000'
      
      const invoiceContent = generateInvoiceHTML()
      tempContainer.innerHTML = invoiceContent
      document.body.appendChild(tempContainer)

      // Generate PDF using html2canvas and jsPDF
      const html2canvas = await import('html2canvas')
      const jsPDF = await import('jspdf')
      
      const canvas = await html2canvas.default(tempContainer, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: tempContainer.scrollHeight,
        imageTimeout: 0,
        logging: false,
        removeContainer: true
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.8)
      const pdf = new jsPDF.default('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Convert PDF to data URL with compression
      const pdfDataUrl = pdf.output('datauristring', { compress: true })
      
      // Generate document ID
      const documentId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // Prepare request data
      const requestData = {
        documentId: documentId,
        documentURL: pdfDataUrl,
        clientEmail: clientEmail.trim()
      }

      // Check if data URL is too large (over 5MB)
      if (requestData.documentURL.length > 5000000) {
        // Create a simpler PDF with just text content
        const simplePdf = new jsPDF.default('p', 'mm', 'a4')
        simplePdf.setFontSize(12)
        simplePdf.text('INVOICE', 20, 20)
        simplePdf.text(`Invoice #: ${invoiceData.invoiceNumber || 'INV-001'}`, 20, 30)
        simplePdf.text(`Date: ${invoiceData.invoiceDate || 'Today'}`, 20, 40)
        simplePdf.text(`From: ${invoiceData.senderName || 'Your Name'}`, 20, 50)
        simplePdf.text(`To: ${invoiceData.recipientName || 'Client Name'}`, 20, 60)
        simplePdf.text(`Total: $${invoiceData.total.toFixed(2)}`, 20, 70)
        
        const simplePdfDataUrl = simplePdf.output('datauristring', { compress: true })
        requestData.documentURL = simplePdfDataUrl
      }

      // Send to API with data URL
      const response = await fetch('https://paperly-backend-five.vercel.app/api/shareInvoiceWithClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      const responseText = await response.text()

      if (response.ok) {
        setShareMessage("✓ Sent successfully!")
        setClientEmail("")
        // Don't close the modal immediately, let user see the success message
        setTimeout(() => {
          closeShareModal()
        }, 2000)
      } else {
        try {
          const errorData = JSON.parse(responseText)
          setShareMessage(`Failed to share: ${errorData.error || 'Unknown error'}`)
        } catch (parseError) {
          setShareMessage(`Failed to share: HTTP ${response.status} - ${responseText}`)
        }
      }

      // Cleanup
      document.body.removeChild(tempContainer)

    } catch (error) {
      setShareMessage("Failed to share invoice. Please try again.")
    } finally {
      setIsSharing(false)
    }
  }

  const closeShareModal = () => {
    setShowShareModal(false)
    setShareMessage("")
    setClientEmail("")
  }

  const renderShareForm = () => {
    if (!showShareModal) return null

    return (
      <>
        {/* Desktop Share Form - Keep existing */}
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 z-50 hidden lg:block">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#fefce8] rounded">
                <Mail className="w-3 h-3 text-black" />
              </div>
              <span className="text-sm font-medium text-gray-700">Share Invoice</span>
            </div>
            
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Enter client email"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-sm"
            />
            
            <div className="flex gap-2">
              <button
                onClick={shareInvoice}
                disabled={isSharing || !clientEmail.trim()}
                className="flex-1 px-3 py-2 bg-[#fefce8] text-black rounded-md font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f7f3d0] flex items-center justify-center gap-1 text-sm"
              >
                {isSharing ? (
                  <>
                    <div className="w-3 h-3 border border-black border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : shareMessage && shareMessage.includes("successfully") ? (
                  <>
                    <span className="text-green-600">✓</span>
                    Sent!
                  </>
                ) : (
                  <>
                    <Share className="w-3 h-3" />
                    Send
                  </>
                )}
              </button>
              
              <button
                onClick={closeShareModal}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            
            {shareMessage && !shareMessage.includes("successfully") && (
              <div className={`p-2 rounded-md text-xs bg-red-50 text-red-700 border border-red-200`}>
                {shareMessage}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Share Form - Bottom Sheet */}
        <div 
          className="fixed inset-0 z-50 lg:hidden" 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#fefce8] rounded-lg">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Share Invoice</h3>
              </div>
              <button onClick={closeShareModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="Enter client email address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-base"
                />
              </div>
              
              <button
                onClick={shareInvoice}
                disabled={isSharing || !clientEmail.trim()}
                className="w-full py-4 bg-[#fefce8] text-black rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f7f3d0] flex items-center justify-center gap-2 text-base"
              >
                {isSharing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : shareMessage && shareMessage.includes("successfully") ? (
                  <>
                    <span className="text-green-600 text-lg">✓</span>
                    Sent Successfully!
                  </>
                ) : (
                  <>
                    <Share className="w-5 h-5" />
                    Send Invoice
                  </>
                )}
              </button>
              
              {shareMessage && !shareMessage.includes("successfully") && (
                <div className="p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
                  {shareMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  const generateInvoiceHTML = () => {
    const templateNames = {
      quickbill: "QuickBill",
      standardpro: "StandardPro", 
      businessedge: "BusinessEdge",
      contractorplus: "ContractorPlus",
      enterpriseinvoice: "EnterpriseInvoice",
      creativeagency: "CreativeAgency",
    }

    return `
      <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; color: #000; background: white;">
        <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
          <h1 style="margin: 0; color: #000; font-size: 28px; font-weight: bold;">INVOICE</h1>
          <p style="margin: 5px 0 0 0; color: #333; font-size: 16px;">${templateNames[templateId] || 'Professional Invoice'}</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div style="flex: 1; margin-right: 20px;">
            <h3 style="color: #000; margin-bottom: 10px; font-size: 16px; font-weight: bold;">From:</h3>
            <p style="font-weight: bold; margin: 5px 0; color: #000;">${invoiceData.senderName || 'Your Name'}</p>
            <p style="margin: 5px 0; color: #333;">${invoiceData.senderTitle || ''}</p>
            <p style="margin: 5px 0; color: #333;">${invoiceData.senderEmail || ''}</p>
            <p style="margin: 5px 0; color: #333;">${invoiceData.senderPhone || ''}</p>
            <p style="margin: 5px 0; color: #333;">${invoiceData.senderAddress || ''}</p>
          </div>
          <div style="flex: 1;">
            <h3 style="color: #000; margin-bottom: 10px; font-size: 16px; font-weight: bold;">To:</h3>
            <p style="font-weight: bold; margin: 5px 0; color: #000;">${invoiceData.recipientName || 'Client Name'}</p>
            <p style="margin: 5px 0; color: #333;">${invoiceData.recipientTitle || ''}</p>
            <p style="margin: 5px 0; color: #333;">${invoiceData.recipientEmail || ''}</p>
            <p style="margin: 5px 0; color: #333;">${invoiceData.recipientPhone || ''}</p>
            <p style="margin: 5px 0; color: #333;">${invoiceData.recipientAddress || ''}</p>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
            <div>
            <strong style="color: #000;">Invoice #:</strong><br>
            <span style="color: #000;">${invoiceData.invoiceNumber || 'INV-001'}</span>
          </div>
          <div>
            <strong style="color: #000;">Date:</strong><br>
            <span style="color: #000;">${invoiceData.invoiceDate || 'Today'}</span>
          </div>
          <div>
            <strong style="color: #000;">Due Date:</strong><br>
            <span style="color: #000;">${invoiceData.dueDate || '30 days'}</span>
          </div>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; border: 1px solid #dee2e6;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; color: #000; font-weight: bold;">Description</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6; color: #000; font-weight: bold;">Quantity</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6; color: #000; font-weight: bold;">Rate</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6; color: #000; font-weight: bold;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items.map(item => `
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #dee2e6; color: #000;">${item.description || 'Service'}</td>
                <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; color: #000;">${item.quantity}</td>
                <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; color: #000;">$${item.rate}</td>
                <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; color: #000; font-weight: bold;">$${item.amount.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div style="text-align: right; margin-top: 30px;">
          <div style="margin-bottom: 10px;">
            <span style="font-weight: bold; color: #000;">Subtotal:</span>
            <span style="margin-left: 20px; font-weight: bold; color: #000;">$${invoiceData.subtotal.toFixed(2)}</span>
          </div>
          ${invoiceData.taxRate > 0 ? `
            <div style="margin-bottom: 10px;">
              <span style="font-weight: bold; color: #000;">Tax (${invoiceData.taxRate}%):</span>
              <span style="margin-left: 20px; font-weight: bold; color: #000;">$${invoiceData.taxAmount.toFixed(2)}</span>
            </div>
          ` : ''}
          <div style="border-top: 2px solid #000; padding-top: 10px; font-size: 18px;">
            <span style="font-weight: bold; color: #000;">Total:</span>
            <span style="margin-left: 20px; font-weight: bold; color: #000;">$${invoiceData.total.toFixed(2)}</span>
          </div>
        </div>
        
        ${invoiceData.notes ? `
          <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
            <h4 style="margin: 0 0 10px 0; color: #000;">Notes:</h4>
            <p style="margin: 0; color: #333;">${invoiceData.notes}</p>
          </div>
        ` : ''}
        
        ${invoiceData.terms ? `
          <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
            <h4 style="margin: 0 0 10px 0; color: #000;">Terms & Conditions:</h4>
            <p style="margin: 0; color: #333;">${invoiceData.terms}</p>
          </div>
        ` : ''}
      </div>
    `
  }

  const generateInvoiceText = () => {
    return `
INVOICE - ${templateNames[templateId] || 'Professional Invoice'}

From:
${invoiceData.senderName || 'Your Name'}
${invoiceData.senderTitle || ''}
${invoiceData.senderEmail || ''}
${invoiceData.senderPhone || ''}
${invoiceData.senderAddress || ''}

To:
${invoiceData.recipientName || 'Client Name'}
${invoiceData.recipientTitle || ''}
${invoiceData.recipientEmail || ''}
${invoiceData.recipientPhone || ''}
${invoiceData.recipientAddress || ''}

Invoice Details:
Invoice #: ${invoiceData.invoiceNumber || 'INV-001'}
Date: ${invoiceData.invoiceDate || 'Today'}
Due Date: ${invoiceData.dueDate || '30 days'}

Items:
${invoiceData.items.map(item => `${item.description || 'Service'} - Qty: ${item.quantity} - Rate: $${item.rate} - Amount: $${item.amount.toFixed(2)}`).join('\n')}

Subtotal: $${invoiceData.subtotal.toFixed(2)}
${invoiceData.taxRate > 0 ? `Tax (${invoiceData.taxRate}%): $${invoiceData.taxAmount.toFixed(2)}` : ''}
Total: $${invoiceData.total.toFixed(2)}

${invoiceData.notes ? `Notes: ${invoiceData.notes}` : ''}
${invoiceData.terms ? `Terms: ${invoiceData.terms}` : ''}
    `
  }

  const panelContent = {
    basic: (
      <div className="space-y-4 lg:space-y-6 pb-4">
        <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
          <div className="p-2 lg:p-3 bg-[#fefce8] rounded-lg lg:rounded-xl border border-gray-200">
            <FileText className="w-4 h-4 lg:w-6 lg:h-6 text-black" />
          </div>
          <div>
            <h3 className="text-sm lg:text-lg font-semibold text-gray-900">Basic Information</h3>
            <p className="text-xs lg:text-sm text-gray-600">Invoice number and dates</p>
          </div>
        </div>
        <div className="space-y-3 lg:space-y-5">
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Invoice Number</label>
            <input
              type="text"
              value={invoiceData.invoiceNumber}
              onChange={(e) => updateInvoiceData("invoiceNumber", e.target.value)}
              className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-xs lg:text-base"
              placeholder="INV-2024-001"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Invoice Date</label>
              <input
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => updateInvoiceData("invoiceDate", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-xs lg:text-base"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Due Date</label>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => updateInvoiceData("dueDate", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-xs lg:text-base"
              />
            </div>
          </div>
        </div>
      </div>
    ),
    sender: (
      <div className="space-y-4 lg:space-y-6 pb-4">
        <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
          <div className="p-2 lg:p-3 bg-[#fefce8] rounded-lg lg:rounded-xl border border-gray-200">
            <User className="w-4 h-4 lg:w-6 lg:h-6 text-black" />
          </div>
          <div>
            <h3 className="text-sm lg:text-lg font-semibold text-gray-900">Your Information</h3>
            <p className="text-xs lg:text-sm text-gray-600">Your business details</p>
          </div>
        </div>
        <div className="space-y-3 lg:space-y-5">
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Name</label>
              <input
                type="text"
                value={invoiceData.senderName}
                onChange={(e) => updateInvoiceData("senderName", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                placeholder="Your Name or Company"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Title</label>
              <input
                type="text"
                value={invoiceData.senderTitle}
                onChange={(e) => updateInvoiceData("senderTitle", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                placeholder="Your Title"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Email</label>
              <input
                type="email"
                value={invoiceData.senderEmail}
                onChange={(e) => updateInvoiceData("senderEmail", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Phone</label>
              <input
                type="tel"
                value={invoiceData.senderPhone}
                onChange={(e) => updateInvoiceData("senderPhone", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Address</label>
            <textarea
              value={invoiceData.senderAddress}
              onChange={(e) => updateInvoiceData("senderAddress", e.target.value)}
              className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm text-xs lg:text-base"
              rows="2"
              placeholder="Your address"
            />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Tax ID</label>
            <input
              type="text"
              value={invoiceData.senderTaxId}
              onChange={(e) => updateInvoiceData("senderTaxId", e.target.value)}
              className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm text-xs lg:text-base"
              placeholder="GST: 27ABCDE1234F1Z5"
            />
          </div>
        </div>
      </div>
    ),
    recipient: (
      <div className="space-y-4 lg:space-y-6 pb-4">
        <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
          <div className="p-2 lg:p-3 bg-[#fefce8] rounded-lg lg:rounded-xl border border-gray-200">
            <Building2 className="w-4 h-4 lg:w-6 lg:h-6 text-black" />
          </div>
          <div>
            <h3 className="text-sm lg:text-lg font-semibold text-gray-900">Client Information</h3>
            <p className="text-xs lg:text-sm text-gray-600">Client details</p>
          </div>
        </div>
        <div className="space-y-3 lg:space-y-5">
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Name</label>
              <input
                type="text"
                value={invoiceData.recipientName}
                onChange={(e) => updateInvoiceData("recipientName", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                placeholder="Client Name or Company"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Email</label>
              <input
                type="email"
                value={invoiceData.recipientEmail}
                onChange={(e) => updateInvoiceData("recipientEmail", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                placeholder="client@email.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Phone</label>
              <input
                type="tel"
                value={invoiceData.recipientPhone}
                onChange={(e) => updateInvoiceData("recipientPhone", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                placeholder="+1 (555) 987-6543"
              />
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Tax ID</label>
              <input
                type="text"
                value={invoiceData.recipientTaxId}
                onChange={(e) => updateInvoiceData("recipientTaxId", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                placeholder="VAT: GB123456789"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Address</label>
            <textarea
              value={invoiceData.recipientAddress}
              onChange={(e) => updateInvoiceData("recipientAddress", e.target.value)}
              className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white shadow-sm text-xs lg:text-base"
              rows="2"
              placeholder="Client address"
            />
          </div>
        </div>
      </div>
    ),
    items: (
      <div className="space-y-4 lg:space-y-6 pb-4">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="p-2 lg:p-3 bg-[#fefce8] rounded-lg lg:rounded-xl border border-gray-200">
              <ShoppingCart className="w-4 h-4 lg:w-6 lg:h-6 text-black" />
            </div>
            <div>
              <h3 className="text-sm lg:text-lg font-semibold text-gray-900">Items & Services</h3>
              <p className="text-xs lg:text-sm text-gray-600">Products and services</p>
            </div>
          </div>
          <button
            onClick={addItem}
            className="flex items-center gap-1 lg:gap-2 px-2 py-1.5 lg:px-3 lg:py-2 bg-[#fefce8] text-black rounded-lg lg:rounded-xl hover:bg-[#f7f3d0] transition-all font-medium text-xs lg:text-sm shadow-md"
          >
            <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">Add Item</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        <div className="space-y-3 lg:space-y-4 max-h-80 lg:max-h-96 overflow-y-auto custom-scrollbar pb-4">
          {invoiceData.items.map((item, index) => (
            <div key={item.id} className="border-2 border-gray-200 rounded-lg lg:rounded-xl p-3 lg:p-5 space-y-3 lg:space-y-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs lg:text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 lg:px-3 lg:py-1 rounded-full">Item {index + 1}</span>
                {invoiceData.items.length > 1 && (
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs lg:text-sm transition-colors font-medium"
                  >
                    <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="hidden sm:inline">Remove</span>
                    <span className="sm:hidden">Del</span>
                  </button>
                )}
              </div>
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                  placeholder="Service description"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Quantity</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      updateItem(item.id, "quantity", e.target.value)
                      const quantity = Number.parseFloat(e.target.value) || 0
                      const rate = Number.parseFloat(item.rate) || 0
                      updateItem(item.id, "amount", quantity * rate)
                    }}
                    className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Rate</label>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => {
                      updateItem(item.id, "rate", e.target.value)
                      const quantity = Number.parseFloat(item.quantity) || 0
                      const rate = Number.parseFloat(e.target.value) || 0
                      updateItem(item.id, "amount", quantity * rate)
                    }}
                    className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Amount</label>
                  <input
                    type="number"
                    value={item.amount}
                    readOnly
                    className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl bg-gray-50 shadow-sm text-xs lg:text-base"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
        payment: (
      <div className="space-y-3 lg:space-y-6 pb-4">
        <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-6">
          <div className="p-2 lg:p-3 bg-[#fefce8] rounded-lg lg:rounded-xl border border-gray-200">
            <CreditCard className="w-4 h-4 lg:w-6 lg:h-6 text-black" />
          </div>
          <div>
            <h3 className="text-sm lg:text-lg font-semibold text-gray-900">Payment Details</h3>
            <p className="text-xs lg:text-sm text-gray-600">Currency, tax, and terms</p>
          </div>
        </div>
        <div className="space-y-2 lg:space-y-5">
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Currency</label>
              <select
                value={invoiceData.currency}
                onChange={(e) => updateInvoiceData("currency", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-xs lg:text-base"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Tax Rate (%)</label>
              <input
                type="number"
                value={invoiceData.taxRate}
                onChange={(e) => updateInvoiceData("taxRate", e.target.value)}
                className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-xs lg:text-base"
                min="0"
                step="0.01"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Payment Terms</label>
            <select
              value={invoiceData.paymentTerms}
              onChange={(e) => updateInvoiceData("paymentTerms", e.target.value)}
              className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-xs lg:text-base"
            >
              <option value="Net 30">Net 30</option>
              <option value="Net 15">Net 15</option>
              <option value="Net 60">Net 60</option>
              <option value="Due on Receipt">Due on Receipt</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Notes</label>
            <textarea
              value={invoiceData.notes}
              onChange={(e) => updateInvoiceData("notes", e.target.value)}
              className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-xs lg:text-base"
              rows="2"
              placeholder="Additional notes..."
            />
          </div>
          <div>
            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-2 lg:mb-3">Terms & Conditions</label>
            <textarea
              value={invoiceData.terms}
              onChange={(e) => updateInvoiceData("terms", e.target.value)}
              className="w-full px-2 py-1.5 lg:px-4 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-xs lg:text-base"
              rows="2"
              placeholder="Terms and conditions..."
            />
          </div>
          {/* Total Amount Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-2 lg:p-5 rounded-lg lg:rounded-xl space-y-2 lg:space-y-3 border border-gray-200 shadow-sm mb-4">
            <div className="flex justify-between text-xs lg:text-sm">
              <span className="font-medium text-gray-700">Subtotal:</span>
              <span className="font-semibold text-gray-900">${invoiceData.subtotal.toFixed(2)}</span>
            </div>
            {invoiceData.taxRate > 0 && (
              <div className="flex justify-between text-xs lg:text-sm">
                <span className="font-medium text-gray-700">Tax ({invoiceData.taxRate}%):</span>
                <span className="font-semibold text-gray-900">${invoiceData.taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm lg:text-base font-semibold border-t border-gray-300 pt-2 lg:pt-3">
              <span className="text-gray-900">Total:</span>
              <div className="flex items-center gap-1 lg:gap-2">
                <span className="text-gray-500 text-xs lg:text-sm">$</span>
                <input
                  type="number"
                  value={invoiceData.total}
                  onChange={(e) => updateInvoiceData("total", parseFloat(e.target.value) || 0)}
                  className="w-16 lg:w-20 px-1 py-0.5 lg:px-2 lg:py-1 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm text-xs lg:text-sm font-semibold text-gray-900"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 md:px-8 md:py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <a href="/template" className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-gray-900">Invoice Editor</h1>
              <p className="text-xs md:text-sm text-gray-600 mt-1">Editing {templateNames[templateId]} template</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold text-gray-900">Invoice Editor</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="p-2 md:px-4 md:py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={downloadInvoice}
              className="p-2 md:px-4 md:py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowShareModal(true)}
                className="p-2 md:px-4 md:py-2 bg-[#fefce8] text-black rounded-lg md:rounded-xl text-sm font-semibold transition-all shadow-md hover:bg-[#f7f3d0] flex items-center gap-1 md:gap-3"
              >
                <Share className="w-4 h-4" />
                <span className="hidden md:inline">Share</span>
              </button>
              {renderShareForm()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Edit Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 md:px-8 md:py-2.5 shadow-sm">
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <span className="text-xs md:text-sm font-semibold text-gray-700 mr-2 md:mr-6 whitespace-nowrap">Quick Edit:</span>
          <div className="flex gap-2 md:gap-3 min-w-max">
            <button
              onClick={() => openEditPanel("basic")}
              className={`flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm rounded-lg transition-all font-medium min-h-[44px] ${
                activeEditPanel === "basic" 
                  ? "text-blue-900 bg-blue-100 border border-blue-300 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
              }`}
            >
              <FileText className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Basic Info</span>
              <span className="sm:hidden">Basic</span>
            </button>
            <button
              onClick={() => openEditPanel("sender")}
              className={`flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm rounded-lg transition-all font-medium min-h-[44px] ${
                activeEditPanel === "sender" 
                  ? "text-green-900 bg-green-100 border border-green-300 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
              }`}
            >
              <User className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Your Info</span>
              <span className="sm:hidden">Your</span>
            </button>
            <button
              onClick={() => openEditPanel("recipient")}
              className={`flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm rounded-lg transition-all font-medium min-h-[44px] ${
                activeEditPanel === "recipient" 
                  ? "text-purple-900 bg-purple-100 border border-purple-300 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
              }`}
            >
              <Building2 className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Client Info</span>
              <span className="sm:hidden">Client</span>
            </button>
            <button
              onClick={() => openEditPanel("items")}
              className={`flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm rounded-lg transition-all font-medium min-h-[44px] ${
                activeEditPanel === "items" 
                  ? "text-orange-900 bg-orange-100 border border-orange-300 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
              }`}
            >
              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Items</span>
              <span className="sm:hidden">Items</span>
            </button>
            <button
              onClick={() => openEditPanel("payment")}
              className={`flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm rounded-lg transition-all font-medium min-h-[44px] ${
                activeEditPanel === "payment" 
                  ? "text-indigo-900 bg-indigo-100 border border-indigo-300 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
              }`}
            >
              <CreditCard className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Payment</span>
              <span className="sm:hidden">Payment</span>
            </button>
          </div>
        </div>
      </div>

              {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 120px)' }}>
          {/* Sidebar Edit Panel */}
          {activeEditPanel && (
            <>
              {/* Desktop Sidebar */}
              <div className="hidden lg:block bg-white border-r border-gray-200 w-96 flex flex-col shadow-xl" style={{ height: 'calc(100vh - 120px)', maxHeight: 'calc(100vh - 120px)' }}>
                <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">Edit {activeEditPanel.charAt(0).toUpperCase() + activeEditPanel.slice(1)}</h3>
                  </div>
                  <button onClick={closeEditPanel} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar" style={{ height: 'calc(100vh - 200px)', minHeight: 0 }}>
                  {panelContent[activeEditPanel]}
                </div>
              </div>

            {/* Mobile Sidebar - Bottom Sheet */}
            <div 
              className="lg:hidden fixed inset-0 z-40" 
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)'
              }}
            >
                             <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
                 <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 flex-shrink-0">
                   <div className="flex items-center gap-2">
                     <h3 className="text-base font-semibold text-gray-900">Edit {activeEditPanel.charAt(0).toUpperCase() + activeEditPanel.slice(1)}</h3>
                   </div>
                   <button onClick={closeEditPanel} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                     <X className="w-4 h-4 text-gray-600" />
                   </button>
                 </div>
                 <div className="flex-1 overflow-y-auto p-3 custom-scrollbar min-h-0">
                   {panelContent[activeEditPanel]}
                 </div>
                {/* Mobile Save Button */}
                <div className="border-t border-gray-200 p-3 bg-gray-50">
                  <div className="flex gap-2">
                    <button
                      onClick={closeEditPanel}
                      className="flex-1 px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={closeEditPanel}
                      className="flex-1 px-3 py-2.5 bg-[#fefce8] text-black rounded-lg font-medium transition-all hover:bg-[#f7f3d0] flex items-center justify-center gap-2 text-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Live Preview */}
        <div className={`flex-1 p-4 md:p-8 overflow-auto custom-scrollbar ${activeEditPanel ? 'lg:ml-0' : ''}`}>
          <div className="max-w-full lg:max-w-5xl mx-auto">
            <InlineEditableInvoice
              templateId={templateId}
              invoiceData={invoiceData}
              onEditSection={openEditPanel}
              updateInvoiceData={updateInvoiceData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
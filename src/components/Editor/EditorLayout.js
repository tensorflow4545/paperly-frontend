"use client"

import { useState } from "react"
import { ArrowLeft, Save, FileText, User, Building2, ShoppingCart, CreditCard, X, Plus, Trash2, Download, Share, Mail, Check } from "lucide-react"
import InlineEditableInvoice from "./inline-editable-invoice"

export default function EditorLayout({ templateId, invoiceData, updateInvoiceData, updateItem, addItem, removeItem }) {
  const [activeEditPanel, setActiveEditPanel] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [clientEmail, setClientEmail] = useState("")
  const [senderName, setSenderName] = useState("")
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
    quickbill: "Quick Bill",
    standardpro: "Quantity - Rate",
    businessedge: "Descriptive invoice",
    contractorplus: "Milestone Based",
    enterpriseinvoice: "Department Invoice",
    creativeagency: "Phase Based Invoice",
    servicecontract: "Service Contract Invoice",
    subscriptionbilling: "Subscription Billing Invoice",
    retailproduct: "Retail & Product Invoice",
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
    
    if (!senderName.trim()) {
      setShareMessage("Please enter sender name")
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
      
      // Use the actual invoice number from the invoice data, or generate one if empty
      const documentId = invoiceData.invoiceNumber || `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // Prepare request data
      const requestData = {
        documentId: documentId,
        documentURL: pdfDataUrl,
        clientEmail: clientEmail.trim(),
        senderName: senderName.trim()
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
        simplePdf.text(`Total: ${invoiceData.total.toFixed(2)}`, 20, 70)
        
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
        setSenderName("")
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
            
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Enter sender name"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-sm"
            />
            
            <div className="flex gap-2">
              <button
                onClick={shareInvoice}
                disabled={isSharing || !clientEmail.trim() || !senderName.trim()}
                className="flex-1 px-3 py-2 bg-[#fefce8] text-black rounded-md font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f7f3d0] flex items-center justify-center gap-1 text-sm"
              >
                {isSharing ? (
                  <>
                    <div className="w-3 h-3 border border-black border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : shareMessage && shareMessage.includes("successfully") ? (
                  <>
                    <div className="w-4 h-4 bg-[#fefce8] rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-black" />
                    </div>
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sender Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter sender name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-base"
                />
              </div>
              
              <button
                onClick={shareInvoice}
                disabled={isSharing || !clientEmail.trim() || !senderName.trim()}
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
      quickbill: "Quick Bill",
      standardpro: "Quantity - Rate", 
      businessedge: "Descriptive invoice",
      contractorplus: "Milestone Based",
      enterpriseinvoice: "Department Invoice",
      creativeagency: "Phase Based Invoice",
      servicecontract: "Service Contract Invoice",
      subscriptionbilling: "Subscription Billing Invoice",
      retailproduct: "Retail & Product Invoice",
    }

    // Template-specific HTML generation
    switch (templateId) {
      case "quickbill":
        return `
          <div style="max-width: 523px; margin: 0 auto; font-family: Arial, sans-serif; color: #000; background: white; padding: 16px;">
            <div style="text-align: center; margin-bottom: 16px;">
              <h1 style="margin: 0; color: #000; font-size: 18px; font-weight: bold;">INVOICE</h1>
              <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">Quick Bill</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">From:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.senderName || 'John Smith'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderTitle || 'Freelance Designer'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderEmail || 'demo@pay.com'}</p>
              </div>
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">To:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.recipientName || 'Tech Startup Inc.'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientEmail || 'demo@pay.com'}</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 12px;">
              <div>
                <strong style="color: #666;">Invoice #:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceNumber || 'QB-2024-001'}</span>
              </div>
              <div>
                <strong style="color: #666;">Date:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceDate || 'Dec 15, 2024'}</span>
              </div>
              <div>
                <strong style="color: #666;">Due:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.dueDate || 'Dec 30, 2024'}</span>
              </div>
            </div>
            
            <div style="background: #f9f9f9; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
              <div style="font-weight: bold; color: #000; margin-bottom: 8px; font-size: 12px;">Service Description:</div>
              <div style="color: #000; font-size: 14px;">${invoiceData.items[0]?.description || 'Website Design & Development'}</div>
              <div style="color: #666; font-size: 12px; margin-top: 4px;">Complete responsive website with modern design</div>
            </div>
            
            <div style="text-align: right;">
              <div style="font-size: 18px; font-weight: bold; color: #000;">${(invoiceData.total || 1500).toFixed(2)}</div>
              <div style="color: #666; font-size: 12px;">Total Amount</div>
            </div>
          </div>
        `

      case "standardpro":
        return `
          <div style="max-width: 523px; margin: 0 auto; font-family: Arial, sans-serif; color: #000; background: white; padding: 16px;">
            <div style="background: #fefce8; color: #000; padding: 12px; border-radius: 4px 4px 0 0; margin: -16px -16px 16px -16px;">
              <div style="text-align: center;">
                <h1 style="margin: 0; color: #000; font-size: 18px; font-weight: bold;">Quantity - Rate</h1>
                <p style="margin: 5px 0 0 0; color: #000; font-size: 12px;">Professional Invoice</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">From:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.senderName || 'Sarah Johnson'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderTitle || 'Marketing Consultant'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderPhone || '+1 (555) 123-4567'}</p>
              </div>
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">To:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.recipientName || 'Acme Corporation'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientAddress || '123 Business St, NY 10001'}</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 12px;">
              <div>
                <strong style="color: #666;">Invoice #:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceNumber || 'SP-2024-002'}</span>
              </div>
              <div>
                <strong style="color: #666;">Date:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceDate || 'Dec 20, 2024'}</span>
              </div>
              <div>
                <strong style="color: #666;">Due:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.dueDate || 'Jan 20, 2025'}</span>
              </div>
            </div>
            
            <div style="background: #eff6ff; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
              <table style="width: 100%; font-size: 12px;">
                <thead>
                  <tr style="border-bottom: 1px solid #bfdbfe; margin-top: 5px; margin-bottom: 5px;">
                    <th style="text-align: left; padding: 4px 0; font-weight: bold;">Service</th>
                    <th style="text-align: left; padding: 4px 0; font-weight: bold;">Qty</th>
                    <th style="text-align: left; padding: 4px 0; font-weight: bold;">Rate</th>
                    <th style="text-align: right; padding: 4px 0; font-weight: bold;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoiceData.items.map(item => `
                    <tr>
                      <td style="padding: 4px 0;">${item.description || 'Strategy Session'}</td>
                      <td style="padding: 4px 0;">${item.quantity || '4 hours'}</td>
                      <td style="padding: 4px 0;">${item.rate || 150}/hr</td>
                      <td style="text-align: right; padding: 4px 0; font-weight: bold;">${(item.amount || 600).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            
            <div style="text-align: right; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Subtotal:</span>
                <span style="font-weight: bold;">${(invoiceData.subtotal || 1400).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Tax (10%):</span>
                <span style="font-weight: bold;">${(invoiceData.taxAmount || 140).toFixed(2)}</span>
              </div>
              <div style="border-top: 1px solid #000; padding-top: 4px; margin-top: 5px; margin-bottom: 5px;">
                <div style="font-size: 18px; font-weight: bold; color: #2563eb;">${(invoiceData.total || 1540).toFixed(2)}</div>
              </div>
            </div>
          </div>
        `

      case "businessedge":
        return `
          <div style="max-width: 523px; margin: 0 auto; font-family: Arial, sans-serif; color: #000; background: white; padding: 16px;">
            <div style="background: #1f2937; color: white; padding: 12px; border-radius: 4px 4px 0 0; margin: -16px -16px 16px -16px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h1 style="margin: 0; color: white; font-size: 18px; font-weight: bold;">Descriptive invoice</h1>
                  <p style="margin: 5px 0 0 0; color: #d1d5db; font-size: 12px;">Professional Services</p>
                </div>
                <div style="width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <div style="color: #1f2937; font-weight: bold; font-size: 14px;">BE</div>
                </div>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">From:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.senderName || 'Digital Solutions LLC'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderTaxId || 'GST: 27ABCDE1234F1Z5'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderPhone || '+1 (555) 987-6543'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderAddress || 'San Francisco, CA'}</p>
              </div>
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">To:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.recipientName || 'Global Enterprises Ltd.'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientTaxId || 'VAT: GB123456789'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientAddress || 'London, UK'}</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 12px;">
              <div>
                <strong style="color: #666;">Invoice #:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceNumber || 'BE-2024-003'}</span>
              </div>
              <div>
                <strong style="color: #666;">Date:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceDate || 'Dec 25, 2024'}</span>
              </div>
              <div>
                <strong style="color: #666;">Terms:</strong><br>
                <span style="color: #000; font-weight: bold;">Net 30</span>
              </div>
            </div>
            
            <div style="background: #f9fafb; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
              <table style="width: 100%; font-size: 12px;">
                <thead>
                  <tr style="border-bottom: 1px solid #e5e7eb; margin-top: 5px; margin-bottom: 5px;">
                    <th style="text-align: left; padding: 4px 0; font-weight: bold;">Service</th>
                    <th style="text-align: left; padding: 4px 0; font-weight: bold;">Description</th>
                    <th style="text-align: right; padding: 4px 0; font-weight: bold;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoiceData.items.map(item => `
                    <tr>
                      <td style="padding: 4px 0; font-weight: bold;">${item.description || 'Web Development'}</td>
                      <td style="padding: 4px 0;">${item.description || 'E-commerce platform with payment integration'}</td>
                      <td style="text-align: right; padding: 4px 0; font-weight: bold;">${(item.amount || 3500).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            
            <div style="text-align: right; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Subtotal:</span>
                <span style="font-weight: bold;">${(invoiceData.subtotal || 4300).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Tax (15%):</span>
                <span style="font-weight: bold;">${(invoiceData.taxAmount || 645).toFixed(2)}</span>
              </div>
              <div style="border-top: 1px solid #000; padding-top: 4px; margin-top: 5px; margin-bottom: 5px;">
                <div style="font-size: 18px; font-weight: bold; color: #000;">${(invoiceData.total || 4945).toFixed(2)}</div>
              </div>
            </div>
          </div>
        `

      case "contractorplus":
        return `
          <div style="max-width: 523px; margin: 0 auto; font-family: Arial, sans-serif; color: #000; background: white; padding: 16px;">
            <div style="background: #fefce8; color: #000; padding: 12px; border-radius: 4px 4px 0 0; margin: -16px -16px 16px -16px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h1 style="margin: 0; color: #000; font-size: 18px; font-weight: bold;">Milestone Based</h1>
                  <p style="margin: 5px 0 0 0; color: #000; font-size: 12px;">Professional Contracting</p>
                </div>
                <div style="text-align: right;">
                  <div style="color: #000; font-size: 12px;">Project: CRM System</div>
                  <div style="color: #000; font-size: 12px;">Contract #${invoiceData.invoiceNumber || 'CP-2024-004'}</div>
                </div>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Contractor:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.senderName || 'Alex Rodriguez'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderTitle || 'Senior Full-Stack Developer'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderPhone || '+1 (555) 456-7890'}</p>
              </div>
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Client:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.recipientName || 'TechCorp Solutions'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientAddress || 'San Francisco, CA'}</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 12px;">
              <div>
                <strong style="color: #666;">Invoice #:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceNumber || 'CP-2024-004'}</span>
              </div>
              <div>
                <strong style="color: #666;">Period:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceDate || 'Dec 1-15, 2024'}</span>
              </div>
              <div>
                <strong style="color: #666;">Due:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.dueDate || 'Jan 15, 2025'}</span>
              </div>
            </div>
            
            <div style="background: #eff6ff; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
              <div style="space-y: 3;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-weight: bold; font-size: 14px;">Milestone 1: Backend API</span>
                    </div>
                    <div style="font-size: 12px; color: #666;">40 hours @ $75/hr</div>
                  </div>
                  <div style="font-weight: bold;">${(invoiceData.items[0]?.amount || 3000).toFixed(2)}</div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-weight: bold; font-size: 14px;">Milestone 2: Frontend UI</span>
                    </div>
                    <div style="font-size: 12px; color: #666;">25 hours @ $75/hr</div>
                  </div>
                  <div style="font-weight: bold;">${(invoiceData.items[1]?.amount || 1875).toFixed(2)}</div>
                </div>
              </div>
            </div>
            
            <div style="text-align: right; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Subtotal:</span>
                <span style="font-weight: bold;">${(invoiceData.subtotal || 4875).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Retainer Fee:</span>
                <span style="font-weight: bold;">${(invoiceData.taxAmount || 500).toFixed(2)}</span>
              </div>
              <div style="border-top: 1px solid #000; padding-top: 4px; margin-top: 5px; margin-bottom: 5px;">
                <div style="font-size: 18px; font-weight: bold; color: #2563eb;">${(invoiceData.total || 5375).toFixed(2)}</div>
              </div>
            </div>
          </div>
        `

      case "enterpriseinvoice":
        return `
          <div style="max-width: 523px; margin: 0 auto; font-family: Arial, sans-serif; color: #000; background: white; padding: 16px;">
            <div style="background: #1f2937; color: white; padding: 12px; border-radius: 4px 4px 0 0; margin: -16px -16px 16px -16px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h1 style="margin: 0; color: white; font-size: 18px; font-weight: bold;">Department Invoice</h1>
                  <p style="margin: 5px 0 0 0; color: #d1d5db; font-size: 12px;">Multi-Department Billing</p>
                </div>
                <div style="text-align: right;">
                  <div style="color: #d1d5db; font-size: 12px;">PO: ${invoiceData.invoiceNumber || 'EN-2024-001'}</div>
                  <div style="color: #d1d5db; font-size: 12px;">Status: Approved</div>
                </div>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">From:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.senderName || 'Innovation Agency Ltd.'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderTaxId || 'Tax ID: 12-3456789'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderPhone || '+1 (555) 789-0123'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderAddress || 'New York, NY'}</p>
              </div>
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">To:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.recipientName || 'Global Tech Solutions'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientTaxId || 'VAT: GB987654321'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientAddress || 'London, UK'}</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; margin-bottom: 16px; font-size: 12px;">
              <div>
                <strong style="color: #666;">Invoice #:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceNumber || 'EI-2024-005'}</span>
              </div>
              <div>
                <strong style="color: #666;">Date:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceDate || 'Dec 30, 2024'}</span>
              </div>
              <div>
                <strong style="color: #666;">Currency:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.currency || 'USD'}</span>
              </div>
              <div>
                <strong style="color: #666;">Terms:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.paymentTerms || 'Net 45'}</span>
              </div>
            </div>
            
            <div style="background: #f9fafb; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
              <div style="space-y: 4;">
                <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 13px; margin-top: 5px;">
                  <div style="font-weight: bold; color: #000; margin-bottom: 4px; font-size: 12px;">Design Department</div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 12px;">UI/UX Design</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[0]?.amount || 2500).toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px;">Brand Guidelines</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[1]?.amount || 800).toFixed(2)}</span>
                  </div>
                </div>
                
                <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 13px; margin-top: 5px;">
                  <div style="font-weight: bold; color: #000; margin-bottom: 4px; font-size: 12px;">Development Department</div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 12px;">Frontend Development</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[2]?.amount || 4200).toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px;">Backend API</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[3]?.amount || 3800).toFixed(2)}</span>
                  </div>
                </div>
                
                <div>
                  <div style="font-weight: bold; color: #000; margin-bottom: 4px; font-size: 12px;">QA Department</div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px;">Testing & Quality Assurance</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[4]?.amount || 1500).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="text-align: right; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Subtotal:</span>
                <span style="font-weight: bold;">${(invoiceData.subtotal || 12800).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Tax (20%):</span>
                <span style="font-weight: bold;">${(invoiceData.taxAmount || 2560).toFixed(2)}</span>
              </div>
              <div style="border-top: 1px solid #000; padding-top: 4px; margin-top: 5px; margin-bottom: 5px;">
                <div style="font-size: 18px; font-weight: bold; color: #000;">${(invoiceData.total || 15360).toFixed(2)}</div>
              </div>
            </div>
          </div>
        `

      case "creativeagency":
        return `
          <div style="max-width: 523px; margin: 0 auto; font-family: Arial, sans-serif; color: #000; background: white; padding: 16px;">
            <div style="background: #fefce8; color: #000; padding: 12px; border-radius: 4px 4px 0 0; margin: -16px -16px 16px -16px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h1 style="margin: 0; color: #000; font-size: 18px; font-weight: bold;">Phase Based Invoice</h1>
                  <p style="margin: 5px 0 0 0; color: #000; font-size: 12px;">Creative Services</p>
                </div>
                <div style="text-align: right;">
                  <div style="color: #000; font-size: 12px;">Project: Brand Redesign</div>
                  <div style="color: #000; font-size: 12px;">Phase: Final Delivery</div>
                </div>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Agency:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.senderName || 'Design Studio Pro'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderTitle || 'Creative Director: Sarah Chen'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderPhone || '+1 (555) 234-5678'}</p>
              </div>
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Client:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.recipientName || 'Innovation Tech Co.'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientTitle || 'Marketing Director: Mike Johnson'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientEmail || 'demo@pay.com'}</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 12px;">
              <div>
                <strong style="color: #666;">Invoice #:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceNumber || 'CA-2024-006'}</span>
              </div>
              <div>
                <strong style="color: #666;">Date:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceDate || 'Jan 5, 2025'}</span>
              </div>
              <div>
                <strong style="color: #666;">Due:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.dueDate || 'Jan 20, 2025'}</span>
              </div>
            </div>
            
            <div style="background: #f8fafc; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
              <div style="space-y: 4;">
                <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 13px; margin-top: 5px;">
                  <div style="font-weight: bold; color: #000; margin-bottom: 4px; font-size: 12px;">Phase 1: Discovery & Research</div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 12px;">Brand Analysis & Competitor Research</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[0]?.amount || 2500).toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px;">User Persona Development</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[1]?.amount || 1800).toFixed(2)}</span>
                  </div>
                </div>
                
                <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 13px; margin-top: 5px;">
                  <div style="font-weight: bold; color: #000; margin-bottom: 4px; font-size: 12px;">Phase 2: Design & Iteration</div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 12px;">Logo Design (3 concepts)</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[2]?.amount || 3200).toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 12px;">Brand Guidelines & Style Guide</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[3]?.amount || 2800).toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px;">Website Mockups (3 rounds)</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[4]?.amount || 4500).toFixed(2)}</span>
                  </div>
                </div>
                
                <div>
                  <div style="font-weight: bold; color: #000; margin-bottom: 4px; font-size: 12px;">Phase 3: Final Deliverables</div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 12px;">Final Logo Files (AI, EPS, PNG)</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[5]?.amount || 1200).toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px;">Brand Asset Package</span>
                    <span style="font-weight: bold; font-size: 12px;">${(invoiceData.items[6]?.amount || 1500).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="text-align: right; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Subtotal:</span>
                <span style="font-weight: bold;">${(invoiceData.subtotal || 17500).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Revision Credits (2):</span>
                <span style="font-weight: bold;">${(invoiceData.taxAmount || 1000).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Tax (8.5%):</span>
                <span style="font-weight: bold;">${(invoiceData.taxAmount || 1487.50).toFixed(2)}</span>
              </div>
                              <div style="border-top: 1px solid #000; padding-top: 4px; margin-top: 5px; margin-bottom: 5px;">
                  <div style="font-size: 18px; font-weight: bold; color: #000;">${(invoiceData.total || 19987.50).toFixed(2)}</div>
                </div>
            </div>
          </div>
        `

      case "servicecontract":
        return `
          <div style="max-width: 523px; margin: 0 auto; font-family: Arial, sans-serif; color: #000; background: white; padding: 16px;">
            <div style="background: #1e293b; color: white; padding: 12px; border-radius: 4px 4px 0 0; margin: -16px -16px 16px -16px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h1 style="margin: 0; color: white; font-size: 18px; font-weight: bold;">Service Contract Invoice</h1>
                  <p style="margin: 5px 0 0 0; color: #cbd5e1; font-size: 12px;">Legal & Professional Services</p>
                </div>
                <div style="text-align: right;">
                  <div style="color: #cbd5e1; font-size: 12px;">Contract: ${invoiceData.invoiceNumber || 'SC-2024-001'}</div>
                  <div style="color: #cbd5e1; font-size: 12px;">Status: Active</div>
                </div>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Service Provider:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.senderName || 'Legal Associates LLC'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderTitle || 'Senior Partner: David Wilson'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderPhone || '+1 (555) 321-9876'}</p>
              </div>
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Client:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.recipientName || 'Tech Startup Corp'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientAddress || '123 Business Ave, NY 10001'}</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 12px;">
              <div>
                <strong style="color: #666;">Invoice #:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceNumber || 'SC-2024-001'}</span>
              </div>
              <div>
                <strong style="color: #666;">Period:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceDate || 'Dec 1-31, 2024'}</span>
              </div>
              <div>
                <strong style="color: #666;">Due:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.dueDate || 'Jan 30, 2025'}</span>
              </div>
            </div>
            
            <div style="background: #f1f5f9; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
              <table style="width: 100%; font-size: 12px;">
                <tbody>
                  ${invoiceData.items.map(item => `
                    <tr>
                      <td style="padding: 4px 0; font-weight: bold;">${item.description || 'Legal Consultation'}</td>
                      <td style="padding: 4px 0; text-align: center;">${item.quantity || '15'} hrs @ $${item.rate || '300'}/hr</td>
                      <td style="text-align: right; padding: 4px 0; font-weight: bold;">$${(item.amount || 4500).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            
            <div style="text-align: right; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Subtotal:</span>
                <span style="font-weight: bold;">$${(invoiceData.subtotal || 8675).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Retainer Applied:</span>
                <span style="font-weight: bold; color: #16a34a;">-$${(invoiceData.taxAmount || 2000).toFixed(2)}</span>
              </div>
              <div style="border-top: 1px solid #000; padding-top: 4px; margin-top: 5px; margin-bottom: 5px;">
                <div style="font-size: 18px; font-weight: bold; color: #1e293b;">$${(invoiceData.total || 6675).toFixed(2)}</div>
              </div>
            </div>
          </div>
        `

      case "subscriptionbilling":
        return `
          <div style="max-width: 523px; margin: 0 auto; font-family: Arial, sans-serif; color: #000; background: white; padding: 16px;">
            <div style="background: #0d9488; color: white; padding: 12px; border-radius: 4px 4px 0 0; margin: -16px -16px 16px -16px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h1 style="margin: 0; color: white; font-size: 18px; font-weight: bold;">Subscription Billing Invoice</h1>
                  <p style="margin: 5px 0 0 0; color: #5eead4; font-size: 12px;">SaaS & Recurring Services</p>
                </div>
                <div style="text-align: right;">
                  <div style="color: #5eead4; font-size: 12px;">Plan: Professional</div>
                  <div style="color: #5eead4; font-size: 12px;">Billing: Monthly</div>
                </div>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Service Provider:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.senderName || 'CloudTech Solutions'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderPhone || '+1 (555) 867-5309'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderAddress || 'San Francisco, CA'}</p>
              </div>
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Subscriber:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.recipientName || 'Digital Agency Inc.'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">Account ID: ${invoiceData.recipientTaxId || 'DA-5678'}</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 12px;">
              <div>
                <strong style="color: #666;">Invoice #:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceNumber || 'SB-2024-002'}</span>
              </div>
              <div>
                <strong style="color: #666;">Period:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceDate || 'Jan 1-31, 2025'}</span>
              </div>
              <div>
                <strong style="color: #666;">Next Bill:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.dueDate || 'Feb 1, 2025'}</span>
              </div>
            </div>
            
            <div style="background: #f0fdfa; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
              <table style="width: 100%; font-size: 12px;">
                <tbody>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold;">Professional Plan</td>
                    <td style="padding: 4px 0; text-align: center;">Monthly</td>
                    <td style="text-align: right; padding: 4px 0; font-weight: bold;">$99.00</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold;">Additional Users (5)</td>
                    <td style="padding: 4px 0; text-align: center;">$15/user</td>
                    <td style="text-align: right; padding: 4px 0; font-weight: bold;">$75.00</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: bold;">API Usage Overage</td>
                    <td style="padding: 4px 0; text-align: center;">2,500 calls</td>
                    <td style="text-align: right; padding: 4px 0; font-weight: bold;">$25.00</td>
                  </tr>
                  <tr style="color: #16a34a;">
                    <td style="padding: 4px 0; font-weight: bold;">Annual Discount</td>
                    <td style="padding: 4px 0; text-align: center;">10% off</td>
                    <td style="text-align: right; padding: 4px 0; font-weight: bold;">-$19.90</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div style="text-align: right; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Subtotal:</span>
                <span style="font-weight: bold;">$${(invoiceData.subtotal || 179.10).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Tax (8.5%):</span>
                <span style="font-weight: bold;">$${(invoiceData.taxAmount || 15.22).toFixed(2)}</span>
              </div>
              <div style="border-top: 1px solid #000; padding-top: 4px; margin-top: 5px; margin-bottom: 5px;">
                <div style="font-size: 18px; font-weight: bold; color: #0d9488;">$${(invoiceData.total || 194.32).toFixed(2)}</div>
              </div>
            </div>
          </div>
        `

      case "retailproduct":
        return `
          <div style="max-width: 523px; margin: 0 auto; font-family: Arial, sans-serif; color: #000; background: white; padding: 16px;">
            <div style="background: #ea580c; color: white; padding: 12px; border-radius: 4px 4px 0 0; margin: -16px -16px 16px -16px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h1 style="margin: 0; color: white; font-size: 18px; font-weight: bold;">Retail & Product Invoice</h1>
                  <p style="margin: 5px 0 0 0; color: #fed7aa; font-size: 12px;">E-commerce & Product Sales</p>
                </div>
                <div style="text-align: right;">
                  <div style="color: #fed7aa; font-size: 12px;">Order: ${invoiceData.invoiceNumber || 'RP-2024-003'}</div>
                  <div style="color: #fed7aa; font-size: 12px;">Tracking: TRK123456789</div>
                </div>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Store:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.senderName || 'Premium Electronics'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderPhone || '+1 (555) 234-5678'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.senderAddress || '123 Retail St, CA 90210'}</p>
              </div>
              <div>
                <h3 style="color: #000; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Customer:</h3>
                <p style="font-weight: bold; margin: 2px 0; color: #000; font-size: 14px;">${invoiceData.recipientName || 'Sarah Johnson'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientEmail || 'demo@pay.com'}</p>
                <p style="margin: 2px 0; color: #666; font-size: 12px;">${invoiceData.recipientAddress || '456 Customer Ave, NY 10001'}</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 12px;">
              <div>
                <strong style="color: #666;">Invoice #:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceNumber || 'RP-2024-003'}</span>
              </div>
              <div>
                <strong style="color: #666;">Date:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.invoiceDate || 'Jan 10, 2025'}</span>
              </div>
              <div>
                <strong style="color: #666;">Payment:</strong><br>
                <span style="color: #000; font-weight: bold;">${invoiceData.paymentTerms || 'Credit Card'}</span>
              </div>
            </div>
            
            <div style="background: #fff7ed; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
              <table style="width: 100%; font-size: 12px;">
                <tbody>
                  ${invoiceData.items.map(item => `
                    <tr>
                      <td style="padding: 4px 0;">
                        <div style="font-weight: bold;">${item.description || 'Wireless Headphones'}</div>
                        <div style="color: #666; font-size: 11px;">SKU: ${item.rate || 'WH-001'} | Qty: ${item.quantity || '2'}</div>
                      </td>
                      <td style="text-align: right; padding: 4px 0; font-weight: bold;">$${(item.amount || 299.98).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            
            <div style="text-align: right; margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Subtotal:</span>
                <span style="font-weight: bold;">$${(invoiceData.subtotal || 337.96).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Shipping:</span>
                <span style="font-weight: bold;">$${(invoiceData.taxAmount || 15.99).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span>Tax (8.25%):</span>
                <span style="font-weight: bold;">$${((invoiceData.subtotal || 337.96) * 0.0825).toFixed(2)}</span>
              </div>
              <div style="border-top: 1px solid #000; padding-top: 4px; margin-top: 5px; margin-bottom: 5px;">
                <div style="font-size: 18px; font-weight: bold; color: #ea580c;">$${(invoiceData.total || 381.83).toFixed(2)}</div>
              </div>
            </div>
          </div>
        `

      default:
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
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; color: #000; font-weight: bold; margin-top: 5px; margin-bottom: 5px;">Description</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6; color: #000; font-weight: bold; margin-top: 5px; margin-bottom: 5px;">Quantity</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6; color: #000; font-weight: bold; margin-top: 5px; margin-bottom: 5px;">Rate</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6; color: #000; font-weight: bold; margin-top: 5px; margin-bottom: 5px;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.items.map(item => `
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #dee2e6; color: #000; margin-top: 5px; margin-bottom: 5px;">${item.description || 'Service'}</td>
                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; color: #000; margin-top: 5px; margin-bottom: 5px;">${item.quantity}</td>
                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; color: #000; margin-top: 5px; margin-bottom: 5px;">${item.rate}</td>
                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; color: #000; font-weight: bold; margin-top: 5px; margin-bottom: 5px;">${item.amount.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div style="text-align: right; margin-top: 30px;">
              <div style="margin-bottom: 10px;">
                <span style="font-weight: bold; color: #000;">Subtotal:</span>
                <span style="margin-left: 20px; font-weight: bold; color: #000;">${invoiceData.subtotal.toFixed(2)}</span>
              </div>
              ${invoiceData.taxRate > 0 ? `
                <div style="margin-bottom: 10px;">
                  <span style="font-weight: bold; color: #000;">Tax (${invoiceData.taxRate}%):</span>
                  <span style="margin-left: 20px; font-weight: bold; color: #000;">${invoiceData.taxAmount.toFixed(2)}</span>
                </div>
              ` : ''}
              <div style="border-top: 2px solid #000; padding-top: 10px; font-size: 18px; margin-top: 5px; margin-bottom: 5px;">
                <span style="font-weight: bold; color: #000;">Total:</span>
                <span style="margin-left: 20px; font-weight: bold; color: #000;">${invoiceData.total.toFixed(2)}</span>
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
${invoiceData.items.map(item => `${item.description || 'Service'} - Qty: ${item.quantity} - Rate: ${item.rate} - Amount: ${item.amount.toFixed(2)}`).join('\n')}

Subtotal: ${invoiceData.subtotal.toFixed(2)}
${invoiceData.taxRate > 0 ? `Tax (${invoiceData.taxRate}%): ${invoiceData.taxAmount.toFixed(2)}` : ''}
Total: ${invoiceData.total.toFixed(2)}

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
                placeholder="demo@pay.com"
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
                placeholder="demo@pay.com"
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
        
        {/* Mobile Horizontal Slider Indicator */}
        <div className="md:hidden flex justify-center pt-1 pb-2">
          <div className="flex gap-1">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-1 bg-gray-200 rounded-full"></div>
            <div className="w-4 h-1 bg-gray-200 rounded-full"></div>
            <div className="w-4 h-1 bg-gray-200 rounded-full"></div>
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
            
            {/* Legal Disclaimer */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-2.5 h-2.5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Legal Notice</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    This invoice template is for general use only. Users are responsible for ensuring compliance with local tax laws, 
                    business regulations, and legal requirements. Paprly is not liable for any legal or financial consequences arising 
                    from the use of this template. For legal advice, please consult with a qualified professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
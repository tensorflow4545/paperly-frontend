"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Download } from 'lucide-react'
import InvoiceEditor from './InvoiceEditor'
import InvoicePreview from './InvoicePreview'
import ElementsSidebar from './ElementsSidebar'

export default function BlankEditor() {
  const [showSidebar, setShowSidebar] = useState(true)
  const [invoiceData, setInvoiceData] = useState({
    businessInfo: {
      name: '',
      address: '',
      email: '',
      phone: '',
      logo: null
    },
    clientInfo: {
      name: '',
      address: '',
      email: '',
      phone: ''
    },
    invoiceDetails: {
      number: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      currency: 'USD',
      taxRate: 0
    },
    items: [],
    notes: '',
    terms: '',
    customElements: [] // For drag and drop elements
  })
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const router = useRouter()
  
  const autoSaveTimeoutRef = useRef(null)
  const editorRef = useRef(null)

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }
    
    autoSaveTimeoutRef.current = setTimeout(() => {
      handleAutoSave()
    }, 3000)

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [invoiceData])

  const handleAutoSave = async () => {
    setIsSaving(true)
    try {
      console.log('Auto-saving invoice...')
      setLastSaved(new Date())
    } catch (error) {
      console.error('Auto-save failed:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: Date.now(),
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
      }]
    }))
  }

  const handleUpdateItem = (id, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }
          return updatedItem
        }
        return item
      })
    }))
  }

  const handleRemoveItem = (id) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.amount, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * (invoiceData.invoiceDetails.taxRate / 100)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleExport = async (format) => {
    if (format === 'PDF') {
      try {
        const html2canvas = (await import('html2canvas')).default
        const jsPDF = (await import('jspdf')).default
        
        const previewElement = document.querySelector('.invoice-preview')
        if (!previewElement) {
          console.error('Preview element not found')
          return
        }

        // Completely disable all external stylesheets to prevent oklab parsing
        const originalStylesheets = []
        for (let i = 0; i < document.styleSheets.length; i++) {
          try {
            const stylesheet = document.styleSheets[i]
            if (stylesheet.href || stylesheet.cssRules) {
              originalStylesheets.push(stylesheet)
              stylesheet.disabled = true
            }
          } catch (e) {
            // Ignore CORS errors
          }
        }

        // Create a clone of the preview element
        const clonedElement = previewElement.cloneNode(true)
        clonedElement.style.position = 'absolute'
        clonedElement.style.left = '-9999px'
        clonedElement.style.top = '0'
        clonedElement.style.width = '900px' // Adjusted width for better fitting
        clonedElement.style.backgroundColor = '#ffffff'
        document.body.appendChild(clonedElement)

        // Create a comprehensive style override that preserves colors but fixes problematic functions
        const styleOverride = document.createElement('style')
        styleOverride.textContent = `
          * {
            font-family: Arial, sans-serif !important;
            color: rgb(0, 0, 0) !important;
            background-color: rgb(255, 255, 255) !important;
            border-color: rgb(0, 0, 0) !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }
          body {
            padding: 20px !important;
            line-height: 1.6 !important;
            width: 100% !important;
            max-width: none !important;
          }
          .invoice-container {
            max-width: 900px !important;
            margin: 0 auto !important;
            width: 100% !important;
          }
          .invoice-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            margin-bottom: 40px !important;
            padding-bottom: 25px !important;
            border-bottom: 2px solid rgb(0, 0, 0) !important;
            width: 100% !important;
          }
          .business-info {
            flex: 1 !important;
            max-width: 45% !important;
            padding-right: 20px !important;
          }
          .business-name {
            font-size: 22px !important;
            font-weight: bold !important;
            margin-bottom: 12px !important;
            color: rgb(0, 0, 0) !important;
          }
          .invoice-title {
            text-align: right !important;
            font-size: 26px !important;
            font-weight: bold !important;
            text-transform: uppercase !important;
            color: rgb(245, 158, 11) !important;
            margin-bottom: 12px !important;
          }
          .invoice-details {
            text-align: right !important;
            font-size: 13px !important;
            color: rgb(75, 85, 99) !important;
          }
          .client-section {
            margin-bottom: 35px !important;
            width: 100% !important;
          }
          .section-title {
            font-weight: bold !important;
            margin-bottom: 12px !important;
            font-size: 15px !important;
            color: rgb(0, 0, 0) !important;
          }
          .items-table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 25px 0 !important;
            table-layout: fixed !important;
            font-size: 13px !important;
          }
          .items-table th,
          .items-table td {
            border: 1px solid rgb(229, 231, 235) !important;
            padding: 10px !important;
            text-align: left !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          .items-table th {
            background-color: rgb(249, 250, 251) !important;
            font-weight: bold !important;
            color: rgb(0, 0, 0) !important;
          }
          .totals {
            text-align: right !important;
            margin-top: 25px !important;
            font-size: 15px !important;
            width: 100% !important;
          }
          .total-row {
            font-weight: bold !important;
            font-size: 16px !important;
            margin-top: 12px !important;
            color: rgb(0, 0, 0) !important;
          }
          .notes-section {
            margin-top: 35px !important;
            padding-top: 25px !important;
            border-top: 1px solid rgb(229, 231, 235) !important;
            width: 100% !important;
          }
          .terms-section {
            margin-top: 25px !important;
            width: 100% !important;
          }
          .custom-element {
            margin: 25px 0 !important;
            padding: 15px !important;
            border: 1px solid rgb(229, 231, 235) !important;
            border-radius: 8px !important;
            background-color: rgb(255, 255, 255) !important;
            width: 100% !important;
            box-sizing: border-box !important;
            font-size: 13px !important;
          }
          .custom-element h3 {
            margin-bottom: 15px !important;
            font-size: 16px !important;
            font-weight: bold !important;
            color: rgb(0, 0, 0) !important;
          }
          .time-entry {
            display: flex !important;
            justify-content: space-between !important;
            margin: 8px 0 !important;
            padding: 8px 0 !important;
            border-bottom: 1px solid rgb(243, 244, 246) !important;
            font-size: 13px !important;
            width: 100% !important;
          }
          .pricing-tier {
            border: 1px solid rgb(229, 231, 235) !important;
            border-radius: 8px !important;
            padding: 15px !important;
            margin: 12px 0 !important;
            background-color: rgb(255, 255, 255) !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .pricing-tier h4 {
            font-weight: bold !important;
            margin-bottom: 8px !important;
            color: rgb(37, 99, 235) !important;
            font-size: 14px !important;
          }
          .feature-list {
            list-style: none !important;
            padding-left: 0 !important;
            margin: 0 !important;
          }
          .feature-list li {
            margin: 4px 0 !important;
            padding-left: 12px !important;
            position: relative !important;
            color: rgb(75, 85, 99) !important;
            font-size: 12px !important;
          }
          .feature-list li:before {
            content: "•" !important;
            position: absolute !important;
            left: 0 !important;
            color: rgb(75, 85, 99) !important;
          }
          .contact-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
            margin-top: 10px !important;
            width: 100% !important;
          }
          .contact-item {
            display: flex !important;
            justify-content: space-between !important;
            padding: 4px 0 !important;
            font-size: 12px !important;
            width: 100% !important;
          }
          .contact-item strong {
            color: rgb(0, 0, 0) !important;
          }
          .signature-section {
            margin-top: 35px !important;
            text-align: center !important;
            width: 100% !important;
          }
          .signature-box {
            border-top: 1px solid rgb(0, 0, 0) !important;
            width: 180px !important;
            margin: 0 auto !important;
            padding-top: 8px !important;
            margin-top: 45px !important;
            text-align: center !important;
          }
          .thank-you {
            text-align: center !important;
            margin-top: 30px !important;
            font-size: 16px !important;
            font-weight: bold !important;
            color: rgb(0, 0, 0) !important;
            width: 100% !important;
          }
          .footer-text {
            text-align: center !important;
            margin-top: 15px !important;
            font-size: 12px !important;
            color: rgb(75, 85, 99) !important;
            width: 100% !important;
          }
          .footer-link {
            color: rgb(37, 99, 235) !important;
            text-decoration: none !important;
            font-weight: 500 !important;
          }
          .footer-link:hover {
            text-decoration: underline !important;
          }
          .bg-yellow-50 { background-color: rgb(255, 251, 235) !important; }
          .bg-yellow-100 { background-color: rgb(254, 243, 199) !important; }
          .bg-gray-50 { background-color: rgb(249, 250, 251) !important; }
          .bg-gray-100 { background-color: rgb(243, 244, 246) !important; }
          .text-gray-600 { color: rgb(75, 85, 99) !important; }
          .text-gray-700 { color: rgb(55, 65, 81) !important; }
          .text-gray-900 { color: rgb(17, 24, 39) !important; }
          .border-gray-200 { border-color: rgb(229, 231, 235) !important; }
          .border-yellow-200 { border-color: rgb(253, 230, 138) !important; }
          .bg-white { background-color: rgb(255, 255, 255) !important; }
          .text-black { color: rgb(0, 0, 0) !important; }
          .text-white { color: rgb(255, 255, 255) !important; }
          .bg-gray-700 { background-color: rgb(55, 65, 81) !important; }
          .bg-gray-800 { background-color: rgb(31, 41, 55) !important; }
          .text-blue-600 { color: rgb(37, 99, 235) !important; }
          .text-yellow-500 { color: rgb(245, 158, 11) !important; }
          .text-yellow-600 { color: rgb(217, 119, 6) !important; }
          .bg-blue-50 { background-color: rgb(239, 246, 255) !important; }
          .bg-blue-100 { background-color: rgb(219, 234, 254) !important; }
          .border-blue-200 { border-color: rgb(191, 219, 254) !important; }
          .hover\\:bg-gray-100:hover { background-color: rgb(243, 244, 246) !important; }
          .hover\\:bg-yellow-50:hover { background-color: rgb(255, 251, 235) !important; }
          .hover\\:bg-yellow-100:hover { background-color: rgb(254, 243, 199) !important; }
        `
        document.head.appendChild(styleOverride)
        clonedElement.appendChild(styleOverride.cloneNode(true))

        // Aggressively remove any inline styles that might contain problematic color functions
        const removeProblematicStyles = (element) => {
          if (element.style && element.style.cssText) {
            element.style.cssText = element.style.cssText
              .replace(/oklab\([^)]+\)/g, 'rgb(0, 0, 0)')
              .replace(/oklch\([^)]+\)/g, 'rgb(0, 0, 0)')
              .replace(/hsl\([^)]+\)/g, 'rgb(0, 0, 0)')
              .replace(/hsla\([^)]+\)/g, 'rgb(0, 0, 0)')
              .replace(/lab\([^)]+\)/g, 'rgb(0, 0, 0)')
              .replace(/lch\([^)]+\)/g, 'rgb(0, 0, 0)')
          }
          Array.from(element.children).forEach(removeProblematicStyles)
        }
        removeProblematicStyles(clonedElement)

        // Create a completely isolated container
        const isolatedContainer = document.createElement('div')
        isolatedContainer.style.position = 'absolute'
        isolatedContainer.style.left = '-9999px'
        isolatedContainer.style.top = '0'
        isolatedContainer.style.width = '900px' // Match the new width
        isolatedContainer.style.backgroundColor = '#ffffff'
        isolatedContainer.innerHTML = clonedElement.innerHTML
        document.body.appendChild(isolatedContainer)

        // Add the style override to the isolated container
        isolatedContainer.appendChild(styleOverride.cloneNode(true))

        // Wait for styles to apply
        await new Promise(resolve => setTimeout(resolve, 200))

        let canvas
        try {
          canvas = await html2canvas(isolatedContainer, {
            scale: 1.5, // Reduced scale to prevent cropping
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            removeContainer: true,
            width: 900, // Match the new width
            height: isolatedContainer.scrollHeight,
            onclone: (clonedDoc) => {
              // Ensure all styles are properly applied in the cloned document
              const clonedStyle = styleOverride.cloneNode(true)
              clonedDoc.head.appendChild(clonedStyle)
              
              // Also remove any problematic styles from the cloned document
              const removeStyles = (element) => {
                if (element.style && element.style.cssText) {
                  element.style.cssText = element.style.cssText
                    .replace(/oklab\([^)]+\)/g, 'rgb(0, 0, 0)')
                    .replace(/oklch\([^)]+\)/g, 'rgb(0, 0, 0)')
                    .replace(/hsl\([^)]+\)/g, 'rgb(0, 0, 0)')
                    .replace(/hsla\([^)]+\)/g, 'rgb(0, 0, 0)')
                    .replace(/lab\([^)]+\)/g, 'rgb(0, 0, 0)')
                    .replace(/lch\([^)]+\)/g, 'rgb(0, 0, 0)')
                }
                Array.from(element.children).forEach(removeStyles)
              }
              removeStyles(clonedDoc.body)
            }
          })
        } finally {
          // Clean up
          if (document.body.contains(clonedElement)) {
            document.body.removeChild(clonedElement)
          }
          if (document.body.contains(isolatedContainer)) {
            document.body.removeChild(isolatedContainer)
          }
          if (document.head.contains(styleOverride)) {
            document.head.removeChild(styleOverride)
          }
          // Re-enable all disabled stylesheets
          originalStylesheets.forEach(stylesheet => {
            stylesheet.disabled = false
          })
        }

        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4')
        const imgWidth = 190 // Reduced from 210 to add margins
        const pageHeight = 295
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight

        let position = 0

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight) // Added 10mm margins
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight) // Added 10mm margins
          heightLeft -= pageHeight
        }

        pdf.save('invoice.pdf')
      } catch (error) {
        console.error('Error generating PDF:', error)
        alert('Error generating PDF. Please try again.')
      }
    }
  }

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('border-yellow-500', 'bg-yellow-50')
  }

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-yellow-500', 'bg-yellow-50')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('border-yellow-500', 'bg-yellow-50')
    
    try {
      const elementData = JSON.parse(e.dataTransfer.getData('application/json'))
      handleAddElement(elementData)
    } catch (error) {
      console.error('Error parsing dropped element:', error)
    }
  }

  const handleAddElement = (element) => {
    console.log('Adding element:', element)
    
    switch (element.id) {
      case 'service-item':
        handleAddItem()
        break
      case 'time-tracking':
        // Check if time tracking already exists
        const existingTimeTracking = invoiceData.customElements.find(el => el.type === 'time-tracking')
        if (existingTimeTracking) {
          // Add new entry to existing time tracking
          setInvoiceData(prev => ({
            ...prev,
            customElements: prev.customElements.map(el => {
              if (el.type === 'time-tracking') {
                return {
                  ...el,
                  data: {
                    ...el.data,
                    entries: [...el.data.entries, {
                      id: Date.now(),
                      date: new Date().toISOString().split('T')[0],
                      hours: 8,
                      rate: 50,
                      description: 'New time entry'
                    }]
                  }
                }
              }
              return el
            })
          }))
        } else {
          // Create new time tracking element
          setInvoiceData(prev => ({
            ...prev,
            customElements: [...prev.customElements, {
              id: Date.now(),
              type: 'time-tracking',
              data: {
                title: 'Time Tracking',
                entries: [
                  { id: Date.now(), date: new Date().toISOString().split('T')[0], hours: 8, rate: 50, description: 'Development work' }
                ]
              }
            }]
          }))
        }
        break
      case 'pricing-table':
        // Check if pricing table already exists
        const existingPricingTable = invoiceData.customElements.find(el => el.type === 'pricing-table')
        if (existingPricingTable) {
          console.log('Pricing table already exists')
          return
        }
        setInvoiceData(prev => ({
          ...prev,
          customElements: [...prev.customElements, {
            id: Date.now(),
            type: 'pricing-table',
            data: {
              title: 'Pricing Table',
              tiers: [
                { id: Date.now(), name: 'Basic', price: 99, features: ['Feature 1', 'Feature 2'] },
                { id: Date.now() + 1, name: 'Pro', price: 199, features: ['Feature 1', 'Feature 2', 'Feature 3'] },
                { id: Date.now() + 2, name: 'Enterprise', price: 299, features: ['All Features'] }
              ]
            }
          }]
        }))
        break
      case 'discount-section':
        setInvoiceData(prev => ({
          ...prev,
          customElements: [...prev.customElements, {
            id: Date.now(),
            type: 'discount-section',
            data: {
              title: 'Discounts',
              discounts: [
                { id: Date.now(), type: 'percentage', value: 10, description: 'Early payment discount' }
              ]
            }
          }]
        }))
        break
      case 'tax-breakdown':
        // Check if tax breakdown already exists
        const existingTaxBreakdown = invoiceData.customElements.find(el => el.type === 'tax-breakdown')
        if (existingTaxBreakdown) {
          console.log('Tax breakdown already exists')
          return
        }
        setInvoiceData(prev => ({
          ...prev,
          customElements: [...prev.customElements, {
            id: Date.now(),
            type: 'tax-breakdown',
            data: {
              title: 'Tax Breakdown',
              taxes: [
                { id: Date.now(), name: 'Sales Tax', rate: 8.5, amount: 0 },
                { id: Date.now() + 1, name: 'Service Tax', rate: 2.5, amount: 0 }
              ]
            }
          }]
        }))
        break
      case 'payment-schedule':
        // Check if payment schedule already exists
        const existingPaymentSchedule = invoiceData.customElements.find(el => el.type === 'payment-schedule')
        if (existingPaymentSchedule) {
          console.log('Payment schedule already exists')
          return
        }
        setInvoiceData(prev => ({
          ...prev,
          customElements: [...prev.customElements, {
            id: Date.now(),
            type: 'payment-schedule',
            data: {
              title: 'Payment Schedule',
              installments: [
                { id: Date.now(), dueDate: new Date().toISOString().split('T')[0], amount: 500, description: 'First Installment' },
                { id: Date.now() + 1, dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 500, description: 'Second Installment' }
              ]
            }
          }]
        }))
        break
      // case 'logo-upload':
      //   const input = document.createElement('input')
      //   input.type = 'file'
      //   input.accept = 'image/*'
      //   input.onchange = (e) => {
      //     const file = e.target.files[0]
      //     if (file) {
      //       const reader = new FileReader()
      //       reader.onload = (e) => {
      //         setInvoiceData(prev => ({
      //           ...prev,
      //           businessInfo: {
      //             ...prev.businessInfo,
      //             logo: e.target.result
      //           }
      //         }))
      //       }
      //       reader.readAsDataURL(file)
      //     }
      //   }
      //   input.click()
      //   break
      case 'company-header':
        // Check if company header already exists
        const existingCompanyHeader = invoiceData.customElements.find(el => el.type === 'company-header')
        if (existingCompanyHeader) {
          console.log('Company header already exists')
          return
        }
        setInvoiceData(prev => ({
          ...prev,
          customElements: [...prev.customElements, {
            id: Date.now(),
            type: 'company-header',
            data: {
              title: 'Company Information',
              companyName: prev.businessInfo.name || 'Your Company',
              tagline: 'Professional Services',
              contactInfo: {
                phone: prev.businessInfo.phone || '',
                email: prev.businessInfo.email || '',
                website: ''
              }
            }
          }]
        }))
        break
      case 'signature-section':
        setInvoiceData(prev => ({
          ...prev,
          customElements: [...prev.customElements, {
            id: Date.now(),
            type: 'signature-section',
            data: {
              title: 'Authorized Signature',
              signerName: 'John Doe',
              title: 'CEO',
              date: new Date().toISOString().split('T')[0]
            }
          }]
        }))
        break
      // case 'stamp-seal':
      //   setInvoiceData(prev => ({
      //     ...prev,
      //     customElements: [...prev.customElements, {
      //       id: Date.now(),
      //       type: 'stamp-seal',
      //       data: {
      //         title: 'Official Stamp',
      //         stampText: 'PAID',
      //         stampType: 'circular',
      //         status: 'PAID'
      //       }
      //     }]
      //   }))
      //   break
      case 'payment-terms':
        setInvoiceData(prev => ({
          ...prev,
          terms: prev.terms + '\n\nPayment Terms:\n• Net 30 days\n• Late payment fees apply\n• Payment via bank transfer or credit card'
        }))
        break
      case 'late-fees':
        setInvoiceData(prev => ({
          ...prev,
          terms: prev.terms + '\n\nLate Payment Fees:\n• 1.5% per month on overdue amounts\n• Additional $25 processing fee after 60 days\n• Legal action may be taken after 90 days'
        }))
        break
      case 'cancellation-policy':
        setInvoiceData(prev => ({
          ...prev,
          terms: prev.terms + '\n\nCancellation Policy:\n• 50% refund if cancelled within 24 hours\n• No refund after work has begun\n• Cancellation must be in writing'
        }))
        break
      case 'warranty-info':
        setInvoiceData(prev => ({
          ...prev,
          terms: prev.terms + '\n\nWarranty Information:\n• 90-day warranty on all services\n• Hardware warranty as per manufacturer\n• Software warranty covers functionality only'
        }))
        break
      case 'payment-info':
        setInvoiceData(prev => ({
          ...prev,
          customElements: [...prev.customElements, {
            id: Date.now(),
            type: 'payment-info',
            data: {
              title: 'Payment Information',
              bankTransfer: 'Account #123456789',
              creditCards: 'Visa, MasterCard, American Express',
              paypal: prev.businessInfo.email || 'business@email.com',
              checkPayable: prev.businessInfo.name || 'Your Company'
            }
          }]
        }))
        break
      case 'contact-info':
        setInvoiceData(prev => ({
          ...prev,
          customElements: [...prev.customElements, {
            id: Date.now(),
            type: 'contact-info',
            data: {
              title: 'Contact Information',
              phone: prev.businessInfo.phone || '+1 (555) 123-4567',
              email: prev.businessInfo.email || 'business@email.com',
              address: prev.businessInfo.address || 'Business Address',
              website: prev.businessInfo.website || 'www.yourcompany.com'
            }
          }]
        }))
        break
      default:
        console.log('Unknown element type:', element.id)
    }
  }

  const removeCustomElement = (elementId) => {
    setInvoiceData(prev => ({
      ...prev,
      customElements: prev.customElements.filter(el => el.id !== elementId)
    }))
  }

  const updateCustomElement = (elementId, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      customElements: prev.customElements.map(el => {
        if (el.id === elementId) {
          return {
            ...el,
            data: {
              ...el.data,
              [field]: value
            }
          }
        }
        return el
      })
    }))
  }

  const updateCustomElementNested = (elementId, path, value) => {
    setInvoiceData(prev => ({
      ...prev,
      customElements: prev.customElements.map(el => {
        if (el.id === elementId) {
          const newData = { ...el.data }
          const keys = path.split('.')
          let current = newData
          for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]]
          }
          current[keys[keys.length - 1]] = value
          return { ...el, data: newData }
        }
        return el
      })
    }))
  }

  const addItemToCustomElement = (elementId, itemType) => {
    setInvoiceData(prev => ({
      ...prev,
      customElements: prev.customElements.map(el => {
        if (el.id === elementId) {
          const newData = { ...el.data }
          switch (itemType) {
            case 'pricing-tier':
              newData.tiers = [...newData.tiers, {
                id: Date.now(),
                name: 'New Tier',
                price: 0,
                features: ['New Feature']
              }]
              break
            case 'tax-item':
              newData.taxes = [...newData.taxes, {
                id: Date.now(),
                name: 'New Tax',
                rate: 0,
                amount: 0
              }]
              break
            case 'installment':
              newData.installments = [...newData.installments, {
                id: Date.now(),
                dueDate: new Date().toISOString().split('T')[0],
                amount: 0,
                description: 'New Installment'
              }]
              break
            case 'time-entry':
              newData.entries = [...newData.entries, {
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                hours: 8,
                rate: 50,
                description: 'New time entry'
              }]
              break
            case 'discount':
              newData.discounts = [...newData.discounts, {
                id: Date.now(),
                type: 'percentage',
                value: 0,
                description: 'New discount'
              }]
              break
          }
          return { ...el, data: newData }
        }
        return el
      })
    }))
  }

  const removeItemFromCustomElement = (elementId, itemType, itemId) => {
    setInvoiceData(prev => ({
      ...prev,
      customElements: prev.customElements.map(el => {
        if (el.id === elementId) {
          const newData = { ...el.data }
          switch (itemType) {
            case 'pricing-tier':
              newData.tiers = newData.tiers.filter(tier => tier.id !== itemId)
              break
            case 'tax-item':
              newData.taxes = newData.taxes.filter(tax => tax.id !== itemId)
              break
            case 'installment':
              newData.installments = newData.installments.filter(installment => installment.id !== itemId)
              break
            case 'time-entry':
              newData.entries = newData.entries.filter(entry => entry.id !== itemId)
              break
            case 'discount':
              newData.discounts = newData.discounts.filter(discount => discount.id !== itemId)
              break
          }
          return { ...el, data: newData }
        }
        return el
      })
    }))
  }

  const reorderCustomElements = (fromIndex, toIndex) => {
    setInvoiceData(prev => {
      const newCustomElements = [...prev.customElements]
      const [movedElement] = newCustomElements.splice(fromIndex, 1)
      newCustomElements.splice(toIndex, 0, movedElement)
      return {
        ...prev,
        customElements: newCustomElements
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 border-b bg-white border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Invoice Creator</h1>
              {isSaving && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-500"
                >
                  Saving...
                </motion.div>
              )}
              {lastSaved && (
                <div className="text-sm text-gray-500">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Export Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport('PDF')}
              className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-lg font-medium transition-colors"
              title="Export PDF"
            >
              <Download className="w-5 h-5" />
            </motion.button>

            {/* Sidebar Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex h-screen">
        {/* Elements Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <ElementsSidebar 
              onClose={() => setShowSidebar(false)}
              onAddElement={handleAddElement}
            />
          )}
        </AnimatePresence>

        {/* Editor and Preview */}
        <div className="flex-1 flex">
          {/* Left Side - Editor */}
          <div 
            ref={editorRef}
            className="w-1/2 border-r border-gray-200"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <InvoiceEditor
              invoiceData={invoiceData}
              setInvoiceData={setInvoiceData}
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onRemoveItem={handleRemoveItem}
              calculateSubtotal={calculateSubtotal}
              calculateTax={calculateTax}
              calculateTotal={calculateTotal}
              customElements={invoiceData.customElements}
              onRemoveCustomElement={removeCustomElement}
              onUpdateCustomElement={updateCustomElement}
              onUpdateCustomElementNested={updateCustomElementNested}
              onAddItemToCustomElement={addItemToCustomElement}
              onRemoveItemFromCustomElement={removeItemFromCustomElement}
              onReorderCustomElements={reorderCustomElements}
            />
          </div>

          {/* Right Side - Live Preview */}
          <div className="w-1/2">
            <InvoicePreview
              invoiceData={invoiceData}
              calculateSubtotal={calculateSubtotal}
              calculateTax={calculateTax}
              calculateTotal={calculateTotal}
            />
          </div>
        </div>
      </div>
 
    </div>
  )
} 
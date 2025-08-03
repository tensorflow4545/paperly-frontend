"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
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

        // Create a clone of the preview element to avoid modifying the original
        const clonedElement = previewElement.cloneNode(true)
        clonedElement.style.position = 'absolute'
        clonedElement.style.left = '-9999px'
        clonedElement.style.top = '0'
        document.body.appendChild(clonedElement)

        // Remove any problematic CSS that might cause issues
        const styleSheets = document.styleSheets
        for (let i = 0; i < styleSheets.length; i++) {
          try {
            const rules = styleSheets[i].cssRules || styleSheets[i].rules
            for (let j = 0; j < rules.length; j++) {
              const rule = rules[j]
              if (rule.style && rule.style.cssText.includes('oklch')) {
                rule.style.cssText = rule.style.cssText.replace(/oklch\([^)]+\)/g, 'rgb(0, 0, 0)')
              }
            }
          } catch (e) {
            // Ignore CORS errors
          }
        }

        const canvas = await html2canvas(clonedElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          removeContainer: true
        })

        // Remove the cloned element
        document.body.removeChild(clonedElement)

        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4')
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
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50')
  }

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50')
    
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
      case 'logo-upload':
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (e) => {
          const file = e.target.files[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
              setInvoiceData(prev => ({
                ...prev,
                businessInfo: {
                  ...prev.businessInfo,
                  logo: e.target.result
                }
              }))
            }
            reader.readAsDataURL(file)
          }
        }
        input.click()
        break
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
      case 'stamp-seal':
        setInvoiceData(prev => ({
          ...prev,
          customElements: [...prev.customElements, {
            id: Date.now(),
            type: 'stamp-seal',
            data: {
              title: 'Official Stamp',
              stampText: 'PAID',
              stampType: 'circular',
              status: 'PAID'
            }
          }]
        }))
        break
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
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <div>
              <h1 className="text-xl font-semibold">Invoice Creator</h1>
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
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Export PDF
            </motion.button>

            {/* Sidebar Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
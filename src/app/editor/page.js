"use client"

import { useState, useEffect, Suspense, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import EditorLayout from "@/components/Editor/EditorLayout"
import PageSEO from "@/components/SEO/PageSEO"

function EditorContent() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  
  const [invoiceData, setInvoiceData] = useState({
    // Basic Info
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    
    // Sender Info
    senderName: "",
    senderTitle: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    senderTaxId: "",
    
    // Recipient Info
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    recipientTaxId: "",
    
    // Items
    items: [
      {
        id: 1,
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0
      }
    ],
    
    // Payment Info
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    total: 0,
    currency: "USD",
    paymentTerms: "Net 30",
    
    // Additional Info
    notes: "",
    terms: ""
  })

  // Load template-specific default data
  useEffect(() => {
    if (templateId) {
      const templateDefaults = getTemplateDefaults(templateId)
      setInvoiceData(prev => ({ ...prev, ...templateDefaults }))
    }
  }, [templateId])

  const getTemplateDefaults = (templateId) => {
    const defaults = {
      quickbill: {
        senderName: "John Smith",
        senderTitle: "Freelance Designer",
        senderEmail: "demo@pay.com",
        recipientName: "Tech Startup Inc.",
        recipientEmail: "demo@pay.com",
        invoiceNumber: "QB-2024-001",
        items: [{ id: 1, description: "Website Design & Development", quantity: 1, rate: 1500, amount: 1500 }],
        subtotal: 1500,
        total: 1500
      },
      standardpro: {
        senderName: "Sarah Johnson",
        senderTitle: "Marketing Consultant",
        senderEmail: "demo@pay.com",
        senderPhone: "+1 (555) 123-4567",
        recipientName: "Acme Corporation",
        recipientEmail: "demo@pay.com",
        recipientAddress: "123 Business St, NY 10001",
        invoiceNumber: "SP-2024-002",
        items: [
          { id: 1, description: "Strategy Session", quantity: 4, rate: 150, amount: 600 },
          { id: 2, description: "Campaign Design", quantity: 1, rate: 800, amount: 800 }
        ],
        subtotal: 1400,
        taxRate: 10,
        taxAmount: 140,
        total: 1540
      },
      businessedge: {
        senderName: "Digital Solutions LLC",
        senderEmail: "demo@pay.com",
        senderPhone: "+1 (555) 987-6543",
        senderAddress: "San Francisco, CA",
        senderTaxId: "GST: 27ABCDE1234F1Z5",
        recipientName: "Global Enterprises Ltd.",
        recipientEmail: "demo@pay.com",
        recipientAddress: "456 Corporate Ave, London, UK",
        recipientTaxId: "VAT: GB123456789",
        invoiceNumber: "BE-2024-003",
        items: [
          { id: 1, description: "Digital Transformation Consulting", quantity: 20, rate: 200, amount: 4000 },
          { id: 2, description: "System Integration", quantity: 1, rate: 5000, amount: 5000 },
          { id: 3, description: "Training & Support", quantity: 8, rate: 150, amount: 1200 }
        ],
        subtotal: 10200,
        taxRate: 15,
        taxAmount: 1530,
        total: 11730
      },
      contractorplus: {
        senderName: "Mike Chen",
        senderTitle: "Independent Contractor",
        senderEmail: "demo@pay.com",
        senderPhone: "+1 (555) 456-7890",
        senderAddress: "Austin, TX",
        recipientName: "Construction Co.",
        recipientEmail: "demo@pay.com",
        recipientAddress: "789 Build St, Austin, TX 78701",
        invoiceNumber: "CP-2024-004",
        items: [
          { id: 1, description: "Electrical Work", quantity: 16, rate: 75, amount: 1200 },
          { id: 2, description: "Materials", quantity: 1, rate: 450, amount: 450 },
          { id: 3, description: "Permit Fees", quantity: 1, rate: 200, amount: 200 }
        ],
        subtotal: 1850,
        taxRate: 8.25,
        taxAmount: 152.63,
        total: 2002.63
      },
      enterpriseinvoice: {
        senderName: "Enterprise Solutions Inc.",
        senderEmail: "demo@pay.com",
        senderPhone: "+1 (555) 321-6547",
        senderAddress: "New York, NY",
        senderTaxId: "EIN: 12-3456789",
        recipientName: "Fortune 500 Corp",
        recipientEmail: "demo@pay.com",
        recipientAddress: "1000 Corporate Blvd, NY 10001",
        recipientTaxId: "TAX ID: 98-7654321",
        invoiceNumber: "EI-2024-005",
        items: [
          { id: 1, description: "Enterprise Software License", quantity: 100, rate: 500, amount: 50000 },
          { id: 2, description: "Implementation Services", quantity: 40, rate: 300, amount: 12000 },
          { id: 3, description: "Annual Support", quantity: 1, rate: 15000, amount: 15000 },
          { id: 4, description: "Custom Development", quantity: 80, rate: 200, amount: 16000 }
        ],
        subtotal: 93000,
        taxRate: 8.875,
        taxAmount: 8253.75,
        total: 101253.75
      },
      creativeagency: {
        senderName: "Creative Studio Agency",
        senderEmail: "demo@pay.com",
        senderPhone: "+1 (555) 789-0123",
        senderAddress: "Los Angeles, CA",
        senderTaxId: "EIN: 45-6789012",
        recipientName: "Fashion Brand LLC",
        recipientEmail: "demo@pay.com",
        recipientAddress: "567 Style Ave, LA 90210",
        recipientTaxId: "TAX ID: 34-5678901",
        invoiceNumber: "CA-2024-006",
        items: [
          { id: 1, description: "Brand Identity Design", quantity: 1, rate: 5000, amount: 5000 },
          { id: 2, description: "Logo Design (3 concepts)", quantity: 1, rate: 2500, amount: 2500 },
          { id: 3, description: "Marketing Materials", quantity: 1, rate: 3000, amount: 3000 },
          { id: 4, description: "Social Media Graphics", quantity: 1, rate: 2000, amount: 2000 },
          { id: 5, description: "Website Mockups (3 rounds)", quantity: 1, rate: 4500, amount: 4500 },
          { id: 6, description: "Final Logo Files (AI, EPS, PNG)", quantity: 1, rate: 1200, amount: 1200 },
          { id: 7, description: "Brand Asset Package", quantity: 1, rate: 1500, amount: 1500 }
        ],
        subtotal: 17500,
        taxRate: 8.5,
        taxAmount: 1487.5,
        total: 19987.5
      },
      servicecontract: {
        senderName: "Legal Associates LLC",
        senderTitle: "Senior Partner: David Wilson",
        senderEmail: "demo@pay.com",
        senderPhone: "+1 (555) 321-9876",
        senderAddress: "789 Legal Plaza, Boston, MA 02101",
        senderTaxId: "TAX ID: 12-3456789",
        recipientName: "Tech Startup Corp",
        recipientEmail: "demo@pay.com",
        recipientAddress: "123 Business Ave, NY 10001",
        recipientTaxId: "TAX ID: 98-7654321",
        invoiceNumber: "SC-2024-001",
        items: [
          { id: 1, description: "Legal Consultation", quantity: 15, rate: 300, amount: 4500 },
          { id: 2, description: "Contract Review & Analysis", quantity: 8, rate: 350, amount: 2800 },
          { id: 3, description: "Legal Documentation", quantity: 5, rate: 275, amount: 1375 }
        ],
        subtotal: 8675,
        taxRate: 0,
        taxAmount: 2000,
        total: 6675
      },
      subscriptionbilling: {
        senderName: "CloudTech Solutions",
        senderEmail: "demo@pay.com",
        senderPhone: "+1 (555) 867-5309",
        senderAddress: "456 Tech Drive, San Francisco, CA 94105",
        senderTaxId: "EIN: 45-6789012",
        recipientName: "Digital Agency Inc.",
        recipientEmail: "demo@pay.com",
        recipientAddress: "789 Business St, Austin, TX 78701",
        recipientTaxId: "DA-5678",
        invoiceNumber: "SB-2024-002",
        items: [
          { id: 1, description: "Professional Plan", quantity: 1, rate: 99, amount: 99 },
          { id: 2, description: "Additional Users (5)", quantity: 5, rate: 15, amount: 75 },
          { id: 3, description: "API Usage Overage", quantity: 2500, rate: 0.01, amount: 25 },
          { id: 4, description: "Annual Discount", quantity: 1, rate: -19.90, amount: -19.90 }
        ],
        subtotal: 179.10,
        taxRate: 8.5,
        taxAmount: 15.22,
        total: 194.32
      },
      retailproduct: {
        senderName: "Premium Electronics",
        senderEmail: "demo@pay.com",
        senderPhone: "+1 (555) 234-5678",
        senderAddress: "123 Retail Street, Los Angeles, CA 90210",
        senderTaxId: "Business License: BL-12345",
        recipientName: "Sarah Johnson",
        recipientEmail: "demo@pay.com",
        recipientAddress: "456 Customer Avenue, New York, NY 10001",
        recipientTaxId: "CU-9876",
        invoiceNumber: "RP-2024-003",
        items: [
          { id: 1, description: "Wireless Headphones", quantity: 2, rate: 149.99, amount: 299.98 },
          { id: 2, description: "Phone Case", quantity: 1, rate: 24.99, amount: 24.99 },
          { id: 3, description: "Screen Protector", quantity: 1, rate: 12.99, amount: 12.99 }
        ],
        subtotal: 337.96,
        taxRate: 8.25,
        taxAmount: 27.88,
        total: 381.83
      }
    }
    
    return defaults[templateId] || {}
  }

  const updateInvoiceData = (field, value) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }))
  }

  const updateItem = (id, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  const addItem = () => {
    const newId = Math.max(...invoiceData.items.map(item => item.id)) + 1
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, description: "", quantity: 1, rate: 0, amount: 0 }]
    }))
  }

  const removeItem = (id) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const calculateTotals = useCallback(() => {
    const subtotal = invoiceData.items.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0
      const rate = parseFloat(item.rate) || 0
      const amount = quantity * rate
      return sum + amount
    }, 0)
    const taxAmount = (subtotal * invoiceData.taxRate) / 100
    const total = subtotal + taxAmount
    
    setInvoiceData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
    }))
  }, [invoiceData.items, invoiceData.taxRate])

  useEffect(() => {
    calculateTotals()
  }, [calculateTotals])

  if (!templateId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Template Not Found</h1>
          <p className="text-gray-600 mb-6">Please select a template to edit.</p>
          <a 
            href="/template" 
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Templates
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageSEO pageName="editor" />
      <EditorLayout
        templateId={templateId}
        invoiceData={invoiceData}
        updateInvoiceData={updateInvoiceData}
        updateItem={updateItem}
        addItem={addItem}
        removeItem={removeItem}
      />
    </>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditorContent />
    </Suspense>
  )
} 
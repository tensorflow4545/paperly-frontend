"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import EditorLayout from "@/components/Editor/EditorLayout"

export default function EditorPage() {
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
        senderEmail: "john@design.com",
        recipientName: "Tech Startup Inc.",
        recipientEmail: "contact@techstartup.com",
        invoiceNumber: "QB-2024-001",
        items: [{ id: 1, description: "Website Design & Development", quantity: 1, rate: 1500, amount: 1500 }],
        subtotal: 1500,
        total: 1500
      },
      standardpro: {
        senderName: "Sarah Johnson",
        senderTitle: "Marketing Consultant",
        senderEmail: "sarah@consulting.com",
        senderPhone: "+1 (555) 123-4567",
        recipientName: "Acme Corporation",
        recipientEmail: "billing@acmecorp.com",
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
        senderEmail: "info@digitalsolutions.com",
        senderPhone: "+1 (555) 987-6543",
        senderAddress: "San Francisco, CA",
        senderTaxId: "GST: 27ABCDE1234F1Z5",
        recipientName: "Global Enterprises Ltd.",
        recipientEmail: "accounts@globalent.com",
        recipientAddress: "London, UK",
        recipientTaxId: "VAT: GB123456789",
        invoiceNumber: "BE-2024-003",
        items: [
          { id: 1, description: "Web Development", quantity: 1, rate: 3500, amount: 3500 },
          { id: 2, description: "SEO Optimization", quantity: 1, rate: 800, amount: 800 }
        ],
        subtotal: 4300,
        taxRate: 15,
        taxAmount: 645,
        total: 4945
      },
      contractorplus: {
        senderName: "Alex Rodriguez",
        senderTitle: "Senior Full-Stack Developer",
        senderEmail: "alex@devpro.com",
        senderPhone: "+1 (555) 456-7890",
        recipientName: "TechCorp Solutions",
        recipientEmail: "billing@techcorp.com",
        recipientAddress: "San Francisco, CA",
        invoiceNumber: "CP-2024-004",
        items: [
          { id: 1, description: "Milestone 1: Backend API", quantity: 40, rate: 75, amount: 3000 },
          { id: 2, description: "Milestone 2: Frontend UI", quantity: 25, rate: 75, amount: 1875 }
        ],
        subtotal: 4875,
        total: 5375
      },
      enterpriseinvoice: {
        senderName: "Innovation Agency Ltd.",
        senderEmail: "billing@innovationagency.com",
        senderPhone: "+1 (555) 789-0123",
        senderAddress: "New York, NY",
        senderTaxId: "Tax ID: 12-3456789",
        recipientName: "Global Tech Solutions",
        recipientEmail: "accounts@globaltech.com",
        recipientAddress: "London, UK",
        recipientTaxId: "VAT: GB987654321",
        invoiceNumber: "EI-2024-005",
        items: [
          { id: 1, description: "UI/UX Design", quantity: 1, rate: 2500, amount: 2500 },
          { id: 2, description: "Brand Guidelines", quantity: 1, rate: 800, amount: 800 },
          { id: 3, description: "Frontend Development", quantity: 1, rate: 4200, amount: 4200 },
          { id: 4, description: "Backend API", quantity: 1, rate: 3800, amount: 3800 },
          { id: 5, description: "Testing & Quality Assurance", quantity: 1, rate: 1500, amount: 1500 }
        ],
        subtotal: 12800,
        taxRate: 20,
        taxAmount: 2560,
        total: 15360
      },
      creativeagency: {
        senderName: "Design Studio Pro",
        senderTitle: "Creative Director: Sarah Chen",
        senderEmail: "sarah@designstudiopro.com",
        senderPhone: "+1 (555) 234-5678",
        recipientName: "Innovation Tech Co.",
        recipientTitle: "Marketing Director: Mike Johnson",
        recipientEmail: "mike@innovationtech.com",
        invoiceNumber: "CA-2024-006",
        items: [
          { id: 1, description: "Brand Analysis & Competitor Research", quantity: 1, rate: 2500, amount: 2500 },
          { id: 2, description: "User Persona Development", quantity: 1, rate: 1800, amount: 1800 },
          { id: 3, description: "Logo Design (3 concepts)", quantity: 1, rate: 3200, amount: 3200 },
          { id: 4, description: "Brand Guidelines & Style Guide", quantity: 1, rate: 2800, amount: 2800 },
          { id: 5, description: "Website Mockups (3 rounds)", quantity: 1, rate: 4500, amount: 4500 },
          { id: 6, description: "Final Logo Files (AI, EPS, PNG)", quantity: 1, rate: 1200, amount: 1200 },
          { id: 7, description: "Brand Asset Package", quantity: 1, rate: 1500, amount: 1500 }
        ],
        subtotal: 17500,
        taxRate: 8.5,
        taxAmount: 1487.5,
        total: 19987.5
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

  const calculateTotals = () => {
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
  }

  useEffect(() => {
    calculateTotals()
  }, [invoiceData.items, invoiceData.taxRate])

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
    <EditorLayout
      templateId={templateId}
      invoiceData={invoiceData}
      updateInvoiceData={updateInvoiceData}
      updateItem={updateItem}
      addItem={addItem}
      removeItem={removeItem}
    />
  )
} 
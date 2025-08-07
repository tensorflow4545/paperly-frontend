"use client"

import { useState } from "react"

const templates = [
  {
    id: "quickbill",
    name: "QuickBill",
    category: "Basic",
    description: "Clean, minimal invoice for quick tasks and one-time services. Perfect for early-stage freelancers or personal gigs.",
    features: ["Fast Generation", "Essential Fields", "Freelancer", "Quick Tasks"],
    backgroundColor: "bg-gray-50",
    preview: {
      type: "quickbill",
    },
  },
  {
    id: "standardpro",
    name: "StandardPro",
    category: "Intermediate",
    description: "Well-structured invoice with itemized services and payment details. Ideal for part-time freelancers and small businesses.",
    features: ["Itemized Services", "Payment Methods", "Professional", "Small Business"],
    backgroundColor: "bg-blue-50",
    preview: {
      type: "standardpro",
    },
  },
  {
    id: "businessedge",
    name: "BusinessEdge",
    category: "Advanced",
    description: "Professional and legally sound with tax details and company information. Perfect for tax-compliant freelancers.",
    features: ["Tax Compliant", "Company Details", "Legal Ready", "International"],
    backgroundColor: "bg-gray-50",
    preview: {
      type: "businessedge",
    },
  },
  {
    id: "contractorplus",
    name: "ContractorPlus",
    category: "Pro Level",
    description: "Advanced billing with milestones, time tracking, and contract management. For professional consultants and developers.",
    features: ["Milestone Billing", "Time Tracking", "Contract Management", "Consultants"],
    backgroundColor: "bg-blue-50",
    preview: {
      type: "contractorplus",
    },
  },
  {
    id: "enterpriseinvoice",
    name: "EnterpriseInvoice",
    category: "Ultimate",
    description: "Enterprise-grade invoice with multi-department billing, multi-currency, and advanced compliance features.",
    features: ["Multi-Department", "Multi-Currency", "Enterprise Ready", "Audit Compliant"],
    backgroundColor: "bg-gray-50",
    preview: {
      type: "enterpriseinvoice",
    },
  },
  {
    id: "creativeagency",
    name: "CreativeAgency",
    category: "Creative",
    description: "Specialized invoice for creative agencies with project phases, design iterations, and creative deliverables tracking.",
    features: ["Project Phases", "Design Iterations", "Creative Deliverables", "Client Feedback", "Asset Management", "Brand Guidelines"],
    backgroundColor: "bg-gray-50",
    preview: {
      type: "creativeagency",
    },
  },
]

function TemplatePreview({ template, onPreview }) {
  const renderPreview = () => {
    switch (template.preview.type) {
      case "quickbill":
  return (
          <div className="bg-white max-w-[523px] p-4 text-xs shadow-sm rounded-lg">
            <div className="text-center mb-4">
              <div className="text-lg font-bold text-gray-800 mb-1">INVOICE</div>
              <div className="text-gray-500 text-xs">QuickBill</div>
        </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">From:</div>
                <div className="font-bold text-sm">John Smith</div>
                <div className="text-gray-600 text-xs">Freelance Designer</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">To:</div>
                <div className="font-bold text-sm">Tech Startup Inc.</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">QB-2024-001</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">Dec 15, 2024</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">Dec 30, 2024</div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded mb-4">
              <div className="font-semibold text-gray-700 mb-2 text-xs">Service Description:</div>
              <div className="text-gray-800 text-sm">Website Design & Development</div>
              <div className="text-gray-600 text-xs mt-1">Complete responsive website with modern design</div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-gray-800">$1,500.00</div>
              <div className="text-gray-600 text-xs">Total Amount</div>
            </div>
          </div>
        )

      case "standardpro":
        return (
          <div className="bg-white max-w-[523px] p-4 text-xs shadow-sm rounded-lg">
            <div className="bg-[#fefce8] text-white p-3 rounded-t-lg -m-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-black">StandardPro</div>
                <div className="text-black text-xs">Professional Invoice</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">From:</div>
                <div className="font-bold text-sm">Sarah Johnson</div>
                <div className="text-gray-600 text-xs">Marketing Consultant</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
                <div className="text-gray-600 text-xs">+1 (555) 123-4567</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">To:</div>
                <div className="font-bold text-sm">Acme Corporation</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
                <div className="text-gray-600 text-xs">123 Business St, NY 10001</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">SP-2024-002</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">Dec 20, 2024</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">Jan 20, 2025</div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left py-1 font-semibold">Service</th>
                    <th className="text-left py-1 font-semibold">Qty</th>
                    <th className="text-left py-1 font-semibold">Rate</th>
                    <th className="text-right py-1 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">Strategy Session</td>
                    <td className="py-1">4 hours</td>
                    <td className="py-1">$150/hr</td>
                    <td className="py-1 text-right font-semibold">$600.00</td>
                  </tr>
                  <tr>
                    <td className="py-1">Campaign Design</td>
                    <td className="py-1">1</td>
                    <td className="py-1">$800</td>
                    <td className="py-1 text-right font-semibold">$800.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-right space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">$1,400.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Tax (10%):</span>
                <span className="font-semibold">$140.00</span>
              </div>
              <div className="border-t pt-1">
                <div className="text-lg font-bold text-blue-600">$1,540.00</div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-600">
              <div></div>
            </div>
          </div>
        )

      case "businessedge":
        return (
          <div className="bg-white max-w-[523px] p-4 text-xs shadow-sm rounded-lg">
            <div className="bg-gray-800 text-white p-3 rounded-t-lg -m-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">BusinessEdge</div>
                  <div className="text-gray-300 text-xs">Professional Services</div>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="text-gray-800 font-bold text-sm">BE</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">From:</div>
                <div className="font-bold text-sm">Digital Solutions LLC</div>
                <div className="text-gray-600 text-xs">GST: 27ABCDE1234F1Z5</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
                <div className="text-gray-600 text-xs">+1 (555) 987-6543</div>
                <div className="text-gray-600 text-xs">San Francisco, CA</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">To:</div>
                <div className="font-bold text-sm">Global Enterprises Ltd.</div>
                <div className="text-gray-600 text-xs">VAT: GB123456789</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
                <div className="text-gray-600 text-xs">London, UK</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">BE-2024-003</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">Dec 25, 2024</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Terms:</div>
                <div className="font-bold">Net 30</div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-1 font-semibold">Service</th>
                    <th className="text-left py-1 font-semibold">Description</th>
                    <th className="text-right py-1 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1 font-semibold">Web Development</td>
                    <td className="py-1">E-commerce platform with payment integration</td>
                    <td className="py-1 text-right font-semibold">$3,500.00</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold">SEO Optimization</td>
                    <td className="py-1">Search engine optimization and analytics setup</td>
                    <td className="py-1 text-right font-semibold">$800.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-right space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">$4,300.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Tax (15%):</span>
                <span className="font-semibold">$645.00</span>
              </div>
              <div className="border-t pt-1">
                <div className="text-lg font-bold text-gray-800">$4,945.00</div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-600">
              <div></div>
            </div>
          </div>
        )

      case "contractorplus":
        return (
          <div className="bg-white max-w-[523px] p-4 text-xs shadow-sm rounded-lg">
            <div className="bg-[#fefce8] text-white p-3 rounded-t-lg -m-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold text-black">ContractorPlus</div>
                  <div className="text-black text-xs">Professional Contracting</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-black">Project: CRM System</div>
                  <div className="text-xs text-black"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">Contractor:</div>
                <div className="font-bold text-sm">Alex Rodriguez</div>
                <div className="text-gray-600 text-xs">Senior Full-Stack Developer</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
                <div className="text-gray-600 text-xs">+1 (555) 456-7890</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">Client:</div>
                <div className="font-bold text-sm">TechCorp Solutions</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
                <div className="text-gray-600 text-xs">San Francisco, CA</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">CP-2024-004</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Period:</div>
                <div className="font-bold">Dec 1-15, 2024</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">Jan 15, 2025</div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded mb-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Milestone 1: Backend API</span>
                    </div>
                    <div className="text-xs text-gray-600">40 hours @ $75/hr</div>
                  </div>
                  <div className="font-bold">$3,000.00</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Milestone 2: Frontend UI</span>
                    </div>
                    <div className="text-xs text-gray-600">25 hours @ $75/hr</div>
                  </div>
                  <div className="font-bold">$1,875.00</div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">$4,875.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Retainer Fee:</span>
                <span className="font-semibold">$500.00</span>
              </div>
              <div className="border-t pt-1">
                <div className="text-lg font-bold text-blue-600">$5,375.00</div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-600">
              <div></div>
            </div>
          </div>
        )

      case "enterpriseinvoice":
            return (
          <div className="bg-white max-w-[523px] p-4 text-xs shadow-sm rounded-lg">
            <div className="bg-gray-800 text-white p-3 rounded-t-lg -m-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">EnterpriseInvoice</div>
                  <div className="text-gray-300 text-xs">Multi-Department Billing</div>
                </div>
                <div className="text-right">
                  <div className="text-xs">PO: EN-2024-001</div>
                  <div className="text-xs">Status: Approved</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">From:</div>
                <div className="font-bold text-sm">Innovation Agency Ltd.</div>
                <div className="text-gray-600 text-xs">Tax ID: 12-3456789</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
                <div className="text-gray-600 text-xs">+1 (555) 789-0123</div>
                <div className="text-gray-600 text-xs">New York, NY</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">To:</div>
                <div className="font-bold text-sm">Global Tech Solutions</div>
                <div className="text-gray-600 text-xs">VAT: GB987654321</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
                <div className="text-gray-600 text-xs">London, UK</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">EI-2024-005</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">Dec 30, 2024</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Currency:</div>
                <div className="font-bold">USD</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Terms:</div>
                <div className="font-bold">Net 45</div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded mb-4">
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-800 mb-2 text-xs">Design Department</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>UI/UX Design</span>
                      <span className="font-semibold">$2,500.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Brand Guidelines</span>
                      <span className="font-semibold">$800.00</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-semibold text-gray-800 mb-2 text-xs">Development Department</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Frontend Development</span>
                      <span className="font-semibold">$4,200.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Backend API</span>
                      <span className="font-semibold">$3,800.00</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-semibold text-gray-800 mb-2 text-xs">QA Department</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Testing & Quality Assurance</span>
                      <span className="font-semibold">$1,500.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">$12,800.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Tax (20%):</span>
                <span className="font-semibold">$2,560.00</span>
              </div>
              <div className="border-t pt-1">
                <div className="text-lg font-bold text-gray-800">$15,360.00</div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-600">
              <div></div>
            </div>
          </div>
        )

      case "creativeagency":
        return (
          <div className="bg-white max-w-[523px] p-4 text-xs shadow-sm rounded-lg">
            <div className="bg-[#fefce8] text-black p-3 rounded-t-lg -m-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">CreativeAgency</div>
                  <div className="text-black text-xs">Creative Services</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-black">Project: Brand Redesign</div>
                  <div className="text-xs text-black">Phase: Final Delivery</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">Agency:</div>
                <div className="font-bold text-sm">Design Studio Pro</div>
                <div className="text-gray-600 text-xs">Creative Director: Sarah Chen</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
                <div className="text-gray-600 text-xs">+1 (555) 234-5678</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-xs">Client:</div>
                <div className="font-bold text-sm">Innovation Tech Co.</div>
                <div className="text-gray-600 text-xs">Marketing Director: Mike Johnson</div>
                <div className="text-gray-600 text-xs">demo@pay.com</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">CA-2024-006</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">Jan 5, 2025</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">Jan 20, 2025</div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded mb-4">
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-800 mb-2 text-xs">Phase 1: Discovery & Research</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Brand Analysis & Competitor Research</span>
                      <span className="font-semibold">$2,500.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>User Persona Development</span>
                      <span className="font-semibold">$1,800.00</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-semibold text-gray-800 mb-2 text-xs">Phase 2: Design & Iteration</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Logo Design (3 concepts)</span>
                      <span className="font-semibold">$3,200.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Brand Guidelines & Style Guide</span>
                      <span className="font-semibold">$2,800.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Website Mockups (3 rounds)</span>
                      <span className="font-semibold">$4,500.00</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-semibold text-gray-800 mb-2 text-xs">Phase 3: Final Deliverables</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Final Logo Files (AI, EPS, PNG)</span>
                      <span className="font-semibold">$1,200.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Brand Asset Package</span>
                      <span className="font-semibold">$1,500.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">$17,500.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Revision Credits (2):</span>
                <span className="font-semibold">$1,000.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Tax (8.5%):</span>
                <span className="font-semibold">$1,487.50</span>
              </div>
              <div className="border-t pt-1">
                <div className="text-lg font-bold text-gray-800">$19,987.50</div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-600">
              <div></div>
            </div>
          </div>
        )

      default:
        return <div className="bg-white p-4 text-center text-gray-500">Template Preview</div>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Template Preview with Background */}
      <div className={`${template.backgroundColor} p-4`}>
        <div style={{ overflow: "hidden" }}>{renderPreview()}</div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
          <h3 className="text-base font-bold text-gray-900">{template.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                      {template.category}
                    </span>
                  </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{template.description}</p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {template.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
          <a 
            href={`/editor?template=${template.id}`}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors duration-200 text-center"
          >
                      Try Template
                    </a>
          <button 
            onClick={() => onPreview(template)}
            className="hidden md:block px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm font-medium transition-colors duration-200"
          >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            )
}

function PreviewModal({ template, isOpen, onClose }) {
  if (!isOpen || !template) return null

  const renderFullPreview = () => {
    switch (template.preview.type) {
      case "quickbill":
        return (
          <div className="bg-white max-w-2xl mx-auto p-4 text-sm shadow-lg rounded-lg">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gray-800 mb-1">INVOICE</div>
              <div className="text-gray-500 text-sm">QuickBill</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-sm">From:</div>
                <div className="font-bold text-lg">John Smith</div>
                <div className="text-gray-600 text-sm">Freelance Designer</div>
                <div className="text-gray-600 text-sm">demo@pay.com</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-sm">To:</div>
                <div className="font-bold text-lg">Tech Startup Inc.</div>
                <div className="text-gray-600 text-sm">demo@pay.com</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold text-base">QB-2024-001</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold text-base">Dec 15, 2024</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold text-base">Dec 30, 2024</div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="font-semibold text-gray-700 mb-2 text-sm">Service Description:</div>
              <div className="text-gray-800 text-base">Website Design & Development</div>
              <div className="text-gray-600 text-sm mt-1">Complete responsive website with modern design</div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">$1,500.00</div>
              <div className="text-gray-600 text-sm">Total Amount</div>
            </div>
          </div>
        )

      case "standardpro":
        return (
          <div className="bg-white max-w-2xl mx-auto p-4 text-sm shadow-lg rounded-lg">
            <div className="bg-[#fefce8] text-black p-3 rounded-t-lg -m-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">StandardPro</div>
                <div className="text-black text-sm">Professional Invoice</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-sm">From:</div>
                <div className="font-bold text-lg">Sarah Johnson</div>
                <div className="text-gray-600 text-sm">Marketing Consultant</div>
                <div className="text-gray-600 text-sm">demo@pay.com</div>
                <div className="text-gray-600 text-sm">+1 (555) 123-4567</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1 text-sm">To:</div>
                <div className="font-bold text-lg">Acme Corporation</div>
                <div className="text-gray-600 text-sm">demo@pay.com</div>
                <div className="text-gray-600 text-sm">123 Business St, NY 10001</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold text-base">SP-2024-002</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold text-base">Dec 20, 2024</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold text-base">Jan 20, 2025</div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left py-1 font-semibold">Service</th>
                    <th className="text-left py-1 font-semibold">Qty</th>
                    <th className="text-left py-1 font-semibold">Rate</th>
                    <th className="text-right py-1 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">Strategy Session</td>
                    <td className="py-1">4 hours</td>
                    <td className="py-1">$150/hr</td>
                    <td className="py-1 text-right font-semibold">$600.00</td>
                  </tr>
                  <tr>
                    <td className="py-1">Campaign Design</td>
                    <td className="py-1">1</td>
                    <td className="py-1">$800</td>
                    <td className="py-1 text-right font-semibold">$800.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-right space-y-1 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-semibold">$1,400.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%):</span>
                <span className="font-semibold">$140.00</span>
              </div>
              <div className="border-t pt-1">
                <div className="text-xl font-bold text-blue-600">$1,540.00</div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <div></div>
            </div>
          </div>
        )

      case "businessedge":
        return (
          <div className="bg-white max-w-4xl mx-auto p-8 text-sm shadow-lg rounded-lg">
            <div className="bg-gray-800 text-white p-6 rounded-t-lg -m-8 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-4xl font-bold">BusinessEdge</div>
                  <div className="text-gray-300 text-lg">Professional Services</div>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="text-gray-800 font-bold text-lg">BE</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="font-semibold text-gray-700 mb-3 text-lg">From:</div>
                <div className="font-bold text-2xl">Digital Solutions LLC</div>
                <div className="text-gray-600 text-lg">GST: 27ABCDE1234F1Z5</div>
                <div className="text-gray-600 text-lg">demo@pay.com</div>
                <div className="text-gray-600 text-lg">+1 (555) 987-6543</div>
                <div className="text-gray-600 text-lg">San Francisco, CA</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-3 text-lg">To:</div>
                <div className="font-bold text-2xl">Global Enterprises Ltd.</div>
                <div className="text-gray-600 text-lg">VAT: GB123456789</div>
                <div className="text-gray-600 text-lg">demo@pay.com</div>
                <div className="text-gray-600 text-lg">London, UK</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8 text-lg">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold text-xl">BE-2024-003</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold text-xl">Dec 25, 2024</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Terms:</div>
                <div className="font-bold text-xl">Net 30</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <table className="w-full text-lg">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-semibold">Service</th>
                    <th className="text-left py-3 font-semibold">Description</th>
                    <th className="text-right py-3 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 font-semibold">Web Development</td>
                    <td className="py-3">E-commerce platform with payment integration</td>
                    <td className="py-3 text-right font-semibold">$3,500.00</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">SEO Optimization</td>
                    <td className="py-3">Search engine optimization and analytics setup</td>
                    <td className="py-3 text-right font-semibold">$800.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-right space-y-3 mb-8">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold">$4,300.00</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Tax (15%):</span>
                <span className="font-semibold">$645.00</span>
              </div>
              <div className="border-t pt-3">
                <div className="text-3xl font-bold text-gray-800">$4,945.00</div>
              </div>
            </div>

            <div className="text-center text-lg text-gray-600">
              <div></div>
            </div>
          </div>
        )

      case "contractorplus":
        return (
          <div className="bg-white max-w-4xl mx-auto p-8 text-sm shadow-lg rounded-lg">
            <div className="bg-[#fefce8] text-white p-6 rounded-t-lg -m-8 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-4xl font-bold text-black">ContractorPlus</div>
                  <div className="text-black text-lg">Professional Contracting</div>
                </div>
                <div className="text-right">
                  <div className="text-lg text-black">Project: CRM System</div>
                  <div className="text-lg text-black"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="font-semibold text-gray-700 mb-3 text-lg">Contractor:</div>
                <div className="font-bold text-2xl">Alex Rodriguez</div>
                <div className="text-gray-600 text-lg">Senior Full-Stack Developer</div>
                <div className="text-gray-600 text-lg">demo@pay.com</div>
                <div className="text-gray-600 text-lg">+1 (555) 456-7890</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-3 text-lg">Client:</div>
                <div className="font-bold text-2xl">TechCorp Solutions</div>
                <div className="text-gray-600 text-lg">demo@pay.com</div>
                <div className="text-gray-600 text-lg">San Francisco, CA</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8 text-lg">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold text-xl">CP-2024-004</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Period:</div>
                <div className="font-bold text-xl">Dec 1-15, 2024</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold text-xl">Jan 15, 2025</div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">Milestone 1: Backend API</span>
                    </div>
                    <div className="text-lg text-gray-600">40 hours @ $75/hr</div>
                  </div>
                  <div className="font-bold text-lg">$3,000.00</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">Milestone 2: Frontend UI</span>
                    </div>
                    <div className="text-lg text-gray-600">25 hours @ $75/hr</div>
                  </div>
                  <div className="font-bold text-lg">$1,875.00</div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-3 mb-8">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold">$4,875.00</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Retainer Fee:</span>
                <span className="font-semibold">$500.00</span>
              </div>
              <div className="border-t pt-3">
                <div className="text-3xl font-bold text-blue-600">$5,375.00</div>
              </div>
            </div>

            <div className="text-center text-lg text-gray-600">
              <div></div>
            </div>
          </div>
        )

      case "enterpriseinvoice":
            return (
          <div className="bg-white max-w-4xl mx-auto p-8 text-sm shadow-lg rounded-lg">
            <div className="bg-gray-800 text-white p-6 rounded-t-lg -m-8 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-4xl font-bold">EnterpriseInvoice</div>
                  <div className="text-gray-300 text-lg">Multi-Department Billing</div>
                </div>
                <div className="text-right">
                  <div className="text-lg">PO: EN-2024-001</div>
                  <div className="text-lg">Status: Approved</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="font-semibold text-gray-700 mb-3 text-lg">From:</div>
                <div className="font-bold text-2xl">Innovation Agency Ltd.</div>
                <div className="text-gray-600 text-lg">Tax ID: 12-3456789</div>
                <div className="text-gray-600 text-lg">demo@pay.com</div>
                <div className="text-gray-600 text-lg">+1 (555) 789-0123</div>
                <div className="text-gray-600 text-lg">New York, NY</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-3 text-lg">To:</div>
                <div className="font-bold text-2xl">Global Tech Solutions</div>
                <div className="text-gray-600 text-lg">VAT: GB987654321</div>
                <div className="text-gray-600 text-lg">demo@pay.com</div>
                <div className="text-gray-600 text-lg">London, UK</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8 text-lg">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold text-xl">EI-2024-005</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold text-xl">Dec 30, 2024</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Currency:</div>
                <div className="font-bold text-xl">USD</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Terms:</div>
                <div className="font-bold text-xl">Net 45</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-800 mb-2 text-lg">Design Department</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-lg">
                      <span>UI/UX Design</span>
                      <span className="font-semibold text-lg">$2,500.00</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Brand Guidelines</span>
                      <span className="font-semibold text-lg">$800.00</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-semibold text-gray-800 mb-2 text-lg">Development Department</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-lg">
                      <span>Frontend Development</span>
                      <span className="font-semibold text-lg">$4,200.00</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Backend API</span>
                      <span className="font-semibold text-lg">$3,800.00</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-semibold text-gray-800 mb-2 text-lg">QA Department</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-lg">
                      <span>Testing & Quality Assurance</span>
                      <span className="font-semibold text-lg">$1,500.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-3 mb-8">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold text-lg">$12,800.00</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Tax (20%):</span>
                <span className="font-semibold text-lg">$2,560.00</span>
              </div>
              <div className="border-t pt-3">
                <div className="text-3xl font-bold text-gray-800">$15,360.00</div>
              </div>
            </div>

            <div className="text-center text-lg text-gray-600">
              <div></div>
            </div>
          </div>
        )

      case "creativeagency":
        return (
          <div className="bg-white max-w-4xl mx-auto p-8 text-sm shadow-lg rounded-lg">
            <div className="bg-[#fefce8] text-black p-6 rounded-t-lg -m-8 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-4xl font-bold">CreativeAgency</div>
                  <div className="text-black text-lg">Creative Services</div>
                </div>
                <div className="text-right">
                  <div className="text-lg text-black">Project: Brand Redesign</div>
                  <div className="text-lg text-black">Phase: Final Delivery</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="font-semibold text-gray-700 mb-3 text-lg">Agency:</div>
                <div className="font-bold text-2xl">Design Studio Pro</div>
                <div className="text-gray-600 text-lg">Creative Director: Sarah Chen</div>
                <div className="text-gray-600 text-lg">demo@pay.com</div>
                <div className="text-gray-600 text-lg">+1 (555) 234-5678</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-3 text-lg">Client:</div>
                <div className="font-bold text-2xl">Innovation Tech Co.</div>
                <div className="text-gray-600 text-lg">Marketing Director: Mike Johnson</div>
                <div className="text-gray-600 text-lg">demo@pay.com</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8 text-lg">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold text-xl">CA-2024-006</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold text-xl">Jan 5, 2025</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold text-xl">Jan 20, 2025</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-800 mb-2 text-lg">Phase 1: Discovery & Research</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-lg">
                      <span>Brand Analysis & Competitor Research</span>
                      <span className="font-semibold text-lg">$2,500.00</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>User Persona Development</span>
                      <span className="font-semibold text-lg">$1,800.00</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-semibold text-gray-800 mb-2 text-lg">Phase 2: Design & Iteration</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-lg">
                      <span>Logo Design (3 concepts)</span>
                      <span className="font-semibold text-lg">$3,200.00</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Brand Guidelines & Style Guide</span>
                      <span className="font-semibold text-lg">$2,800.00</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Website Mockups (3 rounds)</span>
                      <span className="font-semibold text-lg">$4,500.00</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-semibold text-gray-800 mb-2 text-lg">Phase 3: Final Deliverables</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-lg">
                      <span>Final Logo Files (AI, EPS, PNG)</span>
                      <span className="font-semibold text-lg">$1,200.00</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Brand Asset Package</span>
                      <span className="font-semibold text-lg">$1,500.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-3 mb-8">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold text-lg">$17,500.00</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Revision Credits (2):</span>
                <span className="font-semibold text-lg">$1,000.00</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Tax (8.5%):</span>
                <span className="font-semibold text-lg">$1,487.50</span>
              </div>
              <div className="border-t pt-3">
                <div className="text-3xl font-bold text-gray-800">$19,987.50</div>
              </div>
            </div>

            <div className="text-center text-lg text-gray-600">
              <div></div>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white max-w-4xl mx-auto p-8 text-center">
            <div className="text-2xl font-bold text-gray-800 mb-4">{template.name} Preview</div>
            <div className="text-gray-600 text-lg">Full-size preview coming soon...</div>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
      <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-3xl shadow-2xl border-2 border-gray-300">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{template.name} - Full Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {renderFullPreview()}
        </div>
        
        {/* Try Template Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Ready to use this template?
            </div>
            <a 
              href={`/editor?template=${template.id}`}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => onClose()}
            >
              Try This Template
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TemplatesPage() {
  const [previewModal, setPreviewModal] = useState({ isOpen: false, template: null })

  const handlePreview = (template) => {
    setPreviewModal({ isOpen: true, template })
  }

  const closePreview = () => {
    setPreviewModal({ isOpen: false, template: null })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Invoice Templates</h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professional invoice templates designed for different industries and business
            needs.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {templates.map((template) => (
            <TemplatePreview key={template.id} template={template} onPreview={handlePreview} />
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        template={previewModal.template}
        isOpen={previewModal.isOpen}
        onClose={closePreview}
      />
    </div>
  )
}

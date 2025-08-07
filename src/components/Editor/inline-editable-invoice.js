"use client"

import { useState } from "react"
import { Edit3, Plus } from "lucide-react"

export default function InlineEditableInvoice({ templateId, invoiceData, onEditSection, updateInvoiceData }) {
  const [hoveredSection, setHoveredSection] = useState(null)

  // Custom scrollbar styles
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f8fafc;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 #f8fafc;
    }
  `

  const EditButton = ({ section, className = "" }) => (
    <button
      onClick={() => onEditSection(section)}
      className={`absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white p-2 rounded-lg shadow-lg hover:bg-gray-800 z-10 ${className}`}
    >
      <Edit3 className="w-4 h-4" />
    </button>
  )

  const EditableSection = ({ section, children, className = "", bgColor = "bg-white" }) => (
    <div
      className={`relative group hover:border-2 hover:border-gray-300 border border-transparent rounded-lg transition-all cursor-pointer ${className}`}
      onMouseEnter={() => setHoveredSection(section)}
      onMouseLeave={() => setHoveredSection(null)}
      onClick={() => onEditSection(section)}
    >
      {children}
      <EditButton section={section} className="top-2 right-2" />
    </div>
  )

  const renderInvoiceTemplate = () => {
    switch (templateId) {
      case "quickbill":
        return (
          <div className="bg-white max-w-[523px] mx-auto p-4 text-xs shadow-sm rounded-lg">
            <EditableSection section="basic" className="text-center mb-4">
              <div className="text-lg font-bold text-gray-800 mb-1">INVOICE</div>
              <div className="text-gray-500 text-xs">QuickBill</div>
            </EditableSection>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">From:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "John Smith"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTitle || "Freelance Designer"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "demo@pay.com"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">To:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Tech Startup Inc."}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "demo@pay.com"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "QB-2024-001"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Dec 15, 2024"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">{invoiceData.dueDate || "Dec 30, 2024"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-gray-50 p-3 rounded mb-4">
              <div className="font-semibold text-gray-700 mb-2 text-xs">Service Description:</div>
              <div className="text-gray-800 text-sm">{invoiceData.items[0]?.description || "Website Design & Development"}</div>
              <div className="text-gray-600 text-xs mt-1">Complete responsive website with modern design</div>
            </EditableSection>

            <EditableSection section="payment" className="text-right">
              <div className="text-lg font-bold text-gray-800">${(invoiceData.total || 1500).toFixed(2)}</div>
              <div className="text-gray-600 text-xs">Total Amount</div>
            </EditableSection>
          </div>
        )

      case "standardpro":
        return (
          <div className="bg-white max-w-[523px] mx-auto p-4 text-xs shadow-sm rounded-lg">
            <EditableSection section="basic" className="bg-[#fefce8] text-black p-3 rounded-t-lg -m-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold">StandardPro</div>
                <div className="text-black text-xs">Professional Invoice</div>
              </div>
            </EditableSection>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">From:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Sarah Johnson"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTitle || "Marketing Consultant"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "demo@pay.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderPhone || "+1 (555) 123-4567"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">To:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Acme Corporation"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "demo@pay.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientAddress || "123 Business St, NY 10001"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "SP-2024-002"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Dec 20, 2024"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">{invoiceData.dueDate || "Jan 20, 2025"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-blue-50 p-3 rounded mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left py-2 font-semibold">Service</th>
                    <th className="text-left py-2 font-semibold">Qty</th>
                    <th className="text-left py-2 font-semibold">Rate</th>
                    <th className="text-right py-2 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2">{item.description || "Service"}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">${item.rate}</td>
                      <td className="py-2 text-right font-semibold">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </EditableSection>

            <EditableSection section="payment" className="text-right space-y-2 mb-6 p-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
              </div>
              {invoiceData.taxRate > 0 && (
                <div className="flex justify-between text-xs">
                  <span>Tax ({invoiceData.taxRate}%):</span>
                  <span className="font-semibold">${invoiceData.taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="text-lg font-bold text-blue-600">${invoiceData.total.toFixed(2)}</div>
              </div>
            </EditableSection>

            <div className="text-center text-xs text-gray-600">
              <div>Payment Method: {invoiceData.paymentTerms}</div>
            </div>
          </div>
        )

      case "businessedge":
        return (
          <div className="bg-white max-w-[523px] mx-auto p-4 text-xs shadow-sm rounded-lg">
            <EditableSection section="basic" className="bg-gray-800 text-white p-3 rounded-t-lg -m-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">BusinessEdge</div>
                  <div className="text-gray-300 text-xs">Professional Services</div>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="text-gray-800 font-bold text-sm">BE</div>
                </div>
              </div>
            </EditableSection>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">From:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Digital Solutions LLC"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTaxId || "GST: 27ABCDE1234F1Z5"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "demo@pay.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderPhone || "+1 (555) 987-6543"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderAddress || "San Francisco, CA"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">To:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Global Enterprises Ltd."}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientTaxId || "VAT: GB123456789"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "demo@pay.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientAddress || "London, UK"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "BE-2024-003"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Dec 25, 2024"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Terms:</div>
                <div className="font-bold">Net 30</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-gray-50 p-3 rounded mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-1 font-semibold">Service</th>
                    <th className="text-left py-1 font-semibold">Description</th>
                    <th className="text-right py-1 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-1 font-semibold">{item.description || "Web Development"}</td>
                      <td className="py-1">{item.description || "E-commerce platform with payment integration"}</td>
                      <td className="py-1 text-right font-semibold">${(item.amount || 3500).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </EditableSection>

            <EditableSection section="payment" className="text-right space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">${(invoiceData.subtotal || 4300).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Tax (15%):</span>
                <span className="font-semibold">${(invoiceData.taxAmount || 645).toFixed(2)}</span>
              </div>
              <div className="border-t pt-1">
                <div className="text-lg font-bold text-gray-800">${(invoiceData.total || 4945).toFixed(2)}</div>
              </div>
            </EditableSection>
          </div>
        )

      case "contractorplus":
        return (
          <div className="bg-white max-w-[523px] mx-auto p-4 text-xs shadow-sm rounded-lg">
            <EditableSection section="basic" className="bg-[#fefce8] text-black p-3 rounded-t-lg -m-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold text-black">ContractorPlus</div>
                  <div className="text-black text-xs">Professional Contracting</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-black">Project: CRM System</div>
                  <div className="text-xs text-black">Contract #${invoiceData.invoiceNumber || "CP-2024-004"}</div>
                </div>
              </div>
            </EditableSection>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">Contractor:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Alex Rodriguez"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTitle || "Senior Full-Stack Developer"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "demo@pay.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderPhone || "+1 (555) 456-7890"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">Client:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "TechCorp Solutions"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "demo@pay.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientAddress || "San Francisco, CA"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "CP-2024-004"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Period:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Dec 1-15, 2024"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">{invoiceData.dueDate || "Jan 15, 2025"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-blue-50 p-3 rounded mb-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Milestone 1: Backend API</span>
                    </div>
                    <div className="text-xs text-gray-600">40 hours @ $75/hr</div>
                  </div>
                  <div className="font-bold">${(invoiceData.items[0]?.amount || 3000).toFixed(2)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Milestone 2: Frontend UI</span>
                    </div>
                    <div className="text-xs text-gray-600">25 hours @ $75/hr</div>
                  </div>
                  <div className="font-bold">${(invoiceData.items[1]?.amount || 1875).toFixed(2)}</div>
                </div>
              </div>
            </EditableSection>

            <EditableSection section="payment" className="text-right space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">${(invoiceData.subtotal || 4875).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Retainer Fee:</span>
                <span className="font-semibold">${(invoiceData.taxAmount || 500).toFixed(2)}</span>
              </div>
              <div className="border-t pt-1">
                <div className="text-lg font-bold text-blue-600">${(invoiceData.total || 5375).toFixed(2)}</div>
              </div>
            </EditableSection>
          </div>
        )

      case "enterpriseinvoice":
        return (
          <div className="bg-white max-w-[523px] mx-auto p-4 text-xs shadow-sm rounded-lg">
            <EditableSection section="basic" className="bg-gray-800 text-white p-3 rounded-t-lg -m-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">EnterpriseInvoice</div>
                  <div className="text-gray-300 text-xs">Multi-Department Billing</div>
                </div>
                <div className="text-right">
                  <div className="text-xs">PO: {invoiceData.invoiceNumber || "EN-2024-001"}</div>
                  <div className="text-xs">Status: Approved</div>
                </div>
              </div>
            </EditableSection>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">From:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Innovation Agency Ltd."}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTaxId || "Tax ID: 12-3456789"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "demo@pay.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderPhone || "+1 (555) 789-0123"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderAddress || "New York, NY"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">To:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Global Tech Solutions"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientTaxId || "VAT: GB987654321"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "demo@pay.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientAddress || "London, UK"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-4 gap-2 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "EI-2024-005"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Dec 30, 2024"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Currency:</div>
                <div className="font-bold">{invoiceData.currency || "USD"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Terms:</div>
                <div className="font-bold">{invoiceData.paymentTerms || "Net 45"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-gray-50 p-3 rounded mb-4">
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-2 mb-2">
                  <div className="font-bold text-gray-900 mb-1 text-xs">Design Department</div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>UI/UX Design</span>
                    <span className="font-semibold">${(invoiceData.items[0]?.amount || 2500).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Brand Guidelines</span>
                    <span className="font-semibold">${(invoiceData.items[1]?.amount || 800).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-2 mb-2">
                  <div className="font-bold text-gray-900 mb-1 text-xs">Development Department</div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Frontend Development</span>
                    <span className="font-semibold">${(invoiceData.items[2]?.amount || 4200).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Backend API</span>
                    <span className="font-semibold">${(invoiceData.items[3]?.amount || 3800).toFixed(2)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="font-bold text-gray-900 mb-1 text-xs">QA Department</div>
                  <div className="flex justify-between text-xs">
                    <span>Testing & Quality Assurance</span>
                    <span className="font-semibold">${(invoiceData.items[4]?.amount || 1500).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </EditableSection>

            <EditableSection section="payment" className="text-right space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">${(invoiceData.subtotal || 12800).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Tax (20%):</span>
                <span className="font-semibold">${(invoiceData.taxAmount || 2560).toFixed(2)}</span>
              </div>
              <div className="border-t pt-1">
                <div className="text-lg font-bold text-gray-800">${(invoiceData.total || 15360).toFixed(2)}</div>
              </div>
            </EditableSection>
          </div>
        )

      case "creativeagency":
        return (
          <div className="bg-white max-w-[523px] mx-auto p-4 text-xs shadow-sm rounded-lg">
            <EditableSection section="basic" className="bg-[#fefce8] text-black p-3 rounded-t-lg -m-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold text-black">CreativeAgency</div>
                  <div className="text-black text-xs">Creative Services</div>
                </div>
                <div className="text-right">
                  <div className="text-black text-xs">Project: Brand Redesign</div>
                  <div className="text-black text-xs">Phase: Final Delivery</div>
                </div>
              </div>
            </EditableSection>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">Agency:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Design Studio Pro"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTitle || "Creative Director: Sarah Chen"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "demo@pay.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderPhone || "+1 (555) 234-5678"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-1 text-xs">Client:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Innovation Tech Co."}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientTitle || "Marketing Director: Mike Johnson"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "demo@pay.com"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "CA-2024-006"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Jan 5, 2025"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">{invoiceData.dueDate || "Jan 20, 2025"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-slate-50 p-3 rounded mb-4">
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2 mb-2">
                  <div className="font-bold text-gray-900 mb-1 text-xs">Phase 1: Discovery & Research</div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Brand Analysis & Competitor Research</span>
                    <span className="font-semibold">${(invoiceData.items[0]?.amount || 2500).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>User Persona Development</span>
                    <span className="font-semibold">${(invoiceData.items[1]?.amount || 1800).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-b border-slate-200 pb-2 mb-2">
                  <div className="font-bold text-gray-900 mb-1 text-xs">Phase 2: Design & Iteration</div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Logo Design (3 concepts)</span>
                    <span className="font-semibold">${(invoiceData.items[2]?.amount || 3200).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Brand Guidelines & Style Guide</span>
                    <span className="font-semibold">${(invoiceData.items[3]?.amount || 2800).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Website Mockups (3 rounds)</span>
                    <span className="font-semibold">${(invoiceData.items[4]?.amount || 4500).toFixed(2)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="font-bold text-gray-900 mb-1 text-xs">Phase 3: Final Deliverables</div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Final Logo Files (AI, EPS, PNG)</span>
                    <span className="font-semibold">${(invoiceData.items[5]?.amount || 1200).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Brand Asset Package</span>
                    <span className="font-semibold">${(invoiceData.items[6]?.amount || 1500).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </EditableSection>

            <EditableSection section="payment" className="text-right space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">${(invoiceData.subtotal || 17500).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Revision Credits (2):</span>
                <span className="font-semibold">${(invoiceData.taxAmount || 1000).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Tax (8.5%):</span>
                <span className="font-semibold">${(invoiceData.taxAmount || 1487.50).toFixed(2)}</span>
              </div>
              <div className="border-t pt-1">
                <div className="text-lg font-bold text-black">${(invoiceData.total || 19987.50).toFixed(2)}</div>
              </div>
            </EditableSection>
          </div>
        )

      default:
        return (
          <div className="bg-white max-w-[523px] mx-auto p-6 text-center text-gray-500 shadow-lg rounded-lg border border-gray-200">
            <div className="p-8">
              <div className="text-lg font-semibold mb-2">Template Preview</div>
              <div className="text-sm">Select a template to see the preview</div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="relative">
      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      
      {/* Hover Instructions */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
          <Edit3 className="w-4 h-4" />
          Hover over any section to edit change and It will be Auto Saved
        </div>
      </div>

      {/* Invoice Template */}
      <div className="relative custom-scrollbar">{renderInvoiceTemplate()}</div>

    </div>
  )
}

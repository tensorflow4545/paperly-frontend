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
          <div className="bg-white max-w-[523px] mx-auto p-6 text-xs shadow-lg rounded-lg border border-gray-200">
            <EditableSection section="basic" className="text-center mb-6 p-4">
              <div className="text-lg font-bold text-gray-800 mb-1">INVOICE</div>
              <div className="text-gray-500 text-xs">QuickBill</div>
            </EditableSection>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">From:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Your Name"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTitle || "Your Title"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "your@email.com"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">To:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Client Name"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "client@email.com"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-3 gap-4 mb-6 p-4">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "INV-001"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Today"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">{invoiceData.dueDate || "30 days"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-gray-50 p-4 rounded mb-6">
              <div className="font-semibold text-gray-700 mb-3 text-xs">Service Description:</div>
              {invoiceData.items.map((item, index) => (
                <div key={item.id} className="text-gray-800 text-sm mb-2">
                  {item.description || "Service description"}
                </div>
              ))}
            </EditableSection>

            <EditableSection section="payment" className="text-right p-4">
              <div className="text-lg font-bold text-gray-800">${invoiceData.total.toFixed(2)}</div>
              <div className="text-gray-600 text-xs">Total Amount</div>
            </EditableSection>
          </div>
        )

      case "standardpro":
        return (
          <div className="bg-white max-w-[523px] mx-auto p-6 text-xs shadow-lg rounded-lg border border-gray-200">
            <EditableSection section="basic" className="bg-yellow-50 text-black p-4 rounded-t-lg -m-6 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold">StandardPro</div>
                <div className="text-black text-xs">Professional Invoice</div>
              </div>
            </EditableSection>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">From:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Your Name"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTitle || "Your Title"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "your@email.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderPhone || "Phone"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">To:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Client Name"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "client@email.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientAddress || "Address"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-3 gap-4 mb-6 p-4">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "INV-001"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Today"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">{invoiceData.dueDate || "30 days"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-blue-50 p-4 rounded mb-6">
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
          <div className="bg-white max-w-[523px] mx-auto p-6 text-xs shadow-lg rounded-lg border border-gray-200">
            <EditableSection section="basic" className="bg-gray-800 text-white p-4 rounded-t-lg -m-6 mb-6">
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

            <div className="grid grid-cols-2 gap-6 mb-6">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">From:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Your Company"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTaxId || "Tax ID"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "email@company.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderPhone || "Phone"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderAddress || "Address"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">To:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Client Company"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientTaxId || "Tax ID"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "client@company.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientAddress || "Address"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-3 gap-4 mb-6 p-4">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "INV-001"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Today"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Terms:</div>
                <div className="font-bold">{invoiceData.paymentTerms || "Net 30"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-gray-50 p-4 rounded mb-6">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold">Service</th>
                    <th className="text-left py-2 font-semibold">Description</th>
                    <th className="text-right py-2 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 font-semibold">{item.description || "Service"}</td>
                      <td className="py-2">{item.description || "Description"}</td>
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
                <div className="text-lg font-bold text-gray-800">${invoiceData.total.toFixed(2)}</div>
              </div>
            </EditableSection>

            <div className="text-center text-xs text-gray-600">
              <div>Currency: {invoiceData.currency} | Payment: Bank Transfer</div>
            </div>
          </div>
        )

      case "contractorplus":
        return (
          <div className="bg-white max-w-[523px] mx-auto p-6 text-xs shadow-lg rounded-lg border border-gray-200">
            <EditableSection section="basic" className="bg-yellow-50 text-black p-4 rounded-t-lg -m-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold text-black">ContractorPlus</div>
                  <div className="text-black text-xs">Professional Contracting</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-black">Project: CRM System</div>
                  <div className="text-xs text-black">Contract #{invoiceData.invoiceNumber || "CP-001"}</div>
                </div>
              </div>
            </EditableSection>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">Contractor:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Your Name"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTitle || "Your Title"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "your@email.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderPhone || "Phone"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">Client:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Client Name"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "client@email.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientAddress || "Address"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-3 gap-4 mb-6 p-4">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "INV-001"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Period:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Today"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">{invoiceData.dueDate || "30 days"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-blue-50 p-4 rounded mb-6">
              <div className="space-y-4">
                {invoiceData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{item.description || "Milestone"}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {item.quantity} hours @ ${item.rate}/hr
                      </div>
                    </div>
                    <div className="font-bold">${item.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </EditableSection>

            <EditableSection section="payment" className="text-right space-y-2 mb-6 p-4">
              <div className="flex justify-between text-xs">
                <span>Subtotal:</span>
                <span className="font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="text-lg font-bold text-blue-600">${invoiceData.total.toFixed(2)}</div>
              </div>
            </EditableSection>

            <div className="text-center text-xs text-gray-600">
              <div></div>
            </div>
          </div>
        )

      case "enterpriseinvoice":
        return (
          <div className="bg-white max-w-[523px] mx-auto p-6 text-xs shadow-lg rounded-lg border border-gray-200">
            <EditableSection section="basic" className="bg-gray-800 text-white p-4 rounded-t-lg -m-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">EnterpriseInvoice</div>
                  <div className="text-gray-300 text-xs">Multi-Department Billing</div>
                </div>
                <div className="text-right">
                  <div className="text-xs">PO: {invoiceData.invoiceNumber || "EN-001"}</div>
                  <div className="text-xs">Status: Approved</div>
                </div>
              </div>
            </EditableSection>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">From:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Your Company"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTaxId || "Tax ID"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "email@company.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderPhone || "Phone"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderAddress || "Address"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">To:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Client Company"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientTaxId || "Tax ID"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "client@company.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientAddress || "Address"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-4 gap-3 mb-6 p-4">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "INV-001"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Today"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Currency:</div>
                <div className="font-bold">{invoiceData.currency}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Terms:</div>
                <div className="font-bold">{invoiceData.paymentTerms || "Net 45"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-gray-50 p-4 rounded mb-6">
              <div className="space-y-4">
                {invoiceData.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span>{item.description || "Service"}</span>
                    <span className="font-semibold">${item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
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
                <div className="text-lg font-bold text-gray-800">${invoiceData.total.toFixed(2)}</div>
              </div>
            </EditableSection>

            <div className="text-center text-xs text-gray-600">
              <div></div>
            </div>
          </div>
        )

      case "creativeagency":
        return (
          <div className="bg-white max-w-[523px] mx-auto p-6 text-xs shadow-lg rounded-lg border border-gray-200">
            <EditableSection section="basic" className="bg-yellow-50 text-black p-4 rounded-t-lg -m-6 mb-6">
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
            </EditableSection>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <EditableSection section="sender" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">Agency:</div>
                <div className="font-bold text-sm">{invoiceData.senderName || "Your Agency"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderTitle || "Creative Director"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderEmail || "your@agency.com"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.senderPhone || "Phone"}</div>
              </EditableSection>

              <EditableSection section="recipient" className="p-4">
                <div className="font-semibold text-gray-700 mb-2 text-xs">Client:</div>
                <div className="font-bold text-sm">{invoiceData.recipientName || "Client Company"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientTitle || "Marketing Director"}</div>
                <div className="text-gray-600 text-xs">{invoiceData.recipientEmail || "client@company.com"}</div>
              </EditableSection>
            </div>

            <EditableSection section="basic" className="grid grid-cols-3 gap-4 mb-6 p-4">
              <div>
                <div className="font-semibold text-gray-600">Invoice #:</div>
                <div className="font-bold">{invoiceData.invoiceNumber || "INV-001"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Date:</div>
                <div className="font-bold">{invoiceData.invoiceDate || "Today"}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">Due:</div>
                <div className="font-bold">{invoiceData.dueDate || "30 days"}</div>
              </div>
            </EditableSection>

            <EditableSection section="items" className="bg-gray-50 p-4 rounded mb-6">
              <div className="space-y-4">
                {invoiceData.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span>{item.description || "Creative Service"}</span>
                    <span className="font-semibold">${item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
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
                <div className="text-lg font-bold text-gray-800">${invoiceData.total.toFixed(2)}</div>
              </div>
            </EditableSection>

            <div className="text-center text-xs text-gray-600">
              <div></div>
            </div>
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

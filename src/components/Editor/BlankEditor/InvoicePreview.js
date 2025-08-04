"use client"

import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

export default function InvoicePreview({
  invoiceData,
  calculateSubtotal,
  calculateTax,
  calculateTotal
}) {
  const formatCurrency = (amount) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      CAD: 'C$'
    }
    return `${symbols[invoiceData.invoiceDetails.currency]}${amount.toFixed(2)}`
  }

  const renderCustomElement = (element) => {
    switch (element.type) {
      case 'pricing-table':
        return (
          <div key={element.id} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{element.data.title}</h3>
            <div className="grid grid-cols-3 gap-4">
              {element.data.tiers.map((tier, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-gray-800 mb-2">{tier.name}</h4>
                  <div className="text-2xl font-bold text-gray-800 mb-3">{formatCurrency(tier.price)}</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {tier.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )

      case 'time-tracking':
        return (
          <div key={element.id} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{element.data.title}</h3>
            <div className="border-b-2 border-gray-300 pb-2 mb-4">
              <div className="grid grid-cols-4 gap-4 font-semibold text-gray-800">
                <div>Date</div>
                <div>Description</div>
                <div>Hours</div>
                <div>Amount</div>
              </div>
            </div>
            <div className="space-y-3">
              {element.data.entries.map((entry, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-100">
                  <div className="text-gray-600">{entry.date}</div>
                  <div className="text-gray-800">{entry.description}</div>
                  <div className="text-gray-600">{entry.hours}h @ {formatCurrency(entry.rate)}/h</div>
                  <div className="text-right font-semibold text-gray-800">
                    {formatCurrency(entry.hours * entry.rate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'discount-section':
        return (
          <div key={element.id} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{element.data.title}</h3>
            <div className="space-y-3">
              {element.data.discounts.map((discount, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                  <div>
                    <div className="font-medium text-gray-800">{discount.description}</div>
                    <div className="text-sm text-gray-600">{discount.type}</div>
                  </div>
                  <div className="text-lg font-bold text-gray-700">-{discount.value}%</div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'tax-breakdown':
        return (
          <div key={element.id} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{element.data.title}</h3>
            <div className="space-y-3">
              {element.data.taxes.map((tax, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                  <div>
                    <div className="font-medium text-gray-800">{tax.name}</div>
                    <div className="text-sm text-gray-600">{tax.rate}%</div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {formatCurrency(calculateSubtotal() * (tax.rate / 100))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'payment-schedule':
        return (
          <div key={element.id} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{element.data.title}</h3>
            <div className="space-y-3">
              {element.data.installments.map((installment, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                  <div>
                    <div className="font-medium text-gray-800">{installment.description}</div>
                    <div className="text-sm text-gray-600">Due: {new Date(installment.dueDate).toLocaleDateString()}</div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {formatCurrency(installment.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'company-header':
        return (
          <div key={element.id} className="mb-8">
            <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200" style={{backgroundColor: '#fefce8'}}>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{element.data.companyName}</h2>
              <p className="text-gray-600 mb-4">{element.data.tagline}</p>
              <div className="text-sm text-gray-600 space-y-1">
                {element.data.contactInfo.phone && <div>📞 {element.data.contactInfo.phone}</div>}
                {element.data.contactInfo.email && <div>✉️ {element.data.contactInfo.email}</div>}
                {element.data.contactInfo.website && <div>🌐 {element.data.contactInfo.website}</div>}
              </div>
            </div>
          </div>
        )

      case 'signature-section':
        return (
          <div key={element.id} className="mb-8">
            <div className="border-t-2 border-gray-300 pt-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-gray-600 mb-1">{element.data.signerName}</div>
                  <div className="border-b-2 border-gray-400 w-32 mb-2"></div>
                  <div className="text-xs text-gray-500">{element.data.title}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Date: {new Date(element.data.date).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'stamp-seal':
        return (
          <div key={element.id} className="mb-8">
            <div className="flex justify-end items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Status:</div>
                <div className="font-semibold text-gray-800">{element.data.status}</div>
              </div>
              <div className={`p-4 rounded-full border-4 border-red-500 text-red-500 font-bold text-center ${
                element.data.stampType === 'circular' ? 'w-24 h-24' : 
                element.data.stampType === 'oval' ? 'w-32 h-20' : 'w-32 h-16'
              }`}>
                <div className="flex items-center justify-center h-full">
                  {element.data.stampText}
                </div>
              </div>
            </div>
          </div>
        )

      case 'payment-info':
        return (
          <div key={element.id} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{element.data.title}</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-gray-600">Bank Transfer:</div>
                <div className="font-medium text-gray-800">{element.data.bankTransfer}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-600">Credit Cards:</div>
                <div className="font-medium text-gray-800">{element.data.creditCards}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-600">PayPal:</div>
                <div className="font-medium text-gray-800">{element.data.paypal}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-600">Check Payable To:</div>
                <div className="font-medium text-gray-800">{element.data.checkPayable}</div>
              </div>
            </div>
          </div>
        )

      case 'contact-info':
        return (
          <div key={element.id} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{element.data.title}</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-gray-600">Phone:</div>
                <div className="font-medium text-gray-800">{element.data.phone}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-600">Email:</div>
                <div className="font-medium text-gray-800">{element.data.email}</div>
              </div>
              <div className="flex justify-between items-start">
                <div className="text-gray-600">Address:</div>
                <div className="font-medium text-gray-800 text-right">{element.data.address}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-600">Website:</div>
                <div className="font-medium text-gray-800">{element.data.website}</div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const isPreviewEmpty = () => {
    return (
      !invoiceData.businessInfo.name &&
      !invoiceData.clientInfo.name &&
      invoiceData.items.length === 0 &&
      (!invoiceData.customElements || invoiceData.customElements.length === 0)
    )
  }

  if (isPreviewEmpty()) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-500" />
            </div>
          </div>
          <h2 className="text-lg font-semibold mb-2 text-gray-900">
            Invoice Preview
          </h2>
          <p className="text-sm text-gray-600">
            Start adding content to see your invoice preview here
          </p>
        </motion.div>
      </div>
    )
  }

  return (
        <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <div className="invoice-preview max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 shadow-gray-200">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {invoiceData.businessInfo.name || 'Your Business Name'}
            </h1>
            <div className="text-gray-600 space-y-1">
              {invoiceData.businessInfo.address && (
                <div>{invoiceData.businessInfo.address}</div>
              )}
              {invoiceData.businessInfo.email && (
                <div>{invoiceData.businessInfo.email}</div>
              )}
              {invoiceData.businessInfo.phone && (
                <div>{invoiceData.businessInfo.phone}</div>
              )}
            </div>
          </div>
          <div className="text-right">
                            <h2 className="text-4xl font-bold text-yellow-500 mb-2">INVOICE</h2>
            {invoiceData.invoiceDetails.number && (
              <div className="text-gray-600">
                <span className="font-semibold">Invoice #:</span> {invoiceData.invoiceDetails.number}
              </div>
            )}
            {invoiceData.invoiceDetails.date && (
              <div className="text-gray-600">
                <span className="font-semibold">Date:</span> {new Date(invoiceData.invoiceDetails.date).toLocaleDateString()}
              </div>
            )}
            {invoiceData.invoiceDetails.dueDate && (
              <div className="text-gray-600">
                <span className="font-semibold">Due Date:</span> {new Date(invoiceData.invoiceDetails.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Client Information */}
        {invoiceData.clientInfo.name && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Bill To:</h3>
            <div className="text-gray-600">
              <div className="font-semibold">{invoiceData.clientInfo.name}</div>
              {invoiceData.clientInfo.address && (
                <div className="whitespace-pre-line">{invoiceData.clientInfo.address}</div>
              )}
              {invoiceData.clientInfo.email && (
                <div>{invoiceData.clientInfo.email}</div>
              )}
              {invoiceData.clientInfo.phone && (
                <div>{invoiceData.clientInfo.phone}</div>
              )}
            </div>
          </div>
        )}

        {/* Custom Elements */}
        {invoiceData.customElements && invoiceData.customElements.map(renderCustomElement)}

        {/* Invoice Items */}
        {invoiceData.items.length > 0 && (
          <div className="mb-8">
            <div className="border-b-2 border-gray-300 pb-2 mb-4">
              <div className="grid grid-cols-12 gap-4 font-semibold text-gray-800">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Rate</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {invoiceData.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-12 gap-4 py-2 border-b border-gray-100"
                >
                  <div className="col-span-6 text-gray-800">
                    {item.description || 'Item description'}
                  </div>
                  <div className="col-span-2 text-center text-gray-600">
                    {item.quantity}
                  </div>
                  <div className="col-span-2 text-right text-gray-600">
                    {formatCurrency(item.rate)}
                  </div>
                  <div className="col-span-2 text-right font-semibold text-gray-800">
                    {formatCurrency(item.amount)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>{formatCurrency(calculateSubtotal())}</span>
            </div>
            {invoiceData.invoiceDetails.taxRate > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax ({invoiceData.invoiceDetails.taxRate}%):</span>
                <span>{formatCurrency(calculateTax())}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-gray-800 border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        {(invoiceData.notes || invoiceData.terms) && (
          <div className="grid grid-cols-2 gap-8 text-sm">
            {invoiceData.notes && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Notes:</h4>
                <div className="text-gray-600 whitespace-pre-line">
                  {invoiceData.notes}
                </div>
              </div>
            )}
            {invoiceData.terms && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Terms & Conditions:</h4>
                <div className="text-gray-600 whitespace-pre-line">
                  {invoiceData.terms}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p className="text-lg font-medium text-gray-700 mb-2">Thank you for your business!</p>
          {invoiceData.businessInfo.name && (
            <p className="text-gray-600 mb-4">{invoiceData.businessInfo.name}</p>
          )}
          <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
            <span>Made with</span>
                          <a href="https://paprly.in" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 underline font-medium">
              paprly.in
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 
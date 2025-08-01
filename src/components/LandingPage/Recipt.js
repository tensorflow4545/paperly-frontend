"use client"

import { motion } from "framer-motion"

// Invoice data in JSON format
const invoiceData = {
  invoiceNumber: "#INV-2024-001",
  billTo: "Client Name",
  date: "Dec 15, 2024",
  dueDate: "Dec 30, 2024",
  items: [
    {
      id: 1,
      description: "Web Development Services",
      quantity: 2,
      rate: 500,
      amount: 1000,
    },
    {
      id: 2,
      description: "UI/UX Design Package",
      quantity: 1,
      rate: 2500,
      amount: 2500,
    },
  ],
  subtotal: 3500,
  taxRate: 18,
  tax: 630,
  total: 4130,
}

export default function InvoicePreview() {
  return (
    <div className="relative">
      {/* Animated dots */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-2 -left-2 w-3 h-3 bg-teal-500 rounded-full z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Invoice container */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-lg">
        {/* Header with light professional gradient */}
        <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-500 border-b border-gray-200"></div>

        {/* Invoice content */}
        <div className="p-6">
          {/* Invoice header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-1">INVOICE</h1>
              <p className="text-sm text-gray-600">{invoiceData.invoiceNumber}</p>
            </div>
          </div>

          {/* Bill to and dates */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">Bill To:</h3>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="text-right text-sm">
              <div className="mb-1">
                <span className="text-gray-600">Date: </span>
                <span className="text-gray-800">{invoiceData.date}</span>
              </div>
              <div>
                <span className="text-gray-600">Due: </span>
                <span className="text-gray-800">{invoiceData.dueDate}</span>
              </div>
            </div>
          </div>

          {/* Invoice table */}
          <div className="mb-4">
            {/* Table header */}
            <div className="grid grid-cols-4 gap-2 py-2 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <div>Description</div>
              <div className="text-center">Qty</div>
              <div className="text-right">Rate</div>
              <div className="text-right">Amount</div>
            </div>

            {/* Table rows */}
            {invoiceData.items.map((item) => (
              <div key={item.id} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-100">
                <div>
                  <div className="h-2 bg-gray-200 rounded mb-1"></div>
                  <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                </div>
                <div className="text-center text-sm text-gray-800">{item.quantity}</div>
                <div className="text-right text-sm text-gray-800">₹{item.rate.toLocaleString()}</div>
                <div className="text-right text-sm text-gray-800">₹{item.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>₹{invoiceData.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax ({invoiceData.taxRate}%):</span>
              <span>₹{invoiceData.tax}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-800 pt-1 border-t border-gray-200">
              <span>Total:</span>
              <span>₹{invoiceData.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

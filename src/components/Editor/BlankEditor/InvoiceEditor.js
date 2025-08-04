"use client"

import { motion } from 'framer-motion'
import { FileText, Lightbulb, Plus, ArrowLeft } from 'lucide-react'

export default function InvoiceEditor({
  invoiceData,
  setInvoiceData,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  customElements = [],
  onRemoveCustomElement,
  onUpdateCustomElement,
  onUpdateCustomElementNested,
  onAddItemToCustomElement,
  onRemoveItemFromCustomElement,
  onReorderCustomElements
}) {
  const updateInvoiceData = (section, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const isEditorEmpty = () => {
    return (
      !invoiceData.businessInfo.name &&
      !invoiceData.clientInfo.name &&
      invoiceData.items.length === 0 &&
      customElements.length === 0
    )
  }

  const renderCustomElement = (element) => {
    switch (element.type) {
      case 'pricing-table':
        return (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border bg-gray-50 border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Pricing Table</h3>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveCustomElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={element.data.title}
                onChange={(e) => onUpdateCustomElement(element.id, 'title', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Pricing Table Title"
              />
              {element.data.tiers.map((tier, index) => (
                <div key={tier.id} className="p-3 bg-white rounded border space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Tier {index + 1}</h4>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemoveItemFromCustomElement(element.id, 'pricing-tier', tier.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </motion.button>
                  </div>
                  <input
                    type="text"
                    value={tier.name}
                    onChange={(e) => onUpdateCustomElementNested(element.id, `tiers.${index}.name`, e.target.value)}
                    className="w-full p-2 rounded border bg-white border-gray-300"
                    placeholder="Tier Name"
                  />
                  <input
                    type="number"
                    value={tier.price}
                    onChange={(e) => onUpdateCustomElementNested(element.id, `tiers.${index}.price`, parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded border bg-white border-gray-300"
                    placeholder="Price"
                  />
                  <textarea
                    value={tier.features.join('\n')}
                    onChange={(e) => onUpdateCustomElementNested(element.id, `tiers.${index}.features`, e.target.value.split('\n'))}
                    className="w-full p-2 rounded border bg-white border-gray-300"
                    rows="3"
                    placeholder="Features (one per line)"
                  />
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddItemToCustomElement(element.id, 'pricing-tier')}
                className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                + Add Pricing Tier
              </motion.button>
            </div>
          </motion.div>
        )

      case 'time-tracking':
        return (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border bg-gray-50 border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Time Tracking</h3>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveCustomElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={element.data.title}
                onChange={(e) => onUpdateCustomElement(element.id, 'title', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Time Tracking Title"
              />
              {element.data.entries.map((entry, index) => (
                <div key={entry.id} className="p-3 bg-white rounded border space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Entry {index + 1}</h4>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemoveItemFromCustomElement(element.id, 'time-entry', entry.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </motion.button>
                  </div>
                  <input
                    type="date"
                    value={entry.date}
                    onChange={(e) => onUpdateCustomElementNested(element.id, `entries.${index}.date`, e.target.value)}
                    className="w-full p-2 rounded border bg-white border-gray-300"
                  />
                  <input
                    type="text"
                    value={entry.description}
                    onChange={(e) => onUpdateCustomElementNested(element.id, `entries.${index}.description`, e.target.value)}
                    className="w-full p-2 rounded border bg-white border-gray-300"
                    placeholder="Description"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={entry.hours}
                      onChange={(e) => onUpdateCustomElementNested(element.id, `entries.${index}.hours`, parseFloat(e.target.value) || 0)}
                      className="w-full p-2 rounded border bg-white border-gray-300"
                      placeholder="Hours"
                    />
                    <input
                      type="number"
                      value={entry.rate}
                      onChange={(e) => onUpdateCustomElementNested(element.id, `entries.${index}.rate`, parseFloat(e.target.value) || 0)}
                      className="w-full p-2 rounded border bg-white border-gray-300"
                      placeholder="Rate per hour"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )

      case 'discount-section':
        return (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border bg-gray-50 border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Discount Section</h3>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveCustomElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={element.data.title}
                onChange={(e) => onUpdateCustomElement(element.id, 'title', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Discount Section Title"
              />
              {element.data.discounts.map((discount, index) => (
                <div key={index} className="p-3 bg-white rounded border space-y-2">
                  <input
                    type="text"
                    value={discount.description}
                    onChange={(e) => onUpdateCustomElementNested(element.id, `discounts.${index}.description`, e.target.value)}
                    className="w-full p-2 rounded border bg-white border-gray-300"
                    placeholder="Discount Description"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={discount.type}
                      onChange={(e) => onUpdateCustomElementNested(element.id, `discounts.${index}.type`, e.target.value)}
                      className="w-full p-2 rounded border bg-white border-gray-300"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                    <input
                      type="number"
                      value={discount.value}
                      onChange={(e) => onUpdateCustomElementNested(element.id, `discounts.${index}.value`, parseFloat(e.target.value) || 0)}
                      className="w-full p-2 rounded border bg-white border-gray-300"
                      placeholder="Value"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )

      case 'tax-breakdown':
        return (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border `}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Tax Breakdown</h3>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveCustomElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={element.data.title}
                onChange={(e) => onUpdateCustomElement(element.id, 'title', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Tax Breakdown Title"
              />
              {element.data.taxes.map((tax, index) => (
                <div key={tax.id} className="p-3 bg-white rounded border space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Tax {index + 1}</h4>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemoveItemFromCustomElement(element.id, 'tax-item', tax.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </motion.button>
                  </div>
                  <input
                    type="text"
                    value={tax.name}
                    onChange={(e) => onUpdateCustomElementNested(element.id, `taxes.${index}.name`, e.target.value)}
                    className="w-full p-2 rounded border bg-white border-gray-300"
                    placeholder="Tax Name"
                  />
                  <input
                    type="number"
                    value={tax.rate}
                    onChange={(e) => onUpdateCustomElementNested(element.id, `taxes.${index}.rate`, parseFloat(e.target.value) || 0)}
                    className="w-full p-2 rounded border bg-white border-gray-300"
                    placeholder="Tax Rate (%)"
                  />
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddItemToCustomElement(element.id, 'tax-item')}
                className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                + Add Tax Item
              </motion.button>
            </div>
          </motion.div>
        )

      case 'payment-schedule':
        return (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border `}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Payment Schedule</h3>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveCustomElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={element.data.title}
                onChange={(e) => onUpdateCustomElement(element.id, 'title', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Payment Schedule Title"
              />
              {element.data.installments.map((installment, index) => (
                <div key={installment.id} className="p-3 bg-white rounded border space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Installment {index + 1}</h4>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemoveItemFromCustomElement(element.id, 'installment', installment.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </motion.button>
                  </div>
                  <input
                    type="text"
                    value={installment.description}
                    onChange={(e) => onUpdateCustomElementNested(element.id, `installments.${index}.description`, e.target.value)}
                    className="w-full p-2 rounded border bg-white border-gray-300"
                    placeholder="Installment Description"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={installment.dueDate}
                      onChange={(e) => onUpdateCustomElementNested(element.id, `installments.${index}.dueDate`, e.target.value)}
                      className="w-full p-2 rounded border bg-white border-gray-300"
                    />
                    <input
                      type="number"
                      value={installment.amount}
                      onChange={(e) => onUpdateCustomElementNested(element.id, `installments.${index}.amount`, parseFloat(e.target.value) || 0)}
                      className="w-full p-2 rounded border bg-white border-gray-300"
                      placeholder="Amount"
                    />
                  </div>
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddItemToCustomElement(element.id, 'installment')}
                className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                + Add Installment
              </motion.button>
            </div>
          </motion.div>
        )

      case 'company-header':
        return (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border `}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Company Header</h3>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveCustomElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={element.data.companyName}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'companyName', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Company Name"
              />
              <input
                type="text"
                value={element.data.tagline}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'tagline', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Tagline"
              />
              <input
                type="text"
                value={element.data.contactInfo.phone}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'contactInfo.phone', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Phone"
              />
                             <input
                 type="email"
                 value={element.data.contactInfo.email}
                 onChange={(e) => onUpdateCustomElementNested(element.id, 'contactInfo.email', e.target.value)}
                 className="w-full p-2 rounded border bg-white border-gray-300"
                 placeholder="Email"
               />
              <input
                type="text"
                value={element.data.contactInfo.website}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'contactInfo.website', e.target.value)}
                className={`w-full p-2 rounded border`}
                placeholder="Website"
              />
            </div>
          </motion.div>
        )

      case 'signature-section':
        return (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border `}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Signature Section</h3>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveCustomElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={element.data.signerName}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'signerName', e.target.value)}
                className={`w-full p-2 rounded border`}
                placeholder="Signer Name"
              />
              <input
                type="text"
                value={element.data.title}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'title', e.target.value)}
                className={`w-full p-2 rounded border`}
                placeholder="Title"
              />
              <input
                type="date"
                value={element.data.date}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'date', e.target.value)}
                className={`w-full p-2 rounded border`}
              />
            </div>
          </motion.div>
        )

      case 'stamp-seal':
        return (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border bg-gray-50 border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Stamp & Seal</h3>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveCustomElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={element.data.stampText}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'stampText', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Stamp Text"
              />
              <input
                type="text"
                value={element.data.status}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'status', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Status"
              />
              <select
                value={element.data.stampType}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'stampType', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
              >
                <option value="circular">Circular</option>
                <option value="rectangular">Rectangular</option>
                <option value="oval">Oval</option>
              </select>
            </div>
          </motion.div>
        )

      case 'payment-info':
        return (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border bg-gray-50 border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Payment Information</h3>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveCustomElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={element.data.bankTransfer}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'bankTransfer', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Bank Transfer Details"
              />
              <input
                type="text"
                value={element.data.creditCards}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'creditCards', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Accepted Credit Cards"
              />
              <input
                type="text"
                value={element.data.paypal}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'paypal', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="PayPal Email"
              />
              <input
                type="text"
                value={element.data.checkPayable}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'checkPayable', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Check Payable To"
              />
            </div>
          </motion.div>
        )

      case 'contact-info':
        return (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border bg-gray-50 border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Contact Information</h3>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveCustomElement(element.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </motion.button>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={element.data.phone}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'phone', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Phone Number"
              />
              <input
                type="email"
                value={element.data.email}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'email', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Email Address"
              />
              <textarea
                value={element.data.address}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'address', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                rows="3"
                placeholder="Address"
              />
              <input
                type="text"
                value={element.data.website}
                onChange={(e) => onUpdateCustomElementNested(element.id, 'website', e.target.value)}
                className="w-full p-2 rounded border bg-white border-gray-300"
                placeholder="Website"
              />
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  if (isEditorEmpty()) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Start Creating Your Invoice
          </h2>
          <p className="text-sm mb-6 text-gray-600 leading-relaxed">
            Drag elements from the sidebar or use the form below to build your professional invoice
          </p>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAddItem}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Item
            </motion.button>
            <div className="text-xs text-gray-500 flex items-center gap-2 justify-center">
              <Lightbulb className="w-3 h-3 text-yellow-500" />
              Tip: Use the sidebar to drag and drop professional invoice elements
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-white">
      <div className="space-y-8">
        {/* Business Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
                      <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Business Information</h2>
              <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
            </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Business Name</label>
              <input
                type="text"
                value={invoiceData.businessInfo.name}
                onChange={(e) => updateInvoiceData('businessInfo', 'name', e.target.value)}
                className="w-full p-3 rounded-lg border bg-white border-gray-300"
                placeholder="Your Business Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={invoiceData.businessInfo.email}
                onChange={(e) => updateInvoiceData('businessInfo', 'email', e.target.value)}
                className="w-full p-3 rounded-lg border bg-white border-gray-300"
                placeholder="business@email.com"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea
                value={invoiceData.businessInfo.address}
                onChange={(e) => updateInvoiceData('businessInfo', 'address', e.target.value)}
                className="w-full p-3 rounded-lg border bg-white border-gray-300"
                rows="3"
                placeholder="Business Address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={invoiceData.businessInfo.phone}
                onChange={(e) => updateInvoiceData('businessInfo', 'phone', e.target.value)}
                className={`w-full p-3 rounded-lg border `}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </motion.div>

        {/* Client Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
                      <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Client Information</h2>
              <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
            </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Client Name</label>
              <input
                type="text"
                value={invoiceData.clientInfo.name}
                onChange={(e) => updateInvoiceData('clientInfo', 'name', e.target.value)}
                className={`w-full p-3 rounded-lg border `}
                placeholder="Client Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={invoiceData.clientInfo.email}
                onChange={(e) => updateInvoiceData('clientInfo', 'email', e.target.value)}
                className={`w-full p-3 rounded-lg border `}
                placeholder="client@email.com"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea
                value={invoiceData.clientInfo.address}
                onChange={(e) => updateInvoiceData('clientInfo', 'address', e.target.value)}
                className={`w-full p-3 rounded-lg border `}
                rows="3"
                placeholder="Client Address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={invoiceData.clientInfo.phone}
                onChange={(e) => updateInvoiceData('clientInfo', 'phone', e.target.value)}
                className={`w-full p-3 rounded-lg border `}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </motion.div>

        {/* Invoice Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
                      <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Invoice Details</h2>
              <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
            </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Invoice Number</label>
              <input
                type="text"
                value={invoiceData.invoiceDetails.number}
                onChange={(e) => updateInvoiceData('invoiceDetails', 'number', e.target.value)}
                className={`w-full p-3 rounded-lg border `}
                placeholder="INV-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                value={invoiceData.invoiceDetails.date}
                onChange={(e) => updateInvoiceData('invoiceDetails', 'date', e.target.value)}
                className={`w-full p-3 rounded-lg border `}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                value={invoiceData.invoiceDetails.dueDate}
                onChange={(e) => updateInvoiceData('invoiceDetails', 'dueDate', e.target.value)}
                className={`w-full p-3 rounded-lg border `}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                value={invoiceData.invoiceDetails.currency}
                onChange={(e) => updateInvoiceData('invoiceDetails', 'currency', e.target.value)}
                className={`w-full p-3 rounded-lg border `}
              >
                 <option value="RS.">RS (₹)</option>

                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
              <input
                type="number"
                value={invoiceData.invoiceDetails.taxRate}
                onChange={(e) => updateInvoiceData('invoiceDetails', 'taxRate', parseFloat(e.target.value) || 0)}
                className={`w-full p-3 rounded-lg border `}
                placeholder="0"
              />
            </div>
          </div>
        </motion.div>

        {/* Custom Elements */}
        {customElements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-black">Custom Elements</h2>
            <div className="space-y-4">
              {customElements.map((element, index) => (
                <div
                  key={element.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', index.toString())
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'))
                    const toIndex = index
                    if (fromIndex !== toIndex) {
                      onReorderCustomElements(fromIndex, toIndex)
                    }
                  }}
                  className="relative"
                >
                  {renderCustomElement(element)}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Invoice Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
                      <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Invoice Items</h2>
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAddItem}
                className="bg-gray-800 text-white px-2 py-1 rounded-lg hover:bg-gray-700 transition-colors"
              >
                + Item
              </motion.button>
            </div>
          </div>
          
          <div className="space-y-4">
            {invoiceData.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg border `}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                      className={`w-full p-2 rounded border `}
                      placeholder="Item description"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => onUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className={`w-full p-2 rounded border `}
                      placeholder="Qty"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => onUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="w-full p-2 rounded border bg-white border-gray-300"
                      placeholder="Rate"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="p-2 rounded bg-gray-100">
                      ${item.amount.toFixed(2)}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Totals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
                      <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Totals</h2>
              <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
            </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({invoiceData.invoiceDetails.taxRate}%):</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notes and Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
                      <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Notes & Terms</h2>
              <div className="text-gray-400 text-sm cursor-move hover:text-gray-600" title="Drag to reorder">⋮⋮⋮</div>
            </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-3 rounded-lg border bg-white border-gray-300"
                rows="4"
                placeholder="Additional notes..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Terms & Conditions</label>
              <textarea
                value={invoiceData.terms}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, terms: e.target.value }))}
                className="w-full p-3 rounded-lg border bg-white border-gray-300"
                rows="4"
                placeholder="Payment terms and conditions..."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
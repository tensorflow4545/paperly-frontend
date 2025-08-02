"use client"

const templates = [
  {
    id: "startup-bold",
    name: "Startup Bold",
    category: "Business",
    description: "Navy blue header, white body, bold font for amounts. Ideal for tech freelancers and agency billing.",
    features: ["Business-Ready", "L&M & QR Support", "Agency", "Tech"],
    backgroundColor: "bg-blue-50",
    preview: {
      type: "startup-bold",
    },
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    category: "Popular",
    description:
      "Light gray with bold headings and plenty of white space. Perfect for designers and creatives who value clean aesthetics.",
    features: ["Includes Signature", "Simple & Structured", "Freelancer", "Service-Based"],
    backgroundColor: "bg-gray-50",
    preview: {
      type: "modern-minimal",
    },
  },
  {
    id: "classic-blue",
    name: "Classic Blue",
    category: "Professional",
    description:
      "Blue header, classic layout with table lines. Ideal for accountants, VAs, and copywriters who prefer traditional formatting.",
    features: ["Easy to Print", "Multi-Currency", "Accountant", "VA"],
    backgroundColor: "bg-blue-50",
    preview: {
      type: "classic-blue",
    },
  },
  {
    id: "elegant-gold",
    name: "Elegant Gold",
    category: "Premium",
    description:
      "Pale yellow-gold background with serif fonts and soft lines. Ideal for consultants or creatives who want elegance.",
    features: ["Premium Look", "Contact Details Included", "Consultant", "Service-Based"],
    backgroundColor: "bg-yellow-50",
    preview: {
      type: "elegant-gold",
    },
  },
  {
    id: "freelancer-focused",
    name: "Freelancer Focused",
    category: "New",
    description:
      "Green accents, minimalist font, responsive layout. Designed for developers, designers, and remote freelancers.",
    features: ["Milestone Friendly", "Time-Based Billing", "Freelancer", "Remote"],
    backgroundColor: "bg-green-50",
    preview: {
      type: "freelancer-focused",
    },
  },
]

function TemplatePreview({ template }) {
  const renderPreview = () => {
    switch (template.preview.type) {
             case "startup-bold":
         return (
            <div className="bg-gray-100 rounded-md p-6">
           <div className="bg-white max-w-[523px] p-4 text-xs shadow-sm rounded-2xl">
             <div className="flex justify-between mb-4">
               <div>
                 <div className="font-bold text-lg mb-1">Sarah Johnson</div>
                 <div className="text-gray-600">UI/UX Designer</div>
                 <div className="text-gray-600">sarah@design.com</div>
               </div>
               <div className="text-right">
                 <div className="font-bold">Invoice #INV-001</div>
                 <div className="text-gray-600">Dec 15, 2024</div>
                 <div className="text-gray-600">Due: Jan 15, 2025</div>
               </div>
             </div>
             <div className="mb-4">
               <div className="font-semibold mb-2">Bill To:</div>
               <div>TechCorp Inc.</div>
               <div>contact@techcorp.com</div>
               <div>San Francisco, CA</div>
             </div>
             <div className="mb-4">
               <div className="bg-gray-50 p-3 rounded-lg">
                 <table className="w-full text-xs">
                   <thead>
                     <tr className="border-b">
                       <th className="text-left py-1">Service</th>
                       <th className="text-left py-1">Qty</th>
                       <th className="text-left py-1">Rate</th>
                       <th className="text-left py-1">Total</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td className="py-1">Website Design</td>
                       <td className="py-1">1</td>
                       <td className="py-1">$2,500</td>
                       <td className="py-1">$2,500</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </div>
             <div className="text-right mb-4">
               <div className="mb-1">Subtotal: $2,500.00</div>
               <div className="text-lg font-bold">Total Due: $2,712.50</div>
             </div>
             <div className="text-gray-600 text-xs">
               <div className="mb-2">Payment Terms: Net 30 days</div>
               <div className="flex justify-between">
                 <div>Signature: ___________</div>
                 <div>Date: ___________</div>
               </div>
             </div>
           </div>
           </div>
         )

             case "modern-minimal":
         return (
            <div className="bg-[#FEFCE8] rounded-md p-6">
           <div className="bg-yellow-50 max-w-[523px] border border-yellow-200 shadow-sm rounded-lg overflow-hidden">
             <div className="bg-yellow-100 p-3 text-center font-bold border-b border-yellow-200">
               Marketing Consultation Invoice
             </div>
             <div className="p-4 bg-white">
               <div className="flex justify-between mb-4">
                 <div>
                   <div className="font-bold text-lg">Michael Chen</div>
                   <div className="text-gray-700">Marketing Consultant</div>
                   <div className="text-gray-700">michael@consultpro.com</div>
                   <div className="text-gray-700">+1 (555) 123-4567 • New York</div>
                 </div>
                 <div className="text-right">
                   <div className="font-bold">Invoice #MC-002</div>
                   <div className="text-gray-700">Dec 20, 2024</div>
                   <div className="text-gray-700">Due: Jan 20, 2025</div>
                 </div>
               </div>
               <div className="mb-4">
                 <div className="font-bold mb-2">Project: Brand Strategy Overhaul</div>
                 <div className="text-gray-700">
                   <div>Acme Corporation</div>
                   <div>contact@acmecorp.com</div>
                   <div>New York, NY 10001</div>
                 </div>
               </div>
               <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                 <div className="space-y-2 text-xs">
                   <div className="flex justify-between">
                     <div>Strategy Session (4 hours)</div>
                     <div className="font-semibold">$1,200.00</div>
                   </div>
                   <div className="flex justify-between">
                     <div>Campaign Analysis & Report</div>
                     <div className="font-semibold">$800.00</div>
                   </div>
                   <div className="flex justify-between">
                     <div>Brand Guidelines Document</div>
                     <div className="font-semibold">$600.00</div>
                   </div>
                 </div>
               </div>
               <div className="text-right border-t border-yellow-200 pt-3">
                 <div className="mb-1">Subtotal: $2,600.00</div>
                 <div className="text-lg font-bold">Total Amount: $2,470.00</div>
               </div>
               <div className="mt-4 text-xs text-gray-600">
                 <div className="mb-2">Payment Method: Bank Transfer (USD)</div>
                 <div className="flex justify-between">
                   <div>Signature: ___________</div>
                   <div>Date: ___________</div>
                 </div>
               </div>
             </div>
           </div>
           </div>
         )

             case "classic-blue":
         return (
            <div className="bg-[#F0FDF4] rounded-md p-6">
           <div className="bg-white max-w-[523px] p-4 text-xs shadow-sm rounded-2xl">
             <div className="flex justify-between mb-4">
               <div>
                 <div className="font-bold text-lg">Alex Rodriguez</div>
                 <div className="text-gray-700">Full-Stack Developer • Remote</div>
                 <div className="text-green-500 text-xs">🔗 portfolio.alexdev.com</div>
                 <div className="text-gray-700">alex@devpro.com</div>
               </div>
               <div className="text-right">
                 <div className="font-bold">Invoice #DEV-003</div>
                 <div className="text-gray-700">Dec 20, 2024</div>
                 <div className="text-gray-700">Due: Jan 5, 2025</div>
               </div>
             </div>
             <div className="mb-4">
               <div className="font-semibold mb-2">Bill To:</div>
               <div className="text-gray-700">
                 <div className="font-semibold">StartupXYZ</div>
                 <div>hello@startupxyz.com</div>
                 <div>San Francisco, CA 94105 • USA</div>
                 <div className="text-xs text-gray-600">Tax ID: 53234567890</div>
               </div>
             </div>
             <div className="bg-green-50 p-3 rounded-lg mb-4">
               <div className="space-y-3">
                 <div className="flex justify-between items-center">
                   <div>
                     <div className="flex items-center gap-2">
                       <span className="font-semibold">Frontend Development</span>
                       <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">Milestone 1</span>
                     </div>
                     <div className="text-xs text-gray-600">40 hours tracked</div>
                   </div>
                   <div className="font-bold">$3,200.00</div>
                 </div>
                 <div className="flex justify-between items-center">
                   <div>
                     <div className="flex items-center gap-2">
                       <span className="font-semibold">API Integration</span>
                       <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">Milestone 2</span>
                     </div>
                     <div className="text-xs text-gray-600">20 hours tracked</div>
                   </div>
                   <div className="font-bold">$1,600.00</div>
                 </div>
               </div>
             </div>
             <div className="text-right border-t border-green-200 pt-3 mb-4">
               <div className="mb-1">Subtotal: $4,800.00</div>
               <div className="text-lg font-bold">Total (USD): $4,800.00</div>
             </div>
             <div className="text-xs text-gray-600">
               <div className="mb-2">Payment Gateway: PayPal • Stripe • Bank Transfer</div>
                               <div className="mb-2 italic">&ldquo;Work delivered as discussed. Thank you for your business!&rdquo;</div>
               <div className="flex justify-between">
                 <div>Developer Signature: ___________</div>
                 <div>Date: ___________</div>
               </div>
             </div>
           </div>
           </div>
         )

      case "elegant-gold":
        return (
            <div className="bg-[#EFF6FF] rounded-md p-6">
          <div className="bg-white max-w-[523px] text-xs shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-blue-500 text-white text-center py-3 font-bold">
              INVOICE
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="font-semibold mb-1">From:</div>
                  <div className="font-semibold">Jennifer Smith</div>
                  <div>Virtual Assistant</div>
                  <div>jenny@vaservices.com</div>
                  <div>+44 20 1234 5678</div>
                  <div>London, UK</div>
                </div>
                <div>
                  <div className="font-semibold mb-1">To:</div>
                  <div>Global Enterprises Ltd.</div>
                  <div>finance@globalent.com</div>
                  <div>Manchester, UK M1 1AA</div>
                  <div>VAT: GB123456789</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4 text-xs">
                <div>
                  <div className="font-semibold">Invoice Number:</div>
                  <div className="font-bold">VA-2024-005</div>
                </div>
                <div>
                  <div className="font-semibold">Invoice Date:</div>
                  <div className="font-bold">Dec 22, 2024</div>
                </div>
                <div>
                  <div className="font-semibold">Due Date:</div>
                  <div className="font-bold">Jan 22, 2025</div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-1">Service ID</th>
                      <th className="text-left py-1">Description</th>
                      <th className="text-left py-1">Hours</th>
                      <th className="text-left py-1">Rate</th>
                      <th className="text-right py-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">VA001</td>
                      <td className="py-1">Admin Support</td>
                      <td className="py-1">20</td>
                      <td className="py-1">£25/hr</td>
                      <td className="py-1 text-right">£500.00</td>
                    </tr>
                    <tr>
                      <td className="py-1">VA002</td>
                      <td className="py-1">Email Management</td>
                      <td className="py-1">10</td>
                      <td className="py-1">£20/hr</td>
                      <td className="py-1 text-right">£200.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-right mb-4">
                <div className="mb-1">Subtotal: £700.00</div>
                <div className="mb-1">VAT (20%): £140.00</div>
                <div className="border-t pt-1 mb-2"></div>
                <div className="text-lg font-bold">Total Amount Due: £840.00</div>
              </div>
              <div className="border-t pt-3 mb-4">
                <div className="font-semibold mb-2">Remittance Instructions:</div>
                <div className="text-xs">Payment Method: Bank Transfer (GBP)</div>
                <div className="text-xs">Account: Jennifer Smith Business Account</div>
              </div>
              <div className="flex justify-between text-xs">
                <div>
                  <div>Jennifer Smith</div>
                  <div>Virtual Assistant</div>
                </div>
                <div>
                  <div className="border-b border-gray-300 pb-1">Signature & Date</div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )

             case "freelancer-focused":
         return (
            <div className="bg-[#EFF6FF] rounded-md p-6">
           <div className="bg-white max-w-[523px] text-xs shadow-sm rounded-lg overflow-hidden">
             <div className="bg-[#1E3A8A] text-white p-3 flex justify-between items-center">
               <div>
                 <div className="font-bold text-sm">TechSolutions Pro</div>
                 <div className="text-blue-100 text-xs">Web Development Agency</div>
                 <div className="text-blue-100 text-xs">@techsolutions_pro</div>
               </div>
               <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                 TS
               </div>
             </div>
             <div className="bg-blue-50 p-2 border-b">
               <div className="font-bold text-blue-900 text-xs">Project: E-commerce Platform Development</div>
               <div className="text-blue-700 text-xs">Timeline: Nov 1 - Dec 15, 2024</div>
             </div>
             <div className="p-3">
               <div className="mb-3">
                 <div className="font-semibold text-xs mb-1">Bill To:</div>
                 <div className="text-xs">
                   <div className="font-semibold">RetailCorp Ltd.</div>
                   <div>123 Business Ave, Chicago, IL 60601</div>
                   <div className="text-gray-600">Business License: IL-BC-123456</div>
                 </div>
               </div>
               <div className="space-y-2 mb-3">
                 <div className="flex justify-between text-xs">
                   <div>
                     <div className="font-semibold">Phase 1: Setup & Design</div>
                     <div className="text-gray-600">UI/UX Design, Wireframes, Prototypes</div>
                   </div>
                   <div className="font-bold">$5,000.00</div>
                 </div>
                 <div className="flex justify-between text-xs">
                   <div>
                     <div className="font-semibold">Phase 2: Development</div>
                     <div className="text-gray-600">Frontend, Backend, Database Setup</div>
                   </div>
                   <div className="font-bold">$8,000.00</div>
                 </div>
                 <div className="flex justify-between text-xs">
                   <div>
                     <div className="font-semibold">Phase 3: Testing & Deployment</div>
                     <div className="text-gray-600">QA Testing, Launch, Documentation</div>
                   </div>
                   <div className="font-bold">$2,000.00</div>
                 </div>
               </div>
               <div className="text-right text-xs border-t pt-2">
                 <div className="mb-1">
                   Subtotal: <span className="font-bold">$15,000.00</span>
                 </div>
                 <div className="mb-1">
                   Payment Plan: <span className="font-bold">50% Upfront</span>
                 </div>
                 <div className="text-lg font-bold">Amount Due: $7,500.00</div>
               </div>
               <div className="mt-3 text-xs">
                 <div className="flex justify-between items-center">
                   <div>
                     <div className="text-gray-600">EFT Payment:</div>
                     <div className="text-gray-600">Company Seal &</div>
                     <div className="text-gray-600">Signature:</div>
                   </div>
                   <div>
                     <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-gray-400">
                       QR
                     </div>
                     <div className="text-gray-600 mt-1">Date:</div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           </div>
         )

      default:
        return <div className="bg-white p-4 text-center text-gray-500">Template Preview</div>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Template Preview with Background */}
      <div className= "p-4">
        <div style={{ overflow: "hidden" }}>{renderPreview()}</div>
      </div>

      {/* Template Info */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            {template.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{template.description}</p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {template.features.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
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
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
            Use This Template
          </button>
          <button className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors duration-200">
            Preview Full
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Invoice Templates</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professional invoice templates designed for different industries and business
            needs.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          {templates.map((template) => (
            <TemplatePreview key={template.id} template={template} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Need a Custom Template?</h2>
            <p className="text-gray-600 mb-4">
              Can&apos;t find the perfect template for your business? We can create a custom invoice template tailored to
              your specific needs.
            </p>
            <button className="bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-5 rounded-lg font-medium transition-colors duration-200">
              Request Custom Template
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

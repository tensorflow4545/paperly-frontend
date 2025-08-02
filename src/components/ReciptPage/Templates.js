"use client"

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
    backgroundColor: "bg-green-50",
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
    backgroundColor: "bg-purple-50",
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
    backgroundColor: "bg-indigo-50",
    preview: {
      type: "enterpriseinvoice",
    },
  },
]

function TemplatePreview({ template }) {
  const renderPreview = () => {
    switch (template.preview.type) {
      case "quickbill":
  return (
          <div className="bg-white max-w-[523px] p-6 text-sm shadow-sm rounded-2xl border border-gray-100">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-gray-800 mb-1">INVOICE</div>
              <div className="text-gray-500 text-sm">QuickBill</div>
        </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="font-semibold text-gray-700 mb-2">From:</div>
                <div className="font-bold text-lg">John Smith</div>
                <div className="text-gray-600">Freelance Designer</div>
                <div className="text-gray-600">john@design.com</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-2">To:</div>
                <div className="font-bold">Tech Startup Inc.</div>
                <div className="text-gray-600">contact@techstartup.com</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
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

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="font-semibold text-gray-700 mb-3">Service Description:</div>
              <div className="text-gray-800">Website Design & Development</div>
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
          <div className="bg-white max-w-[523px] p-6 text-sm shadow-sm rounded-2xl border border-blue-100">
            <div className="bg-blue-600 text-white p-4 rounded-t-2xl -m-6 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold">StandardPro</div>
                <div className="text-blue-100 text-sm">Professional Invoice</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="font-semibold text-gray-700 mb-2">From:</div>
                <div className="font-bold text-lg">Sarah Johnson</div>
                <div className="text-gray-600">Marketing Consultant</div>
                <div className="text-gray-600">sarah@consulting.com</div>
                <div className="text-gray-600">+1 (555) 123-4567</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-2">To:</div>
                <div className="font-bold">Acme Corporation</div>
                <div className="text-gray-600">billing@acmecorp.com</div>
                <div className="text-gray-600">123 Business St, NY 10001</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
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

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left py-2 font-semibold">Service</th>
                    <th className="text-left py-2 font-semibold">Qty</th>
                    <th className="text-left py-2 font-semibold">Rate</th>
                    <th className="text-right py-2 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Strategy Session</td>
                    <td className="py-2">4 hours</td>
                    <td className="py-2">$150/hr</td>
                    <td className="py-2 text-right font-semibold">$600.00</td>
                  </tr>
                  <tr>
                    <td className="py-2">Campaign Design</td>
                    <td className="py-2">1</td>
                    <td className="py-2">$800</td>
                    <td className="py-2 text-right font-semibold">$800.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-right space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">$1,400.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span className="font-semibold">$140.00</span>
              </div>
              <div className="border-t pt-2">
                <div className="text-xl font-bold text-blue-600">$1,540.00</div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <div>Payment Method: Bank Transfer / PayPal</div>
            </div>
          </div>
        )

      case "businessedge":
        return (
          <div className="bg-white max-w-[523px] p-6 text-sm shadow-sm rounded-2xl border border-green-100">
            <div className="bg-green-600 text-white p-4 rounded-t-2xl -m-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xl font-bold">BusinessEdge</div>
                  <div className="text-green-100 text-sm">Professional Services</div>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="text-green-600 font-bold text-lg">BE</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="font-semibold text-gray-700 mb-2">From:</div>
                <div className="font-bold text-lg">Digital Solutions LLC</div>
                <div className="text-gray-600">GST: 27ABCDE1234F1Z5</div>
                <div className="text-gray-600">info@digitalsolutions.com</div>
                <div className="text-gray-600">+1 (555) 987-6543</div>
                <div className="text-gray-600">San Francisco, CA</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-2">To:</div>
                <div className="font-bold">Global Enterprises Ltd.</div>
                <div className="text-gray-600">VAT: GB123456789</div>
                <div className="text-gray-600">accounts@globalent.com</div>
                <div className="text-gray-600">London, UK</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
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

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-200">
                    <th className="text-left py-2 font-semibold">Service</th>
                    <th className="text-left py-2 font-semibold">Description</th>
                    <th className="text-right py-2 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 font-semibold">Web Development</td>
                    <td className="py-2">E-commerce platform with payment integration</td>
                    <td className="py-2 text-right font-semibold">$3,500.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">SEO Optimization</td>
                    <td className="py-2">Search engine optimization and analytics setup</td>
                    <td className="py-2 text-right font-semibold">$800.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-right space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">$4,300.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (15%):</span>
                <span className="font-semibold">$645.00</span>
              </div>
              <div className="border-t pt-2">
                <div className="text-xl font-bold text-green-600">$4,945.00</div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <div>Currency: USD | Payment: Bank Transfer</div>
            </div>
          </div>
        )

      case "contractorplus":
        return (
          <div className="bg-white max-w-[523px] p-6 text-sm shadow-sm rounded-2xl border border-purple-100">
            <div className="bg-purple-600 text-white p-4 rounded-t-2xl -m-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xl font-bold">ContractorPlus</div>
                  <div className="text-purple-100 text-sm">Professional Contracting</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Project: CRM System</div>
                  <div className="text-xs">Contract #CP-2024-001</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="font-semibold text-gray-700 mb-2">Contractor:</div>
                <div className="font-bold text-lg">Alex Rodriguez</div>
                <div className="text-gray-600">Senior Full-Stack Developer</div>
                <div className="text-gray-600">alex@devpro.com</div>
                <div className="text-gray-600">+1 (555) 456-7890</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-2">Client:</div>
                <div className="font-bold">TechCorp Solutions</div>
                <div className="text-gray-600">billing@techcorp.com</div>
                <div className="text-gray-600">San Francisco, CA</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
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

            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Milestone 1: Backend API</span>
                      <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs">Completed</span>
                    </div>
                    <div className="text-xs text-gray-600">40 hours @ $75/hr</div>
                  </div>
                  <div className="font-bold">$3,000.00</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Milestone 2: Frontend UI</span>
                      <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs">In Progress</span>
                    </div>
                    <div className="text-xs text-gray-600">25 hours @ $75/hr</div>
                  </div>
                  <div className="font-bold">$1,875.00</div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">$4,875.00</span>
              </div>
              <div className="flex justify-between">
                <span>Retainer Fee:</span>
                <span className="font-semibold">$500.00</span>
              </div>
              <div className="border-t pt-2">
                <div className="text-xl font-bold text-purple-600">$5,375.00</div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <div>Payment Schedule: 50% upfront, 50% on completion</div>
            </div>
          </div>
        )

      case "enterpriseinvoice":
            return (
          <div className="bg-white max-w-[523px] p-6 text-sm shadow-sm rounded-2xl border border-indigo-100">
            <div className="bg-indigo-600 text-white p-4 rounded-t-2xl -m-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xl font-bold">EnterpriseInvoice</div>
                  <div className="text-indigo-100 text-sm">Multi-Department Billing</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">PO: EN-2024-001</div>
                  <div className="text-xs">Status: Approved</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="font-semibold text-gray-700 mb-2">From:</div>
                <div className="font-bold text-lg">Innovation Agency Ltd.</div>
                <div className="text-gray-600">Tax ID: 12-3456789</div>
                <div className="text-gray-600">billing@innovationagency.com</div>
                <div className="text-gray-600">+1 (555) 789-0123</div>
                <div className="text-gray-600">New York, NY</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-2">To:</div>
                <div className="font-bold">Global Tech Solutions</div>
                <div className="text-gray-600">VAT: GB987654321</div>
                <div className="text-gray-600">accounts@globaltech.com</div>
                <div className="text-gray-600">London, UK</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 text-sm">
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

            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-indigo-800 mb-2">Design Department</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>UI/UX Design</span>
                      <span className="font-semibold">$2,500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Brand Guidelines</span>
                      <span className="font-semibold">$800.00</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-indigo-200 pt-4">
                  <div className="font-semibold text-indigo-800 mb-2">Development Department</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Frontend Development</span>
                      <span className="font-semibold">$4,200.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Backend API</span>
                      <span className="font-semibold">$3,800.00</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-indigo-200 pt-4">
                  <div className="font-semibold text-indigo-800 mb-2">QA Department</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Testing & Quality Assurance</span>
                      <span className="font-semibold">$1,500.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">$12,800.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (20%):</span>
                <span className="font-semibold">$2,560.00</span>
              </div>
              <div className="border-t pt-2">
                <div className="text-xl font-bold text-indigo-600">$15,360.00</div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <div>Multi-Currency Support | Digital Verification QR</div>
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
      <div className={`${template.backgroundColor} p-4`}>
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

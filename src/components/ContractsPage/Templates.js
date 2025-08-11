"use client"

import { useState } from "react"
import {
  Calendar,
  Handshake,
  DollarSign,
  FileText,
  Shield,
  Clock,
  Edit3,
  Gavel,
  Scale,
  Signature,
  HelpCircle,
  MapPin,
  Mail,
  Building2,
  User,
  CreditCard,
} from "lucide-react"

const contractTemplates = [
  {
    id: "freelance-service-agreement",
    name: "Freelance Service Agreement",
    category: "Professional",
    description:
      "A professional agreement covering scope of work, deliverables, timelines, and payment terms. Ideal for freelancers providing design, development, writing, or marketing services.",
    bestFor: "One-off projects or clearly defined tasks",
    backgroundColor: "bg-[#FEFCE8]",
    headerAccent: "bg-[#FEFCE8]",
    highlights: ["One-off Project", "Deliverables-based", "Payment on Delivery"],
    purpose: "One-time or limited-scope project with clearly defined deliverables.",
    summaryBullets: ["Defined deliverables", "Clear payment schedule", "Project timeline"],
    preview: { type: "freelance" },
  },
  {
    id: "retainer-agreement",
    name: "Retainer Agreement",
    category: "Ongoing",
    description:
      "Set the terms for ongoing freelance services with predictable monthly or weekly work hours, payment schedules, and termination clauses.",
    bestFor: "Clients needing recurring support",
    backgroundColor: "bg-gray-50",
    headerAccent: "bg-gray-50",
    highlights: ["Recurring Monthly", "Hours Cap", "Auto-billing"],
    purpose: "Ongoing work with regular payment intervals.",
    summaryBullets: ["Recurring fee", "Hours cap & response time", "Auto renewals"],
    preview: { type: "retainer" },
  },
  {
    id: "project-based-contract",
    name: "Project-Based Contract",
    category: "Project",
    description:
      "Simple, focused contract for single projects with a fixed fee or hourly rate. Includes deadlines, revisions policy, and approval process.",
    bestFor: "Short-term engagements with clear deliverables",
    backgroundColor: "bg-blue-50",
    headerAccent: "bg-blue-50",
    highlights: ["Milestone-based", "Fixed Fee or Hourly", "Approval Steps"],
    purpose: "Fixed-price or milestone-based work for a specific project.",
    summaryBullets: ["Milestones & payments", "Ownership on payment", "Fixed schedule"],
    preview: { type: "project" },
  },
  {
    id: "nda-freelancer",
    name: "Non-Disclosure Agreement (Freelancer)",
    category: "Legal",
    description:
      "Protect confidential information shared during a project. Includes clauses to prevent disclosure or misuse of sensitive data.",
    bestFor: "Projects with proprietary or sensitive materials",
    backgroundColor: "bg-gray-50",
    headerAccent: "bg-slate-50",
    highlights: ["Mutual Confidentiality", "Limited Term", "No Disclosure"],
    purpose: "Protects confidential information exchanged between client and freelancer.",
    summaryBullets: ["Mutual confidentiality", "Term-limited", "Return/destroy materials"],
    preview: { type: "nda" },
  },
]

function TemplatePreview({ template, onPreview }) {
  const renderMiniContract = () => {
    switch (template.preview.type) {
      case "freelance":
        return (
          <div className="bg-white max-w-[560px] p-4 text-xs rounded-lg border border-gray-200 shadow-sm">
            <div className={`h-2 rounded-md mb-3 ${template.headerAccent}`} />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-700" />
                <div className="text-sm font-semibold text-gray-900">Freelance Agreement</div>
              </div>
              <span className="text-[11px] text-gray-600">Professional</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-50 border border-gray-200 rounded p-2">
                <div className="flex items-center gap-1 text-[11px] text-gray-600"><User className="w-3.5 h-3.5" /> Client</div>
                <div className="text-[11px] text-gray-700 mt-1">Acme Corp</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-2">
                <div className="flex items-center gap-1 text-[11px] text-gray-600"><Handshake className="w-3.5 h-3.5" /> Freelancer</div>
                <div className="text-[11px] text-gray-700 mt-1">Jane Doe</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-gray-500" />
                <div className="text-[11px] text-gray-700 truncate">Scope: Website design (wireframes, UI, responsive HTML/CSS)</div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-gray-500" />
                <div className="text-[11px] text-gray-700 truncate">Payment: On delivery or milestone-based</div>
              </div>
            </div>
          </div>
        )
      case "retainer":
        return (
          <div className="bg-white max-w-[560px] p-4 text-xs rounded-lg border border-gray-200 shadow-sm">
            <div className={`h-2 rounded-md mb-3 ${template.headerAccent}`} />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-700" />
                <div className="text-sm font-semibold text-gray-900">Retainer Agreement</div>
              </div>
              <span className="text-[11px] text-gray-600">Ongoing</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
                <div className="text-[10px] text-gray-600">Hours/Month</div>
                <div className="text-xs font-semibold text-gray-800">20</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
                <div className="text-[10px] text-gray-600">Next Billing</div>
                <div className="text-xs font-semibold text-gray-800">1st</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
                <div className="text-[10px] text-gray-600">Fee</div>
                <div className="text-xs font-semibold text-gray-800">$1200</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <div className="text-[11px] text-gray-700 truncate">Billing Cycle: Monthly in advance</div>
            </div>
          </div>
        )
      case "project":
        return (
          <div className="bg-white max-w-[560px] p-4 text-xs rounded-lg border border-gray-200 shadow-sm">
            <div className={`h-2 rounded-md mb-3 ${template.headerAccent}`} />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-700" />
                <div className="text-sm font-semibold text-gray-900">Project Contract</div>
              </div>
              <span className="text-[11px] text-gray-600">Project</span>
            </div>
            <div className="space-y-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <div className="text-[11px] text-gray-700 truncate">Milestone 1: Design Approval</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <div className="text-[11px] text-gray-700 truncate">Milestone 2: Development</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <div className="text-[11px] text-gray-700 truncate">Due: 30 days after start</div>
            </div>
          </div>
        )
      case "nda":
        return (
          <div className="bg-white max-w-[560px] p-4 text-xs rounded-lg border border-gray-200 shadow-sm">
            <div className={`h-2 rounded-md mb-3 ${template.headerAccent}`} />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-700" />
                <div className="text-sm font-semibold text-gray-900">NDA (Freelancer)</div>
              </div>
              <span className="text-[11px] text-gray-600">Legal</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-gray-500" />
                <div className="text-[11px] text-gray-700 truncate">Confidential Info: Technical, business, financial</div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <div className="text-[11px] text-gray-700 truncate">Term: 1 year from disclosure</div>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-gray-500" />
                <div className="text-[11px] text-gray-700 truncate">Governing Law: As specified</div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <button
        type="button"
        onClick={() => onPreview(template)}
        className={`${template.backgroundColor} p-4 w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 sm:p-5`}
        aria-label={`Preview ${template.name}`}
      >
        <div className="overflow-hidden">
          {renderMiniContract()}
        </div>
      </button>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{template.name}</h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{template.description}</p>
          </div>
          <span className="shrink-0 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-medium">{template.category}</span>
        </div>

        {template.purpose ? (
          <div className="mb-4 text-[13px] text-gray-700">
            <span className="font-medium">Purpose:</span> {template.purpose}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
            <Clock className="w-3.5 h-3.5 text-gray-500" /> Best For: {template.bestFor}
          </span>
          {(template.highlights || []).slice(0, 3).map((h, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {i === 0 ? <FileText className="w-3.5 h-3.5 text-gray-500" /> : i === 1 ? <DollarSign className="w-3.5 h-3.5 text-gray-500" /> : <Shield className="w-3.5 h-3.5 text-gray-500" />}
              {h}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={`/contract-editor?template=${template.id}`}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2.5 px-4 rounded text-sm font-medium transition-colors duration-200 text-center active:scale-[0.99]"
            aria-label={`Try ${template.name} template`}
          >
            Try Template
          </a>
          <button
            onClick={() => onPreview(template)}
            className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm font-medium transition-colors duration-200 active:scale-[0.99]"
            aria-label={`Preview ${template.name}`}
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

  const Clause = ({ title, children }) => (
    <div className="mb-4">
      <div className="font-semibold text-gray-900 mb-1">{title}</div>
      <div className="text-gray-700 leading-relaxed text-sm">{children}</div>
    </div>
  )

  // UI helpers
  const Section = ({ icon: Icon, title, tooltip, children, accent = false }) => (
    <section className={`bg-white ${accent ? "border border-gray-200" : ""} rounded-lg p-4 mb-5 shadow-sm`}>
      <div className="flex items-center gap-2 mb-3">
        {Icon ? <Icon className="w-4 h-4 text-gray-700" /> : null}
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {tooltip ? (
          <HelpCircle className="w-3.5 h-3.5 text-gray-400" title={tooltip} />
        ) : null}
      </div>
      {children}
    </section>
  )

  const Label = ({ children }) => (
    <label className="block text-[11px] text-gray-600 mb-1">{children}</label>
  )

  const Input = ({ placeholder, type = "text" }) => (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 italic focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  )

  const TextArea = ({ placeholder, rows = 4 }) => (
    <textarea
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 italic focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  )

  const Divider = () => <div className="h-px bg-gray-100 my-6" />

  const HeaderBlock = ({ title, subtitle, variant }) => {
    switch (variant) {
      case "freelance":
        return (
          <div className="-m-6 -mb-2 p-6 rounded-t-lg border-b border-gray-200 bg-[#FEFCE8]">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{title}</div>
              {subtitle ? <div className="text-gray-600 text-sm mt-1">{subtitle}</div> : null}
            </div>
          </div>
        )
      case "retainer":
        return (
          <div className="-m-6 -mb-2 p-6 rounded-t-lg border-b border-gray-200 bg-gray-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{title}</div>
              {subtitle ? <div className="text-gray-600 text-sm mt-1">{subtitle}</div> : null}
            </div>
          </div>
        )
      case "project":
        return (
          <div className="-m-6 -mb-2 p-6 rounded-t-lg border-b border-gray-200 bg-blue-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{title}</div>
              {subtitle ? <div className="text-gray-600 text-sm mt-1">{subtitle}</div> : null}
            </div>
          </div>
        )
      case "nda":
        return (
          <div className="-m-6 -mb-2 p-6 rounded-t-lg border-b border-gray-200 bg-slate-50">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-gray-700" />
              <div className="text-2xl font-bold text-gray-900">{title}</div>
            </div>
            {subtitle ? <div className="text-center text-gray-600 text-sm">{subtitle}</div> : null}
          </div>
        )
      default:
        return null
    }
  }

  const SignatureBlock = ({ role }) => (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        <div>
          <Label>{role} Full Name</Label>
          <Input placeholder={`Enter ${role} Full Name`} />
        </div>
        <div>
          <Label>Typed Signature</Label>
          <Input placeholder="Type your name as signature" />
        </div>
        <div>
          <Label>Date</Label>
          <Input type="date" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Signature className="w-4 h-4 text-gray-600" />
        <button className="text-xs text-gray-700 underline">Draw Signature</button>
        <span className="text-[11px] text-gray-500">Best on touch devices</span>
      </div>
    </div>
  )

  const PartiesBlock = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-gray-700" />
          <div className="text-xs font-medium text-gray-900">Party A (Client)</div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label>Full Legal Name</Label>
            <Input placeholder="Enter Client Name" />
          </div>
          <div>
            <Label>Business Name (optional)</Label>
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-gray-500" />
              <Input placeholder="Enter Business Name" />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              <Input placeholder="Enter Address" />
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              <Input placeholder="name@company.com" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
        <div className="flex items-center gap-2 mb-2">
          <Handshake className="w-4 h-4 text-gray-700" />
          <div className="text-xs font-medium text-gray-900">Party B (Freelancer)</div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label>Full Legal Name</Label>
            <Input placeholder="Enter Freelancer Name" />
          </div>
          <div>
            <Label>Business Name (optional)</Label>
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-gray-500" />
              <Input placeholder="Enter Business Name" />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              <Input placeholder="Enter Address" />
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              <Input placeholder="name@example.com" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const PaymentBlock = () => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div className="md:col-span-2">
        <Label>Payment Amount</Label>
        <Input placeholder="e.g., 1500" type="number" />
      </div>
      <div>
        <Label>Currency</Label>
        <Input placeholder="USD, INR" />
      </div>
      <div>
        <Label>Method</Label>
        <div className="flex items-center gap-2">
          <CreditCard className="w-3.5 h-3.5 text-gray-500" />
          <Input placeholder="UPI, Bank, Card" />
        </div>
      </div>
      <div>
        <Label>Due Date</Label>
        <Input type="date" />
      </div>
      <div className="md:col-span-5">
        <Label>Late Payment (optional)</Label>
        <Input placeholder="e.g., 2% late fee after 7 days" />
      </div>
    </div>
  )

  const TimelineBlock = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <Label>Start Date</Label>
        <Input type="date" />
      </div>
      <div>
        <Label>Milestones</Label>
        <Input placeholder="e.g., Design → Dev → QA" />
      </div>
      <div>
        <Label>Final Delivery</Label>
        <Input type="date" />
      </div>
    </div>
  )

  const DisputeBlock = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label>Governing Law</Label>
        <Input placeholder="e.g., California, USA" />
      </div>
      <div>
        <Label>Jurisdiction</Label>
        <Input placeholder="e.g., San Francisco Courts" />
      </div>
      <div className="md:col-span-2">
        <Label>Liability Limitation</Label>
        <TextArea placeholder="e.g., Limited to fees paid under this agreement." rows={3} />
      </div>
    </div>
  )

  const renderFullPreview = () => {
    switch (template.preview.type) {
      case "freelance":
        return (
          <div className="bg-white max-w-2xl mx-auto p-6 text-sm shadow-lg rounded-lg">
            <HeaderBlock
              variant="freelance"
              title="FREELANCE SERVICE AGREEMENT"
              subtitle={
                <span>
                  This Freelance Service Agreement (&quot;Agreement&quot;) is made on <input type="date" className="px-2 py-1 border border-gray-200 rounded text-xs" /> between:
                </span>
              }
            />
            <Divider />

            <Section icon={Handshake} title="Party Details" accent>
              <div className="space-y-2 text-xs text-gray-800">
                <div>
                  <span className="font-semibold">Party A (Client): </span>
                  <span className="italic text-gray-600">[Full Name / Company Name], [Address], [Email]</span>
                </div>
                <div>
                  <span className="font-semibold">Party B (Freelancer): </span>
                  <span className="italic text-gray-600">[Full Name / Business Name], [Address], [Email]</span>
                </div>
              </div>
            </Section>

            <Section icon={FileText} title="1. Scope of Work">
              <TextArea placeholder="[Insert detailed description of services, deliverables, and specifications.]" />
            </Section>

            <Section icon={DollarSign} title="2. Payment Terms" accent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Total Fee</Label>
                  <Input placeholder="[Amount & Currency]" />
                </div>
                <div>
                  <Label>Payment Method</Label>
                  <Input placeholder="[Bank Transfer / UPI / PayPal / Other]" />
                </div>
                <div className="md:col-span-2">
                  <Label>Payment Schedule</Label>
                  <Input placeholder="[e.g., 50% upfront, 50% upon delivery]" />
                </div>
                <div className="md:col-span-2">
                  <Label>Late Payment</Label>
                  <Input placeholder="Interest at [X%] per month on overdue amounts." />
                </div>
              </div>
            </Section>

            <Section icon={Calendar} title="3. Timeline">
              <div className="text-xs text-gray-700">
                The Services will commence on <input type="date" className="px-2 py-1 border border-gray-200 rounded text-xs" /> and be completed by <input type="date" className="px-2 py-1 border border-gray-200 rounded text-xs" />, unless extended by mutual agreement in writing.
              </div>
            </Section>

            <Section icon={Edit3} title="4. Revisions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Included Rounds</Label>
                  <Input placeholder="The Client is entitled to [X] round(s) of revisions" />
                </div>
                <div>
                  <Label>Additional Revision Rate</Label>
                  <Input placeholder="Additional revisions billed at [Rate]" />
                </div>
              </div>
            </Section>

            <Section icon={Shield} title="5. Confidentiality" accent>
              <TextArea placeholder="Both parties agree to keep all confidential information received in connection with this Agreement private and secure." rows={3} />
            </Section>

            <Section icon={Gavel} title="6. Termination">
              <Input placeholder="Either party may terminate this Agreement with [X] days written notice. Upon termination, the Freelancer shall be compensated for completed work." />
            </Section>

            <Section icon={Scale} title="7. Governing Law" accent>
              <Input placeholder="This Agreement shall be governed by the laws of [Jurisdiction]." />
            </Section>

            <Section icon={Signature} title="Signatures">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SignatureBlock role="Client" />
                <SignatureBlock role="Freelancer" />
              </div>
            </Section>
          </div>
        )
      case "retainer":
        return (
          <div className="bg-white max-w-2xl mx-auto p-6 text-sm shadow-lg rounded-lg">
            <HeaderBlock
              variant="retainer"
              title="RETAINER AGREEMENT"
              subtitle={
                <span>
                  This Retainer Agreement (&quot;Agreement&quot;) is made on <input type="date" className="px-2 py-1 border border-gray-200 rounded text-xs" /> between:
                </span>
              }
            />
            <Divider />

            <Section icon={Handshake} title="Party Details" accent>
              <div className="space-y-2 text-xs text-gray-800">
                <div>
                  <span className="font-semibold">Party A (Client): </span>
                  <span className="italic text-gray-600">[Full Name / Company Name], [Address], [Email]</span>
                </div>
                <div>
                  <span className="font-semibold">Party B (Freelancer): </span>
                  <span className="italic text-gray-600">[Full Name / Business Name], [Address], [Email]</span>
                </div>
              </div>
            </Section>

            <Section icon={FileText} title="1. Services Covered">
              <TextArea placeholder="[List services or tasks to be performed regularly.]" />
            </Section>

            <Section icon={DollarSign} title="2. Retainer Fee & Payment" accent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Retainer Amount</Label>
                  <Input placeholder="[Amount & Currency] per [Month / Week]" />
                </div>
                <div>
                  <Label>Payment Due</Label>
                  <Input placeholder="On the [Xth] of each month/week in advance." />
                </div>
                <div>
                  <Label>Additional Work</Label>
                  <Input placeholder="Outside scope billed separately" />
                </div>
              </div>
            </Section>

            <Section icon={Clock} title="3. Availability & Response Time">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Availability</Label>
                  <Input placeholder="Up to [X hours] per [week/month]" />
                </div>
                <div>
                  <Label>Response Time</Label>
                  <Input placeholder="Max response time of [X hours/days]" />
                </div>
              </div>
            </Section>

            <Section icon={Calendar} title="4. Term & Renewal" accent>
              <Input placeholder="Remains in effect for [X months], auto-renews unless [X days] notice." />
            </Section>

            <Section icon={Shield} title="5. Confidentiality & Data Protection">
              <TextArea placeholder="All information shared by the Client shall remain confidential and used solely for the purposes of this Agreement." rows={3} />
            </Section>

            <Section icon={Gavel} title="6. Termination">
              <Input placeholder="Either party may terminate with [X days] written notice. Retainer fees for unused periods are non-refundable unless otherwise agreed." />
            </Section>

            <Section icon={Scale} title="7. Governing Law" accent>
              <Input placeholder="This Agreement is governed by the laws of [Jurisdiction]." />
            </Section>

            <Section icon={Signature} title="Signatures">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SignatureBlock role="Client" />
                <SignatureBlock role="Freelancer" />
              </div>
            </Section>
          </div>
        )
      case "project":
        return (
          <div className="bg-white max-w-2xl mx-auto p-6 text-sm shadow-lg rounded-lg">
            <HeaderBlock
              variant="project"
              title="PROJECT-BASED CONTRACT"
              subtitle={
                <span>
                  This Project-Based Contract (&quot;Agreement&quot;) is entered into on <input type="date" className="px-2 py-1 border border-gray-200 rounded text-xs" /> between:
                </span>
              }
            />
            <Divider />

            <Section icon={Handshake} title="Party Details" accent>
              <div className="space-y-2 text-xs text-gray-800">
                <div>
                  <span className="font-semibold">Party A (Client): </span>
                  <span className="italic text-gray-600">[Full Name / Company Name], [Address], [Email]</span>
                </div>
                <div>
                  <span className="font-semibold">Party B (Freelancer): </span>
                  <span className="italic text-gray-600">[Full Name / Business Name], [Address], [Email]</span>
                </div>
              </div>
            </Section>

            <Section icon={FileText} title="1. Project Description">
              <TextArea placeholder="[Insert detailed project summary, deliverables, and specifications.]" />
            </Section>

            <Section icon={DollarSign} title="2. Payment & Milestones" accent>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label>Total Project Fee</Label>
                  <Input placeholder="[Amount & Currency]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Milestone 1 Description</Label>
                    <Input placeholder="[Description]" />
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <Input placeholder="[Amount]" />
                  </div>
                  <div>
                    <Label>Due</Label>
                    <Input placeholder="[Date/Event]" />
                  </div>
                  <div>
                    <Label>Milestone 2 Description</Label>
                    <Input placeholder="[Description]" />
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <Input placeholder="[Amount]" />
                  </div>
                  <div>
                    <Label>Due</Label>
                    <Input placeholder="[Date/Event]" />
                  </div>
                </div>
                <div>
                  <Label>Payment Window</Label>
                  <Input placeholder="Payments will be made within [X days] of invoice." />
                </div>
              </div>
            </Section>

            <Section icon={Calendar} title="3. Project Schedule">
              <div className="text-xs text-gray-700">
                Work begins on <input type="date" className="px-2 py-1 border border-gray-200 rounded text-xs" /> and completes by <input type="date" className="px-2 py-1 border border-gray-200 rounded text-xs" />, subject to timely client feedback.
              </div>
            </Section>

            <Section icon={FileText} title="4. Ownership of Work" accent>
              <TextArea placeholder="Upon full payment, the Client shall own all rights to the deliverables. The Freelancer retains the right to showcase non-confidential work in their portfolio." rows={3} />
            </Section>

            <Section icon={Shield} title="5. Confidentiality">
              <TextArea placeholder="Any confidential information exchanged will be kept secure and not disclosed to third parties." rows={3} />
            </Section>

            <Section icon={Gavel} title="6. Termination">
              <Input placeholder="Either party may terminate with [X days] written notice. Work completed up to the date of termination will be invoiced accordingly." />
            </Section>

            <Section icon={Scale} title="7. Governing Law" accent>
              <Input placeholder="This Agreement shall be governed by the laws of [Jurisdiction]." />
            </Section>

            <Section icon={Signature} title="Signatures">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SignatureBlock role="Client" />
                <SignatureBlock role="Freelancer" />
              </div>
            </Section>
          </div>
        )
      case "nda":
        return (
          <div className="bg-white max-w-2xl mx-auto p-6 text-sm shadow-lg rounded-lg">
            <HeaderBlock
              variant="nda"
              title="NON-DISCLOSURE AGREEMENT (NDA)"
              subtitle={
                <span>
                  This NDA is entered into on <input type="date" className="px-2 py-1 border border-gray-200 rounded text-xs" /> between:
                </span>
              }
            />
            <Divider />

            <Section icon={Handshake} title="Party Details" accent>
              <div className="space-y-2 text-xs text-gray-800">
                <div>
                  <span className="font-semibold">Party A (Disclosing Party): </span>
                  <span className="italic text-gray-600">[Full Name / Company Name], [Address], [Email]</span>
                </div>
                <div>
                  <span className="font-semibold">Party B (Receiving Party): </span>
                  <span className="italic text-gray-600">[Full Name / Business Name], [Address], [Email]</span>
                </div>
              </div>
            </Section>

            <Section icon={Shield} title="1. Definition of Confidential Information">

              <TextArea placeholder={'&quot;Confidential Information&quot; includes all non-public data, trade secrets, materials, and project details shared between the parties.'} rows={3} />

            </Section>

            <Section icon={Shield} title="2. Obligations of Receiving Party" accent>
              <ul className="list-disc pl-5 text-xs text-gray-800 space-y-1">
                <li>Keep Confidential Information strictly confidential.</li>
                <li>Not disclose it to any third party without prior written consent.</li>
                <li>Use it solely for the purpose of fulfilling this Agreement.</li>
              </ul>
            </Section>

            <Section icon={FileText} title="3. Exclusions">
              <ul className="list-disc pl-5 text-xs text-gray-800 space-y-1">
                <li>Is publicly available without breach of this NDA.</li>
                <li>Was lawfully obtained from another source.</li>
                <li>Is independently developed without use of Confidential Information.</li>
              </ul>
            </Section>

            <Section icon={Clock} title="4. Term" accent>
              <Input placeholder="This NDA remains in effect for [X years] from the date of signing." />
            </Section>

            <Section icon={FileText} title="5. Return or Destruction of Materials">
              <Input placeholder="Upon request, the Receiving Party shall return or destroy all materials containing Confidential Information." />
            </Section>

            <Section icon={Scale} title="6. Governing Law" accent>
              <Input placeholder="This NDA shall be governed by the laws of [Jurisdiction]." />
            </Section>

            <Section icon={Signature} title="Signatures">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SignatureBlock role="Disclosing Party" />
                <SignatureBlock role="Receiving Party" />
              </div>
            </Section>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-0 sm:p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <div className="bg-white rounded-none sm:rounded-lg h-[100vh] sm:max-h-[90vh] overflow-y-auto w-full sm:max-w-3xl shadow-2xl border-0 sm:border-2 sm:border-gray-300">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{template.name} - Full Preview</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 sm:p-6">{renderFullPreview()}</div>
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm text-gray-600">Ready to use this template?</div>
            <a
              href={`/contract-editor?template=${template.id}`}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl active:scale-[0.99]"
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

export default function ContractsTemplatesPage() {
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
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Contract Templates</h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Choose from professional, ready-to-use contract templates crafted for freelancers and clients.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8">
          {contractTemplates.map((template) => (
            <TemplatePreview key={template.id} template={template} onPreview={handlePreview} />
          ))}
        </div>
      </div>

      <PreviewModal template={previewModal.template} isOpen={previewModal.isOpen} onClose={closePreview} />
    </div>
  )
}



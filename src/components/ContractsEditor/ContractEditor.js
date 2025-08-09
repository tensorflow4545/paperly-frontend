"use client"

import { useMemo, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Download,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Handshake,
  Calendar,
  DollarSign,
  FileText,
  Shield,
  Clock,
  Edit3,
  Gavel,
  Scale,
  FilePenLineIcon as Signature,
  Mail,
  MapPin,
  Building2,
  User,
  CreditCard,
} from "lucide-react"

const TEMPLATE_META = {
  "freelance-service-agreement": {
    title: "FREELANCE SERVICE AGREEMENT",
    accent: "bg-yellow-50",
  },
  "retainer-agreement": {
    title: "RETAINER AGREEMENT",
    accent: "bg-gray-50",
  },
  "project-based-contract": {
    title: "PROJECT-BASED CONTRACT",
    accent: "bg-blue-50",
  },
  "nda-freelancer": {
    title: "NON-DISCLOSURE AGREEMENT (NDA)",
    accent: "bg-slate-50",
  },
}

const Label = ({ children }) => <label className="block text-[11px] text-gray-600 mb-1">{children}</label>

const Input = ({ value, onChange, placeholder, type = "text" }) => {
  return (
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 italic focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  )
}

const TextArea = ({ value, onChange, placeholder, rows = 4 }) => {
  return (
    <textarea
      rows={rows}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 placeholder-gray-400 italic focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  )
}

const Section = ({ icon: Icon, title, children, accent = false }) => (
  <section className={`bg-white ${accent ? "border border-gray-200" : ""} rounded-lg p-4 mb-5 shadow-sm`}>
    <div className="flex items-center gap-2 mb-3">
      {Icon ? <Icon className="w-4 h-4 text-gray-700" /> : null}
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </section>
)

export default function ContractEditor({ templateId, onBack }) {
  const router = useRouter()
  const containerRef = useRef(null)
  const [zoom, setZoom] = useState(1)
  const [isDownloading, setIsDownloading] = useState(false)

  const meta = useMemo(() => TEMPLATE_META[templateId] || TEMPLATE_META["freelance-service-agreement"], [templateId])

  const [data, setData] = useState(() => ({
    date: "",
    parties: {
      aLabel: templateId === "nda-freelancer" ? "Disclosing Party" : "Client",
      bLabel: templateId === "nda-freelancer" ? "Receiving Party" : "Freelancer",
      a: { name: "", business: "", address: "", email: "" },
      b: { name: "", business: "", address: "", email: "" },
    },
    scope: "",
    payment: { total: "", method: "", schedule: "", late: "" },
    timeline: {
      start: "",
      end: "",
      milestones: [
        { desc: "", amount: "", due: "" },
        { desc: "", amount: "", due: "" },
        { desc: "", amount: "", due: "" },
        { desc: "", amount: "", due: "" },
      ],
    },
    revisions: { included: "", extraRate: "" },
    confidentiality: "",
    termination: { notice: "", details: "" },
    law: { jurisdiction: "" },
    signatures: { aName: "", aDate: "", bName: "", bDate: "" },
    retainer: { amount: "", period: "Month", due: "", additionalWork: "" },
    availability: { hours: "", response: "" },
    termRenewal: "",
  }))

  const updateField = useCallback((path, value) => {
    setData((prevData) => {
      const newData = { ...prevData }
      const keys = path.split(".")
      let current = newData

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (Array.isArray(current[key])) {
          current[key] = [...current[key]]
        } else if (current[key] && typeof current[key] === "object") {
          current[key] = { ...current[key] }
        }
        current = current[key]
      }

      current[keys[keys.length - 1]] = value
      return newData
    })
  }, [])

  const headerSubtitle = useMemo(() => {
    switch (templateId) {
      case "freelance-service-agreement":
        return 'This Freelance Service Agreement ("Agreement") is made on [Date] between:'
      case "retainer-agreement":
        return 'This Retainer Agreement ("Agreement") is made on [Date] between:'
      case "project-based-contract":
        return 'This Project-Based Contract ("Agreement") is entered into on [Date] between:'
      case "nda-freelancer":
        return "This NDA is entered into on [Date] between:"
      default:
        return ""
    }
  }, [templateId])

  // PDF download function
  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      // Dynamic imports
      const html2canvas = (await import("html2canvas")).default
      const jsPDFModule = await import("jspdf")
      const JsPDFConstructor = jsPDFModule.default || jsPDFModule.jsPDF

      if (!containerRef.current) {
        throw new Error("Container not found")
      }

      // Hide sticky header and other UI elements that shouldn't be in PDF
      const elementsToHide = document.querySelectorAll(".sticky, [data-hide-in-pdf]")
      const originalDisplays = []
      elementsToHide.forEach((el, index) => {
        originalDisplays[index] = el.style.display
        el.style.display = "none"
      })

      // Completely disable all external stylesheets to prevent oklch parsing
      const originalStylesheets = []
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const stylesheet = document.styleSheets[i]
          if (stylesheet.href || stylesheet.cssRules) {
            originalStylesheets.push(stylesheet)
            stylesheet.disabled = true
          }
        } catch (e) {
          // Ignore CORS errors
        }
      }

      // Create a clone of the container element
      const clonedElement = containerRef.current.cloneNode(true)
      clonedElement.style.position = 'absolute'
      clonedElement.style.left = '-9999px'
      clonedElement.style.top = '0'
      clonedElement.style.width = containerRef.current.offsetWidth + 'px'
      clonedElement.style.backgroundColor = '#ffffff'
      document.body.appendChild(clonedElement)

      // Preserve all input values in the cloned element
      const originalInputs = containerRef.current.querySelectorAll('input, textarea, select')
      const clonedInputs = clonedElement.querySelectorAll('input, textarea, select')
      
      originalInputs.forEach((originalInput, index) => {
        const clonedInput = clonedInputs[index]
        if (clonedInput) {
          // Copy the current value
          clonedInput.value = originalInput.value
          // Set the value as an attribute to ensure it's visible
          clonedInput.setAttribute('value', originalInput.value)
          
          // For different input types, ensure visibility
          if (originalInput.type === 'date' && originalInput.value) {
            clonedInput.setAttribute('value', originalInput.value)
          }
          if (originalInput.tagName === 'TEXTAREA') {
            clonedInput.textContent = originalInput.value
            clonedInput.innerHTML = originalInput.value
          }
          
          // Make the input values visible by setting them as text content if needed
          if (originalInput.value && originalInput.value.trim() !== '') {
            // Create a text representation for PDF
            const textSpan = document.createElement('span')
            textSpan.textContent = originalInput.value
            textSpan.style.cssText = `
              display: block !important;
              padding: 0.5rem 0.75rem !important;
              font-size: 0.75rem !important;
              color: rgb(17, 24, 39) !important;
              background-color: rgb(255, 255, 255) !important;
              border: 1px solid rgb(209, 213, 219) !important;
              border-radius: 0.375rem !important;
              min-height: 2rem !important;
              font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif !important;
              word-wrap: break-word !important;
              white-space: pre-wrap !important;
            `
            
            // Replace the input with the text span for PDF generation
            clonedInput.style.display = 'none'
            clonedInput.parentNode.insertBefore(textSpan, clonedInput.nextSibling)
          }
        }
      })

      // Create a comprehensive style override that preserves colors but fixes problematic functions
      const styleOverride = document.createElement('style')
      styleOverride.textContent = `
        * {
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif !important;
          box-sizing: border-box !important;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
          line-height: 1.6 !important;
          color: rgb(0, 0, 0) !important;
          background-color: rgb(255, 255, 255) !important;
        }
        .bg-white { background-color: rgb(255, 255, 255) !important; }
        .bg-yellow-50 { background-color: rgb(255, 251, 235) !important; }
        .bg-gray-50 { background-color: rgb(249, 250, 251) !important; }
        .bg-blue-50 { background-color: rgb(239, 246, 255) !important; }
        .bg-slate-50 { background-color: rgb(248, 250, 252) !important; }
        .text-gray-900 { color: rgb(17, 24, 39) !important; }
        .text-gray-800 { color: rgb(31, 41, 55) !important; }
        .text-gray-700 { color: rgb(55, 65, 81) !important; }
        .text-gray-600 { color: rgb(75, 85, 99) !important; }
        .text-gray-500 { color: rgb(107, 114, 128) !important; }
        .text-gray-400 { color: rgb(156, 163, 175) !important; }
        .text-blue-600 { color: rgb(37, 99, 235) !important; }
        .text-blue-700 { color: rgb(29, 78, 216) !important; }
        .text-green-800 { color: rgb(22, 101, 52) !important; }
        .border-gray-200 { border-color: rgb(229, 231, 235) !important; }
        .border-gray-300 { border-color: rgb(209, 213, 219) !important; }
        .border { border-width: 1px !important; border-style: solid !important; }
        .rounded-lg { border-radius: 0.5rem !important; }
        .rounded-md { border-radius: 0.375rem !important; }
        .rounded { border-radius: 0.25rem !important; }
        .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important; }
        .p-4 { padding: 1rem !important; }
        .p-3 { padding: 0.75rem !important; }
        .p-2 { padding: 0.5rem !important; }
        .px-3 { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
        .py-2 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
        .mb-5 { margin-bottom: 1.25rem !important; }
        .mb-4 { margin-bottom: 1rem !important; }
        .mb-3 { margin-bottom: 0.75rem !important; }
        .mb-2 { margin-bottom: 0.5rem !important; }
        .mb-1 { margin-bottom: 0.25rem !important; }
        .mt-1 { margin-top: 0.25rem !important; }
        .gap-2 { gap: 0.5rem !important; }
        .gap-3 { gap: 0.75rem !important; }
        .gap-4 { gap: 1rem !important; }
        .flex { display: flex !important; }
        .grid { display: grid !important; }
        .items-center { align-items: center !important; }
        .items-start { align-items: flex-start !important; }
        .justify-between { justify-content: space-between !important; }
        .text-center { text-align: center !important; }
        .text-right { text-align: right !important; }
        .text-xl { font-size: 1.25rem !important; }
        .text-2xl { font-size: 1.5rem !important; }
        .text-lg { font-size: 1.125rem !important; }
        .text-sm { font-size: 0.875rem !important; }
        .text-xs { font-size: 0.75rem !important; }
        .font-bold { font-weight: 700 !important; }
        .font-semibold { font-weight: 600 !important; }
        .font-medium { font-weight: 500 !important; }
        .w-full { width: 100% !important; }
        .w-4 { width: 1rem !important; }
        .h-4 { height: 1rem !important; }
        .w-3 { width: 0.75rem !important; }
        .h-3 { height: 0.75rem !important; }
        .w-3\\.5 { width: 0.875rem !important; }
        .h-3\\.5 { height: 0.875rem !important; }
        .block { display: block !important; }
        input, textarea, select {
          border: 1px solid rgb(209, 213, 219) !important;
          border-radius: 0.375rem !important;
          padding: 0.5rem 0.75rem !important;
          font-size: 0.75rem !important;
          color: rgb(17, 24, 39) !important;
          background-color: rgb(255, 255, 255) !important;
          font-style: normal !important;
          min-height: 2rem !important;
          box-sizing: border-box !important;
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif !important;
          line-height: 1.4 !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        input::placeholder, textarea::placeholder {
          color: rgb(156, 163, 175) !important;
        }
        /* Ensure input values are visible in PDF */
        input[value]:not([value=""]) {
          background-color: rgb(255, 255, 255) !important;
          color: rgb(17, 24, 39) !important;
        }
        textarea {
          white-space: pre-wrap !important;
          overflow: visible !important;
          resize: none !important;
        }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        .grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
        .col-span-2 { grid-column: span 2 / span 2 !important; }
        .col-span-5 { grid-column: span 5 / span 5 !important; }
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          .md\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
          .md\\:col-span-2 { grid-column: span 2 / span 2 !important; }
          .md\\:col-span-5 { grid-column: span 5 / span 5 !important; }
        }
        ul { list-style-type: disc !important; }
        .list-disc { list-style-type: disc !important; }
        .pl-5 { padding-left: 1.25rem !important; }
        .space-y-1 > * + * { margin-top: 0.25rem !important; }
      `
      document.head.appendChild(styleOverride)
      clonedElement.appendChild(styleOverride.cloneNode(true))

      // Aggressively remove any inline styles that might contain problematic color functions
      const removeProblematicStyles = (element) => {
        if (element.style && element.style.cssText) {
          element.style.cssText = element.style.cssText
            .replace(/oklab\([^)]+\)/g, 'rgb(0, 0, 0)')
            .replace(/oklch\([^)]+\)/g, 'rgb(0, 0, 0)')
            .replace(/hsl\([^)]+\)/g, 'rgb(128, 128, 128)')
            .replace(/hsla\([^)]+\)/g, 'rgba(128, 128, 128, 1)')
            .replace(/lab\([^)]+\)/g, 'rgb(0, 0, 0)')
            .replace(/lch\([^)]+\)/g, 'rgb(0, 0, 0)')
        }
        Array.from(element.children).forEach(removeProblematicStyles)
      }
      removeProblematicStyles(clonedElement)

      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100))

      // Wait for DOM to update with new text spans
      await new Promise(resolve => setTimeout(resolve, 200))

      // Create canvas
      const canvas = await html2canvas(clonedElement, {
        scale: 2, // Increase scale for better resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff", // Ensure a white background
        logging: false,
        removeContainer: true,
        width: clonedElement.offsetWidth,
        height: clonedElement.scrollHeight,
        ignoreElements: (element) => {
          // Ignore hidden input elements since we've replaced them with text spans
          return element.tagName === 'INPUT' && element.style.display === 'none'
        },
        onclone: (clonedDoc) => {
          // Ensure all styles are properly applied in the cloned document
          const clonedStyle = styleOverride.cloneNode(true)
          clonedDoc.head.appendChild(clonedStyle)
          
          // Copy input values to the cloned document inputs as well
          const originalInputsInClone = clonedElement.querySelectorAll('input, textarea, select')
          const clonedDocInputs = clonedDoc.querySelectorAll('input, textarea, select')
          
          originalInputsInClone.forEach((originalInput, index) => {
            const clonedDocInput = clonedDocInputs[index]
            if (clonedDocInput && originalInput.value) {
              clonedDocInput.value = originalInput.value
              clonedDocInput.setAttribute('value', originalInput.value)
              if (originalInput.tagName === 'TEXTAREA') {
                clonedDocInput.textContent = originalInput.value
                clonedDocInput.innerHTML = originalInput.value
              }
            }
          })
          
          // Also remove any problematic styles from the cloned document
          const removeStyles = (element) => {
            if (element.style && element.style.cssText) {
              element.style.cssText = element.style.cssText
                .replace(/oklab\([^)]+\)/g, 'rgb(0, 0, 0)')
                .replace(/oklch\([^)]+\)/g, 'rgb(0, 0, 0)')
                .replace(/hsl\([^)]+\)/g, 'rgb(128, 128, 128)')
                .replace(/hsla\([^)]+\)/g, 'rgba(128, 128, 128, 1)')
                .replace(/lab\([^)]+\)/g, 'rgb(0, 0, 0)')
                .replace(/lch\([^)]+\)/g, 'rgb(0, 0, 0)')
            }
            Array.from(element.children).forEach(removeStyles)
          }
          removeStyles(clonedDoc.body)
        }
      })

      // Clean up
      if (document.body.contains(clonedElement)) {
        document.body.removeChild(clonedElement)
      }
      if (document.head.contains(styleOverride)) {
        document.head.removeChild(styleOverride)
      }
      // Re-enable all disabled stylesheets
      originalStylesheets.forEach(stylesheet => {
        stylesheet.disabled = false
      })

      // Restore hidden elements
      elementsToHide.forEach((el, index) => {
        el.style.display = originalDisplays[index] || ""
      })

      // Create PDF
      const pdf = new JsPDFConstructor({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      const imgWidth = canvas.width
      const imgHeight = canvas.height

      const ratio = pdfWidth / imgWidth // Ratio to fit image width to PDF width
      const imgHeightScaled = imgHeight * ratio // Scaled height of the image

      const margin = 10 // 10mm margin on all sides
      const printableWidth = pdfWidth - 2 * margin
      const printableHeight = pdfHeight - 2 * margin

      let position = 0 // Current Y position on the original canvas

      // Calculate the number of pages needed
      const totalPages = Math.ceil(imgHeightScaled / printableHeight)

      for (let i = 0; i < totalPages; i++) {
        const canvasPage = document.createElement("canvas")
        const ctx = canvasPage.getContext("2d")

        // Calculate the height of the current segment to draw from the original canvas
        const segmentHeightPx = Math.min(printableHeight / ratio, imgHeight - position)

        canvasPage.width = imgWidth
        canvasPage.height = segmentHeightPx

        // Draw the segment from the original canvas onto the temporary canvas
        ctx.drawImage(canvas, 0, position, imgWidth, segmentHeightPx, 0, 0, imgWidth, segmentHeightPx)

        const pageImgData = canvasPage.toDataURL("image/png", 1.0)

        if (i > 0) {
          pdf.addPage()
        }
        // Add the image to the PDF with margins
        pdf.addImage(pageImgData, "PNG", margin, margin, printableWidth, segmentHeightPx * ratio)

        position += segmentHeightPx // Move to the next segment on the original canvas
      }

      // Save the PDF
      const fileName = `${meta.title.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
      pdf.save(fileName)

      console.log("PDF generated successfully!")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again or check your browser's console for details.")
    } finally {
      setIsDownloading(false)
    }
  }

  const Header = () => (
    <div className={`-m-4 sm:-m-6 -mb-2 p-4 sm:p-6 rounded-t-lg border-b border-gray-200 ${meta.accent}`}>
      <div className="text-center">
        <div className="text-xl sm:text-2xl font-bold text-gray-900">{meta.title}</div>
        <div className="text-gray-600 text-xs sm:text-sm mt-1">
          {headerSubtitle.replace("[Date]", "")}{" "}
          <input
            type="date"
            className="px-2 py-1 border border-gray-200 rounded text-xs bg-white"
            value={data.date}
            onChange={(e) => updateField("date", e.target.value)}
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
      <div
        className="flex items-center justify-between gap-2 mb-4 sticky top-[64px] z-30 bg-white/90 backdrop-blur border-b border-gray-200 px-2 py-2 rounded-md"
        data-hide-in-pdf
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.99]"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="text-sm sm:text-base font-semibold text-gray-900 truncate">{meta.title}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(0.9, z - 0.1))}
            className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-gray-700" />
          </button>
          <div className="text-xs text-gray-600 w-10 text-center">{Math.round(zoom * 100)}%</div>
          <button
            onClick={() => setZoom((z) => Math.min(1.3, z + 0.1))}
            className="p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 active:scale-[0.99] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Download PDF"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="bg-white border border-gray-200 rounded-lg overflow-hidden"
        style={zoom !== 1 ? { transform: `scale(${zoom})`, transformOrigin: "top left" } : undefined}
      >
        <Header />
        <div className="p-4 sm:p-6">
          {/* Party Details Section */}
          <Section icon={Handshake} title="Party Details" accent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-700" />
                  <div className="text-xs font-medium text-gray-900">Party A ({data.parties.aLabel})</div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <Label>Full Legal Name</Label>
                    <Input
                      value={data.parties.a.name}
                      onChange={(value) => updateField("parties.a.name", value)}
                      placeholder={`Enter ${data.parties.aLabel} Name`}
                    />
                  </div>
                  <div>
                    <Label>Business Name (optional)</Label>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-gray-500" />
                      <Input
                        value={data.parties.a.business}
                        onChange={(value) => updateField("parties.a.business", value)}
                        placeholder="Enter Business Name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Address</Label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      <Input
                        value={data.parties.a.address}
                        onChange={(value) => updateField("parties.a.address", value)}
                        placeholder="Enter Address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-500" />
                      <Input
                        value={data.parties.a.email}
                        onChange={(value) => updateField("parties.a.email", value)}
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Handshake className="w-4 h-4 text-gray-700" />
                  <div className="text-xs font-medium text-gray-900">Party B ({data.parties.bLabel})</div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <Label>Full Legal Name</Label>
                    <Input
                      value={data.parties.b.name}
                      onChange={(value) => updateField("parties.b.name", value)}
                      placeholder={`Enter ${data.parties.bLabel} Name`}
                    />
                  </div>
                  <div>
                    <Label>Business Name (optional)</Label>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-gray-500" />
                      <Input
                        value={data.parties.b.business}
                        onChange={(value) => updateField("parties.b.business", value)}
                        placeholder="Enter Business Name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Address</Label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      <Input
                        value={data.parties.b.address}
                        onChange={(value) => updateField("parties.b.address", value)}
                        placeholder="Enter Address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-500" />
                      <Input
                        value={data.parties.b.email}
                        onChange={(value) => updateField("parties.b.email", value)}
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {templateId === "freelance-service-agreement" && (
            <>
              <Section icon={FileText} title="1. Scope of Work">
                <TextArea
                  value={data.scope}
                  onChange={(value) => updateField("scope", value)}
                  placeholder="Insert detailed description of services, deliverables, and specifications."
                />
              </Section>
              <Section icon={DollarSign} title="2. Payment Terms" accent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <div className="md:col-span-2">
                    <Label>Total Fee</Label>
                    <Input
                      value={data.payment.total}
                      onChange={(value) => updateField("payment.total", value)}
                      placeholder="Amount & Currency"
                    />
                  </div>
                  <div>
                    <Label>Method</Label>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                      <Input
                        value={data.payment.method}
                        onChange={(value) => updateField("payment.method", value)}
                        placeholder="Bank / UPI / PayPal"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Payment Schedule</Label>
                    <Input
                      value={data.payment.schedule}
                      onChange={(value) => updateField("payment.schedule", value)}
                      placeholder="e.g., 50% upfront, 50% on delivery"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <Label>Late Payment</Label>
                    <Input
                      value={data.payment.late}
                      onChange={(value) => updateField("payment.late", value)}
                      placeholder="Interest at X% per month on overdue"
                    />
                  </div>
                </div>
              </Section>
              <Section icon={Calendar} title="3. Timeline">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={data.timeline.start}
                      onChange={(value) => updateField("timeline.start", value)}
                    />
                  </div>
                  <div>
                    <Label>Final Delivery</Label>
                    <Input
                      type="date"
                      value={data.timeline.end}
                      onChange={(value) => updateField("timeline.end", value)}
                    />
                  </div>
                </div>
              </Section>
              <Section icon={Edit3} title="4. Revisions">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Included Rounds</Label>
                    <Input
                      value={data.revisions.included}
                      onChange={(value) => updateField("revisions.included", value)}
                      placeholder="e.g., Up to 2 rounds"
                    />
                  </div>
                  <div>
                    <Label>Additional Revision Rate</Label>
                    <Input
                      value={data.revisions.extraRate}
                      onChange={(value) => updateField("revisions.extraRate", value)}
                      placeholder="e.g., $50/hour"
                    />
                  </div>
                </div>
              </Section>
            </>
          )}

          {templateId === "retainer-agreement" && (
            <>
              <Section icon={FileText} title="1. Services Covered">
                <TextArea
                  value={data.scope}
                  onChange={(value) => updateField("scope", value)}
                  placeholder="List services or tasks to be performed regularly."
                />
              </Section>
              <Section icon={DollarSign} title="2. Retainer Fee & Payment" accent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Retainer Amount</Label>
                    <Input
                      value={data.retainer.amount}
                      onChange={(value) => updateField("retainer.amount", value)}
                      placeholder="Amount & Currency"
                    />
                  </div>
                  <div>
                    <Label>Payment Due</Label>
                    <Input
                      value={data.retainer.due}
                      onChange={(value) => updateField("retainer.due", value)}
                      placeholder="On the Xth each month/week"
                    />
                  </div>
                  <div>
                    <Label>Additional Work</Label>
                    <Input
                      value={data.retainer.additionalWork}
                      onChange={(value) => updateField("retainer.additionalWork", value)}
                      placeholder="Billed separately"
                    />
                  </div>
                </div>
              </Section>
              <Section icon={Clock} title="3. Availability & Response Time">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Availability</Label>
                    <Input
                      value={data.availability.hours}
                      onChange={(value) => updateField("availability.hours", value)}
                      placeholder="Up to X hours per week/month"
                    />
                  </div>
                  <div>
                    <Label>Response Time</Label>
                    <Input
                      value={data.availability.response}
                      onChange={(value) => updateField("availability.response", value)}
                      placeholder="Max response time X hours/days"
                    />
                  </div>
                </div>
              </Section>
              <Section icon={Calendar} title="4. Term & Renewal" accent>
                <Input
                  value={data.termRenewal}
                  onChange={(value) => updateField("termRenewal", value)}
                  placeholder="In effect for X months, auto-renews unless X days notice."
                />
              </Section>
            </>
          )}

          {templateId === "project-based-contract" && (
            <>
              <Section icon={FileText} title="1. Project Description">
                <TextArea
                  value={data.scope}
                  onChange={(value) => updateField("scope", value)}
                  placeholder="Insert detailed project summary, deliverables, and specifications."
                />
              </Section>
              <Section icon={DollarSign} title="2. Payment & Milestones" accent>
                <div className="mb-3">
                  <Label>Total Project Fee</Label>
                  <Input
                    value={data.payment.total}
                    onChange={(value) => updateField("payment.total", value)}
                    placeholder="Amount & Currency"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {data.timeline.milestones.map((m, i) => (
                    <div key={`ms-${i}`} className="contents">
                      <div>
                        <Label>{`Milestone ${i + 1} Description`}</Label>
                        <Input
                          value={m.desc}
                          onChange={(value) => updateField(`timeline.milestones.${i}.desc`, value)}
                          placeholder="[Description]"
                        />
                      </div>
                      <div>
                        <Label>Amount</Label>
                        <Input
                          value={m.amount}
                          onChange={(value) => updateField(`timeline.milestones.${i}.amount`, value)}
                          placeholder="[Amount]"
                        />
                      </div>
                      <div>
                        <Label>Due</Label>
                        <Input
                          value={m.due}
                          onChange={(value) => updateField(`timeline.milestones.${i}.due`, value)}
                          placeholder="[Date/Event]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
              <Section icon={Calendar} title="3. Project Schedule">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={data.timeline.start}
                      onChange={(value) => updateField("timeline.start", value)}
                    />
                  </div>
                  <div>
                    <Label>Final Delivery</Label>
                    <Input
                      type="date"
                      value={data.timeline.end}
                      onChange={(value) => updateField("timeline.end", value)}
                    />
                  </div>
                  <div>
                    <Label>Milestone Count</Label>
                    <Input
                      type="number"
                      value={String(data.timeline.milestones.length)}
                      onChange={(v) => {
                        const n = Math.max(1, Math.min(5, Number(v))) || 1
                        setData((prev) => ({
                          ...prev,
                          timeline: {
                            ...prev.timeline,
                            milestones: Array.from(
                              { length: n },
                              (_, i) => prev.timeline.milestones[i] || { desc: "", amount: "", due: "" },
                            ),
                          },
                        }))
                      }}
                    />
                  </div>
                </div>
              </Section>
            </>
          )}

          {templateId === "nda-freelancer" && (
            <>
              <Section icon={Shield} title="1. Definition of Confidential Information">
                <TextArea
                  value={data.confidentiality}
                  onChange={(value) => updateField("confidentiality", value)}
                  placeholder={
                    '"Confidential Information" includes all non-public data, trade secrets, materials, and project details shared between the parties.'
                  }
                />
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
                <Input
                  value={data.termination.notice}
                  onChange={(value) => updateField("termination.notice", value)}
                  placeholder="This NDA remains in effect for X years from signing."
                />
              </Section>
            </>
          )}

          {templateId !== "nda-freelancer" && (
            <>
              <Section icon={Shield} title="Confidentiality" accent>
                <TextArea
                  value={data.confidentiality}
                  onChange={(value) => updateField("confidentiality", value)}
                  placeholder="Confidential information shared during the project remains protected."
                  rows={3}
                />
              </Section>
              <Section icon={Edit3} title="Revisions & Changes">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Included Rounds</Label>
                    <Input
                      value={data.revisions.included}
                      onChange={(value) => updateField("revisions.included", value)}
                      placeholder="e.g., Up to 2 rounds"
                    />
                  </div>
                  <div>
                    <Label>Out-of-Scope Rate</Label>
                    <Input
                      value={data.revisions.extraRate}
                      onChange={(value) => updateField("revisions.extraRate", value)}
                      placeholder="e.g., $50/hour"
                    />
                  </div>
                </div>
              </Section>
            </>
          )}

          <Section icon={Gavel} title="Termination">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Notice Period</Label>
                <Input
                  value={data.termination.notice}
                  onChange={(value) => updateField("termination.notice", value)}
                  placeholder="e.g., 7 days written notice"
                />
              </div>
              <div>
                <Label>Termination Details</Label>
                <Input
                  value={data.termination.details}
                  onChange={(value) => updateField("termination.details", value)}
                  placeholder="e.g., termination for breach or convenience"
                />
              </div>
            </div>
          </Section>

          <Section icon={Scale} title="Governing Law" accent>
            <Input
              value={data.law.jurisdiction}
              onChange={(value) => updateField("law.jurisdiction", value)}
              placeholder="e.g., California, USA"
            />
          </Section>

          <Section icon={Signature} title="Signatures">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <div className="text-xs font-medium text-gray-900 mb-2">{data.parties.aLabel}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div className="md:col-span-2">
                    <Label>Typed Signature</Label>
                    <Input
                      value={data.signatures.aName}
                      onChange={(value) => updateField("signatures.aName", value)}
                      placeholder="Type name as signature"
                    />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={data.signatures.aDate}
                      onChange={(value) => updateField("signatures.aDate", value)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <div className="text-xs font-medium text-gray-900 mb-2">{data.parties.bLabel}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div className="md:col-span-2">
                    <Label>Typed Signature</Label>
                    <Input
                      value={data.signatures.bName}
                      onChange={(value) => updateField("signatures.b.name", value)}
                      placeholder="Type name as signature"
                    />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={data.signatures.bDate}
                      onChange={(value) => updateField("signatures.bDate", value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/LandingPage/Navbar"
import Footer from "@/components/LandingPage/Footer"
import ESignEditor from "@/components/ESignEditor/ESignEditor"
import Head from "next/head"

function ESignEditorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [pdfFile, setPdfFile] = useState(null)

  useEffect(() => {
    // Check if we have PDF data in sessionStorage
    const storedPdfData = sessionStorage.getItem('esign-pdf-data')
    const storedPdfName = sessionStorage.getItem('esign-pdf-name')
    
    if (storedPdfData && storedPdfName) {
      // Convert base64 back to File object
      fetch(storedPdfData)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], storedPdfName, { type: 'application/pdf' })
          setPdfFile(file)
        })
        .catch(error => {
          console.error('Error reconstructing PDF file:', error)
          router.push('/e-sign')
        })
    } else {
      // No PDF data found, redirect back to e-sign page
      router.push('/e-sign')
    }
  }, [router])

  if (!pdfFile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-4">Loading PDF editor...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>PDF Editor | Paprly e-Sign</title>
        <meta name="description" content="Edit and sign your PDF document with professional e-signature tools" />
      </Head>

      <Navbar />
      
      {/* Editor Header */}
      <div className="w-full bg-gray-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/e-sign')} 
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-all duration-200 text-sm"
            >
              ← Back to e-Sign
            </button>
            <div className="text-white">
              <h1 className="text-lg font-semibold">PDF Editor</h1>
              <p className="text-gray-300 text-sm">{pdfFile.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Editor */}
      <div className="bg-gray-50 min-h-screen">
        <ESignEditor initialFile={pdfFile} />
      </div>

      <Footer />
    </>
  )
}

export default function ESignEditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-4">Loading PDF editor...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto"></div>
        </div>
      </div>
    }>
      <ESignEditorContent />
    </Suspense>
  )
}

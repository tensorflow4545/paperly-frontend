"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import Navbar from "@/components/LandingPage/Navbar"
import Footer from "@/components/LandingPage/Footer"
import ContractEditor from "@/components/ContractsEditor/ContractEditor"
import Head from "next/head"

function ContractEditorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const template = searchParams.get("template") || "freelance-service-agreement"

  return (
    <>
      <Head>
        <title>Contract Editor | Paprly</title>
        <meta name="description" content="Powerful, mobile-first contract editor. Edit and download professional agreements fast." />
        <link rel="canonical" href={`https://paprly.in/contract-editor?template=${template}`} />
      </Head>

      <Navbar />

      <div className="min-h-[calc(100vh-200px)] bg-gray-50">
        <ContractEditor templateId={template} onBack={() => router.back()} />
      </div>

      <Footer />
    </>
  )
}

export default function ContractEditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contract editor...</p>
        </div>
      </div>
    }>
      <ContractEditorContent />
    </Suspense>
  )
}



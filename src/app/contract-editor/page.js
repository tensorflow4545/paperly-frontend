"use client"
import { useSearchParams, useRouter } from "next/navigation"
import Navbar from "@/components/LandingPage/Navbar"
import Footer from "@/components/LandingPage/Footer"
import ContractEditor from "@/components/ContractsEditor/ContractEditor"
import Head from "next/head"

export default function ContractEditorPage() {
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



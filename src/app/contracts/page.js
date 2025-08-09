"use client"
import Navbar from "@/components/LandingPage/Navbar"
import Footer from "@/components/LandingPage/Footer"
import ContractsTemplatesPage from "@/components/ContractsPage/Templates"
import Head from "next/head"

export default function ContractsPage() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Contract Templates | Paprly</title>
        <meta
          name="description"
          content="Download professional freelance contract templates: service agreements, retainers, project-based contracts, and NDAs. Clean, sleek, ready to use."
        />
        <link rel="canonical" href="https://paprly.in/contracts" />
      </Head>

      <div className="w-full min-h-[220px] md:min-h-[260px] bg-[#FEFCE8] items-center justify-center flex px-4">
        <div className="flex flex-col gap-3 items-center text-center max-w-3xl py-10">
          <h1 className="font-medium text-[26px] md:text-4xl tracking-tight text-gray-900 leading-tight">
            Professional Contract Templates
          </h1>
          <p className="text-gray-700 text-[13px] md:text-lg leading-relaxed">
            Clean, legally solid and ready-to-use contracts for freelancers. Preview any template, then start instantly.
          </p>
        </div>
      </div>

      <ContractsTemplatesPage />
      <Footer />
    </>
  )
}



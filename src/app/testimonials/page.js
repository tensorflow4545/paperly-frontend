"use client"

import Head from "next/head"
import Navbar from "@/components/LandingPage/Navbar"
import Footer from "@/components/LandingPage/Footer"
import TestimonialsDisplay from "@/components/TestimonialsPage/TestimonialsDisplay"

export default function TestimonialsPage() {
  return (
    <>
      <Head>
        <title>Testimonials | Paprly</title>
        <meta
          name="description"
          content="Read what our users say about Paprly. Real feedback from freelancers, businesses, and professionals using our invoice templates and tools."
        />
        <link rel="canonical" href="https://paprly.in/testimonials" />
      </Head>

      <Navbar />
      
      {/* Hero Section */}
      <div className="w-full min-h-[280px] bg-[#FEFCE8] items-center justify-center flex px-4">
        <div className="flex flex-col gap-4 items-center text-center max-w-4xl py-12">
          <h1 className="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight">
            What Our Users Say
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
            Real feedback from freelancers, businesses, and professionals who trust Paprly 
            for their invoicing needs. See how we&apos;re making a difference in their workflow.
          </p>
        </div>
      </div>

      <TestimonialsDisplay />
      <Footer />
    </>
  )
}

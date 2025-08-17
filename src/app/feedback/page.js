"use client"

import Navbar from "@/components/LandingPage/Navbar"
import Footer from "@/components/LandingPage/Footer"
import FeedbackForm from "@/components/FeedbackPage/FeedbackForm"
import PageSEO from "@/components/SEO/PageSEO"

export default function FeedbackPage() {
  return (
    <>
      <PageSEO pageName="feedback" />

      <Navbar />
      
      {/* Hero Section */}
      <div className="w-full min-h-[280px] bg-[#FEFCE8] items-center justify-center flex px-4">
        <div className="flex flex-col gap-4 items-center text-center max-w-4xl py-12">
          <h1 className="font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 leading-tight">
            Share Your Feedback
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
            Help us make Paprly better! Your suggestions and feedback drive our innovation. 
            Tell us what you&apos;d like to see, what works well, and what we can improve.
          </p>
        </div>
      </div>

      <FeedbackForm />
      <Footer />
    </>
  )
}

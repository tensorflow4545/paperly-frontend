import EnterpriseNavbar from "@/components/enterprise-components/enterprise-navbar";
import React from 'react'
import { Button } from "@/components/ui/button";
import { Lora, Open_Sans, Merriweather } from "next/font/google";
import Image from "next/image";
import Footer from "@/components/enterprise-components/enterprise-footer";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const EnterpriseHome = () => {
  return (
    <div>
      <EnterpriseNavbar />  

      <main className=" px-4 sm:px-6 lg:px-16 py-32  bg-[rgba(178,146,0,0.31)]">
        <div className="max-w-7xl mx-auto w-full ">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-10">
              <h1 className={`${lora.className} text-white text-[30px] sm:text-[48px] leading-[48px] font-bold`}>
               ALL YOUR STARTUP DOCS & PAYMENTS IN ONE PLACE
              </h1>
              <div className="border-b-4 border-yellow-600 w-32 mt-2"></div>

              <p className="text-white text-lg lg:text-xl leading-relaxed opacity-100">
                Send contracts, collect signatures, track payments, and manage freelancers —  simple, ad-free, and built for solo founders & small teams
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="px-8 py-3 text-white font-semibold rounded-md bg-yellow-600 hover:bg-yellow-700"
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 bg-white text-gray-800 border-white hover:bg-gray-50 font-semibold rounded-md"
                >
                  Learn More
                </Button>
              </div>
            </div>
            {/* Right Content - Image Only */}
            <div className="flex justify-end items-center w-full h-[28rem] lg:h-[32rem]">
              <div className="relative w-full h-full">
                <Image
                  src="/selection1.png"
                  alt="Dashboard"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 2nd section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <h2 className={`${lora.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-600 text-center mb-16 `}>
            KEY BENEFITS OF PAPRLY ENTERPRISE
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="border border-gray-100 bg-white p-6 rounded-md shadow-sm  text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image
                    src="/securityicon1.png"
                    alt="Seamless Integration Icon"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover text-yellow-100"
                  />
                </div>
              </div>
              <h3 className={`${lora.className} text-xl font-bold text-gray-800`}>
                Signed & Stored
              </h3>
              <p className={`${lora.className} text-gray-600 text-sm leading-relaxed`}>
                Create all needed on-boarding documents in few clicks send get signed in minutes.
              </p>
            </div>
            <div className="border border-gray-100 bg-white p-6 text-center rounded-md shadow-sm space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Image
                    src="/tickicon1.png"
                    alt="Enhanced Security Icon"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover text-yellow-600"
                  />
                </div>
              </div>
              <h3 className={`${lora.className} text-xl font-bold text-gray-800`}>
                Payments & Receipts
              </h3>
              <p className={`${lora.className} text-gray-600 text-sm leading-relaxed`}>
                Pay your employees or freelancers, track receipts easily.
              </p>
            </div>
            <div className="border border-gray-100 bg-white p-6 text-center shadow-sm rounded-md space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Image
                    src="/scaleicon1.png"
                    alt="Scalable Performance Icon"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover text-yellow-600"
                  />
                </div>
              </div>
              <h3 className={`${lora.className} text-xl font-bold text-gray-800`}>
                Small Reminders
              </h3>
              <p className={`${lora.className} text-gray-600 text-sm leading-relaxed`}>
               Never miss renewals or deadlines. Renew contract, revise documents all safe all aaaat one place.
              </p>
            </div>
            <div className="border border-gray-100 bg-white p-6 text-center shadow-sm rounded-md space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Image
                    src="/atomicon1.png"
                    alt="Intelligent Automation Icon"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover text-yellow-600"
                  />
                </div>
              </div>
              <h3 className={`${lora.className} text-xl font-bold text-gray-800`}>
                AI Support, Ad-Free.
              </h3>
              <p className={`${lora.className} text-gray-600 text-sm leading-relaxed`}>
                Always available, no distractions. Fully automated with AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features That Empower Your Team section */}
      <section className="bg-white py-16 lg:py-24 w-full">
        <div className="container mx-auto px-6">
          <h2 className={`${merriweather.className} text-xl sm:text-2xl lg:text-4xl font-extrabold text-yellow-600 text-center mb-16`}>
            FEATURES THAT EMPOWER YOUR TEAM
          </h2>
        </div>
        <div className="px-0 sm:px-6">
          <div className="space-y-20 border-2 border-white rounded-xl p-6 sm:p-12 md:p-16 bg-transparent mx-0 sm:mx-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center shadow-sm border border-gray-200 p-6 sm:p-8 rounded-lg w-full mx-0">
             <div className="sm:space-y-6 w-full">
  <h3 className={`${merriweather.className} text-lg sm:text-xl lg:text-3xl font-bold text-gray-800`}>
    1. One Place for Docs & Deals
  </h3>
  <div className="border-b-4 border-yellow-600 w-16 mt-2"></div>
  <p className={`${openSans.className} text-sm sm:text-base text-gray-600 leading-relaxed`}>
    Paprly Enterprise Suite brings all your agreements, contracts, and receipts into one clear dashboard. Forget scattered files — manage everything in real time and keep your work organized.
  </p>
</div>
              <div className="flex justify-center">
                <Image
                  src="/collaborate1.png"
                  alt="Unified Workspace Collaboration"
                  width={400}
                  height={256}
                  className="rounded-lg w-full max-w-sm sm:max-w-md lg:max-w-none"
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center shadow-sm border border-gray-200 p-6 sm:p-8 rounded-lg w-full mx-0">
              <div className="flex justify-center lg:order-first">
                <Image
                  src="/screen.png"
                  alt="Advanced Analytics Dashboard"
                  width={400}
                  height={256}
                  className="rounded-lg w-full max-w-sm sm:max-w-md lg:max-w-none"
                />
              </div>
             <div className="space-y-6">
  <h3 className={`${merriweather.className} text-lg sm:text-xl lg:text-3xl font-bold text-gray-800`}>
    2. Clear Insights & Tracking
  </h3>
  <div className="border-b-4 border-yellow-600 w-16 mt-2"></div>
  <p className={`${openSans.className} text-sm sm:text-base text-gray-600 leading-relaxed`}>
    Know what’s signed, what’s pending, and what’s due — instantly. Paprly keeps you updated with simple reports and reminders, so you stay in control without messy spreadsheets.
  </p>
</div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center shadow-sm border border-gray-200 p-6 sm:p-8 rounded-lg w-full mx-0">
              <div className="space-y-6">
  <h3 className={`${merriweather.className} text-lg sm:text-xl lg:text-3xl font-bold text-gray-800`}>
    3. Automation That Saves Time
  </h3>
  <div className="border-b-4 border-yellow-600 w-16 mt-2"></div>
  <p className={`${openSans.className} text-sm sm:text-base text-gray-600 leading-relaxed`}>
    Send agreements, collect signatures, and generate receipts automatically. Paprly handles the repetitive stuff, so you can focus on building your business, not chasing paperwork.
  </p>
</div>
              <div className="flex justify-center">
                <Image
                  src="/network.png"
                  alt="Automated Workflows"
                  width={400}
                  height={256}
                  className="rounded-lg w-full max-w-sm sm:max-w-md lg:max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-12 lg:py-20 mb-16">
        <div className="container mx-auto px-6 ">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-600 text-center mb-12"
            style={{ fontFamily: "Lora, serif" }}
          >
            WHAT OUR CLIENTS SAY
          </h2>
          <div className="sm:max-w-6xl sm:mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "Lora, serif" }}>
                  &quot;Paprly transformed our operational efficiency. The seamless integration and powerful analytics
                  capabilities have significantly boosted our productivity and decision-making speed. It&amp;apos;s an
                  indispensable tool for our enterprise.&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src="/sarah.png"
                    alt="Sarah Chen"
                    width={48}
                    height={48}
                    className="rounded-full mr-4 aspect-square object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      Sarah Chen
                    </h4>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      CEO, InnovatX Corp.
                    </p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "Lora, serif" }}>
                  &quot;The level of security and scalability offered by Paprly is truly remarkable. We can confidently grow
                  our business knowing our data is protected and our systems will always perform optimally.&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src="/michael.png"
                    alt="Michael Lee"
                    width={48}
                    height={48}
                    className="rounded-full mr-4 aspect-square object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      Michael Lee
                    </h4>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      CTO, GlobalTech Solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Testimonial 3 - Centered */}
            <div className="flex justify-center">
              <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl">
                <p className="text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "Lora, serif" }}>
                  &quot;Intelligent automation has never been this accessible. Paprly allowed us to streamline complex
                  workflows, reducing errors and freeing up our team to focus on innovation. Highly recommend!&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src="/jessica.png"
                    alt="Jessica Adams"
                    width={48}
                    height={48}
                    className="rounded-full mr-4 aspect-square object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      Jessica Adams
                    </h4>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      COO, Nexium Dynamics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-600 text-center mb-10"
            style={{ fontFamily: "Lora, serif" }}
          >
            TRUSTED BY INDUSTRY LEADERS
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
            <Image
              src="/logo1.png"
              alt="Company Logo 1"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <Image
              src="/logo2.png"
              alt="Company Logo 2"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <Image
              src="/logo3.png"
              alt="Company Logo 3"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <Image
              src="/logo4.png"
              alt="Company Logo 4"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <Image
              src="/logo5.png"
              alt="Company Logo 5"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <Image
              src="/logo6.png"
              alt="Company Logo 6"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-600 text-center mb-12"
            style={{ fontFamily: "Lora, serif" }}
          >
            FLEXIBLE PLANS FOR EVERY ENTERPRISE
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Lora, serif" }}>
                Solo & Small Team Plan
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                   ₹ 399
                </span>
                <span className="text-gray-600" style={{ fontFamily: "Lora, serif" }}>
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  <span><strong>Quick Hire:</strong>Create & send On-boarding docs</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  <span><strong>Doc Tracking::</strong>Track all signed documents</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  <span><strong>AI Doc Builder:</strong> Auto-generate all on-boarding documents instantly</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  <span><strong>100% Ad Free</strong></span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  <span><strong>Payments & Invoices:</strong> Pay, Send, track, and manage in one place</span>
                </li>
              </ul>
              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded transition-colors duration-300"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Get Started
              </Button>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Lora, serif" }}>
                Professional Plan
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                  Coming Soon
                </span>
              </div>
              <ul className="space-y-3 mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  Coming Soon
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  Coming Soon
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  Coming Soon
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  Coming Soon
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  Coming Soon
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  Coming Soon
                </li>
              </ul>
              <Button
                className=" w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded transition-colors duration-300"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Get Started
              </Button>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Lora, serif" }}>
                Company Pro Plan
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                  Coming Soon
                </span>
                <br />
              </div>
              <ul className="space-y-3 mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                   Coming Soon
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  Coming Soon
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  Coming Soon
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                   Coming Soon
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                 Coming Soon
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-3 mt-1">✓</span>
                  Coming Soon
                </li>
              </ul>
              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded transition-colors duration-300"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-[#f6f5fb] py-12 lg:py-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-100 rounded-full opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-100 rounded-full opacity-40 translate-x-1/3 translate-y-1/3"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[#b58900] mb-6 ${lora.className}`}
          >
            READY TO TRANSFORM YOUR BUSINESS WITH PAPRLY?
          </h2>
          <Button
            size="lg"
            className="px-8 py-3 text-white font-semibold rounded-md bg-[#b58900] hover:bg-[#996c00] transition-colors"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            Schedule a Demo
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default EnterpriseHome
import EnterpriseNavbar from "@/components/enterprise-components/enterprise-navbar";
import React from 'react'
import { Button } from "@/components/ui/button";
import { Lora, Open_Sans, Merriweather } from "next/font/google";
import Image from "next/image";
import Footer from "@/components/enterprise-components/enterprise-footer";
import Link from "next/link";

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

             <main className=" px-4 sm:px-6 lg:px-16 py-16 lg:py-32  bg-[rgba(178,146,0,0.31)]">
        <div className="w-full mx-auto max-w-7xl ">
                     <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-10">
              <h1 className={`${lora.className} text-white text-[30px] sm:text-[48px] leading-[48px] font-bold`}>
               ALL YOUR STARTUP DOCS & PAYMENTS IN ONE PLACE
              </h1>
              <div className="w-32 border-b-4 border-yellow-600 sm:mt-2"></div>

              <p className="text-lg leading-relaxed text-white opacity-100 lg:text-xl">
                Send contracts, collect signatures, track payments, and manage freelancers —  simple, ad-free, and built for solo founders & small teams
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="px-8 py-3 font-semibold text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                >
                  Get Started Free
                </Button>
                <Link href = "www.paprly.in">
                <Button
                 
                  size="lg"
                  className="px-8 py-3 font-semibold text-gray-800 bg-white border-white rounded-md hover:bg-gray-50"
                >
                  Paprly Studio
                </Button>
                </Link>
              </div>
            </div>
                         {/* Right Content - Image Only */}
                           <div className="hidden lg:flex justify-end items-center w-full h-[24rem]">
               <div className="relative w-full h-full overflow-hidden border-2 rounded-3xl border-white/20">
                 <Image
                   src="/selection1.png"
                   alt="Dashboard"
                   fill
                   sizes="(max-width: 1024px) 100vw, 50vw"
                   className="object-cover rounded-3xl"
                   priority
                 />
               </div>
             </div>
          </div>
        </div>
      </main>

      {/* 2nd section */}
      <section className="py-16 bg-gray-50 lg:py-24 md:px-20" id = "benefits">
        <div className="container px-6 mx-auto">
          <h2 className={`${lora.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-600 text-center mb-16 `}>
            KEY BENEFITS OF PAPRLY ENTERPRISE
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <div className="p-6 space-y-4 text-center bg-white border border-gray-100 rounded-md shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                  <Image
                    src="/securityicon1.png"
                    alt="Seamless Integration Icon"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full text-yellow-100 rounded-full"
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
            <div className="p-6 space-y-4 text-center bg-white border border-gray-100 rounded-md shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full">
                  <Image
                    src="/tickicon1.png"
                    alt="Enhanced Security Icon"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full text-yellow-600 bg-transparent rounded-full"
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
            <div className="p-6 space-y-4 text-center bg-white border border-gray-100 rounded-md shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full">
                  <Image
                    src="/scaleicon1.png"
                    alt="Scalable Performance Icon"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full text-yellow-600 rounded-full"
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
            <div className="p-6 space-y-4 text-center bg-white border border-gray-100 rounded-md shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full">
                  <Image
                    src="/atomicon1.png"
                    alt="Intelligent Automation Icon"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full text-yellow-600 rounded-full"
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
      <section className="py-16 bg-white lg:py-24 sm:px-20" id = "features">
        <div className="container px-6 mx-auto">
          <h2 className={`${merriweather.className} text-xl sm:text-2xl lg:text-4xl font-extrabold text-yellow-600 text-center mb-16`}>
            FEATURES THAT EMPOWER YOUR TEAM
          </h2>
        </div>
        <div className="container px-6 mx-auto">
          <div className="space-y-20">
            <div className="grid items-center gap-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm lg:grid-cols-2 lg:gap-12 sm:p-8 lg:p-12">
             <div className="space-y-6">
  <h3 className={`${merriweather.className} text-lg sm:text-xl lg:text-3xl font-bold text-gray-800`}>
    1. One Place for Docs & Deals
  </h3>
  <div className="w-16 mt-2 border-b-4 border-yellow-600"></div>
  <p className={`${openSans.className} text-sm sm:text-base text-gray-600 leading-relaxed`}>
    Paprly Enterprise Suite brings all your agreements, contracts, and receipts into one clear dashboard. Forget scattered files — manage everything in real time and keep your work organized.
  </p>
</div>
              <div className="flex justify-center">
                <Image
                  src="/collaborate1.png"
                  alt="Unified Workspace Collaboration"
                  width={300}
                  height={220}
                  className="rounded-lg w-full max-w-sm sm:max-w-md lg:w-[300px] lg:h-[220px] object-contain"
                />
              </div>
            </div>
            <div className="grid items-center gap-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm lg:grid-cols-2 lg:gap-12 sm:p-8 lg:p-12">
              <div className="flex justify-center lg:order-first">
                <Image
                  src="/screen.png"
                  alt="Advanced Analytics Dashboard"
                  width={300}
                  height={220}
                  className="rounded-lg w-full max-w-sm sm:max-w-md lg:w-[300px] lg:h-[220px] object-contain"
                />
              </div>
             <div className="space-y-6">
  <h3 className={`${merriweather.className} text-lg sm:text-xl lg:text-3xl font-bold text-gray-800`}>
    2. Clear Insights & Tracking
  </h3>
  <div className="w-16 mt-2 border-b-4 border-yellow-600"></div>
  <p className={`${openSans.className} text-sm sm:text-base text-gray-600 leading-relaxed`}>
    Know what’s signed, what’s pending, and what’s due — instantly. Paprly keeps you updated with simple reports and reminders, so you stay in control without messy spreadsheets.
  </p>
</div>
            </div>
            <div className="grid items-center gap-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm lg:grid-cols-2 lg:gap-12 sm:p-8 lg:p-12">
              <div className="space-y-6">
  <h3 className={`${merriweather.className} text-lg sm:text-xl lg:text-3xl font-bold text-gray-800`}>
    3. Automation That Saves Time
  </h3>
  <div className="w-16 mt-2 border-b-4 border-yellow-600"></div>
  <p className={`${openSans.className} text-sm sm:text-base text-gray-600 leading-relaxed`}>
    Send agreements, collect signatures, and generate receipts automatically. Paprly handles the repetitive stuff, so you can focus on building your business, not chasing paperwork.
  </p>
</div>
              <div className="flex justify-center">
                <Image
                  src="/network.png"
                  alt="Automated Workflows"
                  width={300}
                  height={220}
                  className="rounded-lg w-full max-w-sm sm:max-w-md lg:w-[300px] lg:h-[220px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section
      <section className="py-12 mb-16 bg-gray-50 lg:py-20">
        <div className="container px-6 mx-auto ">
          <h2
            className="mb-12 text-2xl font-bold text-center text-yellow-600 sm:text-3xl lg:text-4xl"
            style={{ fontFamily: "Lora, serif" }}
          >
            WHAT OUR CLIENTS SAY
          </h2>
          <div className="w-full sm:max-w-6xl sm:mx-auto">
            <div className="grid gap-8 mb-8 md:grid-cols-2">
              {/* Testimonial 1 */}
              {/* <div className="p-8 bg-white rounded-lg shadow-sm">
                <p className="mb-6 leading-relaxed text-gray-700" style={{ fontFamily: "Lora, serif" }}>
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
                    className="object-cover mr-4 rounded-full aspect-square"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      Sarah Chen
                    </h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      CEO, InnovatX Corp.
                    </p>
                  </div>
                </div>
              </div> */}
              {/* Testimonial 2 */}
              {/* <div className="p-8 bg-white rounded-lg shadow-sm">
                <p className="mb-6 leading-relaxed text-gray-700" style={{ fontFamily: "Lora, serif" }}>
                  &quot;The level of security and scalability offered by Paprly is truly remarkable. We can confidently grow
                  our business knowing our data is protected and our systems will always perform optimally.&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src="/michael.png"
                    alt="Michael Lee"
                    width={48}
                    height={48}
                    className="object-cover mr-4 rounded-full aspect-square"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      Michael Lee
                    </h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      CTO, GlobalTech Solutions
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Testimonial 3 - Centered */}
            {/* <div className="flex justify-center">
              <div className="max-w-2xl p-8 bg-white rounded-lg shadow-sm">
                <p className="mb-6 leading-relaxed text-gray-700" style={{ fontFamily: "Lora, serif" }}>
                  &quot;Intelligent automation has never been this accessible. Paprly allowed us to streamline complex
                  workflows, reducing errors and freeing up our team to focus on innovation. Highly recommend!&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src="/jessica.png"
                    alt="Jessica Adams"
                    width={48}
                    height={48}
                    className="object-cover mr-4 rounded-full aspect-square"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      Jessica Adams
                    </h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Open Sans, sans-serif" }}>
                      COO, Nexium Dynamics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      {/* </section>  */}

      {/* Trusted By Section */}
      {/* <section className="py-12 bg-white">
        <div className="container px-6 mx-auto">
          <h2
            className="mb-10 text-2xl font-bold text-center text-yellow-600 sm:text-3xl lg:text-4xl"
            style={{ fontFamily: "Lora, serif" }}
          >
            TRUSTED BY INDUSTRY LEADERS
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-60">
            <Image
              src="/logo1.png"
              alt="Company Logo 1"
              width={120}
              height={60}
              className="transition-all duration-300 grayscale hover:grayscale-0"
            />
            <Image
              src="/logo2.png"
              alt="Company Logo 2"
              width={120}
              height={60}
              className="transition-all duration-300 grayscale hover:grayscale-0"
            />
            <Image
              src="/logo3.png"
              alt="Company Logo 3"
              width={120}
              height={60}
              className="transition-all duration-300 grayscale hover:grayscale-0"
            />
            <Image
              src="/logo4.png"
              alt="Company Logo 4"
              width={120}
              height={60}
              className="transition-all duration-300 grayscale hover:grayscale-0"
            />
            <Image
              src="/logo5.png"
              alt="Company Logo 5"
              width={120}
              height={60}
              className="transition-all duration-300 grayscale hover:grayscale-0"
            />
            <Image
              src="/logo6.png"
              alt="Company Logo 6"
              width={120}
              height={60}
              className="transition-all duration-300 grayscale hover:grayscale-0"
            />
          </div>
        </div>
      </section> */}

      {/* Pricing Section */}
      <section className="py-12 bg-gray-50 lg:py-20" id = "pricing">
        <div className="px-4 mx-auto max-w-7xl sm:px-0">
          <h2
            className="mb-12 text-2xl font-bold text-center text-yellow-600 sm:text-3xl lg:text-4xl"
            style={{ fontFamily: "Lora, serif" }}
          >
            FLEXIBLE PLANS FOR EVERY ENTERPRISE
          </h2>
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            <div className="p-8 rounded-lg shadow-sm bg-yellow-50">
              <h3 className="mb-2 text-2xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
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
              <ul className="mb-8 space-y-3" style={{ fontFamily: "Open Sans, sans-serif" }}>
                                 <li className="flex items-start text-gray-700">
                   <div className="w-5 h-5 mt-1 mr-3">
                     <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </div>
                   <span><strong>Quick Hire:</strong>Create & send On-boarding docs</span>
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="w-5 h-5 mt-1 mr-3">
                     <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </div>
                   <span><strong>Doc Tracking::</strong>Track all signed documents</span>
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="w-5 h-5 mt-1 mr-3">
                     <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </div>
                   <span><strong>AI Doc Builder:</strong> Auto-generate all on-boarding documents instantly</span>
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="w-5 h-5 mt-1 mr-3">
                     <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </div>
                   <span><strong>100% Ad Free</strong></span>
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="w-5 h-5 mt-1 mr-3">
                     <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </div>
                   <span><strong>Payments & Invoices:</strong> Pay, Send, track, and manage in one place</span>
                 </li>
              </ul>
              <Button
                className="w-full py-3 font-semibold text-gray-900 transition-colors duration-300 bg-yellow-400 rounded hover:bg-yellow-500"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Get Started
              </Button>
            </div>
            <div className="p-8 rounded-lg shadow-sm bg-blue-50">
              <h3 className="mb-2 text-2xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                Professional Plan
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                  Coming Soon
                </span>
              </div>
              <ul className="mb-8 space-y-3" style={{ fontFamily: "Open Sans, sans-serif" }}>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                   Coming Soon
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                   Coming Soon
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                   Coming Soon
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                   Coming Soon
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                   Coming Soon
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                   Coming Soon
                 </li>
               </ul>
              <Button
                className="w-full py-3 font-semibold text-gray-900 transition-colors duration-300 bg-yellow-400 rounded sm:mt-15 hover:bg-yellow-500"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Get Started
              </Button>
            </div>
            <div className="p-8 rounded-lg shadow-sm bg-purple-50">
              <h3 className="mb-2 text-2xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                Company Pro Plan
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                  Coming Soon
                </span>
                <br />
              </div>
              <ul className="mb-8 space-y-3" style={{ fontFamily: "Open Sans, sans-serif" }}>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                    Coming Soon
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                   Coming Soon
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                   Coming Soon
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                    Coming Soon
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                  Coming Soon
                 </li>
                 <li className="flex items-start text-gray-700">
                   <div className="flex items-center justify-center w-5 h-5 mt-1 mr-3">
                     <span className="text-xl font-bold text-yellow-500">✓</span>
                   </div>
                   Coming Soon
                 </li>
               </ul>
              <Button
                className="w-full py-3 font-semibold text-gray-900 transition-colors duration-300 bg-yellow-400 rounded sm:mt-15 hover:bg-yellow-500"
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
        <div className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-yellow-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-100 rounded-full opacity-40 translate-x-1/3 translate-y-1/3"></div>
        <div className="container relative z-10 px-6 mx-auto text-center">
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
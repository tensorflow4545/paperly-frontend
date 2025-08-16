import EnterpriseNavbar from "@/components/enterprise-components/enterprise-navbar";
import React from 'react'
import { Button } from "@/components/ui/button";
import { Lora, Open_Sans, Merriweather } from "next/font/google";
import Image from "next/image";
import Footer from "@/components/enterprise-components/enterprise-footer";

// Import selection.png from public folder (use as /Selection.png in src prop)

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

     <main className="min-h-screen bg-[rgba(178,146,0,0.31)]">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className={`${lora.className} text-white text-[48px] leading-[48px] font-bold`}>
              REVOLUTIONIZE YOUR ENTERPRISE OPERATIONS
            </h1>

            <p className="text-white text-lg lg:text-xl leading-relaxed opacity-90">
              Footy Enterprise Suite is the integrated platform designed to elevate productivity, streamline workflows,
              and execute your business at scale.
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
          <div className="flex justify-end items-center w-full h-80 lg:h-96">
            <div className="relative w-full h-full">
              <Image
                src="/Selection.png"
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
    {/* Section Title */}
    <h2
      className={`${lora.className} text-3xl lg:text-4xl font-bold text-yellow-600 text-center mb-16`}
    >
      KEY BENEFITS OF PAPRLY ENTERPRISE
    </h2>

    {/* Benefits Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      
      {/* Seamless Integration */}
      <div className="border border-gray-100 bg-white p-6 rounded-md text-center space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Image
              src="/securityicon.png"
              alt="Seamless Integration Icon"
              width={32}
              height={32}
              className="text-blue-600"
            />
          </div>
        </div>
        <h3 className={`${lora.className} text-xl font-bold text-gray-800`}>
          Seamless Integration
        </h3>
        <p className={`${lora.className} text-gray-600 text-sm leading-relaxed`}>
          Connect Paprly with your existing tools effortlessly for a unified workflow.
        </p>
      </div>

      {/* Enhanced Security */}
      <div className="border border-gray-100 bg-white p-6  text-center rounded-md space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Image
              src="/tickicon.png"
              alt="Enhanced Security Icon"
              width={32}
              height={32}
              className="text-yellow-600"
            />
          </div>
        </div>
        <h3 className={`${lora.className} text-xl font-bold text-gray-800`}>
          Enhanced Security
        </h3>
        <p className={`${lora.className} text-gray-600 text-sm leading-relaxed`}>
          Protect your sensitive data with enterprise-grade encryption and compliance features.
        </p>
      </div>

      {/* Scalable Performance */}
      <div className="border border-gray-100 bg-white p-6  text-center rounded-md space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Image
              src="/scaleicon.png"
              alt="Scalable Performance Icon"
              width={32}
              height={32}
              className="text-yellow-600"
            />
          </div>
        </div>
        <h3 className={`${lora.className} text-xl font-bold text-gray-800`}>
          Scalable Performance
        </h3>
        <p className={`${lora.className} text-gray-600 text-sm leading-relaxed`}>
          Paprly scales with your business growth, ensuring consistent speed and reliability.
        </p>
      </div>

      {/* Intelligent Automation */}
      <div className="border border-gray-100 bg-white p-6  text-center rounded-md space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Image
              src="/atomicon.png"
              alt="Intelligent Automation Icon"
              width={32}
              height={32}
              className="text-yellow-600"
            />
          </div>
        </div>
        <h3 className={`${lora.className} text-xl font-bold text-gray-800`}>
          Intelligent Automation
        </h3>
        <p className={`${lora.className} text-gray-600 text-sm leading-relaxed`}>
          Automate complex tasks and workflows to boost productivity and reduce manual errors.
        </p>
      </div>

    </div>
  </div>
</section>



{/* Features That Empower Your Team section */}
      {/* Features Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <h2 className={`${merriweather.className} text-3xl lg:text-4xl font-extrabold text-yellow-600 text-center mb-16 `}>
            FEATURES THAT EMPOWER YOUR TEAM
          </h2>

          <div className="space-y-20 border-2 border-white rounded-xl p-12 md:p-16 bg-transparent">
            {/* Feature 1: Unified Workspace for Collaboration */}
            <div className="grid lg:grid-cols-2 gap-12 items-center shadow-sm border border-gray-200 p-8 rounded-lg">
              <div className="space-y-6">
                <h3 className={`${merriweather.className} text-2xl lg:text-3xl font-bold text-gray-800`}>Unified Workspace for Collaboration</h3>
                <p className={`${openSans.className} text-gray-600 leading-relaxed`}>
                  Paprly Enterprise Suite brings all your projects, teams, and communication into a single, intuitive
                  platform. Say goodbye to scattered information and embrace real-time collaboration that drives
                  results. Our unified dashboard provides a holistic view of your operations, enabling seamless teamwork
                  and faster decision-making across departments.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/collaborate.png"
                  alt="Unified Workspace Collaboration"
                  width={400}
                  height={256}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Feature 2: Advanced Analytics & Reporting */}
            <div className="grid lg:grid-cols-2 gap-12 items-center shadow-sm border border-gray-200 p-8 rounded-lg">
              <div className="flex justify-center lg:order-first">
                <Image
                  src="/screen.png"
                  alt="Advanced Analytics Dashboard"
                  width={400}
                  height={256}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-6">
                <h3  className={`${merriweather.className} text-2xl lg:text-3xl font-bold text-gray-800`}>Advanced Analytics & Reporting</h3>
                <p   className={`${openSans.className} text-gray-600 leading-relaxed`}>
                  Unlock deep insights from your data with Paprly's powerful analytics engine. Visualize key metrics,
                  identify trends, and generate comprehensive reports with ease. Our AI-driven dashboards provide
                  actionable intelligence, empowering your leadership to make informed strategic decisions and optimize
                  business performance across all levels of your organization.
                </p>
              </div>
            </div>

            {/* Feature 3: Automated Workflows & Streamlined Processes */}
            <div className="grid lg:grid-cols-2 gap-12 items-center shadow-sm border border-gray-200 p-8 rounded-lg">
              <div className="space-y-6">
                <h3 className={`${merriweather.className} text-2xl lg:text-3xl font-bold text-gray-800`}>
                  Automated Workflows & Streamlined Processes
                </h3>
                <p className={`${openSans.className} text-gray-600 leading-relaxed`}>
                  Transform your operational efficiency with Paprly's intelligent workflow automation. Design, deploy,
                  and manage complex business processes with minimal effort, eliminating manual bottlenecks and ensuring
                  consistent execution. From onboarding new employees to processing customer requests, our automation
                  engine initiatives while routine tasks are handled automatically.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/network.png"
                  alt="Automated Workflows"
                  width={400}
                  height={256}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>



 {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <h2
            className="text-3xl lg:text-4xl font-bold text-yellow-600 text-center mb-16"
            style={{ fontFamily: "Lora, serif" }}
          >
            WHAT OUR CLIENTS SAY
          </h2>

          {/* Testimonials Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "Lora, serif" }}>
                  "Paprly transformed our operational efficiency. The seamless integration and powerful analytics
                  capabilities have significantly boosted our productivity and decision-making speed. It's an
                  indispensable tool for our enterprise."
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
                  "The level of security and scalability offered by Paprly is truly remarkable. We can confidently grow
                  our business knowing our data is protected and our systems will always perform optimally."
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
                  "Intelligent automation has never been this accessible. Paprly allowed us to streamline complex
                  workflows, reducing errors and freeing up our team to focus on innovation. Highly recommend!"
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
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <h2
            className="text-3xl lg:text-4xl font-bold text-yellow-600 text-center mb-12"
            style={{ fontFamily: "Lora, serif" }}
          >
            TRUSTED BY INDUSTRY LEADERS
          </h2>

          {/* Company Logos */}
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
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <h2
            className="text-3xl lg:text-4xl font-bold text-yellow-600 text-center mb-16"
            style={{ fontFamily: "Lora, serif" }}
          >
            FLEXIBLE PLANS FOR EVERY ENTERPRISE
          </h2>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Standard Plan */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Lora, serif" }}>
                Standard Plan
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                  $299
                </span>
                <span className="text-gray-600" style={{ fontFamily: "Lora, serif" }}>
                  /month
                </span>
              </div>

              <ul className="space-y-3 mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Core Collaboration Tools
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Basic Analytics Dashboard
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Standard Security Protocols
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  50 User Licenses
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Standard Support (Email)
                </li>
              </ul>

              <Button
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Get Started
              </Button>
            </div>

            {/* Professional Plan */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Lora, serif" }}>
                Professional Plan
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                  $799
                </span>
                <span className="text-gray-600" style={{ fontFamily: "Lora, serif" }}>
                  /month
                </span>
              </div>

              <ul className="space-y-3 mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Advanced Collaboration Suite
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Customizable Analytics Dashboards
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Enhanced Security & Compliance
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  200 User Licenses
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Priority Support (24/7)
                </li>
              </ul>

              <Button
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Get Started
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Lora, serif" }}>
                Enterprise Plan
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                  Custom
                </span>
                <br />
                <span className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Lora, serif" }}>
                  Pricing
                </span>
              </div>

              <ul className="space-y-3 mb-8" style={{ fontFamily: "Open Sans, sans-serif" }}>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Full Enterprise Suite Access
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Advanced AI-Driven Insights
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Dedicated Security & Audits
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Unlimited User Licenses
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Premium On-Site Support
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  Custom Integrations
                </li>
              </ul>

              <Button
                className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-semibold py-3"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* Call to Action Section */}
      <section className="relative bg-[#f6f5fb] py-16 lg:py-20 overflow-hidden">
  {/* Decorative circles */}
  <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-100 rounded-full opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
  <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-100 rounded-full opacity-40 translate-x-1/3 translate-y-1/3"></div>

  <div className="container mx-auto px-6 text-center relative z-10">
    <h2
      className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[#b58900] mb-8 ${lora.className}`}
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
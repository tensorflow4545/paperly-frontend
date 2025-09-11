"use client";

import EnterpriseNavbar from "@/components/enterprise-components/enterprise-navbar";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Lora, Open_Sans, Merriweather } from "next/font/google";
import Image from "next/image";
import Footer from "@/components/enterprise-components/enterprise-footer";
import Link from "next/link";
import { getAuthToken, getUserData } from "@/utils/auth";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    const userData = getUserData();
    setIsLoggedIn(!!(token && userData));
  }, []);

  return (
    <div>
      <EnterpriseNavbar />

      <main className="relative px-4 sm:px-6 lg:px-16 py-20 lg:py-40 overflow-hidden">
        {/* Modern gradient background with subtle patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#b58900] via-[#d4af37] to-[#f4d03f] opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/20"></div>

        {/* Subtle geometric patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#e1edff]/20 to-[#fbf3fb]/15 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tl from-[#fbf3fb]/20 to-[#e1edff]/15 rounded-full translate-y-40 -translate-x-40"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-[#e1edff]/15 to-[#fbf3fb]/10 rounded-full -translate-x-32 -translate-y-32"></div>

        <div className="relative z-10 w-full mx-auto max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-12 sm:w-[130%]">
              <div className="space-y-6">
                <h1
                  className={`${merriweather.className} text-white text-[32px] sm:text-[52px]  leading-[1.1] font-bold tracking-tight`}
                >
                  Simplify Startup Onboarding — Docs, Compliance & Payments
                  Together.
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
              </div>

              <p className="text-lg leading-relaxed text-white/95 lg:text-xl max-w-lg">
                Send contracts, collect signatures, track payments, and manage
                freelancers — simple, ad-free, and built for solo founders &
                small teams
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Link href={isLoggedIn ? "/home" : "/signup"}>
                  <Button
                    size="lg"
                    className="px-10 py-4 font-semibold text-white bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl hover:from-yellow-700 hover:to-yellow-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoggedIn ? "My Workprobe" : "Get Started Free"}
                  </Button>
                </Link>
                <Link href="www.paprly.in">
                  <Button
                    size="lg"
                    className="px-10 py-4 font-semibold text-gray-800 bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Paprly Studio
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Enhanced Image Container */}
            <div className="hidden lg:flex justify-end items-center w-full sm:w-[90%] h-[28rem] ml-0 sm:ml-22">
              <div className="relative w-full h-full group">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

                {/* Main image container */}
                <div className="relative w-full h-full overflow-hidden border border-white/30 rounded-3xl shadow-2xl backdrop-blur-sm bg-white/10">
                  <Image
                    src="/selection1.png"
                    alt="Dashboard"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
                    priority
                  />

                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 2nd section */}
      <section
        className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 lg:py-32 overflow-hidden"
        id="benefits"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#e1edff]/30 to-[#fbf3fb]/25 rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#fbf3fb]/25 to-[#e1edff]/20 rounded-full translate-x-48 translate-y-48"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-[#e1edff]/20 to-[#fbf3fb]/15 rounded-full -translate-x-32 -translate-y-32"></div>

        <div className="relative z-10 container px-6 mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2
              className={`${merriweather.className}  text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6`}
            >
              KEY BENEFITS OF PAPRLY ENTERPRISE
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="group p-8 space-y-6 text-center bg-gradient-to-br from-white/90 via-[#e1edff]/5 to-[#fbf3fb]/5 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:via-[#e1edff]/10 hover:to-[#fbf3fb]/10">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e1edff]/30 to-[#fbf3fb]/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#e1edff]/20 to-[#fbf3fb]/15 rounded-full shadow-sm">
                    <Image
                      src="/securityicon1.png"
                      alt="Seamless Integration Icon"
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10 bg-transparent rounded-full p-0"
                    />
                  </div>
                </div>
              </div>
              <h3
                className={`${lora.className} text-2xl font-bold text-gray-900 group-hover:text-[#4a90e2] transition-colors duration-300`}
              >
                Signed & Stored
              </h3>
              <p
                className={`${openSans.className} text-gray-600 leading-relaxed`}
              >
                Create all needed on-boarding documents in few clicks send get
                signed in minutes.
              </p>
            </div>

            <div className="group p-8 space-y-6 text-center bg-gradient-to-br from-white/90 via-[#e1edff]/5 to-[#fbf3fb]/5 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:via-[#e1edff]/10 hover:to-[#fbf3fb]/10">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fbf3fb]/30 to-[#e1edff]/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#fbf3fb]/20 to-[#e1edff]/15 rounded-full shadow-sm">
                    <Image
                      src="/tickicon1.png"
                      alt="Enhanced Security Icon"
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10 rounded-full p-0"
                    />
                  </div>
                </div>
              </div>
              <h3
                className={`${lora.className} text-2xl font-bold text-gray-900 group-hover:text-[#e91e63] transition-colors duration-300`}
              >
                Payments & Receipts
              </h3>
              <p
                className={`${openSans.className} text-gray-600 leading-relaxed`}
              >
                Pay your employees or freelancers, track receipts easily.
              </p>
            </div>

            <div className="group p-8 space-y-6 text-center bg-gradient-to-br from-white/90 via-[#e1edff]/5 to-[#fbf3fb]/5 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:via-[#e1edff]/10 hover:to-[#fbf3fb]/10">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e1edff]/30 to-[#fbf3fb]/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#e1edff]/20 to-[#fbf3fb]/15 rounded-full shadow-sm">
                    <Image
                      src="/scaleicon1.png"
                      alt="Scalable Performance Icon"
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10 rounded-full p-0"
                    />
                  </div>
                </div>
              </div>
              <h3
                className={`${lora.className} text-2xl font-bold text-gray-900 group-hover:text-[#4caf50] transition-colors duration-300`}
              >
                Smart Reminders
              </h3>
              <p
                className={`${openSans.className} text-gray-600 leading-relaxed`}
              >
                Never miss renewals or deadlines. Renew contract, revise
                documents all safe all at one place.
              </p>
            </div>

            <div className="group p-8 space-y-6 text-center bg-gradient-to-br from-white/90 via-[#e1edff]/5 to-[#fbf3fb]/5 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:via-[#e1edff]/10 hover:to-[#fbf3fb]/10">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fbf3fb]/30 to-[#e1edff]/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#fbf3fb]/20 to-[#e1edff]/15 rounded-full shadow-sm">
                    <Image
                      src="/atomicon1.png"
                      alt="Intelligent Automation Icon"
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10 rounded-full p-0"
                    />
                  </div>
                </div>
              </div>
              <h3
                className={`${lora.className} text-2xl font-bold text-gray-900 group-hover:text-[#9c27b0] transition-colors duration-300`}
              >
                AI Support, Ad-Free
              </h3>
              <p
                className={`${openSans.className} text-gray-600 leading-relaxed`}
              >
                Always available, no distractions. Fully automated with AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features That Empower Your Team section */}
      <section
        className="relative py-20 bg-gradient-to-b from-white to-gray-50 lg:py-32 overflow-hidden"
        id="features"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#e1edff]/25 to-[#fbf3fb]/20 rounded-full -translate-y-40 translate-x-40"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tl from-[#fbf3fb]/25 to-[#e1edff]/20 rounded-full translate-y-32 -translate-x-32"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-[#e1edff]/20 to-[#fbf3fb]/15 rounded-full -translate-x-24 -translate-y-24"></div>

        <div className="relative z-10 container px-6 mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2
              className={`${merriweather.className} text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6`}
            >
              FEATURES THAT EMPOWER YOUR TEAM
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto"></div>
          </div>

          <div className="space-y-24">
            <div className="group grid items-center gap-12 p-8 bg-gradient-to-br from-white/90 via-[#e1edff]/5 to-[#fbf3fb]/5 backdrop-blur-sm border border-white/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:via-[#e1edff]/10 hover:to-[#fbf3fb]/10 lg:grid-cols-2 lg:gap-16 lg:p-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3
                    className={`${merriweather.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900`}
                  >
                    One Place for Docs & Deals
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-[#e1edff] to-[#fbf3fb] rounded-full"></div>
                </div>
                <p
                  className={`${openSans.className} text-lg text-gray-600 leading-relaxed`}
                >
                  Paprly Enterprise Suite brings all your agreements, contracts,
                  and receipts into one clear dashboard. Forget scattered files
                  — manage everything in real time and keep your work organized.
                </p>
              </div>
              <div className="flex justify-center group-hover:scale-105 transition-transform duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e1edff]/20 to-[#fbf3fb]/15 rounded-2xl blur-lg"></div>
                  <Image
                    src="/collaborate1.png"
                    alt="Unified Workspace Collaboration"
                    width={400}
                    height={300}
                    className="relative rounded-2xl w-full max-w-sm sm:max-w-md lg:w-[400px] lg:h-[300px] object-contain shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="group grid items-center gap-12 p-8 bg-gradient-to-br from-white/90 via-[#e1edff]/5 to-[#fbf3fb]/5 backdrop-blur-sm border border-white/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:via-[#e1edff]/10 hover:to-[#fbf3fb]/10 lg:grid-cols-2 lg:gap-16 lg:p-12">
              <div className="flex justify-center lg:order-first group-hover:scale-105 transition-transform duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fbf3fb]/20 to-[#e1edff]/15 rounded-2xl blur-lg"></div>
                  <Image
                    src="/screen.png"
                    alt="Advanced Analytics Dashboard"
                    width={400}
                    height={300}
                    className="relative rounded-2xl w-full max-w-sm sm:max-w-md lg:w-[400px] lg:h-[300px] object-contain shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3
                    className={`${merriweather.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900`}
                  >
                    Clear Insights & Tracking
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-[#fbf3fb] to-[#e1edff] rounded-full"></div>
                </div>
                <p
                  className={`${openSans.className} text-lg text-gray-600 leading-relaxed`}
                >
                  Know what's signed, what's pending, and what's due —
                  instantly. Paprly keeps you updated with simple reports and
                  reminders, so you stay in control without messy spreadsheets.
                </p>
              </div>
            </div>

            <div className="group grid items-center gap-12 p-8 bg-gradient-to-br from-white/90 via-[#e1edff]/5 to-[#fbf3fb]/5 backdrop-blur-sm border border-white/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:via-[#e1edff]/10 hover:to-[#fbf3fb]/10 lg:grid-cols-2 lg:gap-16 lg:p-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3
                    className={`${merriweather.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900`}
                  >
                    Automation That Saves Time
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-[#e1edff] to-[#fbf3fb] rounded-full"></div>
                </div>
                <p
                  className={`${openSans.className} text-lg text-gray-600 leading-relaxed`}
                >
                  Send agreements, collect signatures, and generate receipts
                  automatically. Paprly handles the repetitive stuff, so you can
                  focus on building your business, not chasing paperwork.
                </p>
              </div>
              <div className="flex justify-center group-hover:scale-105 transition-transform duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e1edff]/20 to-[#fbf3fb]/15 rounded-2xl blur-lg"></div>
                  <Image
                    src="/network.png"
                    alt="Automated Workflows"
                    width={400}
                    height={300}
                    className="relative rounded-2xl w-full max-w-sm sm:max-w-md lg:w-[400px] lg:h-[300px] object-contain shadow-sm"
                  />
                </div>
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
      <section
        className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 lg:py-32 overflow-hidden"
        id="pricing"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#e1edff]/25 to-[#fbf3fb]/20 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#fbf3fb]/25 to-[#e1edff]/20 rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-r from-[#e1edff]/20 to-[#fbf3fb]/15 rounded-full -translate-x-28 -translate-y-28"></div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-0">
          <div className="text-center mb-20">
            <h2
              className={`${merriweather.className}  text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6`}
            >
              FLEXIBLE PLANS FOR EVERY ENTERPRISE
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-8">
            {/* Solo & Small Team Plan - Featured */}
            <div className="group relative p-8 rounded-3xl shadow-xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute -top-2 -right-2 w-28 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">POPULAR</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3
                    className={`${lora.className} text-2xl font-bold text-gray-900 mb-2`}
                  >
                    Solo & Small Team Plan
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span
                      className={`${lora.className} text-5xl font-bold text-gray-900`}
                    >
                      ₹ 399
                    </span>
                    <span
                      className={`${openSans.className} text-gray-600 text-lg`}
                    >
                      /month
                    </span>
                  </div>
                </div>

                <ul className={`${openSans.className} space-y-4`}>
                  <li className="flex items-start text-gray-700">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>
                      <strong>Quick Hire:</strong> Create & send On-boarding
                      docs
                    </span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>
                      <strong>Doc Tracking:</strong> Track all signed documents
                    </span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>
                      <strong>AI Doc Builder:</strong> Auto-generate all
                      on-boarding documents instantly
                    </span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>
                      <strong>100% Ad Free</strong>
                    </span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>
                      <strong>Payments & Invoices:</strong> Pay, Send, track,
                      and manage in one place
                    </span>
                  </li>
                </ul>

                <Button className="w-full py-4 font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl hover:from-yellow-600 hover:to-yellow-700 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="group p-8 rounded-3xl shadow-sm bg-gradient-to-br from-white/90 via-[#e1edff]/5 to-[#fbf3fb]/5 backdrop-blur-sm border border-gray-200 hover:border-[#e1edff]/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:via-[#e1edff]/10 hover:to-[#fbf3fb]/10">
              <div className="space-y-6">
                <div>
                  <h3
                    className={`${lora.className} text-2xl font-bold text-gray-900 mb-2`}
                  >
                    Professional Plan
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span
                      className={`${lora.className} text-4xl font-bold text-gray-500`}
                    >
                      Coming Soon
                    </span>
                  </div>
                </div>

                <ul className={`${openSans.className} space-y-4`}>
                  <li className="flex items-start text-gray-500">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                    </div>
                    <span>Advanced Features</span>
                  </li>
                  <li className="flex items-start text-gray-500">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                    </div>
                    <span>Team Collaboration</span>
                  </li>
                  <li className="flex items-start text-gray-500">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                    </div>
                    <span>Priority Support</span>
                  </li>
                  <li className="flex items-start text-gray-500">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                    </div>
                    <span>Custom Integrations</span>
                  </li>
                  <li className="flex items-start text-gray-500">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                    </div>
                    <span>Advanced Analytics</span>
                  </li>
                </ul>

                <Button
                  className="w-full py-4 font-semibold text-gray-500 bg-gray-200 rounded-xl cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </Button>
              </div>
            </div>

            {/* Company Pro Plan */}
            <div className="group p-8 rounded-3xl shadow-sm bg-gradient-to-br from-white/90 via-[#e1edff]/5 to-[#fbf3fb]/5 backdrop-blur-sm border border-gray-200 hover:border-[#fbf3fb]/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:via-[#e1edff]/10 hover:to-[#fbf3fb]/10">
              <div className="space-y-6">
                <div>
                  <h3
                    className={`${lora.className} text-2xl font-bold text-gray-900 mb-2`}
                  >
                    Company Pro Plan
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span
                      className={`${lora.className} text-4xl font-bold text-gray-500`}
                    >
                      Coming Soon
                    </span>
                  </div>
                </div>

                <ul className={`${openSans.className} space-y-4`}>
                  <li className="flex items-start text-gray-500">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                    </div>
                    <span>Enterprise Features</span>
                  </li>
                  <li className="flex items-start text-gray-500">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                    </div>
                    <span>Unlimited Users</span>
                  </li>
                  <li className="flex items-start text-gray-500">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                    </div>
                    <span>Dedicated Support</span>
                  </li>
                  <li className="flex items-start text-gray-500">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                    </div>
                    <span>Custom Development</span>
                  </li>
                  <li className="flex items-start text-gray-500">
                    <div className="w-6 h-6 mt-0.5 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">?</span>
                      </div>
                    </div>
                    <span>White-label Solution</span>
                  </li>
                </ul>

                <Button
                  className="w-full py-4 font-semibold text-gray-500 bg-gray-200 rounded-xl cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#f6f5fb] via-white to-[#f0f4ff] lg:py-32 overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-200/30 to-yellow-300/20 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-200/30 to-blue-300/20 rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full -translate-x-32 -translate-y-32"></div>

        <div className="relative z-10 container px-6 mx-auto text-center max-w-4xl">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2
                className={`text-3xl sm:text-4xl  font-bold text-gray-900 mb-6 leading-tight ${merriweather.className} `}
              >
                READY TO TRANSFORM YOUR BUSINESS WITH PAPRLY?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto"></div>
            </div>

            <p
              className={`text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto ${openSans.className}`}
            >
              Join thousands of businesses already using Paprly to streamline
              their operations, manage documents, and grow their teams
              efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                size="lg"
                className="px-10 py-4 text-white font-semibold rounded-xl bg-gradient-to-r from-[#b58900] to-[#d4af37] hover:from-[#996c00] hover:to-[#b8941f] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Schedule a Demo
              </Button>
              <Button
                size="lg"
                className="px-10 py-4 text-[#b58900] font-semibold rounded-xl bg-white/80 backdrop-blur-sm border-2 border-[#b58900] hover:bg-[#b58900] hover:text-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 pt-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EnterpriseHome;

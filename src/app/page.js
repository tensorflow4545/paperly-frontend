"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/LandingPage/Navbar";
import LandingPage from "@/components/LandingPage/Hero";
import ContractFeatures from "@/components/LandingPage/ContractFeatures";
import FeaturesSection from "@/components/LandingPage/Feature";
import StepsSection from "@/components/LandingPage/Steps";
import CTASection from "@/components/LandingPage/Started";
import Footer from "@/components/LandingPage/Footer";
import PhaseTwoModal from "@/components/LandingPage/phasetwomoadal";
import Head from "next/head";
import PageSEO from "@/components/SEO/PageSEO";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   // Check if user came from another page or if it's a direct page load
  //   const referrer = document.referrer;
  //   const currentOrigin = window.location.origin;
    
  //   // Only show modal if:
  //   // 1. No referrer (direct page load)
  //   // 2. Referrer is from external site (not same origin)
  //   // 3. User manually reloaded the page
  //   const isDirectAccess = !referrer || !referrer.startsWith(currentOrigin);
    
  //   // Only show modal on direct page access (not when navigating from other pages)
  //   if (isDirectAccess) {
  //     // Small delay to ensure page is fully loaded
  //     const timer = setTimeout(() => {
  //       setShowModal(true);
        
  //       // Auto close after 15 seconds
  //       const closeTimer = setTimeout(() => {
  //         setShowModal(false);
  //       }, 15000);
        
  //       return () => clearTimeout(closeTimer);
  //     }, 1000);
      
  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <PageSEO pageName="home" />
      <Head>
        <link rel="canonical" href="https://paprly.in/" />
      </Head>

      <Navbar/>
      <LandingPage/>
      <ContractFeatures/>
      <FeaturesSection/>
      <StepsSection/>
      <CTASection/>
      <Footer/>
      
      <PhaseTwoModal isOpen={showModal} onClose={handleCloseModal} />
    </>
  );
}

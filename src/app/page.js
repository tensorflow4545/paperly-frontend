"use client";
import Navbar from "@/components/LandingPage/Navbar";
import LandingPage from "@/components/LandingPage/Hero";
import FeaturesSection from "@/components/LandingPage/Feature";
import StepsSection from "@/components/LandingPage/Steps";
import CTASection from "@/components/LandingPage/Started";
import Footer from "@/components/LandingPage/Footer";
export default function Home() {
  return (
    <>
      <Navbar/>
      <LandingPage/>
      <FeaturesSection/>
      <StepsSection/>
      <CTASection/>
      <Footer/>
    </>
  );
}

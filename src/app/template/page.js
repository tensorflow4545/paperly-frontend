"use client"

import { useRouter } from "next/navigation"
import Navbar from "../../components/LandingPage/Navbar"
import Footer from "../../components/LandingPage/Footer"



export default function CodePage() {
  const router = useRouter()

  const handleBackToHome = () => {
    router.push("/")
  }
  return (
    <>
      <Navbar />
      <>

        {/* Hero section */}
        <div className="w-full h-[362px] bg-[#FEFCE8] items-center justify-center flex">
          <div className="flex flex-row gap-x-15">
            <div className="flex flex-col gap-4 w-[739px] h-[170px]">
              <h1 className="font-medium text-5xl tracking-tight text-gray-900 leading-tight">
                Choose Your
                Invoice Style
              </h1>
              <h2 className="text-gray-600 text-lg leading-relaxed">
                Pick a professionally designed template tailored for freelancers and small
                businesses. Each template is crafted to include everything you need to invoice
                like a pro — from client details to payment terms.
              </h2>
            </div>
            <div className="flex flex-row gap-4">
              <button onClick={handleBackToHome} className="bg-white w-[156px] h-[50px] cursor-pointer hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-md shadow-sm transition-all duration-200">Back to Home</button>
              <button className="bg-gray-600 w-[156px] h-[50px] cursor-pointer hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-all duration-200">Generate Invoice</button>
            </div>
          </div>


        </div>




      </>




      <Footer />
    </>
  );
}

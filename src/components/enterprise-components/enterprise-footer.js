// components/Footer.js
import { Borel } from "next/font/google";
import { Lora } from "next/font/google";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

// Font imports
const borel = Borel({
  subsets: ["latin"],
  weight: "400",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Footer() {
  return (
    <footer className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex flex-row items-center space-x-4 mb-4 ">
              <Image
                src="/final_logo.png"
                alt="Paprly Logo"
                width={40}
                height={40}
                className="object-contain  rounded-lg"
                loading="lazy"
              />
              <span className={`text-xl font-semibold text-gray-900 px-0 py-0`}>
                Paprly
              </span>
            </div>
            <p className={`text-black-600 mb-6 leading-relaxed ${openSans.className}`}>
              Revolutionizing enterprise operations with intelligent, integrated solutions.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${lora.className}`}>
              Product
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Integrations", "Solutions"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className={`text-gray-600 hover:text-gray-800 transition-colors ${openSans.className}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${lora.className}`}>
              Resources
            </h3>
            <ul className="space-y-3">
              {["Blog", "Case Studies", "Webinars", "Support"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className={`text-gray-600 hover:text-gray-800 transition-colors ${openSans.className}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${lora.className}`}>
              Company
            </h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Contact", "Partners"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className={`text-gray-600 hover:text-gray-800 transition-colors ${openSans.className}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <p className={`text-center text-gray-600 text-sm ${openSans.className}`}>
            © 2024 Paprly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
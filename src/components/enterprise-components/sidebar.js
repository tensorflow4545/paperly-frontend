"use client"

import { logout } from "@/utils/auth"

export default function Sidebar({ activeNavItem, onNavItemClick, sidebarOpen, setSidebarOpen, user, profileData }) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

             {/* Mobile Menu Button */}
       <button
         onClick={() => setSidebarOpen(!sidebarOpen)}
         className="fixed top-0 left-0 z-50 lg:hidden bg-white p-2 rounded-md shadow-md hover:bg-gray-50 transition-colors"
       >
         <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
         </svg>
       </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white   flex flex-col
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 flex-1">
          {/* Close button for mobile */}
          <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 lg:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

                     <nav className="space-y-1 mt-8 lg:mt-0">
             <button
               onClick={() => onNavItemClick("home")}
               className={`flex items-center gap-3 px-3 py-3 w-full text-left rounded-md transition-colors ${
                 activeNavItem === "home" ? "text-[#D4AF37] bg-white relative" : "text-gray-700 hover:bg-gray-50"
               }`}
             >
               {activeNavItem === "home" && (
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] rounded-l-md"></div>
               )}
               <svg
                 className={`w-5 h-5 ${activeNavItem === "home" ? "text-[#D4AF37]" : "text-gray-500"}`}
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                 />
               </svg>
               <span className="text-sm font-medium">Home</span>
             </button>

             <button
               onClick={() => onNavItemClick("workspace")}
               className={`flex items-center gap-3 px-3 py-3 w-full text-left rounded-md transition-colors ${
                 activeNavItem === "workspace" ? "text-[#D4AF37] bg-white relative" : "text-gray-700 hover:bg-gray-50"
               }`}
             >
               {activeNavItem === "workspace" && (
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] rounded-l-md"></div>
               )}
               <svg
                 className={`w-5 h-5 ${activeNavItem === "workspace" ? "text-[#D4AF37]" : "text-gray-500"}`}
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                 />
               </svg>
               <span className="text-sm font-medium">Workspace</span>
             </button>

            <button
              onClick={() => onNavItemClick("dashboard")}
              className={`flex items-center gap-3 px-3 py-3 w-full text-left rounded-md transition-colors ${
                activeNavItem === "dashboard" ? "text-[#D4AF37] bg-white relative" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {activeNavItem === "dashboard" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] rounded-l-md"></div>
              )}
              <svg
                className={`w-5 h-5 ${activeNavItem === "dashboard" ? "text-[#D4AF37]" : "text-gray-500"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="text-sm font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => {
                onNavItemClick("edit-profile")
                window.location.href = '/enterprise-profile'
              }}
              className={`flex items-center gap-3 px-3 py-3 w-full text-left rounded-md transition-colors ${
                activeNavItem === "edit-profile"
                  ? "text-[#D4AF37] bg-white relative"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {activeNavItem === "edit-profile" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] rounded-l-md"></div>
              )}
              <svg
                className={`w-5 h-5 ${activeNavItem === "edit-profile" ? "text-[#D4AF37]" : "text-gray-500"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span className="text-sm font-medium">Edit Profile</span>
            </button>

            <button
              onClick={() => {
                onNavItemClick("logout")
                logout()
              }}
              className={`flex items-center gap-3 px-3 py-3 w-full text-left rounded-md transition-colors ${
                activeNavItem === "logout" ? "text-[#D4AF37] bg-white relative" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {activeNavItem === "logout" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] rounded-l-md"></div>
              )}
              <svg
                className={`w-5 h-5 ${activeNavItem === "logout" ? "text-[#D4AF37]" : "text-gray-500"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>
        </div>

        {/* Bottom Profile Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {profileData?.companyLogo ? (
                <img src={profileData.companyLogo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {profileData?.fullName || user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {profileData?.companyName ? `${profileData.companyName}` : 'Enterprise Account'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

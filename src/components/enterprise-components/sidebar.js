"use client"

import { useState } from "react"
import { logout } from "@/utils/auth"
import { ChevronDown, ChevronRight } from "lucide-react"

export default function Sidebar({ 
  activeNavItem, 
  onNavItemClick, 
  sidebarOpen, 
  setSidebarOpen, 
  user, 
  profileData,
  onWorkspaceItemSelect,
  activeWorkspaceItem
}) {
  const [workspaceExpanded, setWorkspaceExpanded] = useState(true)

  const handleWorkspaceClick = () => {
    setWorkspaceExpanded(!workspaceExpanded)
    if (!workspaceExpanded) {
      onNavItemClick("workspace")
    }
  }

  const handleWorkspaceItemClick = (item) => {
    if (onWorkspaceItemSelect) {
      onWorkspaceItemSelect(item)
    }
  }

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

             {/* Mobile Menu Button */}
       <button
         onClick={() => setSidebarOpen(!sidebarOpen)}
         className="fixed top-0 left-0 z-50 p-2 transition-colors bg-white rounded-md shadow-md lg:hidden hover:bg-gray-50"
       >
         <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
         </svg>
       </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#F6F5FA]   flex flex-col
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex-1 p-6">
          {/* Close button for mobile */}
          <button onClick={() => setSidebarOpen(false)} className="absolute p-2 top-4 right-4 lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

                     <nav className="mt-8 space-y-1 lg:mt-0">
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

             {/* Workspace with Dropdown */}
             <div className="space-y-1">
               <button
                 onClick={handleWorkspaceClick}
                 className={`flex items-center justify-between gap-3 px-3 py-3 w-full text-left rounded-md transition-colors ${
                   activeNavItem === "workspace" ? "text-[#D4AF37] bg-white relative" : "text-gray-700 hover:bg-gray-50"
                 }`}
               >
                 <div className="flex items-center gap-3">
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
                 </div>
                 {workspaceExpanded ? (
                   <ChevronDown className="w-4 h-4 text-gray-500" />
                 ) : (
                   <ChevronRight className="w-4 h-4 text-gray-500" />
                 )}
               </button>

               {/* Workspace Dropdown Items */}
               {workspaceExpanded && (
                 <div className="ml-6 space-y-1">
                   <button
                     onClick={() => handleWorkspaceItemClick("quick-hire")}
                     className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md transition-colors text-sm ${
                       activeWorkspaceItem === "quick-hire" ? "text-[#D4AF37] bg-white" : "text-gray-600 hover:bg-gray-50"
                     }`}
                   >
                     <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                     <span>Quick Hire</span>
                   </button>
                   <button
                     onClick={() => handleWorkspaceItemClick("my-employees")}
                     className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md transition-colors text-sm ${
                       activeWorkspaceItem === "my-employees" ? "text-[#D4AF37] bg-white" : "text-gray-600 hover:bg-gray-50"
                     }`}
                   >
                     <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                     <span>My Employees/Freelancers</span>
                   </button>
                   <button
                     onClick={() => handleWorkspaceItemClick("payments")}
                     className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md transition-colors text-sm ${
                       activeWorkspaceItem === "payments" ? "text-[#D4AF37] bg-white" : "text-gray-600 hover:bg-gray-50"
                     }`}
                   >
                     <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                     <span>Payments</span>
                   </button>
                   <button
                     onClick={() => handleWorkspaceItemClick("drafts")}
                     className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md transition-colors text-sm ${
                       activeWorkspaceItem === "drafts" ? "text-[#D4AF37] bg-white" : "text-gray-600 hover:bg-gray-50"
                     }`}
                   >
                     <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                     <span>Drafts</span>
                   </button>
                   <button
                     onClick={() => handleWorkspaceItemClick("track")}
                     className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-md transition-colors text-sm ${
                       activeWorkspaceItem === "track" ? "text-[#D4AF37] bg-white" : "text-gray-600 hover:bg-gray-50"
                     }`}
                   >
                     <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                     <span>Track</span>
                   </button>
                 </div>
               )}
             </div>

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
              onClick={() => onNavItemClick("edit-profile")}
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
              onClick={() => onNavItemClick("logout")}
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
            <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
              {profileData?.companyLogo ? (
                <img src={profileData.companyLogo} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-full">
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

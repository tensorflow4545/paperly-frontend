"use client"

import { useState, useEffect } from "react"
import { logout } from "@/utils/auth"
import { ChevronDown, ChevronRight, Home, Layout, User, LogOut, Users, CreditCard, FileText, Activity } from "lucide-react"

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
  const [workspaceExpanded, setWorkspaceExpanded] = useState(false)

  // Close workspace dropdown when home is active
  useEffect(() => {
    if (activeNavItem === "home") {
      setWorkspaceExpanded(false)
    }
  }, [activeNavItem])

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

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: Layout },
    { id: "edit-profile", label: "Profile", icon: User },
    { id: "logout", label: "Logout", icon: LogOut }
  ]

  const workspaceItems = [
    { id: "quick-hire", label: "Quick Hire", icon: Users },
    { id: "my-employees", label: "My Team", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "drafts", label: "Drafts", icon: FileText },
    { id: "track", label: "Track", icon: Activity }
  ]

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-3 transition-all duration-200 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-sm lg:hidden hover:shadow-sm hover:scale-105 border border-yellow-200"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#fefce8] to-white border-r border-yellow-200 flex flex-col
          transform transition-all duration-300 ease-out lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-sm lg:shadow-none
        `}
      >
        <div className="flex-1 p-6">
          {/* Close button for mobile */}
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="absolute p-2 top-4 right-4 lg:hidden hover:bg-gray-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8 pt-2">
           
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Welcome to Paprly</h1>
              <p className="text-sm text-yellow-600 font-medium border-b-2 border-yellow-200 pb-1">Enterprise Suite Suite section</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">
            {/* Home Item */}
            <button
              onClick={() => onNavItemClick("home")}
              className={`
                group flex items-center gap-3 px-4 py-3.5 w-full text-left rounded-xl transition-all duration-200
                                  ${activeNavItem === "home" 
                    ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-900 border border-yellow-200' 
                    : 'text-gray-700 hover:bg-yellow-50 hover:text-gray-900 hover:border hover:border-yellow-100'
                  }
              `}
            >
              <div className={`
                p-2.5 rounded-lg transition-all duration-200
                ${activeNavItem === "home" 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700'
                }
              `}>
                <Home className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm">Home</span>
              {activeNavItem === "home" && (
                <div className="ml-auto w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              )}
            </button>

            {/* Workspace Section */}
            <div>
              <button
                onClick={handleWorkspaceClick}
                className={`
                  group flex items-center justify-between gap-3 px-4 py-3.5 w-full text-left rounded-xl transition-all duration-200
                  ${activeNavItem === "workspace" 
                    ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-900 border border-yellow-200' 
                    : 'text-gray-700 hover:bg-yellow-50 hover:text-gray-900 hover:border hover:border-yellow-100'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    p-2.5 rounded-lg transition-all duration-200
                    ${activeNavItem === "workspace" 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700'
                    }
                  `}>
                    <Layout className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">Workspace</span>
                </div>
                <div className={`
                  transition-transform duration-200
                  ${workspaceExpanded ? 'rotate-180' : ''}
                `}>
                  <ChevronDown className="w-4 h-4 text-yellow-500" />
                </div>
              </button>

              {/* Workspace Dropdown Items */}
              {workspaceExpanded && (
                <div className="mt-2 ml-4 space-y-2 border-l-2 border-yellow-200 pl-4">
                  {workspaceItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeWorkspaceItem === item.id
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleWorkspaceItemClick(item.id)}
                        className={`
                          group flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg transition-all duration-200
                          ${isActive 
                            ? 'bg-yellow-100 text-gray-900 border border-yellow-200' 
                            : 'text-gray-600 hover:bg-yellow-50 hover:text-gray-800'
                          }
                        `}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-yellow-600' : 'text-gray-500 group-hover:text-yellow-600'}`} />
                        <span className="text-sm font-medium">{item.label}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Other Navigation Items */}
            {navItems.filter(item => item.id !== "home").map((item) => {
              const Icon = item.icon
              const isActive = activeNavItem === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavItemClick(item.id)}
                  className={`
                    group flex items-center gap-3 px-4 py-3.5 w-full text-left rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-900 border border-yellow-200' 
                      : 'text-gray-700 hover:bg-yellow-50 hover:text-gray-900 hover:border hover:border-yellow-100'
                    }
                  `}
                >
                  <div className={`
                    p-2.5 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700'
                    }
                  `}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Bottom Profile Section */}
        <div className="p-4 border-t border-yellow-200 bg-gradient-to-r from-yellow-50 to-white">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-yellow-200 hover:bg-yellow-50 transition-all duration-200">
            <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl">
              {profileData?.companyLogo ? (
                <img src={profileData.companyLogo} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                {profileData?.fullName || user?.name || 'User'}
              </p>
              <p className="text-xs text-yellow-600 font-medium truncate">
                {profileData?.companyName ? `${profileData.companyName}` : 'Enterprise Account'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

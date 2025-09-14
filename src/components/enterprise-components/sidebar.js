"use client";

import { useState, useEffect } from "react";
import { logout } from "@/utils/auth";
import { Borel } from "next/font/google";
import Link from "next/link";
import {
  ChevronDown,
  Home,
  Layout,
  User,
  LogOut,
  Users,
  CreditCard,
  FileText,
  Activity,
  Wallet, // ✅ added import
} from "lucide-react";
import PaymentsPage from "./userpayment"; // Import the PaymentsPage component

const borel = Borel({
  subsets: ["latin"],
  weight: "400",
});

export default function Sidebar({
  activeNavItem,
  onNavItemClick,
  sidebarOpen,
  setSidebarOpen,
  user,
  profileData,
  onWorkspaceItemSelect,
  activeWorkspaceItem,
}) {
  const [workspaceExpanded, setWorkspaceExpanded] = useState(false);

  // Close workspace dropdown when home is active
  useEffect(() => {
    if (activeNavItem === "home") {
      setWorkspaceExpanded(false);
    }
  }, [activeNavItem]);

  const handleWorkspaceClick = () => {
    setWorkspaceExpanded(!workspaceExpanded);
    if (!workspaceExpanded) {
      onNavItemClick("workspace");
    }
  };

  const handleWorkspaceItemClick = (item) => {
    if (onWorkspaceItemSelect) {
      onWorkspaceItemSelect(item);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: Layout },
    { id: "edit-profile", label: "Profile", icon: User },
    { id: "user-payment", label: "User Payment", icon: User },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  const workspaceItems = [
    { id: "quick-hire", label: "Quick Hire", icon: Users },
    { id: "my-employees", label: "My Team", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "drafts", label: "Documents", icon: FileText },
    { id: "track", label: "Track", icon: Activity },
  ];

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
        className="fixed z-50 p-3 transition-all duration-200 border border-yellow-200 shadow-sm top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl lg:hidden hover:shadow-sm hover:scale-105"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-gradient-to-b from-[#fefce8] to-white border-r border-yellow-200 flex flex-col
          transform transition-all duration-300 ease-out lg:transform-none
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          shadow-sm lg:shadow-none
        `}
      >
        <div className="flex-1 p-6">
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute p-2 transition-colors rounded-lg top-4 right-4 lg:hidden hover:bg-gray-50"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Logo Section */}
          <div className="flex items-center gap-3 pt-2 mb-8">
            <div>
              <h1 className="text-lg font-borel font-semibold text-[#B29200]">
                Welcome to <span className={`${borel.className}`}>paprly</span>
              </h1>
              <p className="pb-1 text-sm font-medium text-yellow-600 border-b-2 border-yellow-200">
                Enterprise Suite section
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">
            {/* Home Item */}
            <button
              onClick={() => onNavItemClick("home")}
              className={`
                group flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg transition-all duration-200
                ${
                  activeNavItem === "home"
                    ? "bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-900 border border-yellow-200"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-gray-900"
                }
              `}
            >
              <div
                className={`
                  p-1.5 rounded-md transition-all duration-200
                  ${
                    activeNavItem === "home"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700"
                  }
                `}
              >
                <Home className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold">Home</span>
              {activeNavItem === "home" && (
                <div className="w-2 h-2 ml-auto bg-yellow-500 rounded-full animate-pulse"></div>
              )}
            </button>

            {/* Workspace Section */}
            <div>
              <button
                onClick={handleWorkspaceClick}
                className={`
                  group flex items-center justify-between gap-3 px-3 py-2.5 w-full text-left rounded-lg transition-all duration-200
                  ${
                    activeNavItem === "workspace"
                      ? "bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-900 border border-yellow-200"
                      : "text-gray-700 hover:bg-yellow-50 hover:text-gray-900"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      p-1.5 rounded-md transition-all duration-200
                      ${
                        activeNavItem === "workspace"
                          ? "bg-yellow-500 text-white"
                          : "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700"
                      }
                    `}
                  >
                    <Layout className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold">Workspace</span>
                </div>
                <div
                  className={`
                    transition-transform duration-200
                    ${workspaceExpanded ? "rotate-180" : ""}
                  `}
                >
                  <ChevronDown className="w-4 h-4 text-yellow-500" />
                </div>
              </button>

              {/* Workspace Dropdown Items */}
              {workspaceExpanded && (
                <div className="pl-4 mt-2 ml-4 space-y-2 border-l-2 border-yellow-200">
                  {workspaceItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeWorkspaceItem === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleWorkspaceItemClick(item.id)}
                        className={`
                          group flex items-center gap-3 px-2.5 py-2 w-full text-left rounded-md transition-all duration-200
                          ${
                            isActive
                              ? "bg-yellow-100 text-gray-900 border border-yellow-200"
                              : "text-gray-600 hover:bg-yellow-50 hover:text-gray-800"
                          }
                        `}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            isActive
                              ? "text-yellow-600"
                              : "text-gray-500 group-hover:text-yellow-600"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dashboard Item - Rendered separately */}
            <button
              onClick={() => onNavItemClick("dashboard")}
              className={`
                group flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg transition-all duration-200
                ${
                  activeNavItem === "dashboard"
                    ? "bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-900 border border-yellow-200"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-gray-900"
                }
              `}
            >
              <div
                className={`
                  p-1.5 rounded-md transition-all duration-200
                  ${
                    activeNavItem === "dashboard"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700"
                  }
                `}
              >
                <Layout className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold">Dashboard</span>
              {activeNavItem === "dashboard" && (
                <div className="w-2 h-2 ml-auto bg-yellow-500 rounded-full animate-pulse"></div>
              )}
            </button>

            {/* Profile Item */}
            <button
              onClick={() => onNavItemClick("edit-profile")}
              className={`
                group flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg transition-all duration-200
                ${
                  activeNavItem === "edit-profile"
                    ? "bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-900 border border-yellow-200"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-gray-900"
                }
              `}
            >
              <div
                className={`
                  p-1.5 rounded-md transition-all duration-200
                  ${
                    activeNavItem === "edit-profile"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700"
                  }
                `}
              >
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold">Profile</span>
              {activeNavItem === "edit-profile" && (
                <div className="w-2 h-2 ml-auto bg-yellow-500 rounded-full animate-pulse"></div>
              )}
            </button>

            {/* User Payments Tab - Added between Profile and Logout */}
            <button
              onClick={() => onNavItemClick("Userpayments")}
              className={`
                group flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg transition-all duration-200
                ${
                  activeNavItem === "Userpayments"
                    ? "bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-900 border border-yellow-200"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-gray-900"
                }
              `}
            >
              <div
                className={`
                  p-1.5 rounded-md transition-all duration-200
                  ${
                    activeNavItem === "Userpayments"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700"
                  }
                `}
              >
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold">User payments</span>
              {activeNavItem === "Userpayments" && (
                <div className="w-2 h-2 ml-auto bg-yellow-500 rounded-full animate-pulse"></div>
              )}
            </button>

            {/* Logout Item */}
            <button
              onClick={() => onNavItemClick("logout")}
              className={`
                group flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg transition-all duration-200
                ${
                  activeNavItem === "logout"
                    ? "bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-900 border border-yellow-200"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-gray-900"
                }
              `}
            >
              <div
                className={`
                  p-1.5 rounded-md transition-all duration-200
                  ${
                    activeNavItem === "logout"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 group-hover:text-yellow-700"
                  }
                `}
              >
                <LogOut className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold">Logout</span>
              {activeNavItem === "logout" && (
                <div className="w-2 h-2 ml-auto bg-yellow-500 rounded-full animate-pulse"></div>
              )}
            </button>
          </nav>
        </div>

        {/* Bottom Profile Section */}
        <div className="p-3 border-t border-yellow-200 bg-gradient-to-r from-yellow-50 to-white">
          <div className="flex items-center gap-2 p-2 transition-all duration-200 bg-white border border-yellow-200 rounded-lg hover:bg-yellow-50">
            <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600">
              {profileData?.companyLogo ? (
                <img
                  src={profileData.companyLogo}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">
                {profileData?.fullName || user?.name || "User"}
              </p>
              <p className="text-xs text-yellow-600 truncate">
                {profileData?.companyName
                  ? `${profileData.companyName}`
                  : "Enterprise Account"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Display PaymentsPage when activeNavItem is "Userpayments" */}
      {activeNavItem === "Userpayments" && (
        <div className="flex-1 p-6 ml-0 lg:ml-[260px]">
          
        </div>
      )}
    </>
  );
}
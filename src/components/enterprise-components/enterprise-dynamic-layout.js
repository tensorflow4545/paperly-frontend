"use client";

import { useState, useEffect } from "react";
import { getAuthToken, getUserData, logout } from "@/utils/auth";
import PaymentsPage from "./userpayment";
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  Building, 
  Settings, 
  User, 
  LogOut, 
  Plus, 
  Activity,
  TrendingUp,
  Shield,
  Mail,
  MapPin,
  IndianRupee,
  Calendar,
  Briefcase,
  CreditCard,
  X,
  Search,
  Filter,
  Trash2,
  Eye,
  Download,
} from "lucide-react";
import EnterpriseNavbar from "@/components/enterprise-components/enterprise-navbar";
import Sidebar from "@/components/enterprise-components/sidebar";
import Footer from "@/components/enterprise-components/enterprise-footer";
import EnterpriseWorkspace from "@/components/enterprise-components/enterprise-workspace";
import EnterpriseEditProfile from "@/components/enterprise-components/enterprise-editprofile";
import MyEmployeesFreelancers from "@/components/enterprise-components/workspace_myemployee_freelancer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Home Dashboard Component
const HomeDashboard = ({
  user,
  profileData,
  setActiveNavItem,
  setActiveWorkspaceItem,
}) => {
  return (
    <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
      {/* Header */}
      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="flex items-center gap-2 mb-1 text-2xl font-semibold text-gray-900">
                <User className="w-6 h-6 text-yellow-600" />
                Welcome back, {profileData?.fullName || user?.name || "User"}
              </h1>
              <p className="flex items-center gap-2 text-gray-600">
                <Activity className="w-4 h-4 text-yellow-500" />
                Manage your Team Documentation and Payments all at one place{" "}
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setActiveNavItem("workspace");
                  setActiveWorkspaceItem("quick-hire");
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors bg-yellow-600 rounded-lg hover:bg-yellow-700"
              >
                <Plus className="w-4 h-4" />
                Quick Hire
              </button>
              <button 
                onClick={() => setActiveNavItem("dashboard")}
                className="px-4 py-2 bg-white text-gray-700 text-sm rounded-lg hover:bg-[#fefce8] transition-colors border border-yellow-200 flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Active Documents",
                value: "24",
                icon: FileText,
                color: "text-blue-600",
                bgColor: "bg-blue-100",
              },
              {
                title: "Team Members",
                value: "12",
                icon: Users,
                color: "text-green-600",
                bgColor: "bg-green-100",
              },
              {
                title: "Pending Reviews",
                value: "8",
                icon: Clock,
                color: "text-yellow-600",
                bgColor: "bg-yellow-100",
              },
              {
                title: "Completed This Month",
                value: "156",
                icon: CheckCircle,
                color: "text-purple-600",
                bgColor: "bg-purple-100",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="p-4 transition-colors bg-white border border-yellow-200 rounded-lg shadow-sm hover:border-yellow-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Company Information */}
            <div className="space-y-6 lg:col-span-2">
              <div className="p-6 bg-white border border-yellow-200 rounded-lg shadow-sm">
                <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                  <Building className="w-5 h-5 text-yellow-600" />
                  Company Information
                </h2>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-3">
              <div>
                      <label className="flex items-center block gap-1 mb-1 text-xs font-medium text-gray-600">
                        <Building className="w-3 h-3 text-yellow-500" />
                        Company Name
                      </label>
                      <div className="bg-[#fefce8] rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">
                          {profileData?.companyName || "Not specified"}
                        </p>
                      </div>
              </div>
              <div>
                                            <label className="flex items-center block gap-1 mb-1 text-xs font-medium text-gray-600">
                        <Briefcase className="w-3 h-3 text-yellow-500" />
                        Company Type
                      </label>
                      <div className="bg-[#fefce8] rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">
                          {profileData?.companyType || "Not specified"}
                        </p>
                      </div>
              </div>
                    <div>
                                            <label className="flex items-center block gap-1 mb-1 text-xs font-medium text-gray-600">
                        <TrendingUp className="w-3 h-3 text-yellow-500" />
                        Industry
                      </label>
                      <div className="bg-[#fefce8] rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">
                          {profileData?.industry || "Not specified"}
                        </p>
                      </div>
                    </div>
            </div>

                  <div className="space-y-3">
                                        <div>
                      <label className="flex items-center block gap-1 mb-1 text-xs font-medium text-gray-600">
                        <Shield className="w-3 h-3 text-yellow-500" />
                        GST Number
                      </label>
                      <div className="bg-[#fefce8] rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">
                          {profileData?.gstNumber || "Not specified"}
                        </p>
                      </div>
                    </div>
              <div>
                      <label className="flex items-center block gap-1 mb-1 text-xs font-medium text-gray-600">
                        <MapPin className="w-3 h-3 text-yellow-500" />
                        Registered Address
                      </label>
                      <div className="p-3 border border-yellow-200 rounded-md bg-yellow-50">
                        <p className="text-sm text-gray-900">
                          {profileData?.registeredAddress || "Not specified"}
                        </p>
                </div>
              </div>
              <div>
                      <label className="flex items-center block gap-1 mb-1 text-xs font-medium text-gray-600">
                        <Mail className="w-3 h-3 text-yellow-500" />
                        Contact Email
                      </label>
                      <div className="p-3 border border-yellow-200 rounded-md bg-yellow-50">
                        <p className="text-sm text-gray-900">
                          {profileData?.email || user?.email || "Not specified"}
                        </p>
                      </div>
                    </div>
                </div>
              </div>
            </div>

              {/* Preferences */}
              <div className="p-6 bg-white border border-yellow-200 rounded-lg shadow-sm">
                <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                  <Settings className="w-5 h-5 text-yellow-600" />
                  Preferences & Settings
                </h2>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-3">
              <div>
                      <label className="flex items-center block gap-1 mb-1 text-xs font-medium text-gray-600">
                        <IndianRupee className="w-3 h-3 text-yellow-500" />
                        Default Currency
                      </label>
                      <div className="p-3 border border-yellow-200 rounded-md bg-yellow-50">
                        <p className="text-sm text-gray-900">
                          {profileData?.defaultCurrency || "Not specified"}
                        </p>
                      </div>
              </div>
              <div>
                      <label className="flex items-center block gap-1 mb-1 text-xs font-medium text-gray-600">
                        <Calendar className="w-3 h-3 text-yellow-500" />
                        Payment Cycle
                      </label>
                      <div className="p-3 border border-yellow-200 rounded-md bg-yellow-50">
                        <p className="text-sm text-gray-900">
                          {profileData?.defaultPaymentCycle || "Not specified"}
                        </p>
              </div>
            </div>
          </div>

                  <div className="space-y-3">
              <div>
                      <label className="flex items-center block gap-1 mb-1 text-xs font-medium text-gray-600">
                        <User className="w-3 h-3 text-yellow-500" />
                        Preferred Language
                      </label>
                      <div className="p-3 border border-yellow-200 rounded-md bg-yellow-50">
                        <p className="text-sm text-gray-900">
                          {profileData?.preferredLanguage || "Not specified"}
                        </p>
                </div>
              </div>
              <div>
                      <label className="flex items-center block gap-1 mb-1 text-xs font-medium text-gray-600">
                        <FileText className="w-3 h-3 text-yellow-500" />
                        Signature Style
                      </label>
                      <div className="p-3 border border-yellow-200 rounded-md bg-yellow-50">
                        <p className="text-sm text-gray-900">
                          {profileData?.defaultSignatureStyle ||
                            "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="p-4 bg-white border border-yellow-200 rounded-lg shadow-sm">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900">
                  <Activity className="w-4 h-4 text-yellow-600" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  {[
                    { 
                      label: "Manage Team",
                      description: "View and manage your teams",
                      icon: Users,
                      action: () => {
                        setActiveNavItem("workspace");
                        setActiveWorkspaceItem("my-employees");
                      },
                    },
                    { 
                      label: "Documents",
                      description: "View and manage your documents",
                      icon: FileText,
                      action: () => {
                        setActiveNavItem("workspace");
                        setActiveWorkspaceItem("drafts");
                      },
                    },
                    { 
                      label: "Profile",
                      description: "Update and edit your company profile",
                      icon: User,
                      action: () => setActiveNavItem("edit-profile"),
                    },
                  ].map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={action.action}
                        className="flex items-center w-full gap-2 p-2 text-xs text-left text-gray-700 transition-colors rounded-md hover:bg-yellow-50"
                      >
                        <Icon className="w-3 h-3 text-yellow-500" />
                        <div className="flex-1 text-left">
                          <div className="font-medium">{action.label}</div>
                          <div className="text-xs text-gray-500">
                            {action.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  
                  {/* Logout button - smaller and separated */}
                  <div className="pt-2 border-t border-yellow-200">
                    <button
                      onClick={() => {
                        logout();
                        window.location.href = "/sign-in";
                      }}
                      className="w-full text-left p-1.5 rounded-md hover:bg-red-50 transition-colors text-xs text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="w-3 h-3" />
                      Logout
                    </button>
              </div>
            </div>
          </div>

              {/* Enterprise Features */}
              <div className="p-4 bg-white border border-yellow-200 rounded-lg shadow-sm">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900">
                  <Shield className="w-4 h-4 text-yellow-600" />
                  Enterprise Features
                </h3>
                <div className="space-y-3">
              <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700">
                      Onboarding Kit
                    </span>
                    <div
                      className={`w-10 h-5 rounded-full transition-colors ${
                        profileData?.enableOneClickOnboardingKit
                          ? "bg-yellow-500"
                          : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                          profileData?.enableOneClickOnboardingKit
                            ? "translate-x-5"
                            : "translate-x-0.5"
                        }`}
                      ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700">
                      Timestamp Proof
                    </span>
                    <div
                      className={`w-10 h-5 rounded-full transition-colors ${
                        profileData?.enableDocumentTimestampProof
                          ? "bg-yellow-500"
                          : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                          profileData?.enableDocumentTimestampProof
                            ? "translate-x-5"
                            : "translate-x-0.5"
                        }`}
                      ></div>
                </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-4 bg-white border border-yellow-200 rounded-lg shadow-sm">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  Recent Activity
                </h3>
                <div className="space-y-2">
                  {[
                    { action: "Document signed", time: "2 hours ago" },
                    { action: "Team member added", time: "1 day ago" },
                    { action: "Payment processed", time: "2 days ago" },
                    { action: "Document created", time: "3 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-700">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>              
        </div>
      </div>
    </div>
  );
};

// Dashboard Component (placeholder)
const Dashboard = () => {
  return (
    <div className="w-full bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] flex-1 lg:ml-0">
      <div className="px-4 py-6 pt-16 sm:px-6 lg:px-8 sm:py-8 lg:py-12 lg:pt-12">
        <div className="w-full p-4 sm:p-6 lg:p-10 rounded-[10px] bg-[#FFF3BBB0]">
          <h1 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
            Dashboard
          </h1>
          <p className="text-sm text-gray-700 sm:text-base">
            Dashboard functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

// Workspace Components
const WorkspacePayments = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [filters, setFilters] = useState({
    employeeName: "",
    employeeEmail: "",
    paymentStatus: "all",
    currentMonth: "all",
  });
  const [formData, setFormData] = useState({
    employeeEmail: "",
    employeeName: "",
    paymentAmount: "",
    modeOfPayment: "",
    dateOfPayment: "",
    lastPaymentDate: "",
    currentMonth: "",
    currentMonthPaymentStatus: "pending",
    currentMonthPaymentAmount: "",
    role: "",
    dateOfJoining: "",
  });

  // Get current month for calculations
  const getCurrentMonth = () => {
    const now = new Date();
    return now.toLocaleString("default", { month: "long", year: "numeric" });
  };

  // Calculate current month stats
  const getCurrentMonthStats = () => {
    const currentMonth = getCurrentMonth();
    const currentMonthEmployees = employees.filter(
      (emp) =>
        emp.currentMonth === currentMonth ||
        (emp.dateOfPayment &&
          new Date(emp.dateOfPayment).toLocaleString("default", {
            month: "long",
            year: "numeric",
          }) === currentMonth)
    );

    const totalAmount = currentMonthEmployees.reduce(
      (sum, emp) => sum + (emp.paymentAmount || 0),
      0
    );
    const totalPaid = currentMonthEmployees
      .filter((emp) => emp.currentMonthPaymentStatus === "paid")
      .reduce((sum, emp) => sum + (emp.paymentAmount || 0), 0);
    const totalPending = currentMonthEmployees
      .filter((emp) => emp.currentMonthPaymentStatus === "pending")
      .reduce((sum, emp) => sum + (emp.paymentAmount || 0), 0);

    return { totalAmount, totalPaid, totalPending };
  };

  // Pagination logic
  const getPaginatedEmployees = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return employees.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(employees.length / itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch employee payment details
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Build query parameters
      const params = new URLSearchParams();
      if (filters.employeeName)
        params.append("employeeName", filters.employeeName);
      if (filters.employeeEmail)
        params.append("employeeEmail", filters.employeeEmail);
      if (filters.paymentStatus && filters.paymentStatus !== "all")
        params.append("paymentStatus", filters.paymentStatus);
      if (filters.currentMonth && filters.currentMonth !== "all")
        params.append("currentMonth", filters.currentMonth);

      const queryString = params.toString();
      const apiUrl = queryString
        ? `https://paperly-backend-five.vercel.app/api/employeePayment?${queryString}`
        : `https://paperly-backend-five.vercel.app/api/employeePayment`;

      console.log("=== FETCH EMPLOYEES DEBUG ===");
      console.log("Fetching employees from:", apiUrl);
      console.log("Query params:", queryString);
      console.log(
        "Token:",
        token ? `${token.substring(0, 20)}...` : "No token"
      );

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();

          // Handle "no records found" as empty state, not error
          if (
            response.status === 404 &&
            errorData.error &&
            errorData.error.includes("No employee payment details found")
          ) {
            console.log("No payment records found - setting empty state");
            setEmployees([]);
            setError(null);
            return;
          }

          throw new Error(
            errorData.error || "Failed to fetch employee payment details"
          );
        } else {
          // Handle HTML error response
          const errorText = await response.text();
          console.error("Non-JSON response:", errorText);
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
      }

      const data = await response.json();
      console.log("=== FETCH EMPLOYEES DEBUG ===");
      console.log("API Response:", data);
      console.log("Employees data:", data.data);
      console.log("First employee structure:", data.data?.[0]);

      if (data.success) {
        setEmployees(data.data || []);
        setCurrentPage(1); // Reset to first page when data changes
      } else {
        throw new Error(
          data.error || "Failed to fetch employee payment details"
        );
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new employee payment details
  const handleAddEmployee = async () => {
    try {
      setIsSubmitting(true);
      const token = getAuthToken();

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Validate required fields
      const requiredFields = [
        "employeeName",
        "employeeEmail",
        "modeOfPayment",
        "paymentAmount",
        "dateOfPayment",
      ];

      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Validate payment amount
      if (parseFloat(formData.paymentAmount) <= 0) {
        throw new Error("Payment amount must be greater than 0");
      }

      const response = await fetch(
        "https://paperly-backend-five.vercel.app/api/employeePayment",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to add employee payment details"
          );
        } else {
          // Handle HTML error response
          const errorText = await response.text();
          console.error("Non-JSON response:", errorText);
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
      }

      const data = await response.json();

      if (data.success) {
        setShowAddModal(false);
        setFormData({
          employeeEmail: "",
          employeeName: "",
          paymentAmount: "",
          modeOfPayment: "",
          dateOfPayment: "",
          lastPaymentDate: "",
          currentMonth: "",
          currentMonthPaymentStatus: "pending",
          currentMonthPaymentAmount: "",
          role: "",
          dateOfJoining: "",
        });
        fetchEmployees(); // Refresh the list
      } else {
        throw new Error(data.error || "Failed to add employee payment details");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open status toggle modal
  const handlePaymentStatusClick = (employee) => {
    setSelectedEmployee(employee);
    setShowStatusModal(true);
  };

  // Update payment status
  const handlePaymentStatusUpdate = async (newStatus) => {
    if (!selectedEmployee) return;

    try {
      setIsSubmitting(true);
      const token = getAuthToken();

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(
        `https://paperly-backend-five.vercel.app/api/employeePayment/${selectedEmployee._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentMonthPaymentStatus: newStatus,
          }),
        }
      );

      if (!response.ok) {
        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update payment status");
        } else {
          // Handle HTML error response
          const errorText = await response.text();
          console.error("Non-JSON response:", errorText);
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
      }

      setShowStatusModal(false);
      setSelectedEmployee(null);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error updating payment status:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open delete confirmation modal
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  // Delete employee payment details
  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return;

    try {
      setIsSubmitting(true);
      const token = getAuthToken();

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(
        `https://paperly-backend-five.vercel.app/api/employeePayment/${selectedEmployee._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Delete error response:", errorData);
          throw new Error(
            errorData.error || "Failed to delete employee payment details"
          );
        } else {
          // Handle HTML error response
          const errorText = await response.text();
          console.error("Non-JSON response:", errorText);
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
      }

      const deleteResult = await response.json();
      console.log("Delete successful:", deleteResult);

      setShowDeleteModal(false);
      setSelectedEmployee(null);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Apply filters
  const applyFilters = () => {
    fetchEmployees();
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      employeeName: "",
      employeeEmail: "",
      paymentStatus: "all",
      currentMonth: "all",
    });
    fetchEmployees();
  };

  // Load employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Get current month options
  const getCurrentMonthOptions = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const monthYear = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      months.push(monthYear);
    }
    return months;
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
      {/* Header */}
      <div className="px-4 py-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="flex items-center gap-2 mb-1 text-xl font-bold text-gray-900">
                <CreditCard className="w-5 h-5 text-yellow-600" />
            Payments
          </h1>
              <p className="text-sm text-gray-600">
                Manage employee payments and track payment history
          </p>
        </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>Powered by Paprly</span>
      </div>
    </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-8 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Main Content */}
            <div className="space-y-4 lg:col-span-3">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="p-4 transition-all duration-200 bg-white border border-yellow-200 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">
                        Total Payments
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        {employees.length}
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CreditCard className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="p-4 transition-all duration-200 bg-white border border-yellow-200 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Paid</p>
                      <p className="text-xl font-bold text-gray-900">
                        {
                          employees.filter(
                            (emp) => emp.currentMonthPaymentStatus === "paid"
                          ).length
                        }
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="p-4 transition-all duration-200 bg-white border border-yellow-200 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">
                        Pending
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        {
                          employees.filter(
                            (emp) => emp.currentMonthPaymentStatus === "pending"
                          ).length
                        }
                      </p>
                    </div>
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="p-4 transition-all duration-200 bg-white border border-yellow-200 shadow-sm rounded-xl hover:shadow-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <Input
                      placeholder="Search by name or email..."
                      value={filters.employeeName || filters.employeeEmail}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFilters((prev) => ({
                          ...prev,
                          employeeName: value,
                          employeeEmail: value,
                        }));
                      }}
                      className="pl-10 text-sm border-yellow-200 bg-yellow-50 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="sm:w-40">
                    <Select
                      value={filters.paymentStatus}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          paymentStatus: value,
                        }))
                      }
                    >
                      <SelectTrigger className="text-sm border-yellow-200 bg-yellow-50 focus:border-yellow-500 focus:ring-yellow-500">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={applyFilters}
                    className="px-4 text-white bg-yellow-600 hover:bg-yellow-700"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </div>

              {/* Payments List */}
              <div className="overflow-hidden bg-white border border-yellow-200 shadow-sm rounded-xl">
                <div className="p-4 border-b border-yellow-200">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Payment Records ({employees.length})
                  </h2>
                </div>

                {loading && (
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-yellow-600 rounded-full border-t-transparent animate-spin"></div>
                      <span className="text-sm text-gray-600">
                        Loading payments...
                      </span>
                    </div>
                  </div>
                )}

                {!loading && employees.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
                      <CreditCard className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="mb-1 text-sm font-medium text-gray-900">
                      No payment records found
                    </h3>
                    <p className="mb-4 text-xs text-gray-500">
                      Start by adding your first employee payment
                    </p>
                    <Button
                      onClick={() => setShowAddModal(true)}
                      className="text-sm text-white bg-yellow-600 hover:bg-yellow-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Payment
                    </Button>
                  </div>
                )}

                {!loading && employees.length > 0 && (
                  <div className="p-4 space-y-3">
                    {getPaginatedEmployees().map((employee) => (
                      <div
                        key={employee._id}
                        className="p-4 transition-all duration-200 bg-white border border-yellow-200 rounded-lg hover:shadow-sm"
                      >
                        {/* Header Section */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
                              <User className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900">
                                {employee.employeeName}
                              </h3>
                              <div className="flex items-center space-x-3 text-xs text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Mail className="w-3 h-3" />
                                  <span>{employee.employeeEmail}</span>
                                </div>
                                {employee.role && (
                                  <div className="flex items-center space-x-1">
                                    <Briefcase className="w-3 h-3" />
                                    <span>{employee.role}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handlePaymentStatusClick(employee)}
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                                employee.currentMonthPaymentStatus === "paid"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              }`}
                            >
                              {employee.currentMonthPaymentStatus === "paid" ? (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Paid
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pending
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleDeleteClick(employee)}
                              className="p-1 text-red-500 transition-colors hover:text-red-600"
                              title="Delete payment record"
                            >
                              <Trash2 className="w-4 h-4 " />
                            </button>
                          </div>
                        </div>

                        {/* Payment Details Grid */}
                        <div className="grid grid-cols-3 gap-3">
                          {/* Payment Amount */}
                          <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-600">
                                Amount
                              </span>
                              <IndianRupee className="w-3 h-3 text-gray-500" />
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              ₹{employee.paymentAmount?.toLocaleString()}
                            </div>
                          </div>

                          {/* Payment Method */}
                          <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-600">
                                Method
                              </span>
                              <CreditCard className="w-3 h-3 text-gray-500" />
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {employee.modeOfPayment}
                            </div>
                          </div>

                          {/* Payment Date */}
                          <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-600">
                                Due Date
                              </span>
                              <Calendar className="w-3 h-3 text-gray-500" />
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {new Date(
                                employee.dateOfPayment
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Pay Now Button */}
                        {employee.currentMonthPaymentStatus === "pending" && (
                          <div className="pt-3 mt-4 border-t border-gray-100">
                            <button
                              onClick={() => {
                                // You can add payment processing logic here
                                alert(
                                  `Processing payment of ₹${employee.paymentAmount?.toLocaleString()} for ${
                                    employee.employeeName
                                  }`
                                );
                              }}
                              className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-sm font-medium text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 hover:shadow-lg"
                            >
                              <CreditCard className="w-4 h-4" />
                              <span>Process Payment</span>
                            </button>
                          </div>
                        )}

                        {/* Additional Details */}
                        {(employee.lastPaymentDate ||
                          employee.currentMonth ||
                          employee.dateOfJoining) && (
                          <div className="pt-3 mt-3 border-t border-gray-100">
                            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                              {employee.lastPaymentDate && (
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>
                                    Last:{" "}
                                    {new Date(
                                      employee.lastPaymentDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              {employee.currentMonth && (
                                <div className="flex items-center space-x-1">
                                  <Activity className="w-3 h-3" />
                                  <span>Month: {employee.currentMonth}</span>
                                </div>
                              )}
                              {employee.dateOfJoining && (
                                <div className="flex items-center space-x-1">
                                  <User className="w-3 h-3" />
                                  <span>
                                    Joined:{" "}
                                    {new Date(
                                      employee.dateOfJoining
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                {!loading && employees.length > 0 && getTotalPages() > 1 && (
                  <div className="px-4 py-3 border-t border-yellow-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(currentPage * itemsPerPage, employees.length)}{" "}
                        of {employees.length} records
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>

                        <div className="flex items-center space-x-1">
                          {Array.from(
                            { length: getTotalPages() },
                            (_, i) => i + 1
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                currentPage === page
                                  ? "bg-yellow-500 text-white"
                                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === getTotalPages()}
                          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="p-4 bg-white border border-yellow-200 shadow-sm rounded-xl">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900">
                  <Plus className="w-4 h-4 text-yellow-600" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    onClick={() => setShowAddModal(true)}
                    className="w-full text-sm text-white bg-yellow-600 hover:bg-yellow-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment
                  </Button>
                  <Button
                    onClick={() => setActiveNavItem("dashboard")}
                    variant="outline"
                    className="w-full text-sm text-yellow-700 border-yellow-200 hover:bg-yellow-50"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Visit Dashboard
                  </Button>
                </div>
              </div>

              {/* How It Works */}
              <div className="p-4 bg-white border border-yellow-200 shadow-sm rounded-xl">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900">
                  <Activity className="w-4 h-4 text-yellow-600" />
                  How It Works
                </h3>
                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-yellow-700">
                        1
                      </span>
                    </div>
                    <p>
                      Add employee payment details with required information
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-yellow-700">
                        2
                      </span>
                    </div>
                    <p>Track payment status and current month payments</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-yellow-700">
                        3
                      </span>
                    </div>
                    <p>Filter and search through payment records easily</p>
                  </div>
                </div>
              </div>

              {/* Payment Stats */}
              <div className="p-4 bg-white border border-yellow-200 shadow-sm rounded-xl">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900">
                  <TrendingUp className="w-4 h-4 text-yellow-600" />
                  Payment Stats ({getCurrentMonth()})
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Total Amount (this month):
                    </span>
                    <span className="font-medium">
                      ₹{getCurrentMonthStats().totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Total Paid (this month):
                    </span>
                    <span className="font-medium text-green-600">
                      ₹{getCurrentMonthStats().totalPaid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Total Pending (this month):
                    </span>
                    <span className="font-medium text-yellow-600">
                      ₹{getCurrentMonthStats().totalPending.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="relative w-full max-w-4xl mx-auto transition-all transform bg-white rounded-lg shadow-xl">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Plus className="w-5 h-5 text-yellow-600" />
                    Add Employee Payment Details
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="modal-employeeName"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Employee Name *
                    </Label>
                    <Input
                      id="modal-employeeName"
                      type="text"
                      value={formData.employeeName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          employeeName: e.target.value,
                        }))
                      }
                      placeholder="Full Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="modal-employeeEmail"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Employee Email *
                    </Label>
                    <Input
                      id="modal-employeeEmail"
                      type="email"
                      value={formData.employeeEmail}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          employeeEmail: e.target.value,
                        }))
                      }
                      placeholder="employee@company.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="modal-modeOfPayment"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Mode of Payment *
                    </Label>
                    <Select
                      value={formData.modeOfPayment}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          modeOfPayment: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                        <SelectValue placeholder="Select payment mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank Transfer">
                          Bank Transfer
                        </SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                        <SelectItem value="PayPal">PayPal</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="modal-paymentAmount"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Payment Amount *
                    </Label>
                    <Input
                      id="modal-paymentAmount"
                      type="number"
                      value={formData.paymentAmount}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentAmount: e.target.value,
                        }))
                      }
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label
                      htmlFor="modal-dateOfPayment"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Due Date (Monthly Payment Date) *
                    </Label>
                    <Input
                      id="modal-dateOfPayment"
                      type="date"
                      value={formData.dateOfPayment}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dateOfPayment: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end px-6 py-4 space-x-3 bg-gray-50">
                <Button
                  onClick={() => setShowAddModal(false)}
                  variant="outline"
                  className="px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddEmployee}
                  disabled={isSubmitting}
                  className="px-6 py-2 text-white bg-yellow-600 hover:bg-yellow-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Employee
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Status Toggle Modal */}
      {showStatusModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative w-full max-w-md mx-auto transition-all transform bg-white shadow-xl rounded-xl">
              <div className="px-6 py-6 bg-white">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Update Payment Status
                  </h3>
                  <button
                    onClick={() => {
                      setShowStatusModal(false);
                      setSelectedEmployee(null);
                    }}
                    className="text-gray-400 transition-colors hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-5">
                  <div className="p-4 mb-4 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Employee</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedEmployee.employeeName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Amount</span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{selectedEmployee.paymentAmount?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Method</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedEmployee.modeOfPayment}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="mb-3 text-sm font-medium text-gray-700">
                    Select new status:
                  </p>

                  <button
                    onClick={() => handlePaymentStatusUpdate("pending")}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 text-sm rounded-lg border transition-all ${
                      selectedEmployee.currentMonthPaymentStatus === "pending"
                        ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                        : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 text-gray-700"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => handlePaymentStatusUpdate("paid")}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 text-sm rounded-lg border transition-all ${
                      selectedEmployee.currentMonthPaymentStatus === "paid"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Paid
                  </button>
                </div>

                {isSubmitting && (
                  <div className="flex items-center justify-center mt-4">
                    <div className="w-4 h-4 mr-2 border-2 border-yellow-600 rounded-full border-t-transparent animate-spin"></div>
                    <span className="text-sm text-gray-600">
                      Updating status...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative w-full max-w-md mx-auto transition-all transform bg-white shadow-xl rounded-xl">
              <div className="px-6 py-6 bg-white">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete Payment Record
                  </h3>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedEmployee(null);
                    }}
                    className="text-gray-400 transition-colors hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-5">
                  <div className="p-4 mb-4 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Employee</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedEmployee.employeeName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Amount</span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{selectedEmployee.paymentAmount?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span
                        className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          selectedEmployee.currentMonthPaymentStatus === "paid"
                            ? "text-emerald-700 bg-emerald-100"
                            : "text-yellow-700 bg-yellow-100"
                        }`}
                      >
                        {selectedEmployee.currentMonthPaymentStatus
                          ?.charAt(0)
                          .toUpperCase() +
                          selectedEmployee.currentMonthPaymentStatus?.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mb-5 text-sm text-center text-gray-600">
                  This action cannot be undone. The payment record will be
                  permanently removed.
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedEmployee(null);
                    }}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteEmployee}
                    disabled={isSubmitting}
                    className="flex items-center justify-center flex-1 px-4 py-3 space-x-2 text-sm font-medium text-white transition-colors bg-red-600 border border-transparent rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const WorkspaceDocuments = ({
  user,
  setActiveNavItem,
  setActiveWorkspaceItem,
}) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentStats, setDocumentStats] = useState({
    total: 0,
    nda: 0,
    offerLetter: 0,
    other: 0,
  });
  const [filters, setFilters] = useState({
    status: "all",
    documentType: "all",
    employeeName: "",
    employeeEmail: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDocuments: 0,
    documentsPerPage: 6,
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch document stats (all documents for stats calculation)
  const fetchDocumentStats = async () => {
    try {
      const token = getAuthToken();
      const userEmail = user?.email;

      if (!token || !userEmail) {
        console.log("No token or user email for stats fetch");
        return;
      }

      console.log("=== FETCHING DOCUMENT STATS ===");

      // Use the same approach as the main API but with a larger limit
      // Let's try with 50 first (which should work based on the main API)
      const params = new URLSearchParams({
        page: "1",
        limit: "50", // Use a reasonable limit that we know works
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      const apiUrl = `https://paperly-backend-five.vercel.app/api/adminDocumentUpload?${params}`;
      console.log("Stats API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Stats response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Stats API Response:", data);

        if (data.success && data.data.documents) {
          const allDocs = data.data.documents;
          console.log("Documents for stats:", allDocs.length);
          console.log("Sample documents:", allDocs.slice(0, 3));

          const stats = {
            total: allDocs.length,
            nda: allDocs.filter((doc) => doc.documentType === "NDA").length,
            offerLetter: allDocs.filter(
              (doc) => doc.documentType === "Offer Letter"
            ).length,
            other: allDocs.filter(
              (doc) =>
                doc.documentType === "Other" ||
                doc.documentType === "Salary Letter" ||
                doc.documentType === "Onboarding Letter"
            ).length,
          };

          console.log("Calculated stats from documents:", stats);
          setDocumentStats(stats);
        } else {
          console.log("No documents found in stats response");
        }
      } else {
        console.error("Stats API error:", response.status, response.statusText);
        const errorText = await response.text();
        console.error("Error response:", errorText);
      }
    } catch (err) {
      console.error("Error fetching document stats:", err);
    }
  };

  // Fetch documents from API
  const fetchDocuments = async (page = 1) => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Get user email for filtering
      const userEmail = user?.email;
      console.log("=== DOCUMENTS API DEBUG ===");
      console.log("User data:", user);
      console.log("User email:", userEmail);
      
      if (!userEmail) {
        throw new Error("User email not found. Please log in again.");
      }

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.documentsPerPage.toString(),
        sortBy,
        sortOrder,
      });

      if (filters.status && filters.status !== "all")
        params.append("status", filters.status);
      if (filters.documentType && filters.documentType !== "all")
        params.append("documentType", filters.documentType);
      if (filters.employeeName)
        params.append("employeeName", filters.employeeName);
      if (filters.employeeEmail)
        params.append("employeeEmail", filters.employeeEmail);

      const apiUrl = `https://paperly-backend-five.vercel.app/api/adminDocumentUpload?${params}`;
      console.log("API URL:", apiUrl);
      console.log("Request headers:", {
        Authorization: `Bearer ${token.substring(0, 20)}...`,
        "Content-Type": "application/json",
      });
      console.log("Query parameters:", Object.fromEntries(params.entries()));

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(
          `Failed to fetch documents: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("API Response data:", data);
      
      if (data.success) {
        console.log("Documents received:", data.data.documents?.length || 0);
        console.log("Pagination info:", data.data.pagination);
        console.log("Sample document:", data.data.documents?.[0]);
        setDocuments(data.data.documents || []);
        setPagination({
          currentPage: data.data.pagination.currentPage,
          totalPages: data.data.pagination.totalPages,
          totalDocuments: data.data.pagination.totalDocuments,
          documentsPerPage: data.data.pagination.documentsPerPage,
        });

        // Always fetch stats separately to ensure we get ALL documents
        // The main API only returns paginated results, so we need a separate call for stats
        fetchDocumentStats();
      } else {
        console.error("API returned success: false:", data);
        throw new Error(data.error || "Failed to fetch documents");
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load documents on component mount and when user changes
  useEffect(() => {
    console.log("=== DOCUMENTS COMPONENT DEBUG ===");
    console.log("User available:", !!user?.email);
    console.log("Current filters:", filters);
    console.log("Current sort:", { sortBy, sortOrder });
    
    if (user?.email) {
      console.log("Fetching documents...");
      fetchDocuments();
    } else {
      console.log("User email not available, skipping fetch");
    }
  }, [user, filters, sortBy, sortOrder]);

  // Load document stats on component mount
  useEffect(() => {
    if (user?.email) {
      fetchDocumentStats();
    }
  }, [user]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchDocuments(page);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Sent":
        return "bg-blue-100 text-blue-800";
      case "Signed":
        return "bg-green-100 text-green-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get document type icon
  const getDocumentIcon = (type) => {
    switch (type) {
      case "Offer Letter":
        return "📄";
      case "Salary Letter":
        return "💰";
      case "Onboarding Letter":
        return "👋";
      case "NDA":
        return "🔒";
      default:
        return "📋";
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
        {/* Header */}
      <div className="px-4 py-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="flex items-center gap-2 mb-1 text-xl font-semibold text-gray-900">
                <FileText className="w-5 h-5 text-yellow-600" />
                Documents
          </h1>
              <p className="text-sm text-gray-600">
                Manage and track all your team documents
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>Powered by Paprly</span>
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="px-4 pb-8 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Main Content */}
            <div className="space-y-4 lg:col-span-3">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="p-4 transition-all duration-200 bg-white border border-yellow-200 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-center justify-between">
              <div>
                      <p className="text-xs font-medium text-gray-600">Total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {documentStats.total}
                      </p>
              </div>
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <FileText className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                </div>
                <div className="p-4 transition-all duration-200 bg-white border border-yellow-200 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-center justify-between">
            <div>
                      <p className="text-xs font-medium text-gray-600">NDA</p>
                      <p className="text-xl font-bold text-gray-900">
                        {documentStats.nda}
                      </p>
            </div>
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Shield className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                </div>
                <div className="p-4 transition-all duration-200 bg-white border border-yellow-200 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-center justify-between">
            <div>
                      <p className="text-xs font-medium text-gray-600">
                        Offer Letter
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        {documentStats.offerLetter}
                      </p>
            </div>
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Briefcase className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                </div>
                <div className="p-4 transition-all duration-200 bg-white border border-yellow-200 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-center justify-between">
            <div>
                      <p className="text-xs font-medium text-gray-600">Other</p>
                      <p className="text-xl font-bold text-gray-900">
                        {documentStats.other}
                      </p>
                    </div>
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <FileText className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div className="p-4 bg-white border border-yellow-200 shadow-sm rounded-xl">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <Input
                      placeholder="Search by document title or employee..."
                      value={filters.employeeName}
                onChange={(e) => {
                        const value = e.target.value;
                        setFilters((prev) => ({
                          ...prev,
                          employeeName: value,
                        }));
                      }}
                      className="pl-10 text-sm border-yellow-200 bg-yellow-50 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="sm:w-40">
                    <Select
                      value={filters.documentType}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          documentType: value,
                        }))
                      }
                    >
                      <SelectTrigger className="text-sm border-yellow-200 bg-yellow-50 focus:border-yellow-500 focus:ring-yellow-500">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Document Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Offer Letter">
                          Offer Letter
                        </SelectItem>
                        <SelectItem value="Salary Letter">
                          Salary Letter
                        </SelectItem>
                        <SelectItem value="Onboarding Letter">
                          Onboarding Letter
                        </SelectItem>
                        <SelectItem value="NDA">NDA</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
            </div>
                  <Button
                onClick={() => {
                  setFilters({
                        status: "all",
                        documentType: "all",
                        employeeName: "",
                        employeeEmail: "",
                      });
                      setSortBy("createdAt");
                      setSortOrder("desc");
                    }}
                    className="px-4 py-2 font-medium text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 hover:shadow-lg"
                  >
                    Apply Filters
                  </Button>
            </div>
        </div>

              {/* Documents List */}
              <div className="space-y-3">
          {!user?.email ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading user data...</p>
              </div>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading documents...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                        <svg
                          className="w-6 h-6 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                  </svg>
                </div>
                <p className="mb-2 text-gray-600">{error}</p>
                <button
                  onClick={() => fetchDocuments()}
                  className="px-4 py-2 text-white transition-colors bg-yellow-600 rounded-md hover:bg-yellow-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : documents.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
                  <span className="text-2xl">📄</span>
                </div>
                      <h3 className="mb-2 text-lg font-medium text-gray-900">
                        No documents found
                      </h3>
                      <p className="text-gray-600">
                        You have not created any documents yet.
                      </p>
              </div>
            </div>
          ) : (
            <>
                      {documents.map((document) => (
                      <div
                        key={document.id}
                        className="p-4 transition-all duration-200 bg-white border border-yellow-200 shadow-sm rounded-xl hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1 gap-4">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                              <FileText className="w-5 h-5 text-yellow-600" />
                          </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm font-semibold text-gray-900 truncate">
                                  {document.documentTitle}
                                </h3>
                                <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                                  {document.documentType}
                          </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>{document.employeeName}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  <span>{document.employeeEmail}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>
                          {formatDate(document.dates.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={document.supabaseLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              View
                            </a>
                          </div>
              </div>
                      </div>
                    ))}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                      <div className="px-4 py-3 bg-white border-t border-yellow-200 rounded-b-xl">
                  <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-600">
                            Showing{" "}
                            {(pagination.currentPage - 1) *
                              pagination.documentsPerPage +
                              1}{" "}
                            to{" "}
                            {Math.min(
                              pagination.currentPage *
                                pagination.documentsPerPage,
                              pagination.totalDocuments
                            )}{" "}
                            of {pagination.totalDocuments} documents
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                              onClick={() =>
                                handlePageChange(pagination.currentPage - 1)
                              }
                        disabled={pagination.currentPage === 1}
                              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>

                            <div className="flex items-center space-x-1">
                              {Array.from(
                                { length: pagination.totalPages },
                                (_, i) => i + 1
                              ).map((page) => (
                      <button
                                  key={page}
                                  onClick={() => handlePageChange(page)}
                                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                    pagination.currentPage === page
                                      ? "bg-yellow-500 text-white"
                                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                                  }`}
                                >
                                  {page}
                                </button>
                              ))}
                            </div>

                            <button
                              onClick={() =>
                                handlePageChange(pagination.currentPage + 1)
                              }
                              disabled={
                                pagination.currentPage === pagination.totalPages
                              }
                              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

            {/* Right Sidebar */}
            <div className="space-y-4 lg:col-span-1">
              {/* Quick Actions */}
              <div className="p-4 bg-white border border-yellow-200 shadow-sm rounded-xl">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900">
                  <Settings className="w-4 h-4 text-yellow-600" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setActiveNavItem("workspace");
                      setActiveWorkspaceItem("track");
                    }}
                    className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 transition-colors border border-yellow-200 rounded-lg bg-yellow-50 hover:bg-yellow-100"
                  >
                    <Activity className="w-4 h-4" />
                    Track Documents
                  </button>
                  <button
                    onClick={() => setActiveNavItem("dashboard")}
                    className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 transition-colors border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <TrendingUp className="w-4 h-4" />
                    View Dashboard
                  </button>
                </div>
              </div>

              {/* How It Works */}
              <div className="p-4 bg-white border border-yellow-200 shadow-sm rounded-xl">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900">
                  <Activity className="w-4 h-4 text-yellow-600" />
                  How It Works
                </h3>
                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-yellow-600">
                        1
                      </span>
                    </div>
                    <p>Create and upload documents for your team members</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-yellow-600">
                        2
                      </span>
                    </div>
                    <p>Send documents for electronic signature</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-yellow-600">
                        3
                      </span>
                    </div>
                    <p>Track status and manage signed documents</p>
                  </div>
                </div>
              </div>

              {/* Document Stats */}
              <div className="p-4 bg-white border border-yellow-200 shadow-sm rounded-xl">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900">
                  <FileText className="w-4 h-4 text-yellow-600" />
                  Document Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Total</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {documentStats.total}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">NDA</span>
                    <span className="text-sm font-semibold text-yellow-600">
                      {documentStats.nda}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Offer Letter</span>
                    <span className="text-sm font-semibold text-yellow-600">
                      {documentStats.offerLetter}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Other</span>
                    <span className="text-sm font-semibold text-yellow-600">
                      {documentStats.other}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
  );
};

const WorkspaceTrack = () => {
  return (
    <div className="w-full bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] flex-1 lg:ml-0">
      <div className="px-4 py-6 pt-16 sm:px-6 lg:px-8 sm:py-8 lg:py-12 lg:pt-12">
        <div className="w-full p-4 sm:p-6 lg:p-10 rounded-[10px] bg-[#FFF3BBB0]">
          <h1 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
            Track
          </h1>
          <p className="text-sm text-gray-700 sm:text-base">
            Tracking functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default function EnterpriseDynamicLayout() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("home");
  const [activeWorkspaceItem, setActiveWorkspaceItem] = useState("quick-hire");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      const token = getAuthToken();
      const userData = getUserData();
      
      if (token && userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  // Load profile data from API when user changes
  useEffect(() => {
    const loadProfileData = async () => {
      if (user?.email) {
        try {
          setIsLoading(true);
          // Fetch existing profile data from API
          const response = await fetch(
            `https://paperly-backend-five.vercel.app/api/enterprise-profile?email=${encodeURIComponent(
              user.email
            )}`,
            {
              method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.profile) {
              setProfileData(data.profile);
            } else {
              setError("No profile data found");
            }
          } else if (response.status === 404) {
            setError("Profile not found. Please complete your profile first.");
          } else {
            console.error(
              "Error fetching profile:",
              response.status,
              response.statusText
            );
            setError("Failed to load profile data");
          }
        } catch (error) {
          console.error("Error loading profile data:", error);
          setError(
            "Network error. Please check your connection and try again."
          );
        } finally {
          setIsLoading(false);
        }
      } else if (user === null) {
        // User data is loaded but no user found
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    
    if (user !== undefined) {
      loadProfileData();
    } 
  }, [user]);

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
    setSidebarOpen(false); // Close sidebar on mobile after selection
    
    // Handle logout
    if (item === "logout") {
      logout();
    }
  };

  // Handle workspace item selection from sidebar
  const handleWorkspaceItemSelect = (item) => {
    setActiveWorkspaceItem(item);
    setActiveNavItem("workspace");
  };

  // Render the appropriate component based on activeNavItem and activeWorkspaceItem
  const renderContent = () => {
    if (activeNavItem === "workspace") {
      switch (activeWorkspaceItem) {
        case "quick-hire":
          return <EnterpriseWorkspace user={user} profileData={profileData} />;
        case "my-employees":
          return (
            <MyEmployeesFreelancers
              setActiveNavItem={setActiveNavItem}
              setActiveWorkspaceItem={setActiveWorkspaceItem}
            />
          );
        case "payments":
          return <WorkspacePayments />;
        case "drafts":
          return (
            <WorkspaceDocuments
              user={user}
              setActiveNavItem={setActiveNavItem}
              setActiveWorkspaceItem={setActiveWorkspaceItem}
            />
          );
        case "track":
          return <WorkspaceTrack />;
        default:
          return <EnterpriseWorkspace user={user} profileData={profileData} />;
      }
    }

    switch (activeNavItem) {
      case "home":
        return (
          <HomeDashboard
            user={user}
            profileData={profileData}
            setActiveNavItem={setActiveNavItem}
            setActiveWorkspaceItem={setActiveWorkspaceItem}
          />
        );
      case "dashboard":
        return <Dashboard />;
      case "edit-profile":
        return <EnterpriseEditProfile />;
         case "Userpayments": 
      return <PaymentsPage />;
      default:
        return (
          <HomeDashboard
            user={user}
            profileData={profileData}
            setActiveNavItem={setActiveNavItem}
            setActiveWorkspaceItem={setActiveWorkspaceItem}
          />
        );
    }
  };

  // Show loading if user data is not yet loaded
  if (!user && !isAuthenticated && isLoading) {
    return (
      <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
        <div className="px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-2">
                <div className="w-64 h-8 bg-yellow-100 rounded-lg animate-pulse"></div>
                <div className="w-48 h-4 bg-yellow-100 rounded-lg animate-pulse"></div>
              </div>
              <div className="flex gap-3">
                <div className="w-24 h-10 bg-yellow-100 rounded-lg animate-pulse"></div>
                <div className="w-24 h-10 bg-yellow-100 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="px-6 mb-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-white border border-yellow-200 rounded-lg shadow-sm"
                >
                  <div className="w-16 h-8 mb-2 bg-yellow-100 rounded-lg animate-pulse"></div>
                  <div className="w-24 h-4 bg-yellow-100 rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="px-6 pb-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Main Content Skeleton */}
              <div className="space-y-6 lg:col-span-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="p-6 bg-white border border-yellow-200 rounded-lg shadow-sm"
                  >
                    <div className="w-48 h-6 mb-4 bg-yellow-100 rounded-lg animate-pulse"></div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {[1, 2, 3, 4, 5, 6].map((j) => (
                        <div key={j} className="space-y-2">
                          <div className="w-24 h-3 bg-yellow-100 rounded-lg animate-pulse"></div>
                          <div className="h-12 bg-yellow-100 rounded-lg animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar Skeleton */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-4 bg-white border border-yellow-200 rounded-lg shadow-sm"
                  >
                    <div className="w-32 h-4 mb-3 bg-yellow-100 rounded-lg animate-pulse"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div
                          key={j}
                          className="h-3 bg-yellow-100 rounded-lg animate-pulse"
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no user data after loading, redirect to login
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <p className="mb-4 text-gray-600">
            No user data found. Please log in.
          </p>
          <button 
            onClick={() => (window.location.href = "/sign-in")}
            className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show loading while profile data is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  // Show error if profile data failed to load
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <p className="mb-4 text-gray-600">{error}</p>
          <button 
            onClick={() => setActiveNavItem("edit-profile")}
            className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Go to Profile Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <EnterpriseNavbar />
      
      {/* Top Separator Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
      
      {/* Main Content Area with Sidebar */}
      <div className="relative flex min-h-screen bg-gray-50">
        <Sidebar
          activeNavItem={activeNavItem}
          onNavItemClick={handleNavItemClick}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
          profileData={profileData}
          onWorkspaceItemSelect={handleWorkspaceItemSelect}
          activeWorkspaceItem={activeWorkspaceItem}
        />

        {/* Dynamic Content Area */}
        {renderContent()}
      </div>
      
      {/* Bottom Separator Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
      
      <Footer />
    </>
  );
}

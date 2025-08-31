"use client"

import { useState, useEffect } from "react"
import { getAuthToken, getUserData, logout } from "@/utils/auth"
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
  Briefcase
} from "lucide-react"
import EnterpriseNavbar from "@/components/enterprise-components/enterprise-navbar"
import Sidebar from "@/components/enterprise-components/sidebar"
import Footer from "@/components/enterprise-components/enterprise-footer"
import EnterpriseWorkspace from "@/components/enterprise-components/enterprise-workspace"
import EnterpriseEditProfile from "@/components/enterprise-components/enterprise-editprofile"
import MyEmployeesFreelancers from "@/components/enterprise-components/workspace_myemployee_freelancer"


// Home Dashboard Component
const HomeDashboard = ({ user, profileData, setActiveNavItem, setActiveWorkspaceItem }) => {
  return (
    <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
      {/* Header */}
      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <User className="w-6 h-6 text-yellow-600" />
                Welcome back, {profileData?.fullName || user?.name || 'User'}
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Activity className="w-4 h-4 text-yellow-500" />
                Manage your Team Documentation and Payments all at one place              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setActiveNavItem("workspace");
                  setActiveWorkspaceItem("quick-hire");
                }}
                className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
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
      <div className="px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Active Documents', value: '24', icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-100' },
              { title: 'Team Members', value: '12', icon: Users, color: 'text-green-600', bgColor: 'bg-green-100' },
              { title: 'Pending Reviews', value: '8', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
              { title: 'Completed This Month', value: '156', icon: CheckCircle, color: 'text-purple-600', bgColor: 'bg-purple-100' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200 hover:border-yellow-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
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
      <div className="px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-yellow-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-yellow-600" />
                  Company Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
              <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <Building className="w-3 h-3 text-yellow-500" />
                        Company Name
                      </label>
                      <div className="bg-[#fefce8] rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">{profileData?.companyName || 'Not specified'}</p>
                      </div>
              </div>
              <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-yellow-500" />
                        Company Type
                      </label>
                      <div className="bg-[#fefce8] rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">{profileData?.companyType || 'Not specified'}</p>
                      </div>
              </div>
                    <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-yellow-500" />
                        Industry
                      </label>
                      <div className="bg-[#fefce8] rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">{profileData?.industry || 'Not specified'}</p>
                      </div>
                    </div>
            </div>

                  <div className="space-y-3">
                                        <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-yellow-500" />
                        GST Number
                      </label>
                      <div className="bg-[#fefce8] rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">{profileData?.gstNumber || 'Not specified'}</p>
                      </div>
                    </div>
              <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-yellow-500" />
                        Registered Address
                      </label>
                      <div className="bg-yellow-50 rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">{profileData?.registeredAddress || 'Not specified'}</p>
                </div>
              </div>
              <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-yellow-500" />
                        Contact Email
                      </label>
                      <div className="bg-yellow-50 rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">{profileData?.email || user?.email || 'Not specified'}</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>

              {/* Preferences */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-yellow-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-yellow-600" />
                  Preferences & Settings
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
              <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <IndianRupee className="w-3 h-3 text-yellow-500" />
                        Default Currency
                      </label>
                      <div className="bg-yellow-50 rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">{profileData?.defaultCurrency || 'Not specified'}</p>
                      </div>
              </div>
              <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-yellow-500" />
                        Payment Cycle
                      </label>
                      <div className="bg-yellow-50 rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">{profileData?.defaultPaymentCycle || 'Not specified'}</p>
              </div>
            </div>
          </div>

                  <div className="space-y-3">
              <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <User className="w-3 h-3 text-yellow-500" />
                        Preferred Language
                      </label>
                      <div className="bg-yellow-50 rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">{profileData?.preferredLanguage || 'Not specified'}</p>
                </div>
              </div>
              <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-yellow-500" />
                        Signature Style
                      </label>
                      <div className="bg-yellow-50 rounded-md p-3 border border-yellow-200">
                        <p className="text-sm text-gray-900">{profileData?.defaultSignatureStyle || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-yellow-600" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  {[
                    { 
                      label: 'Manage Team', 
                      description: 'View and manage your teams',
                      icon: Users,
                      action: () => {
                        setActiveNavItem("workspace");
                        setActiveWorkspaceItem("my-employees");
                      }
                    },
                    { 
                      label: 'Documents', 
                      description: 'View and manage your documents',
                      icon: FileText,
                      action: () => {
                        setActiveNavItem("workspace");
                        setActiveWorkspaceItem("drafts");
                      }
                    },
                    { 
                      label: 'Profile', 
                      description: 'Update and edit your company profile',
                      icon: User,
                      action: () => setActiveNavItem("edit-profile")
                    }
                  ].map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={action.action}
                        className="w-full text-left p-2 rounded-md hover:bg-yellow-50 transition-colors text-xs text-gray-700 flex items-center gap-2"
                      >
                        <Icon className="w-3 h-3 text-yellow-500" />
                        <div className="flex-1 text-left">
                          <div className="font-medium">{action.label}</div>
                          <div className="text-xs text-gray-500">{action.description}</div>
                        </div>
                      </button>
                    );
                  })}
                  
                  {/* Logout button - smaller and separated */}
                  <div className="pt-2 border-t border-yellow-200">
                    <button
                      onClick={() => {
                        logout();
                        window.location.href = '/sign-in';
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
              <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-yellow-600" />
                  Enterprise Features
                </h3>
                <div className="space-y-3">
              <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700">Onboarding Kit</span>
                    <div className={`w-10 h-5 rounded-full transition-colors ${
                      profileData?.enableOneClickOnboardingKit ? 'bg-yellow-500' : 'bg-gray-200'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                        profileData?.enableOneClickOnboardingKit ? 'translate-x-5' : 'translate-x-0.5'
                      }`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700">Timestamp Proof</span>
                    <div className={`w-10 h-5 rounded-full transition-colors ${
                      profileData?.enableDocumentTimestampProof ? 'bg-yellow-500' : 'bg-gray-200'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                        profileData?.enableDocumentTimestampProof ? 'translate-x-5' : 'translate-x-0.5'
                      }`}></div>
                </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  Recent Activity
                </h3>
                <div className="space-y-2">
                  {[
                    { action: 'Document signed', time: '2 hours ago' },
                    { action: 'Team member added', time: '1 day ago' },
                    { action: 'Payment processed', time: '2 days ago' },
                    { action: 'Document created', time: '3 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-700">{activity.action}</p>
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
  )
}

// Dashboard Component (placeholder)
const Dashboard = () => {
  return (
    <div className="w-full bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] flex-1 lg:ml-0">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pt-16 lg:pt-12">
        <div className="w-full p-4 sm:p-6 lg:p-10 rounded-[10px] bg-[#FFF3BBB0]">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
            Dashboard functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

// Workspace Components
const WorkspacePayments = () => {
  return (
    <div className="w-full bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] flex-1 lg:ml-0">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pt-16 lg:pt-12">
        <div className="w-full p-4 sm:p-6 lg:p-10 rounded-[10px] bg-[#FFF3BBB0]">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Payments
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
            Payment management functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

const WorkspaceDrafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    documentType: '',
    employeeName: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDocuments: 0,
    documentsPerPage: 10
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');


  // Fetch drafts from API
  const fetchDrafts = async (page = 1) => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.documentsPerPage.toString(),
        sortBy,
        sortOrder,
        status: 'Draft'
      });

      if (filters.documentType) params.append('documentType', filters.documentType);
      if (filters.employeeName) params.append('employeeName', filters.employeeName);

      const response = await fetch(`https://paperly-backend-five.vercel.app/api/adminDocumentUpload?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch drafts');
      }

      const data = await response.json();
      
      if (data.success) {
        setDrafts(data.data.documents);
        setPagination({
          currentPage: data.data.pagination.currentPage,
          totalPages: data.data.pagination.totalPages,
          totalDocuments: data.data.pagination.totalDocuments,
          documentsPerPage: data.data.pagination.documentsPerPage
        });
      } else {
        throw new Error(data.error || 'Failed to fetch drafts');
      }
    } catch (err) {
      console.error('Error fetching drafts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load drafts on component mount
  useEffect(() => {
    fetchDrafts();
  }, [filters, sortBy, sortOrder]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchDrafts(page);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };



  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Signed': return 'bg-green-100 text-green-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get document type icon
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'Offer Letter': return '📄';
      case 'Salary Letter': return '💰';
      case 'Onboarding Letter': return '👋';
      case 'NDA': return '🔒';
      default: return '📋';
    }
  };

  return (
    <div className="w-full bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] flex-1 lg:ml-0">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pt-16 lg:pt-12">
        {/* Header */}
        <div className="w-full p-4 sm:p-6 lg:p-10 rounded-[10px] bg-[#FFF3BBB0] mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Draft Documents
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
                Manage and track your document drafts
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>{pagination.totalDocuments} draft{pagination.totalDocuments !== 1 ? 's' : ''} found</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
              <select
                value={filters.documentType}
                onChange={(e) => handleFilterChange('documentType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Offer Letter">Offer Letter</option>
                <option value="Salary Letter">Salary Letter</option>
                <option value="Onboarding Letter">Onboarding Letter</option>
                <option value="NDA">NDA</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
              <input
                type="text"
                placeholder="Search by employee name..."
                value={filters.employeeName}
                onChange={(e) => handleFilterChange('employeeName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="documentTitle-asc">Title A-Z</option>
                <option value="documentTitle-desc">Title Z-A</option>
                <option value="employeeName-asc">Employee A-Z</option>
                <option value="employeeName-desc">Employee Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading drafts...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 mb-2">{error}</p>
                <button
                  onClick={() => fetchDrafts()}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : drafts.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts found</h3>
                <p className="text-gray-600">You have not created any draft documents yet.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Drafts Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {drafts.map((draft) => (
                      <tr key={draft.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{draft.documentTitle}</div>
                            <div className="text-sm text-gray-500">{draft.documentType}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{draft.employeeName}</div>
                            <div className="text-sm text-gray-500">{draft.employeeEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(draft.status)}`}>
                            {draft.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(draft.dates.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <a
                              href={draft.supabaseLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-yellow-600 hover:text-yellow-900 transition-colors"
                            >
                              View
                            </a>
                            <button
                              onClick={() => window.open(draft.supabaseLink, '_blank')}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                            >
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="bg-white px-6 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing {((pagination.currentPage - 1) * pagination.documentsPerPage) + 1} to{' '}
                      {Math.min(pagination.currentPage * pagination.documentsPerPage, pagination.totalDocuments)} of{' '}
                      {pagination.totalDocuments} results
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      <span className="px-3 py-1 text-sm text-gray-700">
                        Page {pagination.currentPage} of {pagination.totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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


    </div>
  );
};

const WorkspaceTrack = () => {
  return (
    <div className="w-full bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] flex-1 lg:ml-0">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pt-16 lg:pt-12">
        <div className="w-full p-4 sm:p-6 lg:p-10 rounded-[10px] bg-[#FFF3BBB0]">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Track
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
            Tracking functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

export default function EnterpriseDynamicLayout() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState("home")
  const [activeWorkspaceItem, setActiveWorkspaceItem] = useState("quick-hire")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [profileData, setProfileData] = useState(null)
  const [error, setError] = useState(null)

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      const token = getAuthToken()
      const userData = getUserData()
      
      if (token && userData) {
        setUser(userData)
        setIsAuthenticated(true)
      } else {
        setIsLoading(false)
      }
    }
    
    loadUserData()
  }, [])

  // Load profile data from API when user changes
  useEffect(() => {
    const loadProfileData = async () => {
      if (user?.email) {
        try {
          setIsLoading(true)
          // Fetch existing profile data from API
          const response = await fetch(`https://paperly-backend-five.vercel.app/api/enterprise-profile?email=${encodeURIComponent(user.email)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (response.ok) {
            const data = await response.json()
            if (data.profile) {
              setProfileData(data.profile)
            } else {
              setError("No profile data found")
            }
          } else if (response.status === 404) {
            setError("Profile not found. Please complete your profile first.")
          } else {
            console.error('Error fetching profile:', response.status, response.statusText)
            setError("Failed to load profile data")
          }
        } catch (error) {
          console.error('Error loading profile data:', error)
          setError("Network error. Please check your connection and try again.")
        } finally {
          setIsLoading(false)
        }
      } else if (user === null) {
        // User data is loaded but no user found
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }
    
    if (user !== undefined) {
      loadProfileData()
    } 
  }, [user])

  const handleNavItemClick = (item) => {
    setActiveNavItem(item)
    setSidebarOpen(false) // Close sidebar on mobile after selection
    
    // Handle logout
    if (item === "logout") {
      logout()
    }
  }

  // Handle workspace item selection from sidebar
  const handleWorkspaceItemSelect = (item) => {
    setActiveWorkspaceItem(item)
    setActiveNavItem("workspace")
  }

  // Render the appropriate component based on activeNavItem and activeWorkspaceItem
  const renderContent = () => {
    if (activeNavItem === "workspace") {
      switch (activeWorkspaceItem) {
        case "quick-hire":
          return <EnterpriseWorkspace user={user} profileData={profileData} />
        case "my-employees":
          return <MyEmployeesFreelancers setActiveNavItem={setActiveNavItem} setActiveWorkspaceItem={setActiveWorkspaceItem} />
        case "payments":
          return <WorkspacePayments />
        case "drafts":
          return <WorkspaceDrafts />
        case "track":
          return <WorkspaceTrack />
        default:
          return <EnterpriseWorkspace user={user} profileData={profileData} />
      }
    }

    switch (activeNavItem) {
      case "home":
        return <HomeDashboard user={user} profileData={profileData} setActiveNavItem={setActiveNavItem} setActiveWorkspaceItem={setActiveWorkspaceItem} />
      case "dashboard":
        return <Dashboard />
      case "edit-profile":
        return <EnterpriseEditProfile />
      default:
        return <HomeDashboard user={user} profileData={profileData} setActiveNavItem={setActiveNavItem} setActiveWorkspaceItem={setActiveWorkspaceItem} />
    }
  }

  // Show loading if user data is not yet loaded
  if (!user && !isAuthenticated && isLoading) {
    return (
      <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-2">
                <div className="h-8 bg-yellow-100 rounded-lg animate-pulse w-64"></div>
                <div className="h-4 bg-yellow-100 rounded-lg animate-pulse w-48"></div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 bg-yellow-100 rounded-lg animate-pulse w-24"></div>
                <div className="h-10 bg-yellow-100 rounded-lg animate-pulse w-24"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
                  <div className="h-8 bg-yellow-100 rounded-lg animate-pulse w-16 mb-2"></div>
                  <div className="h-4 bg-yellow-100 rounded-lg animate-pulse w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Skeleton */}
              <div className="lg:col-span-2 space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-yellow-200">
                    <div className="h-6 bg-yellow-100 rounded-lg animate-pulse w-48 mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((j) => (
                        <div key={j} className="space-y-2">
                          <div className="h-3 bg-yellow-100 rounded-lg animate-pulse w-24"></div>
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
                  <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
                    <div className="h-4 bg-yellow-100 rounded-lg animate-pulse w-32 mb-3"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-3 bg-yellow-100 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If no user data after loading, redirect to login
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <p className="mb-4 text-gray-600">No user data found. Please log in.</p>
          <button 
            onClick={() => window.location.href = '/sign-in'}
            className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
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
    )
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
    )
  }

  return (
    <>
      <EnterpriseNavbar />
      
      {/* Top Separator Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
      
      {/* Main Content Area with Sidebar */}
      <div className="min-h-screen bg-gray-50 flex relative">
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
  )
}

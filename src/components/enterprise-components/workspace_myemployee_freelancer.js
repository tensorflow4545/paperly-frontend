"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Eye,
  Calendar,
  Mail,
  MapPin,
  IndianRupee,
  Briefcase,
  User,
  Users,
  Plus,
  X,
  CheckCircle,
  Clock,
  FileText,
  Send,
  ChevronLeft,
  ChevronRight,
  Download,
  TrendingUp,
  Shield,
  Activity
} from "lucide-react";
import { getAuthToken } from "@/utils/auth";

export default function MyEmployeesFreelancers({ setActiveNavItem, setActiveWorkspaceItem }) {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterEmployeeType, setFilterEmployeeType] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSignedDocumentsModal, setShowSignedDocumentsModal] = useState(false);
  const [signedDocuments, setSignedDocuments] = useState([]);
  const [loadingSignedDocuments, setLoadingSignedDocuments] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  // Fetch employee data on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on search and filter
  useEffect(() => {
    let filtered = employees;

    // Filter by status
    if (filterType !== "all") {
      filtered = filtered.filter(emp => emp.status === filterType);
    }

    // Filter by employee type
    if (filterEmployeeType !== "all") {
      filtered = filtered.filter(emp => emp.employeeType === filterEmployeeType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(emp => 
        emp.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by creation date (most recent first) - using _id as proxy for creation time
    // MongoDB ObjectIds contain timestamp, so sorting by _id gives us chronological order
    filtered.sort((a, b) => {
      // If _id exists, use it for sorting (newer IDs come first)
      if (a._id && b._id) {
        return b._id.localeCompare(a._id);
      }
      // Fallback to joining date if _id is not available
      if (a.joiningDate && b.joiningDate) {
        return new Date(b.joiningDate) - new Date(a.joiningDate);
      }
      // If neither exists, maintain original order
      return 0;
    });

    setFilteredEmployees(filtered);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [employees, searchTerm, filterType, filterEmployeeType]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch("https://paperly-backend-five.vercel.app/api/employeeDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch employees");
      }

             setEmployees(result.data || []);
    } catch (err) {
      setError(err.message || "An error occurred while fetching employees");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };



  const handleDelete = async (employeeId) => {
    if (!confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(`https://paperly-backend-five.vercel.app/api/employeeDetails/${employeeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete employee");
      }

      // Refresh the list
      fetchEmployees();
    } catch (err) {
      setError(err.message || "An error occurred while deleting employee");
    }
  };

  // Handle viewing signed documents in modal
  const handleViewSignedDocuments = async (employee) => {
    try {
      setLoadingSignedDocuments(true);
      setSelectedEmployee(employee);
      
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://paperly-backend-five.vercel.app'}/api/adminDocumentUpload/signed/${encodeURIComponent(employee.emailAddress)}`;
      console.log('Fetching signed documents for:', employee.emailAddress);
      console.log('API URL:', apiUrl);
      
      // Fetch signed documents for this employee using the new route
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('API Response:', result);
      console.log('Data object:', result.data);
      console.log('Documents array:', result.data?.documents);
      console.log('Documents length:', result.data?.documents?.length);

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch signed documents");
      }

      if (result.data?.documents?.length > 0) {
        console.log('Found documents:', result.data.documents.length);
        setSignedDocuments(result.data.documents);
        setShowSignedDocumentsModal(true);
      } else {
        console.log('No documents found in response');
        
        // Try to fetch documents with different statuses as fallback
        console.log('Trying fallback: fetching all documents for this employee...');
        const fallbackResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://paperly-backend-five.vercel.app'}/api/adminDocumentUpload?employeeEmail=${encodeURIComponent(employee.emailAddress)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const fallbackResult = await fallbackResponse.json();
        console.log('Fallback response:', fallbackResult);
        console.log('Fallback documents:', fallbackResult.data?.documents);
        
        if (fallbackResult.data?.documents?.length > 0) {
          console.log('Found documents with fallback:', fallbackResult.data.documents.length);
          // Filter to show only documents that have been signed (any status that indicates completion)
          const signedDocs = fallbackResult.data.documents.filter(doc => 
            doc.status === "Signed" || 
            doc.status === "Signed and Received" || 
            doc.status === "Completed" ||
            doc.dates?.signedDate
          );
          
          if (signedDocs.length > 0) {
            console.log('Filtered signed documents:', signedDocs);
            setSignedDocuments(signedDocs);
            setShowSignedDocumentsModal(true);
          } else {
            console.log('No signed documents found after filtering');
            alert("No signed documents found for this employee.");
          }
        } else {
          alert("No documents found for this employee.");
        }
      }
    } catch (err) {
      console.error('Error fetching signed documents:', err);
      setError(err.message || "An error occurred while fetching signed documents");
    } finally {
      setLoadingSignedDocuments(false);
    }
  };

  // Handle downloading a single signed document
  const handleDownloadSignedDocument = (doc) => {
    try {
      const link = document.createElement('a');
      link.href = doc.supabaseLink;
      link.download = `signed_${doc.documentTitle || 'document'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError("Failed to download document");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

     const getEmploymentTypeColor = (type) => {
     if (!type || type === "Employee") return "bg-blue-100 text-blue-800";
     return "bg-purple-100 text-purple-800";
   };

   const getEmploymentTypeIcon = (type) => {
     if (!type || type === "Employee") return <User className="w-4 h-4" />;
     return <Users className="w-4 h-4" />;
   };

   // Dynamic status color helper
   const getStatusColor = (status) => {
     switch (status) {
       case "Signed and Received":
         return "bg-green-100 text-green-800";
       case "Document Sent":
         return "bg-blue-100 text-blue-800";
       case "Employee Added":
         return "bg-gray-100 text-gray-800";
       default:
         return "bg-yellow-100 text-yellow-800";
     }
   };

  // Timeline status helper functions
  const getTimelineStatus = (employee) => {
    // Using actual status from API response - completely dynamic
    const status = employee.status;
    
    // Define timeline steps based on possible status values from API
    const timelineSteps = [
      {
        id: "employee-added",
        title: "Employee Added",
        description: "Employee details have been added to the system",
        icon: <User className="w-4 h-4" />,
        color: "bg-green-500",
        completed: true // Always completed since employee exists in system
      },
      {
        id: "document-sent",
        title: "Document Sent",
        description: "Employment documents have been sent to the employee",
        icon: <Send className="w-4 h-4" />,
        color: "bg-blue-500",
        completed: status === "Document Sent" || status === "Signed and Received"
      },
      {
        id: "signed-received",
        title: "Signed and Received",
        description: "All documents have been signed and received",
        icon: <CheckCircle className="w-4 h-4" />,
        color: "bg-purple-500",
        completed: status === "Signed and Received"
      }
    ];

    return timelineSteps;
  };

  const getCurrentStepIndex = (employee) => {
    const status = employee.status;
    // Dynamic status mapping based on actual API values
    const statusMap = {
      "Employee Added": 0,
      "Document Sent": 1,
      "Signed and Received": 2
    };
    return statusMap[status] || 0;
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
        {/* Header Skeleton */}
        <div className="px-4 lg:px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2">
                <div className="h-6 bg-yellow-100 rounded-lg animate-pulse w-32"></div>
                <div className="h-4 bg-yellow-100 rounded-lg animate-pulse w-48"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <div className="h-3 bg-yellow-100 rounded-lg animate-pulse w-24"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="px-4 lg:px-6 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content Skeleton */}
              <div className="lg:col-span-3 space-y-4">
                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="h-3 bg-yellow-100 rounded-lg animate-pulse w-16"></div>
                          <div className="h-6 bg-yellow-100 rounded-lg animate-pulse w-12"></div>
                        </div>
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Search and Filter Skeleton */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <div className="h-10 bg-yellow-100 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-10 bg-yellow-100 rounded-lg animate-pulse w-32"></div>
                    <div className="h-10 bg-yellow-100 rounded-lg animate-pulse w-32"></div>
                  </div>
                </div>

                {/* Employee Cards Skeleton */}
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-yellow-100 rounded-lg animate-pulse w-32"></div>
                            <div className="h-3 bg-yellow-100 rounded-lg animate-pulse w-24"></div>
                            <div className="h-3 bg-yellow-100 rounded-lg animate-pulse w-20"></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 bg-yellow-100 rounded-lg animate-pulse"></div>
                          <div className="w-8 h-8 bg-yellow-100 rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-3 bg-yellow-100 rounded-lg animate-pulse w-full"></div>
                        <div className="h-3 bg-yellow-100 rounded-lg animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200">
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
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
      {/* Header */}
      <div className="px-4 lg:px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-600" />
                My Team
              </h1>
              <p className="text-sm text-gray-600">
                Manage and view all your team members in one place
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
      <div className="px-4 lg:px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4">
          {/* Error Message */}
          {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

                                {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
               <div className="flex items-center justify-between">
                 <div>
                      <p className="text-xs font-medium text-gray-600">Total Team</p>
                      <p className="text-xl font-bold text-gray-900">{employees.length}</p>
                 </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600" />
                 </div>
               </div>
             </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
               <div className="flex items-center justify-between">
                 <div>
                      <p className="text-xs font-medium text-gray-600">Employees</p>
                      <p className="text-xl font-bold text-gray-900">
                     {employees.filter(emp => emp.employeeType === "Employee").length}
                   </p>
                 </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="w-4 h-4 text-blue-600" />
                 </div>
               </div>
             </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
               <div className="flex items-center justify-between">
                 <div>
                      <p className="text-xs font-medium text-gray-600">Freelancers</p>
                      <p className="text-xl font-bold text-gray-900">
                     {employees.filter(emp => emp.employeeType === "Freelancer").length}
                   </p>
                 </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="w-4 h-4 text-purple-600" />
                 </div>
               </div>
             </div>
           </div>

          {/* Search and Filter */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
                <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 text-sm bg-yellow-50 border-yellow-200 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
                  <div className="sm:w-40">
                <Select value={filterEmployeeType} onValueChange={setFilterEmployeeType}>
                      <SelectTrigger className="text-sm bg-yellow-50 border-yellow-200 focus:border-yellow-500 focus:ring-yellow-500">
                    <User className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Employee">Employees</SelectItem>
                    <SelectItem value="Freelancer">Freelancers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                  <div className="sm:w-40">
                <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="text-sm bg-yellow-50 border-yellow-200 focus:border-yellow-500 focus:ring-yellow-500">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {Array.from(new Set(employees.map(emp => emp.status))).map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Employees List */}
              <div className="bg-white rounded-xl shadow-sm border border-yellow-200 overflow-hidden">
                <div className="p-4 border-b border-yellow-200">
                  <h2 className="text-sm font-semibold text-gray-900">
                Team Members ({filteredEmployees.length})
              </h2>
            </div>
            
            {filteredEmployees.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-900 mb-1">No team members found</h3>
                    <p className="text-xs text-gray-500">
                  {searchTerm || filterType !== "all" 
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by adding your first team member."
                  }
                </p>
              </div>
            ) : (
                  <div className="divide-y divide-yellow-100">
                {currentEmployees.map((employee) => (
                      <div key={employee._id} className="p-4 hover:bg-yellow-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg">
                              <span className="text-white font-semibold text-sm">
                            {employee.fullName?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <div className="flex-1">
                                                     <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-sm font-semibold text-gray-900">
                               {employee.fullName || "Unnamed"}
                             </h3>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                               {employee.status || "Employee Added"}
                             </span>
                           </div>
                              <div className="flex items-center space-x-3 text-xs text-gray-600">
                            {/* Employment Type Badge */}
                            {employee.employeeType && (
                              <div className="flex items-center">
                                {getEmploymentTypeIcon(employee.employeeType)}
                                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${getEmploymentTypeColor(employee.employeeType)}`}>
                                  {employee.employeeType}
                                </span>
                              </div>
                            )}
                            {(employee.role || employee.position || employee.jobTitle || employee.designation) && (
                              <div className="flex items-center">
                                    <Briefcase className="w-3 h-3 mr-1" />
                                {employee.role || employee.position || employee.jobTitle || employee.designation}
                              </div>
                            )}
                            {employee.emailAddress && (
                              <div className="flex items-center">
                                    <Mail className="w-3 h-3 mr-1" />
                                {employee.emailAddress}
                              </div>
                            )}
                            {employee.joiningDate && (
                              <div className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                Joined {formatDate(employee.joiningDate)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                          <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(employee)}
                              className="text-xs text-gray-600 hover:text-gray-900 border-yellow-200 hover:border-yellow-300"
                        >
                              <Eye className="w-3 h-3" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(employee._id)}
                              className="text-xs text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        >
                              <Trash2 className="w-3 h-3" />
                        </Button>
                        
                        {/* Signed Document Actions */}
                        {employee.status === "Signed and Received" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewSignedDocuments(employee)}
                                className="text-xs text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                            title="View Signed Documents"
                            disabled={loadingSignedDocuments}
                          >
                            {loadingSignedDocuments ? (
                              <div className="w-3 h-3 bg-yellow-200 rounded-lg animate-pulse"></div>
                            ) : (
                              <FileText className="w-3 h-3" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Compact Timeline Tracker */}
                        <div className="ml-13">
                          <div className="flex items-center space-x-4">
                        {/* Timeline Steps */}
                        {getTimelineStatus(employee).map((step, index) => (
                          <div key={step.id} className="flex items-center space-x-2">
                            {/* Step Icon */}
                                <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                              step.completed 
                                ? `${step.color} border-white shadow-sm` 
                                : 'bg-white border-gray-300'
                            }`}>
                              <div className={`${step.completed ? 'text-white' : 'text-gray-400'}`}>
                                    {step.completed ? step.icon : <Clock className="w-3 h-3" />}
                              </div>
                            </div>
                            
                            {/* Step Label */}
                            <div className="flex flex-col">
                              <span className={`text-xs font-medium ${
                                step.completed ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {step.title}
                              </span>
                              <span className={`text-xs ${
                                step.completed ? 'text-green-600' : 'text-gray-400'
                              }`}>
                                {step.completed ? '✓ Done' : 'Pending'}
                              </span>
                            </div>

                            {/* Connector Line */}
                            {index < getTimelineStatus(employee).length - 1 && (
                                  <div className={`w-4 h-0.5 ${
                                    step.completed ? 'bg-green-300' : 'bg-gray-200'
                              }`}></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

                {/* Pagination */}
          {totalPages > 1 && (
                  <div className="p-4 border-t border-yellow-200">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} results
                      </p>
                      <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                          size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                          className="text-xs border-yellow-200 hover:border-yellow-300"
              >
                          <ChevronLeft className="w-3 h-3" />
              </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(page)}
                            className={`text-xs ${
                              currentPage === page 
                                ? 'bg-yellow-600 hover:bg-yellow-700' 
                                : 'border-yellow-200 hover:border-yellow-300'
                            }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                          size="sm"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                          className="text-xs border-yellow-200 hover:border-yellow-300"
              >
                          <ChevronRight className="w-3 h-3" />
              </Button>
                      </div>
                    </div>
            </div>
          )}
        </div>
      </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-yellow-600" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button 
                    className="w-full text-xs bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white"
                    onClick={() => {
                      // Navigate to Quick Hire through sidebar
                      setActiveNavItem("workspace");
                      setActiveWorkspaceItem("quick-hire");
                    }}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add New Member
                  </Button>
                <Button
                  variant="outline"
                    className="w-full text-xs border-yellow-200 hover:border-yellow-300"
                    onClick={() => {
                      // Navigate to Dashboard through sidebar
                      setActiveNavItem("dashboard");
                    }}
                  >
                    <Activity className="w-3 h-3 mr-1" />
                    Visit Your Dashboard
                </Button>
              </div>
            </div>

              {/* Team Insights */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-yellow-600" />
                  Team Insights
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Active Members</span>
                    <span className="text-xs font-medium text-gray-900">
                      {employees.filter(emp => emp.status === "Signed and Received").length}
                  </span>
                </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Pending Documents</span>
                    <span className="text-xs font-medium text-gray-900">
                      {employees.filter(emp => emp.status !== "Signed and Received").length}
                       </span>
                   </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Recent Additions</span>
                    <span className="text-xs font-medium text-gray-900">
                      {employees.filter(emp => {
                        const joinDate = new Date(emp.joiningDate);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return joinDate > weekAgo;
                      }).length}
                    </span>
                  </div>
                 </div>
              </div>

              {/* Help & Support */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-yellow-600" />
                  Help & Support
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5"></div>
                    <p className="text-xs text-gray-600">View and manage all your employees</p>
                          </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5"></div>
                    <p className="text-xs text-gray-600">Track documents sent, received or pending</p>
                        </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5"></div>
                    <p className="text-xs text-gray-600">View signed documents by clicking the file icon</p>
                          </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5"></div>
                    <p className="text-xs text-gray-600">Use search and filters to find specific team members</p>
                          </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5"></div>
                    <p className="text-xs text-gray-600">Monitor onboarding progress with timeline indicators</p>
                        </div>
                      </div>
              </div>
            </div>
                  </div>
                </div>
              </div>

      {/* Employee Details Modal */}
      {showDetailsModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-yellow-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Employee Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
                    </div>
                    </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600">Full Name</label>
                      <p className="text-sm text-gray-900">{selectedEmployee.fullName || "Not specified"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Email</label>
                      <p className="text-sm text-gray-900">{selectedEmployee.emailAddress || "Not specified"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Role</label>
                      <p className="text-sm text-gray-900">{selectedEmployee.role || "Not specified"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Employment Type</label>
                      <p className="text-sm text-gray-900">{selectedEmployee.employeeType || "Not specified"}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Employment Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600">Joining Date</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedEmployee.joiningDate)}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Status</label>
                      <p className="text-sm text-gray-900">{selectedEmployee.status || "Employee Added"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Address</label>
                      <p className="text-sm text-gray-900">{selectedEmployee.address || "Not specified"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Salary</label>
                      <p className="text-sm text-gray-900">
                        {selectedEmployee.salary ? `₹${selectedEmployee.salary.toLocaleString()}` : "Not specified"}
                      </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className="p-6 border-t border-yellow-200 bg-gray-50">
              <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDetailsModal(false)}
                  className="text-sm border-yellow-200 hover:border-yellow-300"
              >
                Close
              </Button>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signed Documents Modal */}
      {showSignedDocumentsModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-yellow-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Signed Documents</h2>
                <button
                  onClick={() => setShowSignedDocumentsModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Signed documents for {selectedEmployee.fullName}
              </p>
            </div>
            <div className="p-6">
              {signedDocuments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">No signed documents found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {signedDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-yellow-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.documentTitle || "Document"}</p>
                          <p className="text-xs text-gray-600">
                            Signed on {doc.dates?.signedDate ? formatDate(doc.dates.signedDate) : "Unknown date"}
                          </p>
                        </div>
                      </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadSignedDocument(doc)}
                        className="text-xs border-yellow-200 hover:border-yellow-300"
                        >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                        </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-6 border-t border-yellow-200 bg-gray-50">
              <div className="flex justify-end">
              <Button
                variant="outline"
                  onClick={() => setShowSignedDocumentsModal(false)}
                  className="text-sm border-yellow-200 hover:border-yellow-300"
              >
                Close
              </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
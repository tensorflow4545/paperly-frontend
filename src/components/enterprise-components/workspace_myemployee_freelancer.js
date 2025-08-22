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
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Mail,
  MapPin,
  DollarSign,
  Briefcase,
  User,
  Users,
  Plus,
  X,
  CheckCircle,
  Clock,
  FileText,
  Send
} from "lucide-react";
import { getAuthToken } from "@/utils/auth";

export default function MyEmployeesFreelancers() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterEmployeeType, setFilterEmployeeType] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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

    setFilteredEmployees(filtered);
  }, [employees, searchTerm, filterType, filterEmployeeType]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    setError("");

    try {
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
        throw new Error(result.error || "Failed to fetch employee details");
      }

             setEmployees(result.data || []);
       console.log("Employee data:", result.data);
       console.log("Employment types:", result.data?.map(emp => emp.employmentType));
       console.log("Roles:", result.data?.map(emp => emp.role));
       console.log("Full employee objects:", result.data?.map(emp => ({ 
         name: emp.fullName, 
         role: emp.role, 
         employmentType: emp.employmentType,
         position: emp.position,
         jobTitle: emp.jobTitle,
         designation: emp.designation
       })));
    } catch (err) {
      setError(err.message || "An error occurred while fetching employee details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  const handleEdit = (employee) => {
    // TODO: Implement edit functionality
    console.log("Edit employee:", employee);
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
        icon: <User className="w-5 h-5" />,
        color: "bg-green-500",
        completed: true // Always completed since employee exists in system
      },
      {
        id: "document-sent",
        title: "Document Sent",
        description: "Employment documents have been sent to the employee",
        icon: <Send className="w-5 h-5" />,
        color: "bg-blue-500",
        completed: status === "Document Sent" || status === "Signed and Received"
      },
      {
        id: "signed-received",
        title: "Signed and Received",
        description: "All documents have been signed and received",
        icon: <CheckCircle className="w-5 h-5" />,
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
      <div className="w-full bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] flex-1 lg:ml-0">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading employees...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] flex-1 lg:ml-0">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pt-16 lg:pt-12">
        <div className="w-full p-4 sm:p-6 lg:p-10 rounded-[10px] bg-[#FFF3BBB0]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                My Employees & Freelancers
              </h1>
              <p className="text-sm sm:text-base text-gray-700">
                Manage and view all your team members in one place.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6">
              <Button className="text-white bg-yellow-600 hover:bg-yellow-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="w-full space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

                                {/* Stats Cards */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-gray-600">Total Team Members</p>
                   <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                 </div>
                 <div className="p-3 bg-blue-100 rounded-lg">
                   <Users className="w-6 h-6 text-blue-600" />
                 </div>
               </div>
             </div>
             <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-gray-600">Employees</p>
                   <p className="text-2xl font-bold text-gray-900">
                     {employees.filter(emp => emp.employeeType === "Employee").length}
                   </p>
                 </div>
                 <div className="p-3 bg-blue-100 rounded-lg">
                   <User className="w-6 h-6 text-blue-600" />
                 </div>
               </div>
             </div>
             <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-gray-600">Freelancers</p>
                   <p className="text-2xl font-bold text-gray-900">
                     {employees.filter(emp => emp.employeeType === "Freelancer").length}
                   </p>
                 </div>
                 <div className="p-3 bg-purple-100 rounded-lg">
                   <Users className="w-6 h-6 text-purple-600" />
                 </div>
               </div>
             </div>
           </div>

          {/* Search and Filter */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50"
                />
              </div>
              <div className="sm:w-48">
                <Select value={filterEmployeeType} onValueChange={setFilterEmployeeType}>
                  <SelectTrigger className="bg-gray-50">
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
              <div className="sm:w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-gray-50">
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
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Team Members ({filteredEmployees.length})
              </h2>
            </div>
            
            {filteredEmployees.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterType !== "all" 
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by adding your first team member."
                  }
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <div key={employee._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full">
                          <span className="text-white font-semibold text-lg">
                            {employee.fullName?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <div className="flex-1">
                                                     <div className="flex items-center space-x-2 mb-1">
                             <h3 className="text-lg font-semibold text-gray-900">
                               {employee.fullName || "Unnamed"}
                             </h3>
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                               {employee.status || "Employee Added"}
                             </span>
                           </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            {/* Employment Type Badge */}
                            {employee.employeeType && (
                              <div className="flex items-center">
                                {getEmploymentTypeIcon(employee.employeeType)}
                                <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getEmploymentTypeColor(employee.employeeType)}`}>
                                  {employee.employeeType}
                                </span>
                              </div>
                            )}
                            {(employee.role || employee.position || employee.jobTitle || employee.designation) && (
                              <div className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-1" />
                                {employee.role || employee.position || employee.jobTitle || employee.designation}
                              </div>
                            )}
                            {employee.emailAddress && (
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                {employee.emailAddress}
                              </div>
                            )}
                            {employee.joiningDate && (
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Joined {formatDate(employee.joiningDate)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(employee)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(employee)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(employee._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Compact Timeline Tracker */}
                    <div className="ml-16">
                      <div className="flex items-center space-x-6">
                        {/* Timeline Steps */}
                        {getTimelineStatus(employee).map((step, index) => (
                          <div key={step.id} className="flex items-center space-x-2">
                            {/* Step Icon */}
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                              step.completed 
                                ? `${step.color} border-white shadow-sm` 
                                : 'bg-white border-gray-300'
                            }`}>
                              <div className={`${step.completed ? 'text-white' : 'text-gray-400'}`}>
                                {step.completed ? step.icon : <Clock className="w-4 h-4" />}
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
                              <div className={`w-8 h-0.5 ${
                                getTimelineStatus(employee)[index + 1].completed 
                                  ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                                  : 'bg-gray-200'
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
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Employee Details</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetailsModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Employee Header */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full">
                  <span className="text-white font-semibold text-2xl">
                    {selectedEmployee.fullName?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
                                 <div className="flex-1">
                   <h3 className="text-xl font-semibold text-gray-900">
                     {selectedEmployee.fullName || "Unnamed"}
                   </h3>
                   <div className="flex items-center space-x-2 mb-1">
                     <p className="text-lg text-gray-600">
                       {selectedEmployee.role || selectedEmployee.position || selectedEmployee.jobTitle || selectedEmployee.designation || "Role not specified"}
                     </p>
                     {selectedEmployee.employeeType && (
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEmploymentTypeColor(selectedEmployee.employeeType)}`}>
                         {getEmploymentTypeIcon(selectedEmployee.employeeType)}
                         <span className="ml-1">{selectedEmployee.employeeType}</span>
                       </span>
                     )}
                   </div>
                   <p className="text-gray-500">{selectedEmployee.emailAddress || "Email not specified"}</p>
                   <p className="text-sm text-gray-500">Joined {formatDate(selectedEmployee.joiningDate)}</p>
                 </div>
              </div>

              {/* Timeline Tracker */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Onboarding Progress</h3>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  {/* Progress Line */}
                  <div 
                    className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 transition-all duration-1000 ease-in-out"
                    style={{
                      height: `${(getCurrentStepIndex(selectedEmployee) / 2) * 100}%`
                    }}
                  ></div>

                  {/* Timeline Steps */}
                  <div className="space-y-8">
                    {getTimelineStatus(selectedEmployee).map((step, index) => (
                      <div key={step.id} className="relative flex items-start">
                        {/* Step Icon */}
                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                          step.completed 
                            ? `${step.color} border-white shadow-lg` 
                            : 'bg-white border-gray-300'
                        }`}>
                          <div className={`${step.completed ? 'text-white' : 'text-gray-400'}`}>
                            {step.completed ? step.icon : <Clock className="w-5 h-5" />}
                          </div>
                        </div>

                        {/* Step Content */}
                        <div className="ml-4 flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`text-lg font-semibold ${
                              step.completed ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {step.title}
                            </h4>
                            {step.completed && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <p className={`text-sm ${
                            step.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {step.description}
                          </p>
                          
                          {/* Status Badge */}
                          <div className="mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              step.completed 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              {step.completed ? 'Completed' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                      <p className="text-gray-900">{selectedEmployee.fullName || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Email Address</Label>
                      <p className="text-gray-900">{selectedEmployee.emailAddress || "Not specified"}</p>
                    </div>
                                                             <div>
                      <Label className="text-sm font-medium text-gray-600">Role/Position</Label>
                      <p className="text-gray-900">
                        {selectedEmployee.role || selectedEmployee.position || selectedEmployee.jobTitle || selectedEmployee.designation || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Employment Type</Label>
                      <div className="flex items-center space-x-2">
                        {getEmploymentTypeIcon(selectedEmployee.employeeType)}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEmploymentTypeColor(selectedEmployee.employeeType)}`}>
                          {selectedEmployee.employeeType || "Not specified"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Status</Label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedEmployee.status)}`}>
                        {selectedEmployee.status || "Employee Added"}
                      </span>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Joining Date</Label>
                      <p className="text-gray-900">{formatDate(selectedEmployee.joiningDate)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Address</Label>
                      <p className="text-gray-900">{selectedEmployee.address || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Payment Method</Label>
                      <p className="text-gray-900">{selectedEmployee.paymentMethod || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Tenure</Label>
                      <p className="text-gray-900">{selectedEmployee.tenure || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Salary (Monthly)</Label>
                      <p className="text-gray-900">{selectedEmployee.salary || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {selectedEmployee.documents && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(selectedEmployee.documents).map(([doc, required]) => (
                      <div key={doc} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${required ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-gray-700 capitalize">
                          {doc.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  handleEdit(selectedEmployee);
                  setShowDetailsModal(false);
                }}
              >
                Edit Employee
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

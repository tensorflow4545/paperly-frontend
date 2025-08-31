"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, ExternalLink, X, CheckCircle, User, Mail, Briefcase, MapPin, CreditCard, IndianRupee, FileText, Shield, TrendingUp, Users, Play } from "lucide-react";
import { getAuthToken } from "@/utils/auth";
import SuccessModal from "@/components/OfferLetterEditor/SuccessModal";

export default function QuickHirePage({ user, profileData }) {
  const [employmentType, setEmploymentType] = useState("Employee");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [offerLetterData, setOfferLetterData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    role: "",
    joiningDate: "",
    address: "",
    paymentMethod: "",
    tenure: "",
    salary: "",
  });
  const [documents, setDocuments] = useState({
    offerLetter: false,
    nda: false,
    salaryCtcLetter: false,
    Onboarding_Letter: false,
  });

  const loadingSteps = [
    "Validating employee details...",
    "Generating offer letter...",
    "Creating additional documents...",
    "Preparing document package...",
    "Finalizing and saving...",
    "Getting editor ready..."
  ];

  // Function to handle form submission
  const handleGenerate = async () => {
    setIsLoading(true);
    setError("");
    setShowToast(false);
    setLoadingStep(0);

    try {
      // Get authentication token
      const token = getAuthToken();

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Validate required fields
      const requiredFields = [
        "fullName",
        "emailAddress",
        "role",
        "joiningDate",
        "address",
        "paymentMethod",
        "tenure",
        "salary",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Validate salary is a number
      const salary = parseFloat(formData.salary);
      if (isNaN(salary) || salary <= 0) {
        throw new Error("Salary must be a valid positive number");
      }

      // Simulate loading steps
      const simulateLoading = async () => {
        for (let i = 0; i < loadingSteps.length; i++) {
          setLoadingStep(i);
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      };

      // Start loading simulation
      simulateLoading();

      // Prepare the employee data for both APIs
      const employeeData = {
        ...formData,
        employeeType: employmentType,
        salary: salary, // Convert to number
        documents: {
          offerLetter: true, // Always true since offer letter is always generated
          nda: documents.nda,
          salaryCtcLetter: documents.salaryCtcLetter,
          Onboarding_Letter: documents.Onboarding_Letter,
        },
        createdAt: new Date().toISOString(),
      };

      console.log("Sending employee data to API:", employeeData);
      console.log("Employment type:", employmentType);

      // Step 1: Make API call to save employee details
      const employeeResponse = await fetch(
        "https://paperly-backend-five.vercel.app/api/employeeDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(employeeData),
        }
      );

      const employeeResult = await employeeResponse.json();
      console.log("Employee API Response:", employeeResult);

      if (!employeeResponse.ok) {
        throw new Error(
          employeeResult.error || "Failed to save employee details"
        );
      }

      // Step 2: Fetch company details from API
      console.log("Fetching company details for user:", user?.email);
      const companyResponse = await fetch(
        `https://paperly-backend-five.vercel.app/api/enterprise-profile?email=${encodeURIComponent(
          user?.email
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const companyResult = await companyResponse.json();
      console.log("Company details API response:", companyResult);

      if (!companyResponse.ok) {
        throw new Error(
          companyResult.error || "Failed to fetch company details"
        );
      }

      const companyProfile = companyResult.profile || {};

      // Step 3: Prepare data for document generation
      const documentData = {
        ...employeeData,
        // Add company details from API response
        companyName: companyProfile.companyName || "Your Company Name",
        companyAddress:
          companyProfile.registeredAddress || "Your Company Address",
        companyPhone: companyProfile.phone || "Your Company Phone",
        companyWebsite: companyProfile.website || "Your Company Website",
        companyEmail:
          companyProfile.email || user?.email || "Your Company Email",
        hrName: companyProfile.fullName || "HR Manager",
        hrTitle: companyProfile.hrTitle || "Human Resources Manager",
      };

      console.log("Sending document data to APIs:", documentData);

      // Log which checkboxes are clicked
      console.log("Checkboxes clicked:", {
        offerLetter: documents.offerLetter,
        nda: documents.nda,
        salaryCtcLetter: documents.salaryCtcLetter,
        Onboarding_Letter: documents.Onboarding_Letter,
      });

      // Step 4: Call the offer letter generation API (default - always called)
      console.log("Calling offer letter API...");
      const offerLetterResponse = await fetch(
        "https://paperly-backend-five.vercel.app/api/generateOfferLetter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(documentData),
        }
      );

      const offerLetterResult = await offerLetterResponse.json();
      console.log("Offer Letter API Response:", offerLetterResult);

      if (!offerLetterResponse.ok) {
        throw new Error(
          offerLetterResult.error || "Failed to generate offer letter"
        );
      }

      // Step 5: Call additional APIs based on checkboxes
      const apiPromises = [];

      // Call Salary/CTC Letter API if checkbox is checked
      if (documents.salaryCtcLetter) {
        console.log("Calling Salary/CTC Letter API...");
        const salaryLetterPromise = fetch(
          "https://paperly-backend-five.vercel.app/api/generateSalaryLetter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(documentData),
          }
        ).then(async (response) => {
          const result = await response.json();
          console.log("Salary/CTC Letter API Response:", result);
          if (!response.ok) {
            console.error("Salary/CTC Letter API Error:", result);
          }
          return { type: "salaryLetter", result, success: response.ok };
        });
        apiPromises.push(salaryLetterPromise);
      }

      // Call Onboarding Letter API if checkbox is checked
      if (documents.Onboarding_Letter) {
        console.log("Calling Onboarding Letter API...");
        const onboardingLetterPromise = fetch(
          "https://paperly-backend-five.vercel.app/api/generateOnboardingLetter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(documentData),
          }
        ).then(async (response) => {
          const result = await response.json();
          console.log("Onboarding Letter API Response:", result);
          if (!response.ok) {
            console.error("Onboarding Letter API Error:", result);
          }
          return { type: "onboardingLetter", result, success: response.ok };
        });
        apiPromises.push(onboardingLetterPromise);
      }

      // Call NDA API if checkbox is checked
      if (documents.nda) {
        console.log("Calling NDA API...");
        const ndaPromise = fetch(
          "https://paperly-backend-five.vercel.app/api/generateNDA",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(documentData),
          }
        ).then(async (response) => {
          const result = await response.json();
          console.log("NDA API Response:", result);
          if (!response.ok) {
            console.error("NDA API Error:", result);
          }
          return { type: "nda", result, success: response.ok };
        });
        apiPromises.push(ndaPromise);
      }

      // Wait for all additional API calls to complete
      if (apiPromises.length > 0) {
        console.log("Waiting for additional API calls to complete...");
        const additionalResults = await Promise.all(apiPromises);
        console.log("All additional API results:", additionalResults);
      }

      // Store all document data and show success modal
      const allDocuments = {
        offerLetter: offerLetterResult,
        // Add employee ID for status updates - try multiple possible locations
        employeeId: employeeResult.data._id || employeeResult.data?.id || employeeResult._id || employeeResult.id,
        // Add other documents if they were generated
        ...(documents.salaryCtcLetter && { salaryLetter: null }), // Will be populated from API results
        ...(documents.Onboarding_Letter && { onboardingLetter: null }), // Will be populated from API results
        ...(documents.nda && { nda: null }), // Will be populated from API results
      };

      // Debug: Log the employee ID and all documents
      console.log("Employee result:", employeeResult);
      console.log("Employee result.data:", employeeResult.data);
      console.log("Employee result.data._id:", employeeResult.data._id);
      console.log("Employee ID being set:", employeeResult.data._id);
      console.log("All documents with employee ID:", allDocuments);

      // Wait for all additional API calls to complete and update documents
      if (apiPromises.length > 0) {
        console.log("Waiting for additional API calls to complete...");
        const additionalResults = await Promise.all(apiPromises);
        console.log("All additional API results:", additionalResults);
        
        // Update the documents with actual results
        additionalResults.forEach(result => {
          if (result.success) {
            switch (result.type) {
              case 'salaryLetter':
                allDocuments.salaryLetter = result.result;
                break;
              case 'onboardingLetter':
                allDocuments.onboardingLetter = result.result;
                break;
              case 'nda':
                allDocuments.nda = result.result;
                break;
            }
          }
        });
      }

      setOfferLetterData(allDocuments);
      setShowSuccessModal(true);

      // Show success message
      setShowToast(true);

      // Auto-hide toast after 7 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 7000);

      // Reset form after successful submission (but keep modal state)
      setFormData({
        fullName: "",
        emailAddress: "",
        role: "",
        joiningDate: "",
        address: "",
        paymentMethod: "",
        tenure: "",
        salary: "",
      });
      setDocuments({
        offerLetter: false,
        nda: false,
        salaryCtcLetter: false,
        Onboarding_Letter: false,
      });
      setEmploymentType("Employee");
    } catch (err) {
      setError(
        err.message || "An error occurred while processing your request"
      );
      setShowErrorToast(true);

      // Auto-hide error toast after 7 seconds
      setTimeout(() => {
        setShowErrorToast(false);
      }, 7000);
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  // Function to handle form reset
  const handleReset = () => {
    setFormData({
      fullName: "",
      emailAddress: "",
      role: "",
      joiningDate: "",
      address: "",
      paymentMethod: "",
      tenure: "",
      salary: "",
    });
    setDocuments({
      offerLetter: false,
      nda: false,
      salaryCtcLetter: false,
      Onboarding_Letter: false,
    });
    setEmploymentType("Employee");
    setError("");
    setShowToast(false);
    setShowErrorToast(false);
  };

  // Function to close toasts
  const closeToast = () => {
    setShowToast(false);
  };

  const closeErrorToast = () => {
    setShowErrorToast(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setOfferLetterData(null);
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
      {/* Success Modal */}
      {showSuccessModal && offerLetterData && (
        <SuccessModal
          offerLetterData={offerLetterData}
          onClose={handleCloseSuccessModal}
        />
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full">
      {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Generating Documents</h3>
                  <p className="text-sm text-gray-500">Please wait while we process your request</p>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="px-6 py-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(((loadingStep + 1) / loadingSteps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-1.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Steps */}
              <div className="space-y-2">
                {loadingSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                      index <= loadingStep 
                        ? index < loadingStep 
                          ? 'bg-green-50 border border-green-100' 
                          : 'bg-yellow-50 border border-yellow-100'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      index < loadingStep 
                        ? 'bg-green-500 text-white' 
                        : index === loadingStep 
                        ? 'bg-yellow-500 text-white animate-pulse' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index < loadingStep ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      index <= loadingStep 
                        ? index < loadingStep 
                          ? 'text-green-700' 
                          : 'text-yellow-700'
                        : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                    {index < loadingStep && (
                      <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 rounded-b-2xl">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Powered by Paprly</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span>Processing...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-4 lg:px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Quick Hire
              </h1>
              <p className="text-gray-600 text-sm">
                Add a new team member and generate all required documents
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
            {/* Main Form */}
            <div className="lg:col-span-3 space-y-4">
          {/* Employment Type */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
                <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-yellow-600" />
              Employment Type
            </h2>
            <RadioGroup
              value={employmentType}
              onValueChange={setEmploymentType}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Employee" id="employee" />
                    <Label htmlFor="employee" className="text-sm text-gray-700">
                  Employee
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Freelancer" id="freelancer" />
                    <Label htmlFor="freelancer" className="text-sm text-gray-700">
                  Freelancer
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Basic Information */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
                <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-600" />
              Basic Information
            </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                    <Label htmlFor="fullName" className="block mb-2 text-xs font-medium text-gray-600">
                  Full Name
                </Label>
                    <div className="relative group">
                <Input
                  id="fullName"
                  value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="bg-yellow-50 border-yellow-200 text-sm group-hover:border-yellow-300 transition-colors"
                        placeholder="Enter full name"
                      />
                      <User className="absolute w-4 h-4 text-gray-400 right-3 top-1/2 transform -translate-y-1/2 group-hover:text-yellow-500 transition-colors" />
                    </div>
              </div>
              <div>
                    <Label htmlFor="emailAddress" className="block mb-2 text-xs font-medium text-gray-600">
                  Email Address
                </Label>
                    <div className="relative group">
                  <Input
                    id="emailAddress"
                    value={formData.emailAddress}
                        onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                        className="bg-yellow-50 border-yellow-200 text-sm pr-10 group-hover:border-yellow-300 transition-colors"
                        placeholder="Enter email address"
                      />
                      <Mail className="absolute w-4 h-4 text-gray-400 right-3 top-1/2 transform -translate-y-1/2 group-hover:text-yellow-500 transition-colors" />
                </div>
              </div>
              <div>
                    <Label htmlFor="role" className="block mb-2 text-xs font-medium text-gray-600">
                  Role
                </Label>
                    <div className="relative group">
                <Input
                  id="role"
                  value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="bg-yellow-50 border-yellow-200 text-sm group-hover:border-yellow-300 transition-colors"
                        placeholder="Enter job role"
                      />
                      <Briefcase className="absolute w-4 h-4 text-gray-400 right-3 top-1/2 transform -translate-y-1/2 group-hover:text-yellow-500 transition-colors" />
                    </div>
              </div>
              <div>
                    <Label htmlFor="joiningDate" className="block mb-2 text-xs font-medium text-gray-600">
                  Joining Date
                </Label>
                    <div className="relative group">
                  <Input
                    id="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                        onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                        className="bg-yellow-50 border-yellow-200 text-sm pr-10 group-hover:border-yellow-300 transition-colors"
                      />
                      <Calendar className="absolute w-4 h-4 text-gray-400 right-3 top-1/2 transform -translate-y-1/2 group-hover:text-yellow-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Payment Details */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
                <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-yellow-600" />
              Contact & Payment Details
            </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                    <Label htmlFor="address" className="block mb-2 text-xs font-medium text-gray-600">
                  Address
                </Label>
                    <div className="relative group">
                <Input
                  id="address"
                  value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="bg-yellow-50 border-yellow-200 text-sm group-hover:border-yellow-300 transition-colors"
                        placeholder="Enter address"
                      />
                      <MapPin className="absolute w-4 h-4 text-gray-400 right-3 top-1/2 transform -translate-y-1/2 group-hover:text-yellow-500 transition-colors" />
              </div>
                  </div>
              <div>
                    <Label htmlFor="paymentMethod" className="block mb-2 text-xs font-medium text-gray-600">
                  Payment Method
                </Label>
                <Select
                  value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                >
                      <SelectTrigger className="bg-yellow-50 border-yellow-200 text-sm hover:border-yellow-300 transition-colors">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                    <Label htmlFor="tenure" className="block mb-2 text-xs font-medium text-gray-600">
                  Tenure
                </Label>
                <Input
                  id="tenure"
                  value={formData.tenure}
                      onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                      className="bg-yellow-50 border-yellow-200 text-sm hover:border-yellow-300 transition-colors"
                      placeholder="e.g., 1 year, 6 months"
                />
              </div>
              <div>
                    <Label htmlFor="salary" className="block mb-2 text-xs font-medium text-gray-600">
                  Salary (Monthly)
                </Label>
                    <div className="relative group">
                <Input
                  id="salary"
                  value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        className="bg-yellow-50 border-yellow-200 text-sm pr-10 group-hover:border-yellow-300 transition-colors"
                        placeholder="Enter salary amount"
                      />
                      <IndianRupee className="absolute w-4 h-4 text-gray-400 right-3 top-1/2 transform -translate-y-1/2 group-hover:text-yellow-500 transition-colors" />
                    </div>
              </div>
            </div>
          </div>

          {/* Documents Needed */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
                <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-600" />
                  Documents to Generate
            </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-yellow-50 transition-colors">
                <Checkbox
                  id="offerLetter"
                  checked={documents.offerLetter}
                      onCheckedChange={(checked) => setDocuments({ ...documents, offerLetter: !!checked })}
                />
                    <Label htmlFor="offerLetter" className="text-sm text-gray-700 cursor-pointer">
                  Offer Letter
                </Label>
              </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-yellow-50 transition-colors">
                <Checkbox
                  id="nda"
                  checked={documents.nda}
                      onCheckedChange={(checked) => setDocuments({ ...documents, nda: !!checked })}
                />
                    <Label htmlFor="nda" className="text-sm text-gray-700 cursor-pointer">
                  NDA
                </Label>
              </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-yellow-50 transition-colors">
                <Checkbox
                  id="salaryCtcLetter"
                  checked={documents.salaryCtcLetter}
                      onCheckedChange={(checked) => setDocuments({ ...documents, salaryCtcLetter: !!checked })}
                />
                    <Label htmlFor="salaryCtcLetter" className="text-sm text-gray-700 cursor-pointer">
                  Salary/CTC Letter
                </Label>
              </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-yellow-50 transition-colors">
                <Checkbox
                  id="Onboarding_Letter"
                  checked={documents.Onboarding_Letter}
                      onCheckedChange={(checked) => setDocuments({ ...documents, Onboarding_Letter: !!checked })}
                    />
                    <Label htmlFor="Onboarding_Letter" className="text-sm text-gray-700 cursor-pointer">
                  Onboarding Letter
                </Label>
              </div>
            </div>
          </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {profileData?.fullName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
              </div>
              <div>
                    <p className="text-sm font-medium text-gray-900">
                  {profileData?.fullName || user?.name || "User"}
                </p>
                    <p className="text-xs text-gray-500">
                  {profileData?.companyName || "Enterprise Account"}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                    className="text-sm text-gray-700 border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200"
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button
                    className="text-sm text-white bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={handleGenerate}
                disabled={isLoading}
              >
                    {isLoading ? "Processing..." : "Generate Documents"}
              </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick Tips */}
              <div className="bg-white rounded-xl p-5 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-yellow-600" />
                  Quick Tips
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
                    <p className="text-xs text-gray-600">All fields are required for document generation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
                    <p className="text-xs text-gray-600">Offer letter is automatically generated</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
                    <p className="text-xs text-gray-600">Select additional documents as needed</p>
                  </div>
                </div>
              </div>

              {/* How Quick Hire Works */}
              <div className="bg-white rounded-xl p-5 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Play className="w-4 h-4 text-yellow-600" />
                  How Quick Hire Works
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-yellow-700">1</span>
                    </div>
                    <p className="text-xs text-gray-600">Fill in employee details and select required documents</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-yellow-700">2</span>
                    </div>
                    <p className="text-xs text-gray-600">AI automatically generates professional documents instantly</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-yellow-700">3</span>
                    </div>
                    <p className="text-xs text-gray-600">Review and customize documents in the editor</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-yellow-700">4</span>
                    </div>
                    <p className="text-xs text-gray-600">Send documents to employee for e-signature</p>
                  </div>
                </div>
              </div>

              {/* Document Preview */}
              <div className="bg-white rounded-xl p-5 shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-yellow-600" />
                  Document Preview
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-50 transition-colors">
                    <span className="text-xs text-gray-600">Offer Letter</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-50 transition-colors">
                    <span className="text-xs text-gray-600">NDA</span>
                    <div className={`w-3 h-3 rounded-full ${documents.nda ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-50 transition-colors">
                    <span className="text-xs text-gray-600">Salary Letter</span>
                    <div className={`w-3 h-3 rounded-full ${documents.salaryCtcLetter ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-50 transition-colors">
                    <span className="text-xs text-gray-600">Onboarding</span>
                    <div className={`w-3 h-3 rounded-full ${documents.Onboarding_Letter ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl shadow-lg max-w-sm">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 text-sm font-medium">
              Employee details saved and documents generated successfully!
            </p>
            <button
              onClick={closeToast}
              className="ml-auto p-1 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Error Toast Notification */}
      {showErrorToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl shadow-lg max-w-sm">
            <svg
              className="w-5 h-5 text-red-600 flex-shrink-0"
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
            <p className="text-red-800 text-sm font-medium">{error}</p>
            <button
              onClick={closeErrorToast}
              className="ml-auto p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

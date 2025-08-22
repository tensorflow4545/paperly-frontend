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
import { Calendar, ExternalLink, X, CheckCircle } from "lucide-react";
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
    terminationExitAgreement: false,
  });

  // Function to handle form submission
  const handleGenerate = async () => {
    setIsLoading(true);
    setError("");
    setShowToast(false);

    try {
      // Get authentication token
      const token = getAuthToken();
      
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Validate required fields
      const requiredFields = ['fullName', 'emailAddress', 'role', 'joiningDate', 'address', 'paymentMethod', 'tenure', 'salary'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate salary is a number
      const salary = parseFloat(formData.salary);
      if (isNaN(salary) || salary <= 0) {
        throw new Error("Salary must be a valid positive number");
      }

      // Prepare the employee data for both APIs
      const employeeData = {
        ...formData,
        employeeType: employmentType,
        salary: salary, // Convert to number
        documents,
        createdAt: new Date().toISOString(),
      };

      console.log('Sending employee data to API:', employeeData);
      console.log('Employment type:', employmentType);

      // Step 1: Make API call to save employee details
      const employeeResponse = await fetch("https://paperly-backend-five.vercel.app/api/employeeDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      });

      const employeeResult = await employeeResponse.json();
      console.log('Employee API Response:', employeeResult);

      if (!employeeResponse.ok) {
        throw new Error(employeeResult.error || "Failed to save employee details");
      }

      // Step 2: Fetch company details from API
      console.log('Fetching company details for user:', user?.email);
      const companyResponse = await fetch(`https://paperly-backend-five.vercel.app/api/enterprise-profile?email=${encodeURIComponent(user?.email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const companyResult = await companyResponse.json();
      console.log('Company details API response:', companyResult);

      if (!companyResponse.ok) {
        throw new Error(companyResult.error || "Failed to fetch company details");
      }

      const companyProfile = companyResult.profile || {};
      
      // Step 3: Prepare data for offer letter generation
      const offerLetterData = {
        ...employeeData,
        // Add company details from API response
        companyName: companyProfile.companyName || "Your Company Name",
        companyAddress: companyProfile.registeredAddress || "Your Company Address",
        companyPhone: companyProfile.phone || "Your Company Phone",
        companyWebsite: companyProfile.website || "Your Company Website",
        companyEmail: companyProfile.email || user?.email || "Your Company Email",
        hrName: companyProfile.fullName || "HR Manager",
        hrTitle: companyProfile.hrTitle || "Human Resources Manager",
      };

      console.log('Sending offer letter data to API:', offerLetterData);

      // Step 4: Call the offer letter generation API
      const offerLetterResponse = await fetch("http://localhost:4000/api/generateOfferLetter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(offerLetterData),
      });

      const offerLetterResult = await offerLetterResponse.json();
      console.log('Offer Letter API Response:', offerLetterResult);

      if (!offerLetterResponse.ok) {
        throw new Error(offerLetterResult.error || "Failed to generate offer letter");
      }

      // Store the offer letter data and show success modal
      setOfferLetterData(offerLetterResult);
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
        terminationExitAgreement: false,
      });
      setEmploymentType("Employee");

    } catch (err) {
      setError(err.message || "An error occurred while processing your request");
      setShowErrorToast(true);
      
      // Auto-hide error toast after 7 seconds
      setTimeout(() => {
        setShowErrorToast(false);
      }, 7000);
    } finally {
      setIsLoading(false);
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
      terminationExitAgreement: false,
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
    <div className="w-full bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] flex-1 lg:ml-0 relative">
      {/* Success Modal */}
      {showSuccessModal && offerLetterData && (
        <SuccessModal
          offerLetterData={offerLetterData}
          onClose={handleCloseSuccessModal}
        />
      )}
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pt-16 lg:pt-12">
        <div className="w-full p-4 sm:p-6 lg:p-10 rounded-[10px] bg-[#FFF3BBB0]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Quick Hire By paprly
              </h1>
              <p className="text-sm sm:text-base text-gray-700">
                Let&apos;s add a new candidate to your team. Generate all needed
                documents in just few clicks.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6">
              <Button className="text-white bg-yellow-600 hover:bg-yellow-700">
                Write with AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="w-full space-y-4 sm:space-y-6">

          {/* Employment Type */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Employment Type
            </h2>
            <RadioGroup
              value={employmentType}
              onValueChange={setEmploymentType}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Employee" id="employee" />
                <Label htmlFor="employee" className="text-gray-700">
                  Employee
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Freelancer" id="freelancer" />
                <Label htmlFor="freelancer" className="text-gray-700">
                  Freelancer
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Basic Information */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-700 "
                >
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className=" bg-gray-50"
                />
              </div>
              <div>
                <Label
                  htmlFor="emailAddress"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="emailAddress"
                    value={formData.emailAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, emailAddress: e.target.value })
                    }
                    className="pr-8 border-gray-200 bg-gray-50"
                  />
                  <ExternalLink className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 right-2 top-1/2" />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Role
                </Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="border-gray-200 bg-gray-50"
                />
              </div>
              <div>
                <Label
                  htmlFor="joiningDate"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Joining Date
                </Label>
                <div className="relative">
                  <Input
                    id="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) =>
                      setFormData({ ...formData, joiningDate: e.target.value })
                    }
                    className="pr-8 border-gray-200 bg-gray-50"
                  />
                  <Calendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 right-2 top-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Payment Details */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Contact & Payment Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full border-gray-200 bg-gray-50"
                />
              </div>

              <div>
                <Label
                  htmlFor="paymentMethod"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Payment Method
                </Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentMethod: value })
                  }
                >
                  <SelectTrigger className="w-full border-gray-200 bg-gray-50">
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
                <Label
                  htmlFor="tenure"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Tenure
                </Label>
                <Input
                  id="tenure"
                  value={formData.tenure}
                  onChange={(e) =>
                    setFormData({ ...formData, tenure: e.target.value })
                  }
                  className="w-full border-gray-200 bg-gray-50"
                />
              </div>

              <div>
                <Label
                  htmlFor="salary"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Salary (Monthly)
                </Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  className="w-full border-gray-200 bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Documents Needed */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Documents Needed
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="offerLetter"
                  checked={documents.offerLetter}
                  onCheckedChange={(checked) =>
                    setDocuments({ ...documents, offerLetter: !!checked })
                  }
                />
                <Label htmlFor="offerLetter" className="text-gray-700">
                  Offer Letter
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="nda"
                  checked={documents.nda}
                  onCheckedChange={(checked) =>
                    setDocuments({ ...documents, nda: !!checked })
                  }
                />
                <Label htmlFor="nda" className="text-gray-700">
                  NDA
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="salaryCtcLetter"
                  checked={documents.salaryCtcLetter}
                  onCheckedChange={(checked) =>
                    setDocuments({ ...documents, salaryCtcLetter: !!checked })
                  }
                />
                <Label htmlFor="salaryCtcLetter" className="text-gray-700">
                  Salary/CTC Letter
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terminationExitAgreement"
                  checked={documents.terminationExitAgreement}
                  onCheckedChange={(checked) =>
                    setDocuments({
                      ...documents,
                      terminationExitAgreement: !!checked,
                    })
                  }
                />
                <Label
                  htmlFor="terminationExitAgreement"
                  className="text-gray-700"
                >
                  Termination/Exit Agreement
                </Label>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 font-medium text-white bg-blue-600 rounded-full">
                {profileData?.fullName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-medium text-gray-900">{profileData?.fullName || user?.name || 'User'}</p>
                <p className="text-sm text-gray-500">{profileData?.companyName || 'Enterprise Account'}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button 
                className="text-white bg-yellow-600 hover:bg-yellow-700"
                onClick={handleGenerate}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Generate"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg shadow-lg max-w-sm">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">Employee details saved and offer letter generated successfully!</p>
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
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg shadow-lg max-w-sm">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-red-800 font-medium">{error}</p>
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
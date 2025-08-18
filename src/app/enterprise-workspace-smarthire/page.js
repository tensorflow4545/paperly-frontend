"use client";

import { useState } from "react";
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
import { Calendar, ExternalLink } from "lucide-react";
import EnterpriseNavbar from "@/components/enterprise-components/enterprise-navbar";
import Sidebar from "@/components/enterprise-components/sidebar";
import Footer from "@/components/enterprise-components/enterprise-footer";

export default function QuickHirePage() {
  const [employmentType, setEmploymentType] = useState("employee");
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

  return (
    <>
      <EnterpriseNavbar />

      {/* Main Page Layout */}
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8 space-y-6">
          {/* Header Banner */}
          <div className="p-6 border bg-[#fff3bb]/65 border-yellow-200 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                  Quick Hire By paprly
                </h1>
                <p className="text-sm text-gray-600">
                  Let's add a new candidate to your team. Generate all needed
                  documents in just few click.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="text-white bg-neutral-950 hover:bg-gray-900">
                  Back to Home
                </Button>
                <Button className="text-white bg-yellow-600 hover:bg-yellow-700">
                  Write with AI
                </Button>
              </div>
            </div>
          </div>

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
                <RadioGroupItem value="employee" id="employee" />
                <Label htmlFor="employee" className="text-gray-700">
                  Employee
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="freelancer" id="freelancer" />
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
            <div className="grid grid-cols-2 gap-6">
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
            <div className="grid grid-cols-2 gap-6">
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
                    <SelectItem value="paypal">PayPal</SelectItem>
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
          <div className="p-6 ml-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Documents Needed
            </h2>
            <div className="grid grid-cols-2 gap-4">
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
          <div className="flex items-center justify-between p-6 ml-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 font-medium text-white bg-blue-600 rounded-full">
                AG
              </div>
              <div>
                <p className="font-medium text-gray-900">Aditya Goel</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Reset
              </Button>
              <Button className="text-white bg-yellow-600 hover:bg-yellow-700">
                Generate
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

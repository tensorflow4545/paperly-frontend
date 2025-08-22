"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  Eye, 
  Edit, 
  FileText, 
  X,
  User,
  Building,
  Calendar,
  DollarSign
} from "lucide-react";

export default function SuccessModal({ offerLetterData, onClose, onView, onEdit }) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleProceedToPreview = () => {
    setIsNavigating(true);
    // Store data in localStorage for the editor page
    console.log('Storing offer letter data in localStorage:', offerLetterData);
    localStorage.setItem('offerLetterData', JSON.stringify(offerLetterData));
    router.push('/offer-letter-editor');
  };

  if (!offerLetterData) {
    return null;
  }

  // Extract employee and company details from the API response
  const employeeDetails = offerLetterData?.data?.employeeDetails || {};
  const companyDetails = offerLetterData?.data?.companyDetails || {};

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
    >
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="custom-scrollbar">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-semibold text-gray-900 mb-2">
              Documents Created Successfully
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Your offer letter has been generated and is ready for review and customization.
            </p>
          </CardHeader>

          <CardContent className="space-y-8 px-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Employee Summary */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Employee</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium text-gray-900">{employeeDetails.fullName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Role</span>
                    <span className="font-medium text-gray-900">{employeeDetails.role}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Salary</span>
                    <span className="font-medium text-gray-900">${employeeDetails.salary?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Company Summary */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Company</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium text-gray-900">{companyDetails.companyName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">HR Manager</span>
                    <span className="font-medium text-gray-900">{companyDetails.hrName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium text-gray-900">{companyDetails.companyEmail}</span>
                  </div>
                </div>
              </div>

              {/* Timeline Summary */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Timeline</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Start Date</span>
                    <span className="font-medium text-gray-900">{employeeDetails.joiningDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium text-gray-900">{employeeDetails.employeeType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tenure</span>
                    <span className="font-medium text-gray-900">{employeeDetails.tenure}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="text-center pt-6 border-t border-gray-200">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready to Review Your Document?
                </h4>
                <p className="text-gray-600">
                  Proceed to the editor to review, customize, and finalize your offer letter.
                </p>
              </div>
              
              <Button 
                onClick={handleProceedToPreview}
                disabled={isNavigating}
                className="bg-yellow-600 hover:bg-yellow-800 text-white px-8 py-3 text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {isNavigating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Proceed to Preview</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

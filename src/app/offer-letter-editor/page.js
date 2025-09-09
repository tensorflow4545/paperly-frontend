"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MultiDocumentEditor from "@/components/OfferLetterEditor/MultiDocumentEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Activity } from "lucide-react";

function OfferLetterEditorContent() {
  const [offerLetterData, setOfferLetterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const dataLoadedRef = useRef(false);

  useEffect(() => {
    const loadOfferLetterData = () => {
      // Prevent multiple loads
      if (dataLoadedRef.current) {
        return;
      }
      
      try {
        // Try to get data from localStorage first (if coming from modal)
        const storedData = localStorage.getItem('allDocumentsData');
        console.log('Stored data from localStorage:', storedData);
        
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            console.log('Parsed data:', parsedData);
            setOfferLetterData(parsedData);
            dataLoadedRef.current = true;
            // Clean up localStorage immediately
            localStorage.removeItem('allDocumentsData');
            setIsLoading(false);
            return;
          } catch (parseError) {
            console.error('Error parsing localStorage data:', parseError);
            setError('Invalid data format in localStorage');
            setIsLoading(false);
            return;
          }
        }

        // Try to get data from URL parameters
        const dataParam = searchParams.get('data');
        if (dataParam) {
          try {
            const decodedData = JSON.parse(decodeURIComponent(dataParam));
            setOfferLetterData(decodedData);
            dataLoadedRef.current = true;
          } catch (e) {
            console.error('Error parsing URL data:', e);
            setError('Invalid offer letter data');
          }
        } else {
          setError('No offer letter data found');
        }
      } catch (err) {
        console.error('Error loading offer letter data:', err);
        setError('Failed to load offer letter data');
      } finally {
        setIsLoading(false);
      }
    };

    loadOfferLetterData();
  }, [searchParams]);

  const handleClose = () => {
    router.push('/home');
  };

  const handleSave = (editedContent) => {
    console.log('Saving edited offer letter:', editedContent);
    // Here you can implement saving the edited offer letter
    // You could make an API call to save the edited version
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading document editor...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Error Loading Documents</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
                <Button 
                  onClick={handleClose} 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!offerLetterData) {
    return (
      <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">No Document Data</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  No document data was found. Please generate new documents from the dashboard.
                </p>
                <Button 
                  onClick={handleClose} 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Debug: Log the offer letter data to see if employeeId is present
  console.log("Offer letter data:", offerLetterData);
  console.log("Employee ID from offer letter data:", offerLetterData?.employeeId);

  return (
    <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
      <MultiDocumentEditor
        allDocumentsData={offerLetterData}
        onClose={handleClose}
        onSave={handleSave}
        employeeId={offerLetterData?.employeeId}
      />
    </div>
  );
}

export default function OfferLetterEditorPage() {
  return (
    <Suspense fallback={
      <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <OfferLetterEditorContent />
    </Suspense>
  );
}

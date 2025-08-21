"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import OfferLetterEditor from "@/components/OfferLetterEditor/OfferLetterEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

export default function OfferLetterEditorPage() {
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
        const storedData = localStorage.getItem('offerLetterData');
        console.log('Stored data from localStorage:', storedData);
        
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            console.log('Parsed data:', parsedData);
            setOfferLetterData(parsedData);
            dataLoadedRef.current = true;
            // Clean up localStorage immediately
            localStorage.removeItem('offerLetterData');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading offer letter...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Offer Letter</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={handleClose} className="bg-yellow-600 hover:bg-yellow-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!offerLetterData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Offer Letter Data</h2>
          <p className="text-gray-600 mb-6">No offer letter data was found. Please generate a new offer letter.</p>
          <Button onClick={handleClose} className="bg-yellow-600 hover:bg-yellow-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <OfferLetterEditor
        offerLetterData={offerLetterData}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
}

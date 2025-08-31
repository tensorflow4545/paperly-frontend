"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DocumentSigningEditor from "./components/DocumentSigningEditor";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";

export default function SharedDocumentsPage() {
  const params = useParams();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validIds, setValidIds] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError(null);

        // Extract IDs from the URL parameter
        const idsParam = params.ids;
        console.log('URL parameter received:', idsParam);
        
        if (!idsParam) {
          throw new Error('No document IDs provided in the URL');
        }

        // Split the IDs by dots (as per the link generation format)
        const documentIds = idsParam.split('.');
        
        // Clean and filter the IDs
        const cleanedIds = documentIds
          .filter(id => id.trim() !== '')
          .map(id => {
            // Decode URL encoding
            const decoded = decodeURIComponent(id);
            // Remove 'ids=' prefix if present
            if (decoded.startsWith('ids=')) {
              return decoded.substring(4);
            }
            return decoded;
          });
        
        setValidIds(cleanedIds);
        console.log('Extracted document IDs:', cleanedIds);
        
        if (cleanedIds.length === 0) {
          throw new Error('No valid document IDs found in the URL');
        }

        // Call your API to get the supabase links
        console.log('Making API request to:', 'https://paperly-backend-five.vercel.app/api/signRecievedDocuments');
        console.log('Request payload:', { ids: cleanedIds });
        
        const response = await fetch('https://paperly-backend-five.vercel.app/api/signRecievedDocuments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ids: cleanedIds
          })
        });

        console.log('API Response status:', response.status);
        console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch (parseError) {
            console.warn('Could not parse error response:', parseError);
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('API Response data:', data);

        if (data.success && data.data && Array.isArray(data.data)) {
          setDocuments(data.data);
          console.log('Documents set successfully:', data.data);
        } else {
          console.warn('Unexpected API response format:', data);
          throw new Error(data.error || 'Invalid response format from server');
        }
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [params.ids]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (documents.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Documents Found</h2>
          <p className="text-gray-600">The requested documents could not be found or are no longer available.</p>
          <p className="text-sm text-gray-500 mt-2">
            This might happen if the documents have been deleted or the link has expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DocumentSigningEditor 
      documents={documents} 
      documentIds={validIds}
    />
  );
}

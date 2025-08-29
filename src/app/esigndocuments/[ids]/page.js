'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function SharedDocumentsPage() {
  const params = useParams();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

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
        
        // Filter out empty strings
        const validIds = documentIds.filter(id => id.trim() !== '');
        
        console.log('Extracted document IDs:', validIds);
        
        if (validIds.length === 0) {
          throw new Error('No valid document IDs found in the URL');
        }

        // Call your API to get the supabase links
        console.log('Making API request to:', 'https://paperly-backend-five.vercel.app/api/signRecievedDocuments');
        console.log('Request payload:', { ids: validIds });
        
        const response = await fetch('https://paperly-backend-five.vercel.app/api/signRecievedDocuments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ids: validIds
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

  // Reset iframe loading state when document changes
  useEffect(() => {
    setIframeLoading(true);
    setIframeError(false);
  }, [currentDocumentIndex]);

  const goToPreviousDocument = () => {
    if (currentDocumentIndex > 0) {
      setCurrentDocumentIndex(currentDocumentIndex - 1);
    }
  };

  const goToNextDocument = () => {
    if (currentDocumentIndex < documents.length - 1) {
      setCurrentDocumentIndex(currentDocumentIndex + 1);
    }
  };

  const goToDocument = (index) => {
    setCurrentDocumentIndex(index);
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeLoading(false);
    setIframeError(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
          <p className="mt-2 text-sm text-gray-500">Please wait while we fetch your documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Documents</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-2"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.history.back()} 
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            <p>If this error persists, please contact support.</p>
            <p>URL: {window.location.href}</p>
          </div>
        </div>
      </div>
    );
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

  const currentDocument = documents[currentDocumentIndex];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Shared Documents</h1>
            <p className="text-sm text-gray-600">
              Document {currentDocumentIndex + 1} of {documents.length}
            </p>
          </div>
          
          {/* Document Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousDocument}
              disabled={currentDocumentIndex === 0}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <button
              onClick={goToNextDocument}
              disabled={currentDocumentIndex === documents.length - 1}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              Next
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Document Thumbnails */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {documents.map((doc, index) => (
              <button
                key={doc.id}
                onClick={() => goToDocument(index)}
                className={`flex-shrink-0 px-3 py-1 text-xs rounded-md transition-colors ${
                  index === currentDocumentIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Document {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 relative bg-gray-50">
        {currentDocument.supabaseLink ? (
          <div className="relative w-full h-full">
            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">Loading document...</p>
                </div>
              </div>
            )}
            
            {iframeError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="text-center">
                  <div className="text-red-500 text-4xl mb-2">⚠️</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Document</h3>
                  <p className="text-gray-600 mb-4">The document could not be loaded in the viewer.</p>
                  <a
                    href={currentDocument.supabaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in New Tab
                  </a>
                </div>
              </div>
            )}
            
            <iframe
              src={`${currentDocument.supabaseLink}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
              className="w-full h-full border-0 bg-white"
              title={`Document ${currentDocumentIndex + 1}`}
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{ minHeight: '600px' }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full bg-white">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">🔗</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Document Not Available</h2>
              <p className="text-gray-600">This document link is not available or has expired.</p>
              <p className="text-sm text-gray-500 mt-2">Please contact the sender for assistance.</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-gray-500">
            These documents were shared with you via email. For security reasons, these links may expire after a certain period.
          </p>
        </div>
      </div>
    </div>
  );
}

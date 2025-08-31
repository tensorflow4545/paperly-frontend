"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  Type, 
  Pen, 
  Check, 
  X,
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  ArrowRight,
  Upload,
  Send
} from "lucide-react";
import PDFEditor from "./PDFEditor";
import SignatureModal from "./SignatureModal";
import DrawingSignature from "./DrawingSignature";
import DocumentUploader from "./DocumentUploader";

export default function DocumentSigningEditor({ documents, documentIds }) {
  // Document IDs are already cleaned in the parent component
  const validDocumentIds = documentIds.filter(id => {
    return id && id.length === 24 && /^[a-fA-F0-9]{24}$/.test(id);
  });
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [signatures, setSignatures] = useState([]);
  const [currentSignature, setCurrentSignature] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showDrawingModal, setShowDrawingModal] = useState(false);
  const [signedDocuments, setSignedDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const currentDocument = documents[currentDocumentIndex];

  // Handle signature placement
  const handleSignaturePlacement = (signature) => {
    setCurrentSignature(signature);
  };

  // Handle signature placement on PDF
  const handleCanvasClick = (signatureData) => {
    if (!currentSignature) return;

    const newSignature = {
      id: Date.now(),
      ...currentSignature,
      ...signatureData,
      documentIndex: currentDocumentIndex,
      documentId: documentIds[currentDocumentIndex]
    };

    setSignatures([...signatures, newSignature]);
    setCurrentSignature(null);
  };

  // Remove signature
  const removeSignature = (signatureId) => {
    setSignatures(signatures.filter(sig => sig.id !== signatureId));
  };

  // Navigate between documents
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

  // Get signatures for current document
  const getCurrentDocumentSignatures = () => {
    return signatures.filter(sig => sig.documentIndex === currentDocumentIndex);
  };

            // Handle document signing completion
          const handleDocumentSigned = async (signedPdfBlob) => {
            const correctDocumentId = validDocumentIds[currentDocumentIndex];
            console.log('Document signed and saved to database:', {
              documentIndex: currentDocumentIndex + 1,
              documentId: correctDocumentId,
              signatures: getCurrentDocumentSignatures().length
            });

            const signedDoc = {
              documentId: correctDocumentId,
              documentIndex: currentDocumentIndex,
              originalDocument: currentDocument,
              signedPdfBlob,
              signatures: getCurrentDocumentSignatures()
            };

            setSignedDocuments(prev => {
              const existing = prev.find(doc => doc.documentIndex === currentDocumentIndex);
              if (existing) {
                return prev.map(doc => 
                  doc.documentIndex === currentDocumentIndex ? signedDoc : doc
                );
              }
              return [...prev, signedDoc];
            });

            // Auto-advance to next document if available
            if (currentDocumentIndex < documents.length - 1) {
              setTimeout(() => {
                setCurrentDocumentIndex(currentDocumentIndex + 1);
              }, 1000);
            }
          };

            // Upload all signed documents
          const uploadAllSignedDocuments = async () => {
            if (signedDocuments.length === 0) {
              alert("No documents have been signed yet.");
              return;
            }

            if (signedDocuments.length < documents.length) {
              const missingCount = documents.length - signedDocuments.length;
              const missingIndices = [];
              for (let i = 0; i < documents.length; i++) {
                if (!signedDocuments.find(doc => doc.documentIndex === i)) {
                  missingIndices.push(i + 1);
                }
              }
              alert(`Warning: Only ${signedDocuments.length} out of ${documents.length} documents are signed.\nMissing documents: ${missingIndices.join(', ')}\nPlease sign all documents before uploading.`);
              return;
            }

            // Get employee email from the first document
            let employeeEmail = documents[0]?.employeeEmail;
            if (!employeeEmail) {
              // Prompt user to enter employee email if not found in documents
              const promptEmail = prompt("Please enter the employee email address to update their status:");
              if (!promptEmail || promptEmail.trim() === '') {
                alert("Employee email is required to update the status. Please try again.");
                return;
              }
              employeeEmail = promptEmail.trim();
            }

            console.log('Starting PATCH request to upload signed documents...');

            setUploading(true);
            setUploadProgress({});

            try {
              for (let i = 0; i < signedDocuments.length; i++) {
                const signedDoc = signedDocuments[i];

                setUploadProgress(prev => ({
                  ...prev,
                  [signedDoc.documentIndex]: { status: 'uploading', progress: 0 }
                }));

                // Validate document ID
                if (!signedDoc.documentId) {
                  throw new Error(`Document ${i + 1} has no valid document ID`);
                }

                // Validate blob
                if (!signedDoc.signedPdfBlob || signedDoc.signedPdfBlob.size === 0) {
                  throw new Error(`Document ${i + 1} has no valid signed PDF blob`);
                }

                // Convert blob to file - use original filename to maintain consistency
                const originalUrl = signedDoc.originalDocument?.supabaseLink;
                const urlParts = originalUrl ? originalUrl.split('/') : [];
                const originalFilename = urlParts.length > 0 ? urlParts[urlParts.length - 1] : `signed_${signedDoc.originalDocument?.documentTitle || 'document'}.pdf`;
                
                const file = new File([signedDoc.signedPdfBlob], originalFilename, { type: 'application/pdf' });

                // Create FormData
                const formData = new FormData();
                formData.append('file', file);

                // Upload to API
                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://paperly-backend-five.vercel.app'}/api/adminDocumentUpload/${signedDoc.documentId}`;
                console.log(`PATCH request ${i + 1}/${signedDocuments.length}: ${apiUrl}`);

                const response = await fetch(apiUrl, {
                  method: 'PATCH',
                  body: formData
                });

                if (!response.ok) {
                  let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                  try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.message || errorMessage;
                  } catch (parseError) {
                    console.warn('Could not parse error response:', parseError);
                  }
                  throw new Error(`Failed to upload document ${i + 1}: ${errorMessage}`);
                }

                const responseData = await response.json();
                console.log(`Document ${i + 1} PATCH response:`, responseData);

                setUploadProgress(prev => ({
                  ...prev,
                  [signedDoc.documentIndex]: { status: 'completed', progress: 100 }
                }));

                // Small delay between uploads
                await new Promise(resolve => setTimeout(resolve, 500));
              }

              // Update employee status to "Signed and Received"
              console.log('Updating employee status to "Signed and Received"...');
              try {
                const statusUpdateUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://paperly-backend-five.vercel.app'}/api/employeeDetails/status-by-email`;
                console.log('Status update URL:', statusUpdateUrl);
                console.log('Status update payload:', { emailAddress: employeeEmail, status: 'Signed and Received' });
                
                const statusUpdateResponse = await fetch(statusUpdateUrl, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    emailAddress: employeeEmail,
                    status: 'Signed and Received'
                  })
                });

           
                if (statusUpdateResponse.ok) {
                  const statusData = await statusUpdateResponse.json();
                  console.log('Employee status PATCH response:', statusData);
                } else {
                  let errorMessage = `HTTP ${statusUpdateResponse.status}: ${statusUpdateResponse.statusText}`;
                  try {
                    const errorData = await statusUpdateResponse.json();
                    errorMessage = errorData.error || errorData.message || errorMessage;
                  } catch (parseError) {
                    console.warn('Could not parse error response:', parseError);
                  }
                  console.warn('Failed to update employee status:', errorMessage);
                }
              } catch (statusError) {
                console.error('Error updating employee status:', statusError);
              }

              console.log('All documents uploaded and employee status updated successfully!');
              alert(`Successfully uploaded ${signedDocuments.length} out of ${documents.length} documents!\n\nEmployee status has been automatically updated to "Signed and Received".\n\nYou can now view and download the signed documents from your employee management page.`);
              
              // Clear signed documents after successful upload
              setSignedDocuments([]);
              setSignatures([]);
              
            } catch (error) {
              console.error('Upload error:', error);
              alert(`Error uploading documents: ${error.message}`);
            } finally {
              setUploading(false);
              setUploadProgress({});
            }
          };

  // Check if all documents are signed
  const allDocumentsSigned = signedDocuments.length === documents.length;



  // Auto-clean existing signed documents with corrected IDs (only run once)
  useEffect(() => {
    if (signedDocuments.length > 0 && validDocumentIds.length > 0) {
      const needsCleaning = signedDocuments.some(signedDoc => 
        !validDocumentIds.includes(signedDoc.documentId)
      );
      
      if (needsCleaning) {
        const cleanedSignedDocuments = signedDocuments.map(signedDoc => ({
          ...signedDoc,
          documentId: validDocumentIds[signedDoc.documentIndex]
        }));
        setSignedDocuments(cleanedSignedDocuments);
      }
    }
  }, []); // Empty dependency array - only run once

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Document Signing</h1>
              <p className="text-sm text-gray-600">
                Document {currentDocumentIndex + 1} of {documents.length}
              </p>
            </div>
          </div>
          
          {/* Document Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousDocument}
              disabled={currentDocumentIndex === 0}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            
            <button
              onClick={goToNextDocument}
              disabled={currentDocumentIndex === documents.length - 1}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Thumbnails */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {documents.map((doc, index) => {
              const isSigned = signedDocuments.some(signed => signed.documentIndex === index);
              const isCurrent = index === currentDocumentIndex;
              
              return (
                <button
                  key={doc.id || index}
                  onClick={() => goToDocument(index)}
                  className={`flex-shrink-0 px-3 py-1 text-xs rounded-md transition-colors flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : isSigned
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSigned && <Check className="w-3 h-3" />}
                  Document {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* PDF Editor */}
        <div className="flex-1">
          <PDFEditor
            document={currentDocument}
            signatures={getCurrentDocumentSignatures()}
            onSignaturePlacement={handleCanvasClick}
            onDocumentSigned={handleDocumentSigned}
            currentSignature={currentSignature}
            onRemoveSignature={removeSignature}
          />
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          {/* Signature Tools */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Signature Tools</h3>
            <div className="space-y-2">
              <button
                onClick={() => setShowSignatureModal(true)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentSignature?.type === 'text' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Type className="w-4 h-4" />
                Text Signature
              </button>
              
              <button
                onClick={() => setShowDrawingModal(true)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentSignature?.type === 'drawing' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Pen className="w-4 h-4" />
                Draw Signature
              </button>
            </div>
          </div>

          {/* Current Document Signatures */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Signatures ({getCurrentDocumentSignatures().length})
            </h3>
            {getCurrentDocumentSignatures().length === 0 ? (
              <p className="text-sm text-gray-500">No signatures added yet</p>
            ) : (
              <div className="space-y-2">
                {getCurrentDocumentSignatures().map((sig, index) => (
                  <div
                    key={sig.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {sig.type === 'text' ? (
                        <Type className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Pen className="w-4 h-4 text-gray-600" />
                      )}
                      <span className="text-sm text-gray-700">
                        {sig.type === 'text' ? sig.text : 'Drawing'}
                      </span>
                    </div>
                    <button
                      onClick={() => removeSignature(sig.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Documents signed:</span>
                <span>{signedDocuments.length} / {documents.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(signedDocuments.length / documents.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          {allDocumentsSigned && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Upload Signed Documents</h3>
              <button
                onClick={uploadAllSignedDocuments}
                disabled={uploading}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  uploading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload All Documents
                  </>
                )}
              </button>
            </div>
          )}

                     {/* Upload Progress */}
           {Object.keys(uploadProgress).length > 0 && (
             <div className="mt-4">
               <h4 className="text-sm font-medium text-gray-900 mb-2">Upload Progress</h4>
               <div className="space-y-2">
                 {Object.entries(uploadProgress).map(([index, progress]) => (
                   <div key={index} className="text-sm">
                     <div className="flex justify-between">
                       <span>Document {parseInt(index) + 1}</span>
                       <span>{progress.status}</span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                       <div 
                         className="bg-green-600 h-1 rounded-full transition-all duration-300"
                         style={{ width: `${progress.progress}%` }}
                       ></div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}


        </div>
      </div>

      {/* Modals */}
      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSignatureSelect={handleSignaturePlacement}
      />
      
      <DrawingSignature
        isOpen={showDrawingModal}
        onClose={() => setShowDrawingModal(false)}
        onSignatureCreate={handleSignaturePlacement}
      />
    </div>
  );
}

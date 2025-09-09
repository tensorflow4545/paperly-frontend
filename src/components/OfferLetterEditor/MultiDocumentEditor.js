"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Edit, 
  Eye, 
  Download, 
  Save, 
  Printer, 
  FileText,
  User,
  Building,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  Globe,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  List,
  ListOrdered,
  ChevronLeft,
  ChevronRight,
  Download as DownloadIcon,
  FileDown,
  X,
  Settings,
  Maximize2,
  Minimize2,
  MoreVertical,
  Check,
  ArrowLeft,
  CheckCircle,
  Share2,
  Send,
  Activity
} from "lucide-react";
import jsPDF from "jspdf";
import { getAuthToken } from '@/utils/auth';

export default function MultiDocumentEditor({ allDocumentsData, onClose, onSave, employeeId }) {
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [editedContents, setEditedContents] = useState({});
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Share functionality states
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  
  const textareaRef = useRef(null);
  const shareDropdownRef = useRef(null);

  // Get list of available documents
  const availableDocuments = [];
  if (allDocumentsData?.offerLetter) availableDocuments.push({ type: 'offerLetter', name: 'Offer Letter', data: allDocumentsData.offerLetter });
  if (allDocumentsData?.salaryLetter) availableDocuments.push({ type: 'salaryLetter', name: 'Salary/CTC Letter', data: allDocumentsData.salaryLetter });
  if (allDocumentsData?.onboardingLetter) availableDocuments.push({ type: 'onboardingLetter', name: 'Onboarding Letter', data: allDocumentsData.onboardingLetter });
  if (allDocumentsData?.nda) availableDocuments.push({ type: 'nda', name: 'NDA', data: allDocumentsData.nda });

  const currentDocument = availableDocuments[currentDocumentIndex];
  const currentContent = editedContents[currentDocument?.type] || 
                        currentDocument?.data?.data?.offerLetter || 
                        currentDocument?.data?.data?.salaryLetter || 
                        currentDocument?.data?.data?.onboardingLetter || 
                        currentDocument?.data?.data?.nda || 
                        "No content available";

  // Initialize content when component mounts or document changes
  useEffect(() => {
    if (currentDocument) {
      const content = currentDocument.data?.data?.offerLetter || 
                     currentDocument.data?.data?.salaryLetter || 
                     currentDocument.data?.data?.onboardingLetter || 
                     currentDocument.data?.data?.nda || 
                     "No content available";
      
      if (!editedContents[currentDocument.type]) {
        setEditedContents(prev => ({
          ...prev,
          [currentDocument.type]: content
        }));
      }
    }
  }, [currentDocument, editedContents]);

  // Update selection state when component re-renders
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      handleTextSelection();
    }
  });

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigateToDocument = (direction) => {
    if (direction === 'prev' && currentDocumentIndex > 0) {
      setCurrentDocumentIndex(currentDocumentIndex - 1);
    } else if (direction === 'next' && currentDocumentIndex < availableDocuments.length - 1) {
      setCurrentDocumentIndex(currentDocumentIndex + 1);
    }
  };

  const handleTextSelection = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = currentContent.substring(start, end);
      
      setSelectionStart(start);
      setSelectionEnd(end);
      setSelectedText(selected);
    }
  };

  const handleTextChange = (e) => {
    const newContent = e.target.value;
    setEditedContents(prev => ({
      ...prev,
      [currentDocument.type]: newContent
    }));
    
    // Update selection after content change
    setTimeout(() => {
      handleTextSelection();
    }, 0);
  };

  const getCurrentSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea) return { text: '', start: 0, end: 0 };
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = currentContent.substring(start, end);
    
    return { text, start, end };
  };

  const handleKeyDown = (e) => {
    // Keyboard shortcuts for formatting
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          applyFormatting('bold');
          break;
        case 'i':
          e.preventDefault();
          applyFormatting('italic');
          break;
        case 'u':
          e.preventDefault();
          applyFormatting('underline');
          break;
      }
    }
  };

  const applyFormatting = (formatType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Get current selection directly from textarea
    const { text: selectedText, start: selectionStart, end: selectionEnd } = getCurrentSelection();
    
    if (!selectedText) {
      return;
    }

    let formattedText = selectedText;
    let prefix = '';
    let suffix = '';

    switch (formatType) {
      case 'bold':
        prefix = '**';
        suffix = '**';
        break;
      case 'italic':
        prefix = '*';
        suffix = '*';
        break;
      case 'underline':
        prefix = '__';
        suffix = '__';
        break;
      case 'heading':
        prefix = '# ';
        break;
      case 'subheading':
        prefix = '## ';
        break;
      case 'bullet':
        prefix = '• ';
        break;
      case 'numbered':
        prefix = '1. ';
        break;
      default:
        return;
    }

    formattedText = prefix + selectedText + suffix;

    const newContent = 
      currentContent.substring(0, selectionStart) + 
      formattedText + 
      currentContent.substring(selectionEnd);

    setEditedContents(prev => ({
      ...prev,
      [currentDocument.type]: newContent
    }));
    
    // Update cursor position and clear selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        selectionStart + prefix.length,
        selectionStart + prefix.length + selectedText.length
      );
      setSelectedText('');
    }, 0);
  };

  const renderFormattedContent = (content) => {
    if (!content) return '';
    
    // Simple approach: just replace the patterns directly
    let processedContent = content;
    
    // Bold
    processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    processedContent = processedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Underline
    processedContent = processedContent.replace(/__(.*?)__/g, '<u>$1</u>');
    
    // Headings
    processedContent = processedContent.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-2">$1</h1>');
    processedContent = processedContent.replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-2">$1</h2>');
    
    // Lists
    processedContent = processedContent.replace(/^• (.*$)/gm, '<li class="ml-4">• $1</li>');
    processedContent = processedContent.replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$&</li>');
    
    // Line breaks
    processedContent = processedContent.replace(/\n/g, '<br>');
    
    return processedContent;
  };

  const handleSaveAsDraft = async () => {
    setIsSavingDraft(true);
    setShowDownloadMenu(false);
    
    try {
      const employeeDetails = availableDocuments[0]?.data?.data?.employeeDetails || {};
      const token = getAuthToken();
      
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      // Validate that employee email is provided
      if (!employeeDetails.emailAddress) {
        throw new Error("Employee email address is required. Please ensure the employee details include a valid email address.");
      }

      let savedCount = 0;
      let errorCount = 0;
      const errors = [];

      // Save all available documents
      for (const doc of availableDocuments) {
        try {
          // Get the content for this document
          const documentContent = editedContents[doc.type] || 
                                 doc.data?.data?.offerLetter || 
                                 doc.data?.data?.salaryLetter || 
                                 doc.data?.data?.onboardingLetter || 
                                 doc.data?.data?.nda || 
                                 "No content available";

          // Create PDF blob for upload
          const pdf = new jsPDF();
          pdf.setFont('helvetica');
          pdf.setFontSize(12);
          
          const margin = 20;
          let yPosition = margin;
          const lineHeight = 7;
          const pageWidth = pdf.internal.pageSize.width;
          const contentWidth = pageWidth - (2 * margin);
          
          const content = documentContent.split('\n');
          
          for (let i = 0; i < content.length; i++) {
            const line = content[i];
            
            if (yPosition > pdf.internal.pageSize.height - margin) {
              pdf.addPage();
              yPosition = margin;
            }
            
            if (line === '') {
              yPosition += lineHeight;
              continue;
            }
            
            let cleanLine = line
              .replace(/\*\*(.*?)\*\*/g, '$1')
              .replace(/\*(.*?)\*/g, '$1')
              .replace(/__(.*?)__/g, '$1')
              .replace(/^# (.*)/, '$1')
              .replace(/^## (.*)/, '$1')
              .replace(/^• (.*)/, '• $1')
              .replace(/^\d+\. (.*)/, '$&');
            
            pdf.setFont('helvetica', 'normal');
            
            if (cleanLine.length > 80) {
              const words = cleanLine.split(' ');
              let currentLine = '';
              
              for (let j = 0; j < words.length; j++) {
                const testLine = currentLine + (currentLine ? ' ' : '') + words[j];
                
                if (pdf.getTextWidth(testLine) > contentWidth) {
                  if (currentLine) {
                    pdf.text(currentLine, margin, yPosition);
                    yPosition += lineHeight;
                    currentLine = words[j];
                  } else {
                    pdf.text(testLine, margin, yPosition);
                    yPosition += lineHeight;
                    currentLine = '';
                  }
                } else {
                  currentLine = testLine;
                }
                
                if (yPosition > pdf.internal.pageSize.height - margin) {
                  pdf.addPage();
                  yPosition = margin;
                }
              }
              
              if (currentLine) {
                pdf.text(currentLine, margin, yPosition);
                yPosition += lineHeight;
              }
            } else {
              pdf.text(cleanLine, margin, yPosition);
              yPosition += lineHeight;
            }
          }
          
          const pdfBlob = pdf.output('blob');
          
          // Create FormData for multipart upload
          const formData = new FormData();
          formData.append('documentType', getApiDocumentType(doc.name));
          formData.append('employeeName', employeeDetails.fullName || '');
          formData.append('employeeEmail', employeeDetails.emailAddress || '');
          formData.append('documentTitle', `${doc.name} - ${employeeDetails.fullName || ''}`);
          formData.append('documentDescription', `Draft ${doc.name} for ${employeeDetails.fullName || 'Employee'}`);
          
          // Add metadata
          const metadata = {
            employeeType: employeeDetails.employeeType || "Employee",
            role: employeeDetails.designation || "",
            salary: employeeDetails.salary || null,
            joiningDate: employeeDetails.joiningDate || null,
            companyName: employeeDetails.companyName || ""
          };
          formData.append('metadata', JSON.stringify(metadata));
          
          // Add tags
          formData.append('tags', JSON.stringify([getApiDocumentType(doc.name), 'Draft']));
          
          // Add PDF file
          const fileName = `${doc.name.toLowerCase().replace(/\s+/g, '-')}-${employeeDetails.fullName || 'employee'}.pdf`;
          formData.append('file', pdfBlob, fileName);

          // Make API call for this document
          const response = await fetch('https://paperly-backend-five.vercel.app/api/adminDocumentUpload', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Failed to save ${doc.name}`);
          }
          
          savedCount++;
          
        } catch (error) {
          console.error(`Error saving ${doc.name}:`, error);
          errorCount++;
          errors.push(`${doc.name}: ${error.message}`);
        }
      }

      // Show appropriate toast based on results
      if (savedCount === availableDocuments.length) {
        // All documents saved successfully
        setToastMessage(`All ${savedCount} documents saved as drafts successfully!`);
        setShowToast(true);
      } else if (savedCount > 0) {
        // Some documents saved, some failed
        setToastMessage(`${savedCount} out of ${availableDocuments.length} documents saved. ${errorCount} failed.`);
        setShowToast(true);
      } else {
        // All documents failed
        throw new Error(`Failed to save any documents. ${errors.join(', ')}`);
      }
      
      // Auto-hide toast after 5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error saving drafts:', error);
      
      // Show error toast
      setErrorMessage(error.message || 'Failed to save drafts. Please try again.');
      setShowErrorToast(true);
      
      // Auto-hide error toast after 5 seconds
      setTimeout(() => {
        setShowErrorToast(false);
      }, 5000);
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Map display names to API document types
  const getApiDocumentType = (displayName) => {
    switch (displayName) {
      case 'Offer Letter': return 'Offer Letter';
      case 'Salary/CTC Letter': return 'Salary Letter';
      case 'Onboarding Letter': return 'Onboarding Letter';
      case 'NDA': return 'NDA';
      default: return 'Other';
    }
  };

  // Share functionality
  const handleShareClick = () => {
    console.log("Share button clicked - opening dropdown");
    setShowShareDropdown(!showShareDropdown);
    setShareEmail("");
    setShareStatus("");
  };

  const handleShareSubmit = async () => {
    if (!shareEmail.trim()) {
      setShareStatus("Please enter a valid email address");
      return;
    }

    setIsSharing(true);
    setShareStatus("Processing...");

    try {
      const employeeDetails = availableDocuments[0]?.data?.data?.employeeDetails || {};
      const token = getAuthToken();
      
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      console.log("Step 1: Saving documents to database");
      setShareStatus("Saving documents...");
      
      const savedDocumentIds = [];
      
      // Save all documents first
      for (const doc of availableDocuments) {
        try {
          const documentContent = editedContents[doc.type] || 
                                 doc.data?.data?.offerLetter || 
                                 doc.data?.data?.salaryLetter || 
                                 doc.data?.data?.onboardingLetter || 
                                 doc.data?.data?.nda || 
                                 "No content available";

          // Create PDF blob
          const pdf = new jsPDF();
          pdf.setFont('helvetica');
          pdf.setFontSize(12);
          
          const margin = 20;
          let yPosition = margin;
          const lineHeight = 7;
          const pageWidth = pdf.internal.pageSize.width;
          const contentWidth = pageWidth - (2 * margin);
          
          const content = documentContent.split('\n');
          
          for (let i = 0; i < content.length; i++) {
            const line = content[i];
            
            if (yPosition > pdf.internal.pageSize.height - margin) {
              pdf.addPage();
              yPosition = margin;
            }
            
            if (line === '') {
              yPosition += lineHeight;
              continue;
            }
            
            let cleanLine = line
              .replace(/\*\*(.*?)\*\*/g, '$1')
              .replace(/\*(.*?)\*/g, '$1')
              .replace(/__(.*?)__/g, '$1')
              .replace(/^# (.*)/, '$1')
              .replace(/^## (.*)/, '$1')
              .replace(/^• (.*)/, '• $1')
              .replace(/^\d+\. (.*)/, '$&');
            
            pdf.setFont('helvetica', 'normal');
            
            if (cleanLine.length > 80) {
              const words = cleanLine.split(' ');
              let currentLine = '';
              
              for (let j = 0; j < words.length; j++) {
                const testLine = currentLine + (currentLine ? ' ' : '') + words[j];
                
                if (pdf.getTextWidth(testLine) > contentWidth) {
                  if (currentLine) {
                    pdf.text(currentLine, margin, yPosition);
                    yPosition += lineHeight;
                    currentLine = words[j];
                  } else {
                    pdf.text(testLine, margin, yPosition);
                    yPosition += lineHeight;
                    currentLine = '';
                  }
                } else {
                  currentLine = testLine;
                }
                
                if (yPosition > pdf.internal.pageSize.height - margin) {
                  pdf.addPage();
                  yPosition = margin;
                }
              }
              
              if (currentLine) {
                pdf.text(currentLine, margin, yPosition);
                yPosition += lineHeight;
              }
            } else {
              pdf.text(cleanLine, margin, yPosition);
              yPosition += lineHeight;
            }
          }
          
          const pdfBlob = pdf.output('blob');
          
          // Create FormData
          const formData = new FormData();
          formData.append('documentType', getApiDocumentType(doc.name));
          formData.append('employeeName', employeeDetails.fullName || '');
          formData.append('employeeEmail', employeeDetails.emailAddress || '');
          formData.append('documentTitle', `${doc.name} - ${employeeDetails.fullName || ''}`);
          formData.append('documentDescription', `${doc.name} for ${employeeDetails.fullName || 'Employee'}`);
          
          const metadata = {
            employeeType: employeeDetails.employeeType || "Employee",
            role: employeeDetails.designation || "",
            salary: employeeDetails.salary || null,
            joiningDate: employeeDetails.joiningDate || null,
            companyName: employeeDetails.companyName || ""
          };
          formData.append('metadata', JSON.stringify(metadata));
          formData.append('tags', JSON.stringify([getApiDocumentType(doc.name), 'Shared']));
          
          const fileName = `${doc.name.toLowerCase().replace(/\s+/g, '-')}-${employeeDetails.fullName || 'employee'}.pdf`;
          formData.append('file', pdfBlob, fileName);

          const response = await fetch('https://paperly-backend-five.vercel.app/api/adminDocumentUpload', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Failed to save ${doc.name}`);
          }
          
          const result = await response.json();
          const documentId = result.data?.savedDocuments?.[0]?.documentId || result.data?.documentId;
          
          console.log(`Document ${doc.name} saved with ID:`, documentId);
          
          if (documentId) {
            savedDocumentIds.push(documentId);
          }
          
        } catch (error) {
          console.error(`Error saving ${doc.name}:`, error);
          throw new Error(`Failed to save ${doc.name}: ${error.message}`);
        }
      }

      console.log("Step 2: Documents saved, generating share link");
      console.log("Saved document IDs:", savedDocumentIds);
      setShareStatus("Generating share link...");
      
      // Check if we have any document IDs
      if (savedDocumentIds.length === 0) {
        throw new Error("No document IDs received from the server. Cannot generate share link.");
      }
      
      // Generate share link using all document IDs separated by dots
      const shareDocumentIds = savedDocumentIds.join('.');
      const shareLink = `https://www.paprly.in/esigndocuments/ids=${shareDocumentIds}`;
      
      console.log("Generated share link:", shareLink);
      
      console.log("Step 3: Sending email with share link");
      setShareStatus("Sending email...");
      
      // Call the email API
      const emailResponse = await fetch('https://paperly-backend-five.vercel.app/api/sendDocumentEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverEmail: shareEmail,
          documentLink: shareLink,
          documentTitle: `Documents for ${employeeDetails.fullName || 'Employee'}`
        })
      });
      
      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        throw new Error(errorData.error || 'Failed to send email');
      }
      
      const emailData = await emailResponse.json();
      console.log("Email sent successfully:", emailData);
      
      console.log("TEST LOG - AFTER EMAIL SUCCESS");
      console.log("=== STARTING STATUS UPDATE PROCESS ===");
      
      // Update employee status if we have an employee ID
      if (employeeId) {
        console.log("Step 4: Updating employee status");
        setShareStatus("Updating employee status...");
        
        try {
          const statusUpdateResponse = await fetch(`https://paperly-backend-five.vercel.app/api/employeeDetails/${employeeId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              status: 'Documents Sent'
            })
          });
          
          if (statusUpdateResponse.ok) {
            console.log("Employee status updated successfully");
          } else {
            console.error("Failed to update employee status:", await statusUpdateResponse.text());
          }
        } catch (statusError) {
          console.error("Error updating employee status:", statusError);
        }
      }
      
      setShareStatus("Success! Documents shared successfully.");
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowShareModal(false);
        setShareEmail("");
        setShareStatus("");
      }, 2000);
      
    } catch (error) {
      console.error('Error sharing documents:', error);
      setShareStatus(`Error: ${error.message}`);
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownload = () => {
    const documentContent = currentContent;
    
    // Create PDF
    const pdf = new jsPDF();
    pdf.setFont('helvetica');
    pdf.setFontSize(12);
    
    const margin = 20;
    let yPosition = margin;
    const lineHeight = 7;
    const pageWidth = pdf.internal.pageSize.width;
    const contentWidth = pageWidth - (2 * margin);
    
    const content = documentContent.split('\n');
    
    for (let i = 0; i < content.length; i++) {
      const line = content[i];
      
      if (yPosition > pdf.internal.pageSize.height - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      
      if (line === '') {
        yPosition += lineHeight;
        continue;
      }
      
      let cleanLine = line
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/__(.*?)__/g, '$1')
        .replace(/^# (.*)/, '$1')
        .replace(/^## (.*)/, '$1')
        .replace(/^• (.*)/, '• $1')
        .replace(/^\d+\. (.*)/, '$&');
      
      pdf.setFont('helvetica', 'normal');
      
      if (cleanLine.length > 80) {
        const words = cleanLine.split(' ');
        let currentLine = '';
        
        for (let j = 0; j < words.length; j++) {
          const testLine = currentLine + (currentLine ? ' ' : '') + words[j];
          
          if (pdf.getTextWidth(testLine) > contentWidth) {
            if (currentLine) {
              pdf.text(currentLine, margin, yPosition);
              yPosition += lineHeight;
              currentLine = words[j];
            } else {
              pdf.text(testLine, margin, yPosition);
              yPosition += lineHeight;
              currentLine = '';
            }
          } else {
            currentLine = testLine;
          }
          
          if (yPosition > pdf.internal.pageSize.height - margin) {
            pdf.addPage();
            yPosition = margin;
          }
        }
        
        if (currentLine) {
          pdf.text(currentLine, margin, yPosition);
          yPosition += lineHeight;
        }
      } else {
        pdf.text(cleanLine, margin, yPosition);
        yPosition += lineHeight;
      }
    }
    
    // Download PDF
    const fileName = `${currentDocument?.name || 'document'}-${Date.now()}.pdf`;
    pdf.save(fileName);
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#fefce8] to-[#fef9c3] flex-1 lg:ml-0 min-h-screen">
      {/* Header */}
      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  Document Editor
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-yellow-500" />
                  {currentDocument?.data?.data?.employeeDetails?.fullName || 'Employee'} • {availableDocuments.length} document{availableDocuments.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleSaveAsDraft}
                disabled={isSavingDraft}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSavingDraft ? 'Saving...' : 'Save as Draft'}
              </Button>
              
                              <div className="relative" ref={shareDropdownRef}>
                  <Button 
                    onClick={handleShareClick}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  
                  {/* Share Dropdown */}
                  {showShareDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-gray-900">Share Documents</h4>
                          <button
                            onClick={() => setShowShareDropdown(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="shareEmail" className="text-xs font-medium text-gray-700">
                              Employee Email
                            </Label>
                            <Input
                              id="shareEmail"
                              type="email"
                              value={shareEmail}
                              onChange={(e) => setShareEmail(e.target.value)}
                              placeholder="Enter employee email address"
                              className="mt-1 text-sm"
                            />
                          </div>
                          
                          {shareStatus && (
                            <div className={`p-2 rounded text-xs ${
                              shareStatus.startsWith('Error') 
                                ? 'bg-red-100 text-red-700' 
                                : shareStatus === 'Success! Documents shared successfully.'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {shareStatus}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              onClick={() => setShowShareDropdown(false)}
                              variant="outline"
                              size="sm"
                              disabled={isSharing}
                              className="text-xs"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleShareSubmit}
                              disabled={isSharing || !shareEmail.trim()}
                              size="sm"
                              className="bg-yellow-600 hover:bg-yellow-700 text-xs"
                            >
                              {isSharing ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                                  Sharing...
                                </>
                              ) : (
                                <>
                                  <Send className="w-3 h-3 mr-1" />
                                  Send
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              
              <Button 
                onClick={onClose}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Document Navigation */}
          {availableDocuments.length > 1 && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => navigateToDocument('prev')}
                    disabled={currentDocumentIndex === 0}
                    variant="outline"
                    size="sm"
                    className="border-gray-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    {availableDocuments.map((doc, index) => (
                      <button
                        key={doc.type}
                        onClick={() => setCurrentDocumentIndex(index)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          index === currentDocumentIndex
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {doc.name}
                      </button>
                    ))}
                  </div>
                  
                  <Button
                    onClick={() => navigateToDocument('next')}
                    disabled={currentDocumentIndex === availableDocuments.length - 1}
                    variant="outline"
                    size="sm"
                    className="border-gray-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    className="border-gray-300"
                    title="Download all documents"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Editor Content - Side by Side Layout */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex h-[calc(100vh-300px)]">
              {/* Left Side - Editor */}
              <div className="w-1/2 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Edit className="w-5 h-5 text-yellow-600" />
                    Edit Document
                  </h3>
                </div>
                
                <div className="flex-1 flex flex-col p-4">
                  {/* Formatting Toolbar */}
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg mb-4">
                    <Button
                      onClick={() => applyFormatting('bold')}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-100"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => applyFormatting('italic')}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-100"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => applyFormatting('underline')}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-100"
                      title="Underline (Ctrl+U)"
                    >
                      <Underline className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <Button
                      onClick={() => applyFormatting('heading')}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-100"
                    >
                      <Type className="w-4 h-4 mr-1" />
                      H1
                    </Button>
                    <Button
                      onClick={() => applyFormatting('subheading')}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-100"
                    >
                      <Type className="w-4 h-4 mr-1" />
                      H2
                    </Button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <Button
                      onClick={() => applyFormatting('bullet')}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-100"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => applyFormatting('numbered')}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-100"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Text Editor */}
                  <div className="flex-1">
                    <Textarea
                      ref={textareaRef}
                      value={currentContent}
                      onChange={handleTextChange}
                      onKeyDown={handleKeyDown}
                      onSelect={handleTextSelection}
                      className="w-full h-full resize-none border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 text-sm leading-relaxed"
                      placeholder="Start editing your document..."
                    />
                  </div>
                </div>
              </div>
              
              {/* Right Side - Live Preview */}
              <div className="w-1/2 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-yellow-600" />
                    Live Preview
                  </h3>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="prose max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{ __html: renderFormattedContent(currentContent) }}
                      className="text-gray-900 leading-relaxed text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Toast Notifications */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {toastMessage}
          </div>
        </div>
      )}

      {showErrorToast && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <X className="w-5 h-5 mr-2" />
            {errorMessage}
          </div>
        </div>
      )}
    </div>
  );
}
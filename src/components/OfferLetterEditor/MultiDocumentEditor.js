"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Send
} from "lucide-react";
import jsPDF from 'jspdf';
import { getAuthToken } from '@/utils/auth';

export default function MultiDocumentEditor({ allDocumentsData, onClose, onSave, employeeId }) {
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [editedContents, setEditedContents] = useState({});
  const [activeTab, setActiveTab] = useState("preview");
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
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  
  const textareaRef = useRef(null);

  // Get list of available documents
  const availableDocuments = [];
  if (allDocumentsData?.offerLetter) availableDocuments.push({ type: 'offerLetter', name: 'Offer Letter', data: allDocumentsData.offerLetter });
  if (allDocumentsData?.salaryLetter) availableDocuments.push({ type: 'salaryLetter', name: 'Salary/CTC Letter', data: allDocumentsData.salaryLetter });
  if (allDocumentsData?.onboardingLetter) availableDocuments.push({ type: 'onboardingLetter', name: 'Onboarding Letter', data: allDocumentsData.onboardingLetter });
  if (allDocumentsData?.nda) availableDocuments.push({ type: 'nda', name: 'NDA', data: allDocumentsData.nda });

  const currentDocument = availableDocuments[currentDocumentIndex];
  const currentContent = editedContents[currentDocument?.type] || currentDocument?.data?.data?.offerLetter || 
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
    
    // Test the regex patterns
    const boldMatches = content.match(/\*\*([^*]+)\*\*/g);
    
    // Process bold text
    processedContent = processedContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Process italic text
    processedContent = processedContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Process underlined text
    processedContent = processedContent.replace(/__([^_]+)__/g, '<u>$1</u>');
    
    
    // Then split into lines for block-level formatting
    const lines = processedContent.split('\n');
    let result = '';
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Handle headings
      if (line.startsWith('<strong># ')) {
        line = line.replace(/^<strong># <\/strong>(.*)/, '<h1 class="text-2xl font-bold mb-4">$1</h1>');
        result += line;
      }
      else if (line.startsWith('<strong>## ')) {
        line = line.replace(/^<strong>## <\/strong>(.*)/, '<h2 class="text-xl font-semibold mb-3">$1</h2>');
        result += line;
      }
      // Handle bullet points
      else if (line.startsWith('• ')) {
        if (!inList) {
          result += '<ul class="list-disc ml-6 mb-4">';
          inList = true;
        }
        line = line.replace(/^• (.*)/, '<li class="mb-2">$1</li>');
        result += line;
      }
      // Handle numbered lists
      else if (/^\d+\. /.test(line)) {
        if (!inList) {
          result += '<ol class="list-decimal ml-6 mb-4">';
          inList = true;
        }
        line = line.replace(/^\d+\. (.*)/, '<li class="mb-2">$1</li>');
        result += line;
      }
      // Close list if we were in one
      else if (inList && line.trim() === '') {
        result += '</ul></ol>';
        inList = false;
        result += '<br>';
      }
      // Regular line
      else {
        if (inList) {
          result += '</ul></ol>';
          inList = false;
        }
        
        if (line.trim() === '') {
          result += '<br>';
        } else {
          result += `<p class="mb-3">${line}</p>`;
        }
      }
    }
    
    // Close any open list
    if (inList) {
      result += '</ul></ol>';
    }
    
    return result;
  };

  const handleDownloadCurrent = () => {
    // Create a new PDF document
    const pdf = new jsPDF();
    pdf.setFont('helvetica');
    pdf.setFontSize(12);
    
    const margin = 20;
    let yPosition = margin;
    const lineHeight = 7;
    const pageWidth = pdf.internal.pageSize.width;
    const contentWidth = pageWidth - (2 * margin);
    
    const content = currentContent.split('\n');
    
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
    
    const employeeDetails = currentDocument.data?.data?.employeeDetails || {};
    const fileName = `${currentDocument.name.toLowerCase().replace(/\s+/g, '-')}-${employeeDetails.fullName || 'employee'}.pdf`;
    pdf.save(fileName);
  };

  const handleDownloadAll = () => {
    availableDocuments.forEach((doc, index) => {
      const content = editedContents[doc.type] || 
                     doc.data?.data?.offerLetter || 
                     doc.data?.data?.salaryLetter || 
                     doc.data?.data?.onboardingLetter || 
                     doc.data?.data?.nda || 
                     "No content available";
      
      const pdf = new jsPDF();
      pdf.setFont('helvetica');
      pdf.setFontSize(12);
      
      const margin = 20;
      let yPosition = margin;
      const lineHeight = 7;
      const pageWidth = pdf.internal.pageSize.width;
      const contentWidth = pageWidth - (2 * margin);
      
      const contentLines = content.split('\n');
      
      for (let i = 0; i < contentLines.length; i++) {
        const line = contentLines[i];
        
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
      
      const employeeDetails = doc.data?.data?.employeeDetails || {};
      const fileName = `${doc.name.toLowerCase().replace(/\s+/g, '-')}-${employeeDetails.fullName || 'employee'}.pdf`;
      pdf.save(fileName);
    });
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
          formData.append('employeeName', employeeDetails.fullName || 'Employee');
          formData.append('employeeEmail', employeeDetails.email || 'employee@example.com');
          formData.append('documentTitle', `${doc.name} - ${employeeDetails.fullName || 'Employee'}`);
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
    console.log("Share button clicked - opening modal");
    setShowShareModal(true);
    setShareEmail("");
    setShareStatus("");
  };

  const handleShareSubmit = async () => {
    if (!shareEmail.trim()) {
      setShareStatus("Please enter a valid email address");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shareEmail)) {
      setShareStatus("Please enter a valid email address");
      return;
    }

    setIsSharing(true);
    setShareStatus("Saving documents to database...");
    
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      console.log("Step 1: Saving documents to database");
      
      // Save all documents and collect their IDs
      const savedDocumentIds = [];
      const employeeDetails = availableDocuments[0]?.data?.data?.employeeDetails || {};
      
      for (const doc of availableDocuments) {
        try {
          setShareStatus(`Saving ${doc.name}...`);
          
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
          formData.append('employeeName', employeeDetails.fullName || 'Employee');
          formData.append('employeeEmail', employeeDetails.email || 'employee@example.com');
          formData.append('documentTitle', `${doc.name} - ${employeeDetails.fullName || 'Employee'}`);
          formData.append('documentDescription', `Shared ${doc.name} for ${employeeDetails.fullName || 'Employee'}`);
          
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
          formData.append('tags', JSON.stringify([getApiDocumentType(doc.name), 'Shared']));
          
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
          
          const responseData = await response.json();
          console.log(`Document ${doc.name} saved with response:`, responseData);
          
          // Handle both single document and multiple documents response structure
          let documentId = null;
          if (responseData.data?.documentId) {
            // Single document response
            documentId = responseData.data.documentId;
          } else if (responseData.data?.savedDocuments && responseData.data.savedDocuments.length > 0) {
            // Multiple documents response - take the first one
            documentId = responseData.data.savedDocuments[0].documentId;
          }
          
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
      
      // Simple test to see if code is executing
      console.log("About to start status update try block");
      
      try {
        console.log("Inside try block - status update");
        // Debug: Check if employeeId is available
        console.log("Employee ID for status update:", employeeId);
        console.log("All documents data:", allDocumentsData);
        
        // Try to get employee ID from multiple sources
        let finalEmployeeId = employeeId;
        console.log("Initial employeeId prop:", employeeId);
        
        if (!finalEmployeeId && allDocumentsData?.employeeId) {
          finalEmployeeId = allDocumentsData.employeeId;
          console.log("Found employee ID in allDocumentsData:", finalEmployeeId);
        }
        if (!finalEmployeeId && availableDocuments[0]?.data?.data?.employeeDetails?._id) {
          finalEmployeeId = availableDocuments[0].data.data.employeeDetails._id;
          console.log("Found employee ID in employee details:", finalEmployeeId);
        }
        
        // Additional fallback: try to get from any document's employee details
        if (!finalEmployeeId) {
          for (let i = 0; i < availableDocuments.length; i++) {
            const doc = availableDocuments[i];
            if (doc?.data?.data?.employeeDetails?._id) {
              finalEmployeeId = doc.data.data.employeeDetails._id;
              console.log(`Found employee ID in document ${i}:`, finalEmployeeId);
              break;
            }
          }
        }
        
        // Update employee status to "Document Sent" after successful email
        if (finalEmployeeId) {
          console.log("Updating employee status for ID:", finalEmployeeId);
          try {
            const statusResponse = await fetch(`https://paperly-backend-five.vercel.app/api/employeeDetails/${finalEmployeeId}/status`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                status: "Document Sent"
              })
            });
            
            if (statusResponse.ok) {
              const statusData = await statusResponse.json();
              console.log("Employee status updated successfully:", statusData);
              console.log("Employee ID:", finalEmployeeId, "Status updated to: Document Sent");
                      } else {
            const errorText = await statusResponse.text();
            console.warn("Failed to update employee status:", errorText);
            console.warn("Status update endpoint might not be available on the server");
          }
          } catch (statusError) {
            console.warn("Error updating employee status:", statusError);
          }
        } else {
          console.warn("No employee ID available for status update");
        }
        
        console.log("=== STATUS UPDATE PROCESS COMPLETED ===");
      } catch (statusUpdateError) {
        console.error("Error in status update process:", statusUpdateError);
      }
      
      setShareStatus("Success! Email sent successfully.");
      
      // Show success toast with refresh note
      setToastMessage(`Documents shared successfully with ${shareEmail}! Employee status updated to "Document Sent". Refresh the employee list to see the updated status.`);
      setShowToast(true);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowShareModal(false);
        setShareEmail("");
        setShareStatus("");
      }, 2000);
      
    } catch (error) {
      console.error('Error sharing documents:', error);
      setShareStatus(`Error: ${error.message}`);
      
      // Show error toast
      setErrorMessage(`Failed to share documents: ${error.message}`);
      setShowErrorToast(true);
    } finally {
      setIsSharing(false);
    }
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setShareEmail("");
    setShareStatus("");
    setIsSharing(false);
  };

  // Toast close functions
  const closeToast = () => {
    setShowToast(false);
  };

  const closeErrorToast = () => {
    setShowErrorToast(false);
  };

  if (!allDocumentsData || availableDocuments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No documents available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white min-h-screen">
      {/* Sleek Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Large Icon */}
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Document Editor</h1>
              <p className="text-sm text-gray-500">
                {currentDocument?.data?.data?.employeeDetails?.fullName || 'Employee'} • {availableDocuments.length} document{availableDocuments.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Share Button */}
            <Button 
              onClick={handleShareClick}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
            </Button>
            
            {/* Download Menu */}
            <div className="relative">
              <Button 
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-lg transition-all duration-200"
              >
                <Download className="w-4 h-4" />
              </Button>
              
              {showDownloadMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => {
                      handleDownloadCurrent();
                      setShowDownloadMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Current Document</span>
                  </button>
                  <button
                    onClick={() => {
                      handleDownloadAll();
                      setShowDownloadMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>All Documents</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleSaveAsDraft}
                    disabled={isSavingDraft}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingDraft ? 'Saving...' : 'Save as Draft'}</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Close Button */}
            <Button 
              variant="outline" 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Document Navigation */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigateToDocument('prev')}
              disabled={currentDocumentIndex === 0}
              className="p-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              {availableDocuments.map((doc, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDocumentIndex(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    index === currentDocumentIndex
                      ? 'bg-yellow-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {doc.name}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => navigateToDocument('next')}
              disabled={currentDocumentIndex === availableDocuments.length - 1}
              className="p-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {currentDocumentIndex + 1} of {availableDocuments.length}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Editor Section */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          {/* Tab Navigation */}
          <div className="border-b border-gray-100 bg-gray-50">
            <div className="flex">
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center space-x-2 px-8 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "preview"
                    ? "border-yellow-500 text-yellow-700 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab("edit")}
                className={`flex items-center space-x-2 px-8 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "edit"
                    ? "border-yellow-500 text-yellow-700 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "preview" && (
              <div className="bg-gray-50 rounded-lg p-8 min-h-[700px] font-serif">
                <div 
                  className="text-gray-800 leading-relaxed max-w-4xl mx-auto"
                  dangerouslySetInnerHTML={{ 
                    __html: renderFormattedContent(currentContent) 
                  }}
                />
              </div>
            )}

            {activeTab === "edit" && (
              <div className="space-y-6">
                {/* Sleek Toolbar */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900">Formatting Tools</h3>
                    <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                      {selectedText ? `Selected: "${selectedText.substring(0, 20)}${selectedText.length > 20 ? '...' : ''}"` : 'No text selected'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('bold')}
                      className="flex items-center space-x-2 px-3 py-2 text-xs font-medium border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-200"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold className="w-3 h-3" />
                      <span>Bold</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('italic')}
                      className="flex items-center space-x-2 px-3 py-2 text-xs font-medium border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-200"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic className="w-3 h-3" />
                      <span>Italic</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('underline')}
                      className="flex items-center space-x-2 px-3 py-2 text-xs font-medium border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-200"
                      title="Underline (Ctrl+U)"
                    >
                      <Underline className="w-3 h-3" />
                      <span>Underline</span>
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-2"></div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('heading')}
                      className="flex items-center space-x-2 px-3 py-2 text-xs font-medium border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-200"
                      title="Heading"
                    >
                      <Type className="w-3 h-3" />
                      <span>Heading</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('bullet')}
                      className="flex items-center space-x-2 px-3 py-2 text-xs font-medium border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-200"
                      title="Bullet List"
                    >
                      <List className="w-3 h-3" />
                      <span>List</span>
                    </Button>
                  </div>
                </div>

                {/* Editor Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Editor Panel */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-gray-900">Source Editor</Label>
                      <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">Markdown</span>
                    </div>
                    <Textarea
                      ref={textareaRef}
                      value={currentContent}
                      onChange={handleTextChange}
                      onSelect={handleTextSelection}
                      onKeyDown={handleKeyDown}
                      className="h-[600px] font-mono text-sm border-gray-200 focus:border-yellow-500 focus:ring-yellow-500/20 bg-white shadow-sm resize-none overflow-y-auto"
                      placeholder="Edit the document content here..."
                    />
                  </div>
                  
                  {/* Live Preview Panel */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-gray-900">Live Preview</Label>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Real-time</span>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6 h-[600px] font-serif bg-white overflow-y-auto shadow-sm">
                      <div 
                        className="text-gray-800 leading-relaxed text-sm"
                        dangerouslySetInnerHTML={{ 
                          __html: renderFormattedContent(currentContent) 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Reference */}
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-3">Quick Reference</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-2 py-1 rounded text-yellow-800 border border-yellow-200">**text**</code>
                      <span className="text-yellow-700">Bold</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-2 py-1 rounded text-yellow-800 border border-yellow-200">*text*</code>
                      <span className="text-yellow-700">Italic</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-2 py-1 rounded text-yellow-800 border border-yellow-200">__text__</code>
                      <span className="text-yellow-700">Underline</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-2 py-1 rounded text-yellow-800 border border-yellow-200"># heading</code>
                      <span className="text-yellow-700">Heading</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg shadow-lg max-w-sm">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">
              {toastMessage}
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
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg shadow-lg max-w-sm">
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
            <p className="text-red-800 font-medium">{errorMessage}</p>
            <button
              onClick={closeErrorToast}
              className="ml-auto p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Share2 className="w-5 h-5 text-blue-500" />
                <span>Share Documents</span>
              </h2>
              <button
                onClick={closeShareModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isSharing}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="shareEmail" className="text-sm font-medium text-gray-700">
                  Recipient Email
                </Label>
                <Input
                  id="shareEmail"
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="mt-1"
                  disabled={isSharing}
                />
              </div>

              {shareStatus && (
                <div className={`p-3 rounded-lg text-sm ${
                  shareStatus.startsWith('Error:') 
                    ? 'bg-red-50 text-red-700 border border-red-200' 
                    : shareStatus === 'Success! Email sent successfully.'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {shareStatus}
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">What will happen:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Documents will be saved to the database</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>A secure link will be generated</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Email will be sent with the link</span>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={closeShareModal}
                  variant="outline"
                  className="flex-1"
                  disabled={isSharing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleShareSubmit}
                  disabled={isSharing || !shareEmail.trim()}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white flex items-center space-x-2"
                >
                  {isSharing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
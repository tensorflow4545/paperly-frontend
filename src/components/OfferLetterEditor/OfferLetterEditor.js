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
  ListOrdered
} from "lucide-react";
import jsPDF from 'jspdf';

export default function OfferLetterEditor({ offerLetterData, onClose, onSave }) {
  const [editedContent, setEditedContent] = useState("");
  const [activeTab, setActiveTab] = useState("preview");
  const [selectedText, setSelectedText] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const textareaRef = useRef(null);

  // Initialize content when component mounts or data changes
  useEffect(() => {
    if (offerLetterData?.data?.offerLetter) {
      const rawContent = offerLetterData.data.offerLetter;
      setEditedContent(rawContent);
    } else {
      // Show message if no content available
      setEditedContent("No offer letter content available. Please generate an offer letter first.");
    }
  }, [offerLetterData]);

  // Update selection state when component re-renders
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      handleTextSelection();
    }
  });

  const formatOfferLetter = (rawContent, data) => {
    // If we have content from API, use it directly
    if (rawContent && rawContent.trim()) {
      return rawContent.trim();
    }

    // Only generate default content if no API content exists
    return "No offer letter content available. Please generate an offer letter first.";
  };

  const handleTextSelection = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = editedContent.substring(start, end);
      
      setSelectionStart(start);
      setSelectionEnd(end);
      setSelectedText(selected);
    }
  };

  const handleTextChange = (e) => {
    setEditedContent(e.target.value);
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
    const text = editedContent.substring(start, end);
    
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
      console.log('No text selected');
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
    
    console.log('Selected text:', selectedText);
    console.log('Formatted text:', formattedText);

    const newContent = 
      editedContent.substring(0, selectionStart) + 
      formattedText + 
      editedContent.substring(selectionEnd);
    
    console.log('New content:', newContent);

    setEditedContent(newContent);
    
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
    
    console.log('Original content:', content);
    
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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const formattedHtml = renderFormattedContent(editedContent);
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Offer Letter - ${offerLetterData?.data?.employeeDetails?.fullName}</title>
          <style>
            body { 
              font-family: 'Times New Roman', serif; 
              line-height: 1.6; 
              margin: 40px; 
              color: #333;
              font-size: 12pt;
            }
            h1 { font-size: 18pt; font-weight: bold; margin-bottom: 16px; }
            h2 { font-size: 14pt; font-weight: bold; margin-bottom: 12px; }
            strong { font-weight: bold; }
            em { font-style: italic; }
            u { text-decoration: underline; }
            li { margin-bottom: 4px; }
            p { margin-bottom: 12px; }
            ul, ol { margin-bottom: 16px; }
            @media print { 
              body { margin: 20px; } 
            }
          </style>
        </head>
        <body>
          <div>${formattedHtml}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownload = () => {
    // Create a new PDF document
    const pdf = new jsPDF();
    
    // Set font and size
    pdf.setFont('helvetica');
    pdf.setFontSize(12);
    
    // Set margins and starting position
    const margin = 20;
    let yPosition = margin;
    const lineHeight = 7;
    const pageWidth = pdf.internal.pageSize.width;
    const contentWidth = pageWidth - (2 * margin);
    
    // Use the current edited content
    const content = editedContent.split('\n');
    
    for (let i = 0; i < content.length; i++) {
      const line = content[i];
      
      // Check if we need a new page
      if (yPosition > pdf.internal.pageSize.height - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      
      // Handle empty lines (preserve spacing)
      if (line === '') {
        yPosition += lineHeight;
        continue;
      }
      
      // Clean the line by removing all markdown formatting
      let cleanLine = line
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers but keep text
        .replace(/\*(.*?)\*/g, '$1')     // Remove italic markers but keep text
        .replace(/__(.*?)__/g, '$1')     // Remove underline markers but keep text
        .replace(/^# (.*)/, '$1')        // Remove heading markers but keep text
        .replace(/^## (.*)/, '$1')       // Remove subheading markers but keep text
        .replace(/^• (.*)/, '• $1')      // Keep bullet points
        .replace(/^\d+\. (.*)/, '$&');   // Keep numbered lists
      
      // Set font to normal for clean text
      pdf.setFont('helvetica', 'normal');
      
      // Handle long lines by wrapping them
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
          
          // Check if we need a new page
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
    
    // Save the PDF
    const employeeDetails = offerLetterData?.data?.employeeDetails || {};
    const fileName = `offer-letter-${employeeDetails.fullName || 'employee'}.pdf`;
    pdf.save(fileName);
  };

  if (!offerLetterData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No offer letter data available</p>
        </div>
      </div>
    );
  }

    return (
    <div className="w-full max-w-7xl mx-auto bg-[linear-gradient(180deg,#FDF9EDFF_0%,#F5E6A8FF_100%)] min-h-screen">
      {/* Professional Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 px-8 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Offer Letter Editor</h1>
              <p className="text-sm text-gray-600">
                {offerLetterData?.data?.employeeDetails?.fullName || 'Employee'} • {offerLetterData?.data?.employeeDetails?.role || 'Position'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </Button>
            <Button 
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            >
              Close
            </Button>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Employee</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Name</span>
                <span className="font-medium text-gray-800">{offerLetterData?.data?.employeeDetails?.fullName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Role</span>
                <span className="font-medium text-gray-800">{offerLetterData?.data?.employeeDetails?.role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Salary</span>
                <span className="font-medium text-gray-800">${offerLetterData?.data?.employeeDetails?.salary?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <Building className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Company</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Name</span>
                <span className="font-medium text-gray-800">{offerLetterData?.data?.companyDetails?.companyName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">HR Manager</span>
                <span className="font-medium text-gray-800">{offerLetterData?.data?.companyDetails?.hrName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-800">{offerLetterData?.data?.companyDetails?.companyEmail}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Timeline</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium text-gray-800">{offerLetterData?.data?.employeeDetails?.joiningDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Type</span>
                <span className="font-medium text-gray-800">{offerLetterData?.data?.employeeDetails?.employeeType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tenure</span>
                <span className="font-medium text-gray-800">{offerLetterData?.data?.employeeDetails?.tenure}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-xl">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-gray-100/50">
            <div className="flex">
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "preview"
                    ? "border-amber-500 text-amber-700 bg-white/50"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-white/30"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab("edit")}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "edit"
                    ? "border-amber-500 text-amber-700 bg-white/50"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-white/30"
                }`}
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "preview" && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 min-h-[600px] font-serif shadow-inner">
                <div 
                  className="text-gray-800 leading-relaxed max-w-4xl mx-auto"
                  dangerouslySetInnerHTML={{ 
                    __html: renderFormattedContent(editedContent) 
                  }}
                />
              </div>
            )}

            {activeTab === "edit" && (
              <div className="space-y-6">
                {/* Professional Toolbar */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200/50 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">Formatting Tools</h3>
                    <span className="text-xs text-gray-600 bg-white/50 px-2 py-1 rounded">
                      {selectedText ? `Selected: "${selectedText.substring(0, 20)}${selectedText.length > 20 ? '...' : ''}"` : 'No text selected'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('bold')}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium border-gray-300 hover:border-gray-400 hover:bg-white/50"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold className="w-3 h-3" />
                      <span>Bold</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('italic')}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium border-gray-300 hover:border-gray-400 hover:bg-white/50"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic className="w-3 h-3" />
                      <span>Italic</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('underline')}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium border-gray-300 hover:border-gray-400 hover:bg-white/50"
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
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium border-gray-300 hover:border-gray-400 hover:bg-white/50"
                      title="Heading"
                    >
                      <Type className="w-3 h-3" />
                      <span>Heading</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyFormatting('bullet')}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium border-gray-300 hover:border-gray-400 hover:bg-white/50"
                      title="Bullet List"
                    >
                      <List className="w-3 h-3" />
                      <span>List</span>
                    </Button>
                  </div>
                </div>

                {/* Editor Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Editor Panel */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-gray-800">Source Editor</Label>
                      <span className="text-xs text-gray-600 font-mono bg-white/50 px-2 py-1 rounded">Markdown</span>
                    </div>
                    <Textarea
                      ref={textareaRef}
                      value={editedContent}
                      onChange={handleTextChange}
                      onSelect={handleTextSelection}
                      onKeyDown={handleKeyDown}
                      className="min-h-[500px] font-mono text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500/20 bg-white/80 backdrop-blur-sm shadow-sm"
                      placeholder="Edit the offer letter content here..."
                    />
                  </div>
                  
                  {/* Live Preview Panel */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-gray-800">Live Preview</Label>
                      <span className="text-xs text-gray-600 bg-white/50 px-2 py-1 rounded">Real-time</span>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-6 min-h-[500px] font-serif bg-white/90 backdrop-blur-sm overflow-auto shadow-sm">
                      <div 
                        className="text-gray-800 leading-relaxed text-sm"
                        dangerouslySetInnerHTML={{ 
                          __html: renderFormattedContent(editedContent) 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Reference */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200/50 shadow-sm">
                  <h4 className="text-sm font-semibold text-amber-800 mb-2">Quick Reference</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <code className="bg-white/80 px-2 py-1 rounded text-amber-800 border border-amber-200/50">**text**</code>
                      <span className="text-amber-700">Bold</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white/80 px-2 py-1 rounded text-amber-800 border border-amber-200/50">*text*</code>
                      <span className="text-amber-700">Italic</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white/80 px-2 py-1 rounded text-amber-800 border border-amber-200/50">__text__</code>
                      <span className="text-amber-700">Underline</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white/80 px-2 py-1 rounded text-amber-800 border border-amber-200/50"># heading</code>
                      <span className="text-amber-700">Heading</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

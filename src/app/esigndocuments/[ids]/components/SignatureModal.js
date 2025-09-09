"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Type } from 'lucide-react';

const fontOptions = [
  { id: 'cursive', name: 'Cursive', preview: 'Cursive' },
  { id: 'dancing', name: 'Dancing Script', preview: 'Dancing' },
  { id: 'satisfy', name: 'Satisfy', preview: 'Satisfy' },
  { id: 'great-vibes', name: 'Great Vibes', preview: 'Great Vibes' },
  { id: 'sacramento', name: 'Sacramento', preview: 'Sacramento' },
  { id: 'allura', name: 'Allura', preview: 'Allura' }
];

const colorOptions = [
  '#000000', '#1f2937', '#374151', '#6b7280', '#9ca3af',
  '#dc2626', '#ea580c', '#d97706', '#65a30d', '#059669',
  '#0891b2', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'
];

export default function SignatureModal({ isOpen, onClose, onSignatureSelect }) {
  const [signatureText, setSignatureText] = useState('');
  const [selectedFont, setSelectedFont] = useState('cursive');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleCreateSignature = () => {
    if (!signatureText.trim()) {
      alert('Please enter your signature text');
      return;
    }

    const signature = {
      type: 'text',
      text: signatureText.trim(),
      font: selectedFont,
      fontFamily: getFontFamily(selectedFont),
      color: selectedColor
    };

    onSignatureSelect(signature);
    onClose();
    
    // Reset form
    setSignatureText('');
    setSelectedFont('cursive');
    setSelectedColor('#000000');
  };

  const getFontFamily = (fontId) => {
    const fontMap = {
      'cursive': 'cursive',
      'dancing': '"Dancing Script", cursive',
      'satisfy': '"Satisfy", cursive',
      'great-vibes': '"Great Vibes", cursive',
      'sacramento': '"Sacramento", cursive',
      'allura': '"Allura", cursive'
    };
    return fontMap[fontId] || 'cursive';
  };

  const getFontStyle = (fontId) => {
    return {
      fontFamily: getFontFamily(fontId),
      color: selectedColor
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Type className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Create Text Signature</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Signature Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signature Text
                </label>
                <input
                  type="text"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  placeholder="Enter your signature..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {signatureText.length}/50 characters
                </p>
              </div>

              {/* Font Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Font Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {fontOptions.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFont(font.id)}
                      className={`p-3 border rounded-lg text-left transition-all duration-200 ${
                        selectedFont === font.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="text-lg font-medium"
                        style={getFontStyle(font.id)}
                      >
                        {font.preview}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {font.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === color
                            ? 'border-gray-800 scale-110'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Palette className="w-4 h-4" />
                    Custom
                  </button>
                </div>
                
                {showColorPicker && (
                  <div className="mt-3">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Preview */}
              {signatureText && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg min-h-[60px]">
                    <span
                      className="text-2xl font-medium"
                      style={getFontStyle(selectedFont)}
                    >
                      {signatureText}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSignature}
                disabled={!signatureText.trim()}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  signatureText.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Create Signature
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}






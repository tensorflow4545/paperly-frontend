"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Palette, Download } from "lucide-react";

const colorOptions = [
  "#000000",
  "#1f2937",
  "#374151",
  "#6b7280",
  "#9ca3af",
  "#dc2626",
  "#ea580c",
  "#d97706",
  "#65a30d",
  "#059669",
  "#0891b2",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
];

export default function DrawingSignature({
  isOpen,
  onClose,
  onSignatureCreate,
}) {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas size
      canvas.width = 400;
      canvas.height = 200;

      // Set initial context properties
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = selectedColor;
      context.lineWidth = brushSize;
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);

      contextRef.current = context;
    }
  }, [isOpen, selectedColor, brushSize]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setHasDrawn(true);

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const context = contextRef.current;
    if (context) {
      context.fillStyle = "white";
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setHasDrawn(false);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  };

  const handleBrushSizeChange = (size) => {
    setBrushSize(size);
    if (contextRef.current) {
      contextRef.current.lineWidth = size;
    }
  };

  const handleCreateSignature = () => {
    if (!hasDrawn) {
      alert("Please draw your signature first");
      return;
    }

    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");

    const signature = {
      type: "drawing",
      dataUrl: dataUrl,
    };

    onSignatureCreate(signature);
    onClose();

    // Reset canvas
    clearCanvas();
  };

  const handleClose = () => {
    onClose();
    clearCanvas();
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
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Download className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Draw Your Signature
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Drawing Canvas */}
              <div className="flex justify-center">
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      const touch = e.touches[0];
                      const mouseEvent = new MouseEvent("mousedown", {
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                      });
                      startDrawing(mouseEvent);
                    }}
                    onTouchMove={(e) => {
                      e.preventDefault();
                      const touch = e.touches[0];
                      const mouseEvent = new MouseEvent("mousemove", {
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                      });
                      draw(mouseEvent);
                    }}
                    onTouchEnd={stopDrawing}
                    className="cursor-crosshair bg-white"
                    style={{ touchAction: "none" }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === color
                            ? "border-gray-800 scale-110"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Brush Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brush Size: {brushSize}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={brushSize}
                    onChange={(e) =>
                      handleBrushSizeChange(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={clearCanvas}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 Draw your signature in the box above. You can adjust the
                  color and brush size to match your style.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSignature}
                disabled={!hasDrawn}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  hasDrawn
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
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

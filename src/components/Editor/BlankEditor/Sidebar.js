"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FileText, Palette, Download, X, Clipboard, Briefcase, FileCheck, Users } from 'lucide-react'

export default function Sidebar({ onClose, theme }) {
  const [activeTab, setActiveTab] = useState('sections')

  const tabs = [
    { id: 'sections', label: 'Sections', icon: Clipboard },
    { id: 'styles', label: 'Styles', icon: Palette },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'export', label: 'Export', icon: Download },
  ]

  const sections = [
    { id: 'intro', label: 'Introduction', type: 'text' },
    { id: 'features', label: 'Features', type: 'list' },
    { id: 'pricing', label: 'Pricing', type: 'table' },
    { id: 'contact', label: 'Contact', type: 'text' },
  ]

  const styles = [
    { name: 'Modern', preview: 'A', color: 'blue' },
    { name: 'Classic', preview: 'B', color: 'gray' },
    { name: 'Minimal', preview: 'C', color: 'green' },
    { name: 'Professional', preview: 'D', color: 'purple' },
  ]

  const templates = [
    { name: 'Blank', icon: FileText, description: 'Start from scratch' },
    { name: 'Business Letter', icon: Briefcase, description: 'Professional letter template' },
    { name: 'Project Proposal', icon: Clipboard, description: 'Detailed project outline' },
    { name: 'Meeting Notes', icon: FileCheck, description: 'Structured meeting template' },
  ]

  const handleSectionClick = (section) => {
    // TODO: Navigate to section in document
    console.log('Navigating to section:', section.label)
  }

  const handleStyleChange = (style) => {
    // TODO: Apply style to document
    console.log('Applying style:', style.name)
  }

  const handleTemplateLoad = (template) => {
    // TODO: Load template
    console.log('Loading template:', template.name)
  }

  const handleExport = (format) => {
    // TODO: Export document
    console.log('Exporting as:', format)
  }

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className={`w-80 h-full border-r ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div className={`p-4 border-b ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Document Tools
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className={`p-1 rounded ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 p-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? theme === 'dark'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-900'
                : theme === 'dark'
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 overflow-y-auto h-full">
        {activeTab === 'sections' && (
          <div className="space-y-3">
            <h4 className={`font-medium mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Document Sections
            </h4>
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ x: 5 }}
                onClick={() => handleSectionClick(section)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    {section.type === 'text' && <FileText className="w-3 h-3 text-gray-600" />}
                    {section.type === 'list' && <Clipboard className="w-3 h-3 text-gray-600" />}
                    {section.type === 'table' && <FileText className="w-3 h-3 text-gray-600" />}
                  </div>
                  <span className="font-medium">{section.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {activeTab === 'styles' && (
          <div className="space-y-3">
            <h4 className={`font-medium mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Document Styles
            </h4>
            {styles.map((style) => (
              <motion.button
                key={style.name}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleStyleChange(style)}
                className={`w-full p-3 rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold ${
                    style.color === 'blue' ? 'bg-gray-600 text-white' :
                    style.color === 'gray' ? 'bg-gray-500 text-white' :
                                          style.color === 'green' ? 'bg-gray-500 text-white' :
                                          'bg-gray-500 text-white'
                  }`}>
                    {style.preview}
                  </div>
                  <span className="font-medium">{style.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-3">
            <h4 className={`font-medium mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Templates
            </h4>
            {templates.map((template) => (
              <motion.button
                key={template.name}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleTemplateLoad(template)}
                className={`w-full p-3 rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <template.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{template.name}</div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {template.description}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-3">
            <h4 className={`font-medium mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Export Options
            </h4>
            {['PDF', 'DOCX', 'HTML', 'Markdown'].map((format) => (
              <motion.button
                key={format}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleExport(format)}
                className={`w-full p-3 rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    {format === 'PDF' && <FileText className="w-3 h-3 text-gray-600" />}
                    {format === 'DOCX' && <FileText className="w-3 h-3 text-gray-600" />}
                    {format === 'HTML' && <FileText className="w-3 h-3 text-gray-600" />}
                    {format === 'Markdown' && <FileText className="w-3 h-3 text-gray-600" />}
                  </div>
                  <span className="font-medium">Export as {format}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
} 
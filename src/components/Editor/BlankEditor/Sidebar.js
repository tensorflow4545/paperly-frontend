"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Sidebar({ onClose, theme }) {
  const [activeTab, setActiveTab] = useState('sections')

  const tabs = [
    { id: 'sections', label: 'Sections', icon: '📋' },
    { id: 'styles', label: 'Styles', icon: '🎨' },
    { id: 'templates', label: 'Templates', icon: '📄' },
    { id: 'export', label: 'Export', icon: '📤' },
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
    { name: 'Blank', icon: '📄', description: 'Start from scratch' },
    { name: 'Business Letter', icon: '💼', description: 'Professional letter template' },
    { name: 'Project Proposal', icon: '📋', description: 'Detailed project outline' },
    { name: 'Meeting Notes', icon: '📝', description: 'Structured meeting template' },
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
            ✕
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
              <span>{tab.icon}</span>
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
                  <span className="text-lg">
                    {section.type === 'text' && '📝'}
                    {section.type === 'list' && '📋'}
                    {section.type === 'table' && '📊'}
                  </span>
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
                    style.color === 'blue' ? 'bg-blue-500 text-white' :
                    style.color === 'gray' ? 'bg-gray-500 text-white' :
                    style.color === 'green' ? 'bg-green-500 text-white' :
                    'bg-purple-500 text-white'
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
                  <span className="text-2xl">{template.icon}</span>
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
                  <span className="text-lg">
                    {format === 'PDF' && '📄'}
                    {format === 'DOCX' && '📝'}
                    {format === 'HTML' && '🌐'}
                    {format === 'Markdown' && '📝'}
                  </span>
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
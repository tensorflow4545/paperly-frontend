"use client"

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

export default function DocumentCanvas({ 
  content, 
  onContentChange, 
  onFocus, 
  onBlur, 
  theme 
}) {
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 })
  const [selectedBlock, setSelectedBlock] = useState(null)
  const editorRef = useRef(null)

  const slashCommands = [
    { command: '/text', label: 'Text', icon: '📝' },
    { command: '/heading1', label: 'Heading 1', icon: 'H1' },
    { command: '/heading2', label: 'Heading 2', icon: 'H2' },
    { command: '/heading3', label: 'Heading 3', icon: 'H3' },
    { command: '/bullet', label: 'Bullet List', icon: '•' },
    { command: '/number', label: 'Numbered List', icon: '1.' },
    { command: '/image', label: 'Image', icon: '🖼️' },
    { command: '/quote', label: 'Quote', icon: '💬' },
    { command: '/code', label: 'Code Block', icon: '💻' },
    { command: '/divider', label: 'Divider', icon: '➖' },
  ]

  const handleKeyDown = (e) => {
    if (e.key === '/') {
      const selection = window.getSelection()
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        setSlashMenuPosition({ x: rect.left, y: rect.bottom + 10 })
        setShowSlashMenu(true)
      }
    }
  }

  const handleSlashCommand = (command) => {
    setShowSlashMenu(false)
    // TODO: Implement slash command insertion
    console.log('Executing command:', command)
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
  }

  return (
    <div className="relative h-full">
      {/* Main Editor */}
      <div
        ref={editorRef}
        className={`h-full p-8 overflow-y-auto focus:outline-none `}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onContentChange(e.currentTarget.textContent)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        style={{
          minHeight: '100vh',
          lineHeight: '1.6',
          fontSize: '16px',
        }}
      >
        {content || (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-20 `}
          >
            <div className="text-6xl mb-4">📄</div>
            <div className="text-xl font-medium mb-2">Start writing...</div>
            <div className="text-sm">
              Type <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">/</kbd> to see commands
            </div>
          </motion.div>
        )}
      </div>

      {/* Slash Command Menu */}
      <AnimatePresence>
        {showSlashMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className={`absolute z-50 w-64 rounded-lg shadow-lg border`}
            style={{
              left: slashMenuPosition.x,
              top: slashMenuPosition.y,
            }}
          >
            <div className="p-2">
              <div className={`text-xs font-medium mb-2 px-2 `}>
                COMMANDS
              </div>
              {slashCommands.map((cmd, index) => (
                <motion.button
                  key={cmd.command}
                 
                  onClick={() => handleSlashCommand(cmd.command)}
                >
                  <span className="text-lg">{cmd.icon}</span>
                  <span className="font-medium">{cmd.label}</span>
                  <span className={`text-xs ml-auto `}>
                    {cmd.command}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close slash menu */}
      {showSlashMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSlashMenu(false)}
        />
      )}
    </div>
  )
} 
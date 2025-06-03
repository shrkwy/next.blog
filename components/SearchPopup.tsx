'use client'

import React, { useState, useRef, useEffect } from 'react' // Import React
import { useRouter } from 'next/navigation'
import { useKBar } from 'kbar'

interface SearchPopupProps {
  isOpen: boolean
  onClose: () => void
}

const SearchPopup = ({ isOpen, onClose }: SearchPopupProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { query: kbarQuery } = useKBar()
  const popupRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Effect to handle clicks outside the popup to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Focus the input when the popup opens
      inputRef.current?.focus()
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // Effect to close popup on Escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    } else {
      document.removeEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])

  // Function to perform the full content search
  const performFullSearch = (query: string) => {
    if (query.trim() !== '') {
      router.push(`/search/${encodeURIComponent(query.trim())}`)
      setSearchQuery('') // Clear input after search
      onClose() // Close popup after navigation
    }
  }

  const handleSearchInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      performFullSearch(searchQuery)
    }
  }

  const handleInstantSearchClick = () => {
    kbarQuery.toggle() // Toggle kbar modal
    onClose() // Close custom popup
    setSearchQuery('') // Clear input
  }

  if (!isOpen) return null

  return (
    // Modal overlay with blur and kbar-like semi-transparent background
    // KBar uses 'p-4' on KBarPositioner itself
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/50 p-4 backdrop-blur-md backdrop-filter dark:bg-black/50">
      {/* Popup container - matches KBarAnimator's inner div */}
      <div
        ref={popupRef}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-xl dark:border-gray-800 dark:bg-gray-900"
      >
        {' '}
        {/* Added shadow to inner div */}
        {/* Search Input Row: ESC | (Input + Search/Enter Button) */}
        <div className="flex items-center space-x-4 p-4">
          {/* ESC Button - on the left, now clickable to close */}
          <button
            type="button"
            onClick={onClose} // Closes the popup
            aria-label="Close search (Escape)"
            className="inline-block flex-shrink-0 rounded border border-gray-400 px-1.5 align-middle text-xs leading-4 font-medium tracking-wide whitespace-nowrap text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ESC
          </button>

          {/* Inner flex container for input and the NEW Search/Enter Button */}
          <div className="flex flex-grow flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchInputKeyDown}
              placeholder="Search all content..."
              // Matches KBarSearch styling, flex-grow makes it take available space
              className="h-8 w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500"
            />
            {/* Search icon as an "Enter" button, on the right of input */}
            <button
              type="button"
              onClick={() => performFullSearch(searchQuery)}
              aria-label="Search"
              // Applied dull accent/primary color to the icon button
              className="text-primary-500 dark:text-primary-400 flex-shrink-0 rounded-md p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6" // Color handled by parent text class
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Separator and "Try instant search" button */}
        <div className="block border-t border-gray-100 p-4 dark:border-gray-800">
          <button
            type="button"
            onClick={handleInstantSearchClick}
            // Modified classes for less prominence
            className="focus:ring-primary-500 focus:ring-opacity-50 w-full rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:ring-2 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Try instant search (limited)
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchPopup

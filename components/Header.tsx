'use client'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Typewriter from 'typewriter-effect'
import { usePathname } from 'next/navigation'
import SearchPopup from './SearchPopup' // ADDED: SearchPopup

const Header = () => {
  const pathName = usePathname()
  const isHome = pathName === '/'
  const [showSearchPopup, setShowSearchPopup] = useState(false) // State to control popup visibility

  // Build the raw “~/<pathname>” string.
  const rawPathString = `~${pathName}`

  // If pathName (with “~/”) is too long, truncate + ellipsis.
  const MAX_PATH_LENGTH = 36
  let displayPath = rawPathString
  if (!isHome && rawPathString.length > MAX_PATH_LENGTH) {
    // e.g. take first (MAX_PATH_LENGTH-3) chars, append "..."
    displayPath = rawPathString.slice(0, MAX_PATH_LENGTH - 3) + '...'
  }

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  const handleSearchIconClick = () => {
    setShowSearchPopup(true) // Open the search popup
  }

  return (
    <header className={headerClass}>
      <Link href="/" className="flex items-center justify-center gap-1" aria-label="Homepage">
        <div className="text-primary-color dark:text-primary-color-dark flex items-center justify-between text-xl font-semibold">
          <Typewriter
            options={{
              // If on home, cycle through headerNotes; otherwise, type the truncated path once.
              strings: isHome ? siteMetadata.headerNotes : [displayPath],
              autoStart: true,
              loop: isHome, // loop only on home; on other pages, type once
              delay: 75, // speed of typing (milliseconds per char)
              deleteSpeed: 50, // speed of deleting when looping (only affects home)
            }}
          />
        </div>
      </Link>

      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
        </div>
        {/* NEW: Search Icon Button that opens SearchPopup */}
        <button type="button" aria-label="Search" onClick={handleSearchIconClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="hover:text-primary-500 dark:hover:text-primary-400 h-6 w-6 text-gray-900 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <ThemeSwitch />
        <MobileNav />
      </div>

      {/* RENDER: SearchPopup component */}
      <SearchPopup isOpen={showSearchPopup} onClose={() => setShowSearchPopup(false)} />
    </header>
  )
}

export default Header

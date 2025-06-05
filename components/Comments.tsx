// components/Comments.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'

interface CommentsProps {
  slug: string
}

export default function Comments({ slug }: CommentsProps) {
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only render on the client to avoid SSR mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // If comments provider is not configured, render nothing
  if (!siteMetadata.comments?.provider) {
    return null
  }

  // Wait until mounted before showing anything
  if (!mounted) {
    return null
  }

  return (
    <div className="pt-6 pb-6">
      {/* Button stays in the DOM until clicked—no exit animation */}
      {!loaded && (
        <button
          onClick={() => setLoaded(true)}
          className="
            inline-flex items-center
            bg-primary-500 text-white
            px-6 py-2
            rounded-lg
            font-medium
            hover:bg-primary-600
            focus:outline-none focus:ring-2 focus:ring-primary-400
            transition
          "
        >
          Load Comments
        </button>
      )}

      {/* Reserve a bit of vertical space to prevent shifting */}
      {!loaded && (
        <div className="mt-4 min-h-[200px]" aria-hidden="true" />
      )}

      {/* Once `loaded` is true, fade in the comments */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          id="comments"
          className="
            mx-auto
            rounded-xl
            border border-gray-200
            dark:border-gray-700
            p-4
          "
        >
          <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
        </motion.div>
      )}
    </div>
  )
}

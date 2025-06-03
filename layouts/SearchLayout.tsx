'use client'

import { useState, useMemo } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Card from '@/components/Card' // Revert to Card import
import React from 'react'
import Image from '@/components/Image' // Import the Image component

interface SearchResult extends CoreContent<Blog> {}

interface Project {
  title: string // Revert Project title to string
  description: string // Revert Project description to string
  href?: string
  imgSrc?: string
}

interface SearchLayoutProps {
  posts: SearchResult[]
  projects: Project[]
  query: string
  pageTitle: string
}

const POSTS_PER_PAGE = 5

// Helper function to highlight query in text, returns ReactNode
function highlightQuery(text: string | undefined, query: string): React.ReactNode[] | string {
  if (!text || !query) return text || ''
  const parts: React.ReactNode[] = []
  const lowerCaseText = text.toLowerCase()
  const lowerCaseQuery = query.toLowerCase()
  let lastIndex = 0

  while (lastIndex < text.length) {
    const index = lowerCaseText.indexOf(lowerCaseQuery, lastIndex)
    if (index === -1) {
      parts.push(text.substring(lastIndex))
      break
    }
    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index))
    }
    parts.push(
      <span
        key={lastIndex}
        className="bg-yellow-200 text-gray-900 dark:bg-yellow-700 dark:text-gray-100"
      >
        {text.substring(index, index + query.length)}
      </span>
    )
    lastIndex = index + query.length
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts
}

export default function SearchLayout({ posts, projects, query, pageTitle }: SearchLayoutProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const displayPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    const end = start + POSTS_PER_PAGE
    return posts.slice(start, end)
  }, [currentPage, posts])

  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  // Apply highlighting within the client component before displaying
  const highlightedDisplayPosts = displayPosts.map((post) => ({
    ...post,
    title: highlightQuery(post.title, query),
    summary: highlightQuery(post.summary, query),
  })) as SearchResult[]

  // Revert casting to string here, as original Card expects string for its props.
  // This will likely cause issues if Card is not modified to accept ReactNode[],
  // but it's part of the revert to the previous state.
  const highlightedProjects = projects.map((project) => ({
    ...project,
    title: highlightQuery(project.title, query) as string, // Cast to string to match Project interface
    description: highlightQuery(project.description, query) as string, // Cast to string to match Project interface
  })) as Project[]

  return (
    <div className="container mx-auto mt-8">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        {/* Smaller heading for the main search results title */}
        <h1 className="text-2xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-100">
          {pageTitle}
        </h1>
      </div>
      {/* Display Blog Posts Section - Conditional */}
      {highlightedDisplayPosts.length > 0 && (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            {/* Smaller heading for Posts & Articles section */}
            <h2 className="text-xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14 dark:text-gray-100">
              Posts & Articles
            </h2>
          </div>
          <ul>
            {highlightedDisplayPosts.map((post) => {
              // Include 'thumbnail' in destructuring
              const { path, date, title, summary, tags, thumbnail } = post
              return (
                // Apply border, rounded corners, and hover effects to the list item
                <li
                  key={path}
                  className="relative z-0 mb-4 flex items-center rounded-md border border-gray-200 p-4 py-5 transition-all duration-200 ease-in-out hover:z-10 hover:scale-105 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  {/* Thumbnail on the left */}
                  {thumbnail && (
                    <div className="mr-6 h-16 w-24 flex-shrink-0 overflow-hidden rounded-md sm:h-20 sm:w-32 md:h-24 md:w-40">
                      <Link
                        href={`/${path}`}
                        aria-label={`Link to ${typeof title === 'string' ? title : 'the post'}`}
                      >
                        <Image
                          alt={typeof title === 'string' ? title : 'Post thumbnail'}
                          src={thumbnail}
                          width={160} // Adjusted size for better responsiveness
                          height={96} // Adjusted size for better responsiveness
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>
                    </div>
                  )}
                  {/* Post Content on the right */}
                  <article className="flex flex-grow flex-col space-y-2 xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date} suppressHydrationWarning>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl leading-8 font-bold tracking-tight">
                          <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap">
                          {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>

          {/* Pagination controls */}
          {posts.length > POSTS_PER_PAGE && (
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
              <nav className="flex justify-between">
                {!hasPrevPage && (
                  <button className="cursor-auto disabled:opacity-50" disabled={!hasPrevPage}>
                    Previous
                  </button>
                )}
                {hasPrevPage && (
                  <button onClick={prevPage} rel="prev">
                    Previous
                  </button>
                )}
                <span>
                  {currentPage} of {totalPages}
                </span>
                {!hasNextPage && (
                  <button className="cursor-auto disabled:opacity-50" disabled={!hasNextPage}>
                    Next
                  </button>
                )}
                {hasNextPage && (
                  <button onClick={nextPage} rel="next">
                    Next
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      )}{' '}
      {/* End Posts & Articles section conditional */}
      {/* Display Projects Section - Conditional */}
      {highlightedProjects.length > 0 && (
        <div className="mt-10 divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            {/* Smaller heading for Projects section */}
            <h2 className="text-xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14 dark:text-gray-100">
              Projects
            </h2>
          </div>
          <div className="container py-12">
            <div className="-m-4 flex flex-wrap">
              {highlightedProjects.map((d) => (
                <Card // Revert to Card here
                  key={d.title}
                  title={d.title as string} // Cast to string to match Card's expected prop
                  description={d.description as string} // Cast to string to match Card's expected prop
                  imgSrc={d.imgSrc}
                  href={d.href}
                  // Removed query prop as original Card does not accept it
                />
              ))}
            </div>
          </div>
        </div>
      )}{' '}
      {/* End Projects section conditional */}
      {/* Unified No Results Found Message */}
      {highlightedDisplayPosts.length === 0 && highlightedProjects.length === 0 && query && (
        <div className="py-10 text-center">
          <p className="animate-pulse text-lg text-gray-500 dark:text-gray-400">
            😔 No results found for &quot;{query}&quot;.
          </p>
        </div>
      )}
    </div>
  )
}

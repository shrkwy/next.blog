'use client'

import { useState, useMemo } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Card from '@/components/Card'
import React from 'react'
import Image from '@/components/Image'

interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

interface SearchLayoutProps {
  posts: CoreContent<Blog>[]
  projects: Project[]
  query: string
  pageTitle: string
}

const POSTS_PER_PAGE = 5

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
    if (hasNextPage) setCurrentPage((prev) => prev + 1)
  }

  const prevPage = () => {
    if (hasPrevPage) setCurrentPage((prev) => prev - 1)
  }

  const highlightedDisplayPosts = displayPosts.map((post) => ({
    ...post,
    title: highlightQuery(post.title, query),
    summary: highlightQuery(post.summary, query),
  }))

  const highlightedProjects = projects.map((project) => ({
    ...project,
    title: highlightQuery(project.title, query) as string,
    description: highlightQuery(project.description, query) as string,
  }))

  return (
    <div className="container mx-auto mt-8">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-2xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-100">
          {pageTitle}
        </h1>
      </div>

      {highlightedDisplayPosts.length > 0 && (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h2 className="text-xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14 dark:text-gray-100">
              Posts & Articles
            </h2>
          </div>
          <ul>
            {highlightedDisplayPosts.map((post) => {
              const { path, date, title, summary, tags, thumbnail } = post
              return (
                <li
                  key={path}
                  className="relative z-0 mb-4 flex items-center rounded-md border border-gray-200 p-4 py-5 transition-all duration-200 ease-in-out hover:z-10 hover:scale-105 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  {thumbnail && (
                    <div className="mr-6 h-16 w-24 flex-shrink-0 overflow-hidden rounded-md sm:h-20 sm:w-32 md:h-24 md:w-40">
                      <Link
                        href={`/${path}`}
                        aria-label={`Link to ${typeof title === 'string' ? title : 'the post'}`}
                      >
                        <Image
                          alt={typeof title === 'string' ? title : 'Post thumbnail'}
                          src={thumbnail}
                          width={160}
                          height={96}
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>
                    </div>
                  )}
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

          {posts.length > POSTS_PER_PAGE && (
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
              <nav className="flex justify-between">
                <button onClick={prevPage} disabled={!hasPrevPage}>
                  Previous
                </button>
                <span>
                  {currentPage} of {totalPages}
                </span>
                <button onClick={nextPage} disabled={!hasNextPage}>
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      )}

      {highlightedProjects.length > 0 && (
        <div className="mt-10 divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h2 className="text-xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14 dark:text-gray-100">
              Projects
            </h2>
          </div>
          <div className="container py-12">
            <div className="-m-4 flex flex-wrap">
              {highlightedProjects.map((d) => (
                <Card
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  imgSrc={d.imgSrc}
                  href={d.href}
                />
              ))}
            </div>
          </div>
        </div>
      )}

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

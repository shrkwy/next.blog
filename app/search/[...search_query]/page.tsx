// app/search/[...search_query]/page.tsx

import { allBlogs, Blog } from 'contentlayer/generated'
import { CoreContent, sortPosts } from 'pliny/utils/contentlayer'
import projectsData from '@/data/projectsData'
import SearchLayout from '@/layouts/SearchLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: `Search all across Shan's Tech Diaries.`, description: "" })


export default async function SearchPage({ params, searchParams }) {
  // Build the search query string from the catch‐all segment
  const query = Array.isArray(params.search_query)
    ? params.search_query.join(' ')
    : params.search_query || ''

  let pageTitle = 'Search Results'
  let filteredPosts: CoreContent<Blog>[] = []
  let filteredProjects: { title: string; description: string; href?: string; imgSrc?: string }[] =
    []

  if (query) {
    const lowerCaseQuery = query.toLowerCase()

    // 1. Filter first, then sort only the matching posts
    const matchingBlogs = allBlogs.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        (item.summary && item.summary.toLowerCase().includes(lowerCaseQuery)) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)) ||
        item.body.raw.toLowerCase().includes(lowerCaseQuery)
    )
    filteredPosts = sortPosts(matchingBlogs)

    // 2. Filter projects by title/description
    filteredProjects = projectsData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery)
    )

    pageTitle = `Search results for: ${query}`
  } else {
    // No query provided – prompt the user to enter one
    pageTitle = 'Enter a search query'
    // filteredPosts and filteredProjects remain empty
  }

  return (
    <SearchLayout
      posts={filteredPosts}
      projects={filteredProjects}
      query={query}
      pageTitle={pageTitle}
    />
  )
}

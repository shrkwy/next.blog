import { allBlogs, Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { sortPosts } from 'pliny/utils/contentlayer'
import projectsData from '@/data/projectsData'
import SearchLayout from '@/layouts/SearchLayout' // Import the new SearchLayout

interface SearchResult extends CoreContent<Blog> {}

interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

export default async function SearchPage({ params }: { params: { search_query: string[] } }) {
  const query = params.search_query?.join(' ') || ''

  const sortedBlogs = sortPosts(allBlogs)
  let pageTitle = 'Search Results'
  let filteredPosts: SearchResult[] = []
  let filteredProjects: Project[] = []

  if (query) {
    const lowerCaseQuery = query.toLowerCase()

    // Filter blog posts
    filteredPosts = sortedBlogs.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        (item.summary && item.summary.toLowerCase().includes(lowerCaseQuery)) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)) ||
        item.body.raw.toLowerCase().includes(lowerCaseQuery)
    )

    // Filter projects
    filteredProjects = projectsData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery)
    )

    pageTitle = `Search results for: ${query}`
  } else {
    pageTitle = 'Enter a search query'
    filteredPosts = []
    filteredProjects = []
  }

  // Pass the filtered data to the client-side SearchLayout for rendering and pagination
  return (
    <SearchLayout
      posts={filteredPosts}
      projects={filteredProjects}
      query={query}
      pageTitle={pageTitle}
    />
  )
}

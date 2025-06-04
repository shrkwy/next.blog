import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import Main from './Main'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: siteMetadata.title })

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteMetadata.structuredDataHomepage),
        }}
      />
      <Main posts={posts} />
    </>
  )
}

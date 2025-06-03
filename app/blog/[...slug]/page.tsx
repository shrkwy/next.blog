import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const { slug } = await props.params
  const postSlug = decodeURI(slug.join('/'))
  const post = allBlogs.find((p) => p.slug === postSlug)
  if (!post) return

  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((slug) =>
    coreContent(allAuthors.find((a) => a.slug === slug) as Authors)
  )

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const imageList =
    typeof post.images === 'string' ? [post.images] : post.images || [siteMetadata.socialBanner]

  const ogImages = imageList.map((img) => ({
    url: img.startsWith('http') ? img : siteMetadata.siteUrl + img,
  }))

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
      images: ogImages,
      authors: authorDetails.map((a) => a.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () =>
  allBlogs.map((p) => ({ slug: p.slug.split('/').map(decodeURI) }))

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params
  const postSlug = decodeURI(slug.join('/'))

  const sortedPosts = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedPosts.findIndex((p) => p.slug === postSlug)
  if (postIndex === -1) return notFound()

  const post = allBlogs.find((p) => p.slug === postSlug) as Blog
  const mainContent = coreContent(post)
  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((slug) =>
    coreContent(allAuthors.find((a) => a.slug === slug) as Authors)
  )

  let imageField
  if (post.thumbnail && typeof post.thumbnail === 'string') {
    imageField = post.thumbnail.startsWith('http')
      ? post.thumbnail
      : siteMetadata.siteUrl + post.thumbnail
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}/blog/${post.slug}`,
    },
    headline: post.title,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.lastmod || post.date).toISOString(),
    description: post.summary,
    ...(imageField ? { image: imageField } : {}),
    url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
    author: authorDetails.map((author) => ({
      '@type': 'Person',
      name: author.name,
      url: `${siteMetadata.siteUrl}/about`,
    })),
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.siteOrg,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}/static/images/organisation-logo.png`,
      },
    },
  }

  const Layout = layouts[post.layout || defaultLayout]
  const prev = sortedPosts[postIndex + 1]
  const next = sortedPosts[postIndex - 1]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}

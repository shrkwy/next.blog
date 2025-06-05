import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-600 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>

          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
            {/* Authors */}
            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 xl:block xl:space-y-4">
                  {authorDetails.map((author) => (
                    <li className="flex items-center gap-2" key={author.name}>
                      {author.avatar && (
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <Image
                            src={author.avatar}
                            alt={author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {author.name}
                        </p>
                        {author.twitter && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {author.twitter
                              .replace('https://twitter.com/', '@')
                              .replace('https://x.com/', '@')}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>

            {/* Main Content */}
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>

              <div className="pt-6 pb-6 text-sm text-gray-600 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow" className="hover:underline">
                  Discuss on Twitter
                </Link>
                {' • '}
                <Link href={editUrl(filePath)} className="hover:underline">
                  View on GitHub
                </Link>
              </div>

              {/* ─── Comments Toggle & Animated Section ─── */}
              {siteMetadata.comments && (
                  <div
                  className="text-center"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>
            <footer>
              <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-600 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                <div className="py-6 xl:py-8">
                  <h2 className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-100">
                    Wanna read more? Check out:
                  </h2>
                  <div className="flex flex-col gap-3">
                    {prev && prev.path && (
                      <Link
                        href={`/${prev.path}`}
                        className="text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800/30 block rounded-lg border border-gray-300 bg-white px-4 py-2 transition dark:border-gray-700 dark:bg-gray-900"
                      >
                        ← {prev.title}
                      </Link>
                    )}
                    {next && next.path && (
                      <Link
                        href={`/${next.path}`}
                        className="text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800/30 block rounded-lg border border-gray-300 bg-white px-4 py-2 transition dark:border-gray-700 dark:bg-gray-900"
                      >
                        {next.title} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  aria-label="Back to the blog"
                >
                  ← Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

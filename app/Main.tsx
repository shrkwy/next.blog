import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from '@/components/Image'

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Intro Section */}
        <div className="space-y-6 md:my-16">
          <div className="flex flex-col-reverse gap-8 md:flex-row md:justify-between">
            <div className="space-y-4 md:max-w-lg">
              <span className="before:bg-primary-900 before:bg-opacity-20 relative inset-y-4 ml-24 inline-block px-1 before:absolute before:-inset-1 before:block before:-skew-y-6 before:rounded-lg sm:inset-y-7 sm:ml-40">
                <span className="text-primary-500 relative inline-block -rotate-6">
                  <Link
                    href={siteMetadata.socialHandleUrl}
                    className="font-arrow2 text-primary-500 text-sm font-bold transition hover:underline hover:underline-offset-8 sm:text-xl"
                  >
                    {siteMetadata.socialHandle}
                  </Link>
                </span>
              </span>
              <h1 className="text-background-color pt-2 text-4xl leading-9 font-bold tracking-tight sm:text-5xl sm:leading-10 md:text-6xl md:leading-snug dark:text-gray-100">
                <span className="animate-wavingHand">👋🏻</span>, I am
                <span className="font-arrow text-primary-500 relative inset-y-8 ml-2 inline-block -rotate-12 sm:inset-y-14">
                  ^
                </span>
                <span className="absolute">
                  Shantnu<span className="text-orange-400">.</span>
                </span>
              </h1>
              <h2 className="prose pt-5 text-lg text-gray-600 dark:text-gray-300">
                {siteMetadata.siteName + ': ' + siteMetadata.description}
              </h2>
              <div className="leading-7 text-gray-500 underline underline-offset-4 sm:pr-6 sm:text-lg">
                <Link
                  href="/about"
                  className="hover:text-primary-500 hover:dark:text-primary-500 hover:cursor-pointer dark:text-gray-500"
                >
                  <p>Read the rest of my bio &rarr;</p>
                </Link>
              </div>
            </div>
            <div className="pt-10">
              {/* ── Perfectly-Circular Avatar Snippet ── */}
              <div className="relative h-20 w-20 overflow-hidden rounded-full md:h-28 md:w-28">
                <Image
                  src="/static/images/avatar.jpeg"
                  alt="Avatar image"
                  fill
                  className="object-cover"
                  loading="eager"
                  priority
                />
                {/* Glow/gradient behind the avatar (optional) */}
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tl from-purple-700 to-orange-700 opacity-0 blur-2xl md:opacity-70" />
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="pt-10 pb-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags, thumbnail } = frontMatter
              const tagsToShow = tags.slice(0, 1)
              return (
                <article
                  key={slug}
                  className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
                >
                  <Link href={`/blog/${slug}`} className="block">
                    <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={thumbnail}
                        alt={title}
                        width={400}
                        height={200}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-grow flex-col justify-between space-y-2 px-4 py-4">
                    <span className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="inline-block">
                        {tagsToShow.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </span>
                      <time dateTime={date}>{formatDate(date)}</time>
                    </span>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      <Link
                        href={`/blog/${slug}`}
                        className="hover:text-primary-500 dark:hover:text-primary-400"
                      >
                        {title}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{summary}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer section */}
      <hr className="border-gray-200 dark:border-gray-700" />
      {posts.length > MAX_DISPLAY && (
        <div className="mt-5 flex justify-end">
          <Link
            href="/blog"
            className="border-primary-500 text-primary-500 hover:bg-primary-500 mt-2 mr-3 rounded-lg border px-3 py-1 text-sm font-medium uppercase transition hover:text-white dark:hover:text-gray-900"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

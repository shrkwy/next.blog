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
        <div className="mt-16 mb-[14px] space-y-6">
          <div className="flex flex-col-reverse gap-8 md:flex-row md:justify-between">
            <div className="space-y-4 md:max-w-lg">
              {/* Social Handle */}
              <span className="before:bg-primary-900/20 dark:before:bg-primary-300/20 relative inset-y-4 ml-24 inline-block px-1 before:absolute before:-inset-1 before:block before:-skew-y-6 before:rounded-lg sm:inset-y-7 sm:ml-40">
                <span className="text-primary-500 dark:text-primary-400 relative inline-block -rotate-6">
                  <Link
                    href={siteMetadata.socialHandleUrl}
                    className="font-arrow2 text-primary-500 dark:text-primary-400 text-sm font-bold transition hover:underline hover:underline-offset-8 sm:text-xl"
                  >
                    {siteMetadata.socialHandle}
                  </Link>
                </span>
              </span>

              {/* Main Heading */}
              <h1 className="pt-2 text-4xl leading-9 font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-10 md:text-6xl md:leading-snug dark:text-gray-100">
                <span className="animate-wavingHand">👋🏻</span>, I am
                <span className="font-arrow text-primary-500 dark:text-primary-400 relative inset-y-8 ml-2 inline-block -rotate-12 sm:inset-y-14">
                  ^
                </span>
                <span className="absolute">
                  Shantnu
                  <span className="text-orange-600 dark:text-orange-400">.</span>
                </span>
              </h1>

              {/* Subtitle */}
              <h2 className="pt-5 text-lg text-gray-700 dark:text-gray-300">
                {siteMetadata.siteName + ': ' + siteMetadata.description}
              </h2>

              {/* Bio Link */}
              <div className="leading-7 text-gray-600 underline underline-offset-4 sm:pr-6 sm:text-lg dark:text-gray-400">
                <Link
                  href="/about"
                  className="hover:text-primary-500 hover:dark:text-primary-400 hover:cursor-pointer"
                >
                  <p>Read the rest of my bio &rarr;</p>
                </Link>
              </div>
            </div>

            {/* Avatar */}
            <div className="pt-10">
              <div className="relative h-20 w-20 overflow-hidden rounded-full md:h-28 md:w-28">
                <Image
                  src="/static/images/avatar.webp"
                  alt="Avatar image"
                  fill
                  className="object-cover"
                  loading="eager"
                  priority
                />
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tl from-purple-500 to-orange-400 opacity-40 blur-2xl md:opacity-70 dark:from-purple-700 dark:to-orange-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="pt-10 pb-10">
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Posts by {siteMetadata.author} —``
          </h1>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags, thumbnail } = frontMatter
              const tagsToShow = tags.slice(0, 1)
              return (
                <article
                  key={slug}
                  className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg md:border-none md:bg-transparent md:hover:border md:hover:border-gray-200 md:hover:bg-white dark:border-gray-700 dark:bg-gray-900 md:dark:bg-transparent md:hover:dark:border-gray-700 md:hover:dark:bg-gray-900"
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
                    <span className="inline-flex w-full items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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

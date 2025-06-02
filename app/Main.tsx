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
        {/* <div className="space-y-2 pt-6 pb-6 md:space-y-5">
          <span className="relative inset-y-4 ml-24 inline-block px-1 before:absolute before:-inset-1 before:block before:-skew-y-6 before:rounded-lg before:bg-primary-600 before:bg-opacity-20 sm:inset-y-7 sm:ml-40">
            <span className="relative inline-block -rotate-6 text-primary-500">
              <Link
                href="https://youtube.com/@shrkwt"
                className="font-arrow2 text-sm font-bold text-primary-500 transition hover:underline hover:underline-offset-8 sm:text-xl"
              >
                @shrkwt
              </Link>
            </span>
          </span>
          <h1 className="text-background-color pt-2 text-4xl font-bold leading-9 tracking-tight dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-snug">
            <span className="animate-wavingHand">👋🏻</span>, I am
            <span className="font-arrow relative inset-y-8 ml-2 inline-block -rotate-12 text-primary-500 sm:inset-y-14">
              ^
            </span>
            Shantnu.
          </h1>
          <h2 className="prose pt-5 text-lg text-gray-600 dark:text-gray-300">
            {siteMetadata.description}
          </h2>
          <div className="leading-7 text-gray-500 underline underline-offset-4 sm:pr-6 sm:text-lg">
            <Link
              href="/about"
              className="hover:cursor-pointer hover:text-primary-500 dark:text-gray-500 hover:dark:text-primary-500"
            >
              <p>Read the rest of my bio &rarr;</p>
            </Link>
          </div>
          <h3 className="my-4 mt-16 pt-20 pb-2 text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Recent Posts{' '}
          </h3>
      </div>*/}
        <div className="space-y-6 md:my-16">
          <div className="flex flex-col-reverse gap-8 md:flex-row md:justify-between">
            <div className="space-y-4 md:max-w-lg">
              <span className="before:bg-primary-600 before:bg-opacity-20 relative inset-y-4 ml-24 inline-block px-1 before:absolute before:-inset-1 before:block before:-skew-y-6 before:rounded-lg sm:inset-y-7 sm:ml-40">
                <span className="text-primary-500 relative inline-block -rotate-6">
                  <Link
                    href="https://youtube.com/@shrkwt"
                    className="font-arrow2 text-primary-500 text-sm font-bold transition hover:underline hover:underline-offset-8 sm:text-xl"
                  >
                    @shrkwt
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
                {siteMetadata.description}
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
              <div className="relative h-20 w-20 md:h-28 md:w-28">
                <Image
                  src="/static/images/avatar.jpeg"
                  className="rounded-full"
                  width={112}
                  height={112}
                  alt="Avatar image"
                  loading="eager"
                  priority
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 opacity-0 blur-2xl md:opacity-70" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-8 pt-10 pb-10 md:grid-cols-2 xl:grid-cols-3">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags, thumbnail } = frontMatter
              const tagsToShow = tags.slice(0, 1)
              return (
                <article
                  key={slug}
                  className="group bg-opacity-20 relative flex h-full transform rounded-lg bg-transparent p-2 transition duration-100 hover:scale-105 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div>
                    <div className="group relative max-h-4 overflow-hidden rounded-lg pb-60">
                      <Link href={`/blog/${slug}`}>
                        <span>
                          <Image
                            objectFit="cover"
                            layout="fill"
                            alt={title.slice(0, 8)}
                            src={thumbnail}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </span>
                      </Link>
                    </div>
                    <div className="h-auto px-2 py-4">
                      <span className="inline-flex w-full items-center justify-between">
                        <span className="border-primary-500 inline-block rounded border border-gray-700 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                          {tagsToShow.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </span>
                        <dl>
                          <dd className="text-sm leading-6 font-normal text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date)}</time>
                          </dd>
                        </dl>
                      </span>
                      <h2 className="mt-2 mb-2 font-bold md:text-xl">
                        <Link
                          href={`/blog/${slug}`}
                          className="hover:text-primary-500 dark:hover:text-primary-500 text-gray-800 transition duration-500 ease-in-out dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h2>
                      <p className="h-auto text-sm font-normal tracking-wide text-gray-500 dark:text-gray-400">
                        {summary}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
        {/*
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul> */}
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
      {posts.length > MAX_DISPLAY && (
        <div className="mt-5 flex justify-end text-lg leading-6 font-normal">
          <Link
            href="/blog"
            className="border-primary-500 text-primary-500 hover:bg-primary-500 mt-2 mr-3 rounded-lg border px-3 py-1 text-sm font-medium uppercase transition duration-500 ease-in-out hover:text-gray-100 dark:hover:text-gray-900"
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

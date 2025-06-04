import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tag Index – Browse by topic',
  description:
    'Dive into curated tech topics from Shan’s Tech Diaries. Use this tag index to explore blog posts by category—from open source tools and developer guides to AI trends and tech culture. Find exactly what interests you, faster.',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="flex flex-col items-center divide-y divide-gray-200 dark:divide-gray-700">
      {/* Page Title */}
      <div className="pt-6 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl dark:text-gray-100">
          Tags
        </h1>
      </div>

      {/* Tag Pills Container */}
      <div className="flex max-w-3xl flex-wrap justify-center gap-4 py-6">
        {sortedTags.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
        )}

        {sortedTags.map((t) => {
          const count = tagCounts[t]
          return (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              className="border-primary-500 bg-primary-500/10 text-primary-500 hover:bg-primary-500 inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold uppercase transition-all duration-200 ease-in-out hover:text-white"
              aria-label={`View posts tagged ${t}`}
            >
              {/* Tag Name */}
              <span>{t.split(' ').join('-')}</span>

              {/* Separator Dot */}
              <span className="bg-primary-500/60 dark:bg-primary-300/60 mx-2 h-4 w-px" />

              {/* Count Bubble */}
              <span className="bg-primary-500 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[0.65rem] font-bold text-white">
                {count}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  siteName: "Shan's Tech Diaries",
  title: "Shan's Personal Insights on AI, & Tech | Shan's Tech Diaries",
  author: 'Shan',
  authorSlug: '/about',
  description: `Discover Shan Sharma’s cozy corner—powered by Next.js, Contentlayer & MDX—for playful side-projects, bug-squashing tales, Minecraft mod experiments, and musical musings in a laid-back coding vibe.`,
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteOrg: "Shan's Tech Diaries",
  siteUrl: 'https://www.shantnu.eu.org',
  siteRepo: 'https://github.com/shrkwy?tab=repositories',
  siteLogo: `/static/images/organisation-logo.png`,
  socialBanner: `/static/images/twitter-card.png`,

  // mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'xeon.wolf@yandex.com',
  github: 'https://github.com/shrkwy',
  x: 'https://twitter.com/x',
  // twitter: 'https://twitter.com/Twitter',
  // facebook: 'https://facebook.com',
  youtube: 'https://youtube.com/@shrkwy',
  // linkedin: 'https://www.linkedin.com',
  threads: 'https://www.threads.net',
  instagram: 'https://www.instagram.com',
  medium: 'https://medium.com',
  bluesky: 'https://bsky.app/',
  locale: 'en-US',
  // socialHandle defines the homepage greeting social handle.
  socialHandle: '@shrkwy',
  socialHandleUrl: 'https://github.com/shrkwy',

  socialDescription: [
    '🎓 Just a student messing around with code and building random projects for the vibes 😅',
    '🧑‍💻 Occasional binge-watcher (12 hours straight? Light work).',
    '🐛 12–15 hours of bug fixing that solves absolutely nothing? Now *that’s* my cup of tea ☕',
    '🏀 Sports? Nah, I sprint only when the Wi-Fi goes down.',
    '🛠️ This blog runs on Next.js, Contentlayer, and MDX — because plain HTML would’ve made too much sense 😎',
    '👉 Poke around, read a post or two, and maybe laugh at my suffering.',
  ],

  // headerNotes is an array of messages to show using TypeWriter in top right.
  headerNotes: [
    "<span class='text-green-500 font-semibold'>👋 Hey there, tech explorer!</span>",
    "<span class='italic text-gray-400'>Did you know: Linux was first released in 1991? 🐧</span>",
    "<span class='text-yellow-400 font-bold'>404: Boredom Not Found.</span>",
    "<span class='font-bold text-pink-500'>Open-source the sauce, baby 🍜</span>",
    '<span>When your code compiles on the first try… is it a bug? 🤔</span>',
    "<span class='text-blue-400'>No clickbait. Just byte-sized wisdom 💾</span>",
    "<span class='underline text-purple-500'>Your browser called—it loves this site.</span>",
    "<span class='text-red-400'>Finally, a blog that actually slaps. 🔥</span>",
    "<span class='text-indigo-600'>Tech moves fast—blink and you'll miss it! ⚡️</span>",
    "<span class='text-green-600'>Built with caffeine, sarcasm, and curiosity ☕️</span>",
    "<span class='text-orange-500'>Pros vs. Cons: Is Vim superior? Debate starts now. 😏</span>",
    "<span class='text-teal-400'>This is that blog your future self reads. 🕒</span>",
    "<span class='text-red-500'>You scrolled here. I see you—welcome. 👀</span>",
    "<span class='text-purple-600'>No trackers, no BS—just raw tech truth.</span>",
    "<span class='text-yellow-500'>All killer, no filler. 🚀</span>",
  ],
  // set to true if you want a navbar fixed to the top
  stickyNav: false,

  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'dark',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: 'https://cdn.jsdelivr.net/gh/shrkwy/content.host@latest/file/style/giscus-theme.css',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
  structuredDataOrg: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: 'https://www.shantnu.eu.org',
    founder: {
      '@type': 'Person',
      name: 'Shantnu Sharma',
      url: 'https://www.shantnu.eu.org/about',
      image: 'https://www.shantnu.eu.org/static/images/avatar.webp',
    },
    sameAs: ['https://youtube.com/@shrkwy', 'https://github.com/shrkwy'],
    logo: 'https://www.shantnu.eu.org/static/images/organisation-logo.png',
    name: "Shan's Tech Diaries",
    alternateName: "Shan's Blog",
    description:
      "Shan's Tech Diaries is a personal tech blog where Shan shares coding experiments, development insights, Minecraft modding projects, and more — built with Next.js, Contentlayer, and MDX.",
    email: 'me@shantnu.eu.org',
  },
  structuredDataHomepage: {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: "Shan's Tech Diaries",
    alternateName: "Shan's Blog",
    url: 'https://www.shantnu.eu.org/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.shantnu.eu.org/search/{search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },
  structuredDataAboutpage: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shantnu Sharma',
    url: 'https://www.shantnu.eu.org/about',
    image: 'https://www.shantnu.eu.org/static/images/avatar.webp',
    sameAs: ['https://youtube.com/@shrkwy', 'https://github.com/shrkwy'],
    jobTitle: 'Tech Enthusiast & Hobby Coder',
    worksFor: {
      '@type': 'Organization',
      name: "Shan's Tech Diaries",
      url: 'https://www.shantnu.eu.org',
    },
  },
}

module.exports = siteMetadata

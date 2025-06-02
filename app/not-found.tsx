import Head from 'next/head'
import Link from '@/components/Link'

export default function NotFound() {
  return (
    <>
      <div className="font-['Daily Sans'] relative flex h-screen items-center justify-center overflow-hidden bg-transparent">
        {/* Gradient blob */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 scale-[0.8] bg-[radial-gradient(circle_at_40%_40%,rgba(255,94,208,0.45),rgba(138,43,226,0.35),rgba(0,201,255,0.3),rgba(0,255,163,0.3))] blur-[100px]" />

        {/* Content */}
        <div className="z-10 p-6 text-center text-black dark:text-white">
          <h1 className="flex items-center justify-center text-[8rem] leading-none font-bold">
            <span className="mx-1">4</span>
            <span className="mx-1 animate-bounce text-[4rem]">😅</span>
            <span className="mx-1">4</span>
          </h1>

          <p className="mt-4">
            <b className="mb-2 block text-[1.3rem]">Oh shoot!...</b>
            <span className="text-[0.95rem]">Seems like we can't find that page.</span>
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-md bg-[#111111be] px-6 py-3 font-bold text-white transition-transform hover:scale-105 hover:bg-[#242424a8]"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  )
}

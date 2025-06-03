'use client'

import React, { useEffect, useRef } from 'react'

// Vidstack imports
import {
  Poster,
  Captions,
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
} from '@vidstack/react'
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default'

// Vidstack styles
import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'

interface VideoPlayerProps {
  source: string
  title: string
  thumbnails: string
  poster: string
}

export function Video({ source, title, thumbnails, poster }: VideoPlayerProps) {
  const player = useRef<MediaPlayerInstance>(null)

  useEffect(() => {
    // You can interact with the player instance here if needed.
    // For example, to listen to events:
    // player.current?.addEventListener('error', (event) => console.error('Vidstack Player Error:', event));
  }, [])

  if (!source) {
    return (
      <div className="text-muted-foreground flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-black shadow-lg">
        <p>No video source provided.</p>
      </div>
    )
  }

  return (
    <div
      className="aspect-video w-full max-w-3xl overflow-hidden rounded-lg bg-black shadow-lg"
      data-ai-hint="video stream player"
    >
      <MediaPlayer
        ref={player}
        title={title} // You might want to make title dynamic if available
        src={source}
        playsInline
        load="visible"
        posterLoad="idle"
        className="h-full w-full"
        crossOrigin // Important for HLS, especially if it involves different origins for segments/keys
        // Poster can be added here if you have a poster image URL
        // poster="https://placehold.co/1280x720.png"
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src={poster}
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          />
        </MediaProvider>
        <Captions className="vds-captions" />
        <DefaultVideoLayout thumbnails={thumbnails} icons={defaultLayoutIcons} />
        {/* If you might also play audio-only HLS, you could conditionally render DefaultAudioLayout */}
        {/* <DefaultAudioLayout icons={defaultLayoutIcons} /> */}
      </MediaPlayer>
    </div>
  )
}

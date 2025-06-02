'use client'
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

interface YouTubeProps {
  id: string
  title: string
}

export default function Youtube({ id, title }: YouTubeProps) {

  const thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  const embedUrl =
    `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&controls=1&iv_load_policy=3&modestbranding=1`

  return (
    <LiteYouTubeEmbed
        id={id}
        adNetwork={false}
        title={title}
        webp={true}
        poster='sddefault'
        params="&iv_load_policy=3"
    />
  )
}

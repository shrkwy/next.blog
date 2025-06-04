import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="
        inline-block
        rounded-md
        border
        border-primary-500
        bg-primary-500/10
        px-3
        py-0.5
        mt-1
        mb-1
        text-sm
        uppercase
        font-medium
        text-primary-500
        hover:bg-primary-600/80
        hover:text-primary-100
        transition-all
        duration-200
        ease-in-out
        transform
        hover:scale-105
        active:scale-95
        mr-2
      "
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag

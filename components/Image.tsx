'use client'

import NextImage from 'next/image'
import React from 'react'
import cn from 'utils/cn'

/**
 * The props of {@link Image}.
 */
export type ImageProps = {
  /**
   * The image classes to pass to the image.
   */
  imageClassName?: string
  /**
   * Should the image be lazy loaded?
   */
  lazy?: boolean
} & React.ComponentPropsWithoutRef<typeof NextImage>

const Image = (props: ImageProps) => {
  const { alt, src, className, imageClassName, lazy = true, ...rest } = props
  const [isLoading, setLoading] = React.useState(true)

  return (
    <div
      className={cn('overflow-hidden', isLoading && 'animate-pulse', className)}
      data-testid="image-container"
    >
      <NextImage
        className={cn(
          'transition-[scale,filter] duration-700',
          isLoading && 'scale-[1.02] blur-xl grayscale',
          imageClassName
        )}
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        priority={!lazy}
        quality={100}
        onLoadingComplete={() => setLoading(false)}
        {...rest}
      />
    </div>
  )
}
export default Image
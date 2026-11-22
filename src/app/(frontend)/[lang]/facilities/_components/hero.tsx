'use client'
import { HeroBlock, Media } from '@/payload-types'
import { cn } from '@/lib/utils'
import { getImageProps } from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { MEDIA_BASE_URL } from '@/components/shared/payload-media'

interface HeroProps extends HeroBlock {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ className, layout }) => {
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, (y) => y * 0.5) // Parallax effect, no re-render per scroll

  const mediaList = layout?.find((item) => item.blockType === 'media-list')?.mediaList || []
  const lgMedia = (mediaList[0]?.media as Media | undefined) ?? undefined
  const smMedia = (mediaList[1]?.media as Media | undefined) ?? lgMedia
  const desktop = lgMedia?.url ? lgMedia : smMedia
  const mobile = smMedia?.url ? smMedia : lgMedia

  // One <picture>: the browser downloads only the image for the current breakpoint
  const imageProps = (media: Media) =>
    getImageProps({
      src: `${MEDIA_BASE_URL || ''}${media.url}`,
      alt: '',
      fill: true,
      sizes: '100vw',
      loading: 'eager',
      fetchPriority: 'high',
    }).props

  return (
    <div
      className={cn(
        '@container relative w-full overflow-hidden h-[450px] lg:h-[560px] -mt-[var(--nav-h)]', // Slide under the navigation menu
        className,
      )}
      style={
        {
          // height/width of each image, to size the parallax layer like `background-size: cover`
          '--ar-sm': (mobile?.height || 2) / (mobile?.width || 3),
          '--ar-lg': (desktop?.height || 2) / (desktop?.width || 3),
        } as React.CSSProperties
      }
    >
      {desktop?.url && mobile?.url && (
        <motion.div
          className="absolute inset-x-0 top-0 lg:-top-[100px] h-[max(100%,calc(100cqw*var(--ar-sm)))] lg:h-[max(100%,calc(100cqw*var(--ar-lg)))]"
          style={{ y: parallaxY }}
        >
          <picture>
            <source media="(min-width: 1024px)" srcSet={imageProps(desktop).srcSet} sizes="100vw" />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
            <img {...imageProps(mobile)} className="object-cover" />
          </picture>
        </motion.div>
      )}
    </div>
  )
}

export default Hero

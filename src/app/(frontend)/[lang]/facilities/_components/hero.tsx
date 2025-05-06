'use client'
import { HeroBlock, Media } from '@/payload-types'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import useCompHeight from '@/hooks/use-comp-height'
import { MEDIA_BASE_URL } from '@/components/shared/payload-media'

interface HeroProps extends HeroBlock {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ className, title, description, layout }) => {
  const [offsetY, setOffsetY] = useState(0)
  const { compHeight } = useCompHeight('navigation-menu')

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get image URL
  const mediaList = layout?.find((item) => item.blockType === 'media-list')?.mediaList || []
  const lgImageUrl = (mediaList[0]?.media as Media)?.url
  const smImageUrl = (mediaList[1]?.media as Media)?.url

  return (
    <>
      <div
        className={
          'relative w-full h-[560px] lg:flex items-center justify-center bg-cover bg-center bg-no-repeat hidden'
        }
        style={{
          backgroundImage: lgImageUrl ? `url(${MEDIA_BASE_URL}${lgImageUrl})` : undefined,
          backgroundPositionY: `${offsetY * 0.5 - 100}px`, // Parallax effect
          marginTop: `-${compHeight}px`, // Adjust for navigation menu height
        }}
      />
      <div
        className={
          'relative w-full h-[450px] flex items-center justify-center bg-cover bg-center bg-no-repeat lg:hidden'
        }
        style={{
          backgroundImage: smImageUrl ? `url(${MEDIA_BASE_URL}${smImageUrl})` : undefined,
          backgroundPositionY: `${offsetY * 0.5}px`, // Parallax effect
          marginTop: `-${compHeight}px`, // Adjust for navigation menu height
        }}
      />

      <div className={cn('', className)}>lol</div>
    </>
  )
}

export default Hero

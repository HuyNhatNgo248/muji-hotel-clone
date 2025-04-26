'use client'

import { HeroBlock } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'
import BackgroundParallax from './background-parallax'
import Logo from '@/components/organisms/logo'
import Banner from '@/components/organisms/banner'
import PayloadRichText from '@/components/shared/payload-richtext'
import { useParams } from 'next/navigation'
import { LuChevronDown } from 'react-icons/lu'
import { motion, useInView } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import useDisplayLogoStore from '@/hooks/use-display-logo'

interface HeroProps extends HeroBlock {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ className, description, layout }) => {
  const params = useParams()
  const richTextRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const setDisplayLogo = useDisplayLogoStore((state) => state.setDisplayLogo)
  const isLogoInView = useInView(logoRef)
  const [navMenuHeight, setNavMenuHeight] = useState<number>(0)

  const mediaList = layout?.find((item) => item.blockType === 'media-list')?.mediaList || null
  const logo = layout?.find((item) => item.blockType === 'logo')
  const banner = layout?.find((item) => item.blockType === 'banner')

  const handleScroll = () => {
    if (!richTextRef.current) return

    const topOffset = 10
    const richTextPosition = richTextRef.current.offsetTop // Get the top position of the rich text
    const scrollToPosition = richTextPosition - topOffset // Subtract the offset to stop at the desired position

    window.scrollTo({
      top: scrollToPosition,
      behavior: 'smooth', // Smooth scrolling
    })
  }

  useEffect(() => {
    const navMenu = document.getElementById('navigation-menu')
    const updateNavMenuHeight = () => {
      if (navMenu) {
        const navMenuRect = navMenu.getBoundingClientRect()
        setNavMenuHeight(navMenuRect.height)
      }
    }

    updateNavMenuHeight()
    window.addEventListener('resize', updateNavMenuHeight)

    return () => window.removeEventListener('resize', updateNavMenuHeight)
  }, [])

  useEffect(() => {
    if (!logoRef.current) return

    setDisplayLogo(!isLogoInView)
  }, [isLogoInView, setDisplayLogo])

  return (
    <>
      <BackgroundParallax mediaList={mediaList} className={cn('text-white', className)}>
        <div
          className="relative flex flex-col items-center justify-between"
          style={{ height: `calc(100vh - ${navMenuHeight}px)` }}
        >
          {banner && <Banner {...banner} className="text-sm tracking-wide font-semibold" />}

          <div ref={logoRef}>
            {logo && (
              <Logo
                {...logo}
                variant="lg"
                orientation="vertical"
                classNames={{ container: 'pb-30' }}
              />
            )}
          </div>

          <motion.button
            onClick={handleScroll}
            className="cursor-pointer"
            animate={{
              y: [0, -10, 0], // Move up by 10px, then back to the original position
            }}
            transition={{
              duration: 1.5, // Duration of one cycle
              repeat: Infinity, // Repeat the animation infinitely
              ease: 'easeInOut', // Smooth easing
            }}
          >
            <LuChevronDown className="text-white size-8" />
          </motion.button>
        </div>

        <div
          ref={richTextRef}
          className={cn('mx-auto xl:w-1/3 lg:w-1/2 w-4/5 text-center text-lg my-10', {
            'tracking-[0.30em] leading-10': params.lang === 'ja',
            'tracking-widest leading-8': params.lang === 'en',
          })}
        >
          <PayloadRichText data={description as SerializedEditorState} />
        </div>
      </BackgroundParallax>
    </>
  )
}

export default Hero

'use client'

import { MediaBlock, Media } from '@/payload-types'

import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MEDIA_BASE_URL } from '@/components/shared/payload-media'

interface BackgroundParallaxProps {
  mediaList: MediaBlock[] | null
  className?: string
  children: React.ReactNode
}

const BackgroundParallax: React.FC<BackgroundParallaxProps> = ({
  mediaList,
  className,
  children,
}) => {
  const [index, setIndex] = useState<number>(0)
  const [isFixed, setIsFixed] = useState<boolean>(true)
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0) // State for overlay opacity
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mediaList || mediaList.length === 0) return

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mediaList.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [mediaList])

  // Calculate `isFixed` and `overlayOpacity` on initial render and on scroll
  useEffect(() => {
    const calculateState = () => {
      if (!contentRef.current) return
      const rect = contentRef.current.getBoundingClientRect()
      setIsFixed(rect.bottom > window.innerHeight)

      // Calculate opacity based on scroll position
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const maxScroll = contentRef.current.offsetHeight - windowHeight
      const opacity = Math.min(scrollTop / maxScroll, 0.5) // Max opacity of 0.5
      setOverlayOpacity(opacity)
    }

    // Run on initial render
    calculateState()

    // Add scroll event listener
    window.addEventListener('scroll', calculateState, { passive: true })
    return () => window.removeEventListener('scroll', calculateState)
  }, [])

  const bgImage = (mediaList?.[index]?.media as Media | undefined)?.url

  return (
    <div className={cn('relative w-full min-h-[200vh] overflow-x-hidden', className)}>
      {/* Crossfading, fixed/absolute background */}
      <AnimatePresence>
        <motion.div
          key={bgImage}
          className={cn(
            isFixed
              ? 'fixed inset-0 w-full h-screen bg-cover bg-center pointer-events-none z-0'
              : 'absolute top-auto bottom-0 left-0 w-full h-screen bg-cover bg-center pointer-events-none z-0',
          )}
          style={{
            backgroundImage: `url(${MEDIA_BASE_URL}${bgImage})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Darkening overlay */}
      <div
        className={cn(
          isFixed
            ? 'fixed inset-0 w-full h-screen bg-black pointer-events-none z-10'
            : 'absolute top-auto bottom-0 left-0 w-full h-screen bg-black pointer-events-none z-10',
        )}
        style={{
          opacity: overlayOpacity,
          transition: 'opacity 0.5s ease-in-out', // Smooth transition for overlay
        }}
      />

      {/* Scrollable content */}
      <div ref={contentRef} className="relative z-20 min-h-[200vh]">
        {children}
      </div>
    </div>
  )
}

export default BackgroundParallax

'use client'

import { MediaBlock, Media } from '@/payload-types'

import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'

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
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mediaList || mediaList.length === 0) return

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mediaList.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [mediaList])

  // Switch background from fixed to absolute when content scrolls out of view
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      const rect = contentRef.current.getBoundingClientRect()
      setIsFixed(rect.bottom > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start start', 'end end'],
  })

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.4])

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
            backgroundImage: `url(${bgImage})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Darkening overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className={cn(
          isFixed
            ? 'fixed inset-0 w-full h-screen bg-black pointer-events-none z-10'
            : 'absolute top-auto bottom-0 left-0 w-full h-screen bg-black pointer-events-none z-10',
        )}
      />

      {/* Scrollable content */}
      <div ref={contentRef} className="relative z-20 min-h-[200vh]">
        {children}
      </div>
    </div>
  )
}

export default BackgroundParallax

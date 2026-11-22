'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { MEDIA_BASE_URL } from '@/components/shared/payload-media'

interface BackgroundParallaxProps {
  slides: { id: string; url: string }[]
  className?: string
  children: React.ReactNode
}

const BackgroundParallax: React.FC<BackgroundParallaxProps> = ({ slides, className, children }) => {
  // `reach`: highest slide mounted so far. Mount one ahead so it is downloaded before it fades in.
  // `prev` stays opaque underneath while the current slide fades in on top (no see-through mid-fade).
  const [{ index, prev, reach }, setSlide] = useState({ index: 0, prev: -1, reach: 1 })
  const [isFixed, setIsFixed] = useState<boolean>(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    if (slides.length < 2) return

    let fadeDone: ReturnType<typeof setTimeout> | undefined
    const interval = setInterval(() => {
      setSlide(({ index, reach }) => {
        const next = (index + 1) % slides.length
        return { index: next, prev: index, reach: Math.max(reach, next + 1) }
      })
      // Once the new slide is opaque, the old one fades out unseen underneath, ready to fade in again later
      fadeDone = setTimeout(() => setSlide((slide) => ({ ...slide, prev: -1 })), 2000)
    }, 7000)

    return () => {
      clearInterval(interval)
      clearTimeout(fadeDone)
    }
  }, [slides.length])

  // Motion values update the overlay without re-rendering on every scroll event
  const overlayOpacity = useTransform(scrollY, (y) => {
    const content = contentRef.current
    if (!content) return 0
    return Math.min(y / (content.offsetHeight - window.innerHeight), 0.5) // Max opacity of 0.5
  })

  useMotionValueEvent(scrollY, 'change', () => {
    if (!contentRef.current) return
    setIsFixed(contentRef.current.getBoundingClientRect().bottom > window.innerHeight)
  })

  const layerClassName = isFixed
    ? 'fixed inset-0 w-full h-screen pointer-events-none'
    : 'absolute top-auto bottom-0 left-0 w-full h-screen pointer-events-none'

  return (
    <div className={cn('relative w-full min-h-[200vh] overflow-x-hidden', className)}>
      {/* Crossfading, fixed/absolute background */}
      <div className={cn(layerClassName, 'z-0')}>
        {slides.map(
          (slide, i) =>
            i <= reach && (
              <Image
                key={slide.id}
                src={`${MEDIA_BASE_URL || ''}${slide.url}`}
                alt=""
                fill
                sizes="100vw"
                preload={i === 0}
                className={cn(
                  'object-cover transition-opacity duration-[2000ms] ease-in-out',
                  i === index && 'opacity-100 z-10',
                  i === prev && 'opacity-100',
                  i !== index && i !== prev && 'opacity-0',
                )}
              />
            ),
        )}
      </div>

      {/* Darkening overlay */}
      <motion.div
        className={cn(layerClassName, 'z-10 bg-black')}
        style={{ opacity: overlayOpacity }}
      />

      {/* Scrollable content */}
      <div ref={contentRef} className="relative z-20 min-h-[200vh]">
        {children}
      </div>
    </div>
  )
}

export default BackgroundParallax

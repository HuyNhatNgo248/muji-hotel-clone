'use client'

import { LuChevronDown } from 'react-icons/lu'
import { motion, useInView } from 'motion/react'
import { useRef, useEffect } from 'react'
import useDisplayLogoStore from '@/hooks/use-display-logo'

interface HeroScreenProps {
  banner?: React.ReactNode
  logo?: React.ReactNode
  scrollTargetId: string
}

// First full screen of the home hero: banner, big logo (drives the nav logo), scroll-down button
const HeroScreen: React.FC<HeroScreenProps> = ({ banner, logo, scrollTargetId }) => {
  const logoRef = useRef<HTMLDivElement>(null)
  const setDisplayLogo = useDisplayLogoStore((state) => state.setDisplayLogo)
  const isLogoInView = useInView(logoRef)

  const handleScroll = () => {
    const target = document.getElementById(scrollTargetId)
    if (!target) return

    const topOffset = 10
    window.scrollTo({
      top: target.offsetTop - topOffset, // Stop just above the description
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (!logoRef.current) return

    setDisplayLogo(!isLogoInView)
  }, [isLogoInView, setDisplayLogo])

  return (
    <div className="relative flex flex-col items-center justify-between h-[calc(100vh-var(--nav-h))]">
      {banner}

      <div ref={logoRef}>{logo}</div>

      <motion.button
        onClick={handleScroll}
        className="cursor-pointer"
        aria-label="Scroll down"
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
  )
}

export default HeroScreen

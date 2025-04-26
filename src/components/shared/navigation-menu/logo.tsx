'use client'
import { LogoProps as LogoCompProps } from '@/components/organisms/logo'

import useDisplayLogoStore from '@/hooks/use-display-logo'
import LogoComp from '@/components/organisms/logo'
import { motion } from 'motion/react'
import Link from 'next/link'

interface LogoProps {
  className?: string
  display?: boolean
  variant?: LogoCompProps['variant']
}

const Logo: React.FC<LogoProps> = ({ display = false, variant = 'md', ...props }) => {
  const displayLogo = useDisplayLogoStore((state) => state.displayLogo)

  if (!displayLogo && !display) return null

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }} // Start above the viewport and invisible
      animate={{ y: 0, opacity: 1 }} // Drop down to its position and fade in
      transition={{
        duration: 0.5, // Duration of the animation
        ease: 'easeOut', // Smooth easing
      }}
    >
      <Link href="/">
        <LogoComp
          {...props}
          variant={variant}
          orientation="horizontal"
          companyName="MUJI HOTEL"
          branchName="GINZA"
          blockType="logo"
        />
      </Link>
    </motion.div>
  )
}

export default Logo

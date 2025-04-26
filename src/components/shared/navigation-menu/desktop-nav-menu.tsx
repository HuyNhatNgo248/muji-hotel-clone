'use client'

import Logo from './logo'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from './language-switcher'
import { Dictionary } from '@/types'
import { motion } from 'motion/react'

interface DesktopNavMenuProps {
  className?: string
  dictionary: Dictionary
  displayLogo?: boolean
}

const HoverLink: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const targetElement = document.getElementById(href.split('#')[1])

      if (targetElement) {
        const navigationMenuHeight = document.getElementById('navigation-menu')?.offsetHeight || 0

        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - navigationMenuHeight - 100

        window?.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <motion.div className="relative" whileHover="hover" initial="rest" animate="rest">
      <Link href={href} onClick={handleClick} className="mb-1">
        {children}
      </Link>
      <motion.span
        className="absolute bottom-0 left-1/2 h-[2px] bg-white"
        variants={{
          rest: { width: 0, translateX: '-50%' },
          hover: { width: '60%', translateX: '-50%' },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

const DesktopNavMenu: React.FC<DesktopNavMenuProps> = ({ className, dictionary, displayLogo }) => {
  return (
    <div className={cn('justify-between items-center lg:flex hidden', className)}>
      <div>
        <Logo display={displayLogo} />
      </div>
      <div className={'flex flex-col items-end gap-6'}>
        <div className="flex gap-4">
          <Button variant="outline" className="border-1 rounded-xl">
            <Link href={'https://hotel.muji.com/ginza/ja/confirm/'} className="uppercase">
              {dictionary['navigation-menu']['find-reservation']}
            </Link>
          </Button>
          <Button variant="default" className="bg-white text-gray-700 rounded-xl">
            <Link
              href={'https://go-mujihotelginza.reservation.jp/ja/searchInput'}
              className="uppercase"
            >
              {dictionary['navigation-menu']['reservations']}
            </Link>
          </Button>
        </div>

        <div className="flex gap-10">
          <HoverLink href={'/news'}>{dictionary['navigation-menu']['news']}</HoverLink>
          <HoverLink href={'/#access'}>{dictionary['navigation-menu']['location']}</HoverLink>
          <HoverLink href={'/rooms'}>{dictionary['navigation-menu']['rooms']}</HoverLink>
          <HoverLink href={'/facilities'}>{dictionary['navigation-menu']['facilities']}</HoverLink>
          <HoverLink href={'/contact'}>{dictionary['navigation-menu']['contact-us']}</HoverLink>

          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}

export default DesktopNavMenu

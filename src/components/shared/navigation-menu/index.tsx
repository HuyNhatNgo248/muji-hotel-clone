'use client'

import { Dictionary } from '@/types'
import { cn } from '@/lib/utils'
import DesktopNavMenu from './desktop-nav-menu'
import MobileNavMenu from './mobile-nav-menu'
import { usePathname, useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface NavigationMenuProps {
  className?: string

  dictionary: Dictionary
}

export default function NavigationMenu({ className, dictionary }: NavigationMenuProps) {
  const pathname = usePathname()
  const params = useParams()
  const lang = params.lang as string
  const navRef = useRef<HTMLElement>(null)

  // Publish the real height as --nav-h for heroes that size/offset against the sticky nav (CSS only, no re-renders)
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const observer = new ResizeObserver(() =>
      document.documentElement.style.setProperty(
        '--nav-h',
        `${nav.getBoundingClientRect().height}px`,
      ),
    )
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      ref={navRef}
      id="navigation-menu"
      className={cn('sticky top-0 z-50 text-white uppercase bg-black/40', className)}
    >
      <div className="w-container">
        <DesktopNavMenu
          className="py-6"
          dictionary={dictionary}
          lang={lang}
          displayLogo={pathname !== `/${lang}`}
        />
        <MobileNavMenu className="py-4" dictionary={dictionary} lang={lang} />
      </div>
    </nav>
  )
}

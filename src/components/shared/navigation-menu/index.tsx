import { Dictionary } from '@/types'
import { cn } from '@/lib/utils'
import DesktopNavMenu from './desktop-nav-menu'
import MobileNavMenu from './mobile-nav-menu'

interface NavigationMenuProps {
  className?: string
  displayLogo?: boolean
  dictionary: Dictionary
}

export const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
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

export default function NavigationMenu({
  className,
  dictionary,
  displayLogo = false,
}: NavigationMenuProps) {
  return (
    <nav
      id="navigation-menu"
      className={cn('sticky top-0 z-50 text-white uppercase bg-black/20', className)}
    >
      <div className="w-container">
        <DesktopNavMenu className="py-6" dictionary={dictionary} displayLogo={displayLogo} />
        <MobileNavMenu className="py-4" dictionary={dictionary} />
      </div>
    </nav>
  )
}

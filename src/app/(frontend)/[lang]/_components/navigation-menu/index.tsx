import { Dictionary } from '@/types'
import { cn } from '@/lib/utils'
import DesktopNavMenu from './desktop-nav-menu'
import MobileNavMenu from './mobile-nav-menu'

interface NavigationMenuProps {
  className?: string
  dictionary: Dictionary
}

export default function NavigationMenu({ className, dictionary }: NavigationMenuProps) {
  return (
    <nav
      id="navigation-menu"
      className={cn('sticky top-0 z-50 text-white uppercase bg-black/20', className)}
    >
      <div className="w-container">
        <DesktopNavMenu className="py-6" dictionary={dictionary} />
        <MobileNavMenu className="py-4" dictionary={dictionary} />
      </div>
    </nav>
  )
}

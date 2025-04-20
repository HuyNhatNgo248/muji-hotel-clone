import Logo from './logo'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from './language-switcher'
import { Dictionary } from '@/types'

interface DesktopNavMenuProps {
  className?: string
  dictionary: Dictionary
}

const DesktopNavMenu: React.FC<DesktopNavMenuProps> = async ({ className, dictionary }) => {
  return (
    <div className={cn('justify-between items-center lg:flex hidden', className)}>
      <div>
        <Logo />
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
          <Link href={'/news'}>{dictionary['navigation-menu']['news']}</Link>
          <Link href={'/#access'}>{dictionary['navigation-menu']['location']}</Link>
          <Link href={'/rooms'}>{dictionary['navigation-menu']['rooms']}</Link>
          <Link href={'/facilities'}>{dictionary['navigation-menu']['facilities']}</Link>
          <Link href={'/contact'}>{dictionary['navigation-menu']['contact-us']}</Link>

          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}

export default DesktopNavMenu

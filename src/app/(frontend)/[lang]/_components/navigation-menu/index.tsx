import { cn } from '@/lib/utils'
import Link from 'next/link'
import { getDictionary } from '../../dictionaries'
import { Button } from '@/components/ui/button'
import { MujiLocale } from '@/types'
import LanguageSwitcher from './language-switcher'

interface NavigationMenuProps {
  className?: string
  lang: MujiLocale
}

export default async function NavigationMenu({ className, lang }: NavigationMenuProps) {
  const dict = await getDictionary(lang)

  return (
    <nav
      id="navigation-menu"
      className={cn(
        'sticky px-40 py-6 top-0 flex flex-col items-end gap-6 z-50 bg-black/20 text-white uppercase',
        className,
      )}
    >
      <div className="flex gap-4">
        <Button variant="outline" className="border-1 rounded-xl">
          <Link href={'https://hotel.muji.com/ginza/ja/confirm/'} className="uppercase">
            {dict['navigation-menu']['find-reservation']}
          </Link>
        </Button>
        <Button variant="default" className="bg-white text-gray-700 rounded-xl">
          <Link
            href={'https://go-mujihotelginza.reservation.jp/ja/searchInput'}
            className="uppercase"
          >
            {dict['navigation-menu']['reservations']}
          </Link>
        </Button>
      </div>

      <div className="flex gap-10">
        <Link href={'/news'}>{dict['navigation-menu']['news']}</Link>
        <Link href={'/#access'}>{dict['navigation-menu']['location']}</Link>
        <Link href={'/rooms'}>{dict['navigation-menu']['rooms']}</Link>
        <Link href={'/facilities'}>{dict['navigation-menu']['facilities']}</Link>
        <Link href={'/contact'}>{dict['navigation-menu']['contact-us']}</Link>

        <LanguageSwitcher />
      </div>
    </nav>
  )
}

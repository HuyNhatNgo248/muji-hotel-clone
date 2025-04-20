import { cn } from '@/lib/utils'
import Link from 'next/link'
import { getDictionary } from '../../dictionaries'
import { Button } from '@/components/ui/button'
import { MujiLocale } from '@/types'

interface NavigationMenuProps {
  className?: string
  lang: MujiLocale
}

export default async function NavigationMenu({ className, lang }: NavigationMenuProps) {
  const dict = await getDictionary(lang)

  return (
    <nav className={cn('flex flex-col justify-end gap-8', className)}>
      <div className="flex gap-4">
        <Button>{dict['navigation-menu']['fine-reservation']}</Button>
        <Button>{dict['navigation-menu']['reservations']}</Button>
      </div>

      <div className="flex gap-4">
        <Link href={'/'}>{dict['navigation-menu']['news']}</Link>
        <Link href={'/'}>{dict['navigation-menu']['location']}</Link>
        <Link href={'/'}>{dict['navigation-menu']['rooms']}</Link>
        <Link href={'/'}>{dict['navigation-menu']['facilities']}</Link>
        <Link href={'/'}>{dict['navigation-menu']['contact-us']}</Link>
      </div>
    </nav>
  )
}

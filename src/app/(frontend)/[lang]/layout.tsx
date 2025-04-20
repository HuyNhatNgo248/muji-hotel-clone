import { MujiLocale } from '@/types'
import NavigationMenu from './_components/navigation-menu'
import { getDictionary } from './dictionaries'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: MujiLocale }
}) {
  const { lang } = params

  const dictionary = await getDictionary(lang)

  return (
    <div>
      <NavigationMenu dictionary={dictionary} />
      {children}
    </div>
  )
}

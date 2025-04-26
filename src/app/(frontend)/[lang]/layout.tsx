import { Params } from '@/types'
import NavigationMenu from '@/components/shared/navigation-menu'
import { getDictionary } from './dictionaries'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
} & Params) {
  const { lang } = await params

  const dictionary = await getDictionary(lang)

  return (
    <div>
      <NavigationMenu dictionary={dictionary} />
      {children}
    </div>
  )
}

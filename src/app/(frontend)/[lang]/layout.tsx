import { MujiLocale } from '@/types'
import NavigationMenu from './_components/navigation-menu'

const Layout: React.FC<{ children: React.ReactNode; params: { lang: MujiLocale } }> = ({
  children,
  params,
}) => {
  return (
    <div>
      <NavigationMenu lang={params.lang as MujiLocale} />
      {children}
    </div>
  )
}

export default Layout

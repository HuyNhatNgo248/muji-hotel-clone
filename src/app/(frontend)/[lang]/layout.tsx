import '../../globals.css'

import type { Metadata } from 'next'
import type { MujiLocale } from '@/types'
import { LOCALES } from '@/lib/config'
import { roboto } from '@/lib/fonts'
import NavigationMenu from '@/components/shared/navigation-menu'
import Footer from '@/components/shared/footer'
import { getDictionary } from './dictionaries'

// Pages are prerendered and served from cache. CMS edits made through this app purge it
// immediately (collections/_hooks/revalidate.ts); this is the backstop for edits made elsewhere,
// e.g. from a local dev server pointed at the same database.
export const revalidate = 600

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }))

export const metadata: Metadata = {
  title: { default: 'MUJI HOTEL', template: '%s | MUJI HOTEL' },
  description: 'MUJI HOTEL',
}

export default async function Layout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params

  const dictionary = await getDictionary(lang as MujiLocale)

  return (
    <html lang={lang} className={roboto.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={roboto.className}>
        <div>
          <NavigationMenu dictionary={dictionary} />
          <main>{children}</main>
          <Footer dictionary={dictionary} lang={lang as MujiLocale} />
        </div>
      </body>
    </html>
  )
}

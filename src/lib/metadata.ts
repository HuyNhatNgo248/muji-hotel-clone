import type { Metadata } from 'next'
import { LOCALES } from './config'

// Title + hreflang alternates for the page served at /{lang}{path}
export const pageMetadata = (lang: string, path: string, title?: string | null): Metadata => ({
  ...(title && { title: title.charAt(0).toUpperCase() + title.slice(1) }),
  alternates: {
    canonical: `/${lang}${path}`,
    languages: Object.fromEntries(LOCALES.map((locale) => [locale, `/${locale}${path}`])),
  },
})

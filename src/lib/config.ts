import type { MujiLocale } from '@/types'

export const LOCALES = ['ja', 'en'] as MujiLocale[]
export const DEFAULT_LOCALES = 'ja'

// Paths that must not get a locale prefix: already localized, or served outside /[lang]
const UNLOCALIZED_PATH = new RegExp(`^/(${[...LOCALES, 'api', 'admin'].join('|')})(?=$|[/?#])`)

// CMS editors write internal links as '/facilities'; add the locale so they skip the proxy redirect
export const localizeHref = (href: string, lang: string) =>
  href.startsWith('/') && !href.startsWith('//') && !UNLOCALIZED_PATH.test(href)
    ? `/${lang}${href === '/' ? '' : href}`
    : href

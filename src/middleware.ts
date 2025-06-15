import { NextRequest, NextResponse } from 'next/server'
import { LOCALES, DEFAULT_LOCALES } from './lib/config'
import { MujiLocale } from './types'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Exclude payload admin routes
  if (pathname.includes('/admin')) return

  // Exclude static files (e.g., favicon.ico, robots.txt, etc.)
  if (
    /^\/(favicon\.ico|robots\.txt|sitemap\.xml|apple-touch-icon.*|android-chrome.*|mstile.*|browserconfig\.xml|manifest\.json)$/i.test(
      pathname,
    )
  ) {
    return
  }

  // Check if the pathname already includes a locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  // Check for a preferred locale in cookies
  const preferredLocale = request.cookies.get('NEXT_LOCALE')?.value

  // Use the preferred locale if available, otherwise fallback to the default locale
  const locale =
    preferredLocale && LOCALES.includes(preferredLocale as MujiLocale)
      ? preferredLocale
      : DEFAULT_LOCALES

  // Redirect to the URL with the locale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.)
    '/((?!_next|api).*)',
  ],
}

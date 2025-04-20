import { NextRequest, NextResponse } from 'next/server'
import { LOCALES, DEFAULT_LOCALES } from './lib/config'

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl

  // Exclude payload admin routes
  if (pathname.includes('/admin')) return

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${DEFAULT_LOCALES}${pathname}`

  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}

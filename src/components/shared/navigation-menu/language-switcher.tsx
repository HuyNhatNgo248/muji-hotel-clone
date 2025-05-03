'use client'

import { usePathname, useRouter, useParams } from 'next/navigation'
import { LOCALES } from '@/lib/config'
import { cn } from '@/lib/utils'
import { MujiLocale } from '@/types'
import { Separator } from '@/components/ui/separator'
import React from 'react'

interface LanguageSwitcherProps {
  className?: string
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  function switchLocale(locale: MujiLocale) {
    if (locale === (params.lang as MujiLocale)) return

    // Update the locale in the pathname
    const segments = pathname.split('/')
    segments[1] = locale // Assumes /[lang]/... structure
    const newPath = segments.join('/') || '/'

    // Set the preferred locale in cookies
    document.cookie = `NEXT_LOCALE=${locale}; path=/`

    // Redirect to the new path
    router.push(newPath)
  }

  return (
    <div className={cn('flex gap-2', className)}>
      {LOCALES.map((locale, index) => (
        <React.Fragment key={`${locale}-${index}`}>
          <button
            onClick={() => switchLocale(locale)}
            className={cn('cursor-pointer', locale === params.lang ? 'font-bold' : '')}
          >
            {locale.toUpperCase()}
          </button>

          {index < LOCALES.length - 1 && <Separator orientation="vertical" className="bg-white" />}
        </React.Fragment>
      ))}
    </div>
  )
}

export default LanguageSwitcher

import type { Page } from '@/payload-types'
import { getDictionary } from '@/app/(frontend)/[lang]/dictionaries'

export type MujiLocale = 'en' | 'ja'

export interface Params {
  params: Promise<{ slug: string; lang: MujiLocale; id?: string }>
}

export type DynamicZone = Page['dynamicZone']

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

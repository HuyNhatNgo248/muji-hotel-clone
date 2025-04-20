import { Page } from '@/payload-types'

export type MujiLocale = 'en' | 'ja'

export interface Params {
  params: Promise<{ slug: string; lang: MujiLocale }>
}

export type DynamicZone = Page['dynamicZone']

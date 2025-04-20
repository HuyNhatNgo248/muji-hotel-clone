import 'server-only'
import { MujiLocale } from '@/types'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
}

export const getDictionary = async (locale: MujiLocale) => dictionaries[locale]()

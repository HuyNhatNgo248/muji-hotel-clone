import type { Where, CollectionSlug } from 'payload'
import type { MujiLocale } from '@/types/index'

import { getPayload } from 'payload'
import config from '@/payload.config'

const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })

export const fetchPage = async (
  slug: string | null,
  locale: MujiLocale,
  query?: Where,
  depth?: number,
) => {
  const result = await payload.find({
    collection: 'pages',
    depth: depth || 2,
    where: {
      slug: {
        equals: slug,
      },
      ...(query || {}),
    },
    locale,
  })

  if (result.totalDocs === 0) {
    return null
  }

  return result.docs[0]
}

export const fetchCollection = async (
  collection: CollectionSlug,
  query?: Where,
  depth?: number,
) => {
  const result = await payload.find({
    collection,
    depth: depth || 2,
    where: {
      ...(query || {}),
    },
  })

  if (result.totalDocs === 0) {
    return null
  }

  return result.docs
}

export const fetchById = async (
  collection: CollectionSlug,
  id: string,
  locale: MujiLocale,
  depth?: number,
) => {
  const result = await payload.findByID({
    collection,
    id,
    depth: depth || 2,
    locale,
  })

  return result
}

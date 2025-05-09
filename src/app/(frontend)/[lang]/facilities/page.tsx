import { Params, DynamicZone } from '@/types'

import { fetchPage } from '@/lib/api'
import { notFound } from 'next/navigation'
import Hero from './_components/hero'

export default async function Page({ params }: Params) {
  const { lang } = await params

  const page = await fetchPage('/facilities', lang, {}, 5)

  if (!page) return notFound()

  const dynamicZone = page.dynamicZone as DynamicZone

  const hero = dynamicZone?.find((item) => item.blockType === 'hero')

  return <div>{hero && <Hero {...hero} />}</div>
}

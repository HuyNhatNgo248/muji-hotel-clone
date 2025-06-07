import { Params, DynamicZone } from '@/types'

import { fetchPage } from '@/lib/api'
import { notFound } from 'next/navigation'
import Hero from './_components/hero'
import Intro from './_components/intro'
import Facility from '@/components/organisms/facility'
import { cn } from '@/lib/utils'

export default async function Page({ params }: Params) {
  const { lang } = await params

  const page = await fetchPage('/facilities', lang, {}, 5)

  if (!page) return notFound()

  const dynamicZone = page.dynamicZone as DynamicZone

  const hero = dynamicZone?.find((item) => item.blockType === 'hero')
  const intro = dynamicZone?.find((item) => item.blockType === 'service-intro')

  const facilities = dynamicZone?.filter((item) => item.blockType === 'facility')

  return (
    <div
      className={cn({
        'tracking-widest': lang === 'ja',
        'tracking-wide': lang === 'en',
      })}
    >
      {hero && <Hero {...hero} />}
      {intro && <Intro {...intro} />}

      {facilities &&
        facilities?.map((facility, index) => (
          <Facility key={`${facility.id}-${index}`} {...facility} />
        ))}
    </div>
  )
}

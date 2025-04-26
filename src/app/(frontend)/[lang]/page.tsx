import { Params } from '@/types'
import { ServiceIntroBlock } from '@/payload-types'
import { DynamicZone } from '@/types'

import { fetchPage } from '@/lib/api'
import { notFound } from 'next/navigation'
import Hero from './_components/hero'
import ServiceIntro from './_components/service-intro'
import Separator from './_components/separator'

export default async function Page({ params }: Params) {
  const { lang } = await params

  const page = await fetchPage('/', lang, {}, 5)

  if (!page) return notFound()

  const dynamicZone = page.dynamicZone as DynamicZone

  const hero = dynamicZone?.find((item) => item.blockType === 'hero')
  const accessIntro = dynamicZone?.find(
    (item) => item.blockType === 'service-intro' && item.blockName === 'アクセス',
  ) as ServiceIntroBlock | undefined
  const roomsIntro = dynamicZone?.find(
    (item) => item.blockType === 'service-intro' && item.blockName === '客室',
  ) as ServiceIntroBlock | undefined
  const facilitiesIntro = dynamicZone?.find(
    (item) => item.blockType === 'service-intro' && item.blockName === '施設',
  ) as ServiceIntroBlock | undefined
  const separator = dynamicZone?.find((item) => item.blockType === 'separator')
  const mujiBase = dynamicZone?.find(
    (item) => item.blockType === 'service-intro' && item.blockName === 'MUJI BASE',
  ) as ServiceIntroBlock | undefined
  const mujiRoom = dynamicZone?.find(
    (item) => item.blockType === 'service-intro' && item.blockName === 'MUJI room',
  ) as ServiceIntroBlock | undefined

  return (
    <div>
      {hero && <Hero {...hero} />}
      <div className="flex flex-col justify-center gap-40 py-container">
        {accessIntro && <ServiceIntro {...accessIntro} classNames={{ description: 'w-full' }} />}
        {roomsIntro && (
          <ServiceIntro
            {...roomsIntro}
            classNames={{ description: 'xl:w-[40%] lg:w-[50%] md:w-[65%] w-4/5' }}
          />
        )}
        {facilitiesIntro && (
          <ServiceIntro
            {...facilitiesIntro}
            classNames={{ description: 'xl:w-[40%] lg:w-[50%] md:w-[65%] w-4/5' }}
          />
        )}

        <div>
          {separator && <Separator {...separator} className="mb-8" />}
          {mujiBase && (
            <ServiceIntro
              {...mujiBase}
              classNames={{ description: 'xl:w-[40%] lg:w-[50%] md:w-[65%] w-4/5' }}
            />
          )}
        </div>
        {mujiRoom && (
          <ServiceIntro
            {...mujiRoom}
            classNames={{ description: 'xl:w-[40%] lg:w-[50%] md:w-[65%] w-4/5' }}
          />
        )}
      </div>
    </div>
  )
}

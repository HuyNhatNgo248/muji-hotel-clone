import { Params } from '@/types'
import { ServiceIntroBlock } from '@/payload-types'
import { DynamicZone } from '@/types'

import { fetchPage } from '@/lib/api'
import { pageMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import Hero from './_components/hero'
import ServiceIntro from './_components/service-intro'
import Separator from './_components/separator'
import SocialMedia from '@/components/organisms/social-media'

export async function generateMetadata({ params }: Params) {
  return pageMetadata((await params).lang, '')
}

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
  const socialMedia = dynamicZone?.find((item) => item.blockType === 'social-media')

  return (
    <div>
      {hero && <Hero {...hero} lang={lang} />}
      <div className="flex flex-col justify-center lg:gap-40 md:gap-32 gap-20 py-container-sm">
        {accessIntro && (
          <ServiceIntro {...accessIntro} lang={lang} classNames={{ description: 'w-full' }} />
        )}

        {roomsIntro && (
          <ServiceIntro
            {...roomsIntro}
            lang={lang}
            classNames={{ description: 'xl:w-[40%] lg:w-[50%] md:w-[65%] w-4/5' }}
          />
        )}

        {facilitiesIntro && (
          <ServiceIntro
            {...facilitiesIntro}
            lang={lang}
            classNames={{ description: 'xl:w-[40%] lg:w-[50%] md:w-[65%] w-4/5' }}
          />
        )}

        <div>
          {separator && <Separator {...separator} lang={lang} className="mb-8" />}
          {mujiBase && (
            <ServiceIntro
              {...mujiBase}
              lang={lang}
              classNames={{ description: 'xl:w-[40%] lg:w-[50%] md:w-[65%] w-4/5' }}
            />
          )}
        </div>

        {mujiRoom && (
          <ServiceIntro
            {...mujiRoom}
            lang={lang}
            classNames={{ description: 'xl:w-[40%] lg:w-[50%] md:w-[65%] w-4/5' }}
          />
        )}

        {socialMedia && <SocialMedia {...socialMedia} />}
      </div>
    </div>
  )
}

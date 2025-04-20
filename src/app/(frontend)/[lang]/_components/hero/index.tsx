'use client'

import { HeroBlock } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'
import BackgroundParallax from './background-parallax'
import Logo from '@/components/organisms/logo'
import Banner from '@/components/organisms/banner'
import PayloadRichText from '@/components/shared/payload-richtext'
import { useParams } from 'next/navigation'

interface HeroProps extends HeroBlock {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ className, description, layout }) => {
  const params = useParams()

  const mediaList = layout?.find((item) => item.blockType === 'media-list')?.mediaList || null
  const logo = layout?.find((item) => item.blockType === 'logo')
  const banner = layout?.find((item) => item.blockType === 'banner')

  return (
    <div className={cn('', className)}>
      <BackgroundParallax mediaList={mediaList} className="text-white">
        <div className="relative h-screen flex items-center justify-center">
          {banner && (
            <Banner {...banner} className="absolute top-0 text-sm tracking-wide font-semibold" />
          )}
          {logo && <Logo {...logo} variant="lg" orientation="vertical" />}
        </div>

        <div
          className={cn('mx-auto w-1/3 text-center text-lg mb-10', {
            'tracking-[0.30em] leading-10': params.lang === 'ja',
            'tracking-widest leading-8': params.lang === 'en',
          })}
        >
          <PayloadRichText data={description as SerializedEditorState} />
        </div>
      </BackgroundParallax>
    </div>
  )
}

export default Hero

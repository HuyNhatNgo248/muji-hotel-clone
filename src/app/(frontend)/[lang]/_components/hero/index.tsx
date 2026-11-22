import type { HeroBlock, Media } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { MujiLocale } from '@/types'

import { cn } from '@/lib/utils'
import BackgroundParallax from './background-parallax'
import HeroScreen from './hero-screen'
import Logo from '@/components/organisms/logo'
import Banner from '@/components/organisms/banner'
import PayloadRichText from '@/components/shared/payload-richtext'

interface HeroProps extends HeroBlock {
  className?: string
  lang: MujiLocale
}

// Server component: rich text, banner and logo render here; only the interactive shells are client code
const Hero: React.FC<HeroProps> = ({ className, description, layout, lang }) => {
  const mediaList = layout?.find((item) => item.blockType === 'media-list')?.mediaList || []
  const logo = layout?.find((item) => item.blockType === 'logo')
  const banner = layout?.find((item) => item.blockType === 'banner')

  const slides = mediaList
    .map((item) => item.media as Media | undefined)
    .filter((media): media is Media & { url: string } => Boolean(media?.url))
    .map(({ id, url }) => ({ id, url }))

  return (
    <BackgroundParallax slides={slides} className={cn('text-white', className)}>
      <HeroScreen
        scrollTargetId="hero-description"
        banner={
          banner && (
            <Banner {...banner} lang={lang} className="text-sm tracking-wide font-semibold" />
          )
        }
        logo={
          logo && (
            <Logo
              {...logo}
              variant="lg"
              orientation="vertical"
              classNames={{ container: 'pb-30' }}
            />
          )
        }
      />

      <div
        id="hero-description"
        className={cn('mx-auto xl:w-1/3 lg:w-1/2 w-4/5 text-center text-lg my-10', {
          'tracking-[0.30em] leading-10': lang === 'ja',
          'tracking-widest leading-8': lang === 'en',
        })}
      >
        <PayloadRichText data={description as SerializedEditorState} />
      </div>
    </BackgroundParallax>
  )
}

export default Hero

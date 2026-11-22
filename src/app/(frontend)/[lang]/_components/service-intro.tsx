import { ServiceIntroBlock as ServiceIntroBlockPayload, Media } from '@/payload-types'
import type { MujiLocale } from '@/types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'
import { localizeHref } from '@/lib/config'
import PayloadRichText from '@/components/shared/payload-richtext'
import PayloadMedia from '@/components/shared/payload-media'
import Button from '@/components/atoms/button'
import Link from 'next/link'
import FadeIn from '@/components/animation/fade-in'

interface ServiceIntroProps extends ServiceIntroBlockPayload {
  classNames?: {
    container?: string
    description?: string
  }
  lang: MujiLocale
}

const ServiceIntro: React.FC<ServiceIntroProps> = ({
  classNames,
  title,
  description,
  url,
  openInNewTab,
  layout,
  lang,
}) => {
  const button = layout?.find((item) => item.blockType === 'Button')
  const media = layout?.find((item) => item.blockType === 'media')?.media

  return (
    <FadeIn className={cn(classNames?.container)}>
      <div className={'flex flex-col items-center gap-6'}>
        {title && (
          <h3
            className={cn('text-2xl font-bold tracking-widest', {
              'tracking-widest': lang === 'ja',
              'tracking-wide': lang === 'en',
            })}
          >
            {title}
          </h3>
        )}
        {description && (
          <div
            className={cn(
              'w-full text-base font-light text-center',
              {
                'leading-6': lang === 'en',
                'leading-8': lang === 'ja',
              },
              classNames?.description,
            )}
          >
            <PayloadRichText data={description as SerializedEditorState} />
          </div>
        )}
        {button && <Button {...button} lang={lang} className="text-gray-500" />}

        {media && (
          <Link
            className="w-full flex justify-center hover:bg-gray-100 transition-colors duration-300"
            href={localizeHref(url || '/', lang)}
            target={openInNewTab ? '_blank' : undefined}
          >
            <div className="xl:w-[60%] lg:w-[70%] md:w-[80%] w-full">
              <PayloadMedia
                {...(media as Media)}
                sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 70vw, (min-width: 768px) 80vw, 100vw"
              />
            </div>
          </Link>
        )}
      </div>
    </FadeIn>
  )
}

export default ServiceIntro

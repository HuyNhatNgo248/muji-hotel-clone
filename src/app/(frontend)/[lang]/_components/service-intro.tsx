'use client'

import { ServiceIntroBlock as ServiceIntroBlockPayload, Media } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'
import PayloadRichText from '@/components/shared/payload-richtext'
import PayloadMedia from '@/components/shared/payload-media'
import { useParams } from 'next/navigation'
import Button from '@/components/atoms/button'
import Link from 'next/link'

interface ServiceIntroProps extends ServiceIntroBlockPayload {
  classNames?: {
    container?: string
    description?: string
  }
}

const ServiceIntro: React.FC<ServiceIntroProps> = ({
  classNames,
  title,
  description,
  url,
  openInNewTab,
  layout,
}) => {
  const params = useParams()

  const button = layout?.find((item) => item.blockType === 'Button')
  console.log('button', button)
  const media = layout?.find((item) => item.blockType === 'media')?.media

  console.log('media', media)

  return (
    <div className={cn(classNames?.container)}>
      <div className={'flex flex-col items-center gap-6'}>
        {title && (
          <h3
            className={cn('text-2xl font-bold tracking-widest', {
              'tracking-widest': params.lang === 'ja',
              'tracking-wide': params.lang === 'en',
            })}
          >
            {title}
          </h3>
        )}
        {description && (
          <div
            className={cn(
              'w-full text-sm font-light text-center',
              {
                'leading-6': params.lang === 'en',
                'leading-8': params.lang === 'ja',
              },
              classNames?.description,
            )}
          >
            <PayloadRichText data={description as SerializedEditorState} />
          </div>
        )}
        {button && <Button {...button} className="text-gray-500" />}

        {media && (
          <Link
            className="w-full flex justify-center hover:bg-gray-100 transition-colors duration-300"
            href={url || '/'}
            target={openInNewTab ? '_blank' : undefined}
          >
            <div className="xl:w-[60%] lg:w-[70%] md:w-[80%] w-full">
              <PayloadMedia {...(media as Media)} />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ServiceIntro

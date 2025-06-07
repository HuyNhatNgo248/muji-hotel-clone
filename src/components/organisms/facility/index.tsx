'use client'

import { cn } from '@/lib/utils'
import { FacilityBlock, HoursBlock, ListItemBlock, MediaListBlock } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { useParams } from 'next/navigation'
import PayloadRichText from '../../shared/payload-richtext'
import Hours from './hours'
import Info from './info'
import Gallery from './gallery'

interface FacilityProps extends FacilityBlock {
  className?: string
}

const Facility: React.FC<FacilityProps> = ({ className, title, description, layout }) => {
  const params = useParams()

  const hours = layout?.find((item) => item.blockType === 'hours' && item.blockName === 'Hours') as
    | HoursBlock
    | undefined

  const seats = layout?.find(
    (item) => item.blockType === 'list-item' && item.blockName === 'Seats',
  ) as ListItemBlock | undefined
  const floor = layout?.find(
    (item) => item.blockType === 'list-item' && item.blockName === 'Floor',
  ) as ListItemBlock | undefined

  const gallery = layout?.find(
    (item) => item.blockType === 'media-list' && item.blockName === 'Gallery',
  ) as MediaListBlock | undefined

  return (
    <div className={cn('py-container-sm', className)}>
      <div className="grid xl:grid-cols-[500px_1fr] grid-rows-[auto_1fr] max-w-[1440px] mx-auto">
        {gallery && <Gallery {...gallery} className="xl:hidden block" />}

        <div className="bg-gray-100 py-20 xl:px-16 lg:px-40 md:px-20 px-8 flex flex-col gap-6">
          {title && (
            <h2
              className={cn('text-4xl/normal font-bold', {
                'tracking-widest': params.lang === 'ja',
                'tracking-wide': params.lang === 'en',
              })}
            >
              {title}
            </h2>
          )}

          <div className="flex flex-col gap-6">
            {description && (
              <PayloadRichText
                classNames={{
                  container: cn('text-sm/normal', {
                    'tracking-widest': params.lang === 'ja',
                    'tracking-wide': params.lang === 'en',
                  }),
                }}
                data={description as SerializedEditorState}
              />
            )}

            {hours && <Hours {...hours} />}

            <div className="grid grid-cols-[auto_1fr] gap-x-12 gap-y-6 text-xs font-bold">
              {seats && <Info {...seats} />}
              {floor && <Info {...floor} />}
            </div>
          </div>
        </div>

        {gallery && <Gallery {...gallery} className="xl:block hidden" />}
      </div>
    </div>
  )
}

export default Facility

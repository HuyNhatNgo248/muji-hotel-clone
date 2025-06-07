import { HoursBlock } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'
import PayloadRichText from '@/components/shared/payload-richtext'
import React from 'react'

interface HoursProps extends HoursBlock {
  className?: string
}

const Hours: React.FC<HoursProps> = ({ className, title, layout }) => {
  return (
    <div className={cn('flex flex-col gap-2 font-bold', className)}>
      {title && <p className="text-sm">{title}</p>}

      {layout && (
        <div className="pl-6 text-xs grid grid-cols-[auto_1fr] gap-x-12 gap-y-2">
          {layout?.map((item, index) => (
            <React.Fragment key={`${item.id}-${index}`}>
              {item.title && <span>{item.title}</span>}
              {item.description && (
                <PayloadRichText
                  classNames={{
                    container: 'text-xs',
                  }}
                  data={item.description as SerializedEditorState}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default Hours

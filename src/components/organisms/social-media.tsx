'use client'
import { SocialMediaBlock } from '@/payload-types'

import { cn } from '@/lib/utils'
import Icon from '../atoms/icon'
import Link from 'next/link'

interface SocialMediaProps extends SocialMediaBlock {
  classNames?: {
    container?: string
    title?: string
    icon?: string
  }
}

const SocialMedia: React.FC<SocialMediaProps> = ({ classNames, title, socialMedia }) => {
  return (
    <div className={cn('flex flex-col items-center gap-2', classNames?.container)}>
      <h3 className={cn('text-lg font-semibold tracking-wide', classNames?.title)}>{title}</h3>

      <div className="flex gap-4">
        {socialMedia?.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href={item.url || '/'}
            target={item.openInNewTab ? '_blank' : '_self'}
          >
            {item.iconField && (
              <Icon className={cn('size-6', classNames?.icon)} path={item.iconField} />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SocialMedia

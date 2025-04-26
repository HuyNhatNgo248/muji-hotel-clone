'use client'
import { SocialMediaBlock } from '@/payload-types'

import { cn } from '@/lib/utils'
import Icon from '../atoms/icon'
import Link from 'next/link'

interface SocialMediaProps extends SocialMediaBlock {
  className?: string
}

const SocialMedia: React.FC<SocialMediaProps> = ({ className, title, socialMedia }) => {
  return (
    <div className={cn('w-full ', className)}>
      <div className={'flex flex-col items-center gap-4'}>
        <h3 className={'text-xl font-bold tracking-wide'}>{title}</h3>

        <div className="flex gap-4">
          {socialMedia?.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={item.url || '/'}
              target={item.openInNewTab ? '_blank' : '_self'}
            >
              {item.iconField && <Icon className="size-8" path={item.iconField} />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SocialMedia

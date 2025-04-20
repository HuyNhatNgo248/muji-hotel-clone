import type { BannerBlock } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import PayloadRichText from '@/components/shared/payload-richtext'

interface BannerProps extends BannerBlock {
  className?: string
}

const Banner: React.FC<BannerProps> = ({ className, description, url, openInNewTab }) => {
  const content = <PayloadRichText data={description as SerializedEditorState} />

  return (
    <div className={cn('py-4 w-full flex justify-center items-center bg-black/25', className)}>
      {url ? (
        <Link href={url} target={openInNewTab ? '_blank' : '_self'}>
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  )
}

export default Banner

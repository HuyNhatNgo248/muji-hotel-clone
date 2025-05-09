import type { Media } from '@/payload-types'

import { cn } from '@/lib/utils'
import { MEDIA_BASE_URL } from '.'

interface PayloadVideoProps extends Media {
  className?: string
  priority?: boolean
}

const PayloadVideo: React.FC<PayloadVideoProps> = ({ url, className }) => {
  if (!url) return null

  return (
    <div className={cn('relative w-full rounded-lg overflow-hidden', className)}>
      <video
        src={`${MEDIA_BASE_URL || ''}${url}`}
        autoPlay
        muted
        playsInline
        loop
        className={cn('w-full h-full absolute inset-0 object-cover')}
      />
    </div>
  )
}

export default PayloadVideo

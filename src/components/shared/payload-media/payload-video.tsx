import type { Media } from '@/payload-types'

import { cn } from '@/lib/utils'

interface PayloadVideoProps extends Media {
  className?: string
  priority?: boolean
}

const PayloadVideo: React.FC<PayloadVideoProps> = ({ url, className }) => {
  if (!url) return null

  const baseUrl =
    process.env.NODE_ENV === 'development' ? '' : process.env.NEXT_PUBLIC_VERCEL_BLOB_STORE_BASE_URL

  return (
    <div className={cn('relative w-full rounded-lg overflow-hidden', className)}>
      <video
        src={`${baseUrl || ''}${url}`}
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

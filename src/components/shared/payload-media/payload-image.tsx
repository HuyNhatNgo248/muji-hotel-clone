import type { Media } from '@/payload-types'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PayloadImageProps extends Media {
  className?: string
  priority?: boolean
}

const PayloadImage: React.FC<PayloadImageProps> = ({
  className,
  url,
  alt,
  width,
  height,
  priority = false,
}) => {
  if (!url || !alt || !width || !height) return null

  const baseUrl =
    process.env.NODE_ENV === 'development' ? '' : process.env.NEXT_PUBLIC_VERCEL_BLOB_STORE_BASE_URL

  return (
    <Image
      src={`${baseUrl || ''}${url}`}
      alt={alt}
      width={width}
      height={height}
      className={cn('w-full h-full object-fit', className)}
      priority={priority}
    />
  )
}

export default PayloadImage

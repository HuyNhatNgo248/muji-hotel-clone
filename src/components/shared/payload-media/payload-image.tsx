import type { Media } from '@/payload-types'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { MEDIA_BASE_URL } from '.'

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

  return (
    <Image
      src={`${MEDIA_BASE_URL || ''}${url}`}
      alt={alt}
      width={width}
      height={height}
      className={cn('w-full h-full object-fit', className)}
      priority={priority}
    />
  )
}

export default PayloadImage

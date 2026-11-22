import type { Media } from '@/payload-types'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { MEDIA_BASE_URL } from '.'

interface PayloadImageProps extends Media {
  className?: string
  priority?: boolean
  // Rendered width hints; without them the browser fetches the full-resolution file
  sizes?: string
}

const PayloadImage: React.FC<PayloadImageProps> = ({
  className,
  url,
  alt,
  width,
  height,
  priority = false,
  sizes = '100vw',
}) => {
  if (!url || !alt || !width || !height) return null

  return (
    <Image
      src={`${MEDIA_BASE_URL || ''}${url}`}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={cn('w-full h-full', className)}
      preload={priority}
    />
  )
}

export default PayloadImage

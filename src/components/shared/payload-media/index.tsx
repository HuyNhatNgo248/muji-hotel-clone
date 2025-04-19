import { Media } from '@/payload-types'

import PayloadImage from './payload-image'
import PayloadVideo from './payload-video'
export interface PayloadMediaProps extends Media {
  className?: string
  priority?: boolean
}

const PayloadMedia: React.FC<PayloadMediaProps> = (media) => {
  const isImage = media.mimeType?.startsWith('image/')
  const isVideo = media.mimeType?.startsWith('video/')

  if (isImage) return <PayloadImage {...media} />
  if (isVideo) return <PayloadVideo {...media} />

  return null
}

export default PayloadMedia

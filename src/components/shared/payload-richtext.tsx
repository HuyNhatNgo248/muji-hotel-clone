import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface PayloadRichTextProps {
  data: SerializedEditorState
  classNames?: {
    container?: string
    image?: string
  }
}

const isMedia = (value: unknown): value is Media => {
  // Type guard to check if the value conforms to the Media type
  return (
    typeof value === 'object' && value !== null && 'url' in value && 'id' in value && 'alt' in value
  )
}

const PayloadRichText: React.FC<PayloadRichTextProps> = ({ data, classNames }) => {
  const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    upload: ({ node }: { node: SerializedUploadNode }) => {
      if (!node.value || typeof node.value !== 'object' || !isMedia(node.value)) return null

      const media = node.value as Media

      if (!media?.url) return null

      return (
        <Image
          src={media.url}
          alt={media.alt || 'Uploaded image'}
          width={media.width || 800}
          height={media.height || 600}
          className={cn('mx-auto', classNames?.image)}
        />
      )
    },
  })

  return <RichText data={data} converters={converters} className={classNames?.container} />
}

export default PayloadRichText

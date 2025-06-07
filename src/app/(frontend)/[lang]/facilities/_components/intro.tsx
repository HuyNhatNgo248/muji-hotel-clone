import { ServiceIntroBlock } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import PayloadRichText from '@/components/shared/payload-richtext'
import { cn } from '@/lib/utils'

interface IntroProps extends ServiceIntroBlock {
  className?: string
}

const Intro: React.FC<IntroProps> = ({ className, title, description }) => {
  return (
    <div
      className={cn(
        'flex lg:flex-row flex-col gap-6 w-container py-container justify-between',
        className,
      )}
    >
      <h1 className={cn('text-4xl font-bold flex-shrink-0')}>{title}</h1>
      <PayloadRichText
        data={description as SerializedEditorState}
        classNames={{
          container: cn('text-lg lg:w-[60%]'),
        }}
      />
    </div>
  )
}

export default Intro

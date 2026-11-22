import { SeparatorBlock as SeparatorBlockPayload } from '@/payload-types'
import type { MujiLocale } from '@/types'

import { cn } from '@/lib/utils'

interface SeparatorProps extends SeparatorBlockPayload {
  className?: string
  lang: MujiLocale
}

const Separator: React.FC<SeparatorProps> = ({ text, className, lang }) => {
  return (
    <div className={cn('flex justify-center', className)}>
      <div className="xl:w-[60%] lg:w-[70%] w-[80%] border-b border-b-gray-700">
        {text && (
          <h3
            className={cn('text-2xl font-bold py-4 text-center', {
              'tracking-widest': lang === 'ja',
              'tracking-wide': lang === 'en',
            })}
          >
            {' '}
            {text}
          </h3>
        )}
      </div>
    </div>
  )
}

export default Separator

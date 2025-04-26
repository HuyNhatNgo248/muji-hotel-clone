'use client'

import { SeparatorBlock as SeparatorBlockPayload } from '@/payload-types'

import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'

interface SeparatorProps extends SeparatorBlockPayload {
  className?: string
}

const Separator: React.FC<SeparatorProps> = ({ text, className }) => {
  const params = useParams()

  return (
    <div className={cn('flex justify-center', className)}>
      <div className="xl:w-[60%] lg:w-[70%] w-[80%] border-b border-b-gray-700">
        {text && (
          <h3
            className={cn('text-2xl font-bold py-4 text-center', {
              'tracking-widest': params.lang === 'ja',
              'tracking-wide': params.lang === 'en',
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

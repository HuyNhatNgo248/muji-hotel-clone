import { LogoBlock } from '@/payload-types'

import { cn } from '@/lib/utils'

export interface LogoProps extends LogoBlock {
  classNames?: {
    container?: string
    companyName?: string
  }
  orientation?: 'horizontal' | 'vertical'
  variant: 'lg' | 'md' | 'sm'
}

const Logo: React.FC<LogoProps> = ({
  classNames,
  companyName,
  branchName,
  orientation = 'horizontal',
  variant = 'lg',
}) => {
  let Tag: keyof React.JSX.IntrinsicElements

  switch (variant) {
    case 'lg':
      Tag = 'h1'
      break
    case 'md':
      Tag = 'h2'
      break
    case 'sm':
      Tag = 'h3'
      break
    default:
      Tag = 'h1'
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2',
        {
          'flex-col': orientation === 'vertical',
          'flex-row': orientation === 'horizontal',
        },
        classNames?.container,
      )}
    >
      {companyName && (
        <Tag
          className={cn(
            {
              'text-3xl font-bold': variant === 'sm', // Add shadow
              'text-4xl font-bold': variant === 'md', // Add larger shadow
              'text-6xl font-bold': variant === 'lg', // Add extra-large shadow
            },
            classNames?.companyName,
          )}
        >
          {companyName}
        </Tag>
      )}
      {branchName && (
        <Tag
          className={cn(
            {
              'text-2xl font-light tracking-wider': variant === 'sm', // Add small shadow
              'text-3xl font-light tracking-wider': variant === 'md', // Add medium shadow
              'text-4xl font-light tracking-wider': variant === 'lg', // Add large shadow
            },
            {
              'border-t px-10 py-2': variant === 'lg' && orientation === 'vertical',
              'border-t px-8 py-2': variant === 'md' && orientation === 'vertical',
              'border-t px-6 py-2': variant === 'sm' && orientation === 'vertical',
            },
            {
              'border-l px-2': orientation === 'horizontal',
            },
          )}
        >
          {branchName}
        </Tag>
      )}
    </div>
  )
}

export default Logo

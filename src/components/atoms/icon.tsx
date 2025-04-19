import { cn } from '@/lib/utils'
import * as Lu from 'react-icons/lu'

interface IconProps {
  path: string
  className?: string
}

const Icon = ({ path, className }: IconProps) => {
  if (!path) return null
  const [_, iconName] = path.split('/')

  const IconComponent = (Lu as Record<string, React.ComponentType<{ className?: string }>>)[
    iconName
  ]

  return IconComponent ? <IconComponent className={cn('w-4 h-4 stroke-1', className)} /> : null
}

export default Icon

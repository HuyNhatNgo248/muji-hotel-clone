import type { ButtonBlock } from '@/payload-types'

import { Button as ShadcnButton } from '@/components/ui/button'
import Icon from './icon'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps
  extends ButtonBlock,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
  classNames?: {
    button?: string
    icon?: string
    text?: string
    link?: string
  }
}

export default function Button({
  text,
  url,
  variant = 'contained',
  borderRadius = 'default',
  iconField,
  displayAsLink = true,
  openInNewTab = false,
  id,
  classNames,
  ...props
}: ButtonProps) {
  const { blockName: _blockName, blockType: _blockType, ...buttonProps } = props

  const button = (
    <ShadcnButton
      id={id || undefined}
      {...buttonProps}
      className={cn(
        'flex items-center justify-center cursor-pointer',
        {
          'bg-white text-black': variant === 'contained',
          'border-1': variant === 'outlined',
          'p-0 shadow-none': variant === 'text',
        },
        {
          'rounded-none': borderRadius === 'none',
          'rounded-sm': borderRadius === 'default',
          'rounded-full': borderRadius === 'rounded',
        },
        classNames?.button,
      )}
    >
      {iconField && <Icon path={iconField} className={classNames?.icon} />}

      {text && <p className={classNames?.text}>{text}</p>}
    </ShadcnButton>
  )

  if (!displayAsLink) {
    return button
  }

  return (
    <>
      <Link
        href={url}
        passHref
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={classNames?.link}
      >
        {button}
      </Link>
    </>
  )
}

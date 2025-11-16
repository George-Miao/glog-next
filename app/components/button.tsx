import type { ReactNode } from 'react'
import { Link } from 'react-router'

export interface ButtonProp {
  href?: string
  onClick?: () => void | Promise<void>
  style?: Styles
  prefix?: string
  postfix?: string
  children: ReactNode
  className?: string
}

type Styles = 'main' | 'underline'

const voidFn = () => {
  return
}

const styleClass: Record<Styles, string> = {
  main: `text-neutral-100 text-sm text-center
    filter w-40 py-2.5 bg-red-800
    hover:(shadow-sm brightness-110) `,
  underline: `
    relative pb-2
    btn-plain text-neutral-700
    after:(
      absolute bottom-0
      w-0 h-0.5 block
      bg-red-800 transition-all
      hover:w-full
    )
  `
}

export default function Button({
  href,
  onClick,
  children,
  className,
  style,
  prefix,
  postfix
}: ButtonProp) {
  style = style ?? 'main'
  return (
    <Link
      to={href ?? ''}
      className={`
        ${className ?? ''}
        transition-all block flex items-center
        justify-between content-between
        ${styleClass[style]}
      `}
      onClick={onClick ?? voidFn}
    >
      {prefix && (
        <span className='text-sm mr-2 text-neutral-400'>{prefix}</span>
      )}
      <span className='flex-1'>{children}</span>
      {postfix && (
        <span className='text-sm ml-2 text-neutral-400'>{postfix}</span>
      )}
    </Link>
  )
}

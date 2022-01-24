import { defineVFCWithChild } from '@core/helper'
import Link from 'next/link'

export interface ButtonProp {
  href?: string
  onClick?: () => void | Promise<void>
  style?: Styles
  prefix?: string
  postfix?: string
}

type Styles = 'main' | 'underline'

const voidFn = () => {
  return
}

const styleClass: Record<Styles, string> = {
  main: `text-warm-gray-100 text-sm text-center
    filter w-40 py-2.5 bg-red-800
    hover:(shadow-sm brightness-110) `,
  underline: `
    relative pb-2
    btn-plain text-warm-gray-700
    after:(
      absolute bottom-0
      w-0 h-0.5 block
      bg-red-800 transition-all
      hover:w-full
    )
  `
}

const Button = defineVFCWithChild<ButtonProp>(
  ({ href, onClick, children, className, style, prefix, postfix }) => {
    style = style ?? 'main'
    return (
      <Link href={href ?? ''}>
        <a
          className={`
            ${className ?? ''}
            transition-all block flex items-center
            justify-between content-between
            ${styleClass[style]}
          `}
          onClick={onClick ?? voidFn}>
          {prefix && (
            <span className="text-sm text-warm-gray-400 mr-2">{prefix}</span>
          )}
          <span className="flex-1">{children}</span>
          {postfix && (
            <span className="text-sm text-warm-gray-400 ml-2">{postfix}</span>
          )}
        </a>
      </Link>
    )
  }
)

export default Button

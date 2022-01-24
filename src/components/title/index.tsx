import { defineVFC } from '@core/helper'
import Link from 'next/link'
import type { TitleProp } from './type'

const Title = defineVFC<TitleProp>(
  ({ title, link, uppercase, className, safeArea, subtitle }) => {
    const isPlainStr = typeof title === 'string'

    const bigOChar = isPlainStr ? title[0] : title.char
    const node = isPlainStr ? title : title.node

    return (
      <div
        className={`${className ?? ''} relative ${
          safeArea ? 'md:(ml-12 mb-12)' : ''
        }`}>
        {link ? (
          <Link href={link}>
            <a
              className={`main-title hover:text-red-800 transition-colors ${
                uppercase ? 'uppercase' : ''
              }`}>
              {node}
            </a>
          </Link>
        ) : (
          <a className={`main-title ${uppercase ? 'uppercase' : ''}`}>{node}</a>
        )}
        {subtitle && (
          <p className="relative z-10 text-warm-gray-500 ml-1 md:ml-5 mt-3">
            {subtitle}
          </p>
        )}
        <div
          className="
          absolute -left-16 -top-20 block
          font-bold text-[190px] leading-[190px] text-warm-gray-200
          select-none <md:hidden">
          {bigOChar}
        </div>
      </div>
    )
  }
)

export default Title

import { defineVFC } from '@core/helper'
import Link from 'next/link'
import type { TitleProp } from './type'

const Title = defineVFC<TitleProp>(
  ({ title, link, uppercase, className, safeArea, subtitle }) => {
    const isPlainStr = typeof title === 'string'

    const bigOChar = isPlainStr ? title[0] : title.char
    const node = isPlainStr ? title : title.node

    const linkComp = link
      ? (
        <Link href={link}>
          <a
            className={`text-3xl sm:text-5xl z-10 relative font-bold hover:text-red-800 transition-colors ${
              uppercase ? 'uppercase' : ''
            }`}
          >
            {node}
          </a>
        </Link>
      )
      : (
        <p
          className={`text-3xl sm:text-5xl z-10 relative font-bold text-warm-gray-700 ${uppercase ? 'uppercase' : ''}`}
        >
          {node}
        </p>
      )

    const subtitleComp = subtitle && (
      <p className='relative z-12 text-warm-gray-500 ml-1 md:ml-5 mt-3'>
        {subtitle}
      </p>
    )

    return (
      <div
        className={`${className ?? ''} relative ${safeArea ? 'md:(ml-12 mb-12)' : ''}`}
      >
        {linkComp}
        {subtitleComp}
        <div className='
          absolute -left-16 -top-20 block z-5
          font-bold text-[190px] leading-[190px] text-warm-gray-200
          select-none <md:hidden'>
          {bigOChar}
        </div>
      </div>
    )
  }
)

export default Title

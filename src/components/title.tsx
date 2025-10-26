import { defineFC } from '@core/helper'
import Link from 'next/link'
import type { TitleProp } from '@type/title'

const Title = defineFC<TitleProp>(
  ({ title, link, uppercase, className, safeArea = true, subtitle }) => {
    const isPlainStr = typeof title === 'string'

    const bigOChar = isPlainStr ? title[0] : title.char
    const node = isPlainStr ? title : title.node

    const linkComp = link ? (
      <Link
        href={link}
        className={`text-3xl sm:text-5xl z-10 relative font-bold hover:text-red-800 transition-colors ${
          uppercase ? 'uppercase' : ''
        }`}
      >
        {node}
      </Link>
    ) : (
      <p
        className={`text-3xl sm:text-5xl z-10 relative font-bold text-warm-gray-700 ${
          uppercase ? 'uppercase' : ''
        }`}
      >
        {node}
      </p>
    )

    const subtitleComp = subtitle && (
      <p className='mt-1 ml-1 text-warm-gray-500 z-12 relative md:ml-5'>
        {subtitle}
      </p>
    )

    return (
      <div
        className={`${className ?? ''} relative ${
          safeArea ? 'md:(ml-12 mb-12)' : ''
        }`}
      >
        {linkComp}
        {subtitleComp}
        <div
          className='
          font-bold -top-15 -left-16 text-[190px] text-warm-gray-200
          leading-[190px] z-5 absolute block
          select-none <md:hidden'
        >
          {bigOChar}
        </div>
      </div>
    )
  }
)

export default Title

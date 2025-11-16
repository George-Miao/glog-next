import type { TitleProp } from '@type/title'
import cx from 'classix'
import { Link } from 'react-router'

export default function Title({
  title,
  link,
  uppercase,
  className,
  safeArea = true,
  subtitle
}: TitleProp) {
  const isPlainStr = typeof title === 'string'

  const bigOChar = isPlainStr ? title[0] : title.char
  const node = isPlainStr ? title : title.node

  const titleComp = link ? (
    <Link
      to={link}
      className={cx(
        'text-3xl sm:text-5xl z-10 relative font-bold hover:text-red-800 transition-colors',
        uppercase && 'uppercase'
      )}
    >
      {node}
    </Link>
  ) : (
    <p
      className={cx(
        'text-3xl sm:text-5xl z-10 relative font-bold text-neutral-700',
        uppercase && 'uppercase'
      )}
    >
      {node}
    </p>
  )

  const subtitleComp = subtitle && (
    <p className='mt-1 ml-1 text-neutral-500 z-12 relative md:ml-5'>
      {subtitle}
    </p>
  )

  return (
    <div className={cx(className, 'relative', safeArea && 'md:(ml-12 mb-12)')}>
      {titleComp}
      {subtitleComp}
      <div
        className='
          font-bold -top-15 -left-16 text-[190px] text-neutral-200
          leading-[190px] z-5 absolute block
          select-none lt-md:hidden'
      >
        {bigOChar}
      </div>
    </div>
  )
}

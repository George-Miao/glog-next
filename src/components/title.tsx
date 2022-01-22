import { defineVFC } from '@core/utils'
import Link from 'next/link'

export interface TitleProp {
  title: string
  link?: string
  uppercase?: boolean
  className?: string
  safeArea?: boolean
}

const safeAreaClass = 'md:ml-6'

export default defineVFC<TitleProp>(
  ({ title, link, uppercase, className, safeArea }) => {
    const bigOChar = title[0]

    return (
      <div
        className={`${className} relative grid gap-2 ${
          safeArea ? safeAreaClass : ''
        }`}>
        {link ? (
          <Link href={link}>
            <a
              className={`main-title hover:text-red-800 transition-colors ${
                uppercase && 'uppercase'
              }`}>
              {title}
            </a>
          </Link>
        ) : (
          <a className={` main-title ${uppercase && 'uppercase'}`}>{title}</a>
        )}
        <span className="big-o-char">{bigOChar}</span>
      </div>
    )
  }
)

import { useRouter } from 'next/router'

import { defineVFC } from '@core/helper'
import Link from 'next/link'

export interface BreadCrumb {
  link: string
  text: string
}

export interface BreadCrumbProp {
  crumbs?: BreadCrumb[]
  className?: string
  separator?: string
}

const useCrumbs = () => {
  const path = useRouter().asPath.split('?')[0]
  const crumbs: BreadCrumb[] = path
    .slice(1)
    .replace(/#.*/, '')
    .split('/')
    .map((x, i, all) => {
      return {
        link: '/' + all.slice(0, i + 1).join('/'),
        text: x
      }
    })
  return crumbs
}

const BreadCrumb = defineVFC<BreadCrumbProp>(
  ({ crumbs: customCrumbs, className, separator }) => {
    const crumbs = customCrumbs ?? useCrumbs()
    const len = crumbs.length

    return (
      <p className={`${className ?? ''} py-2 relative z-10 select-none`}>
        {crumbs.map((x, i) => {
          const isLast = len === i + 1
          const text = isLast ? (
            x.text
          ) : (
            <Link href={x.link} className='transition-all hover:text-red-800'>
              {x.text}
            </Link>
          )
          return (
            <span
              key={i}
              className={`text-sm uppercase  ${
                isLast ? 'text-warm-gray-700' : 'text-warm-gray-500'
              } `}
            >
              <span className='px-2 text-warm-gray-400 select-none'>
                {separator ?? '/'}
              </span>
              {text}
            </span>
          )
        })}
      </p>
    )
  }
)

export default BreadCrumb

import { Link, useLocation } from 'react-router'

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
  const path = useLocation().pathname.split('?')[0]
  const crumbs: BreadCrumb[] = path
    .slice(1)
    .replace(/#.*/, '')
    .split('/')
    .map((x, i, all) => {
      return {
        link: `/${all.slice(0, i + 1).join('/')}`,
        text: x
      }
    })
  return crumbs
}

export default function BreadCrumb({
  crumbs: customCrumbs,
  className,
  separator
}: BreadCrumbProp) {
  const defaultCrumbs = useCrumbs()
  const crumbs = customCrumbs ?? defaultCrumbs
  const len = crumbs.length

  return (
    <p className={`${className ?? ''} py-2 relative z-10 select-none`}>
      {crumbs.map((x, i) => {
        const isLast = len === i + 1
        const text = isLast ? (
          x.text
        ) : (
          <Link to={x.link} className='transition-all hover:text-red-800'>
            {x.text}
          </Link>
        )
        return (
          <span
            key={x.text}
            className={`text-sm uppercase  ${
              isLast ? 'text-neutral-700' : 'text-neutral-500'
            } `}
          >
            <span className='px-2 text-neutral-400 select-none'>
              {separator ?? '/'}
            </span>
            {text}
          </span>
        )
      })}
    </p>
  )
}

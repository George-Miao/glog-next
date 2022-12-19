import { defineVFC } from '@core/helper'

export interface DotListItemProp {
  title: string
  subtitle?: string
  value: string
  link?: string
  className?: string
}

export const defineDotListItems = (items: DotListItemProp[]) => items

export const DotListItem = defineVFC<DotListItemProp>(
  ({ title, value, link, subtitle, className }) => {
    const subtitleClass =
      'flex-none mr-4 font-light text-warm-gray-400 inline-block leading-5'

    return (
      <a className={`block mb-2 ${className}`} href={link ?? undefined}>
        <p className='block flex items-center group w-full overflow-hidden'>
          <span
            className={`flex-none
            font-medium text-gray-1000
            flex-shrink
            overflow-hidden overflow-ellipsis
            whitespace-nowrap
            ${link ? 'group-hover:text-red-800 ' : ''}
            `}
          >
            {title}
          </span>

          <span
            className='flex-shrink-[10000000] mx-2 sm:mx-4 w-full border-t
          border-gray-300 border-dashed
          dark:border-gray-800'
          />

          {subtitle && (
            <span className={`${subtitleClass} <sm:hidden`}>{subtitle}</span>
          )}

          <span
            className='whitespace-nowrap
            text-warm-gray-600
            font-mono font-thin text-sm
            flex-none contents inline-block leading-5
            overflow-hidden break-all'
          >
            {value}
          </span>
        </p>
        <p className='sm:hidden text-sm'>
          {subtitle && <span className={subtitleClass}>{subtitle}</span>}
        </p>
      </a>
    )
  }
)

export interface DotListProp {
  items: DotListItemProp[]
  title?: string
  className?: string
  id?: string
}

export const DotList = defineVFC<DotListProp>(
  ({ items, title, className, id }) => {
    return (
      <div
        className={`${className ?? ''}
          grid items-start grid-cols-1`}
      >
        {title && (
          <h3
            className={`col-span-3
            text-xl mt-4 mb-2 text-red-800
            ${id ? 'hover:text-red-800' : ''}`}
            id={id ?? ''}
          >
            {title}
          </h3>
        )}

        <div className='col-span-9 '>
          {items.map((item, i) => (
            <DotListItem {...item} key={i}></DotListItem>
          ))}
        </div>
      </div>
    )
  }
)

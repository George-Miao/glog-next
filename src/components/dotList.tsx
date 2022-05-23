import { defineVFC } from '@core/helper'

export interface DotListItemProp {
  title: string
  subtitle?: string
  value: string
  link?: string
  className?: string
}

export const DotListItem = defineVFC<DotListItemProp>(
  ({ title, value, link, subtitle, className }) => {
    return (
      <a
        className={`${className ?? ''} block flex
        items-center group mb-2 w-full overflow-hidden
        `}
        href={link ?? undefined}
      >
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

        <span className='flex-shrink-[10000000] mx-2 sm:mx-4 w-full border-t
          border-gray-300 border-dashed
          dark:border-gray-800' />

        {subtitle && (
          <span className='flex-none <sm:(mr-2 text-sm) sm:mr-4 font-light text-warm-gray-400 inline-block leading-5'>
            {subtitle}
          </span>
        )}

        <span className='whitespace-nowrap
            text-warm-gray-600
            font-mono font-thin text-sm
            flex-none contents inline-block leading-5
            overflow-hidden break-all'>
          {value}
        </span>
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
          <h4
            className={`col-span-3
            text-lg mt-4 mb-2 text-red-800
            ${id ? 'hover:text-red-800' : ''}`}
            id={id ?? ''}
          >
            {title}
          </h4>
        )}

        <div className='col-span-9 '>
          {items.map((item, i) => <DotListItem {...item} key={i}></DotListItem>)}
        </div>
      </div>
    )
  }
)

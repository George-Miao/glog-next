import { defineVFC } from '@core/utils'

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
        items-center group mb-2
        overflow-hidden`}
        href={link ?? ''}>
        <span
          className="mr-4 flex-none
            font-medium text-gray-1000
          group-hover:text-red-800
            overflow-hidden overflow-ellipsis break-words">
          {title}
        </span>

        <span
          className="flex-shrink w-full border-t
          border-gray-300 border-dashed
          dark:border-gray-800"></span>

        {subtitle && (
          <span
            className="ml-4 flex-none
              text-sm text-warm-gray-400">
            {subtitle}
          </span>
        )}

        <span
          className="ml-4 whitespace-nowrap
            text-sm text-warm-gray-600
            font-mono font-thin text-xs
            flex-none
            overflow-hidden break-all">
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
          grid items-start grid-cols-1`}>
        {title && (
          <h4
            className={`col-span-3
            text-lg mt-4 mb-2 text-red-800
            ${id ? 'hover:text-red-800' : ''}`}
            id={id ?? ''}>
            {title}
          </h4>
        )}

        <div className="col-span-9 ">
          {items.map((item, i) => (
            <DotListItem {...item} key={i}></DotListItem>
          ))}
        </div>
      </div>
    )
  }
)

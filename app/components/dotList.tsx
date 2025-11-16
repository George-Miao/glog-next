import type { ReactNode } from 'react'

export interface DotListItemProp {
  title: ReactNode
  subtitle?: ReactNode
  value: string
  link?: string
  className?: string
}

export const defineDotListItems = (items: DotListItemProp[]) => items

export function DotListItem({
  title,
  value,
  link,
  subtitle,
  className
}: DotListItemProp) {
  const subtitleClass =
    'flex-none mr-4 font-light text-neutral-400 inline-block leading-5'

  return (
    <a className={`block mb-2 ${className}`} href={link ?? undefined}>
      <p className='flex w-full block items-center group overflow-hidden'>
        <span
          className={`flex-none
            font-medium text-gray-1000
            flex-shrink
            overflow-hidden overflow-ellipsis
            whitespace-nowrap
            ${link ? 'group-hover:text-red-800 transition ' : ''}
            `}
        >
          {title}
        </span>

        <span
          className='border-t border-dashed border-gray-300 flex-shrink-[10000000] mx-2
          w-full sm:mx-4
          dark:border-gray-800'
        />

        {subtitle && (
          <span className={`${subtitleClass} lt-sm:hidden`}>{subtitle}</span>
        )}

        <span
          className='flex-none
            font-mono
            font-thin text-sm text-neutral-600
            leading-5 whitespace-nowrap contents inline-block
            overflow-hidden break-none'
        >
          {value}
        </span>
      </p>
      <p className='text-sm sm:hidden'>
        {subtitle && <span className={subtitleClass}>{subtitle}</span>}
      </p>
    </a>
  )
}

export interface DotListProp {
  items: DotListItemProp[]
  title?: ReactNode
  subtitle?: ReactNode
  className?: string
  id: string
}

export function DotList({
  items,
  title,
  subtitle,
  className,
  id
}: DotListProp) {
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
          {subtitle && (
            <span className='text-xs text-gray-500 ml-4'>{subtitle}</span>
          )}
        </h3>
      )}

      <div className='col-span-9 '>
        {items.map(item => (
          <DotListItem {...item} key={item.value} />
        ))}
      </div>
    </div>
  )
}

import { defineFC } from '@core/helper'
import Link from 'next/link'

export interface TagListProp {
  list: { text: string; link: string }[]
  prefix?: string
  postfix?: string
  formatter?: (tag: string) => string
  className?: string
  delimiter?: string
}

const TagList = defineFC<TagListProp>(
  ({ list, formatter, prefix, postfix, className, delimiter }) => {
    return (
      <span>
        {list.map((tag, i) => {
          const text =
            (prefix ?? '') +
            (formatter?.(tag.text) ?? tag.text) +
            (postfix ?? '')

          const isLast = i + 1 === list.length

          return (
            <span key={i}>
              <Link
                href={tag.link}
                className={`${className ?? ''} mr-1.5 text-red-800 filter transition-all
                  hover:brightness-130 relative
                  after:(
                    absolute bottom-0
                    w-0 h-0.5 block
                    bg-red-800 transition-all
                    hover:w-full
                  )`}
              >
                {text}
              </Link>
              {(delimiter && !isLast && (
                <span className='mr-1.5 '>{delimiter}</span>
              )) ??
                ''}
            </span>
          )
        })}
      </span>
    )
  }
)

export default TagList

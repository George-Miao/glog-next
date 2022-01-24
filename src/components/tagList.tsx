import { defineVFC } from '@core/helper'
import Link from 'next/link'

export interface TagListProp {
  list: { text: string; link: string }[]
  prefix?: string
  postfix?: string
  formatter?: (tag: string) => string
  className?: string
  delimiter?: string
}

const TagList = defineVFC<TagListProp>(
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
              <Link href={tag.link}>
                <a
                  className={`${className} mr-1.5 text-red-800 filter hover:brightness-110 `}>
                  {text}
                </a>
              </Link>
              {(delimiter && !isLast && (
                <span className="mr-1.5 ">{delimiter}</span>
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

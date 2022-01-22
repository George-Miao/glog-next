import { defineVFC } from '@core/utils'
import Link from 'next/link'

export interface ListProp {
  list: { text: string; link: string }[]
  prefix?: string
  postfix?: string
  formatter?: (tag: string) => string
  className?: string
}

export default defineVFC<ListProp>(
  ({ list, formatter, prefix, postfix, className }) => {
    return (
      <span>
        {list.map((tag, i) => {
          const text =
            (prefix ?? '') +
            (formatter?.(tag.text) ?? tag.text) +
            (postfix ?? '')

          return (
            <Link href={tag.link} key={i}>
              <a
                className={`${className} mr-1.5 text-red-800 filter hover:brightness-110 `}>
                {text}
              </a>
            </Link>
          )
        })}
      </span>
    )
  }
)

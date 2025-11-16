import { Link } from 'react-router'

export interface TagListProp {
  list: { text: string; link: string }[]
  prefix?: string
  postfix?: string
  formatter?: (tag: string) => string
  className?: string
  delimiter?: string
}

export default function TagList({
  list,
  formatter,
  prefix,
  postfix,
  className,
  delimiter
}: TagListProp) {
  return (
    <span>
      {list.map((tag, i) => {
        const text =
          (prefix ?? '') + (formatter?.(tag.text) ?? tag.text) + (postfix ?? '')

        const isLast = i + 1 === list.length

        return (
          <span key={tag.text}>
            <Link
              to={tag.link}
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

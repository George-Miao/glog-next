import HTMLContent from '@comps/HTMLContent'
import type { Changelog } from '@type/changelog'
import { defineFC } from '@core/helper'

const toId = (str: string) =>
  encodeURIComponent(str.replaceAll(/\s+/gi, '_').toLowerCase())

const ChangeLogItem = defineFC<Changelog & { bottomLine?: false }>(
  ({ content, date, title, className, bottomLine }) => {
    const showLine = bottomLine === undefined ? true : bottomLine

    const formattedDate = new Date(date).toLocaleDateString(undefined, {
      day: 'numeric',
      year: 'numeric',
      month: 'short'
    })

    const id = toId(title)

    return (
      <article
        className={`${className ?? ''}
          py-6 ${showLine ? 'border-b-1' : ''}
          flex flex-col relative
          md:(grid grid-cols-12 py-12)
        `}
        id={id}
      >
        <aside
          className='
            md:(mr-4 mb-4 col-span-3) <md:(mb-6) '
        >
          <div className='md:(sticky top-12) '>
            <a
              className='text-xl mb-2 block hover:text-red-800'
              href={`#${id}`}
            >
              {title}
            </a>
            <span
              className='text-sm
              text-warm-gray-500 block '
            >
              {formattedDate}
            </span>
          </div>
        </aside>
        <HTMLContent html={content} className='md:(col-span-9)' />
      </article>
    )
  }
)

export default ChangeLogItem

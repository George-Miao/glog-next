import HTMLContent from '@comps/HTMLContent'
import type { Changelog } from '@type/changelog'
import cx from 'classix'

const toId = (str: string) =>
  encodeURIComponent(str.replaceAll(/\s+/gi, '_').toLowerCase())

interface ChangeLogItemProp extends Changelog {
  bottomLine?: false
  className?: string
}

export default function ChangeLogItem({
  content,
  date,
  title,
  className,
  bottomLine
}: ChangeLogItemProp) {
  const showLine = bottomLine === undefined ? true : bottomLine

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    day: 'numeric',
    year: 'numeric',
    month: 'short'
  })

  const id = toId(title)

  return (
    <article
      className={cx(
        className,
        'py-6 flex flex-col relative',
        'md:(grid grid-cols-12 py-12)',
        showLine && 'border-b-1 border-neutral-2'
      )}
      id={id}
    >
      <aside className={cx('md:(mr-4 mb-4 col-span-3)', 'lt-md:(mb-6)')}>
        <div className='md:(sticky top-12)'>
          <a className='text-xl mb-2 block hover:text-red-800' href={`#${id}`}>
            {title}
          </a>
          <span className={cx('text-sm text-neutral-5 block')}>
            {formattedDate}
          </span>
        </div>
      </aside>
      <HTMLContent html={content} className='md:(col-span-9)' />
    </article>
  )
}

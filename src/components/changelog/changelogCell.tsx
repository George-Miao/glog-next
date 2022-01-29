import { defineVFC } from '@core/helper'
import HTMLContent from '@comps/HTMLContent'

import type { Changelog } from '@core/changelog/type'
import Image from 'next/image'

const ChangeLogCell = defineVFC<Changelog & { bottomLine?: false }>(
  ({ content, date, title, className, image, bottomLine }) => {
    const showLine = bottomLine === undefined ? true : bottomLine

    const formattedDate = new Date(date).toLocaleDateString(undefined, {
      day: 'numeric',
      year: 'numeric',
      month: 'short'
    })

    return (
      <article
        className={`${className ?? ''}
          py-6 ${showLine ? 'border-b-1' : ''}
          flex flex-col relative
          md:(grid grid-cols-12 py-12)
        `}>
        <aside
          className="
            <md:(mb-6)
            md:(mr-4 mb-4 col-span-3)">
          <div className="md:(sticky top-12)">
            <span className="text-xl mb-2 block">{title}</span>
            <span
              className="block
              text-sm text-warm-gray-500 block">
              {formattedDate}
            </span>
          </div>
        </aside>
        <div className="md:(col-span-9)">
          {image && <Image src={image} alt="" />}
          <HTMLContent html={content} />
        </div>
      </article>
    )
  }
)

export default ChangeLogCell

import { defineFC } from '@core/helper'
import type { MetaValidated } from '@type/post'
import type { TagListProp } from '../tagList'
import TagList from '../tagList'

const timeFormatConfig: Intl.DateTimeFormatOptions = {
  year: '2-digit',
  day: '2-digit',
  month: 'short'
}

const PostMeta = defineFC<{ meta: MetaValidated; className?: string }>(
  ({ meta, className }) => {
    const { categories, created, tags, wordCount } = meta

    const createFormatted = new Date(created).toLocaleString(
      undefined,
      timeFormatConfig
    )

    const catList: TagListProp = {
      list: categories.map(x => {
        return {
          link: `/writing/categories#${x}`,
          text: x
        }
      }),
      delimiter: '&'
    }

    const tagList: TagListProp = {
      list: tags.map(x => {
        return {
          link: `/writing/tags#${x}`,
          text: x
        }
      }),
      prefix: '#'
    }

    return (
      <div className={`${className ?? ''} font-sm`}>
        <p className='text-sm mb-2 text-warm-gray-500 z-10 relative'>
          {createFormatted} / {wordCount} words / in <TagList {...catList} />
        </p>

        <p className='text-xs mb-4 text-warm-gray-500 z-10 relative'>
          <TagList {...tagList} />
        </p>
      </div>
    )
  }
)

export default PostMeta

import { defineVFC } from '@core/utils'
import type { MetaValidated } from '@core/post/render'
import type { TagListProp } from '../tagList'
import TagList from '../tagList'

const timeFormatConfig: Intl.DateTimeFormatOptions = {
  year: '2-digit',
  day: '2-digit',
  month: 'short'
}

const PostMeta = defineVFC<{ meta: MetaValidated; className?: string }>(
  ({ meta, className }) => {
    const { categories, created, updated, tags, wordCount } = meta

    const createFormatted = new Date(created).toLocaleString(
      undefined,
      timeFormatConfig
    )
    const updatedFormatted =
      updated && new Date(updated).toLocaleString(undefined, timeFormatConfig)

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
        <p className="text-warm-gray-500 text-sm relative z-10 mb-2">
          {updatedFormatted && `Updated at ${updatedFormatted} / `}
          {updatedFormatted
            ? `Created at ${createFormatted}`
            : createFormatted}{' '}
          / {wordCount} words / in <TagList {...catList} />
        </p>

        <p className="text-warm-gray-500 text-xs relative z-10 mb-4">
          <TagList {...tagList}></TagList>
        </p>
      </div>
    )
  }
)

export default PostMeta

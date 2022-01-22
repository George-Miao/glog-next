import { defineVFC } from '@core/utils'
import type { MetaValidated } from '@core/generate'
import type { ListProp } from './tagList'
import TagList from './tagList'

const timeFormatConfig: Intl.DateTimeFormatOptions = {
  year: '2-digit',
  day: '2-digit',
  month: 'short'
}

export default defineVFC<{ meta: MetaValidated; className: string }>(
  ({ meta, className }) => {
    const { categories, created, updated, tags, wordCount } = meta

    const createFormatted = new Date(created).toLocaleString(
      undefined,
      timeFormatConfig
    )
    const updatedFormatted =
      updated && new Date(updated).toLocaleString(undefined, timeFormatConfig)

    const catList: ListProp = {
      list: categories.map(x => {
        return {
          link: `/posts/categories/${x}`,
          text: x
        }
      })
    }

    const tagList: ListProp = {
      list: tags.map(x => {
        return {
          link: `/posts/tags/${x}`,
          text: x
        }
      }),
      prefix: '#'
    }

    return (
      <div className={`${className}`}>
        <p className="text-warm-gray-500 text-sm relative z-10 mb-2">
          {updatedFormatted && `Updated at ${updatedFormatted}`}
          {createFormatted} / {wordCount} words / in <TagList {...catList} />
        </p>

        <p className="text-warm-gray-500 text-xs relative z-10 mb-4">
          <TagList {...tagList}></TagList>
        </p>
      </div>
    )
  }
)

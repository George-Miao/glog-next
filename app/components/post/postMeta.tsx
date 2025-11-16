import type { MetaValidated } from '@type/post'
import type { TagListProp } from '../tagList'
import TagList from '../tagList'

const timeFormatConfig: Intl.DateTimeFormatOptions = {
  year: '2-digit',
  day: '2-digit',
  month: 'short'
}

interface PostMetaProp {
  meta: MetaValidated
  className?: string
}

export default function PostMeta({ meta, className }: PostMetaProp) {
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
      <p className='text-sm mb-2 text-neutral-500 z-10 relative'>
        {createFormatted} / {wordCount} words / in <TagList {...catList} />
      </p>

      <p className='text-xs mb-4 text-neutral-500 z-10 relative'>
        <TagList {...tagList} />
      </p>
    </div>
  )
}

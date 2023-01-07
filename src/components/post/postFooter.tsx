import Button from '@comps/button'
import { defineFC } from '@core/helper'

interface PostLink {
  slug: string
  title: string
}

export interface PostFooterProp {
  prev: PostLink | null
  next: PostLink | null
}

const PostFooter = defineFC<PostFooterProp>(({ prev, next }) => {
  return (
    <div className='mt-12 flex justify-between space-x-4'>
      {prev ? (
        <Button
          style='underline'
          className='float-left text-warm-gray-600 max-w-48 max-w-[50%]'
          href={`/writing/posts/${prev.slug}`}
          prefix='←'
        >
          {prev.title}
        </Button>
      ) : (
        <div />
      )}
      {next ? (
        <Button
          style='underline'
          className='float-right text-warm-gray-600 max-w-[50%]'
          href={`/writing/posts/${next.slug}`}
          postfix='→'
        >
          {next.title}
        </Button>
      ) : (
        <div />
      )}
    </div>
  )
})

export default PostFooter

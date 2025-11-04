import SafeArea from '@comps/layout/safeArea'
import { defineFC } from '@core/helper'
import type { SummaryProp } from './postSummary'
import PostSummary from './postSummary'

export interface PostListProp {
  list: SummaryProp[]
}

const PostList = defineFC<PostListProp>(({ list }) => {
  return (
    <>
      <SafeArea className='grid'>
        {list.map(post => (
          <PostSummary key={post.slug} {...post} />
        ))}
      </SafeArea>
    </>
  )
})

export default PostList

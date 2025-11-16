import SafeArea from '@comps/layout/safeArea'
import type { SummaryProp } from './postSummary'
import PostSummary from './postSummary'

export interface PostListProp {
  list: SummaryProp[]
}

export default function PostList({ list }: PostListProp) {
  return (
    <SafeArea className='grid'>
      {list.map(post => (
        <PostSummary key={post.slug} {...post} />
      ))}
    </SafeArea>
  )
}

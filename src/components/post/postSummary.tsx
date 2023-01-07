import Button from '@comps/button'
import PostMeta from '@comps/post/postMeta'
import { defineFC } from '@core/helper'
import type { MetaValidated } from '@type/post'
import Title from '../title'

export interface SummaryProp {
  meta: MetaValidated
  slug: string
  excerpt: string | null
}

const PostSummary = defineFC<SummaryProp>(({ meta, slug, excerpt }) => {
  const href = `/writing/posts/${slug}`
  return (
    <summary
      className='grid gap-3
        relative delim
        md:(pl-12 pt-32 pb-24) <md:(py-12) '
    >
      <Title title={meta.title} link={href} />

      <PostMeta meta={meta}></PostMeta>

      <p className='mb-10 text-warm-gray-600 z-10 relative <sm:text-sm'>
        {excerpt}
      </p>

      <Button href={href}>Read On</Button>
    </summary>
  )
})

export default PostSummary

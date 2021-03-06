import Button from '@comps/button'
import PostMeta from '@comps/post/postMeta'
import { defineVFC } from '@core/helper'
import type { MetaValidated } from '@core/post/type'
import Title from '../title'

export interface SummaryProp {
  meta: MetaValidated
  slug: string
  excerpt: string | null
}

const PostSummary = defineVFC<SummaryProp>(({ meta, slug, excerpt }) => {
  const href = `/writing/posts/${slug}`
  return (
    <summary className='relative delim
        grid gap-3
        <md:(py-12)
        md:(pl-12 pt-32 pb-24)
      '>
      <Title title={meta.title} link={href}></Title>

      <PostMeta meta={meta}></PostMeta>

      <p className='<sm:text-sm text-warm-gray-600 relative z-10 mb-10'>
        {excerpt}
      </p>

      <Button href={href}>Read On</Button>
    </summary>
  )
})

export default PostSummary

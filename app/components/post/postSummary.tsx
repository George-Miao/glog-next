import Button from '@comps/button'
import PostMeta from '@comps/post/postMeta'
import content from '@styles/content.module.css'
import type { MetaValidated } from '@type/post'
import cx from 'classix'
import Title from '../title'

export interface SummaryProp {
  meta: MetaValidated
  slug: string
  excerpt: string | null
}

export default function PostSummary({ meta, slug, excerpt }: SummaryProp) {
  const href = `/writing/${slug}`
  return (
    <summary
      className='grid gap-3
        relative delim
        md:(pl-12 pt-32 pb-24) lt-md:(py-12) '
    >
      <Title title={meta.title} link={href} />

      <PostMeta meta={meta} />

      <p
        className={cx(
          content.content,
          'mb-10 text-neutral-600 z-10 relative lt-sm:text-sm'
        )}
      >
        {excerpt}
      </p>

      <Button href={href}>Read On</Button>
    </summary>
  )
}

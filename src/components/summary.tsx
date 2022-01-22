import type { MetaValidated } from '@core/generate'
import { defineVFC } from '@core/utils'
import Title from '@comps/title'
import PostMeta from '@comps/postMeta'

export interface SummaryProp {
  meta: MetaValidated
  slug: string
  excerpt: string | null
  titleSafeArea?: boolean
}

export default defineVFC<SummaryProp>(
  ({ meta, slug, excerpt, titleSafeArea }) => {
    return (
      <div
        className="relative delim md:pl-12
        grid gap-3 <md:gap-2 md:before:top-[-4rem] before:top-[-1.2rem]">
        <Title
          title={meta.title}
          link={`/posts/${slug}`}
          safeArea={titleSafeArea}></Title>

        <PostMeta meta={meta}></PostMeta>

        <p className="text-warm-gray-600 relative z-10 mb-10">{excerpt}</p>

        <button className="w-40 py-2.5 btn">Read On</button>
      </div>
    )
  }
)

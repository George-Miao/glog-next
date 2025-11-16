import postRendered from 'virtual:post:all'
import postList from 'virtual:post:path'
import BreadCrumb from '@comps/breadcrumb'
import HTMLContent from '@comps/HTMLContent'
import SafeArea from '@comps/layout/safeArea'
import type { PostFooterProp } from '@comps/post/postFooter'
import PostFooter from '@comps/post/postFooter'
import PostMeta from '@comps/post/postMeta'
import SEO from '@comps/seo'
import Title from '@comps/title'
import type { MetaValidated, Rendered } from '@type/post'
import type { Route } from './+types/content'

interface PostProp {
  meta: MetaValidated
  html: string
  footer: PostFooterProp
}

export async function loader({ params }: Route.LoaderArgs) {
  const current = postList.findIndex(post => post.slug === params.slug)

  if (current === -1) throw new Response('Not Found', { status: 404 })

  const found = postList[current]
  const md = await import(`../../../content/posts/${found.slug}.md`).then(
    mod => mod.default as Rendered
  )
  const currentRendered = postRendered.findIndex(
    post => post.slug === params.slug
  )

  return {
    html: md.html,
    meta: md.meta,
    footer: {
      next:
        postRendered.length > currentRendered + 1
          ? postRendered[currentRendered + 1]
          : null,
      prev: currentRendered !== 0 ? postRendered[currentRendered - 1] : null
    }
  } satisfies PostProp
}

export default function Post({
  loaderData: { meta, html, footer }
}: Route.ComponentProps) {
  return (
    <SafeArea className='pb-12'>
      <SEO title={meta.title} />

      <BreadCrumb className='relative md:-top-16 mb-6' />
      <Title title={meta.title} className='md:mt-4' />
      <PostMeta meta={meta} className='pt-10 pb-6 md:(pt-6 ml-6)' />
      <HTMLContent html={html} className='post-body' />
      <PostFooter {...footer} />
    </SafeArea>
  )
}

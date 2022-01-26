import type { GetStaticPaths, GetStaticProps } from 'next'

import BreadCrumb from '@comps/breadcrumb'
import HTMLContent from '@comps/HTMLContent'
import SafeArea from '@comps/layout/safeArea'
import PostFooter from '@comps/post/postFooter'
import PostMeta from '@comps/post/postMeta'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineVFC } from '@core/helper'
import { getPostList, render, renderAll } from '@core/post/render'

import type { Rendered } from '@core/post/render'
import type { PostFooterProp } from '@comps/post/postFooter'
interface Prop {
  rendered: Rendered
  footer: PostFooterProp
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostList().then(posts =>
    posts.map(({ slug }) => {
      return {
        params: {
          slug
        }
      }
    })
  )

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Prop, { slug: string }> = async ({
  params
}) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  const list = await renderAll().then(list =>
    list.map(({ meta: { title }, slug }) => {
      return {
        title,
        slug
      }
    })
  )

  const current = list.findIndex(post => post.slug === params.slug)

  return {
    props: {
      rendered: await render(params.slug),
      footer: {
        next: list.length > current + 1 ? list[current + 1] : null,
        prev: current !== 0 ? list[current - 1] : null
      }
    }
  }
}

export default defineVFC<Prop>(({ rendered: { meta, html }, footer }) => {
  return (
    <SafeArea className="pb-12">
      <SEO title={meta.title} />

      <BreadCrumb className="relative md:-top-16 mb-6" />
      <Title title={meta.title} className="md:mt-4" />
      <PostMeta meta={meta} className="pt-10 pb-6 md:(pt-6 ml-6)" />
      <HTMLContent html={html} className="post-body" />
      <PostFooter {...footer} />
    </SafeArea>
  )
})

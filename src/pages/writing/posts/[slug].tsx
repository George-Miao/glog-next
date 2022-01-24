import type { GetStaticPaths, GetStaticProps } from 'next'

import BreadCrumb from '@comps/breadcrumb'
import Title from '@comps/title'
import PostMeta from '@comps/post/postMeta'
import { getPostList, render, renderAll } from '@core/post/render'
import { defineVFC } from '@core/helper'

import type { Rendered } from '@core/post/render'
import SafeArea from '@comps/layout/safeArea'
import type { PostFooterProp } from '@comps/post/postFooter'
import PostFooter from '@comps/post/postFooter'
import HTMLContent from '@comps/HTMLContent'

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
      <BreadCrumb className="relative md:-top-16 mb-6" />
      <Title title={meta.title} className="md:mt-4" />
      <PostMeta meta={meta} className="pt-10 pb-12 md:(pt-6 ml-6)" />
      <HTMLContent html={html} />
      <PostFooter {...footer} />
    </SafeArea>
  )
})

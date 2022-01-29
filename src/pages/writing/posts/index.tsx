import type { GetStaticProps } from 'next'

import { defineVFC } from '@core/helper'
import type { PostListProp } from '@comps/post/postList'
import PostList from '@comps/post/postList'
import { renderAllPost } from '@core/post/reduce'
import BreadCrumb from '@comps/breadcrumb'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'

export const getStaticProps: GetStaticProps<PostListProp> = () =>
  renderAllPost().then(e => {
    return {
      props: {
        list: e.map(x => {
          return {
            meta: x.meta,
            slug: x.slug,
            excerpt: x.excerpt
          }
        })
      }
    }
  })

export default defineVFC<PostListProp>(({ list }) => {
  return (
    <SafeArea>
      <SEO title="Posts" />

      <BreadCrumb className="relative md:-top-16 mb-6" />
      <p className="text-warm-gray-500 font-bold text-md mb-6 mx-auto text-center">
        Latest Posts
      </p>
      <PostList list={list}></PostList>
    </SafeArea>
  )
})

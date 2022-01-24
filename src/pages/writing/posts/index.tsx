import type { GetStaticProps } from 'next'

import { defineVFC } from '@core/utils'
import type { PostListProp } from '@comps/post/postList'
import PostList from '@comps/post/postList'
import { renderAll } from '@core/post/render'
import BreadCrumb from '@comps/breadcrumb'
import SafeArea from '@comps/layout/safeArea'

export const getStaticProps: GetStaticProps<PostListProp> = () =>
  renderAll().then(e => {
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
      <BreadCrumb className="relative md:-top-16 mb-6" />
      <p className="text-warm-gray-500 font-bold text-md mb-6 mx-auto text-center">
        Latest Posts
      </p>
      <PostList list={list}></PostList>
    </SafeArea>
  )
})

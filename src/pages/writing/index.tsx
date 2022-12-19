import type { GetStaticProps } from 'next'

import { defineVFC } from '@core/helper'
import { renderAllPost } from '@core/post/reduce'

import Button from '@comps/button'
import SafeArea from '@comps/layout/safeArea'
import type { PostListProp } from '@comps/post/postList'
import PostList from '@comps/post/postList'
import SEO from '@comps/seo'
import Title from '@comps/title'

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

const buttons = [
  ['Posts', '/writing/posts'],
  ['Tags', '/writing/tags'],
  ['Categories', '/writing/categories']
]

export default defineVFC<PostListProp>(({ list }) => {
  return (
    <SafeArea className='grid gap-8 md:gap-16 items-center'>
      <SEO title='Writing' />

      <Title
        title='Writing'
        subtitle='Posts, categories and tags'
        safeArea
        className='<md:mb-3'
      />

      <div
        className='flex flex-col items-start
          border rounded grid gap-1.5 px-4 py-3
          space-y-2 w-full
          before:-top-6
          sm:(px-6 py-4)
          md:(px-10 pt-8 pb-6)
        '
      >
        {buttons.map(([text, link], i) => (
          <Button
            key={i}
            href={link}
            style='underline'
            className='w-full'
            postfix='→'
          >
            {text}
          </Button>
        ))}
      </div>
      <p className='text-warm-gray-500 font-bold text-md -mb-2 md:-mb-12 mx-auto'>
        Latest Posts
      </p>
      <PostList list={list}></PostList>
      <Button
        href={'/writing/posts'}
        className='ml-auto w-36 text-sm'
        style='underline'
        postfix='→'
      >
        View All Posts
      </Button>
    </SafeArea>
  )
})

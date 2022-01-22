import type { GetStaticPaths, GetStaticProps } from 'next'

import BreadCrumb from '@comps/breadcrumb'
import Layout from '@comps/layout'
import Title from '@comps/title'
import PostMeta from '@comps/postMeta'
import { getPostList, render } from '@core/generate'
import { defineVFC } from '@core/utils'

import type { Rendered } from '@core/generate'

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

export const getStaticProps: GetStaticProps<
  Rendered,
  { slug: string }
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  return {
    props: await render(params.slug)
  }
}

export default defineVFC<Rendered>(({ meta, html: rendered }) => {
  return (
    <Layout>
      <div className="px-4 sm:px-4 pb-12">
        <BreadCrumb className="relative md:-top-12"></BreadCrumb>
        <Title title={meta.title} safeArea={true} className="md:mt-4"></Title>
        <PostMeta meta={meta} className="pt-6 pb-12 md:ml-6"></PostMeta>
        <div
          dangerouslySetInnerHTML={{ __html: rendered }}
          className="relative"></div>
      </div>
    </Layout>
  )
})

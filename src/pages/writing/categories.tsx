import BreadCrumb from '@comps/breadcrumb'
import { DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineFC } from '@core/helper'
import { renderAllPost } from '@core/post/reduce'

import type { DotListProp } from '@comps/dotList'
import type { GetStaticProps } from 'next'
import type { ArticleItem, Articles } from '@type/article'

interface Prop {
  categories: Articles[]
}

export const getStaticProps: GetStaticProps<Prop> = () =>
  renderAllPost().then(posts => {
    const categories: Record<string, ArticleItem[]> = {}
    posts.forEach(({ meta, slug }) => {
      const item: ArticleItem = {
        created: meta.created,
        title: meta.title,
        slug
      }
      meta.categories.forEach(cat => {
        if (categories[cat]) categories[cat].push(item)
        else categories[cat] = [item]
      })
    })
    return {
      props: {
        categories: Object.entries(categories).map(([cat, items]) => {
          return {
            name: cat,
            items
          }
        })
      }
    }
  })

export default defineFC<Prop>(({ categories }) => {
  const items: DotListProp[] = categories.map(cat => {
    return {
      title: cat.name,
      id: cat.name,
      items: cat.items.map(x => {
        return {
          title: x.title,
          link: `/writing/posts/${x.slug}`,
          value: new Date(x.created).toLocaleDateString(undefined, {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          })
        }
      })
    }
  })
  return (
    <SafeArea className='grid gap-4 md:(px-8)'>
      <SEO title='Categories' />

      <BreadCrumb className='absolute sm:top-2 md:-top-16' />
      <Title title='Categories' className='my-4 md:mb-12' safeArea />
      {items.map((prop, i) => (
        <DotList {...prop} key={i} />
      ))}
    </SafeArea>
  )
})

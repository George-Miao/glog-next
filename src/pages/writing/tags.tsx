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
  tags: Articles[]
}

export const getStaticProps: GetStaticProps<Prop> = () =>
  renderAllPost().then(posts => {
    const tags: Record<string, ArticleItem[]> = {}
    posts.forEach(({ meta, slug }) => {
      const item: ArticleItem = {
        created: meta.created,
        title: meta.title,
        slug
      }
      meta.tags.forEach(tag => {
        if (tags[tag]) tags[tag].push(item)
        else tags[tag] = [item]
      })
    })
    return {
      props: {
        tags: Object.entries(tags).map(([tag, items]) => {
          return {
            name: tag,
            items
          }
        })
      }
    }
  })

export default defineFC<Prop>(({ tags }) => {
  const items: DotListProp[] = tags.map(tag => {
    return {
      title: tag.name,
      id: tag.name,
      items: tag.items.map(x => {
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
      <SEO title='Tags' />

      <BreadCrumb className='absolute sm:top-2 md:-top-16' />
      <Title title='Tags' className='my-4 md:mb-12' safeArea />
      {items.map((prop, i) => (
        <DotList {...prop} key={i} />
      ))}
    </SafeArea>
  )
})

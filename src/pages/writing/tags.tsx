import BreadCrumb from '@comps/breadcrumb'
import { DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineVFC } from '@core/helper'
import { renderAllPost } from '@core/post/reduce'

import type { DotListProp } from '@comps/dotList'
import type { GetStaticProps } from 'next'
interface ArticleItem {
  slug: string
  title: string
  created: number
}
interface Tag {
  name: string
  items: ArticleItem[]
}

interface Prop {
  tags: Tag[]
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

export default defineVFC<Prop>(({ tags }) => {
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
    <SafeArea className='md:(px-8) grid gap-4'>
      <SEO title='Tags' />

      <BreadCrumb className='absolute sm:top-2 md:-top-16' />
      <Title title='Tags' className='my-4 md:mb-12' safeArea />
      {items.map((prop, i) => (
        <DotList {...prop} key={i} />
      ))}
    </SafeArea>
  )
})

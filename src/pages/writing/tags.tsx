import BreadCrumb from '@comps/breadcrumb'
import type { DotListProp } from '@comps/dotList'
import { DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import Title from '@comps/title'

import { renderAll } from '@core/post/render'
import { defineVFC } from '@core/utils'
import type { GetStaticProps } from 'next'

interface Item {
  slug: string
  title: string
  created: string
}
interface Tag {
  name: string
  items: Item[]
}

interface Prop {
  tags: Tag[]
}

export const getStaticProps: GetStaticProps<Prop> = () =>
  renderAll().then(posts => {
    const tags: Record<string, Item[]> = {}
    posts.forEach(({ meta, slug }) => {
      const item: Item = {
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
    <SafeArea className="md:(px-8) grid gap-4">
      <>
        <BreadCrumb className="absolute sm:top-2 md:-top-16" />
        <Title title="Tags" className="my-4 md:mb-12" safeArea />
        {items.map((prop, i) => (
          <DotList {...prop} key={i} />
        ))}
      </>
    </SafeArea>
  )
})
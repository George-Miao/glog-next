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
interface Category {
  name: string
  items: Item[]
}

interface Prop {
  categories: Category[]
}

export const getStaticProps: GetStaticProps<Prop> = () =>
  renderAll().then(posts => {
    const categories: Record<string, Item[]> = {}
    posts.forEach(({ meta, slug }) => {
      const item: Item = {
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

export default defineVFC<Prop>(({ categories }) => {
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
    <SafeArea className="md:(px-8) grid gap-4">
      <>
        <BreadCrumb className="absolute sm:top-2 md:-top-16" />
        <Title title="Categories" className="my-4 md:mb-12" safeArea />
        {items.map((prop, i) => (
          <DotList {...prop} key={i} />
        ))}
      </>
    </SafeArea>
  )
})

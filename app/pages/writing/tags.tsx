import posts from 'virtual:posts'
import BreadCrumb from '@comps/breadcrumb'
import type { DotListProp } from '@comps/dotList'
import { DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import type { ArticleItem } from '@type/article'
import type { Route } from './+types/tags'

export function loader() {
  const tags: Record<string, ArticleItem[]> = {}
  for (const { meta, slug } of posts) {
    const item: ArticleItem = {
      created: meta.created,
      title: meta.title,
      slug
    }
    for (const tag of meta.tags) {
      if (tags[tag]) tags[tag].push(item)
      else tags[tag] = [item]
    }
  }
  return {
    tags: Object.entries(tags).map(([tag, items]) => {
      return {
        name: tag,
        items
      }
    })
  }
}

export default function Tags({ loaderData: { tags } }: Route.ComponentProps) {
  const items: DotListProp[] = tags.map(tag => {
    return {
      title: tag.name,
      id: tag.name,
      items: tag.items.map(x => {
        return {
          title: x.title,
          link: `/writing/${x.slug}`,
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
        <DotList {...prop} key={prop.id ?? i} />
      ))}
    </SafeArea>
  )
}

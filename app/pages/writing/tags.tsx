import posts from 'virtual:post:all'
import BreadCrumb from '@comps/breadcrumb'
import { DotList, type DotListProp } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { groupBy } from '@utils/index'

export default function Tags() {
  const tags = groupBy(posts, p => p.meta.tags)

  const items = Object.entries(tags).map(
    ([tag, items]) =>
      ({
        title: tag,
        id: tag,
        items: items.map(x => {
          return {
            title: x.meta.title,
            link: `/writing/${x.slug}`,
            value: new Date(x.meta.created).toLocaleDateString(undefined, {
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            })
          }
        })
      }) satisfies DotListProp
  )

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

import categories from 'virtual:category'
import BreadCrumb from '@comps/breadcrumb'
import { DotList, type DotListProp } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'

export default function Categories() {
  const items = categories.map(({ name, items }) => ({
    title: name,
    id: name,
    items: items.map(x => {
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
  })) as DotListProp[]

  return (
    <SafeArea className='grid gap-4 md:(px-8)'>
      <SEO title='Categories' />

      <BreadCrumb className='absolute sm:top-2 md:-top-16' />
      <Title title='Categories' className='my-4 md:mb-12' safeArea />
      {items.map(prop => (
        <DotList {...prop} key={prop.id} />
      ))}
    </SafeArea>
  )
}

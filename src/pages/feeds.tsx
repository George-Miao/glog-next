import type { DotListItemProp } from '@comps/dotList'
import { DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineVFC } from '@core/helper'

const items: DotListItemProp[] = [
  {
    title: 'Atom',
    value: '/feeds/atom.xml',
    link: 'feeds/atom.xml'
  },
  {
    title: 'RSS 2',
    value: '/feeds/rss.xml',
    link: 'feeds/rss.xml'
  },
  {
    title: 'JSON',
    value: '/feeds/json',
    link: 'feeds/json'
  }
]

export default defineVFC(() => {
  return (
    <SafeArea>
      <SEO title="Feeds" />
      <Title title="Feeds" safeArea />
      <DotList
        items={items}
        title="Available feeds"
        className="pt-2 @sm:pt-12"
      />
    </SafeArea>
  )
})

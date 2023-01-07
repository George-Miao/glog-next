import type { DotListItemProp } from '@comps/dotList'
import { DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineFC } from '@core/helper'

const genItems = (name: string): DotListItemProp[] => [
  {
    title: 'Atom',
    value: `/feeds/${name}.atom.xml`,
    link: `/feeds/${name}.atom.xml`
  },
  {
    title: 'RSS 2',
    value: `/feeds/${name}.rss.xml`,
    link: `/feeds/${name}.rss.xml`
  },
  {
    title: 'JSON',
    value: `/feeds/${name}.json`,
    link: `/feeds/${name}.json`
  }
]

export default defineFC(() => {
  return (
    <SafeArea>
      <SEO title='Feeds' />
      <Title title='Feeds' safeArea />
      <DotList
        items={genItems('posts')}
        title='Posts'
        className='pt-2 @sm:pt-12'
      />
      <DotList
        items={genItems('changelog')}
        title='Changelogs'
        className='pt-2 @sm:pt-12'
      />
      <DotList
        items={[
          {
            title: 'SSH',
            value: '/ssh.pub',
            link: '/ssh.pub'
          },
          {
            title: 'GPG',
            value: '/gpg.asc',
            link: '/gpg.asc'
          }
        ]}
        title='Keys'
        className='pt-2 @sm:pt-12'
      />
    </SafeArea>
  )
})

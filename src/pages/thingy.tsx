import type { DotListItemProp } from '@comps/dotList'
import { DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineFC } from '@core/helper'
import Link from 'next/link'

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

const notes: DotListItemProp[] = [
  { title: 'Real Analysis', value: '/notes/412.pdf', link: '/notes/412.pdf' },
  {
    title: 'Advanced Calculus',
    value: '/notes/511.pdf',
    link: '/notes/511.pdf'
  },
  {
    title: 'Real Analysis II',
    value: '/notes/512.pdf',
    link: '/notes/512.pdf'
  },
  {
    title: 'Probability',
    value: '/notes/521.pdf',
    link: '/notes/521.pdf'
  },
  {
    title: 'Abstract Algebra',
    value: '/notes/534.pdf',
    link: '/notes/534.pdf'
  },
  {
    title: 'Number Theory',
    value: '/notes/541.pdf',
    link: '/notes/541.pdf'
  },
  {
    title: 'Topology',
    value: '/notes/661.pdf',
    link: '/notes/661.pdf'
  }
]

export default defineFC(() => {
  return (
    <SafeArea>
      <SEO title='Thingy' />
      <Title title='Thingy' subtitle='Random stuff' safeArea />
      <DotList
        items={notes}
        title='Notes'
        subtitle={
          <>
            <Link
              href='/writing/posts/class-notes'
              className='text-gray-800 underline'
            >
              Class notes
            </Link>{' '}
            with tons of typos. Use at your own risk.
          </>
        }
        className='pt-2 @sm:pt-12'
      />
      <DotList
        items={genItems('posts')}
        title='Feeds'
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

import ChangeLogItem from '@comps/changelog/changelogItem'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { render } from '@core/changelog'
import { defineFC } from '@core/helper'

import type { Changelog } from '@type/changelog'
import type { GetStaticProps } from 'next'

interface Prop {
  changelogs: Changelog[]
}

export const getStaticProps: GetStaticProps<Prop> = async () => {
  return {
    props: {
      changelogs: await render()
    }
  }
}

export default defineFC<Prop>(({ changelogs }) => {
  const len = changelogs.length
  return (
    <SafeArea>
      <SEO title='Changelog' />

      <Title
        title='Changelog'
        subtitle='Changelog of mine, not limited to Glog updates.'
      />

      <section className='grid '>
        {changelogs.map((changelog, id) => {
          if (id === len - 1)
            return <ChangeLogItem key={id} {...changelog} bottomLine={false} />
          else return <ChangeLogItem key={id} {...changelog} />
        })}
      </section>
    </SafeArea>
  )
})

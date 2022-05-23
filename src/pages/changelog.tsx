import ChangeLogCell from '@comps/changelog/changelogCell'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { render } from '@core/changelog'
import { defineVFC } from '@core/helper'

import type { Changelog } from '@core/changelog'
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

export default defineVFC<Prop>(({ changelogs }) => {
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
            return <ChangeLogCell key={id} {...changelog} bottomLine={false} />
          else return <ChangeLogCell key={id} {...changelog} />
        })}
      </section>
    </SafeArea>
  )
})

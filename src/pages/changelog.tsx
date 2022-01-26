import ChangeLogCell from '@comps/changelog/changelogCell'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { render } from '@core/changelog/render'
import { defineVFC } from '@core/helper'

import type { Changelog } from '@core/changelog/type'
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
  return (
    <SafeArea>
      <SEO title="Changelog" />

      <Title title="Changelog" safeArea />
      <section className="grid sm:pt-8 ">
        {changelogs.map((changelog, id) => (
          <ChangeLogCell {...changelog} key={id} />
        ))}
      </section>
    </SafeArea>
  )
})

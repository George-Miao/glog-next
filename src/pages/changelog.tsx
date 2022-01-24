import { render } from '@core/changelog/render'
import { defineVFC } from '@core/utils'

import type { Changelog } from '@core/changelog/type'
import type { GetStaticProps } from 'next'
import ChangeLogCell from '@comps/changelog/changelogCell'
import Title from '@comps/title'
import SafeArea from '@comps/layout/safeArea'

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
      <Title title="Changelog" safeArea />
      <section className="grid sm:pt-8 ">
        {changelogs.map((changelog, id) => (
          <ChangeLogCell {...changelog} key={id} />
        ))}
      </section>
    </SafeArea>
  )
})

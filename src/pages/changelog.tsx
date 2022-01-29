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
  const len = changelogs.length
  return (
    <SafeArea>
      <SEO title="Changelog" />

      <Title title="Changelog" />
      <p className="pt-3 pb-6 text-true-gray-400 sm:(pt-3 ml-3) md:ml-6 font-sm relative">
        Changelog of mine, not limited to Glog updates.
      </p>
      <section className="grid ">
        {changelogs.map((changelog, id) => {
          if (id === len - 1) {
            return <ChangeLogCell key={id} {...changelog} bottomLine={false} />
          } else {
            return <ChangeLogCell key={id} {...changelog} />
          }
        })}
      </section>
    </SafeArea>
  )
})

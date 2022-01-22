import Layout from '@comps/layout'
import Title from '@comps/title'

import { renderAll } from '@core/generate'
import { defineVFC } from '@core/utils'
import type { GetStaticProps } from 'next'

interface Prop {
  list: string[]
}

export const getStaticProps: GetStaticProps<Prop> = () =>
  renderAll().then(x => {
    return {
      props: {
        list: [...new Set(x.map(post => post.meta.categories).flat())]
      }
    }
  })

export default defineVFC<Prop>(({ list }) => {
  return (
    <Layout>
      <>
        <Title title="Categories"></Title>
        <div className="pt-20">
          {list.map((x, i) => {
            return (
              <div className="" key={i}>
                {x}
              </div>
            )
          })}
        </div>
      </>
    </Layout>
  )
})

import BreadCrumb from '@comps/breadcrumb'
import Layout from '@comps/layout'
import type { SummaryProp } from '@comps/summary'
import Summary from '@comps/summary'
import { renderAll } from '@core/generate'
import { defineVFC } from '@core/utils'
import type { GetStaticProps } from 'next'

interface Prop {
  list: SummaryProp[]
}

export const getStaticProps: GetStaticProps<Prop> = () =>
  renderAll().then(e => {
    return {
      props: {
        list: e.map(x => {
          return {
            meta: x.meta,
            slug: x.slug,
            excerpt: x.excerpt
          }
        })
      }
    }
  })

export default defineVFC<Prop>(({ list }) => {
  return (
    <Layout className="flex flex-col items-center">
      <>
        <div className="flex flex-col items-center">
          <p className="text-warm-gray-500 font-bold text-md md:mb-24 mb-12">
            Latest Posts
          </p>
          <div className="max-w-180 grid md:gap-32 gap-16">
            {list.map((post, i) => (
              <Summary key={i} {...post}></Summary>
            ))}
          </div>
        </div>
      </>
    </Layout>
  )
})

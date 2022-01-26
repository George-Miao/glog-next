import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'

import { defineVFC, useUrl } from '@core/helper'
import { defaultSeo } from '@core/config'

const SEO = defineVFC<{ title?: string }>(({ title }) => {
  const url = useUrl()
  const seoProp: NextSeoProps = title
    ? {
        title,
        openGraph: {
          url,
          title: defaultSeo.titleTemplate?.replace('%s', title)
        }
      }
    : {
        openGraph: { url }
      }

  return <NextSeo {...seoProp} />
})

export default SEO

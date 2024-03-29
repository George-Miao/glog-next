import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'

import { defaultSeo } from '@config'
import { defineFC, useUrl } from '@core/helper'

const SEO = defineFC<{ title?: string }>(({ title }) => {
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

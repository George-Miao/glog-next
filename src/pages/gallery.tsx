import React from 'react'

import Gallery from '@comps/gallery'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineFC } from '@core/helper'

export default defineFC(() => {
  return (
    <>
      <SEO title='Gallery' />
      <Title title='Gallery' subtitle='Photos shoot' safeArea />

      <Gallery />
    </>
  )
})

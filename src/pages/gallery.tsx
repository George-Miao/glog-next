import React from 'react'

import Gallery from '@comps/gallery'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineFC } from '@core/helper'

export default defineFC(() => {
  return (
    <SafeArea>
      <SEO title='Gallery' />
      <Title title='Gallery' subtitle='Photos shoot' safeArea />
      <Gallery />
    </SafeArea>
  )
})

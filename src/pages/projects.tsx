import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineVFC } from '@core/helper'

export default defineVFC(() => {
  return (
    <SafeArea>
      <SEO title="Proj." />
      <Title title="Proj." safeArea />
    </SafeArea>
  )
})

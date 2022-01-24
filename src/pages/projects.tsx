import SafeArea from '@comps/layout/safeArea'
import Title from '@comps/title'
import { defineVFC } from '@core/helper'

export default defineVFC(() => {
  return (
    <SafeArea>
      <Title title="Proj." safeArea />
    </SafeArea>
  )
})

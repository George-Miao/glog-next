import SafeArea from '@comps/layout/safeArea'
import Title from '@comps/title'
import { defineVFC } from '@core/utils'

export default defineVFC(() => {
  return (
    <SafeArea>
      <Title title="Proj." safeArea />
    </SafeArea>
  )
})

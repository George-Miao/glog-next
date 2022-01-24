import { defineVFCWithClassAndChild } from '@core/utils'

const SafeArea = defineVFCWithClassAndChild<{
  hideOverflow?: boolean
}>(({ className, children, hideOverflow }) => {
  return (
    <div
      className={` ${className ?? ''} max-w-3xl mx-auto ${
        hideOverflow ? 'overflow-hidden' : ''
      }`}>
      {children}
    </div>
  )
})

export default SafeArea

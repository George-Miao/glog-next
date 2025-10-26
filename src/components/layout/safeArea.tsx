import { defineFCWithChild } from '@core/helper'

const SafeArea = defineFCWithChild<{
  hideOverflow?: boolean
}>(({ className, children, hideOverflow }) => {
  return (
    <div
      className={` ${className ?? ''} max-w-4xl mx-auto ${
        hideOverflow ? 'overflow-hidden' : ''
      }`}
    >
      {children}
    </div>
  )
})

export default SafeArea

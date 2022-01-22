import { defineVFCWithClassAndChild } from '@core/utils'

export default defineVFCWithClassAndChild(({ className, children }) => {
  return <div className={`max-w-6xl mx-auto ${className} `}>{children}</div>
})

import cx from 'classix'
import type { ReactNode } from 'react'

interface SafeAreaProp {
  hideOverflow?: boolean
  className?: string
  children: ReactNode
}

export default function SafeArea({
  className,
  children,
  hideOverflow = false
}: SafeAreaProp) {
  return (
    <div
      className={cx(
        className,
        'max-w-4xl mx-auto',
        hideOverflow ?? 'overflow-hidden'
      )}
    >
      {children}
    </div>
  )
}

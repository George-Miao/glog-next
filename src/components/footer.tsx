import { defineVFC } from '@core/helper'

const Footer = defineVFC(({ className }) => {
  return (
    <footer
      className={`
        ${className ?? ''}
        lg:ml-50 pt-0 pb-8 relative z-100
        text-warm-gray-100 text-sm flex
      `}>
      <p className="mx-auto">Footer</p>
    </footer>
  )
})

export default Footer

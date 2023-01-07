import { defineFC } from '@core/helper'

const SizeIndicator = defineFC(() => {
  const className = 'hidden absolute'
  return (
    <>
      <span className={`<sm:inline-block ${className}`}>{'<SM'}</span>
      <span className={`@sm:inline-block ${className}`}>SM</span>
      <span className={`@md:inline-block ${className}`}>MD</span>
      <span className={`@lg:inline-block ${className}`}>LG</span>
      <span className={`@xl:inline-block ${className}`}>XL</span>
      <span className={`@xl:inline-block ${className}`}>XL</span>
      <span className={`@2xl:inline-block ${className}`}>2XL</span>
      <span className={`>2xl:inline-block ${className}`}>{'>2XL'}</span>
    </>
  )
})

export default SizeIndicator

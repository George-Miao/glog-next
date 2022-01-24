import { defineVFC } from '@core/helper'

const HTMLContent = defineVFC<{ html: string }>(({ html, className }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={`${className} relative`}></div>
  )
})

export default HTMLContent

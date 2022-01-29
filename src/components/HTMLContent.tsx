import { defineVFC } from '@core/helper'
import content from '@styles/content.module.css'

const HTMLContent = defineVFC<{ html: string }>(({ html, className }) => {
  return (
    <article
      dangerouslySetInnerHTML={{ __html: html }}
      className={`${className ?? ''} relative ${content.content}`}
    />
  )
})

export default HTMLContent

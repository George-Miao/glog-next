import content from '@styles/content.module.css'

interface HTMLContentProp {
  html: string
  className?: string
}

export default function HTMLContent({ html, className }: HTMLContentProp) {
  return (
    <article
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Unsafe
      dangerouslySetInnerHTML={{ __html: html }}
      className={`${className ?? ''} relative ${content.content}`}
    />
  )
}

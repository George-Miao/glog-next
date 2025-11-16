import config, { seo } from '@config'
import { useLocation } from 'react-router'

interface SEOProp {
  title?: string
  description?: string
  image?: string
}

interface TwitterCard {
  site?: string
  cardType?: string
}

export default function SEO({ title, description, image }: SEOProp) {
  const { pathname } = useLocation()
  const url = `https://${config.domain}${pathname}`

  const fullTitle = title
    ? seo.titleTemplate.replace('%s', title)
    : seo.defaultTitle

  const desc = description ?? seo.description

  const twitter = (config.twitter as unknown as TwitterCard) ?? {}
  const img = image

  return (
    <>
      {fullTitle && <title>{fullTitle}</title>}
      <link rel='canonical' href={url} />

      {desc && <meta name='description' content={desc} />}

      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      {fullTitle && <meta property='og:title' content={fullTitle} />}
      {desc && <meta property='og:description' content={desc} />}
      {img && <meta property='og:image' content={img} />}

      <meta
        name='twitter:card'
        content={twitter.cardType ?? 'summary_large_image'}
      />
      {twitter.site && <meta name='twitter:site' content={twitter.site} />}
      {fullTitle && <meta name='twitter:title' content={fullTitle} />}
      {desc && <meta name='twitter:description' content={desc} />}
      {img && <meta name='twitter:image' content={img} />}

      {config.favicon && <link rel='icon' href={config.favicon} />}
    </>
  )
}

import type { FeedOptions } from 'feed'
import type { DefaultSeoProps } from 'next-seo'

export const config = {
  domain: 'miao.dev',
  siteTitle: 'Glog',
  description: "George Miao's Site",
  image: 'https://example.com/image.png', // TODO: image
  favicon: 'https://example.com/favicon.ico', // TODO: favicon
  corsProxy: 'https://cors-proxy.miao.dev/?url=%s',
  twitter: {
    site: '@PopDotLol',
    cardType: 'summary_large_image'
  },
  openGraph: {
    type: 'website',
    profile: {
      firstName: 'George',
      lastName: 'Miao',
      gender: 'male',
      username: 'George-Miao'
    }
  }
}

export const feedBase: FeedOptions = {
  title: config.domain,
  description: config.description,
  id: `https://${config.domain}/`,
  link: `https://${config.domain}/`,
  image: config.image,
  favicon: config.favicon,
  updated: new Date(),
  generator: `${config.domain}`,
  feedLinks: {
    json: `https://${config.domain}/feeds/json`,
    atom: `https://${config.domain}/feeds/atom.xml`,
    rss: `https://${config.domain}/feeds/rss.xml`
  },
  copyright: ''
}

export const defaultSeo: DefaultSeoProps = {
  defaultTitle: config.siteTitle,
  description: config.description,
  titleTemplate: `%s | ${config.siteTitle}`,
  twitter: config.twitter,
  noindex: false,
  nofollow: false,
  openGraph: { ...config.openGraph, description: config.description }
}

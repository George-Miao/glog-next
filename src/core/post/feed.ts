import { exists } from '@core/utils'
import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'
import { renderAll } from './render'

let feedCache: Feed | undefined = undefined

const author = {
  name: 'George Miao',
  email: 'gm@miao.com',
  link: 'https://miao.dev'
}

const copyright = 'All rights reserved 2022, George Miao'

export const generateAll = async () => {
  const feed = await generateFeed()
  const cwd = process.cwd()
  const feedsDir = `${cwd}/public/feeds`

  await exists(feedsDir).then(exist => {
    if (!exist) {
      return mkdir(feedsDir, {
        recursive: true
      })
    }
  })

  await Promise.all([
    writeFile(`${process.cwd()}/public/feeds/rss.xml`, feed.rss2()),
    writeFile(`${process.cwd()}/public/feeds/atom.xml`, feed.atom1()),
    writeFile(`${process.cwd()}/public/feeds/json`, feed.json1())
  ])
}

export const generateFeed = async () => {
  if (feedCache) {
    return feedCache
  }
  const feed = new Feed({
    title: 'Miao.dev',
    description: "George Miao's site",
    id: 'https://miao.dev/',
    link: 'https://miao.dev/',
    image: 'https://example.com/image.png', // TODO: image
    favicon: 'https://example.com/favicon.ico', // TODO: favicon
    updated: new Date(),
    generator: 'Miao.dev', // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: 'https://miao.dev/feeds/json',
      atom: 'https://miao.dev/feeds/atom.xml',
      rss: 'https://miao.dev/feeds/rss.xml'
    },
    copyright,
    author
  })

  const posts = await renderAll()

  posts.forEach(({ excerpt, html, meta, slug }) => {
    const link = `https://miao.dev/writing/posts/${slug}`
    feed.addItem({
      title: meta.title,
      date: meta.updated ? new Date(meta.updated) : new Date(meta.created),
      link,
      author: [author],
      content: html,
      description: excerpt ?? undefined,
      copyright,
      guid: link,
      published: new Date(meta.created),
      category: meta.categories.map(cat => {
        return {
          name: cat
        }
      })
    })
  })

  feedCache = feed
  return feed
}

export const renderRSS = async () => generateFeed().then(x => x.rss2())

export const renderAtom = async () => generateFeed().then(x => x.atom1())

export const renderJson = async () => generateFeed().then(x => x.json1())

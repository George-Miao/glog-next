import { config, feedBase } from '@core/config'
import { exists } from '@core/utils'
import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'
import { renderAllPost } from './reduce'

let feedCache: Feed | undefined = undefined

const author = {
  name: 'George Miao',
  email: 'gm@miao.com',
  link: `https://${config.domain}`
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
  const feed = new Feed({ ...feedBase, author, copyright })

  const posts = await renderAllPost()

  posts.forEach(({ excerpt, html, meta, slug }) => {
    const link = `https://${config.domain}/writing/posts/${slug}`

    feed.addItem({
      title: meta.title,
      date: new Date(meta.created),
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

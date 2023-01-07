import { render as renderChangelog } from '@core/changelog'
import { config, feedBase } from '@config'
import { exists } from '@core/comptime_utils'
import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'
import { renderAllPost } from './reduce'

let feedCache: Feed | null = null
let changelogCache: Feed | null = null

const author = {
  name: 'George Miao',
  email: 'gm@miao.com',
  link: `https://${config.domain}`
}

const copyright = 'All rights reserved 2022, George Miao'

export const generateAllFeeds = async () => {
  const cwd = process.cwd()
  const feedDir = `${cwd}/public/feeds`

  await exists(feedDir).then(exist => {
    if (!exist) {
      return mkdir(feedDir, {
        recursive: true
      })
    }
  })

  const [posts, changelogs] = await Promise.all([
    generatePostFeed(),
    generateChanglogFeed()
  ])

  await Promise.all([
    writeFile(`${feedDir}/posts.rss.xml`, posts.rss2()),
    writeFile(`${feedDir}/posts.atom.xml`, posts.atom1()),
    writeFile(`${feedDir}/posts.json`, posts.json1()),
    writeFile(`${feedDir}/changelog.rss.xml`, changelogs.rss2()),
    writeFile(`${feedDir}/changelog.atom.xml`, changelogs.atom1()),
    writeFile(`${feedDir}/changelog.json`, changelogs.json1())
  ])
}

export const generatePostFeed = async () => {
  if (process.env.NODE_ENV === 'production' && feedCache) return feedCache

  const feed = new Feed({ ...feedBase, author, copyright })

  feed.items = await renderAllPost().then(posts =>
    posts.map(({ excerpt, html, meta, slug }) => {
      const link = `https://${config.domain}/writing/posts/${slug}`

      return {
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
      }
    })
  )

  feedCache = feed

  return feed
}

export const generateChanglogFeed = async () => {
  if (process.env.NODE_ENV === 'production' && changelogCache)
    return changelogCache

  const cl = await renderChangelog()
  const feed = new Feed({ ...feedBase, author, copyright })

  feed.items = cl.map(({ content, date, title }) => {
    const link = `https://${config.domain}/changelog`

    return { date: new Date(date), link, title, content, copyright, guid: link }
  })

  changelogCache = feed

  return feed
}

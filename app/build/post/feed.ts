import { Feed } from 'feed'
import { config, feedBase } from '../../config'
import { renderChangelog } from '../changelog'
import { renderAllPost } from './reduce'

const author = {
  name: 'George Miao',
  email: 'gm@miao.dev',
  link: `https://${config.domain}`
}

const copyright = 'All rights reserved 2025, George Miao'

export const postFeed = async () => {
  const feed = new Feed({ ...feedBase, author, copyright })

  feed.items = await renderAllPost().then(posts =>
    posts.map(({ excerpt, html, meta, slug }) => {
      const link = `https://${config.domain}/writing/${slug}`

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

  return feed
}

export const changlogFeed = async () => {
  const cl = await renderChangelog()
  const feed = new Feed({ ...feedBase, author, copyright })

  feed.items = cl.map(({ content, date, title }) => {
    const link = `https://${config.domain}/changelog`

    return { date: new Date(date), link, title, content, copyright, guid: link }
  })

  return feed
}

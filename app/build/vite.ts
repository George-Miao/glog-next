// Server side plugin to transform markdown files into HTML code exported as string

import type { Awaitable } from 'unocss'
import type { Plugin } from 'vite'
import { renderChangelog } from './changelog'
import { changlogFeed, postFeed } from './post/feed'
import { renderPost } from './post/map'
import { getPostList, renderAllPost } from './post/reduce'
import { gitSHA } from './utils'
import { renderCategories } from './writing'

export const post = {
  name: 'markdown',
  transform: {
    filter: {
      id: {
        include: /\.md$/
      }
    },
    async handler(code, id) {
      if (!id.endsWith('md')) return
      const md = await renderPost(id, code)
      return `export default ${JSON.stringify(md)}`
    }
  }
} satisfies Plugin

const virtual = <R>(id: string, render: () => Awaitable<R>) => {
  const virtualId = `virtual:${id}`
  const resolvedVirtualId = `resolved:${virtualId}`

  return {
    name: id,
    resolveId(id) {
      if (id === virtualId) {
        return resolvedVirtualId
      }
    },
    load: {
      async handler(id) {
        if (id !== resolvedVirtualId) return
        const result = await render()
        return `export default ${JSON.stringify(result)}`
      }
    }
  } satisfies Plugin
}

export default function GlogPlugin() {
  return [
    post,
    virtual('git-sha', gitSHA),
    virtual('changelog', renderChangelog),
    virtual('category', renderCategories),
    virtual('post:all', renderAllPost),
    virtual('post:path', getPostList),
    virtual('feed:posts:rss2', () => postFeed().then(x => x.rss2())),
    virtual('feed:posts:atom1', () => postFeed().then(x => x.atom1())),
    virtual('feed:posts:json1', () => postFeed().then(x => x.json1())),
    virtual('feed:changelog:rss2', () => changlogFeed().then(x => x.rss2())),
    virtual('feed:changelog:atom1', () => changlogFeed().then(x => x.atom1())),
    virtual('feed:changelog:json1', () => changlogFeed().then(x => x.json1()))
  ]
}

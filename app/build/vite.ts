// Server side plugin to transform markdown files into HTML code exported as string

import type { Awaitable } from 'unocss'
import type { Plugin } from 'vite'
import { renderChangelog } from './changelog'
import { renderPost } from './post/map'
import { getPostList, renderAllPost } from './post/reduce'
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
    virtual('changelog', renderChangelog),
    virtual('category', renderCategories),
    virtual('posts', renderAllPost),
    virtual('post_path', getPostList)
  ]
}

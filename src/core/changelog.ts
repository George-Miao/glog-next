import { md } from '@core/render'
import { readFile } from 'fs/promises'
import { sanitize } from 'isomorphic-dompurify'
import { allIndexOf } from './helper'
import { renderMarkdown } from './post/map'
import { renderAllPost } from './post/reduce'

export interface Changelog {
  title: string
  date: number
  content: string
}

const titlePattern = /#([^#].*?)-(.*)/i

const read = async () =>
  readFile(`${process.cwd()}/content/changelog.md`).then(buffer =>
    buffer.toString()
  )

export const render = async (): Promise<Changelog[]> => {
  const newArticles = (await renderAllPost()).map(p => {
    const header = `[${p.meta.title}](/writing/posts/${p.slug})\n\n`
    const content = renderMarkdown(header + (p.excerpt ?? '')).html

    return {
      content,
      date: p.meta.created,
      title: 'New article'
    }
  })

  const raw = await read()
  return allIndexOf(raw, titlePattern)
    .map((_, i, arr) => {
      const start = arr[i]
      const end = arr[i + 1]
      const fragment = raw.slice(start, end)
      const matched = fragment.match(titlePattern)
      if (!matched) throw Error('This cannot happen')
      const title = matched[1].trim()
      const date = +new Date(matched[2].trim())
      const fragRaw = fragment.replace(titlePattern, '').trim()
      const content = sanitize(md.render(fragRaw), {
        USE_PROFILES: { html: true }
      })
      return {
        content,
        date,
        title
      }
    })
    .concat(newArticles)
    .sort((a, b) => b.date - a.date)
}

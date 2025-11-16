import { readFile } from 'node:fs/promises'
import DOMPurify from 'isomorphic-dompurify'
import type { Changelog } from '../types/changelog'
import { md } from './markdown'
import { renderMarkdown } from './post/map'
import { renderAllPost } from './post/reduce'
import { allIndexOf } from './utils'

const titlePattern = /#([^#].*?)-(.*)/i

const read = async () =>
  readFile(`${process.cwd()}/content/changelog.md`).then(buffer =>
    buffer.toString()
  )

export const renderChangelog = async (): Promise<Changelog[]> => {
  const newArticles = (await renderAllPost()).map(p => {
    const header = `[${p.meta.title}](/writing/${p.slug})\n\n`
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
      const content = DOMPurify.sanitize(md.render(fragRaw), {
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

import { allIndexOf } from './../utils'
import { readFile } from 'fs/promises'
import { sanitize } from 'isomorphic-dompurify'
import type { Changelog } from './type'
import { md } from '@core/render'

let contentCache: string | null
let renderedCache: Changelog[] | null

const titlePattern = /#[^#](.*)@(.*)/i

const read = async () => {
  if (contentCache) {
    return contentCache
  }

  const data = await readFile(`${process.cwd()}/content/changelog.md`).then(
    buffer => buffer.toString()
  )

  contentCache = data
  return contentCache
}

export const render = async (): Promise<Changelog[]> => {
  if (renderedCache) {
    return renderedCache
  }

  const raw = await read()
  const ret = allIndexOf(raw, titlePattern).map((_, i, arr) => {
    const start = arr[i]
    const end = arr[i + 1]
    const fragment = raw.slice(start, end)
    const matched = fragment.match(titlePattern)
    if (!matched) {
      throw Error('This cannot happen')
    }
    const title = matched[1].trim()
    const date = matched[2].trim()
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

  renderedCache = ret

  return ret
}

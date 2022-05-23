import { md } from '@core/render'
import { readFile } from 'fs/promises'
import { sanitize } from 'isomorphic-dompurify'
import { allIndexOf } from './helper'

export interface Changelog {
  title: string
  date: number
  content: string
}

const titlePattern = /#([^#].*?)-(.*)/i

const read = async () => readFile(`${process.cwd()}/content/changelog.md`).then(buffer => buffer.toString())

export const render = async (): Promise<Changelog[]> => {
  const raw = await read()
  const ret = allIndexOf(raw, titlePattern).map((_, i, arr) => {
    const start = arr[i]
    const end = arr[i + 1]
    const fragment = raw.slice(start, end)
    const matched = fragment.match(titlePattern)
    if (!matched)
      throw Error('This cannot happen')
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

  return ret
}

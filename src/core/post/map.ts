import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import { sanitize } from 'isomorphic-dompurify'

import { md } from '@core/render'

import {
  blockExcerptPattern,
  cache,
  moreExcerptPattern,
  postsDir
} from './common'

import type { Ingot, Meta, MetaValidated, Rendered } from './type'
import { count } from '@wordpress/wordcount'

export const renderPost = async (slug: string): Promise<Rendered> => {
  if (process.env.NODE_ENV === 'production' && cache.rendered?.[slug]) {
    console.log(`Cache hit <${slug}>`)
    return cache.rendered[slug]
  } else
    return await readData(slug)
      .then(extractMeta)
      .then(({ meta: metaUnchecked, raw, excerpt }) => {
        const { html, text } = renderMarkdown(raw)
        const meta = checkMeta(metaUnchecked)
        meta.wordCount = count(text, 'words', {
          l10n: { shortcodes: ['en', 'cn', 'zh'], type: 'words' }
        })
        return { meta, raw, slug, html, text, excerpt }
      })
      .then(r => {
        cache.rendered[slug] = r
        return r
      })
}

const readData = async (slug: string): Promise<string> => {
  const path = `${postsDir}/${slug}.md`
  const content = await readFile(path).then(x => x.toString())
  return content
}

const extractMeta = async (data: string): Promise<Ingot> => {
  const {
    data: meta,
    content: raw,
    excerpt
  } = matter(data, {
    // @ts-expect-error https://github.com/jonschlinkert/gray-matter/issues/125 WTF IT'S STILL NOT SOLVED
    excerpt(input: matter.GrayMatterFile<string>) {
      const raw = input.content
      input.excerpt =
        raw.match(moreExcerptPattern)?.[1]?.replaceAll?.('\n', ' ') ??
        raw.match(blockExcerptPattern)?.[1]?.replaceAll?.('\n', ' ') ??
        ''
    }
  })
  return {
    meta,
    raw,
    excerpt: excerpt === '' || excerpt === undefined ? null : excerpt
  }
}

const renderMarkdown = (markdown: string) => {
  const html = sanitize(md.render(markdown), {
    USE_PROFILES: { html: true }
  })

  // @ts-expect-error plainText is a markdown-it plugin
  const text = md.plainText as string

  return {
    html,
    text
  }
}

const checkMeta = (meta: Meta): MetaValidated => {
  const check = <K extends keyof Meta>(name: K) => {
    const value = meta[name]
    if (!value) {
      throw Error(`Missing meta in post ${name}`)
    } else {
      if (value instanceof Date) return value.toISOString() as MetaValidated[K]
      else return value as unknown as MetaValidated[K]
    }
  }

  return {
    tags: check('tags'),
    categories: check('categories'),
    title: check('title'),
    created: check('created'),
    wordCount: 0
  }
}

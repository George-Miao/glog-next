import { readFile } from 'node:fs/promises'
import { count } from '@wordpress/wordcount'
import matter from 'gray-matter'
import DOMPurify from 'isomorphic-dompurify'
import type { Ingot, Meta, MetaValidated, Rendered } from '../../types/post'
import { md } from '../markdown'
import { blockExcerptPattern, moreExcerptPattern, postsDir } from './common'

export const renderSlug = async (slug: string): Promise<Rendered> =>
  await readData(slug).then(renderPost.bind(null, slug))

export const renderPost = async (
  slug: string,
  code: string
): Promise<Rendered> =>
  extractMeta(code).then(({ meta: metaUnchecked, raw, excerpt }) => {
    const { html, text } = renderMarkdown(raw)
    const meta = checkMeta(metaUnchecked)
    meta.wordCount = count(text, 'words', {
      l10n: { shortcodes: ['en', 'cn', 'zh'], type: 'words' }
    })
    return { meta, raw, slug, html, text, excerpt }
  })

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

export const renderMarkdown = (markdown: string) => {
  const html = DOMPurify.sanitize(md.render(markdown), {
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
    if (!value) throw Error(`Missing meta in post ${name}`)
    if (value instanceof Date) return +value as MetaValidated[K]
    return value as unknown as MetaValidated[K]
  }

  return {
    tags: check('tags'),
    categories: check('categories'),
    title: check('title'),
    created: check('created'),
    wordCount: 0
  }
}

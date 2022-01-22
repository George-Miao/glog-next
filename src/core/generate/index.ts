/**
  This module is intended to be run purely during build time
  All function exported requires node and fs access
*/

import { readFile } from 'fs/promises'
import glob from 'glob'
import matter from 'gray-matter'
import { sanitize } from 'isomorphic-dompurify'
import markdownIt from 'markdown-it'
import { count } from '@wordpress/wordcount'
import { Content, Meta, MetaValidated, Path, Rendered } from './type'

export type { Content, Meta, MetaValidated, Path, Rendered }

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(require('markdown-it-plain-text'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-container'), 'info')
  .use(require('markdown-it-container'), 'success')
  .use(require('markdown-it-container'), 'danger')
  .use(require('markdown-it-container'), 'error')
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-imsize'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-regexp'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-task-checkbox'))

const blockExcerptPattern = /<!--\s*block\s*-->([\s\S]*)<!--\s*block\s*-->/g
const moreExcerptPattern = /([\s\S]*)<!--\s*more\s*-->/g

const renderCache: Record<string, Rendered> = {}
const postListCache: {
  paths?: Path[]
} = {}

export const getPostList: () => Promise<Path[]> = async () => {
  if (postListCache.paths) {
    return postListCache.paths
  } else
    return new Promise((res, rej) =>
      glob('posts/*.md', (err, match) => {
        if (err) {
          rej(err)
        } else {
          res(
            match.map(path => {
              return {
                path,
                slug: getSlugFromPath(path)
              }
            })
          )
        }
      })
    )
}

export const renderAll: () => Promise<Rendered[]> = () =>
  getPostList()
    .then(x => Promise.all(x.map(({ slug }) => render(slug))))
    .then(x =>
      x.sort((a, b) => +new Date(b.meta.created) - +new Date(a.meta.created))
    )

const getSlugFromPath = (path: string) => {
  const fileName = path.split('/')[1]
  return fileName.split('.')[0]
}

const read: (slug: string) => Promise<string> = async slug => {
  const path = `${process.cwd()}/posts/${slug}.md`
  const content = await readFile(path).then(x => x.toString())
  return content
}

const getContent: (slug: string) => Promise<Content> = async slug => {
  const data = await read(slug)
  let {
    data: meta,
    content: raw,
    excerpt
  } = matter(data, {
    // @ts-ignore
    excerpt(input) {
      // @ts-ignore
      const content = input.content as string
      // @ts-ignore
      input.excerpt =
        content
          .match(moreExcerptPattern)?.[0]
          .replace(/<!--\s*more\s*-->/g, '')
          .replaceAll('\n', ' ') ??
        content
          .match(blockExcerptPattern)?.[0]
          .replaceAll(/<!--\s*block\s*-->/g, '')
          .replaceAll('\n', ' ') ??
        undefined
    }
  })
  return {
    meta,
    raw,
    excerpt
  }
}

export const render: (slug: string) => Promise<Rendered> = async slug => {
  if (renderCache[slug]) return renderCache[slug]

  let { meta, raw, excerpt } = await getContent(slug)
  const html = sanitize(md.render(raw), {
    USE_PROFILES: { html: true }
  })

  // @ts-ignore
  const text = md.plainText as string
  const checkedMeta = checkMeta(slug, meta)
  checkedMeta.wordCount = count(text, 'words')

  // @ts-ignore
  const plainExcerpt = excerpt && md.render(excerpt) && md.plainText

  const ret = {
    raw,
    slug,
    meta: checkedMeta,
    excerpt: plainExcerpt ?? null,
    html,
    text
  }

  renderCache[slug] = ret

  return ret
}

const checkMeta = (slug: string, meta: Meta): MetaValidated => {
  const check = <K extends keyof Meta>(name: K) => {
    const value = meta[name]
    if (!value) {
      throw Error(`Missing meta in post "${slug}": ${name}`)
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
    wordCount: 0,
    updated: meta.updated?.toISOString() ?? null
  }
}

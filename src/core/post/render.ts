/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
  This module is intended to be run purely during build time
  All function exported requires node and fs access
*/

import { readFile } from 'fs/promises'
import glob from 'glob'
import matter from 'gray-matter'
import { sanitize } from 'isomorphic-dompurify'
import { count } from '@wordpress/wordcount'
import type { Content, Meta, MetaValidated, PostPath, Rendered } from './type'
import { md } from '@core/render'

export type { Content, Meta, MetaValidated, PostPath as Path, Rendered }

const blockExcerptPattern = /<!--\s*block\s*-->([\s\S]*)<!--\s*block\s*-->/i
const moreExcerptPattern = /([\s\S]*)<!--\s*more\s*-->/i

const renderCache: Record<string, Rendered> = {}
const postListCache: {
  paths?: PostPath[]
} = {}

const postsDir = `${process.cwd()}/content/posts`

export const getPostList: () => Promise<PostPath[]> = async () => {
  if (postListCache.paths) {
    return postListCache.paths
  } else
    return new Promise((res, rej) =>
      glob(`${postsDir}/*.md`, (err, match) => {
        if (err) {
          rej(err)
        } else {
          res(
            match.map(path => {
              const slug = getSlugFromPath(path)
              if (!slug)
                throw Error(
                  `Bad post filename, unable to retreive slug: ${path}`
                )
              return {
                path,
                slug
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

const slugPattern = /.*\/(.*?)\.md/i

const getSlugFromPath = (path: string) => {
  return path.match(slugPattern)?.[1]
}

const read: (slug: string) => Promise<string> = async slug => {
  const path = `${postsDir}/${slug}.md`
  const content = await readFile(path).then(x => x.toString())
  return content
}

const getContent: (slug: string) => Promise<Content> = async slug => {
  const data = await read(slug)
  const {
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
        content.match(moreExcerptPattern)?.[1].replaceAll('\n', ' ') ??
        content.match(blockExcerptPattern)?.[1].replaceAll('\n', ' ') ??
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
  if (renderCache[slug]) {
    console.log(`Cache hit: ${slug}`)
    return renderCache[slug]
  }

  const { meta, raw, excerpt } = await getContent(slug)
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

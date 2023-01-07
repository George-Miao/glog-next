import glob from 'glob'

import { postsDir, slugPattern } from './common'
import { renderPost } from './map'

import type { PostPath, Rendered } from '@type/post'

const getSlugFromPath = (path: string) => {
  return path.match(slugPattern)?.[1]
}

export const getPostList: () => Promise<PostPath[]> = async () => {
  return new Promise((res, rej) =>
    glob(`${postsDir}/*.md`, (err, match) => {
      if (err) rej(err)
      else {
        res(
          match.map(path => {
            const slug = getSlugFromPath(path)
            if (!slug) {
              throw Error(`Bad post filename, unable to retreive slug: ${path}`)
            }
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

export const renderAllPost: () => Promise<Rendered[]> = () =>
  getPostList()
    .then(x => Promise.all(x.map(({ slug }) => renderPost(slug))))
    .then(x =>
      x.sort((a, b) => +new Date(b.meta.created) - +new Date(a.meta.created))
    )

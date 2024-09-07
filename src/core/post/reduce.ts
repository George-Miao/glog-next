import { glob } from 'glob'

import { postsDir, slugPattern } from './common'
import { renderPost } from './map'

import type { PostPath, Rendered } from '@type/post'

const getSlugFromPath = (path: string) => {
  return path.match(slugPattern)?.[1]
}

export const getPostList: () => Promise<PostPath[]> = async () => {
  const files = await glob(`${postsDir}/*.md`)
  return files.map(path => {
    const slug = getSlugFromPath(path)
    if (!slug) {
      throw Error(`Bad post filename, unable to retreive slug: ${path}`)
    }
    return {
      path,
      slug
    }
  })
}

export const renderAllPost: () => Promise<Rendered[]> = () =>
  getPostList()
    .then(x => Promise.all(x.map(({ slug }) => renderPost(slug))))
    .then(x =>
      x.sort((a, b) => +new Date(b.meta.created) - +new Date(a.meta.created))
    )

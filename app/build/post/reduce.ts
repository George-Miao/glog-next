import { glob } from 'glob'
import type { PostPath, Rendered } from '../../types/post'
import { postsDir, slugPattern } from './common'
import { renderSlug } from './map'

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
    .then(x => Promise.all(x.map(({ slug }) => renderSlug(slug))))
    .then(x => x.sort((a, b) => b.meta.created - a.meta.created))

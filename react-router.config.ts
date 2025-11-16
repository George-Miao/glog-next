import type { Config } from '@react-router/dev/config'
import { getPostList } from 'app/build/post/reduce'

export default {
  ssr: false,

  async prerender() {
    const fixed = [
      '/',
      '/404',
      '/sitemap.xml',
      '/posts.rss.xml',
      '/posts.atom.xml',
      '/posts.json',
      '/changelog.rss.xml',
      '/changelog.atom.xml',
      '/changelog.json',
      '/robot.txt',
      '/writing',
      '/changelog',
      '/projects',
      '/thingy',
      '/writing/tags',
      '/writing/categories'
    ]
    const posts = await getPostList().then(x =>
      x.map(post => `/writing/${post.slug}`)
    )

    return fixed.concat(posts)
  }
} satisfies Config

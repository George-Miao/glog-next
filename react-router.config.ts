import type { Config } from '@react-router/dev/config'
import { getPostList } from 'app/build/post/reduce'

export default {
  ssr: false,

  async prerender() {
    const fixed = [
      '/',
      '/404',
      '/sitemap.xml',
      '/feeds/posts.rss.xml',
      '/feeds/posts.atom.xml',
      '/feeds/posts.json',
      '/feeds/changelog.rss.xml',
      '/feeds/changelog.atom.xml',
      '/feeds/changelog.json',
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

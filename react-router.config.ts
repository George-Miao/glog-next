import type { Config } from '@react-router/dev/config'
import { getPostList } from 'app/build/post/reduce'

export default {
  ssr: true,

  async prerender() {
    const fixed = [
      '/',
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

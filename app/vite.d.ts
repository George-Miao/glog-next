declare module '*.md' {
  import type { Rendered } from '@type/post'
  export default Rendered
}

declare module 'virtual:changelog' {
  import type { Changelog } from '@type/changelog'
  const changelog: Changelog[]
  export default changelog
}

declare module 'virtual:category' {
  import type { ArticleItem } from '@type/article'
  export interface Category {
    name: string
    items: ArticleItem[]
  }
  const categories: Category[]
  export default categories
}

declare module 'virtual:posts' {
  import type { Rendered } from '@type/post'
  const posts: Rendered[]
  export default posts
}

declare module 'virtual:post_path' {
  import type { PostPath } from '@type/post'
  const posts: PostPath[]
  export default posts
}

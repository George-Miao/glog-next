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

declare module 'virtual:post:all' {
  import type { Rendered } from '@type/post'
  const posts: Rendered[]
  export default posts
}

declare module 'virtual:post:path' {
  import type { PostPath } from '@type/post'
  const posts: PostPath[]
  export default posts
}

declare module 'virtual:feed:*' {
  export default string
}

declare module 'virtual:git-sha' {
  export default string
}

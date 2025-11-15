export interface ArticleItem {
  slug: string
  title: string
  created: number
}

export interface Articles {
  name: string
  items: ArticleItem[]
}

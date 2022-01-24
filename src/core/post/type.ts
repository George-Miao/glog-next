export interface PostPath {
  path: string
  slug: string
}

export interface Rendered {
  raw: string
  slug: string
  meta: MetaValidated
  html: string
  text: string
  excerpt: string | null
}

export interface Content {
  raw: string
  meta: Meta
  excerpt?: string
}

export interface Meta {
  tags?: string[]
  categories?: string[]
  title?: string
  created?: Date
  updated?: Date
}

export interface MetaValidated {
  tags: string[]
  categories: string[]
  title: string
  created: string
  wordCount: number
  updated: string | null
}

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

export interface Ingot {
  raw: string
  meta: Meta
  excerpt: string | null
}

export interface Meta {
  tags?: string[]
  categories?: string[]
  title?: string
  created?: Date
}

export interface MetaValidated {
  tags: string[]
  categories: string[]
  title: string
  created: number
  wordCount: number
}

export interface RenderCache {
  rendered: Record<string, Rendered>
  list: PostPath[] | null
}

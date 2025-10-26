export interface ProjIndicator {
  icon: string
  link?: string
}

export interface ProjItem {
  name: string
  description: string
  icon?: string | { url: string }
  link?: string
  github?: string
  healthCheck?: string
  indicators?: ProjIndicator[]
}

export interface ProjSection {
  name: string
  items: ProjItem[]
  icon?: string
  description?: string
}

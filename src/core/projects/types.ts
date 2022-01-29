export interface ProjIndicator {
  icon: string
  label?: string
  link?: string
}

export interface ProjItem {
  name: string
  description: string
  icon?: string
  link?: string
  github?: string
  isPrivate?: boolean
  healthCheck?: string
  indicators?: ProjIndicator[]
}

export interface ProjCategory {
  name: string
  items: ProjItem[]
  icon?: string
  description?: string
}

export enum ProjStatus {
  Init,
  Online,
  Offline
}

export const defineProjCategories = (val: ProjCategory[]) => val

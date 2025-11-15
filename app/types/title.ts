import type { ReactNode } from 'react'

export interface TitleProp {
  title: string | { node: ReactNode; char: string }
  subtitle?: string
  link?: string
  uppercase?: boolean
  className?: string
  safeArea?: boolean
}

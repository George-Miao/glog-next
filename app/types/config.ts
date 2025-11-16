// import type { OpenGraph, Twitter } from 'next-seo/lib/types'

import type { DotListItemProp } from '@comps/dotList'
import type { NavBtn } from '@type/navbar'
import type { ProjSection } from '@type/proj'

// import type { NextFontWithVariable } from '@next/font/dist/types'

export interface GlogConfig {
  proj: ProjSection[]
  fonts: unknown[]
  domain: string
  siteTitle: string
  description: string
  image: string
  favicon: string
  twitter: unknown
  openGraph: object
  education: DotListItemProp[]
  professional: DotListItemProp[]
  links: DotListItemProp[]
  navbar: {
    links: NavBtn[]
  }
}

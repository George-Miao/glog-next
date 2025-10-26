import type { OpenGraph, Twitter } from 'next-seo/lib/types'

import type { DotListItemProp } from '@comps/dotList'
import type { ProjSection } from '@type/proj'
import type { NavBtn } from '@type/navbar'

import type { NextFontWithVariable } from '@next/font/dist/types'

export interface GlogConfig {
  proj: ProjSection[]
  fonts: NextFontWithVariable[]
  domain: string
  siteTitle: string
  description: string
  image: string
  favicon: string
  corsProxy: string
  photoProxy: string
  twitter: Twitter
  openGraph: OpenGraph
  education: DotListItemProp[]
  professional: DotListItemProp[]
  links: DotListItemProp[]
  navbar: {
    links: NavBtn[]
  }
}

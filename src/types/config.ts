import type { OpenGraph, Twitter } from 'next-seo/lib/types'
import type { Photo } from 'react-photo-album'

import type { DotListItemProp } from '@comps/dotList'
import type { ProjCategory } from '@type/proj'
import type { NavBtn } from '@type/navbar'

import type { NextFontWithVariable } from '@next/font/dist/types'

export interface GlogConfig {
  proj: ProjCategory[]
  fonts: NextFontWithVariable[]
  domain: string
  siteTitle: string
  description: string
  image: string
  favicon: string
  corsProxy: string
  twitter: Twitter
  openGraph: OpenGraph
  resumeList: DotListItemProp[]
  linksList: DotListItemProp[]
  gallery: Photo[]
  navbar: {
    links: NavBtn[]
  }
}

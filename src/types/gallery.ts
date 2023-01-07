import type { Photo } from 'react-photo-album'

export interface DetailedPhoto extends Photo, PhotoMeta {}

export interface PhotoMeta {
  url: string
  location?: string
  timestamp?: number
  size: {
    width: number
    height: number
  }
  exif?: {
    iso?: string
    make?: string
    model?: string
    exposure?: string
    fNumber?: string
  }
}

import type { Photo } from 'react-photo-album'

export interface DetailedPhoto extends Photo {
  location?: string
  camera?: string
  date?: Date
}

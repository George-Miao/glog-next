import type { DetailedPhoto, PhotoMeta } from '@type/gallery'

export const getPhotos: () => Promise<DetailedPhoto[]> = async () => {
  const res = await fetch('https://glog-photo.miao.dev').then(
    x => x.json() as Promise<PhotoMeta[]>
  )

  return res.map<DetailedPhoto>(x => {
    const { height, width } = x.size
    return { height, width, src: x.url + '?v=1', ...x }
  })
}

export type GetImages = Awaited<ReturnType<typeof getPhotos>>

export {}

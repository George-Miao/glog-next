import type { DetailedPhoto, PhotoMeta } from '@type/gallery'

// import config from '@config'

// const s3 = new S3({
//   endpoint: config.s3.endpoint,
//   credentials: {
//     accessKeyId: config.s3.accessKeyId,
//     secretAccessKey: config.s3.secretAccessKey
//   }
// })

export const getPhotos: () => Promise<DetailedPhoto[]> = async () => {
  // const res = await s3
  //   .listObjectsV2({
  //     Bucket: config.s3.bucket,
  //     MaxKeys: 100,
  //     Prefix: config.s3.prefix
  //   })
  //   .promise()
  // const filenames =
  //   res.Contents?.map(x => {
  //     const frags = x.Key?.split('/')
  //     return frags?.[frags?.length - 1]
  //   }) ?? []
  // return Promise.all(
  //   filenames
  //     .filter(x => x !== undefined)
  //     .map(x => config.photoProxy.replace('%s', x as string))
  //     .map(async url => {
  //       const { css, img } = await getPlaiceholder(url)
  //       return {
  //         css,
  //         img
  //       }
  //     })
  // )
  const res = await fetch('https://glog-photo.miao.dev').then(
    x => x.json() as Promise<PhotoMeta[]>
  )
  console.log(res)
  return res.map<DetailedPhoto>(x => {
    const { height, width } = x.size
    return { height, width, src: x.url + '?v=1', ...x }
  })
}

export type GetImages = Awaited<ReturnType<typeof getPhotos>>

export {}

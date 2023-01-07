import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Photo, PhotoAlbum } from 'react-photo-album'

import { getPhotos } from '@core/gallery'
import { defineFC, genWhole, toTitleCase } from '@core/helper'
import { Icon } from '@iconify/react'

import type { RenderPhotoProps } from 'react-photo-album'
import type { DetailedPhoto } from '@type/gallery'

const PlaceHolder = defineFC(() => {
  const PlaceHolderRenderPhoto = defineFC<RenderPhotoProps<Photo>>(
    ({ layout: { width, height } }) => {
      return <div className='bg-neutral-100' style={{ width, height }}></div>
    }
  )
  const photos: Array<Photo> = new Array(10).fill(0).map(() => {
    return {
      height: genWhole(200, 400),
      width: genWhole(200, 400),
      src: `${genWhole(0, 114514)}`
    }
  })
  return (
    <PhotoAlbum
      componentsProps={{
        containerProps: {
          className: 'mt-10 sm:mt-20'
        }
      }}
      layout='rows'
      targetRowHeight={300}
      photos={photos}
      renderPhoto={PlaceHolderRenderPhoto}
    />
  )
})

const PhotoDetail = defineFC<{ photo: DetailedPhoto }>(({ photo }) => {
  const camera =
    photo.exif?.model &&
    photo.exif?.make &&
    `${photo.exif.make} ${photo.exif.model} `
  return (
    <div
      className='flex flex-col
      text-sm
      opacity-0 p-3
      transition-all top-0 right-0 bottom-0
      left-0 text-neutral-100  leading-4
      z-20 justify-between
      select-none absolute
      hover:opacity-100
    '
      style={{
        backgroundImage: `linear-gradient(
            rgba(0, 0, 0, .4) 0%,
            transparent 20%,
            transparent 80%,
            rgba(0,0,0,.4) 100%
          )`
      }}
    >
      <div className='flex'>
        {camera && (
          <>
            <Icon icon={'material-symbols:camera'} inline className='mr-1' />
            {toTitleCase(camera)}
          </>
        )}
      </div>

      <div className='flex w-full items-center '>
        {photo.location && (
          <>
            <Icon
              icon={'material-symbols:location-on-outline'}
              inline
              className='mr-1'
            />
            <span>{photo.location ?? 'Unknown'}</span>
          </>
        )}

        {photo.timestamp && (
          <span className='ml-auto'>
            {new Date(photo.timestamp).toLocaleDateString(undefined, {
              day: 'numeric',
              year: 'numeric',
              month: 'short'
            })}
          </span>
        )}
      </div>
    </div>
  )
})

const Photo = defineFC<RenderPhotoProps<DetailedPhoto>>(
  ({
    photo,
    layout: { width, height },
    imageProps: { src, alt, title, style }
  }) => {
    return (
      <article style={style} className='relative overflow-hidden'>
        <PhotoDetail photo={photo} />
        <div className='bg-neutral-100 p-1 top-0 right-0 bottom-0 left-0 absolute' />
        <Image
          src={src}
          alt={alt}
          title={title ?? undefined}
          width={Math.floor(width)}
          height={Math.floor(height)}
          quality={100}
          // unoptimized={true}
          className='opacity-0 transition-all z-10 relative'
          onLoadingComplete={e => e.classList.add('opacity-100')}
        />
      </article>
    )
  }
)

const Gallery = defineFC(() => {
  const [photos, setPhotos] = useState<DetailedPhoto[] | null>(null)
  useEffect(() => {
    getPhotos().then(p => setPhotos(p))
  }, [])
  return photos ? (
    <PhotoAlbum
      componentsProps={{
        containerProps: {
          className: 'mt-10 sm:mt-20'
        }
      }}
      layout='rows'
      targetRowHeight={300}
      photos={photos}
      renderPhoto={Photo}
    />
  ) : (
    <PlaceHolder />
  )
})

export default Gallery

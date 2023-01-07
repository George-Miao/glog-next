import Image from 'next/image'
import React from 'react'
import { PhotoAlbum } from 'react-photo-album'

import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'
import config from '@config'
import { defineFC, genWhole, toTitleCase } from '@core/helper'

import type { RenderPhotoProps } from 'react-photo-album'
import type { DetailedPhoto } from '@type/gallery'
import { Icon } from '@iconify/react'

const PhotoDetail = defineFC<{ photo: DetailedPhoto }>(({ photo }) => {
  return (
    <div
      className='flex flex-col
      text-sm
      opacity-0 p-3
      transition-all top-0 right-0 bottom-0
      left-0 text-neutral-100  leading-4
      justify-between select-none
      absolute hover:opacity-100
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
        {photo.camera && (
          <>
            <Icon icon={'material-symbols:camera'} inline className='mr-1' />
            {toTitleCase(photo.camera ?? 'Unknown')}
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

        {photo.date && (
          <span className='ml-auto'>
            {photo.date?.toLocaleDateString(undefined, {
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

        <Image
          src={src}
          alt={alt}
          title={title ?? undefined}
          width={Math.floor(width)}
          height={Math.floor(height)}
          placeholder='empty'
        />
      </article>
    )
  }
)
const photos: DetailedPhoto[] = new Array(10)
  .fill(0)
  .map<DetailedPhoto>(() => {
    const [height, width] = [genWhole(250, 400), genWhole(250, 400)]
    return {
      src: `https://placekitten.com/${width}/${height}`,
      width,
      height,
      location: 'Meow',
      camera: 'FUJIFILM X100V',
      date: new Date()
    }
  })
  .concat(...config.gallery)

export default defineFC(() => {
  return (
    <SafeArea>
      <SEO title='Gallery' />
      <Title title='Gallery' subtitle='Photos shoot' safeArea />

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
    </SafeArea>
  )
})

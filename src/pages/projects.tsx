import { PhotoAlbum } from 'react-photo-album'

import SafeArea from '@comps/layout/safeArea'
import ProjCategory from '@comps/projects'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { config } from '@config'
import { defineFC } from '@core/helper'

import type { PseudoProjPhoto } from '@comps/projects'
const pseudoProjPhotos: PseudoProjPhoto[] = config.proj.map(category => ({
  src: '',
  width: 200,
  height: 0,
  ...category
}))
export default defineFC(() => {
  return (
    <SafeArea>
      <SEO title='Proj.' />
      <Title title='Proj.' safeArea />
      <PhotoAlbum
        layout='masonry'
        photos={pseudoProjPhotos}
        renderPhoto={ProjCategory}
        columns={w => (w < 540 ? 1 : 2)}
        padding={4}
        componentsProps={{
          containerProps: {
            className: 'flex mt-8 sm:mt-12 md:mt-0'
          }
        }}
        // breakpointCols={{
        //   default: 2,
        //   768: 1
        // }}
        // className='flex mt-8 sm:mt-12 md:mt-0'
        // columnClassName='not-first:ml-6'
      />
    </SafeArea>
  )
})

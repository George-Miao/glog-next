import SafeArea from '@comps/layout/safeArea'
import type { PseudoProjPhoto } from '@comps/projects'
import ProjCategory from '@comps/projects'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { config } from '@config'
import { PhotoAlbum } from 'react-photo-album'

const pseudoProjPhotos: PseudoProjPhoto[] = config.proj.map(category => ({
  src: '',
  width: 200,
  height: 0,
  ...category
}))

export default function Projects() {
  return (
    <SafeArea>
      <SEO title='Proj.' />
      <Title title='Proj.' className='mb-24' />
      <PhotoAlbum
        layout='masonry'
        photos={pseudoProjPhotos}
        renderPhoto={ProjCategory}
        columns={w => (w < 540 ? 1 : 2)}
        padding={4}
        componentsProps={{
          containerProps: {
            className: 'flex pt-12'
          }
        }}
      />
    </SafeArea>
  )
}

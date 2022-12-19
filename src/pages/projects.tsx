import SafeArea from '@comps/layout/safeArea'
import ProjCategory from '@comps/projects'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineVFC } from '@core/helper'
import { categories } from '@core/projects'
import React from 'react'
import Masonry from 'react-masonry-css'

export default defineVFC(() => {
  return (
    <SafeArea>
      <SEO title='Proj.' />
      <Title title='Proj.' safeArea />
      <Masonry
        breakpointCols={{
          default: 2,
          768: 1
        }}
        className='flex mt-8 sm:mt-12 md:mt-0'
        columnClassName='not-first:ml-6'
      >
        {categories.map((category, key) => (
          <ProjCategory {...category} key={key} />
        ))}
      </Masonry>
    </SafeArea>
  )
})

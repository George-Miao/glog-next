import SafeArea from '@comps/layout/safeArea'
import ProjCategory from '@comps/projects'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineVFC } from '@core/helper'
import { categories } from '@core/projects'
import React from 'react'

export default defineVFC(() => {
  return (
    <SafeArea>
      <SEO title='Proj.' />
      <Title title='Proj.' safeArea />
      <div className='box grid
          grid-rows-min
          mx-auto
          pt-6 gap-6
          @sm:pt-16
          sm:grid-cols-2
        '>
        {categories.map((category, key) => <ProjCategory {...category} key={key} />)}
      </div>
    </SafeArea>
  )
})

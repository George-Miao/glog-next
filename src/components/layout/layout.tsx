import { defineFCWithChild } from '@core/helper'

import Footer from '../footer'
import NavBar from '../navbar'

/**
 * When using layout, it is recommended to use
 * SafeArea inside for constrain the max width to 3xl
 *
 * Here I use 6xl for max background width for the sake of aesthetics
 * however content should
 * not take the entire <main />
 */
const Layout = defineFCWithChild(({ children, className }) => {
  return (
    <div
      className='min-h-screen
      bg-red-800 relative
      '
    >
      <NavBar />

      {/* Main container */}
      <main
        className={`
          relative
          pb-8
          sm:(p-8)
          <md:(pt-[max(12vh,9rem)])
          md:(pt-[max(8vh,6rem)])
          lg:(pt-8 ml-56)
        `}
      >
        {/* White Background, max-w-6xl */}
        <div
          className={`${className ?? ''}
            shadow-main min-h-[calc(100vh-12rem)]
            relative z-100 bg-light-100
            max-w-6xl mx-auto
            px-6 py-8
            sm:(px-16 py-20)
            md:(px-26 py-32)
            lg:min-h-[calc(100vh-9rem)]`}
        >
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
})

export default Layout

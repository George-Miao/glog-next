import { defineVFCWithChild } from '@core/helper'
import NavBar from '../navbar'
import Footer from '../footer'

/**
 * When using layout, it is recommended to use
 * SafeArea inside for constrain the max width to 3xl
 *
 * Here I use 6xl for background for the sake of aesthetics
 * however content should
 * not take the entire <main />
 */
const Layout = defineVFCWithChild(({ children, className }) => {
  return (
    <div
      className="min-h-screen
      bg-red-800 relative
      ">
      <NavBar />

      {/* Main container */}
      <main
        className={`
          relative
          pb-8 pt-[max(8vh,6rem)]
          sm:(p-8 pt-[max(8vh,6rem)])
          lg:(pt-8 ml-56)
        `}>
        {/* White Background, max-w-6xl */}
        <div
          className={`${className ?? ''}
            shadow-main min-h-[calc(100vh-12rem)]
            relative z-100 bg-light-100
            max-w-6xl mx-auto
            px-6 py-8
            sm:(px-16 py-20)
            md:(px-26 py-32)
            lg:min-h-[calc(100vh-8rem)]`}>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
})

export default Layout

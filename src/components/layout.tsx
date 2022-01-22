import type { ReactNode } from 'react'

import NavBar from '@comps/navbar'
import SafeArea from '@comps/safeArea'
import { defineVFCWithChild } from '@core/utils'

// From top to bottom:
//
//  . FOOTER .... MAIN CONTENT ............ - z-100
//  .................. MAT ................ - z-20
//  ........ BACKGROUND ......... HEADER .. - z-10
//

export default defineVFCWithChild<{
  header?: ReactNode
  className?: string
}>(({ header, children, className }) => {
  const mainTop = header ? 'pt-[70vh]' : 'pt-[max(8vh,6rem)]'
  const matTop = header ? 'top-[85vh]' : 'top-[max(18vh,11rem)]'
  return (
    <div className="min-h-screen bg-red-800 relative">
      {/* Header */}
      <header className="fixed w-full z-10">
        <NavBar className="relative"></NavBar>
        {header}
      </header>
      {/* Main content */}
      <main className={`${mainTop} sm:mx-8 lg:mx-16 relative`}>
        <SafeArea
          className={`${className}
            shadow-main min-h-screen-sm z-100
            relative bg-light-100
            <sm:(px-4 py-6)
            sm:(px-16 py-20)
            md:(px-26 py-32)`}>
          {children}
        </SafeArea>
      </main>
      {/* Footer */}
      <footer className="p-4 pb-8 mt-4 relative z-100">FOOTER</footer>
      {/* MAT */}
      <div
        className={`
          bg-warm-gray-100
          shadow-lg bottom-0 z-20
          absolute w-full ${matTop}`}></div>
    </div>
  )
})

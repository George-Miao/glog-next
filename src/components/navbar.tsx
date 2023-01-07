import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { defineFC } from '@core/helper'
import { Icon as Iconify } from '@iconify/react'

import config from '@config'
import SizeIndicator from './sizeIndicator'

const activeBtn = 'bg-warm-gray-100 text-red-800 shadow-nav-active'
const hoverBtn =
  'text-white sm:hover:(transition-all shadow-nav-hover bg-[rgba(255,255,255,.1)])'

export const btnClass = (isActive: boolean) => `
  flex relative leading-6
  font-bold uppercase
  p-2
  text-[0.8rem] align-middle
  <sm:(text-xs )
  sm:(pb-1)
  <md:(flex-1 justify-center)
  md:(ml-1)
  lg:(mt-2)
  ${isActive ? activeBtn : hoverBtn}
`

const NavBar = defineFC(({ className }) => {
  const mainClass = `
    ${className ?? ''}
    fixed flex flex-col z-100
    sm:px-8
    md:(my-8 flex-row)
    <lg:(justify-between h-24 my-auto w-full)
    lg:(flex-col h-full w-63 justify-center p-4)
  `

  return (
    <nav className={mainClass}>
      {/* <SizeIndicator /> */}
      <Link
        href={'/'}
        className='
            flex text-white
            py-7 pl-10
            @md:(my-auto pl-4) lg:(pl-3 w-full pt-0) '
      >
        <Image src='/img/logo.svg' alt='' width={24} height={24}></Image>
        <span className='font-bold text-xl ml-4 <lg:my-auto'>Glog</span>
      </Link>
      <div
        className='
          flex
          <sm:(p-1)
          @sm:space-x-2
          @md:space-x-1
          lg:(flex-col w-full mt-2 mb-12) <lg:my-auto '
      >
        {config.navbar.links.map((x, i) => {
          const isCurrent = useRouter().asPath.startsWith(x.link)

          return (
            <Link href={x.link} key={i} className={btnClass(isCurrent)}>
              <Iconify
                icon={x.icon as string}
                width={18}
                height={18}
                // className='@sm:hidden'
              />
              <span className='sm:ml-2 <sm:hidden'>{x.text}</span>
              {x.external && (
                <Iconify
                  className='ml-auto'
                  icon='heroicons-outline:external-link'
                  width={16}
                  height={16}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
})

export default NavBar

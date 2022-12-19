import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { defineVFC } from '@core/helper'
import { Icon as Iconify } from '@iconify/react'

import { btnClass, links } from './const'

const NavBar = defineVFC(({ className }) => {
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
      <Link
        href={'/'}
        className='
            flex text-white
            pl-10 py-7
            @md:(my-auto pl-4)
            lg:(pl-3 w-full pt-0)
          '
      >
        <Image src='/img/logo.svg' alt='' width={24} height={24}></Image>
        <span className='ml-4 text-xl font-bold <lg:my-auto'>Glog</span>
      </Link>
      <div
        className='
          flex
          <sm:p-1
          @sm:space-x-2
          @md:(my-auto space-x-2)
          <lg:my-auto
          lg:(flex-col w-full mt-2 mb-12)
        '
      >
        {links.map((x, i) => {
          const isCurrent = useRouter().asPath.startsWith(x.link)

          return (
            <Link href={x.link} key={i} className={btnClass(isCurrent)}>
              <Iconify
                icon={x.icon as string}
                width={18}
                height={18}
                className='mr-4 <sm:hidden md:mr-3'
              ></Iconify>
              <span>{x.text}</span>
              {x.external && (
                <Iconify
                  className='ml-auto'
                  icon='heroicons-outline:external-link'
                  width={16}
                  height={16}
                ></Iconify>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
})

export default NavBar

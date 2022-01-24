import Image from 'next/image'
import Link from 'next/link'

import { defineVFC } from '@core/helper'
import { Icon as Iconify } from '@iconify/react'

import { btnClass, links } from './const'
import { useRouter } from 'next/router'

const NavBar = defineVFC(({ className }) => {
  const mainClass = `
    ${className ?? ''}
    fixed flex z-100
    sm:px-8
    <lg:(px-3 justify-between h-24 my-auto w-full)
    lg:(flex-col h-full w-63 justify-center p-4)
  `

  return (
    <nav className={mainClass}>
      <Link href={'/'}>
        <a
          className="
            flex text-white
            pt-3 pb-4
            sm:px-4
            @md:(my-auto)
            lg:(pl-3 w-full)
          ">
          <Image src="/img/logo.svg" alt="" width={24} height={24}></Image>
          <span className="ml-4 text-xl font-bold <lg:my-auto">Glog</span>
        </a>
      </Link>
      <div
        className="
          flex
          @md:(my-auto)
          <lg:my-auto
          lg:(flex-col w-full mt-2)
        ">
        {links.map((x, i) => {
          const isCurrent = useRouter().asPath.startsWith(x.link)

          return (
            <Link href={x.link} key={i}>
              <a className={btnClass(isCurrent)}>
                <Iconify
                  icon={x.icon as string}
                  width={18}
                  height={18}
                  className="md:mr-2 lg:mr-4"></Iconify>
                <span className="<md:hidden">{x.text}</span>
                {x.external && (
                  <Iconify
                    className="ml-auto <lg:hidden"
                    icon="heroicons-outline:external-link"
                    width={16}
                    height={16}></Iconify>
                )}
              </a>
            </Link>
          )
        })}
      </div>
    </nav>
  )
})

export default NavBar

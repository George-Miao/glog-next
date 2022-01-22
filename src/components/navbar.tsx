import Image from 'next/image'
import { Icon as Iconify } from '@iconify/react'

import Logo from '@public/img/logo.svg'

import { defineVFC } from '@core/utils'
import SafeArea from './safeArea'
import Link from 'next/link'

interface NavBtn {
  link: string
  text: string
  icon?: string
}

export default defineVFC<{ className?: string }>(({ className }) => {
  const links: NavBtn[] = [
    {
      link: '/',
      icon: 'foundation:rss',
      text: 'RSS'
    },
    {
      link: '/posts',
      text: 'writing'
    },
    {
      link: '/',
      text: 'changelog'
    },
    {
      link: '/',
      text: 'projects'
    }
  ]
  return (
    <SafeArea
      className={`${className} flex justify-between px-2 sm:mx-16 h-24 xl:mx-auto`}>
      <Link href={'/'}>
        <a className="px-4 pt-3 pb-4 flex my-auto text-white">
          <Image src={Logo} alt="" width={24} height={24}></Image>
          <span className="ml-4 text-xl font-bold">Glog</span>
        </a>
      </Link>
      <div className="my-auto flex">
        {links.map((x, i) => {
          let display
          if (x.icon) {
            display = (
              <Iconify
                icon={x.icon as string}
                width={18}
                height={18}
                className=""></Iconify>
            )
          } else {
            display = x.text
          }
          return (
            <Link href={x.link} key={i}>
              <a
                className="text-white text-[0.8rem] font-bold uppercase
                 hover:shadow-nav hover:bg-red-highlight
                 p-3 transition-all leading-4">
                {display}
              </a>
            </Link>
          )
        })}
      </div>
    </SafeArea>
  )
})

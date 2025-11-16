import config from '@config'

import { Icon as Iconify } from '@iconify/react'
import cx from 'classix'
import { Link, useLocation } from 'react-router'

interface NavBarProp {
  className?: string
}

function NavBarButton({
  link,
  text,
  active,
  icon,
  external
}: {
  link: string
  text: string
  active: boolean
  icon: string
  external?: boolean
}) {
  const activeBtn = 'bg-neutral-100 text-red-800 shadow-nav-active'
  const hoverBtn =
    'text-white sm:hover:(transition-all shadow-nav-hover bg-[rgba(255,255,255,.1)])'

  return (
    <Link
      to={link}
      key={text}
      className={cx(
        'flex flex-row items-center relative',
        'font-bold uppercase leading-5 text-[0.8rem] align-middle',
        'p-2',
        'lt-sm:(text-xs)',
        'sm:(px-3 py-2)',
        'lt-md:(flex-1 justify-center)',
        'md:(ml-1)',
        'lg:(mt-2)',
        active ? activeBtn : hoverBtn
      )}
    >
      <Iconify icon={icon as string} width={16} height={16} />
      <span className='sm:ml-2 lt-sm:hidden'>{text}</span>
      {external && (
        <Iconify
          className='ml-auto'
          icon='heroicons-outline:external-link'
          width={16}
          height={16}
        />
      )}
    </Link>
  )
}

export default function NavBar({ className }: NavBarProp) {
  const pathname = useLocation().pathname

  return (
    <nav
      className={cx(
        className,
        'transition-all',
        'fixed flex z-50',
        'sm:px-8',
        'lt-md:flex-col',
        'md:(my-8 flex-row)',
        '!lt-lg:(justify-between h-24 my-auto w-full)',
        'lg:(flex-col h-full w-63 justify-center p-4)'
      )}
    >
      <Link
        to={'/'}
        className={cx(
          'flex flex-row relative items-baseline',
          'text-white',
          'pl-10 py-7',
          'at-md:(my-auto pl-4)',
          'lg:(pl-3 w-full pt-0)'
        )}
      >
        <img
          src='/img/logo.svg'
          alt='Logo'
          width={20}
          height={20}
          className='top-[2px] relative'
        />
        <span className='font-bold text-xl ml-2 lt-lg:my-auto'>Glog</span>
      </Link>
      <div
        className='
          flex
          lt-sm:(p-1)
          at-sm:space-x-2
          at-md:space-x-1
          lg:(flex-col w-full mt-2 mb-12) lt-lg:my-auto '
      >
        {config.navbar.links.map(x => {
          const isCurrent = pathname.startsWith(x.link)

          return (
            <NavBarButton
              key={x.text}
              link={x.link}
              text={x.text}
              active={isCurrent}
              icon={x.icon}
              external={x.external}
            />
          )
        })}
      </div>
    </nav>
  )
}

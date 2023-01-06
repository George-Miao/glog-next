import Link from 'next/link'
import React, { useState } from 'react'
import useSWR from 'swr'

import { defineVFC } from '@core/helper'
import { ProjItem, ProjStatus } from '@core/projects/types'
import { Icon } from '@iconify/react'

import { config } from '@core/config'
import type {
  ProjCategory as ProjCategoryProp,
  ProjIndicator
} from '@core/projects/types'

const statusClassBase =
  'w-2 h-2 rounded-full inline-block absolute right-[12px] top-[12px]'
const titleClassBase = 'text-lg font-sans inline-block transition-all mb-1'

const Indicator = defineVFC<ProjIndicator>(
  ({ icon, className, label, link }) => {
    const inner = (
      <Icon
        icon={icon}
        className={`${className} ${
          link ? 'hover:text-black cursor-pointer' : ''
        } text-gray-500 transition-none`}
        width={16}
        height={16}
      />
    )
    return link ? (
      <a href={link} title={label}>
        {inner}
      </a>
    ) : (
      <p title={label}>{inner}</p>
    )
  }
)

const ProjItem = defineVFC<ProjItem>(
  ({
    description,
    name,
    className,
    github,
    healthCheck,
    icon,
    indicators,
    isPrivate,
    link
  }) => {
    const iconSize = 16
    const [status, setStatus] = useState(ProjStatus.Init)

    const url = healthCheck ?? link

    if (url) {
      useSWR(async () => {
        await fetch(config.corsProxy.replace('%s', url))
          .then(res =>
            setStatus(res.ok ? ProjStatus.Online : ProjStatus.Offline)
          )
          .catch(() => setStatus(ProjStatus.Offline))
      })
    }

    const iconComp = icon && (
      <Icon
        width={72}
        height={72}
        icon={icon}
        className='right-[-12px] bottom-[-12px] text-true-gray-200 select-none absolute'
      />
    )

    const statusText =
      status === ProjStatus.Init
        ? undefined
        : status === ProjStatus.Online
        ? 'Service online'
        : 'Service unreachable'
    const statusComp =
      status === ProjStatus.Online ? (
        <span
          className={`bg-green-500 ${statusClassBase}`}
          title={statusText}
        />
      ) : status === ProjStatus.Offline ? (
        <span className={`bg-gray-500 ${statusClassBase}`} title={statusText} />
      ) : null

    const titleLink = link ?? github
    const titleComp = titleLink ? (
      <Link href={titleLink} className={`${titleClassBase} hover:text-red-800`}>
        {name}
      </Link>
    ) : (
      <span className={titleClassBase}>{name}</span>
    )

    const descriptionComp = (
      <p className='font-thin text-sm mb-3 w-full text-gray-600 relative'>
        {description}
      </p>
    )

    const indicatorsComp = (
      <div className='flex space-x-3 item-indicators'>
        {isPrivate && (
          <Icon
            className='text-gray-600'
            icon='bx:bx-lock-alt'
            width={iconSize}
            height={iconSize}
          />
        )}
        {link && (
          <Link href={link} title='Link'>
            <Icon
              icon='akar-icons:link-chain'
              className='cursor-pointer transition-none text-gray-500 hover:text-black'
              width={iconSize}
              height={iconSize}
            />
          </Link>
        )}
        {github && (
          <Link href={github} title='Github link'>
            <Icon
              icon='akar-icons:github-fill'
              className='cursor-pointer transition-none text-gray-500 hover:text-black'
              width={iconSize}
              height={iconSize}
            />
          </Link>
        )}
        {indicators &&
          indicators.map((indicator, key) => (
            <Indicator {...indicator} key={key} />
          ))}
      </div>
    )

    return (
      <div
        className={`${className} flex flex-col
          shadow
          py-3 px-4 overflow-hidden
          md:mb-4 sm:mb-3 mb-3
          bg-true-gray-100
          border-l-2 border-red-800
          relative
        `}
      >
        {/** Absolute comps */}
        {iconComp}
        {statusComp}
        {/** Relative comps */}
        {titleComp}
        {descriptionComp}
        {indicatorsComp}
      </div>
    )
  }
)

const ProjCategory = defineVFC<ProjCategoryProp>(
  ({ items, name, className, description, icon }) => {
    return (
      <div className={`${className} text-left mb-8`}>
        <div className='flex mb-8 <md:flex-row-reverse'>
          <div className='flex-grow'>
            <h1 className='font-sans text-xl text-red-800'>{name}</h1>
            <p className='-mt-1 text-sm text-ellipsis text-gray-600 overflow-hidden'>
              {description}
            </p>
          </div>
          {icon && (
            <div className='my-auto text-gray-500 select-none '>
              <Icon icon={icon} className='<md:mr-4' width={36} height={36} />
            </div>
          )}
        </div>

        {items.map((item, key) => (
          <ProjItem {...item} key={key} />
        ))}
      </div>
    )
  }
)

export default ProjCategory

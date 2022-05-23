import Link from 'next/link'
import React, { useState } from 'react'
import useSWR from 'swr'

import { defineVFC } from '@core/helper'
import { ProjItem, ProjStatus } from '@core/projects/types'
import { Icon } from '@iconify/react'

import { config } from '@core/config'
import type { ProjCategory as ProjCategoryProp, ProjIndicator } from '@core/projects/types'

const Indicator = defineVFC<ProjIndicator>(
  ({ icon, className, label, link }) => {
    const inner = (
      <Icon
        icon={icon}
        className={`${className} ${link ? 'hover:text-black cursor-pointer' : ''} text-gray-500 transition-none`}
        width={16}
        height={16}
      />
    )
    return link
      ? (
        <a href={link} title={label}>
          {inner}
        </a>
      )
      : <p title={label}>{inner}</p>
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
          .then(
            res => setStatus(res.ok ? ProjStatus.Online : ProjStatus.Offline)
          )
          .catch(
            () => setStatus(ProjStatus.Offline)
          )
      })
    }

    const iconComp = icon && (
      <Icon
        width={72}
        height={72}
        icon={icon}
        className='text-true-gray-200 select-none absolute right-[-12px] bottom-[-12px]'
      />
    )

    const statusText = status === ProjStatus.Init
      ? undefined
      : status === ProjStatus.Online
      ? 'Service online'
      : 'Service unreachable'
    const statusClassBase = 'w-2 h-2 rounded-full inline-block absolute right-[12px] top-[12px]'
    const statusComp = status === ProjStatus.Online
      ? <span className={`bg-green-500 ${statusClassBase}`} title={statusText} />
      : status === ProjStatus.Offline
      ? <span className={`bg-gray-500 ${statusClassBase}`} title={statusText} />
      : null

    const titleClassBase = 'text-lg font-sans inline-block transition-all mb-1'
    const titleLink = link ?? github
    const titleComp = titleLink
      ? (
        <Link href={titleLink}>
          <a className={`${titleClassBase} hover:text-red-800`}>{name}</a>
        </Link>
      )
      : <span className={titleClassBase}>{name}</span>

    const indicatorsComp = (
      <div className='flex item-indicators space-x-3'>
        {isPrivate && (
          <Icon
            className='text-gray-600'
            icon='bx:bx-lock-alt'
            width={iconSize}
            height={iconSize}
          />
        )}
        {link && (
          <Link href={link}>
            <a title='Link'>
              <Icon
                icon='akar-icons:link-chain'
                className='text-gray-500 hover:text-black transition-none cursor-pointer'
                width={iconSize}
                height={iconSize}
              />
            </a>
          </Link>
        )}
        {github && (
          <Link href={github}>
            <a title='Github link'>
              <Icon
                icon='akar-icons:github-fill'
                className='text-gray-500 hover:text-black transition-none cursor-pointer'
                width={iconSize}
                height={iconSize}
              />
            </a>
          </Link>
        )}
        {indicators
          && indicators.map((indicator, key) => <Indicator {...indicator} key={key} />)}
      </div>
    )

    return (
      <div
        className={`${className} flex flex-col
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
        <p className='text-gray-600 text-sm w-full mb-3 font-thin relative'>
          {description}
        </p>
        {indicatorsComp}
      </div>
    )
  }
)

const ProjCategory = defineVFC<ProjCategoryProp>(
  ({ items, name, className, description, icon }) => {
    return (
      <div className={`${className} text-left mb-8`}>
        <div className='flex mb-4 <md:flex-row-reverse'>
          <div className='flex-grow'>
            <h1 className='text-red-800 text-xl font-sans'>{name}</h1>
            <p className='text-gray-600 text-sm overflow-hidden text-ellipsis'>
              {description}
            </p>
          </div>
          {icon && (
            <div className='my-auto text-gray-500 select-none '>
              <Icon icon={icon} className='mr-4' width={32} height={32} />
            </div>
          )}
        </div>

        {items.map((item, key) => <ProjItem {...item} key={key} />)}
      </div>
    )
  }
)

export default ProjCategory

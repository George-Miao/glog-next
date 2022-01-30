import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'

import { defineVFC } from '@core/helper'
import { ProjItem, ProjStatus } from '@core/projects/types'
import { Icon } from '@iconify/react'

import type {
  ProjIndicator,
  ProjCategory as ProjCategoryProp
} from '@core/projects/types'
import { config } from '@core/config'

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
    // let up = 0
    // link && fetch(link)
    //   .then(res => (up = res.ok ? 1 : 2))
    //   .catch(() => up = 2)
    //   .finally(() => console.log(`Status of ${link} has changed to ${up}`))

    const size = 16
    const [status, setStatus] = useState(ProjStatus.Init)

    const url = healthCheck ?? link

    if (url) {
      const proxiedUrl = config.corsProxy.replace('%s', url)
      useSWR(proxiedUrl, async url => {
        const res = await fetch(url)
        setStatus(res.ok ? ProjStatus.Online : ProjStatus.Offline)
      })
    }

    const iconComp = icon && (
      <Icon
        width={72}
        height={72}
        icon={icon}
        className="
        text-true-gray-200 select-none
          absolute
          right-[-12px] bottom-[-12px]"
      />
    )

    const linkClassBase = 'text-lg font-sans inline-block transition-all mb-1'
    const linkComp = link ? (
      <Link href={link}>
        <a className={`${linkClassBase} hover:text-red-800`}>{name}</a>
      </Link>
    ) : (
      <p className={linkClassBase}>{name}</p>
    )

    const indicatorsComp = (
      <div className="flex item-indicators space-x-3">
        {status === ProjStatus.Online && (
          <Icon
            className="text-green-600"
            icon="akar-icons:circle-check"
            width={size}
            height={size}
          />
        )}
        {status === ProjStatus.Offline && (
          <Icon
            className="text-yellow-600"
            width={size}
            height={size}
            icon="ant-design:warning"
          />
        )}
        {isPrivate && (
          <Icon
            className="text-gray-600"
            icon="bx:bx-lock-alt"
            width={size}
            height={size}
          />
        )}
        {link && (
          <Link href={link}>
            <a title="Link">
              <Icon
                icon="akar-icons:link-chain"
                className="text-gray-500 hover:text-black transition-none cursor-pointer"
                width={size}
                height={size}
              />
            </a>
          </Link>
        )}
        {github && (
          <Link href={github}>
            <a title="Github link">
              <Icon
                icon="akar-icons:github-fill"
                className="text-gray-500 hover:text-black transition-none cursor-pointer"
                width={size}
                height={size}
              />
            </a>
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
          py-3 px-4 overflow-hidden
          md:mb-4 sm:mb-3 mb-3
          bg-true-gray-100
          border-l-2 border-red-800
          relative
        `}
      >
        {iconComp}
        {linkComp}
        <p className="text-gray-600 text-sm w-full mb-3 font-thin relative">
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
        <div className="flex items-baseline pb-4">
          {icon && (
            <div className="my-auto text-gray-500 select-none ">
              <Icon icon={icon} className="mr-2" width={24} height={24} />
            </div>
          )}
          <h1 className="text-2xl font-sans text-gray-600">{name}</h1>
          <span className="ml-3 text-gray-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {description}
          </span>
        </div>

        {items.map((item, key) => (
          <ProjItem {...item} key={key} />
        ))}
      </div>
    )
  }
)

export default ProjCategory

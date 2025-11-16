import { Icon } from '@iconify/react'
import type {
  ProjSection as ProjCategoryProp,
  ProjIndicator,
  ProjItem
} from '@type/proj'
import type { HTMLAttributes } from 'react'
import type { Photo, RenderPhotoProps } from 'react-photo-album'
import { Link } from 'react-router'

export interface PseudoProjPhoto extends ProjCategoryProp, Photo {}

const titleClassBase =
  'text-lg text-gray-700 font-semibold font-sans inline-block transition-all mb-1'

function Indicator({
  icon,
  className,
  link,
  ...rest
}: ProjIndicator &
  HTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLParagraphElement>) {
  const label = icon.split(':').pop()
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
    <a href={link} title={label} {...rest}>
      {inner}
    </a>
  ) : (
    <p title={label} {...rest}>
      {inner}
    </p>
  )
}

interface ProjItemCompProp extends ProjItem {
  className?: string
}

function ProjItemComp({
  description,
  name,
  className,
  github,
  icon,
  indicators,
  link
}: ProjItemCompProp) {
  const iconSize = 16

  const iconComp =
    icon &&
    (typeof icon === 'string' ? (
      <Icon
        width={72}
        height={72}
        icon={icon}
        className='right-[-12px] bottom-[-12px] text-neutral-200 select-none absolute'
      />
    ) : (
      <img
        src={icon.url}
        alt={name}
        width={80}
        height={80}
        className='opacity-10 right-[-12px] bottom-[-12px] select-none absolute'
      />
    ))

  const titleLink = link ?? github
  const titleComp = titleLink ? (
    <Link to={titleLink} className={`${titleClassBase} hover:text-red-800`}>
      {name}
    </Link>
  ) : (
    <span className={titleClassBase}>{name}</span>
  )

  const descriptionComp = (
    <p className='text-sm mb-3 w-full text-gray-500 relative'>{description}</p>
  )

  const indicatorsComp = (
    <div className='flex space-x-3 item-indicators'>
      {link && (
        <Link to={link} title='Link'>
          <Icon
            icon='akar-icons:link-chain'
            className='cursor-pointer transition-none text-gray-500 hover:text-black'
            width={iconSize}
            height={iconSize}
          />
        </Link>
      )}
      {github && (
        <Link to={github} title='Github link'>
          <Icon
            icon='akar-icons:github-fill'
            className='cursor-pointer transition-none text-gray-500 hover:text-black'
            width={iconSize}
            height={iconSize}
          />
        </Link>
      )}
      {indicators?.map(indicator => (
        <Indicator {...indicator} key={indicator.icon} />
      ))}
    </div>
  )

  return (
    <div
      className={`${className ?? ''} ${link ? 'hover:shadow-md transition' : ''} flex flex-col
        shadow
        py-3 px-4 overflow-hidden
        md:mb-4 sm:mb-3 mb-3
        bg-neutral-100
        border-l-2 border-red-800
        relative
      `}
    >
      {/** Absolute comps */}
      {iconComp}
      {/** Relative comps */}
      {titleComp}
      {descriptionComp}
      {indicatorsComp}
    </div>
  )
}

export default function ProjCategory({
  photo: { items, name, description, icon },
  wrapperStyle
}: RenderPhotoProps<PseudoProjPhoto>) {
  return (
    <div className={'text-left mb-8'} style={wrapperStyle}>
      <div className='flex mb-4 lt-md:flex-row-reverse'>
        <div className='flex-grow'>
          <h1 className='font-sans text-xl text-red-800'>{name}</h1>
          <p className='text-sm text-ellipsis text-gray-600 overflow-hidden'>
            {description}
          </p>
        </div>
        {icon && (
          <div className='my-auto text-gray-500 select-none '>
            <Icon icon={icon} className='lt-md:mr-4' width={36} height={36} />
          </div>
        )}
      </div>

      {items.map((item, key) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Order will NOT change
        <ProjItemComp {...item} key={key} />
      ))}
    </div>
  )
}

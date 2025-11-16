import { Icon } from '@iconify/react/dist/iconify.js'
import { Link } from 'react-router'

export interface BadgeProp {
  text: string
  url: string
  icon: string
  rel?: string
}

export default function Badge({ text, url, icon, rel }: BadgeProp) {
  return (
    <Link
      rel={rel}
      to={url}
      className='flex text-neutral-500 leading-6 inl-inset-y-px items-center hover:text-red-800'
    >
      <Icon icon={icon} className='mr-1 text-neutral-600' width={20} />
      <span className='font-mono underline'>{text}</span>
    </Link>
  )
}

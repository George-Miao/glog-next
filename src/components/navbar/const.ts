import type { NavBtn } from './type'

export const links: NavBtn[] = [
  {
    link: '/writing',
    icon: 'clarity:pencil-solid',
    text: 'writing'
  },
  {
    link: '/changelog',
    icon: 'mdi:timeline-text',
    text: 'changelog'
  },
  {
    link: '/projects',
    icon: 'mdi:flask',
    text: 'projects'
  },
  {
    link: '/feeds',
    icon: 'foundation:rss',
    text: 'feeds'
  }
]

const activeBtn = 'bg-warm-gray-100 text-red-800 shadow-nav-active'
const hoverBtn =
  'text-white filter hover:(shadow-nav-hover bg-[rgba(255,255,255,.1)])'

export const btnClass = (isActive: boolean) => `
  flex flex-row relative
  text-[0.8rem] font-bold uppercase
  transition-all leading-5
  p-2 ml-1
  sm:(p-3 ml-2)
  lg:mt-2
  ${isActive ? activeBtn : hoverBtn}
`

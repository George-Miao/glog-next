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
  'text-white sm:hover:(shadow-nav-hover bg-[rgba(255,255,255,.1)])'

export const btnClass = (isActive: boolean) => `
  flex flex-row relative transition-all
  font-bold uppercase leading-4
  text-[0.8rem] p-3
  <sm:(text-xs)
  <md:(flex-1 justify-center)
  md:(ml-1)
  lg:mt-2
  ${isActive ? activeBtn : hoverBtn}
`

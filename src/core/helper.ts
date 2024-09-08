import { useRouter } from 'next/router'

import { config } from '@config'

export const genWhole = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min)

export interface baseProp {
  className?: string
}

export interface childProp {
  children: React.ReactNode
}

type Empty = Record<string, never>

export const defineFC =
  <P = Empty>(comp: React.FC<P & Required<baseProp>>) =>
  (prop: P & baseProp) => {
    const className = prop.className ?? ''
    return comp({ ...prop, className })
  }

export const defineFCWithChild = <P = childProp>(
  comp: React.FC<childProp & P & Required<baseProp>>
) => defineFC<childProp & P>(comp)

export const regexIndexOf = (
  string: string,
  regex: RegExp,
  startpos?: number
) => {
  const pos = startpos === undefined ? 0 : startpos + 1
  const index = string.slice(pos).search(regex)
  return index >= 0 ? index + pos : index
}

// Return all indexes of a regex match within a string
export const allIndexOf = (string: string, regex: RegExp) => {
  let pos: number | undefined = undefined
  const ret: number[] = []
  do {
    pos && ret.push(pos)
    pos = regexIndexOf(string, regex, pos)
  } while (pos >= 0)
  return ret
}

export const useUrl = () => `https://${config.domain}${useRouter().asPath}`

export const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  )

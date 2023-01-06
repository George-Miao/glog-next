import { useRouter } from 'next/router'

import { config } from './config'

export const genInt = (min: number, max: number) =>
  Math.random() * (max - min) + min

export interface baseProp {
  className?: string
}

export interface childProp {
  children: React.ReactNode
}

type Empty = Record<string, never>

export const defineVFC =
  <P = Empty>(comp: React.FC<P & Required<baseProp>>) =>
  (prop: P & baseProp) => {
    const className = prop.className ?? ''
    return comp({ ...prop, className })
  }

export const defineVFCWithChild = <P = childProp>(
  comp: React.FC<childProp & P & Required<baseProp>>
) => defineVFC<childProp & P>(comp)

export const defineVFCWithClassAndChild = <P = baseProp>(
  comp: React.FC<{ children: React.ReactNode } & baseProp & P>
) => comp

export const definePage = <P = baseProp>(comp: React.FC<baseProp & P>) => comp

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

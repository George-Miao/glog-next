import type { VFC } from 'react'

export interface baseProp {
  className?: string
}

export const defineVFC = <P = baseProp>(comp: VFC<P & baseProp>) => comp

export const defineVFCWithClass = <P = baseProp>(comp: VFC<baseProp & P>) =>
  comp

export const defineVFCWithChild = <P = baseProp>(
  comp: VFC<{ children: React.ReactNode } & baseProp & P>
) => comp

export const defineVFCWithClassAndChild = <P = baseProp>(
  comp: VFC<{ children: React.ReactNode } & baseProp & P>
) => comp

export const definePage = <P = baseProp>(comp: VFC<baseProp & P>) => comp

export const regexIndexOf = (
  string: string,
  regex: RegExp,
  startpos?: number
) => {
  const pos = startpos === undefined ? 0 : startpos + 1
  const index = string.slice(pos).search(regex)
  return index >= 0 ? index + pos : index
}

export const allIndexOf = (string: string, regex: RegExp) => {
  let pos: number | undefined = undefined
  const ret: number[] = []
  do {
    pos = regexIndexOf(string, regex, pos)
    if (pos >= 0) {
      ret.push(pos)
    } else {
      break
    }
  } while (true)
  return ret
}

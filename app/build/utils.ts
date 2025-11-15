/**
  This module is intended to be using purely during build time
  Functions it exports require node and fs access
*/

import type { PathLike } from 'node:fs'
import { access } from 'node:fs/promises'

export const exists = async (dir: PathLike) => {
  try {
    await access(dir)
    return true
  } catch {
    return false
  }
}

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
    pos && ret.push(pos)
    pos = regexIndexOf(string, regex, pos)
  } while (pos >= 0)
  return ret
}

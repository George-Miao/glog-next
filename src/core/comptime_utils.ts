/**
  This module is intended to be using purely during build time
  Functions it exports require node and fs access
*/

import type { PathLike } from 'fs'
import { access } from 'fs/promises'

export const exists = async (dir: PathLike) => {
  try {
    await access(dir)
    return true
  } catch {
    return false
  }
}

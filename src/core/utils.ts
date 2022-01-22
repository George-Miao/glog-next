import { VFC } from 'react'

export const defineVFC = <P = {}>(comp: VFC<P>) => comp

export const defineVFCWithClass = <P = {}>(
  comp: VFC<{ className?: string } & P>
) => comp

export const defineVFCWithChild = <P = {}>(
  comp: VFC<{ children: React.ReactNode } & P>
) => comp

export const defineVFCWithClassAndChild = <P = {}>(
  comp: VFC<{ className?: string; children: React.ReactNode } & P>
) => comp

export const definePage = <P = {}>(comp: VFC<P>) => comp

import Button from '@comps/button'
import type { Rendered } from '@type/post'

export interface PostFooterProp {
  prev: Rendered | null
  next: Rendered | null
}

export default function PostFooter({ prev, next }: PostFooterProp) {
  return (
    <div className='mt-12 flex justify-between space-x-4'>
      {prev ? (
        <Button
          style='underline'
          className='float-left text-neutral-600 max-w-48 max-w-[50%]'
          href={`/writing/${prev.slug}`}
          prefix='←'
        >
          {prev.meta.title}
        </Button>
      ) : (
        <div />
      )}
      {next ? (
        <Button
          style='underline'
          className='float-right text-neutral-600 max-w-[50%]'
          href={`/writing/${next.slug}`}
          postfix='→'
        >
          {next.meta.title}
        </Button>
      ) : (
        <div />
      )}
    </div>
  )
}

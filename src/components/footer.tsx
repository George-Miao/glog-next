import { defineVFC } from '@core/helper'

const commit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
const url = commit && `https://github.com/George-Miao/glog-next/commit/${commit}`
const commitComp = commit
  && (
    <p className='text-sm'>
      Commit <a href={url} className='font-bold'>#{commit.substring(0, 6)}</a>
    </p>
  )

const Footer = defineVFC(({ className }) => {
  return (
    <footer
      className={`
        ${className ?? ''}
        lg:ml-50 pb-8 relative z-100
        text-warm-gray-200
        mx-auto block flex flex-col items-center
      `}
    >
      <p className='mb-2'>George Miao © 2022</p>
      <p className='text-sm mb-2'>
        Built with
        <a className='mx-1 font-bold' href='https://nextjs.org/'>
          NextJS
        </a>
        &
        <a className='mx-1 font-bold' href='https://windicss.org/'>
          WindiCSS
        </a>
      </p>
      {commitComp}
    </footer>
  )
})

export default Footer

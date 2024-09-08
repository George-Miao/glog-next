import { defineFC } from '@core/helper'

const commit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
const url =
  commit && `https://github.com/George-Miao/glog-next/commit/${commit}`
const commitComp = commit && (
  <p className='text-sm'>
    Commit{' '}
    <a href={url} className='font-bold'>
      #{commit.substring(0, 6)}
    </a>
  </p>
)

const Footer = defineFC(({ className }) => {
  return (
    <footer
      className={`
        ${className ?? ''}
        lg:ml-50 pb-8 relative z-100
        text-warm-gray-200
        mx-auto block flex flex-col items-center
      `}
    >
      <p className='mb-2'>George Miao © 2022 - {new Date().getFullYear()}</p>
      <p className='text-sm mb-2'>
        Built with
        <a className='font-bold mx-1' href='https://nextjs.org/'>
          NextJS
        </a>
        &
        <a className='font-bold mx-1' href='https://windicss.org/'>
          WindiCSS
        </a>
      </p>
      {commitComp}
    </footer>
  )
})

export default Footer

import { defineVFC } from '@core/helper'

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
      <p className='text-sm'>
        Built with
        <a className='mx-1 font-bold' href='https://nextjs.org/'>
          NextJS
        </a>
        &
        <a className='mx-1 font-bold' href='https://windicss.org/'>
          WindiCSS
        </a>
      </p>
    </footer>
  )
})

export default Footer

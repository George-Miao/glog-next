import commit from 'virtual:git-sha'
import cx from 'classix'
import { Link } from 'react-router'

const url =
  commit && `https://github.com/George-Miao/glog-next/commit/${commit}`
const commitComp = (
  <p className='text-sm'>
    Commit{' '}
    <Link to={url} className='font-bold'>
      #{commit.substring(0, 6)}
    </Link>
  </p>
)

interface FooterProp {
  className?: string
}

export default function Footer({ className }: FooterProp) {
  return (
    <footer
      className={cx(
        className,
        'lg:ml-50 pb-8 relative z-100 text-neutral-200',
        'mx-auto block flex flex-col items-center'
      )}
    >
      <p className='mb-2'>George Miao © 2022 - {new Date().getFullYear()}</p>
      <p className='text-sm mb-2'>
        Built with
        <Link className='font-bold mx-1' to='https://vitejs.dev/'>
          Vite
        </Link>
        ,
        <Link className='font-bold mx-1' to='https://reactrouter.com/'>
          React-Router
        </Link>
        and
        <Link className='font-bold mx-1' to='https://unocss.dev/'>
          UnoCSS
        </Link>
      </p>
      {commitComp}
    </footer>
  )
}

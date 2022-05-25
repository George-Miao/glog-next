import Button from '@comps/button'
import Oops from '@comps/oops'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineVFC } from '@core/helper'

const ServerErrorPage = defineVFC(() => {
  return (
    <>
      <SEO title='Not Found' />
      <Title
        safeArea
        title={{
          char: 'O',
          node: <Oops />
        }}
        subtitle='404 Not Found'
      />
      <br />
      <p className='text-xl my-4'>Why am I seeing this page?</p>
      <div className='flex flex-col text-red-800 space-y-2 pl-2 mb-12'>
        <a>{'>'} Because I cannot find the page you are looding for</a>
        <a>{'>'} Maybe you entered the wrong URL</a>
        <a>{'>'} Maybe my website just fxxked up</a>
        <a>{'>'} There are many possibilities</a>
        <a>{'>'} So why not go back to home?</a>
      </div>
      <Button href='/'>Go home</Button>
    </>
  )
})

export default ServerErrorPage

import Button from '@comps/button'
import Oops from '@comps/oops'
import SEO from '@comps/seo'
import Title from '@comps/title'
import { defineVFC } from '@core/helper'

const ServerErrorPage = defineVFC(() => {
  return (
    <>
      <SEO title="Server Error" />
      <Title
        safeArea
        title={{
          char: 'O',
          node: <Oops />
        }}
        subtitle="500 Server Error"
      />
      <br />
      <h3 className="text-xl my-4">Why am I seeing this page?</h3>
      <div className="flex flex-col text-red-800 space-y-2 pl-2 mb-12">
        <a>
          {'>'} There{"'"}s an error happened on my side
        </a>
        <a>{'>'} Maybe my website just fxxked up</a>
        <a>{'>'} There are many possibilities</a>
        <a>{'>'} So why not go back to home?</a>
      </div>
      <Button href="/">Go home</Button>
    </>
  )
})

export default ServerErrorPage

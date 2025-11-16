import Button from '@comps/button'
import Oops from '@comps/oops'
import SEO from '@comps/seo'
import Title from '@comps/title'

export default function ServerErrorPage() {
  return (
    <>
      <SEO title='Server Error' />
      <Title
        safeArea
        title={{
          char: 'O',
          node: <Oops />
        }}
        subtitle='500 Server Error'
      />
      <br />
      <h3 className='my-4 text-xl'>Why am I seeing this page?</h3>
      <div className='flex flex-col space-y-2 mb-12 pl-2 text-red-800'>
        <p>
          {'>'} There{"'"}s an error happened on my side
        </p>
        <p>{'>'} Maybe my website just fxxked up</p>
        <p>{'>'} There are many possibilities</p>
        <p>{'>'} So why not go back to home?</p>
      </div>
      <Button href='/'>Go home</Button>
    </>
  )
}

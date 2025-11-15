import Button from '@comps/button'
import Oops from '@comps/oops'
import SEO from '@comps/seo'
import Title from '@comps/title'

export default function NotFoundPage() {
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
      <p className='my-4 text-xl'>Why am I seeing this page?</p>
      <div className='flex flex-col space-y-2 mb-12 pl-2 text-red-800'>
        <p>{'>'} Because I cannot find the page you are looking for</p>
        <p>{'>'} Maybe you entered the wrong URL</p>
        <p>{'>'} Maybe my website just fxxked up</p>
        <p>{'>'} There are many possibilities</p>
        <p>{'>'} So why not go back to home?</p>
      </div>
      <Button href='/'>Go home</Button>
    </>
  )
}

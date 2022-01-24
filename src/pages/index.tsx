import { generateAll } from '@core/post/feed'
import type { NextPage } from 'next'

export async function getStaticProps() {
  await generateAll()

  const posts = {
    a: 'Index Page'
  }

  return {
    props: {
      posts
    }
  }
}

const Home: NextPage<{ posts: { a: string } }> = ({ posts }) => {
  return <div className="">{posts.a}</div>
}

export default Home

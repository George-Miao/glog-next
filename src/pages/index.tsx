import { generateFeed } from '@core/post/feed'
import { writeFile } from 'fs/promises'
import type { NextPage } from 'next'

export async function getStaticProps() {
  const feed = await generateFeed()

  await Promise.all([
    writeFile(`${process.cwd()}/public/feeds/rss.xml`, feed.rss2()),
    writeFile(`${process.cwd()}/public/feeds/atom.xml`, feed.atom1()),
    writeFile(`${process.cwd()}/public/feeds/json`, feed.json1())
  ])

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

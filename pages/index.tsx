import type { NextPage } from 'next'

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const posts = {
    a: 'Lol'
  }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts
    }
  }
}

const Home: NextPage<{ posts: { a: string } }> = ({ posts }) => {
  return (
    <div className="flex">
      <p>{posts.a}</p>
    </div>
  )
}

export default Home

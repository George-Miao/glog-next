import posts from 'virtual:post:path'
import config from '@config'
import { generateRemixSitemap } from '@forge42/seo-tools/remix/sitemap'
import type { PostPath } from '@type/post'

const postRoute = ({ slug }: PostPath) => [
  `/writing/${slug}`,
  {
    id: `/writing/${slug}`,
    module: { default: () => <></> },
    path: `/writing/${slug}`
  }
]

export const loader = async () => {
  const { routes } = await import('virtual:react-router/server-build')

  const sitemap = await generateRemixSitemap({
    domain: `https://${config.domain}`,
    ignore: ['/writing/\\:slug', '/\\*', '/posts*', '/changelog*'],
    routes: {
      ...routes,
      ...Object.fromEntries(posts.map(postRoute))
    }
  })

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}

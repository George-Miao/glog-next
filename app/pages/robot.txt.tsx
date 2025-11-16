import config from '@config'
import { generateRobotsTxt } from '@forge42/seo-tools/robots'

export async function loader() {
  const robotsTxt = generateRobotsTxt([
    {
      userAgent: '*',
      [import.meta.env.PROD ? 'allow' : 'disallow']: ['/'],
      sitemap: [`https://${config.domain}/sitemap.xml`]
    }
  ])

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}
